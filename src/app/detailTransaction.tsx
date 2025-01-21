import { View, Text, ScrollView } from "react-native";
import React from "react";
import { TransactionState } from "../store/reducers/transactionReducer";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function DetailTransaction() {
  const params = useLocalSearchParams();
  const transactionsOnStorage: TransactionState["transactions"] = useSelector(
    (state: any) => state?.transactionSlice?.transactions || [],
  );

  const filteredTransaction = transactionsOnStorage.find(
    (transaction) => transaction.id === params.transactionId,
  );

  return (
    <>
      <ScrollView className="flex-1 bg-white p-4">
        <View className="border-2 border-slate-200 border-dashed" />
        <View className="items-center gap-2 my-4">
          <AntDesign name="checkcircle" size={80} color="#22c55e" />
          <Text className="font-bold text-2xl">Transaksi Berhasil</Text>
          <Text className="font-medium text-md">
            {new Date(filteredTransaction?.date!).toLocaleString("id-ID")}
          </Text>
        </View>
        <Text className="font-bold text-lg mt-8 border-b border-slate-200 pb-4">
          Payment Detail
        </Text>
        <View className="flex-row items-center justify-between mt-4 border-b border-slate-200 pb-8">
          <Text className="font-light text-md">Payment Method</Text>
          <Text className="font-semibold text-md text-slate-500">
            {filteredTransaction?.paymentMethod}
          </Text>
        </View>
        <View className="flex-row items-center justify-between mt-4 border-b border-slate-200 pb-4">
          <Text className="font-light text-md">Transaction ID</Text>
          <Text className="font-semibold text-md text-slate-500">
            {filteredTransaction?.id}
          </Text>
        </View>
        <View className="flex-row items-center justify-between mt-4 border-b border-slate-200 pb-4">
          <Text className="font-light text-md">Card Number</Text>
          <Text className="font-semibold text-md text-slate-500">
            {filteredTransaction?.cardNumber || "-"}
          </Text>
        </View>
        <Text className="font-bold text-lg mt-8 border-b border-slate-200 pb-4">
          List Product
        </Text>
        {filteredTransaction?.products.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center justify-between mt-4 border-b border-slate-200 pb-4"
          >
            <Text className="font-medium text-md">{item.title}</Text>
            <Text className="font-medium text-md color-blue-500">
              {item.price.toString().replace(".", "")} x {item.qty}
            </Text>
          </View>
        ))}
        <View className="flex-1 bg-white rounded-xl gap-4 my-8">
          <View className="border-[2px] border-slate-200 border-dashed" />
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-lg">TOTAL</Text>
            <Text className="font-bold text-lg color-blue-500">
              {filteredTransaction?.totalPrice}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
