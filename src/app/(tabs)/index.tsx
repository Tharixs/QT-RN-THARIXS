import { useGetAllUserQuery } from "@/src/api/usersApi";
import { View, Text, FlatList, Image } from "react-native";

export default function HomeScreen() {
  const { data: usersData } = useGetAllUserQuery(
    {
      params: {
        page: 1,
        limit: 100,
      },
    },
    {
      refetchOnMountOrArgChange: true,
      selectFromResult: ({ data, ...rest }) => ({
        data: (data as any)?.users?.filter((user: any) => user.height < 170),
      }),
    },
  );

  return (
    <View className="flex-1 m-4">
      <FlatList
        numColumns={2}
        data={usersData.slice(0, 10)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 20,
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Image
                  source={{ uri: item.image }}
                  width={150}
                  height={150}
                  resizeMode="contain"
                />
                <View style={{ flex: 1 }}>
                  <Text className="font-bold text-2xl">
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text className="font-medium text-2xl">{item.age}</Text>
                  <Text className="font-medium text-2xl">{item.height}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

{
  /* <View
            style={{
              justifyContent: "center",
              marginVertical: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: item.image }}
                width={100}
                height={100}
                resizeMode="contain"
              />
              <View>
                <Text className="font-bold text-2xl">
                  {item.firstName} {item.lastName}
                </Text>
                <Text className="font-medium text-2xl">{item.age}</Text>
                <Text className="font-medium text-2xl">{item.height}</Text>
              </View>
            </View>
          </View> */
}
