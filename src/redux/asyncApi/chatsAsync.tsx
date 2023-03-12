import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllConversations = createAsyncThunk(
  "chats/fetchAllConversations",
  async ({ conversationId }: { conversationId: string }, { }) => (
    axios.get(`${process.env.REACT_APP_URL}/conversations/${conversationId}`)
  )
)