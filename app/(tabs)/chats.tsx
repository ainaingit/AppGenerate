import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
} from "react-native";

const sampleChats = [
  { id: "1", name: "Alice", lastMessage: "Hey! How are you?" },
  { id: "2", name: "Bob", lastMessage: "Did you check that link?" },
  { id: "3", name: "Charlie", lastMessage: "Let's meet tomorrow." },
];

export default function ChatsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Just for demo, filter sample users by name
  const filteredUsers = sampleChats.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sampleChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noChatsText}>Your messages await 💌</Text>
        }
      />

      <TouchableOpacity
        style={styles.newDiscussionButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.newDiscussionButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Find a person</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.userItem}
                  onPress={() => {
                    // Handle selecting a user here, then close modal
                    alert(`Start chat with ${item.name}`);
                    setModalVisible(false);
                    setSearchQuery("");
                  }}
                >
                  <Text style={styles.userName}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.noUsersFound}>No users found</Text>
              }
              keyboardShouldPersistTaps="handled"
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff8f8" },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  chatName: {
    fontWeight: "600",
    fontSize: 18,
    color: "#d4376e",
  },
  chatLastMessage: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },
  noChatsText: {
    marginTop: 20,
    textAlign: "center",
    color: "#d4376e",
    fontSize: 18,
  },
  newDiscussionButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#d4376e",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  newDiscussionButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#d4376e",
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  userItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  userName: {
    fontSize: 16,
    color: "#d4376e",
  },
  noUsersFound: {
    textAlign: "center",
    color: "#999",
    marginTop: 10,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#d4376e",
    fontWeight: "600",
    fontSize: 16,
  },
});
