import { Dialog } from "react-native-simple-dialogs";

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { lightTheme } from "@/shared/theme";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  subTitle: string;
  onCancel: () => void;
  onAccept: () => void;
}
function ConfirmDialog({
  visible,
  title,
  subTitle,
  onCancel,
  onAccept,
}: ConfirmDialogProps) {
  return (
    <Dialog
      animationType="fade"
      visible={visible}
      contentInsetAdjustmentBehavior={"scrollableAxes"}
      onRequestClose={() => {}}
      dialogStyle={{
        borderRadius: 20,
      }}
    >
      <View
        style={{
          alignItems: "center",
          rowGap: 4,
        }}
      >
        <Feather name="trash" size={48} color={lightTheme.colors.secondary} />
        <Text>{title}</Text>
        <Text
          style={{
            fontWeight: 600,
          }}
        >
          {subTitle}
        </Text>
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
            }}
            onPress={onCancel}
          >
            <Text
              style={{
                color: lightTheme.colors.secondary,
              }}
            >
              Não
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.buttons,
              backgroundColor: lightTheme.colors.secondary,
              flex: 1,
            }}
            onPress={onAccept}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              Com Certeza
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

export default ConfirmDialog;
