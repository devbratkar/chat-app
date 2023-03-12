import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchAllConversations } from '../asyncApi';
import { fetchAllMyChats } from "../asyncApi";

interface ChatSliceI {
  conversations: any[];
  users: any[];
}

const initialState: ChatSliceI = {
  conversations: [],
  users: [],
};

const chatSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initConversation: (state, { payload }) => {
      state.conversations = [...payload];
    },
    clearConversations: (state) => {
      state.conversations = [];
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(fetchAllConversations.fulfilled),
      (state, { payload }) => {
        console.log(payload)
        // const data = payload.data ? payload?.data : []
        // state.conversations = [...data]
      });

    builder.addMatcher(
      isAnyOf(fetchAllMyChats.fulfilled),
      (state, { payload }: any) => {
        if (payload && payload?.data) {
          const data = payload?.data?.data ?? [];
          state.users = data;
        } else {
          state.users = [];
        }
      })
  }
});

interface PayloadI {
  data: {
    status: string;
    message: string;
    data: any
  }
}

export const { initConversation, clearConversations } = chatSlice.actions;
export default chatSlice.reducer;