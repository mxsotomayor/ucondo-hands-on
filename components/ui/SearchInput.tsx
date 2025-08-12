import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

function SearchInput({onChange}:{onChange?: (value:string)=> void}) {
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={{
        ...styles.inputTextWrapper,
        ...(focused
          ? {
              borderColor: "#f4ac1c",
              borderWidth: 3,
            }
          : {}),
      }}
    >
      <AntDesign name="search1" size={24} color="black" />
      <TextInput
        style={styles.inputText}
        placeholder="Pesquisar ..."
        onChangeText={(value) => onChange?.(value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputTextWrapper: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "transparent",
    height: 50,
    borderRadius: 180,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    columnGap: 6,
  },
  inputText: {
    flex: 1,
  },
});

export default SearchInput;
