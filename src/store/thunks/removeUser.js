import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {

  // action.payload = {}，is a Bug !!!
  // 後端 db.json 已經刪除 user，但 reducer 得到的是 empty object {}
  await axios.delete(`http://localhost:3005/users/${user.id}`); 

  // action.payload === user
  // dispatch() 接收到的action object是user object
  return user;

  // response.data === delete 後的 empty object {}
  // return response.data;
});
export { removeUser };
