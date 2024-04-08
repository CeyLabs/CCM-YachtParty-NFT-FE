import { configureStore } from "@reduxjs/toolkit";
import accountProfileReducer from "./accountProfileSlice";

export const store = configureStore({
  reducer: {
    accountProfile: accountProfileReducer,
  },
});
