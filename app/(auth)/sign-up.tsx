import SafeAreaView from "@/components/common/SafeAreaView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignUpScreen = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { isDark } = useTheme();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    let hasError = false;

    if (!fullName.trim()) {
      setNameError("Please enter your full name.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!phoneNumber.trim()) {
      setPhoneError("Please enter your phone number.");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter a password.");
      hasError = true;
    } else if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      login({
        name: fullName.trim(),
        phone: phoneNumber.trim(),
        email: `${fullName.toLowerCase().replace(/\s+/g, ".")}@psakhmer.com`,
        isVerified: true,
      });

      Alert.alert(
        "Account Created! 🎉",
        "Your new account has been registered successfully.",
        [
          {
            text: "Start Exploring",
            onPress: () => router.replace("/(tabs)"),
          },
        ]
      );
    }, 400);
  };

  const handleTelegramSignUp = () => {
    Alert.alert(
      "✈️ Register with Telegram",
      "Create your account quickly using your Telegram profile?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Connect Telegram",
          onPress: () => {
            login({
              name: "Sokha (Telegram User)",
              email: "sokha.telegram@psakhmer.com",
              phone: "012 889 900",
              bio: "Verified seller • Registered via Telegram",
              avatar:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
              isVerified: true,
            });
            router.replace("/(tabs)");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      statusBarColor={isDark ? "#111827" : Colors.primary.DEFAULT}
      statusBarStyle="light-content"
      className={`${isDark ? "bg-gray-950" : "bg-neutral-background"} flex-1`}
    >
      {/* Header Bar */}
      <View
        className={`${
          isDark ? "bg-gray-900 border-b border-gray-800" : "bg-primary"
        } px-4 py-3 flex-row items-center justify-between`}
      >
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <Ionicons name="chevron-back" size={26} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Register</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/settings")}
          className="p-1"
        >
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        className="flex-1 px-5 py-6"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          className={`text-center ${
            isDark ? "text-gray-300" : "text-neutral-text-sub"
          } text-sm leading-5 mb-6 px-2`}
        >
          Create an account to post free ads, contact sellers, and manage your listings.
        </Text>

        {/* Input Fields */}
        <View className="gap-4">
          {/* Full Name Input */}
          <View
            className={`${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-neutral-surface border-neutral-border"
            } rounded-xl p-3 border ${nameError ? "border-red-500" : ""}`}
          >
            <Text
              className={`${
                nameError
                  ? "text-red-500"
                  : isDark
                  ? "text-gray-400"
                  : "text-neutral-text-sub"
              } text-xs mb-1 font-medium`}
            >
              Full Name
            </Text>
            <TextInput
              value={fullName}
              onChangeText={(val) => {
                setFullName(val);
                if (val.trim()) setNameError("");
              }}
              placeholder="e.g. Sokha Chan"
              placeholderTextColor={isDark ? "#6B7280" : Colors.text.muted}
              className={`text-base ${
                isDark ? "text-white" : "text-neutral-text-main"
              } font-medium p-0`}
            />
          </View>

          {nameError ? (
            <View className="flex-row items-center gap-1.5 -mt-2 ml-1">
              <Ionicons name="alert-circle" size={15} color="#EF4444" />
              <Text className="text-red-500 text-xs font-medium">
                {nameError}
              </Text>
            </View>
          ) : null}

          {/* Phone Number Input */}
          <View
            className={`${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-neutral-surface border-neutral-border"
            } rounded-xl p-3 border ${phoneError ? "border-red-500" : ""}`}
          >
            <Text
              className={`${
                phoneError
                  ? "text-red-500"
                  : isDark
                  ? "text-gray-400"
                  : "text-neutral-text-sub"
              } text-xs mb-1 font-medium`}
            >
              Phone Number
            </Text>
            <TextInput
              value={phoneNumber}
              onChangeText={(val) => {
                setPhoneNumber(val);
                if (val.trim()) setPhoneError("");
              }}
              placeholder="012 345 678"
              placeholderTextColor={isDark ? "#6B7280" : Colors.text.muted}
              keyboardType="phone-pad"
              className={`text-base ${
                isDark ? "text-white" : "text-neutral-text-main"
              } font-medium p-0`}
            />
          </View>

          {phoneError ? (
            <View className="flex-row items-center gap-1.5 -mt-2 ml-1">
              <Ionicons name="alert-circle" size={15} color="#EF4444" />
              <Text className="text-red-500 text-xs font-medium">
                {phoneError}
              </Text>
            </View>
          ) : null}

          {/* Password Input */}
          <View
            className={`${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-neutral-surface border-neutral-border"
            } rounded-xl p-3 border ${passwordError ? "border-red-500" : ""}`}
          >
            <Text
              className={`${
                passwordError
                  ? "text-red-500"
                  : isDark
                  ? "text-gray-400"
                  : "text-neutral-text-sub"
              }`}
            >
              Password
            </Text>
            <View className="flex-row items-center">
              <TextInput
                value={password}
                onChangeText={(val) => {
                  setPassword(val);
                  if (val.length >= 4) setPasswordError("");
                }}
                placeholder="At least 4 characters"
                placeholderTextColor={isDark ? "#6B7280" : Colors.text.muted}
                secureTextEntry={!showPassword}
                className={`flex-1 text-base ${
                  isDark ? "text-white" : "text-neutral-text-main"
                } font-medium p-0`}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="p-1"
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={isDark ? "#9CA3AF" : Colors.text.muted}
                />
              </TouchableOpacity>
            </View>
          </View>

          {passwordError ? (
            <View className="flex-row items-center gap-1.5 -mt-2 ml-1">
              <Ionicons name="alert-circle" size={15} color="#EF4444" />
              <Text className="text-red-500 text-xs font-medium">
                {passwordError}
              </Text>
            </View>
          ) : null}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            activeOpacity={0.8}
            className="bg-secondary-orange py-4 rounded-xl items-center justify-center mt-3 shadow-xs"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-base">Register Now</Text>
            )}
          </TouchableOpacity>

          {/* Already have an account? */}
          <View className="flex-row justify-center items-center gap-1 mt-2">
            <Text
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-neutral-text-sub"
              }`}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
              <Text className="text-primary font-bold text-sm">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Connect Section */}
        <View className="my-8">
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[1px] bg-neutral-border" />
            <Text
              className={`px-4 text-xs font-semibold ${
                isDark ? "text-gray-400" : "text-neutral-text-sub"
              }`}
            >
              Quickly Connect
            </Text>
            <View className="flex-1 h-[1px] bg-neutral-border" />
          </View>

          {/* Telegram Register */}
          <TouchableOpacity
            onPress={handleTelegramSignUp}
            activeOpacity={0.8}
            className="bg-[#0088cc] py-3.5 px-4 rounded-xl flex-row items-center justify-center gap-3 mb-4 shadow-xs"
          >
            <Ionicons name="paper-plane" size={20} color="white" />
            <Text className="text-white font-bold text-base">
              Sign in or register with Telegram
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
