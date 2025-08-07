import React from "react";
import { Text, View } from "react-native";

function ScreenHeader({ title, actions }: ScreenHeaderProps) {
  return (
    <View
      style={{
        backgroundColor: "purple",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "600",
          fontSize: 22,
        }}
      >
        {title}
      </Text>
      {actions}
    </View>
  );
}

interface ScreenHeaderProps {
  title: string;
  actions: React.ReactNode;
}

export default ScreenHeader;
