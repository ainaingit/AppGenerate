import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const FULL_MESSAGE =
  "Hope you’re having a wonderful day! Take your time to explore and enjoy all the features. We're happy to have you here. 💜";

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");

 useEffect(() => {
  let index = 0;
  const interval = setInterval(() => {
    setDisplayedText(FULL_MESSAGE.slice(0, index + 1)); // rewrite instead of append
    index++;
    if (index >= FULL_MESSAGE.length) clearInterval(interval);
  }, 40);

  return () => clearInterval(interval);
}, []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" style="dark" />
      <LinearGradient colors={["#f7f7f7", "#e1e1e1"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          

          <Text style={styles.message}>{displayedText}</Text>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: "600",
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 16,
    marginBottom: 30,
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 24,
    minHeight: 90, // reserve space so text doesn't jump while typing
  },
});
