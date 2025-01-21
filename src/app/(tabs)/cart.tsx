import {
  deleteAllProductOnCart,
  deleteProductOnCart,
  ProductWithQty,
  saveProductToCart,
} from "@/src/store/reducers/cartReducer";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useRef, useState } from "react";
import ButtonAction from "@/src/components/ButtonAction";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { saveTransaction } from "@/src/store/reducers/transactionReducer";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";

export default function TabTwoScreen() {
  const dispatch = useDispatch();
  const form = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const productsOnStorage: ProductWithQty[] = useSelector(
    (state: any) => state?.cartSlice?.products || [],
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleTotalPrice = useCallback(() => {
    const totalPrice = productsOnStorage.reduce(
      (total, product) =>
        total + Number(product.price.toString().replace(".", "")) * product.qty,
      0,
    );
    return totalPrice;
  }, [productsOnStorage]);

  const handleSubmit = useCallback(
    (data: any) => {
      dispatch(
        saveTransaction({
          totalPrice: handleTotalPrice(),
          paymentMethod: "CARD",
          cardNumber: data.cardNumber,
          products: productsOnStorage,
        }),
      );
      router.push("/transaction");
      setModalVisible(!modalVisible);
      bottomSheetModalRef.current?.close();
      dispatch(deleteAllProductOnCart());
      form.reset();
    },
    [dispatch, form, handleTotalPrice, modalVisible, productsOnStorage],
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  const RenderModalCard = useCallback(
    () => (
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center bg-black/50">
          <View className=" bg-white p-4 gap-4 m-4 rounded-2xl">
            <TouchableOpacity
              className="right-2 top-2 absolute"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign name="closecircle" size={20} color="black" />
            </TouchableOpacity>
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Text className="text-lg font-semibold">Card Number</Text>
                <Text className="text-md font-medium text-red-600">*</Text>
              </View>
              <Controller
                defaultValue={""}
                name="cardNumber"
                control={form.control}
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(e) => onChange(String(e))}
                    placeholder="Enter Card Number"
                    keyboardAppearance="dark"
                    keyboardType="numeric"
                    placeholderClassName="text-slate-300"
                    className="border-[1px] border-gray-300 rounded-xl p-4"
                  />
                )}
              />
              <Text className="text-md font-medium text-slate-300">
                ex: 1234-1234-1234-1234
              </Text>
              {form.formState.errors.cardNumber && (
                <Text className="text-md font-medium text-red-600">
                  Card Number is required
                </Text>
              )}
            </View>
            <TouchableOpacity
              className="mt-4 bg-blue-500 p-4 rounded-full"
              onPress={() => {
                form.handleSubmit(handleSubmit)();
              }}
            >
              <Text className="text-white text-center font-medium">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    ),
    [form, handleSubmit, modalVisible],
  );

  return (
    <GestureHandlerRootView className="flex-1 bg-gray-900">
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1 bg-slate-100">
          <RenderModalCard />
          <View className="mb-4 bg-blue-700 p-4">
            <Text className="text-3xl font-bold text-white">Cart</Text>
            <Text className="text-md font-normal color-slate-200">
              Cek product yang ada di keranjang
            </Text>
          </View>
          {!productsOnStorage.length ? (
            <View className="flex-1 flex-row justify-center items-center">
              <Text className="text-2xl font-semibold color-slate-500">
                No Product in Cart
              </Text>
            </View>
          ) : (
            <FlatList
              data={productsOnStorage}
              contentContainerClassName="p-4"
              renderItem={({ item }) => (
                <View className="flex-1 flex-row justify-between items-center border border-slate-200 rounded-xl p-4 mb-4 bg-white shadow shadow-slate-200">
                  <View className="flex-1">
                    <Text className="font-bold text-xl">{item.title}</Text>
                    <Text className="font-light text-sm">
                      {item.description.slice(0, 25) + "..."}
                    </Text>
                    <Text className="font-medium text-md color-blue-500">
                      {item.price.toString().replace(".", "")} x {item.qty}
                    </Text>
                  </View>
                  <View className="flex-row gap-4 justify-center items-center mb-4">
                    <ButtonAction
                      onAdd={() => dispatch(saveProductToCart(item))}
                      onMinus={() => dispatch(deleteProductOnCart(item.id))}
                      productsOnStorage={productsOnStorage}
                      item={item}
                    />
                  </View>
                </View>
              )}
            />
          )}
        </SafeAreaView>
        {productsOnStorage.length > 0 && (
          <View className="bg-white p-4 gap-4">
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-lg">TOTAL</Text>
              <Text className="font-bold text-lg color-blue-500">
                {handleTotalPrice()}
              </Text>
            </View>
            <View className="border-[2px] border-slate-200 border-dashed" />
            <TouchableOpacity
              onPress={handlePresentModalPress}
              className=" bg-blue-700 rounded-full justify-center items-center p-4"
            >
              <Text className="text-white text-lg font-bold">Payment</Text>
            </TouchableOpacity>
          </View>
        )}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView className="flex-1">
            <View className="bg-white rounded-xl gap-4 m-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-lg">TOTAL</Text>
                <Text className="font-bold text-lg color-blue-500">
                  {handleTotalPrice()}
                </Text>
              </View>
              <View className="border-[2px] border-slate-200 border-dashed" />
              <Text className="font-light text-md text-slate-400">
                Pilih Metode Pembayaran mu
              </Text>
              <View className="flex-row justify-between items-center gap-4">
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    bottomSheetModalRef.current?.close();
                  }}
                  className="flex-1 border border-blue-500 rounded-full justify-center items-center p-4"
                >
                  <Text className="text-blue-500 text-lg font-bold">CARD</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      saveTransaction({
                        totalPrice: handleTotalPrice(),
                        paymentMethod: "CASH",
                        products: productsOnStorage,
                      }),
                    );
                    dispatch(deleteAllProductOnCart());
                    router.push("/(tabs)/transaction");
                    bottomSheetModalRef.current?.close();
                  }}
                  className="flex-1 bg-blue-500 rounded-full justify-center items-center p-4"
                >
                  <Text className="text-white text-lg font-bold">CASH</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
