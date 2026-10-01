import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotification } from "@/contexts/NotificationContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SellTabBarButton = ({ onPress, label }: any) => (
  <TouchableOpacity
    style={{
      top: -16,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View 
      className="w-[68px] h-[68px] rounded-full items-center justify-center p-1 bg-white dark:bg-gray-900"
      style={{
        elevation: 8,
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      }}
    >
      <LinearGradient
        colors={["#FB923C", "#F97316", "#EA580C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full h-full rounded-full items-center justify-center border border-white/40"
      >
        <View className="items-center justify-center">
          <Ionicons name="camera" size={24} color="white" />
          <View style={{ position: "absolute", top: -4, right: -6 }}>
            <Ionicons name="add-circle" size={14} color="white" />
          </View>
          <Text className="text-white text-[9px] font-black tracking-wider uppercase mt-0.5">
            {label || "Sell"}
          </Text>
        </View>
      </LinearGradient>
    </View>
  </TouchableOpacity>
);

const TabsLayout = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { unreadCount } = useNotification();

  const createProtectedTabListener = (navigation: any) => ({
    tabPress: (e: any) => {
      if (!isAuthenticated) {
        e.preventDefault();
        navigation.navigate("(auth)", { screen: "welcome" });
      }
    },
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#0EA5E9",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: -2,
          paddingBottom: 4,
        },
        tabBarStyle: {
          height: 64,
          paddingBottom: 6,
          paddingTop: 6,
          borderTopWidth: 1,
          borderTopColor: "rgba(229, 231, 235, 0.8)",
          backgroundColor: "#FFFFFF",
          elevation: 12,
          shadowColor: "#0F172A",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        listeners={({ navigation }) => createProtectedTabListener(navigation)}
        options={{
          title: "Notification",
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#EF4444",
            color: "white",
            fontSize: 9,
            fontWeight: "bold",
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            lineHeight: 16,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "notifications" : "notifications-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        listeners={({ navigation }) => createProtectedTabListener(navigation)}
        options={{
          title: t("sell"),
          tabBarButton: (props) => <SellTabBarButton {...props} label={t("sell")} />,
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="chat"
        listeners={({ navigation }) => createProtectedTabListener(navigation)}
        options={{
          title: t("chat"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: t("account"),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: "#E0F2FE",
                      width: 46,
                      height: 26,
                      borderRadius: 13,
                      alignItems: "center",
                      justifyContent: "center",
                    }
                  : {
                      alignItems: "center",
                      justifyContent: "center",
                    }
              }
            >
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={19} 
                color={focused ? "#0284C7" : color} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
