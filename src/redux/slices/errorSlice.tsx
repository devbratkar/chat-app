import { createSlice } from "@reduxjs/toolkit";

interface errorSliceI {
  errorMessage: string;
  show: boolean;
}

const initialState: errorSliceI = {
  errorMessage: "",
  show: false,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state, { payload }) => {
      state.errorMessage = payload;
      state.show = true;
    },
    dismissError: (state) => {
      state.errorMessage = "";
      state.show = false
    }
  },
});

export const { showError, dismissError } = errorSlice.actions;
export default errorSlice.reducer;