import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // albums: albumsApi.reducer，key是字串，避免輸入錯誤，卻沒有報錯誤提示
    // albumsApi會自動創建一個Slice，因此可以使用reducer, actions。
    // [] 查找路徑屬性，is a String
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  // 延遲、記錄（log）、調整或停止 action ???????????
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});
// 用以監聽誰向 store發送dispatch()
setupListeners(store.dispatch);

// 需要從Redux取的data，都只要向'../store/index.js'發出請求，就可以得到store folder內的所有export
export {
  useAddAlbumMutation,
  useFetchAlbumsQuery,
  useRemoveAlbumMutation,
} from "./apis/albumsApi";
export {
  useAddPhotoMutation,
  useFetchPhotosQuery,
  useRemovePhotoMutation,
} from "./apis/photosApi";
export * from "./thunks/addUser";
export * from "./thunks/fetchUsers";
export * from "./thunks/removeUser";
