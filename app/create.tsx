import AccountBSSelector from "@/components/AccountBSSelector";
import ScreenBody from "@/components/ScreenBody";
import { AccountModel } from "@/data/stores/accountStore";
import AntDesign from "@expo/vector-icons/AntDesign";

import BottomSheet from "@gorhom/bottom-sheet";
import React from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

function CreateScreen() {
  const [account, setAccount] = React.useState<AccountModel | null>(null);

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const accountSelectRef = React.useRef<BottomSheet>(null);

  const handleSelectAccount = (account: AccountModel) => {
    accountSelectRef.current?.close();
    setAccount(account);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.mainView}>
          <ScreenBody>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                rowGap: 16,
              }}
            >
              {/* Top Level Selected Account */}
              <View
                style={{
                  rowGap: 8,
                }}
              >
                <Text style={styles.formLabel}>Conta Pai</Text>
                <TouchableOpacity
                  style={{
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 16,
                  }}
                  onPress={() => accountSelectRef.current?.snapToIndex(0)}
                >
                  <Text>
                    {account !== null
                      ? `${account.code} - ${account.account_name}`
                      : "Selecione Receita"}
                  </Text>
                  <AntDesign name="down" size={20} color={"#666"} />
                </TouchableOpacity>
              </View>
              {/* Proposal code */}
              <View style={styles.fromInputGrid}>
                <Text style={styles.formLabel}>Código</Text>
                <TextInput
                  keyboardType="decimal-pad"
                  readOnly={account === null}
                  value={account ? account.code : ""}
                  style={{
                    height: 44,
                    borderRadius: 10,
                    paddingHorizontal: 8,
                    backgroundColor: "#fff",
                  }}
                />
              </View>
              <View style={styles.fromInputGrid}>
                <Text style={styles.formLabel}>Tipo</Text>
                <Text>{account?.type}</Text>
              </View>
              <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between"
              }}>
                <Text style={styles.formLabel}>Aceita Lançamentos</Text>
                <Switch
                  trackColor={{ false: "#cdcdcd", true: "#d78cfd" }}
                  thumbColor={isEnabled ? "#a31fe5" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </ScreenBody>
        </View>

        <AccountBSSelector
          onSelect={handleSelectAccount}
          initialState={-1}
          bottomSheetRef={accountSelectRef}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fromInputGrid: {
    rowGap: 8,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 500,
  },
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
    padding: 36,
    alignItems: "center",
  },
});

export default CreateScreen;
