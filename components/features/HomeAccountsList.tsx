import { AccountModel } from "@/models";
import { ACCOUNT_COLORS } from "@/shared/contants";
import { useAccountStore } from "@/stores/accountStore";
import { useHomeAccountFilterStore } from "@/stores/homeAccountFilterStore";
import Feather from "@expo/vector-icons/Feather";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DangerConfirmDialog from "../ui/DangerConfirmDialog";
import AccountPreviewDialog from "../ui/AccountPreviewDialog";

const accountMatcher = (account: AccountModel, filter: string): boolean => {
  return (
    account.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
    account.code.startsWith(filter)
  );
};

function HomeAccountsList() {
  const [deletingAccount, setDeletingAccount] = useState<{
    account: AccountModel;
    operation: "preview" | "delete";
  } | null>(null);
  const { init, isFetching, accounts, deleteAccount } = useAccountStore();
  const { filterText } = useHomeAccountFilterStore();

  const accountsFiltered = React.useMemo(() => {
    if (!filterText || filterText === "") return accounts;
    return accounts.filter((account) => accountMatcher(account, filterText));
  }, [filterText, accounts]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AccountPreviewDialog
        account={
          deletingAccount?.operation === "preview"
            ? deletingAccount?.account
            : null
        }
        onAccept={() => {
          setDeletingAccount(null);
        }}
      />
      <DangerConfirmDialog
        visible={deletingAccount?.operation === "delete"}
        title="Deseja excluir a conta"
        subTitle={`${deletingAccount?.account.code} - ${deletingAccount?.account.name} ?`}
        onCancel={() => setDeletingAccount(null)}
        onAccept={() => {
          deleteAccount(deletingAccount?.account.code ?? "");
          setDeletingAccount(null);
        }}
      />

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
          {filterText
            ? `Filtro: ${accountsFiltered.length} itens`
            : `${accounts.length} Registos`}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          //   paddingBottom: 8
        }}
      >
        <ScrollView
          style={{
            paddingBottom: 16,
          }}
          contentContainerStyle={styles.scrollItem}
        >
          {isFetching && <Text>A Carregar...</Text>}
          {accountsFiltered.map((account, index) => (
            <TouchableOpacity
              key={index}
              style={styles.accountsCard}
              onPress={() =>
                setDeletingAccount({
                  account: account,
                  operation: "preview",
                })
              }
            >
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
                  {account.name}
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
                  onPress={() =>
                    setDeletingAccount({
                      operation: "delete",
                      account: account,
                    })
                  }
                >
                  <Feather name="trash" size={18} color="#999" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default HomeAccountsList;
