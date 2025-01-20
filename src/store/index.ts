import { configureStore } from "@reduxjs/toolkit";
import { myAppApi } from "../api";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./reducers";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(myAppApi.middleware),
  reducer: rootReducer,
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
