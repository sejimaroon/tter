import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    createPost: (state, action) => {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
      });
    },
  },
});

export const { createPost } = postSlice.actions;

export default postSlice;