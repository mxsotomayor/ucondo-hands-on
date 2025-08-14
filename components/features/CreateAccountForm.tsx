import { trans } from "@/i18n/translate";
import { AccountModel } from "@/models";
import { useAccountStore } from "@/stores/accountStore";
import { useNewAccountStore } from "@/stores/useNewAccountStore";
import { useDebouncer } from "@/utils";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect } from "react";
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
import { lightTheme } from "@/shared/theme";

function CreateAccountForm() {
  const { accounts } = useAccountStore();

  const debouncer = useDebouncer();

  const { data, setFields, clear, errors, setErrors } = useNewAccountStore();

  const accountSelectRef = React.useRef<BottomSheet>(null);

  const handleSelectAccount = (account: AccountModel) => {
    accountSelectRef.current?.close();

    const lastChild = accounts.findLast(
      (item) =>
        item.code.split(".").length === account.code.split(".").length + 1 &&
        item.code.startsWith(`${account.code}.`)
    );

    let proposalCode = "";

    if (lastChild) {
      const parts = lastChild.code.split(".").map((i) => parseInt(i));

      const newValRecommended = parts[parts.length - 1] + 1;

      if (newValRecommended > 999) {
        const newCode = findAccountNextParent(parts.join("."), accounts);
        proposalCode = newCode;
      } else {
        parts[parts.length - 1] = newValRecommended;
        proposalCode = `${parts.join(".")}`;
      }
    } else {
      const parts = account.code.split(".").map((i) => parseInt(i));
      parts.push(1);
      proposalCode = `${parts.join(".")}`;
    }

    setFields({
      rootAccount: account,
      code: proposalCode,
    });
  };

  const handleChangeCode = (value: string) => {
    setFields({
      code: `${prefix}.${value}`,
    });

    debouncer(() => {
      if (accountExist(`${prefix}.${value}`, accounts)) {
        setErrors({
          code: `Introduza outro código, o valor '${prefix}.${value}' já esta em uso.`,
        });
      }
    });
  };

  const prefix = data?.code
    ? data.code
        .split(".")
        .slice(0, data.code.split(".").length - 1)
        .join(".")
    : "";

  const suffix = data?.code
    ? data.code.split(".")[data.code.split(".").length - 1]
    : "";

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        rowGap: 16,
        flex: 1,
      }}
    >
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

        <View
          style={{
            ...styles.inputText,
            flexDirection: "row",
            alignItems: "center",
            columnGap: 0,
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              fontWeight: 600,
            }}
          >
            {prefix !== "" ? `${prefix}.` : ""}
          </Text>
          <TextInput
            value={suffix}
            maxLength={3}
            readOnly={!data?.rootAccount}
            keyboardType="number-pad"
            style={{
              color: lightTheme.colors.text,
              flex: 1,
              paddingHorizontal: 0,
            }}
            placeholder="999"
            onChangeText={handleChangeCode}
          />
        </View>
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
          style={{ ...styles.inputText, paddingHorizontal: 16 }}
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
            ...styles.inputText,
            backgroundColor: data?.rootAccount?.code ? "#e1daec" : "#d4cde1",
          }}
        />
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

//  FEATURE HELPERS

/**
 * increase code by 1
 * @example code 1 => 2
 * @example code 1.1 => 1.2
 *  */
const incrementCodeAccount = (code: string): string => {
  const vals = code.split(".").map((a) => parseInt(a));
  if (vals.length === 1) return (vals[0] + 1).toString();
  vals[vals.length - 1] = vals[vals.length - 1] + 1;
  return vals.join(".");
};

/**
 * Given a account code try to find or recommend a parent at the same level
 * @param code
 * @param accounts
 */
const accountExist = (code: string, accounts: AccountModel[]): boolean => {
  return accounts.findIndex((i) => code === i.code) !== -1;
};

const pruneAccountNumber = (code: string) => {
  const codeParts = code.split(".");
  return codeParts.slice(0, codeParts.length - 1).join(".");
};

const findAccountNextParent = (code: string, accounts: AccountModel[]) => {
  let newCode = incrementCodeAccount(pruneAccountNumber(code));

  console.log("Looking for", newCode);

  if (newCode.endsWith(".1000")) {
    while (code.endsWith(".999")) {
      code = pruneAccountNumber(code);
      console.log("pruned", code);
    }
    newCode = incrementCodeAccount(code);
    console.log("look  again for", newCode);
  }

  for (let account of accounts.filter(
    (a) => a.code.split(".").length === newCode.split(".").length
  )) {
    if (account.code !== newCode) {
      console.log("new possible parent", newCode);

      while (accountExist(newCode, accounts)) {
        console.log("this is taken", newCode);
        newCode = incrementCodeAccount(newCode);
        console.log("new recommendation increased", newCode);
      }

      console.log("no exist!! use this", newCode);

      break;
    }

    newCode = incrementCodeAccount(account.code);
  }

  return newCode;
};

const styles = StyleSheet.create({
  inputText: {
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    color: lightTheme.colors.text,
  },
  fromInputGrid: {
    rowGap: 8,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 500,
  },
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
    padding: 36,
    alignItems: "center",
  },
});

export default CreateAccountForm;
