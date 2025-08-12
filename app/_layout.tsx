import { useAccountStore } from "@/stores/accountStore";
import { useNewAccountStore } from "@/stores/useNewAccountStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "purple" },
          headerTitleStyle: {
            color: "#ffffff",
          },
          title: "Plano de Contas",
          headerRight: () => <HomeScreenRightOptions />,
        }}
      />
      <Stack.Screen
        name="create"
        options={({ navigation }) => ({
          title: "Inserir Conta",
          headerShadowVisible: false,
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerStyle: { backgroundColor: "purple" },
          headerRight: () => (
            <CreateScreenRightOptions navigation={navigation} />
          ),
        })}
      />
    </Stack>
  );
}

export const HomeScreenRightOptions = () => {
  return (
    <Link href="/create">
      <Ionicons name="add" size={24} color="#fff" />
    </Link>
  );
};

export const CreateScreenRightOptions = ({
  navigation,
}: {
  navigation: any;
}) => {
  const { validate, data, setFields } = useNewAccountStore();
  const { addAccount } = useAccountStore();
  return (
    <TouchableOpacity
      onPress={async () => {
        try {
          if (validate()) {
            addAccount({
              name: data?.name ?? "",
              type: "expenses",
              code: data?.code ?? "",
              releasable: data?.releasable ?? false,
            });
            setFields();
            navigation.goBack();
          }
        } catch (e) {
          console.log("error", e);
        }
      }}
    >
      <AntDesign
        name="save"
        style={{
          fontSize: 24,
        }}
        color="#fff"
      />
    </TouchableOpacity>
  );
};
