import { useGetAllJobQuery } from "@/src/api/jobApi";
import { View, Text } from "react-native";

export default function HomeScreen() {
  const { data: jobData, error } = useGetAllJobQuery(
    {
      params: { page: 1, limit: 10 },
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  console.log(jobData, error);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Hello World</Text>
    </View>
  );
}
