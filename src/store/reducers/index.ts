import { myAppApi } from "@/src/api";
import { combineReducers, UnknownAction } from "redux";
import { cartReducer, cartSlice } from "./cartReducer";
import { transactionReducer, transactionSlice } from "./transactionReducer";

// ini akan berisi semua reducer slice yang dibuat
// kamu bisa membuat reducer slice di folder reducers
const reducers = {
  [myAppApi.reducerPath]: myAppApi.reducer,
  [cartSlice.name]: cartReducer,
  [transactionSlice.name]: transactionReducer,
};
const combinedReducers = combineReducers(reducers);

const rootReducer = (state: any, action: UnknownAction) => {
  return combinedReducers(state, action);
};
export type RootStateType = ReturnType<typeof combineReducers>;

export default rootReducer;
