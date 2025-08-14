import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { useFonts } from "expo-font";
import HomeRightSection from "@/components/nav/HomeRightSection";
import CreateScreenRightSection from "@/components/nav/CreateScreenRightSection";
import { lightTheme } from "@/shared/theme";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    AntDesign: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf"),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerStyle: { backgroundColor: lightTheme.colors.primary },
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerTitle: "Plano de Contas",
          headerTitleAlign: "left",
          headerRight: () => <HomeRightSection navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="create"
        options={({ navigation }) => ({
          headerTitle: "Inserir Conta",
          headerShadowVisible: false,
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerStyle: { backgroundColor: lightTheme.colors.primary },
          headerRight: () => (
            <CreateScreenRightSection navigation={navigation} />
          ),
        })}
      />
    </Stack>
  );
}
