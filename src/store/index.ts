import { configureStore } from "@reduxjs/toolkit";
import { myAppApi } from "../api";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./reducers";
import { persistStore } from "redux-persist";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(myAppApi.middleware),
  reducer: rootReducer,
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
