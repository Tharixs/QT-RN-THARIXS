import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { TransactionState } from "@/src/store/reducers/transactionReducer";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Transaction() {
  const transactionsOnStorage: TransactionState["transactions"] = useSelector(
    (state: any) => state?.transactionSlice?.transactions || [],
  );

  return (
    <SafeAreaView className="flex-1 bg-blue-700">
      <View className="bg-blue-700 p-4">
        <Text className="text-2xl font-bold text-white">Transaksi</Text>
        <Text className="text-md font-light text-white">Riwayat Transaksi</Text>
      </View>
      <FlatList
        data={transactionsOnStorage}
        contentContainerClassName="gap-4"
        contentContainerStyle={{
          flex: 1,
          paddingVertical: 24,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          backgroundColor: "white",
        }}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <MaterialIcons name="receipt-long" size={100} color="#ccc" />
            <Text className="font-semibold text-2xl text-slate-400">
              Belum Ada Transaksi
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className=" px-4 pt-4 pb-6 rounded-lg border-b border-slate-200">
            <View className=" flex-row justify-between items-center gap-4">
              <View>
                <Text className="font-bold text-3xl text-center text-slate-500">
                  {new Date(item.date).getDate()}
                </Text>
                <Text className="text-center font-normal text-slate-500">
                  {new Date(item.date).toLocaleString("id", { month: "long" })}
                </Text>
                <Text className="text-center font-light text-slate-500">
                  {new Date(item.date).getFullYear()}
                </Text>
              </View>
              <View className="flex-1 justify-center items-center">
                <View className="gap-2">
                  <Text className="font-bold text-2xl color-blue-700">
                    {item.id}
                  </Text>
                  <Text className="font-semibold text-xl color-slate-700">
                    {item.totalPrice}
                  </Text>
                  <Text className="font-normal text-md color-slate-700">
                    Metode Pembayaran Melalui {item.paymentMethod}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                className="justify-center items-center"
                onPress={() =>
                  router.push({
                    pathname: "/detailTransaction",
                    params: { transactionId: item.id },
                  })
                }
              >
                <MaterialIcons name="chevron-right" size={28} color="#1d4ed8" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
