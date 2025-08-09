import ScreenHeader from "@/components/ScreenHeader";
import accountStore from "@/data/stores/accountStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function RootLayout() {
  const { addAccount } = accountStore();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "purple" },
          headerTitle: (props) => (
            <ScreenHeader
              title="Plano de Contas"
              actions={
                <View>
                  <Link href="/create">
                    <AntDesign name="plus" size={24} color="#fff" />
                  </Link>
                </View>
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "purple" },
          headerTitle: (props) => (
            <ScreenHeader
              title="Inserir Conta"
              actions={
                <TouchableOpacity>
                  <AntDesign name="check" size={24} color="#fff" />
                </TouchableOpacity>
              }
            />
          ),
        }}
      />
    </Stack>
  );
}
