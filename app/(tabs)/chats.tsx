import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useRouter } from "expo-router";

export default function ChatsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!modalVisible) return; // on ne charge que si modal visible

    async function fetchUsers() {
      setLoading(true);
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const users = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [modalVisible]);

  const filteredUsers =
    searchQuery.trim() === ""
      ? []
      : allUsers.filter((user) =>
          user.username?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          padding: 15,
          backgroundColor: "#d4376e",
          alignSelf: "flex-end",
          margin: 20,
          borderRadius: 30,
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          +
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              maxHeight: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#d4376e",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Find a person
            </Text>
            <TextInput
              placeholder="Search by username..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
                color: "black",
                fontSize: 16,
              }}
            />

            {loading ? (
              <ActivityIndicator size="large" color="#d4376e" />
            ) : (
              <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setSearchQuery("");
                      router.push({
                        pathname: "/visualchat",
                        params: { userId: item.id, surname: item.surname },
                      });
                    }}
                    style={{
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderColor: "#eee",
                    }}
                  >
                    <Text style={{ color: "black", fontSize: 16 }}>
                      {item.username || item.id}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  searchQuery.trim() !== "" ? (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#999",
                        marginTop: 10,
                      }}
                    >
                      No users found
                    </Text>
                  ) : null
                }
                keyboardShouldPersistTaps="handled"
              />
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 15, alignSelf: "center" }}
            >
              <Text
                style={{ color: "#d4376e", fontWeight: "600", fontSize: 16 }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
