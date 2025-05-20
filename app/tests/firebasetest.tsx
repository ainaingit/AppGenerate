import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { LinearGradient } from "expo-linear-gradient";

type User = {
  id: string;
  [key: string]: any;
};

export default function FirebaseTest() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData: User[] = [];
        querySnapshot.forEach((doc) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersData);
      } catch (error: any) {
        Alert.alert("Erreur", `Erreur Firebase : ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const allKeys = users.length > 0 ? Object.keys(users[0]).filter((k) => k !== "id") : [];

  function handlePress(user: User) {
    Alert.alert("Détails utilisateur", JSON.stringify(user, null, 2), [{ text: "OK" }], {
      cancelable: true,
    });
  }

  const screenWidth = Dimensions.get("window").width;

  return (
    <LinearGradient colors={["#fbc7c7", "#fff"]} style={{ flex: 1, paddingTop: 50 }}>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Text style={styles.title}>Liste des utilisateurs</Text>

        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Chargement...</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={{ minWidth: screenWidth - 30 /* paddingHorizontal * 2 */ }}>
              {/* Header du tableau */}
              <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.headerCell]} numberOfLines={1} ellipsizeMode="tail">
                  ID
                </Text>
                {allKeys.map((key) => (
                  <Text
                    key={key}
                    style={[styles.cell, styles.headerCell]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {key.toUpperCase()}
                  </Text>
                ))}
              </View>

              {/* Contenu */}
              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
                {users.map((user) => (
                  <TouchableOpacity
                    key={user.id}
                    onPress={() => handlePress(user)}
                    style={[styles.row, styles.rowEven]}
                  >
                    <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
                      {user.id}
                    </Text>
                    {allKeys.map((key) => (
                      <Text key={key} style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
                        {String(user[key])}
                      </Text>
                    ))}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#900",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    backgroundColor: "#f8a5a5",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#fff",
  },
  cell: {
    flex: 1,
    padding: 10,
    minWidth: 80,
    maxWidth: 150,
  },
  rowEven: {
    backgroundColor: "#fff0f0",
  },
});
