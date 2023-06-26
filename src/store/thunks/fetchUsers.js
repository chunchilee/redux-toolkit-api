import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// base type 本身不重要，主要描述請求的目的
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  // DEV ONLY !!!
  // type pending
  await pause(1000);

  // fetchUsers.pending === 'users/fetch/pending'
  // fetchUsers.fulfilled === 'users/fetch/fulfilled'
  // fetchUsers.rejected === 'users/fetch/rejected'

  // fetchUser() 會自動發送 action.payload && type fulfilled 
  // dispatch(fetchUsers())，會自動發送action object 給reducer
  return response.data;
});

// DEV ONLY !!!
const pause = (duration) => {
  // resolve 判斷 fulfilled or rejected
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };
