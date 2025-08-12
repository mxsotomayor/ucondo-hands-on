import React from "react";
import { Text, TextInput, View } from "react-native";

interface CodeInputProps {
  code?: string;
  disabled?: boolean;
  onChange: (code: string) => void;
}

function CodeInput({ code, disabled = true, onChange }: CodeInputProps) {
  const isRoot = code ? code?.split?.(".").length === 1 : false;

  const codeParts = code ? code.split?.(".") : [];

  const rootCode = code
    ? codeParts.slice(0, codeParts.length - 1).join(".") + "."
    : "";

  return (
    <View
      style={{
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        paddingHorizontal: 16,
        backgroundColor: code ? "#fff" : "#d4cde1",
      }}
    >
      <Text
        style={{
          fontWeight: 700,
        }}
      >
        {rootCode}
      </Text>
      <TextInput
        style={{
          flex: 1,
          padding: 0,
        }}
        value={codeParts.length > 1 ? code?.split(".").pop() : ""}
        placeholder={code ? "999" : ""}
        maxLength={3}
        onChangeText={(value) => onChange(`${rootCode}${value}`)}
        keyboardType="numeric"
        readOnly={isRoot || disabled}
      />
    </View>
  );
}

export default CodeInput;
