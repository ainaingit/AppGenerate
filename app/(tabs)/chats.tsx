import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useRouter } from "expo-router";

export default function ChatsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const users = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (modalVisible) {
      fetchUsers();
    }
  }, [modalVisible]);

  const filteredUsers = allUsers.filter((user) =>
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
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
              placeholder="Search by username..."
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
                    setModalVisible(false);
                    setSearchQuery("");
                    // Navigation vers /visualchat avec params
                    router.push({
                      pathname: "/visualchat",
                      params: {
                        userId: item.id,
                        surname: item.surname,
                      },
                    });
                  }}
                >
                  <Text style={styles.userName}>{item.surname}</Text>
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
// This code defines a React Native component for a chat screen. It includes a button to open a modal for searching users by username, and displays a list of filtered users based on the search query. When a user is selected, it navigates to a visual chat screen with the user's ID and surname as parameters.