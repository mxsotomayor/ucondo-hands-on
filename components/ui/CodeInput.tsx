import { useAccountStore } from "@/stores/accountStore";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

interface CodeProps {
  rootCode: string;
  proposalCode: string;
}
interface CodeInputProps {
  code?: string;
  disabled?: boolean;
  onChange: (code: string) => void;
}

function CodeInput({ code }: CodeInputProps) {
  const { accounts } = useAccountStore();

  const [fullCode, setFullCode] = useState("");

  const { rootCode, proposalCode } = React.useMemo(() => {
    if (!code)
      return {
        rootCode: "",
        proposalCode: "",
      };

    const lastChild = accounts.findLast((item) =>
      item.code.startsWith(!isRoot ? `${code}.` : fullCode)
    );

    console.log("last child found", lastChild);

    let response: CodeProps = {
      proposalCode: "",
      rootCode: "",
    };

    if (lastChild) {
      const parts = lastChild.code.split(".").map((i) => parseInt(i));

      response = {
        rootCode: [...parts.slice(0, parts.length - 1)].join("."),
        proposalCode: `${parts.pop()! + 1}`,
      };
    } else {
      response = {
        rootCode: `${code}`,
        proposalCode: fullCode.split(".").pop() ?? "",
      };
    }
    return response;
  }, [code]);

  const isRoot = code ? code?.split?.(".").length === 1 : false;

  console.log(isRoot ? "is root" : "no root");

  useEffect(() => {
    setFullCode(code ?? "");
  }, [code]);

  return (
    <View
      style={{
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        paddingHorizontal: 16,
        backgroundColor: code ? "#fff" : "#d4cde1",
      }}
    >
      <Text
        style={{
          fontWeight: 700,
        }}
      >
        {rootCode}
      </Text>
      <Text>.</Text>
      <TextInput
        style={{
          flex: 1,
          padding: 0,
          color: "#161616",
        }}
        value={proposalCode}
        placeholder={code ? "999" : ""}
        maxLength={3}
        onChangeText={(value) => {
          setFullCode(`${fullCode}.${value ?? "1"}`);
        }}
        keyboardType="numeric"
      />
    </View>
  );
}

export default React.memo(CodeInput);
