import React from "react";
import { HeaderRightSection } from "./HeaderRightSections";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

function HomeRightSection({ navigation }: { navigation: any }) {
  return (
    <HeaderRightSection>
      <TouchableOpacity onPress={() => navigation.navigate("create")}>
        <AntDesign name={"plus"} size={24} color="#fff" />
      </TouchableOpacity>
    </HeaderRightSection>
  );
}

export default HomeRightSection;
