// functions/handleLogin.ts
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { db } from "../../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const EXPIRE_DURATION = 3600 * 1000; // 1 heure en millisecondes

export const handleLogin = async (surname: string): Promise<boolean> => {
  if (!surname) {
    Alert.alert("Oops 🥺", "Please tell me your surname, love.");
    return false;
  }

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", surname));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;

      // Stocker avec horodatage
      const sessionData = {
        userId: userId,
        expiresAt: Date.now() + EXPIRE_DURATION,
      };

      await SecureStore.setItemAsync("userSession", JSON.stringify(sessionData));

     //  Alert.alert("Welcome back 💖", `Hello again, ${surname}! 🌸`);
      return true;
    } else {
      Alert.alert("Oops 🥺", "Surname not found. Please try again or sign up.");
      return false;
    }
  } catch (error) {
    Alert.alert("Error", "Something went wrong. Please try again later.");
    console.error("Firestore query error:", error);
    return false;
  }
};
