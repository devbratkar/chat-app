import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connection: null
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initSocket: (state, { payload }) => {
      state.connection = { ...payload };
    },
    closeSocket: (state) => {
      state.connection = null;
    }
  }
});

export const { initSocket } = socketSlice.actions;
export default socketSlice.reducer;