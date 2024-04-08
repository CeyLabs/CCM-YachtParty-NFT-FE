import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  btcBalance: 0,
};

const accountProfileSlice = createSlice({
  name: "accountProfile",
  initialState,
  reducers: {
    updateAccountProfile: (state, action) => {
      state.show = action.payload.btcBalance || state.btcBalance;
    },
  },
});

export const { updateAccountProfile } = accountProfileSlice.actions;

export default accountProfileSlice.reducer;
