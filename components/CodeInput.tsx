import React from "react";
import { Text, TextInput, View } from "react-native";

interface CodeInputProps {
  prefix: string;
  code?: string;
  disabled?: boolean;
  onChange: (code: string) => void;
}

function CodeInput({
  prefix,
  code,
  disabled = true,
  onChange,
}: CodeInputProps) {
  return (
    <View
      style={{
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        paddingHorizontal: 16,
        backgroundColor: prefix ? "#fff" : "#d4cde1",
      }}
    >
      <Text style={{
        fontWeight: 700
      }}>{`${prefix ? prefix + "." : ""}`}</Text>
      <TextInput
        style={{
          flex: 1,
          padding: 0,
        }}
        value={code}
        placeholder={code}
        onChangeText={onChange}
        keyboardType="numeric"
        readOnly={disabled}
      />
    </View>
  );
}

export default CodeInput;
