import { useGetProductsQuery } from "@/src/api/productApi";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import useDebounce from "@/src/hooks/useDebounce";
import {
  deleteProductOnCart,
  ProductWithQty,
  saveProductToCart,
} from "@/src/store/reducers/cartReducer";
import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import ButtonAction from "@/src/components/ButtonAction";
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen() {
  const productsOnStorage: ProductWithQty[] = useSelector(
    (state: any) => state?.cartSlice?.products || [],
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(30);
  const debounceSearch = useDebounce(search, 500);
  const {
    data: productsData,
    refetch,
    isFetching,
  } = useGetProductsQuery(
    {
      params: {
        limit: debounceSearch ? 1000 : limit,
      },
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const filteredProducts = productsData?.products.filter((item) =>
    item.title.toLocaleLowerCase().includes(search),
  );

  return (
    <SafeAreaView className="flex-1 bg-blue-700">
      <View className="gap-4 p-4">
        <View>
          <Text className="text-3xl font-bold text-white">Product List</Text>
          <Text className="text-md font-light text-slate-200">
            Search what you want here
          </Text>
        </View>
        <View className="flex-row items-center border border-blue-700 rounded-full p-2 mb-4 bg-white shadow-md shadow-slate-700 gap-2">
          <View className="rounded-full bg-blue-700 p-2 ">
            <AntDesign name="search1" size={24} color="white" />
          </View>
          <TextInput
            value={search}
            className=" flex-1"
            onChangeText={setSearch}
            placeholder="Search product ..."
            inlineImageLeft={"search1"}
          />
          {search && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <AntDesign name="closecircle" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        numColumns={2}
        data={filteredProducts}
        onEndReachedThreshold={0.5}
        columnWrapperStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="p-4 bg-slate-100 rounded-tl-3xl rounded-tr-3xl"
        ListEmptyComponent={
          !isFetching && !filteredProducts?.length ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-2xl font-bold text-slate-700">
                Product Not Found
              </Text>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isFetching} />
        }
        onEndReached={() => {
          if (
            productsData?.limit &&
            productsData?.total &&
            productsData?.limit < productsData?.total
          ) {
            setLimit(productsData?.limit + 30);
          }
        }}
        contentContainerStyle={{
          gap: 16,
          flex: filteredProducts?.length ? 0 : 1,
        }}
        renderItem={({ item }) => (
          <View className="flex-1 border border-blue-500 rounded-lg mt-2 gap-4 bg-white  shadow-md shadow-slate-700 justify-between">
            <View className="border border-slate-200 mx-4 mt-4">
              <Image
                resizeMode="contain"
                source={{ uri: item.thumbnail }}
                className="w-full h-40 justify-center items-center"
              />
            </View>
            <View className="gap-2 px-4">
              <Text className="font-bold text-md">{item.title}</Text>
              <Text className="font-normal text-sm color-slate-700">
                {item.description.slice(0, 25) + " ..."}
              </Text>
              <View className="flex-row gap-2 justify-between items-center">
                <View className="flex-row gap-2 justify-center items-center">
                  <IconSymbol name="star.fill" color={"orange"} />
                  <Text>{item.rating}</Text>
                </View>
                <Text className="font-normal text-md color-blue-700">
                  {item?.price.toString().replace(".", "")}
                </Text>
              </View>
            </View>
            {productsOnStorage.find((product) => product.id === item.id) ? (
              <View className="flex-row gap-4 justify-center items-center mb-4">
                <ButtonAction
                  onAdd={() => dispatch(saveProductToCart(item))}
                  onMinus={() => dispatch(deleteProductOnCart(item.id))}
                  productsOnStorage={productsOnStorage}
                  item={item}
                />
              </View>
            ) : (
              <TouchableOpacity
                className="bg-blue-700 rounded-full justify-center items-center mb-4 mx-2 p-4"
                onPress={() => dispatch(saveProductToCart(item))}
              >
                <Text className="text-white text-md font-medium">
                  Add To Cart
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
