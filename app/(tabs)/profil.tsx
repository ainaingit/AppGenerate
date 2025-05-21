import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { handleLogout } from "../functions/handleLogout";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const session = await SecureStore.getItemAsync("userSession");

        if (!session) {
          Alert.alert("Session expirée", "Veuillez vous reconnecter.");
          router.replace("/"); // redirection vers écran hors tabs
          return;
        }

        const { userId, expiresAt } = JSON.parse(session);

        if (Date.now() > expiresAt) {
          await SecureStore.deleteItemAsync("userSession");
          Alert.alert("Session expirée", "Veuillez vous reconnecter.");
          router.replace("/");
          return;
        }

        const ref = doc(db, "users", userId);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setUser(snapshot.data());
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Erreur chargement profil:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const onLogoutPress = async () => {
    const success = await handleLogout();
    if (success) {
      Alert.alert("Déconnexion", "Vous avez été déconnecté.");
      router.replace("/"); // redirige vers la racine hors tabs
    } else {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la déconnexion. Veuillez réessayer."
      );
    }
  };

  if (loading)
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#5A67D8" />
      </SafeAreaView>
    );

  if (!user)
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Profil utilisateur introuvable.</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: user.avatarUrl || "https://placekitten.com/200/200",
              }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>{user.name || "Anonymous"}</Text>
          <Text style={styles.handle}>@{user.username || "handle"}</Text>
          <Text style={styles.bio}>{user.bio || "Aucune bio."}</Text>
          <Text style={styles.bio}>{user.email || "Email inconnu."}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, styles.editBtn]}>
              <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.followBtn]}
              onPress={onLogoutPress}
            >
              <Text style={[styles.buttonText, { color: "#4C51BF" }]}>
                Déconnexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  scroll: {
    padding: Platform.OS === "ios" ? 20 : 15,
    flexGrow: 1,
    alignItems: "center",
    minHeight: "100%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
  },
  errorText: {
    fontSize: 18,
    color: "#E53E3E",
  },
  profileCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
    overflow: "visible",
  },
  avatarWrapper: {
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#5A67D8",
  },
  avatar: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2D3748",
  },
  handle: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 20,
  },
  bio: {
    fontSize: 15,
    color: "#4A5568",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  editBtn: {
    backgroundColor: "#5A67D8",
    marginRight: 10,
  },
  followBtn: {
    backgroundColor: "#E2E8F0",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
    flexShrink: 1,
  },
});
