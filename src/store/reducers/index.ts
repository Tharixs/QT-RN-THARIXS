import { myAppApi } from "@/src/api";
import { combineReducers, UnknownAction } from "redux";

// ini akan berisi semua reducer slice yang dibuat
// kamu bisa membuat reducer slice di folder reducers
const reducers = {
  [myAppApi.reducerPath]: myAppApi.reducer,
};
const combinedReducers = combineReducers(reducers);

const rootReducer = (state: any, action: UnknownAction) => {
  return combinedReducers(state, action);
};
export type RootStateType = ReturnType<typeof combineReducers>;

export default rootReducer;
