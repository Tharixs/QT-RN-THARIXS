import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";

import { HapticTab } from "@/src/components/HapticTab";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { themes } from "@/src/utils/color-theme";
import { ProductWithQty } from "@/src/store/reducers/cartReducer";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const productsOnStorage: ProductWithQty[] = useSelector(
    (state: any) => state?.cartSlice?.products || [],
  );

  const totalQty = productsOnStorage.reduce(
    (total, product) => total + product.qty,
    0,
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          colorScheme === "dark"
            ? themes.dark["--color-primary-default"]
            : themes.light["--color-primary-default"],
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <>
              {totalQty > 0 && (
                <View className="rounded-full w-5 h-5 absolute bottom-4 right-0 z-10 items-center justify-center bg-red-500">
                  <Text className="text-white text-center font-light text-xs">
                    {totalQty}
                  </Text>
                </View>
              )}
              <IconSymbol size={28} name="cart.fill" color={color} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="wallet.pass.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
