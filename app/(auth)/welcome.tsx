import { Colors } from "@/constants/Colors";
import SafeAreaView from "@/components/common/SafeAreaView";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AuthLandingScreen = () => {
  const { login } = useAuth();
  return (
    <SafeAreaView
      statusBarColor={Colors.primary.DEFAULT}
      statusBarStyle="light-content"
      className="bg-neutral-background"
    >
      {/* Header with Solid Blue */}
      <View className="bg-primary pb-8">
        {/* Header Icons Row */}
        <View className="flex-row items-center justify-between px-4 mb-8">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Right Icons */}
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.push("/(auth)/contact-us")}>
              <Ionicons name="headset-outline" size={26} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/(auth)/settings")}>
              <Ionicons name="settings-outline" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Branding */}
        <View className="items-center">
          <Text className="text-white text-5xl font-bold tracking-tight">
            PsaKhmer
          </Text>
          <Text className="text-white/90 text-lg font-medium mt-2">
            Buy Faster, Sell Faster
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-neutral-background px-6 pt-8">
        {/* Instruction Text */}
        <Text className="text-neutral-text-sub text-center text-base mb-6">
          Login Or Register With Your Phone Number
        </Text>

        {/* Primary Action Buttons */}
        <View className="flex-row gap-4 mb-8">
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-in")}
            className="flex-1 bg-secondary-orange h-14 rounded-lg items-center justify-center shadow-sm"
          >
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-up")}
            className="flex-1 bg-secondary-orange h-14 rounded-lg items-center justify-center shadow-sm"
          >
            <Text className="text-white font-bold text-lg">Register</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-neutral-border" />
          <Text className="mx-4 text-neutral-text-muted font-medium">
            Quickly Connect
          </Text>
          <View className="flex-1 h-[1px] bg-neutral-border" />
        </View>

        {/* Social Login Buttons */}
        <View className="gap-3">
          <TouchableOpacity
            onPress={() => {
              login({
                name: "Facebook User",
                email: "user@facebook.com",
                username: "facebookuser",
              });
              router.replace("/(tabs)/account");
            }}
            className="bg-[#3b5998] h-14 rounded-lg flex-row items-center justify-center shadow-sm"
          >
            <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
            <Text className="text-white font-semibold text-base ml-3">
              Sign in or register with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              login({
                name: "Ban Sreypov",
                username: "bansreypov",
                email: "bansreypov@gmail.com",
                phone: "015 455 758",
                accountType: "Normal account",
                avatar: "",
              });
              router.replace("/(tabs)/account");
            }}
            className="bg-[#4285F4] h-14 rounded-lg flex-row items-center justify-center shadow-sm"
          >
            <Ionicons name="logo-google" size={24} color="#FFFFFF" />
            <Text className="text-white font-semibold text-base ml-3">
              Sign in or register with Google
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-auto pb-8">
          <Text className="text-neutral-text-muted text-center text-sm">
            By continuing, you agree to our{" "}
            <Text className="text-primary font-medium">Posting Rule</Text>
            {"\n"}and{" "}
            <Text className="text-primary font-medium">Privacy Policy</Text>.
          </Text>

          <Text className="text-neutral-text-muted/80 text-center text-xs mt-4">
            Version: 2025.12.05
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthLandingScreen;
