import { Product } from "@/src/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ProductWithQty extends Product {
  qty: number;
}

const initialState = {
  products: [] as ProductWithQty[],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    saveProductToCart(state, action) {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        state.products.push({ ...action.payload, qty: 1 });
      }
    },
    deleteProductOnCart(state, action) {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload,
      );

      if (productIndex !== -1) {
        const product = state.products[productIndex];

        if (product.qty > 1) {
          product.qty -= 1;
        } else {
          state.products.splice(productIndex, 1);
        }
      }
    },
    deleteAllProductOnCart(state) {
      state.products = [];
    },
  },
});

export const cartReducer = persistReducer(
  {
    key: "cart",
    storage: AsyncStorage,
    whitelist: ["products"],
  },
  cartSlice.reducer,
);

export const {
  saveProductToCart,
  deleteProductOnCart,
  deleteAllProductOnCart,
} = cartSlice.actions;
