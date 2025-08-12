import React from "react";
import { Text } from "react-native";

function ErrorValidationMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <Text
      style={{
        color: "#d739a2",
      }}
    >
      {message}
    </Text>
  );
}

export default ErrorValidationMessage;
