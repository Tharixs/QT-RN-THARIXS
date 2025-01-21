import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductWithQty } from "./cartReducer";

interface Transaction {
  id: string;
  date: string;
  totalPrice: number;
  paymentMethod: "CARD" | "CASH";
  cardNumber: string;
  products: ProductWithQty[];
}
export interface TransactionState {
  transactions: Transaction[];
}
const initialState: TransactionState = {
  transactions: [],
};

export const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    saveTransaction(state, action) {
      const { totalPrice, paymentMethod, cardNumber, products } =
        action.payload;

      // Generate transaction ID and current date
      const transactionId = `T${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      const currentDate = new Date().toISOString();

      // Create new transaction
      const newTransaction: Transaction = {
        id: transactionId,
        date: currentDate,
        totalPrice,
        paymentMethod,
        cardNumber: paymentMethod === "CARD" ? cardNumber : "",
        products,
      };

      // Add new transaction to the transactions array
      state.transactions.push(newTransaction);
    },
  },
});

export const transactionReducer = persistReducer(
  {
    key: "transaction",
    storage: AsyncStorage,
    whitelist: ["transactions"],
  },
  transactionSlice.reducer,
);

export const { saveTransaction } = transactionSlice.actions;
