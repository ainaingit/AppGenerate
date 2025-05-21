import { View, Text, StyleSheet } from "react-native";

export default function MediaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your beautiful memories 💞</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff8f8" },
  text: { fontSize: 20, color: "#d4376e", fontWeight: "500" },
});
