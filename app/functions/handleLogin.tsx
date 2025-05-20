// handleLogin.ts
import { Alert } from "react-native";
import { db } from "../../utils/firebase"; // adjust path
import { collection, query, where, getDocs } from "firebase/firestore";
import type { Router } from "expo-router";

export const handleLogin = async (surname: string, router: Router) => {
  if (!surname) {
    Alert.alert("Oops 🥺", "Please tell me your surname, love.");
    return;
  }

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", surname));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      Alert.alert("Welcome back 💖", `Hello again, ${surname}! 🌸`);
      router.replace("/(tabs)"); // Change to your post-login screen
    } else {
      Alert.alert("Oops 🥺", "Surname not found. Please try again or sign up.");
    }
  } catch (error) {
    Alert.alert("Error", "Something went wrong. Please try again later.");
    console.error("Firestore query error:", error);
  }
};
