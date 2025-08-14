import { useAccountStore } from "@/stores/accountStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { HeaderRightSection } from "./HeaderRightSections";

function HomeRightSection({ navigation }: { navigation: any }) {
  const { isSynchronizable, synchronize } = useAccountStore();
  return (
    <HeaderRightSection>
      <View
        style={{
          flexDirection: "row",
          columnGap: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("create")}>
          <AntDesign name={"plus"} size={24} color="#fff" />
        </TouchableOpacity>

        {isSynchronizable && (
          <TouchableOpacity
            onPress={async () => {
              await synchronize();
            }}
          >
            <AntDesign name={"sync"} size={22} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </HeaderRightSection>
  );
}

export default HomeRightSection;
