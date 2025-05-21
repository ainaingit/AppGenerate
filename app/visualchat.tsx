import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function VisualChat() {
  const { userId, surname } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat avec {surname}</Text>
      <Text>ID de l'utilisateur : {userId}</Text>
      {/* Ici tu peux ajouter le chat réel */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#d4376e",
    marginBottom: 12,
  },
});
