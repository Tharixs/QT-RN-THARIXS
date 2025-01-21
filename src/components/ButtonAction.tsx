import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { ProductWithQty } from "@/src/store/reducers/cartReducer";
import { Product } from "@/src/types/product";

const ButtonAction = ({
  onAdd,
  onMinus,
  productsOnStorage,
  item,
}: {
  onAdd: () => void;
  onMinus: () => void;
  productsOnStorage: ProductWithQty[];
  item: Product;
}) => {
  return (
    <>
      <TouchableOpacity
        className="bg-blue-700 rounded-full w-8 h-8 justify-center items-center"
        onPress={onMinus}
      >
        <Text className="text-white">-</Text>
      </TouchableOpacity>
      <Text className="font-bold">
        {productsOnStorage.find((product) => product.id === item.id)?.qty || 0}
      </Text>
      <TouchableOpacity
        className="bg-blue-700 rounded-full w-8 h-8 justify-center items-center"
        onPress={onAdd}
      >
        <Text className="text-white text-center justify-center items-center">
          +
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default ButtonAction;
