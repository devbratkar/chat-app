import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchConversation } from '../asyncApi';
import { fetchAllMyChats } from "../asyncApi";

interface ChatSliceI {
  conversationId: string | null;
  usersId: string[] | null;
  conversations: any[];
  users: any[];
}

const initialState: ChatSliceI = {
  conversationId: null,
  usersId: null,
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
      isAnyOf(fetchConversation.fulfilled),
      (state, { payload }: any) => {
        const data = payload?.data?.data;
        const messages = data?.messages ? data?.messages : [];
        state.usersId = data?.usersId;
        state.conversationId = data?._id;
        state.conversations = [...messages];
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