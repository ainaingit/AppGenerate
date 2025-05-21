// app/index.tsx
import { Text, View } from "react-native";
import Login from "./indexing/Login";
import SessionGate from "./auth/AuthGate"; // 🔁 chemin selon ton projet

export default function Index() {
  return (
    <SessionGate>
      <Login />
    </SessionGate>
  );
}
