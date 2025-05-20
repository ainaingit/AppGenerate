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

export default function Signup({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
  });

  const placeholders = [
    "Enter your first name",
    "Enter your last name",
    "Enter your email address",
    "Enter your phone number",
    "Enter your birth date (YYYY-MM-DD)",
    "Create a password",
  ];

  const labels = [
    "First Name",
    "Last Name",
    "Email Address",
    "Phone Number",
    "Date of Birth",
    "Password",
  ];

  const keyboardTypes = [
    "default",
    "default",
    "email-address",
    "phone-pad",
    "default",
    "default",
  ];

  const isLastStep = step === placeholders.length - 1;

  const handleNext = () => {
    const currentField = Object.keys(formData)[step];
    const value = formData[currentField];

    if (!value) {
      Alert.alert("Missing Information", `Please enter your ${labels[step].toLowerCase()}.`);
      return;
    }

    if (currentField === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return;
      }
    }

    if (currentField === "phone") {
      const phoneRegex = /^[0-9]{6,15}$/;
      if (!phoneRegex.test(value)) {
        Alert.alert("Invalid Phone Number", "Only digits allowed (6–15 characters).");
        return;
      }
    }

    if (currentField === "password" && value.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters long.");
      return;
    }

    if (isLastStep) {
      Alert.alert(
        "Signup Complete",
        `Welcome, ${formData.name} ${formData.surname}!\n\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDOB: ${formData.dob}`
      );
    } else {
      setStep(step + 1);
    }
  };

  const handleChange = (text: string) => {
    const currentField = Object.keys(formData)[step];
    setFormData({ ...formData, [currentField]: text });
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" style="dark" />
      <LinearGradient colors={["#fde2e4", "#fff"]} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inner}
        >
          <Text style={styles.title}>Tell me more about you !! </Text>

          <Text style={styles.label}>{labels[step]}</Text>

          <TextInput
            placeholder={placeholders[step]}
            placeholderTextColor="#555"
            keyboardType={keyboardTypes[step]}
            autoCapitalize="none"
            style={styles.input}
            value={formData[Object.keys(formData)[step]]}
            onChangeText={handleChange}
            secureTextEntry={step === placeholders.length - 1}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>{isLastStep ? "Sign Up" : "Next"}</Text>
          </TouchableOpacity>

          {step > 0 && (
            <TouchableOpacity
              style={{ marginTop: 15 }}
              onPress={() => setStep(step - 1)}
            >
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          )}

          <View style={styles.bottomTextContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={onSwitchToLogin}>
              <Text style={styles.linkText}>Log in</Text>
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
    fontSize: 32,
    fontWeight: "700",
    color: "#d94f70",
    marginBottom: 40,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#b61c47",
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
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    color: "#000",
  },
  button: {
    backgroundColor: "#f58ea1",
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#f58ea1",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
  backText: {
    color: "#b61c47",
    textAlign: "center",
    fontWeight: "600",
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
