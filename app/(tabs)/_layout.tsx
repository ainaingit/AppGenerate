import React from "react";
import { Tabs } from "expo-router";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";

export default function TabLayout() {
  const { width, height } = useWindowDimensions();

  // Example: Adjust height and icon size based on width
  const isLargeScreen = width >= 768; // tablet breakpoint
  const tabBarHeight = isLargeScreen ? 90 : 70;
  const iconSize = isLargeScreen ? 30 : 24;
  const paddingVertical = isLargeScreen ? 12 : 8;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#d4376e",
        tabBarInactiveTintColor: "#999",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#fcd6e6",
          paddingVertical,
          height: tabBarHeight,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-variant-outline"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="message-circle" size={iconSize} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="media"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="image-multiple-outline"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={iconSize} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
