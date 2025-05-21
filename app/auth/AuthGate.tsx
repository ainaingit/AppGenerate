// components/SessionGate.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function SessionGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await SecureStore.getItemAsync("userSession");
        if (session) {
          const data = JSON.parse(session);
          const isExpired = Date.now() > data.expiresAt;

          if (!isExpired) {
            // ✅ session valide → go home
            router.replace("/(tabs)/home");
            return;
          } else {
            // session expirée → supprimer
            await SecureStore.deleteItemAsync("userSession");
          }
        }
        // Pas de session ou expirée → go to index
        setChecking(false);
      } catch (error) {
        console.error("Erreur vérification session :", error);
        setChecking(false);
      }
    };

    checkSession();
  }, []);

  if (checking) {
    // 🔄 pendant la vérif, affiche un loader
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#f58ea1" />
      </View>
    );
  }

  return <>{children}</>;
}
