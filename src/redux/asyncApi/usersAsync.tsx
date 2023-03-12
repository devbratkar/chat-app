import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showError } from "../slices/errorSlice";

export const fetchAllMyChats = createAsyncThunk(
  "chats/fetchAllMyChats",
  async ({ userId }: { userId?: string }, { }) => (
    axios.get(`${process.env.REACT_APP_URL}/conversations/mychats?from=${userId}`)
  )
)

export const loginAsync = createAsyncThunk(
  "chats/loginAsync",
  async (payload: any, { }) => (
    axios.post(`${process.env.REACT_APP_URL}/users/login`, payload || {})
  )
)

export const signupAsync = createAsyncThunk(
  "chats/signupAsync",
  async (payload: any, { dispatch }) => (
    axios.post(`${process.env.REACT_APP_URL}/users`, payload || {}).catch((err: any) => dispatch(showError(err)))
  )
)

export const reauthenticateAsync = createAsyncThunk(
  "chats/reauthenticateAsync",
  async (payload: any, { }) => (
    axios.get(`${process.env.REACT_APP_URL}/users/${payload}`, payload || {})
  )
)