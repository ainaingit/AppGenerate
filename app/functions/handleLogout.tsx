// utils/handleLogout.tsx

import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { router } from "expo-router";

export const handleLogout = async () => {
  try {
    await SecureStore.deleteItemAsync("userSession");
    Alert.alert("Déconnexion", "Vous avez été déconnecté.");
    router.replace("/(auth)/login");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    Alert.alert("Erreur", "Une erreur est survenue lors de la déconnexion.");
  }
};
