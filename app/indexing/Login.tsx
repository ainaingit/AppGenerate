import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { handleLogin } from "../functions/handleLogin"; // Adjust path as needed

export default function Login({
  onSwitchToSignup,
}: {
  onSwitchToSignup: () => void;
}) {
  const [surname, setSurname] = useState("");

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" style="dark" />
      <LinearGradient colors={["#fbc7c7", "#fff"]} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inner}
        >
          <Text style={styles.title}>Welcome, darling 💗</Text>

          <Text style={styles.label}>Your sweet surname</Text>
          <TextInput
            placeholder="Type your lovely surname"
            placeholderTextColor="#000" // Black placeholder
            autoCapitalize="none"
            style={styles.input}
            value={surname}
            onChangeText={setSurname}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin(surname)}
          >
            <Text style={styles.buttonText}>Let’s go 💕</Text>
          </TouchableOpacity>

          <View style={styles.bottomTextContainer}>
            <Text>No account yet? </Text>
            <TouchableOpacity onPress={onSwitchToSignup}>
              <Text style={styles.linkText}>Sign up my love 💖</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#d4376e",
    marginBottom: 40,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#d4376e",
    fontWeight: "600",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: "#fbc7c7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: "#f58ea1",
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#f58ea1",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  linkText: {
    color: "#d4376e",
    fontWeight: "600",
  },
});
