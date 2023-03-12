import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginAsync, reauthenticateAsync, signupAsync } from '../asyncApi';

interface UserInfo {
  _id?: string;
  name?: string;
  phone?: string
}

interface userSliceI {
  token: string | null,
  userInfo: (object & Partial<UserInfo>) | null,
  authenticated: boolean,
}

const initialState: userSliceI = {
  token: null,
  userInfo: null,
  authenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state = { ...initialState };
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(loginAsync.fulfilled),
      (state, { payload }: any) => {
        const data = payload?.data?.data;
        if (data) {
          state.authenticated = true;
          state.userInfo = data;
          localStorage.setItem("user", JSON.stringify({ _id: data?._id, name: data?.name, phone: data?.phone }))
        };
      });

    builder.addMatcher(
      isAnyOf(reauthenticateAsync.fulfilled),
      (state, { payload }: any) => {
        const data = payload?.data;
        if (data) {
          state.authenticated = true;
          state.userInfo = data;
          localStorage.setItem("user", JSON.stringify({ _id: data?._id, name: data?.name, phone: data?.phone }))
        };
      });

    builder.addMatcher(
      isAnyOf(signupAsync.fulfilled),
      (state, { payload }: any) => {
        const data = payload?.data?.data;
        if (data) {
          state.authenticated = true;
          state.userInfo = data;
          localStorage.setItem('token', 'token');
          localStorage.setItem("user", JSON.stringify({ _id: data?._id, name: data?.name, phone: data?.phone }));
        };
      });

    builder.addMatcher(
      isAnyOf(reauthenticateAsync.rejected),
      (state, { payload }: any) => {
        state = { ...initialState };
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  }
});


export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;