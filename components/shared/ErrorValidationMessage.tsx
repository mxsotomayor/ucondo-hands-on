import { lightTheme } from "@/shared/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, View } from "react-native";

function ErrorValidationMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <AntDesign name="warning" size={14} color={lightTheme.colors.secondary} />
      <Text
        style={{
          color: lightTheme.colors.secondary,
        }}
      >
        {message}
      </Text>
    </View>
  );
}

export default ErrorValidationMessage;
