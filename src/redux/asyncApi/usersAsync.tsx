import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllMyChats = createAsyncThunk(
  "chats/fetchAllMyChats",
  async ({ userId }: { userId?: string }, { }) => (
    axios.get(`${process.env.REACT_APP_URL}/conversations/mychats?from=${userId}`)
  )
)