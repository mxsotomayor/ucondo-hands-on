import ScreenBody from "@/components/shared/ScreenBody";
import React from "react";
import { StyleSheet, View } from "react-native";
import HomeAccountsList from "@/components/features/HomeAccountsList";
import SearchInput from "@/components/ui/SearchInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHomeAccountFilterStore } from "@/stores/homeAccountFilterStore";
import { useDebouncer } from "@/utils";
import { lightTheme } from "@/shared/theme";
import Toast from "react-native-toast-message";

export default function Index() {
  const { setFilterText } = useHomeAccountFilterStore();
  const debouncer = useDebouncer();

  return (
    <SafeAreaView style={{}} edges={["left", "right", "bottom"]}>
      <View style={styles.mainView}>
        <View
          style={{
            paddingVertical: 16,
            paddingHorizontal: 16
          }}
        >
          <SearchInput
            onChange={(value) => {
              debouncer(() => {
                console.log("filter for", value);
                setFilterText(value);
              });
            }}
          />
        </View>
        <ScreenBody>
          <HomeAccountsList />
        </ScreenBody>
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: lightTheme.colors.primary,
    height: "100%",
  },
});
