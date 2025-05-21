// utils/handleLogout.ts

import * as SecureStore from "expo-secure-store";

export const handleLogout = async () => {
  try {
    await SecureStore.deleteItemAsync("userSession");
    return true;
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    return false;
  }
};
