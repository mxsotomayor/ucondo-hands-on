import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ScreenBody from "@/components/ScreenBody";
import { data } from "@/data";
import accountStore, { AccountModel } from "@/data/stores/accountStore";
import { ACCOUNT_COLORS } from "@/shared/contants";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function Index() {
  const { init, accounts, deleteAccount } = accountStore();

  useEffect(() => {
    const loadData = async () => {
      const value = await AsyncStorage.getItem("accounts");

      if (value !== null) {
        init(JSON.parse(value) as AccountModel[]);
      } else {
        await AsyncStorage.setItem("accounts", JSON.stringify(data));
      }
    };
    loadData();
  }, []);

  // const sortedAccount = React.useMemo(() => sortAccounts(accounts), [accounts]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <View style={{ ...styles.mainView }}>
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          <TextInput style={styles.inputText} />
        </View>

        <ScreenBody>
          {/* header text */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              paddingBottom: 4,
              justifyContent: "space-between",
              height: 48,
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Listagem
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#777",
                fontWeight: 500,
              }}
            >
              {accounts.length} registos
            </Text>
          </View>
          <View>
            <ScrollView contentContainerStyle={styles.scrollItem}>
              {accounts.map((account, index) => (
                <View key={index} style={styles.accountsCard}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color:
                          ACCOUNT_COLORS[
                            parseInt(account.code.split(".")[0]) - 1
                          ] ?? "black",
                      }}
                    >
                      {account.code} -{" "}
                    </Text>

                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: 500,
                        color:
                          ACCOUNT_COLORS[
                            parseInt(account.code.split(".")[0]) - 1
                          ] ?? "black",
                      }}
                    >
                      {account.account_name}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{
                        width: 28,
                        height: 28,
                        backgroundColor: "#f0edf5",
                        borderRadius: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => deleteAccount(account.code)}
                    >
                      <Feather name="trash" size={18} color="#999" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScreenBody>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputText: {
    backgroundColor: "#fff",
    height: 52,
    borderRadius: 100,
  },
  mainView: {
    paddingHorizontal: 8,
    backgroundColor: "purple",
    height: "100%",
  },
  scrollItem: {
    rowGap: 12,
    marginHorizontal: 16,
  },
  accountsCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
