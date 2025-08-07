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
    backgroundColor: "#f0edf5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    rowGap: 6,
    overflow:"hidden"
  },
});
