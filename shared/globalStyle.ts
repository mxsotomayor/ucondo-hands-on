// globalStyles.ts
import { StyleSheet } from "react-native";
import { AppTheme } from "./theme";

export const createGlobalStyles = (theme: AppTheme) =>
  StyleSheet.create({
    // Spacing
    p1: { padding: 8 },
    p2: { padding: 16 },
    p3: { padding: 24 },
    m1: { margin: 8 },
    m2: { margin: 16 },
    m3: { margin: 24 },

    // Rounded
    roundedSm: { borderRadius: 4 },
    roundedMd: { borderRadius: 8 },
    roundedLg: { borderRadius: 16 },
    roundedFull: { borderRadius: 999 },

    // Text
    text: {
      color: theme.colors.text,
      fontSize: 16,
    },
    heading: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: "bold",
    },
    subheading: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "600",
    },

    // Cards / Blocks
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },

    // Button container
    button: {
      backgroundColor: theme.colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
