import React from "react";
import { HeaderRightSection } from "./HeaderRightSections";
import { useNewAccountStore } from "@/stores/useNewAccountStore";
import { useAccountStore } from "@/stores/accountStore";
import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";

function CreateScreenRightSection({ navigation }: { navigation: any }) {
  const { validate, data, clear } = useNewAccountStore();
  const { addAccount } = useAccountStore();

  return (
    <HeaderRightSection>
      <View>
        <TouchableOpacity
          disabled={!data}
          style={{
            opacity: !data ? 0.4 : 1,
          }}
          onPress={() => {
            try {
              if (validate()) {
                addAccount({
                  name: data?.name ?? "",
                  type: data?.rootAccount?.type ?? "revenues",
                  code: data?.code ?? "",
                  releasable: data?.releasable ?? false,
                });
                clear();

                navigation.goBack({
                  test: 1,
                });
                Toast.show({
                  type: "success",
                  text1: "Parabéns!",
                  text2: "Conta criada com successo",
                  visibilityTime: 4000,
                });
              } else {
                console.log("invalid field");
              }
            } catch (e) {
              console.error("error", e);
            }
          }}
        >
          <AntDesign name={"save"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </HeaderRightSection>
  );
}

export default CreateScreenRightSection;
