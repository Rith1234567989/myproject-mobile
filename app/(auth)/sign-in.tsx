import SafeAreaView from "@/components/common/SafeAreaView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignInScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ registered?: string; phone?: string }>();
  const { login } = useAuth();
  const { isDark } = useTheme();

  const isAlreadyRegistered =
    params.registered === "true" || !!params.phone;

  const [identifier, setIdentifier] = useState(
    params.phone || (isAlreadyRegistered ? "015455758" : "")
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.phone) {
      setIdentifier(params.phone);
    }
  }, [params.phone]);

  const handleSignIn = () => {
    let hasError = false;

    if (!identifier.trim()) {
      setIdentifierError("Please enter your Phone Number or Username.");
      hasError = true;
    } else {
      setIdentifierError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      hasError = true;
    } else if (password.length < 4) {
      setPasswordError("The Password must be at least 4 characters in length.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const isGmail =
        identifier.toLowerCase().includes("gmail") ||
        identifier.toLowerCase().includes("bansreypov") ||
        identifier === "015455758" ||
        identifier === "015 455 758";

      login({
        name: isGmail ? "Ban Sreypov" : identifier,
        username: "bansreypov",
        phone: "015 455 758",
        email: identifier.includes("@") ? identifier : "bansreypov@gmail.com",
        accountType: "Normal account",
        avatar: "",
        isVerified: true,
      });

      router.replace("/(tabs)/account");
    }, 400);
  };

  const handleTelegramSignIn = () => {
    Alert.alert(
      "✈️ Telegram Quick Login",
      "Sign in with your Telegram account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Connect Telegram",
          onPress: () => {
            login({
              name: "Sokha (Telegram)",
              email: "sokha.telegram@psakhmer.com",
              phone: identifier || "012 889 900",
              bio: "Verified seller • Connected via Telegram",
              avatar:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
              isVerified: true,
            });
            router.replace("/(tabs)/account");
          },
        },
      ]
    );
  };

  const handlePasskeySignIn = () => {
    Alert.alert(
      "🔑 Passkey Authentication",
      "Authenticate using your saved device Passkey?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Authenticate",
          onPress: () => {
            login({
              name: "Passkey User",
              phone: identifier || "099 123 456",
            });
            router.replace("/(tabs)/account");
          },
        },
      ]
    );
  };

  const handleSocialSignIn = (provider: string) => {
    if (provider === "Google") {
      login({
        name: "Ban Sreypov",
        username: "bansreypov",
        email: "bansreypov@gmail.com",
        phone: "015 455 758",
        accountType: "Normal account",
        avatar: "",
      });
      router.replace("/(tabs)/account");
    } else {
      login({
        name: `${provider} User`,
        email: `user@${provider.toLowerCase()}.com`,
        username: `${provider.toLowerCase()}user`,
        accountType: "Normal account",
      });
      router.replace("/(tabs)/account");
    }
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
          <Text className="text-white text-xl font-bold">Login</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/settings")}
          className="p-1"
        >
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Form Content */}
      <ScrollView
        className="flex-1 px-5 py-6"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Already Registered Alert Banner */}
        {isAlreadyRegistered && (
          <View
            className={`${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-neutral-surface border-neutral-border"
            } rounded-xl p-4 mb-6 border flex-row items-start`}
          >
            <View className="w-1.5 h-full bg-sky-500 rounded-full mr-3 min-h-[44px]" />
            <Text
              className={`flex-1 ${
                isDark ? "text-gray-200" : "text-neutral-text-main"
              } font-semibold text-base leading-6`}
            >
              This phone number is already registered, please log in to your account.
            </Text>
          </View>
        )}

        {/* Input Fields */}
        <View className="gap-4">
          {/* Phone Number or Username Input */}
          <View
            className={`${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-neutral-surface border-neutral-border"
            } rounded-xl p-3 border ${
              identifierError ? "border-red-500" : ""
            }`}
          >
            <Text
              className={`${
                identifierError
                  ? "text-red-500"
                  : isDark
                  ? "text-gray-400"
                  : "text-neutral-text-sub"
              } text-xs mb-1 font-medium`}
            >
              Phone Number or Username
            </Text>
            <TextInput
              value={identifier}
              onChangeText={(val) => {
                setIdentifier(val);
                if (val.trim()) setIdentifierError("");
              }}
              placeholder="Phone Number or Username"
              placeholderTextColor={isDark ? "#6B7280" : Colors.text.muted}
              className={`text-base ${
                isDark ? "text-white" : "text-neutral-text-main"
              } font-medium p-0`}
              autoCapitalize="none"
            />
          </View>

          {identifierError ? (
            <View className="flex-row items-center gap-1.5 -mt-2 ml-1">
              <Ionicons name="alert-circle" size={15} color="#EF4444" />
              <Text className="text-red-500 text-xs font-medium">
                {identifierError}
              </Text>
            </View>
          ) : null}

          {/* Password Input */}
          <View
            className={`${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-neutral-surface border-neutral-border"
            } rounded-xl p-3 border ${
              passwordError ? "border-red-500" : ""
            }`}
          >
            <Text
              className={`text-xs mb-1 font-medium ${
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
                  if (val.length >= 4) {
                    setPasswordError("");
                  }
                }}
                placeholder="Enter your password"
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

          {/* Error Message */}
          {passwordError ? (
            <View className="flex-row items-center gap-1.5 -mt-2 ml-1">
              <Ionicons name="alert-circle" size={15} color="#EF4444" />
              <Text className="text-red-500 text-xs font-medium">
                {passwordError}
              </Text>
            </View>
          ) : null}

          {/* Forgot Password Link */}
          <View className="items-end mt-1">
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <Text className="text-primary text-sm font-semibold">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isLoading}
            activeOpacity={0.8}
            className="bg-secondary-orange py-4 rounded-xl items-center justify-center mt-2 shadow-xs"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-base">Submit</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Quickly Connect Divider & Options */}
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

          {/* Telegram Login */}
          <TouchableOpacity
            onPress={handleTelegramSignIn}
            activeOpacity={0.8}
            className="bg-[#0088cc] py-3.5 px-4 rounded-xl flex-row items-center justify-center gap-3 mb-4 shadow-xs"
          >
            <Ionicons name="paper-plane" size={20} color="white" />
            <Text className="text-white font-bold text-base">
              Sign in or register with Telegram
            </Text>
          </TouchableOpacity>

          {/* Passkey & QR Code */}
          <View className="flex-row gap-3 mb-8">
            <TouchableOpacity
              onPress={handlePasskeySignIn}
              activeOpacity={0.8}
              className={`flex-1 ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-neutral-surface border-neutral-border"
              } py-3.5 px-3 rounded-xl border flex-row items-center justify-center gap-2 shadow-xs`}
            >
              <Ionicons
                name="person"
                size={18}
                color={isDark ? "white" : Colors.text.primary}
              />
              <Text
                className={`${
                  isDark ? "text-white" : "text-neutral-text-main"
                } font-bold text-sm`}
              >
                Use Passkey
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/scan")}
              activeOpacity={0.8}
              className={`flex-1 ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-neutral-surface border-neutral-border"
              } py-3.5 px-3 rounded-xl border flex-row items-center justify-center gap-2 shadow-xs`}
            >
              <Ionicons
                name="qr-code-outline"
                size={18}
                color={isDark ? "white" : Colors.text.primary}
              />
              <Text
                className={`${
                  isDark ? "text-white" : "text-neutral-text-main"
                } font-bold text-sm`}
              >
                Use QR Code
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Logins */}
          <View className="flex-row justify-center items-center gap-5">
            <TouchableOpacity
              onPress={() => handleSocialSignIn("Facebook")}
              activeOpacity={0.8}
              className="w-14 h-14 rounded-full bg-[#1877F2] items-center justify-center shadow-xs"
            >
              <Ionicons name="logo-facebook" size={26} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSocialSignIn("Google")}
              activeOpacity={0.8}
              className="w-14 h-14 rounded-full bg-[#4285F4] items-center justify-center shadow-xs"
            >
              <Ionicons name="logo-google" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSocialSignIn("Apple")}
              activeOpacity={0.8}
              className="w-14 h-14 rounded-full bg-black items-center justify-center shadow-xs"
            >
              <Ionicons name="logo-apple" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
