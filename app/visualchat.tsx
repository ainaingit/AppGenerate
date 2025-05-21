import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function VisualChat() {
  const { userId, surname } = useLocalSearchParams();
  const [messages, setMessages] = useState([
    { id: "1", text: "Salut !", sender: "me" },
    { id: "2", text: "Bonjour, ça va ?", sender: "other" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const flatListRef = useRef();

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "me",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Chat avec {surname}</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.sender === "me" ? styles.myMessage : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.messagesList}
          keyboardShouldPersistTaps="handled"
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Écrire un message..."
            value={inputMessage}
            onChangeText={setInputMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff8f8",
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: "#d4376e",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  messagesList: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageContainer: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  myMessage: {
    backgroundColor: "#d4376e",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: "#e8e8e8",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#d4376e",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
