import accountStore, { AccountModel } from "@/data/stores/accountStore";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function AccountBSSelector({
  bottomSheetRef,
  handleSheetChanges,
  initialState = -1,
  onSelect,
}: {
  initialState: -1 | 0;
  onSelect: (account: AccountModel) => void;
  bottomSheetRef: React.Ref<BottomSheet>;
  handleSheetChanges?: () => void;
}) {
  const { accounts } = accountStore();

  const renderItem = useCallback(
    (item: AccountModel) => (
      <View key={item.code}>
        <TouchableOpacity
          style={{
            height: 38,
            justifyContent:"center",
          }}
          onPress={() => onSelect(item)}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {item.code} - {item.account_name}
          </Text>
        </TouchableOpacity>
      </View>
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={initialState}
      snapPoints={["70%", "100%"]}
      enablePanDownToClose
    >
      <View
        style={{
          paddingHorizontal: 16,
          height: 34,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Selecione Receita
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
    backgroundColor: "purple",
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

export default AccountBSSelector;
