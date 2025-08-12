import { AccountModel } from '@/models';
import Feather from '@expo/vector-icons/Feather';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
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
      <View key={item.code} style={{
        backgroundColor: item.releasable === "Sim" ? "#f9f7fe":"#ede6fa",
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 2,
        borderRadius: 10
      }}>
        <TouchableOpacity
          disabled={item.releasable === "Sim"}
          style={{
            height: 38,
            justifyContent: "center",
          }}
          onPress={
            item.releasable === "Sim" ? undefined : () => onSelect(item)
          }
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: item.releasable === "Sim" ? 400 : 600,
              flexDirection:"row",
              alignItems:"center",
              opacity: item.releasable === "Sim" ? 0.3 : 1,
            }}
          >
           {
           item.releasable === "Sim" && <Feather name="lock" size={20} color="black" />
           } {item.code} - {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [onSelect]
  );

  const data = useMemo(()=>accounts.filter((accounts)=>accounts.releasable !== "Sim"),[accounts])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={initialState}
      snapPoints={["100%"]}
      enablePanDownToClose
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
          Selecione Receita
        </Text>
      </View>
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {data.map(renderItem)}
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

export default React.memo(AccountBSSelector);
