import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchConversation = createAsyncThunk(
  "chats/fetchConversation",
  async ({ conversationId }: { conversationId: string }, { }) => (
    axios.get(`${process.env.REACT_APP_URL}/conversations/${conversationId}`)
  )
)

export const sendMessageAsync = createAsyncThunk(
  "chats/sendMessageAsync",
  async (payload: object, { }) => (
    axios.post(`${process.env.REACT_APP_URL}/messages`, payload)
  )
)