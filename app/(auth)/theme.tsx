import SafeAreaView from "@/components/common/SafeAreaView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ThemeScreen = () => {
  const router = useRouter();
  const { theme, isDark, isAutoTheme, setTheme, setAutoTheme } = useTheme();

  const handleSelectTheme = (mode: "light" | "dark") => {
    setTheme(mode);
  };

  return (
    <SafeAreaView
      statusBarColor={isDark ? "#111827" : Colors.primary.DEFAULT}
      statusBarStyle="light-content"
      className={`${isDark ? "bg-gray-950" : "bg-neutral-background"} flex-1`}
    >
      {/* Top Header */}
      <View
        className={`${
          isDark ? "bg-gray-900 border-b border-gray-800" : "bg-primary"
        } px-4 py-3.5 flex-row items-center justify-between shadow-md`}
      >
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={26} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold tracking-wide flex-1 text-center mr-7">
          Theme
        </Text>
      </View>

      {/* Main Content Area */}
      <ScrollView
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Light & Dark Cards Side-by-Side */}
        <View className="flex-row gap-4 mb-8">
          {/* Light Mode Card */}
          <TouchableOpacity
            onPress={() => handleSelectTheme("light")}
            activeOpacity={0.8}
            className="flex-1"
          >
            {/* Preview Box */}
            <View
              className={`w-full h-44 rounded-xl border-2 overflow-hidden bg-white shadow-xs ${
                theme === "light"
                  ? "border-primary"
                  : isDark
                  ? "border-gray-800"
                  : "border-transparent"
              }`}
              style={{
                elevation: theme === "light" ? 4 : 1,
              }}
            >
              {/* Header preview bar */}
              <View className="h-10 bg-primary w-full" />
              {/* Card Body */}
              <View className="flex-1 bg-white" />
            </View>

            {/* Radio Option */}
            <View className="flex-row items-center justify-center gap-2 mt-4">
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  theme === "light"
                    ? "border-primary bg-primary"
                    : isDark
                    ? "border-gray-600 bg-transparent"
                    : "border-gray-400 bg-transparent"
                }`}
              >
                {theme === "light" && (
                  <View className="w-2 h-2 rounded-full bg-white" />
                )}
              </View>
              <Text
                className={`text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-neutral-text-main"
                }`}
              >
                Light
              </Text>
            </View>
          </TouchableOpacity>

          {/* Dark Mode Card */}
          <TouchableOpacity
            onPress={() => handleSelectTheme("dark")}
            activeOpacity={0.8}
            className="flex-1"
          >
            {/* Preview Box */}
            <View
              className={`w-full h-44 rounded-xl border-2 overflow-hidden bg-black shadow-xs ${
                theme === "dark"
                  ? "border-primary"
                  : isDark
                  ? "border-gray-800"
                  : "border-transparent"
              }`}
              style={{
                elevation: theme === "dark" ? 4 : 1,
              }}
            >
              {/* Header preview bar */}
              <View className="h-10 bg-[#1A1A1A] w-full" />
              {/* Card Body */}
              <View className="flex-1 bg-[#121212]" />
            </View>

            {/* Radio Option */}
            <View className="flex-row items-center justify-center gap-2 mt-4">
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  theme === "dark"
                    ? "border-primary bg-primary"
                    : isDark
                    ? "border-gray-600 bg-transparent"
                    : "border-gray-400 bg-transparent"
                }`}
              >
                {theme === "dark" && (
                  <View className="w-2 h-2 rounded-full bg-white" />
                )}
              </View>
              <Text
                className={`text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-neutral-text-main"
                }`}
              >
                Dark
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Auto change theme Section */}
        <View
          className={`flex-row items-center justify-between py-4 mt-2 px-3 rounded-2xl ${
            isDark ? "bg-gray-900 border border-gray-800" : "bg-transparent"
          }`}
        >
          <View className="flex-1 mr-4">
            <Text
              className={`text-base font-semibold ${
                isDark ? "text-white" : "text-neutral-text-main"
              }`}
            >
              Auto change theme
            </Text>
            <Text
              className={`text-xs ${
                isDark ? "text-gray-400" : "text-neutral-text-sub"
              } mt-0.5`}
            >
              Base on system setting
            </Text>
          </View>

          <Switch
            value={isAutoTheme}
            onValueChange={setAutoTheme}
            trackColor={{ false: "#6B7280", true: "#0EA5E9" }}
            thumbColor="white"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThemeScreen;
