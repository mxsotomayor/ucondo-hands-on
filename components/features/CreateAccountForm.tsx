import { trans } from "@/i18n/translate";
import { AccountModel } from "@/models";
import {useAccountStore} from "@/stores/accountStore";
import { useNewAccountStore } from "@/stores/useNewAccountStore";
import { useDebouncer } from "@/utils";
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
import ErrorValidationMessage from "../shared/ErrorValidationMessage";
import AccountBSSelector from "../ui/AccountBSSelector";
import CodeInput from "../ui/CodeInput";

function CreateAccountForm() {

  const debouncer = useDebouncer()

  const { accounts } = useAccountStore();

  const { data, setFields, errors } = useNewAccountStore();

  const accountSelectRef = React.useRef<BottomSheet>(null);

  const handleSelectAccount = (account: AccountModel) => {
    accountSelectRef.current?.close();

    const lastChild = accounts.findLast((item) =>
      item.code.startsWith(`${account.code}.`)
    );

    if (lastChild) {
      const codeParts = lastChild.code.split(".").map((i) => parseInt(i));
      const codeProposal = codeParts[codeParts.length - 1] + 1;
      setFields({
        code: `${account.code}.${codeProposal.toString()}`,
      });
    }else{
      setFields({
        code: `${account.code}.1`,
      });
    }

    setFields({
      rootAccount: account,
      type: account.type,
    });
  };

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        rowGap: 16,
        flex: 1,
      }}
    >
      <Text>{JSON.stringify(data)}</Text>
      <View
        style={{
          height: 44,
          justifyContent: "flex-end",
          paddingBottom: 4,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          Dados da conta
        </Text>
      </View>
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
            {data?.rootAccount
              ? `${data.rootAccount?.code} - ${data.rootAccount.name}`
              : "Selecione Receita"}
          </Text>
          <AntDesign name="down" size={20} color={"#666"} />
        </TouchableOpacity>
        <ErrorValidationMessage message={errors?.rootAccount} />
      </View>
      
      {/* Proposal code */}
      <View style={styles.fromInputGrid}>
        <Text style={styles.formLabel}>Código</Text>
        <CodeInput
          code={data?.code}
          disabled={data?.rootAccount === null}
          onChange={(value) => {
            setFields({
              code: value,
            });

            debouncer(()=>{
              console.log("search for code", value);
            })
          }}
        />
        <ErrorValidationMessage message={errors?.code} />
      </View>

      {/* Account Name */}
      <View style={styles.fromInputGrid}>
        <Text style={styles.formLabel}>Nome</Text>
        <TextInput
          value={data?.name}
          onChangeText={(value) => {
            setFields({
              name: value,
            });
          }}
          style={{
            height: 44,
            borderRadius: 10,
            paddingHorizontal: 8,
            backgroundColor: "#fff",
          }}
        />
        <ErrorValidationMessage message={errors?.name} />
      </View>

      {/* Account Type */}
      <View style={styles.fromInputGrid}>
        <Text style={styles.formLabel}>Tipo</Text>
        <TextInput
          readOnly
          value={trans(data?.rootAccount?.type ?? "")}
          style={{
            height: 44,
            borderRadius: 10,
            paddingHorizontal: 8,
            backgroundColor: data?.rootAccount?.code ? "#e1daec" : "#d4cde1",
          }}
        />
        <ErrorValidationMessage message={errors?.type} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            ...styles.formLabel,
            color: data?.releasable ? "#383636" : "#ababab",
          }}
        >
          Aceita Lançamentos
        </Text>
        <Switch
          trackColor={{ false: "#cdcdcd", true: "#6c0c67" }}
          thumbColor={data?.releasable ? "#b826f2" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) =>
            setFields({
              releasable: value,
            })
          }
          value={data?.releasable}
        />
      </View>

      <AccountBSSelector
        accounts={accounts}
        onSelect={handleSelectAccount}
        initialState={-1}
        bottomSheetRef={accountSelectRef}
      />
    </View>
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

export default CreateAccountForm;
