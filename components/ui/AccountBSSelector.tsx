import { AccountModel } from "@/models";
import { lightTheme } from "@/shared/theme";
import Feather from "@expo/vector-icons/Feather";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function AccountBSSelector({
  bottomSheetRef,
  accounts,
  handleSheetChanges,
  initialState = -1,
  onSelect,
}: {
  initialState: -1 | 0;
  accounts: AccountModel[];
  onSelect: (account: AccountModel) => void;
  bottomSheetRef: React.Ref<BottomSheet>;
  handleSheetChanges?: () => void;
}) {
  const renderItem = useCallback(
    (item: AccountModel) => (
      <View
        key={item.code}
        style={{
          backgroundColor: item.releasable ? "#f9f7fe" : "#ffffff",
          opacity: item.releasable ? 0.8 : 1,
          paddingHorizontal: 8,
          paddingVertical: 4,
          marginVertical: 2,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          disabled={item.releasable}
          style={{
            height: 38,
            justifyContent: "center",
          }}
          onPress={item.releasable ? undefined : () => onSelect(item)}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: item.releasable ? 400 : 600,
              flexDirection: "row",
              alignItems: "center",
              opacity: item.releasable ? 0.3 : 1,
            }}
          >
            {item.releasable && <Feather name="lock" size={20} color="black" />}{" "}
            {item.code} - {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [onSelect]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={initialState}
      snapPoints={["100%"]}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: lightTheme.colors.card,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          height: 36,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Selecione Conta Pai
        </Text>
      </View>
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {accounts.map(renderItem)}
      </BottomSheetScrollView>
    </BottomSheet>
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default React.memo(AccountBSSelector);
