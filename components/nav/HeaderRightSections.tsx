import React from "react";
import { View, StyleSheet } from "react-native";

export const HeaderRightSection = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <View style={styles.headerButtonContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  headerButtonContainer: {
    flexDirection: "row",
    minWidth: 28,
    minHeight: 28,
    marginRight: 0,
  },
});
