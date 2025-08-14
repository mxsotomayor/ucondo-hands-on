import { trans } from "@/i18n/translate";
import { AccountModel } from "@/models";
import { lightTheme } from "@/shared/theme";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Dialog } from "react-native-simple-dialogs";

interface AccountPreviewDialogProps {
  account: AccountModel | null;
  onAccept: () => void;
}

function AccountPreviewDialog({
  account,
  onAccept,
}: AccountPreviewDialogProps) {
  return (
    <Dialog
      animationType="fade"
      visible={account !== null}
      contentInsetAdjustmentBehavior={"scrollableAxes"}
      onRequestClose={() => {}}
      dialogStyle={{
        borderRadius: 20,
      }}
    >
      <View
        style={{
          // alignItems: "center",
          rowGap: 4,
        }}
      >
        <Feather name="info" size={42} color={lightTheme.colors.primary} />
        <View
          style={{
            flexDirection: "row",
            columnGap: 6,
          }}
        >
          <Text>Nome:</Text>
          <Text
            style={{
              fontWeight: 600,
            }}
          >
            {account?.code} - {account?.name}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            columnGap: 6,
          }}
        >
          <Text>Tipo:</Text>
          <Text
            style={{
              fontWeight: 600,
            }}
          >
            {trans(account?.type ?? "")}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            columnGap: 6,
          }}
        >
          <Text>Aceita Lançamentos:</Text>
          <Text
            style={{
              fontWeight: 800,
              color: account?.releasable ? "#1e9d66" : "#d02d66",
            }}
          >
            {account?.releasable ? "Sim" : "Não"}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            columnGap: 16,
            paddingTop: 16,
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.buttons,
              backgroundColor: lightTheme.colors.success,
              flex: 1,
            }}
            onPress={onAccept}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              Aceitar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  buttons: {
    height: 40,
    borderRadius: 30,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AccountPreviewDialog;
