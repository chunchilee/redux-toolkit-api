# 📸  Redux Toolkit CRUD 應用

## 🌟 簡介
本專案是一個基於 **React.js** 和 **Redux Toolkit** 的前端應用，使用 **json-server** 作為模擬後端，並整合 **faker.js** 產生假資料。透過 **axios** 和 **fetch** 發送 CRUD 請求，並使用 **createAsyncThunk** 和 **createApi** 來自動管理請求狀態、數據緩存及無效標記 (Tag system)。

## 🛠️ 技術棧

- **狀態管理**：React-Redux (Provider)
- **Redux Toolkit**：
  - `configureStore`
  - `createSlice` (extraReducers)
  - `setupListeners`
  - `middleware`
  - `createAsyncThunk`
  - `createApi` (reducerPath, baseQuery, endpoints, query, mutation, providesTags, invalidatesTags)
- **伺服器模擬**：json-server
- **CSS 框架**：Tailwind CSS
- **假資料產生**：faker.js
- **API 請求**：axios、fetch

## 📦 安裝與運行

1. 安裝專案依賴：
   ```sh
   npm install
   ```

2. 啟動 json-server 模擬後端：
   ```sh
   npx run start:server
   ```

3. 啟動開發伺服器：
   ```sh
   npm run start
   ```

## 🎨 主要功能

- **使用者管理 (Users)**：
  - 點擊 `addUser` 按鈕發送 `useThunk`，使用 `fetch` 手動發送請求。
  - 透過 `extraReducers` 處理 `pending`、`fulfilled`、`rejected` 狀態。
  - 點擊 User 可展開 Album 列表。

- **相簿管理 (Albums)**：
  - 點擊 `addAlbum` 按鈕，使用 `createApi` 自動處理請求狀態與數據緩存。
  - 利用 **Tag system** 來標記過時數據。
  - 點擊 Album 可展開 Photo 列表。

- **照片管理 (Photos)**：
  - 點擊 `addPhoto` 按鈕，使用 `createApi` 自動處理請求狀態與數據緩存。
  - 利用 **Tag system** 來標記過時數據。

- **刪除功能**：
  - `users`、`albums`、`photos` 均可刪除個別項目。

## 📂 JSON 伺服器結構

```json
{
  "users": [
    {
      "name": "Andre Weber",
      "id": 2
    }
  ],
  "albums": [
    {
      "userId": 2,
      "title": "Ergonomic Rubber Bike",
      "id": 1
    }
  ],
  "photos": [
    {
      "albumId": 1,
      "url": "https://loremflickr.com/150/150/abstract?lock=88317",
      "id": 1
    }
  ]
}
```

![rtk 流程](https://github.com/user-attachments/assets/1cb147e5-39b1-4b51-9091-b5c68b6e5405)



