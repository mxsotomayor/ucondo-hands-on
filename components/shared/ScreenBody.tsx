import { lightTheme } from "@/shared/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ScreenBodyProps {
  children: React.ReactNode;
}

function ScreenBody({ children }: ScreenBodyProps) {
  return <View style={styles.scrollViewStyle}>{children}</View>;
}

export default ScreenBody;

const styles = StyleSheet.create({
  scrollViewStyle: {
    height: 100,
    backgroundColor: lightTheme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    rowGap: 6,
    overflow: "hidden",
  },
});
