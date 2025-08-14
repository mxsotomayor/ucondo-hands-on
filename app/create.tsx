import CreateAccountForm from "@/components/features/CreateAccountForm";
import ScreenBody from "@/components/shared/ScreenBody";
import { lightTheme } from "@/shared/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.mainView}>
          <ScreenBody>
            <CreateAccountForm />
          </ScreenBody>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 8,
    backgroundColor: lightTheme.colors.primary,
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
});
