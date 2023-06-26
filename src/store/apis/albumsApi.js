import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
// RTK Query 是利用瀏覽器內建的fetch function來發出請求
const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      //...args === dispatch(addAlbum) return { url:'http://localhost:3005/albums', method:'GET'}
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      // Query
      fetchAlbums: builder.query({
        // Tag System，此標籤必須是 array ，內部可以是 string or object
        // 必須提供一組動態的標籤。arg1(result object is lis of album), arg3 is a argument(Query hook pass)
        // tags內有多個不同的object，是為了在進行invalidatesTag時，不用到處傳遞所有額外的data，可以統一格式化一些tag
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: "AlbumsListItem", id: album.id };
          });
          tags.push({ type: "AlbumsList", id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            url: "/albums",
            // query string用來向後端發出請求，讀取是對哪個AlbumsList內的內容新增，?userId =  userId)。
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
      // Mutation
      addAlbum: builder.mutation({
        // Tag System
        // user是由addAlbum(user)來呼叫的
        invalidatesTags: (result, error, user) => {
          return [{ type: "AlbumsList", id: user.id }];
        },
        // This query is like more function，called query more
        // tell redux to  get query about some parameters
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            // 向後端新增userId的data
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "AlbumsListItem", id: album.id }];

          // 碰巧剛剛好每個album都有對應的userId，才可以使用這個方法
          // return [{ type: "Album", id: album.userId }];
        },
        // arg is album，是因為只要知道是哪個id就可以刪除(內部)，其他兩個fetch、create都要指定是哪個id(由外往內)
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;

export { albumsApi };
