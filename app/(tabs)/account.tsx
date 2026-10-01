import SafeAreaView from "@/components/common/SafeAreaView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MARKETPLACE_HIGHLIGHTS = [
  {
    id: "h-1",
    title: "GTV KAIN PHEV",
    subtitle: "2h • Tuol Kouk, Phnom Penh",
    tags: "New • 2026 • Tax Paper",
    price: "$28,800",
    image: require("@/assets/images/highlights/gtv-kain.png"),
    photosCount: 13,
  },
  {
    id: "h-2",
    title: "Chinese Translator",
    subtitle: "Sep 15 • Phnom Penh",
    tags: "Full-time • 1Year+ Experience",
    price: "$400+",
    image: require("@/assets/images/highlights/chinese-translator.png"),
  },
  {
    id: "h-3",
    title: "Content Creator at Boeun...",
    subtitle: "Sep 14 • Doun Penh, Phnom Penh",
    tags: "Full-time • 2Year+ Experience",
    price: "$500+",
    image: require("@/assets/images/highlights/content-creator.png"),
  },
  {
    id: "h-4",
    title: "ផ្នែក អ្នកបកប្រែភាសាចិន (ក្រុង...",
    subtitle: "Sep 14 • Krong Preah Sihanouk, ...",
    tags: "Full-time • No Experience Experience",
    price: "$500+",
    image: require("@/assets/images/highlights/dental-clinic.png"),
  },
  {
    id: "h-5",
    title: "Sony & Canon Lens Prime",
    subtitle: "Sep 12 • Chamkarmon, Phnom Penh",
    tags: "Used • 99% Like New",
    price: "$350",
    image: require("@/assets/images/highlights/camera-lens1.jpg"),
  },
  {
    id: "h-6",
    title: "Canon EOS R6 Kit + 24-105mm",
    subtitle: "Sep 10 • Toul Tompoung, Phnom Penh",
    tags: "Used • Complete Box",
    price: "$1,850",
    image: require("@/assets/images/highlights/camera-lens2.jpg"),
  },
];

const AccountScreen = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout, login } = useAuth();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [likedHighlights, setLikedHighlights] = useState<Record<string, boolean>>({});

  const displayName =
    user?.name && user.name !== "DATA" && user.name !== "015455758"
      ? user.name
      : "Ban Sreypov";
  const displayUsername =
    user?.username && user.username !== "data" && user.username !== "015455758"
      ? user.username
      : "bansreypov";

  // In-App Login & Register Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authPhone, setAuthPhone] = useState("015455758");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const handleLogin = () => {
    setAuthMode("login");
    setAuthError("");
    setShowAuthModal(true);
  };

  const handleRegister = () => {
    setAuthMode("register");
    setAuthError("");
    setShowAuthModal(true);
  };

  const handleInAppSubmit = () => {
    if (authMode === "login") {
      if (!authPhone.trim()) {
        setAuthError("Please enter your Phone Number, Username or Gmail.");
        return;
      }
      if (!authPassword.trim() || authPassword.length < 4) {
        setAuthError("Please enter your password (at least 4 characters).");
        return;
      }
      setAuthError("");
      setAuthLoading(true);
      setTimeout(() => {
        setAuthLoading(false);
        setShowAuthModal(false);
        const isGmailOrSreypov =
          authPhone.toLowerCase().includes("gmail") ||
          authPhone.toLowerCase().includes("bansreypov") ||
          authPhone === "015455758" ||
          authPhone === "015 455 758";

        login({
          name: isGmailOrSreypov ? "Ban Sreypov" : authPhone.trim(),
          username: "bansreypov",
          phone: "015 455 758",
          email: authPhone.includes("@") ? authPhone.trim() : "bansreypov@gmail.com",
          accountType: "Normal account",
          avatar: "",
          isVerified: true,
        });
      }, 300);
    } else {
      if (!authName.trim()) {
        setAuthError("Please enter your full name.");
        return;
      }
      if (!authPhone.trim()) {
        setAuthError("Please enter your phone number.");
        return;
      }
      if (!authPassword.trim() || authPassword.length < 4) {
        setAuthError("Password must be at least 4 characters.");
        return;
      }
      setAuthError("");
      setAuthLoading(true);
      setTimeout(() => {
        setAuthLoading(false);
        setShowAuthModal(false);
        login({
          name: authName.trim(),
          username: authName.toLowerCase().replace(/\s+/g, ""),
          phone: authPhone.trim(),
          email: `${authName.toLowerCase().replace(/\s+/g, ".")}@psakhmer.com`,
          accountType: "Normal account",
          avatar: "",
          isVerified: true,
        });
      }, 300);
    }
  };

  const handleTelegramLogin = () => {
    Alert.alert(
      "✈️ Telegram Quick Login",
      "Would you like to sign in using your Telegram account (@paskhmer_kh)?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Connect Telegram",
          onPress: () => {
            login({
              name: "Sokha (Telegram)",
              username: "sokha_kh",
              email: "sokha.telegram@paskhmer.com",
              phone: "012 889 900",
              bio: "Verified seller • Connected via Telegram @sokha_kh",
              accountType: "Normal account",
              avatar:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
              isVerified: true,
            });
          },
        },
      ]
    );
  };

  const handlePasskeyLogin = () => {
    Alert.alert(
      "🔑 Passkey Authentication",
      "Use biometrics (Face ID / Fingerprint) to sign in?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Authenticate",
          onPress: () => {
            login({
              name: "Ban Sreypov",
              username: "bansreypov",
              phone: "015 455 758",
              email: "bansreypov@gmail.com",
              accountType: "Normal account",
              avatar: "",
              isVerified: true,
            });
          },
        },
      ]
    );
  };

  const handleQRCodeLogin = () => {
    router.push("/scan");
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === "Google") {
      login({
        name: "Ban Sreypov",
        username: "bansreypov",
        email: "bansreypov@gmail.com",
        phone: "015 455 758",
        accountType: "Normal account",
        avatar: "",
        isVerified: true,
      });
    } else {
      login({
        name: `${provider} User`,
        username: `${provider.toLowerCase()}user`,
        email: `user@${provider.toLowerCase()}.com`,
        accountType: "Normal account",
        avatar: "",
      });
    }
  };

  const handleEditProfile = () => {
    router.push("/(auth)/edit-profile");
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setTimeout(() => {
      logout();
    }, 100);
  };

  return (
    <SafeAreaView
      statusBarColor={Colors.primary.DEFAULT}
      statusBarStyle="light-content"
      className="bg-neutral-background"
    >
      {/* Top Header */}
      {isAuthenticated ? (
        <View className="bg-primary px-4 pt-3 pb-8 relative overflow-hidden">
          {user?.coverPhoto ? (
            <Image
              source={{ uri: user.coverPhoto }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.35,
              }}
              resizeMode="cover"
            />
          ) : null}
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xl font-bold tracking-tight">
              @{displayUsername}
            </Text>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => router.push("/(auth)/contact-us")}
                className="p-1"
              >
                <Ionicons name="headset-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/settings")}
                className="p-1"
              >
                <Ionicons name="settings-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add / Change cover photo */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/edit-profile")}
            className="flex-row items-center justify-center gap-2 mt-4 py-1"
          >
            <Ionicons name="camera-outline" size={20} color="white" />
            <Text className="text-white text-sm font-semibold">
              {user?.coverPhoto ? "Change cover photo" : "Add cover photo"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="bg-primary px-4 pt-3 pb-8">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()} className="p-1">
              <Ionicons name="chevron-back" size={26} color="white" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => router.push("/(auth)/contact-us")}
                className="p-1"
              >
                <Ionicons name="headset-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/settings")}
                className="p-1"
              >
                <Ionicons name="settings-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="items-center mt-3">
            <Text className="text-white text-3xl font-extrabold tracking-tight">
              {"PsaKhmer"}
            </Text>
            <Text className="text-white/90 text-sm font-semibold mt-1">
              Buy Faster, Sell Faster
            </Text>
          </View>
        </View>
      )}

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {isAuthenticated ? (
          /* ================= LOGGED IN VIEW (KHMER24 STYLE) ================= */
          <View className="pb-10">
            {/* User Profile Card */}
            <View style={{ marginHorizontal: 16, marginTop: -14, zIndex: 30 }}>
              {/* White Card Body */}
              <View
                style={{
                  backgroundColor: isDark ? "#111827" : "#FFFFFF",
                  borderRadius: 20,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: isDark ? "#1F2937" : "#F1F5F9",
                  elevation: 3,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 6,
                }}
              >
                {/* Header row: Avatar on left, Name in middle, QR code on right */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Left: Avatar with camera badge */}
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => router.push("/(auth)/edit-profile")}
                    style={{ position: "relative", marginRight: 14 }}
                  >
                    <View
                      style={{
                        width: 62,
                        height: 62,
                        borderRadius: 31,
                        backgroundColor: "#E5E7EB",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {user.avatar ? (
                        <Image
                          source={{ uri: user.avatar }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons name="person" size={38} color="#9CA3AF" />
                      )}
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        bottom: -2,
                        right: -2,
                        backgroundColor: "#0EA5E9",
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 1.5,
                        borderColor: "#FFFFFF",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons name="camera" size={10} color="white" />
                    </View>
                  </TouchableOpacity>

                  {/* Middle: Name & Account Type */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push("/(auth)/edit-profile")}
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: isDark ? "#FFFFFF" : "#111827",
                        }}
                      >
                        {displayName}
                      </Text>
                      <Ionicons name="pencil-sharp" size={13} color="#0EA5E9" />
                    </View>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "500",
                        color: isDark ? "#9CA3AF" : "#6B7280",
                        marginTop: 2,
                      }}
                    >
                      {user.accountType || "Normal account"}
                    </Text>
                  </TouchableOpacity>

                  {/* Right: QR Code button */}
                  <TouchableOpacity
                    onPress={() => router.push("/scan")}
                    style={{ padding: 4 }}
                  >
                    <Ionicons
                      name="qr-code-outline"
                      size={25}
                      color={isDark ? "#D1D5DB" : "#1F2937"}
                    />
                  </TouchableOpacity>
                </View>

                {/* Upgrade to Business Account Button */}
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Business Account",
                      "Upgrade to Business Account to post unlimited ads and receive verified merchant badges."
                    )
                  }
                  activeOpacity={0.85}
                  style={{
                    marginTop: 16,
                    backgroundColor: "#5B21B6",
                    paddingVertical: 13,
                    paddingHorizontal: 20,
                    borderRadius: 9999,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "700",
                      fontSize: 14,
                      letterSpacing: 0.2,
                    }}
                  >
                    Upgrade to Business Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* "My ads" Card */}
            <View className="bg-white dark:bg-gray-900 mx-4 mt-3 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-xs">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-base font-bold text-gray-900 dark:text-white">
                  My ads
                </Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/sell")}>
                  <Text className="text-xs font-semibold text-gray-400">
                    View All &gt;
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-around">
                {/* Post Ad */}
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/sell")}
                  className="items-center flex-1"
                >
                  <View className="relative mb-2">
                    <Ionicons name="camera-outline" size={28} color="#0EA5E9" />
                    <View className="absolute -top-1 -right-2">
                      <Ionicons name="add-circle" size={14} color="#0EA5E9" />
                    </View>
                  </View>
                  <Text className="text-xs font-medium text-gray-800 dark:text-gray-200 text-center">
                    Post Ad
                  </Text>
                </TouchableOpacity>

                {/* Active ads */}
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert("Active Ads", "You currently have 0 active ads.")
                  }
                  className="items-center flex-1"
                >
                  <View className="relative mb-2">
                    <Ionicons
                      name="document-text-outline"
                      size={28}
                      color="#0EA5E9"
                    />
                    <View className="absolute -bottom-1 -right-1">
                      <Ionicons
                        name="checkmark-circle"
                        size={13}
                        color="#0EA5E9"
                      />
                    </View>
                  </View>
                  <Text className="text-xs font-medium text-gray-800 dark:text-gray-200 text-center">
                    Active ads
                  </Text>
                </TouchableOpacity>

                {/* Expired ads */}
                <TouchableOpacity
                  onPress={() => Alert.alert("Expired Ads", "No expired ads.")}
                  className="items-center flex-1"
                >
                  <View className="mb-2">
                    <Ionicons name="ban-outline" size={28} color="#0EA5E9" />
                  </View>
                  <Text className="text-xs font-medium text-gray-800 dark:text-gray-200 text-center">
                    Expired ads
                  </Text>
                </TouchableOpacity>

                {/* Top ads */}
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert("Top Ads", "Promote your ads to the top.")
                  }
                  className="items-center flex-1"
                >
                  <View className="mb-2">
                    <Ionicons name="ribbon-outline" size={28} color="#0EA5E9" />
                  </View>
                  <Text className="text-xs font-medium text-gray-800 dark:text-gray-200 text-center">
                    Top ads
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Features & Services Grid Card */}
            <View className="bg-white dark:bg-gray-900 mx-4 mt-3 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-xs">
              <View className="flex-row flex-wrap">
                {/* Row 1 */}
                <TouchableOpacity
                  className="w-1/4 items-center mb-5"
                  onPress={() =>
                    Alert.alert(
                      "Subscription",
                      "Manage your marketplace subscriptions"
                    )
                  }
                >
                  <Ionicons
                    name="receipt-outline"
                    size={26}
                    color={isDark ? "#D1D5DB" : "#374151"}
                  />
                  <Text className="text-xs text-gray-800 dark:text-gray-200 font-medium mt-1 text-center">
                    Subscription
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-1/4 items-center mb-5"
                  onPress={() => Alert.alert("Likes", "Items you liked")}
                >
                  <Ionicons
                    name="heart-outline"
                    size={26}
                    color={isDark ? "#D1D5DB" : "#374151"}
                  />
                  <Text className="text-xs text-gray-800 dark:text-gray-200 font-medium mt-1 text-center">
                    Likes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-1/4 items-center mb-5"
                  onPress={() => Alert.alert("Saves", "Your saved items")}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={26}
                    color={isDark ? "#D1D5DB" : "#374151"}
                  />
                  <Text className="text-xs text-gray-800 dark:text-gray-200 font-medium mt-1 text-center">
                    Saves
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-1/4 items-center mb-5"
                  onPress={() => router.push("/(categories)/jobs" as any)}
                >
                  <Ionicons
                    name="briefcase-outline"
                    size={26}
                    color={isDark ? "#D1D5DB" : "#374151"}
                  />
                  <Text className="text-xs text-gray-800 dark:text-gray-200 font-medium mt-1 text-center">
                    Jobs
                  </Text>
                </TouchableOpacity>

                {/* Row 2 */}
                <TouchableOpacity
                  className="w-1/4 items-center mb-5"
                  onPress={() =>
                    Alert.alert("Resume (CV)", "Upload and manage CV")
                  }
                >
                  <Ionicons
                    name="id-card-outline"
                    size={26}
                    color={isDark ? "#D1D5DB" : "#374151"}
                  />
                  <Text className="text-xs text-gray-800 dark:text-gray-200 font-medium mt-1 text-center">
                    Resume (CV)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-1/4 items-center mb-5"
                  onPress={() =>
                    Alert.alert("Insights", "Views & click analytics")
                  }
                >
                  <Ionicons
                    name="trending-up-outline"
                    size={26}
                    color={isDark ? "#D1D5DB" : "#374151"}
                  />
                  <Text className="text-xs text-gray-800 dark:text-gray-200 font-medium mt-1 text-center">
                    Insights
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-1/4 items-center mb-5"
                  onPress={() =>
                    Alert.alert("Manage video", "Manage product videos")
                  }
                >
                  <View style={{ position: "relative", marginBottom: 2 }}>
                    <Ionicons
                      name="tv-outline"
                      size={26}
                      color={isDark ? "#D1D5DB" : "#374151"}
                    />
                    <Ionicons
                      name="play"
                      size={10}
                      color={isDark ? "#D1D5DB" : "#374151"}
                      style={{ position: "absolute", top: 7, left: 8.5 }}
                    />
                  </View>
                  <Text className="text-xs text-gray-800 dark:text-gray-200 font-medium mt-1 text-center">
                    Manage video
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-1/4 items-center mb-5"
                  onPress={() =>
                    Alert.alert(
                      "Buy bus ticket",
                      "Book bus tickets across Cambodia"
                    )
                  }
                >
                  <View style={{ position: "relative", marginBottom: 2 }}>
                    <Ionicons
                      name="bus-outline"
                      size={26}
                      color={isDark ? "#D1D5DB" : "#374151"}
                    />
                    <View
                      style={{
                        position: "absolute",
                        top: -6,
                        right: -10,
                        backgroundColor: "#5B21B6",
                        paddingHorizontal: 5,
                        paddingVertical: 1,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 8.5,
                          fontWeight: "800",
                        }}
                      >
                        New
                      </Text>
                    </View>
                  </View>
                  <Text className="text-xs text-gray-800 dark:text-gray-200 font-medium mt-1 text-center">
                    Buy bus ticket
                  </Text>
                </TouchableOpacity>

                {/* Row 3 */}
                <TouchableOpacity
                  className="w-1/4 items-center"
                  onPress={() =>
                    Alert.alert(
                      "Loan Calculator",
                      "Calculate monthly loan installments"
                    )
                  }
                >
                  <View style={{ position: "relative", marginBottom: 2 }}>
                    <Ionicons
                      name="calculator-outline"
                      size={26}
                      color={isDark ? "#D1D5DB" : "#374151"}
                    />
                    <View
                      style={{
                        position: "absolute",
                        top: -6,
                        right: -10,
                        backgroundColor: "#5B21B6",
                        paddingHorizontal: 5,
                        paddingVertical: 1,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 8.5,
                          fontWeight: "800",
                        }}
                      >
                        New
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: isDark ? "#E5E7EB" : "#1F2937",
                      fontWeight: "500",
                      marginTop: 4,
                      textAlign: "center",
                      lineHeight: 15,
                    }}
                  >
                    {"Loan\nCalculator"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Marketplace Highlights Section (Matching Image 3) */}
            <View className="mt-5">
              <View className="px-4 flex-row items-center justify-between mb-2">
                <Text className="text-base font-bold text-gray-900 dark:text-white">
                  Marketplace highlights
                </Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/sell")}>
                  <Text className="text-xs font-semibold text-gray-400">
                    See All &gt;
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 2-Column Product Grid */}
              <View className="flex-row flex-wrap justify-between px-4">
                {MARKETPLACE_HIGHLIGHTS.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.88}
                    onPress={() => router.push("/(tabs)/sell")}
                    className="w-[48%] mb-3.5 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xs"
                  >
                    {/* Image with Heart Button and Photo Count */}
                    <View
                      style={{
                        width: "100%",
                        height: 160,
                        backgroundColor: isDark ? "#1F2937" : "#F3F4F6",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={
                          typeof item.image === "string"
                            ? { uri: item.image }
                            : item.image
                        }
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                      {/* Heart Button */}
                      <TouchableOpacity
                        onPress={() =>
                          setLikedHighlights((prev) => ({
                            ...prev,
                            [item.id]: !prev[item.id],
                          }))
                        }
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/35 items-center justify-center"
                      >
                        <Ionicons
                          name={likedHighlights[item.id] ? "heart" : "heart-outline"}
                          size={16}
                          color={likedHighlights[item.id] ? "#EF4444" : "white"}
                        />
                      </TouchableOpacity>

                      {/* Photo Count Badge */}
                      {item.photosCount && (
                        <View className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded-md flex-row items-center gap-1">
                          <Ionicons name="camera" size={11} color="white" />
                          <Text className="text-white text-[10px] font-bold">
                            {item.photosCount}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Listing Info */}
                    <View className="p-2.5">
                      <Text
                        numberOfLines={1}
                        className="font-bold text-[13px] text-gray-900 dark:text-white"
                      >
                        {item.title}
                      </Text>
                      <View className="flex-row items-center gap-1 mt-1">
                        <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                        <Text
                          numberOfLines={1}
                          className="text-[11px] text-gray-500 dark:text-gray-400"
                        >
                          {item.subtitle}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={1}
                        className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5"
                      >
                        {item.tags}
                      </Text>
                      <Text className="text-rose-600 font-extrabold text-[15px] mt-1">
                        {item.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Quick Actions (Edit Profile Details & Log Out - Matching Screenshot 2) */}
            <View className="px-4 mt-6 gap-3 pb-12">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleEditProfile}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 py-4 rounded-2xl flex-row items-center justify-center gap-2.5 shadow-2xs"
              >
                <Ionicons
                  name="create-outline"
                  size={20}
                  color="#0EA5E9"
                />
                <Text className="text-gray-900 dark:text-white font-bold text-base">
                  Edit Profile Details
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setShowLogoutModal(true)}
                className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 py-4 rounded-2xl flex-row items-center justify-center gap-2.5"
              >
                <Ionicons name="log-out-outline" size={20} color="#E11D48" />
                <Text className="text-rose-600 dark:text-rose-400 font-bold text-base">
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* ================= GUEST VIEW ================= */
          <View className="pb-10">
            {/* Instruction */}
            <Text className="text-center text-neutral-text-sub font-semibold text-sm mt-8 mb-5 px-4">
              Login Or Register With Your Phone Number
            </Text>

            {/* Phone Login & Register Action Buttons */}
            <View className="flex-row gap-3 px-4 mb-6">
              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.8}
                className="flex-1 bg-secondary-orange py-3.5 rounded-xl items-center shadow-xs"
              >
                <Text className="text-white font-bold text-base">Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleRegister}
                activeOpacity={0.8}
                className="flex-1 bg-neutral-surface border-2 border-secondary-orange py-3.5 rounded-xl items-center shadow-xs"
              >
                <Text className="text-secondary-orange font-bold text-base">
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            {/* Quickly Connect Divider */}
            <View className="flex-row items-center px-4 my-4">
              <View className="flex-1 h-[1px] bg-neutral-border" />
              <Text className="px-4 text-xs font-semibold text-neutral-text-sub">
                Quickly Connect
              </Text>
              <View className="flex-1 h-[1px] bg-neutral-border" />
            </View>

            {/* Telegram Sign-In */}
            <TouchableOpacity
              onPress={handleTelegramLogin}
              activeOpacity={0.8}
              className="mx-4 bg-[#0088cc] py-3.5 px-4 rounded-xl flex-row items-center justify-center gap-2.5 shadow-xs mb-4 mt-2"
            >
              <Ionicons name="paper-plane" size={20} color="white" />
              <Text className="text-white font-bold text-base">
                Sign in or register with Telegram
              </Text>
            </TouchableOpacity>

            {/* Passkey & QR Code Buttons */}
            <View className="flex-row gap-3 px-4 mb-6">
              <TouchableOpacity
                onPress={handlePasskeyLogin}
                activeOpacity={0.8}
                className="flex-1 bg-neutral-surface py-3.5 px-3 rounded-xl border border-neutral-border flex-row items-center justify-center gap-2 shadow-xs"
              >
                <Ionicons
                  name="person"
                  size={18}
                  color={Colors.text.primary}
                />
                <Text className="text-neutral-text-main font-bold text-sm">
                  Use Passkey
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleQRCodeLogin}
                activeOpacity={0.8}
                className="flex-1 bg-neutral-surface py-3.5 px-3 rounded-xl border border-neutral-border flex-row items-center justify-center gap-2 shadow-xs"
              >
                <Ionicons
                  name="qr-code-outline"
                  size={18}
                  color={Colors.text.primary}
                />
                <Text className="text-neutral-text-main font-bold text-sm">
                  Use QR Code
                </Text>
              </TouchableOpacity>
            </View>

            {/* Social Logins */}
            <View className="flex-row justify-center items-center gap-5 my-3">
              <TouchableOpacity
                onPress={() => handleSocialLogin("Facebook")}
                activeOpacity={0.8}
                className="w-[52px] h-[52px] rounded-full bg-[#1877F2] items-center justify-center shadow-xs"
              >
                <Ionicons name="logo-facebook" size={26} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSocialLogin("Google")}
                activeOpacity={0.8}
                className="w-[52px] h-[52px] rounded-full bg-[#4285F4] items-center justify-center shadow-xs"
              >
                <Ionicons name="logo-google" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSocialLogin("Apple")}
                activeOpacity={0.8}
                className="w-[52px] h-[52px] rounded-full bg-black items-center justify-center shadow-xs"
              >
                <Ionicons name="logo-apple" size={26} color="white" />
              </TouchableOpacity>
            </View>

            {/* Legal Disclaimer */}
            <Text className="text-center text-xs text-neutral-text-sub px-6 mt-8 leading-5">
              By continuing, you agree to our{" "}
              <Text className="text-primary font-semibold underline">
                Posting Rule
              </Text>{" "}
              and{" "}
              <Text className="text-primary font-semibold underline">
                Privacy Policy
              </Text>
              .
            </Text>

            {/* App Version Info */}
            <View className="items-center mt-6 mb-8">
              <Text className="text-center text-xs text-neutral-text-muted font-medium">
                Version: 2026.09.01
              </Text>
              <Text className="text-center text-[11px] text-neutral-text-muted font-medium mt-0.5">
                iPhone XS Max: 18.7.10
              </Text>
              <Text className="text-center text-[11px] text-neutral-text-muted font-medium mt-0.5">
                117.20.113.228
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* In-App Login & Register Modal */}
      <Modal
        visible={showAuthModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAuthModal(false)}
      >
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <View
            className={`${
              isDark ? "bg-gray-900 border-t border-gray-800" : "bg-white"
            } rounded-t-3xl p-6 w-full shadow-2xl max-h-[85%]`}
          >
            {/* Modal Header & Tabs */}
            <View className="flex-row items-center justify-between pb-4 border-b border-neutral-border/60">
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => {
                    setAuthMode("login");
                    setAuthError("");
                  }}
                  className={`px-5 py-2 rounded-xl border ${
                    authMode === "login"
                      ? "bg-secondary-orange border-secondary-orange"
                      : isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-neutral-background border-neutral-border"
                  }`}
                >
                  <Text
                    className={`font-bold text-sm ${
                      authMode === "login"
                        ? "text-white"
                        : isDark
                        ? "text-gray-300"
                        : "text-neutral-text-main"
                    }`}
                  >
                    Login
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setAuthMode("register");
                    setAuthError("");
                  }}
                  className={`px-5 py-2 rounded-xl border ${
                    authMode === "register"
                      ? "bg-secondary-orange border-secondary-orange"
                      : isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-neutral-background border-neutral-border"
                  }`}
                >
                  <Text
                    className={`font-bold text-sm ${
                      authMode === "register"
                        ? "text-white"
                        : isDark
                        ? "text-gray-300"
                        : "text-neutral-text-main"
                    }`}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => setShowAuthModal(false)}
                className="p-1.5 rounded-full"
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={isDark ? "#9CA3AF" : Colors.text.muted}
                />
              </TouchableOpacity>
            </View>

            <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
              {/* Error Message */}
              {authError ? (
                <View className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl p-3 mb-4 flex-row items-center gap-2">
                  <Ionicons name="alert-circle" size={18} color="#EF4444" />
                  <Text className="text-red-500 text-xs font-semibold flex-1">
                    {authError}
                  </Text>
                </View>
              ) : null}

              {authMode === "login" ? (
                /* ============= LOGIN FORM ============= */
                <View className="gap-3.5">
                  {/* Quick Google (Gmail) Login Button */}
                  <TouchableOpacity
                    onPress={() => {
                      setShowAuthModal(false);
                      handleSocialLogin("Google");
                    }}
                    activeOpacity={0.8}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-3.5 px-4 rounded-xl flex-row items-center justify-center gap-2.5 shadow-2xs"
                  >
                    <Ionicons name="logo-google" size={20} color="#4285F4" />
                    <Text
                      className={`${
                        isDark ? "text-white" : "text-gray-800"
                      } font-bold text-sm`}
                    >
                      Sign in with Google (Gmail)
                    </Text>
                  </TouchableOpacity>

                  <View className="flex-row items-center my-0.5">
                    <View className="flex-1 h-[1px] bg-neutral-border/60" />
                    <Text className="px-3 text-xs font-semibold text-neutral-text-sub">
                      or with Phone / Gmail
                    </Text>
                    <View className="flex-1 h-[1px] bg-neutral-border/60" />
                  </View>

                  <View
                    className={`${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-neutral-background border-neutral-border"
                    } rounded-xl p-3 border`}
                  >
                    <Text
                      className={`text-xs mb-1 font-medium ${
                        isDark ? "text-gray-400" : "text-neutral-text-sub"
                      }`}
                    >
                      Phone Number, Username or Gmail
                    </Text>
                    <TextInput
                      value={authPhone}
                      onChangeText={(val) => {
                        setAuthPhone(val);
                        if (val.trim()) setAuthError("");
                      }}
                      placeholder="015455758 or bansreypov@gmail.com"
                      placeholderTextColor={isDark ? "#6B7280" : Colors.text.muted}
                      className={`text-base font-medium p-0 ${
                        isDark ? "text-white" : "text-neutral-text-main"
                      }`}
                      autoCapitalize="none"
                    />
                  </View>

                  <View
                    className={`${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-neutral-background border-neutral-border"
                    } rounded-xl p-3 border`}
                  >
                    <Text
                      className={`text-xs mb-1 font-medium ${
                        isDark ? "text-gray-400" : "text-neutral-text-sub"
                      }`}
                    >
                      Password
                    </Text>
                    <View className="flex-row items-center">
                      <TextInput
                        value={authPassword}
                        onChangeText={(val) => {
                          setAuthPassword(val);
                          if (val.length >= 4) setAuthError("");
                        }}
                        placeholder="Enter password"
                        placeholderTextColor={isDark ? "#6B7280" : Colors.text.muted}
                        secureTextEntry={!showAuthPassword}
                        className={`flex-1 text-base font-medium p-0 ${
                          isDark ? "text-white" : "text-neutral-text-main"
                        }`}
                      />
                      <TouchableOpacity
                        onPress={() => setShowAuthPassword(!showAuthPassword)}
                      >
                        <Ionicons
                          name={showAuthPassword ? "eye-off-outline" : "eye-outline"}
                          size={20}
                          color={isDark ? "#9CA3AF" : Colors.text.muted}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleInAppSubmit}
                    disabled={authLoading}
                    className="bg-secondary-orange py-3.5 rounded-xl items-center justify-center mt-2 shadow-sm"
                  >
                    {authLoading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text className="text-white font-bold text-base">
                        Submit Login
                      </Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setShowAuthModal(false);
                      router.push("/(auth)/sign-in");
                    }}
                    className="items-center py-2"
                  >
                    <Text className="text-primary text-xs font-semibold">
                      Open Full Login Screen →
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                /* ============= REGISTER FORM ============= */
                <View className="gap-3.5">
                  <View
                    className={`${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-neutral-background border-neutral-border"
                    } rounded-xl p-3 border`}
                  >
                    <Text
                      className={`text-xs mb-1 font-medium ${
                        isDark ? "text-gray-400" : "text-neutral-text-sub"
                      }`}
                    >
                      Full Name
                    </Text>
                    <TextInput
                      value={authName}
                      onChangeText={(val) => {
                        setAuthName(val);
                        if (val.trim()) setAuthError("");
                      }}
                      placeholder="e.g. Sokha Chan"
                      placeholderTextColor={isDark ? "#6B7280" : Colors.text.muted}
                      className={`text-base font-medium p-0 ${
                        isDark ? "text-white" : "text-neutral-text-main"
                      }`}
                    />
                  </View>

                  <View
                    className={`${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-neutral-background border-neutral-border"
                    } rounded-xl p-3 border`}
                  >
                    <Text
                      className={`text-xs mb-1 font-medium ${
                        isDark ? "text-gray-400" : "text-neutral-text-sub"
                      }`}
                    >
                      Phone Number
                    </Text>
                    <TextInput
                      value={authPhone}
                      onChangeText={(val) => {
                        setAuthPhone(val);
                        if (val.trim()) setAuthError("");
                      }}
                      placeholder="012 345 678"
                      placeholderTextColor={isDark ? "#6B7280" : Colors.text.muted}
                      keyboardType="phone-pad"
                      className={`text-base font-medium p-0 ${
                        isDark ? "text-white" : "text-neutral-text-main"
                      }`}
                    />
                  </View>

                  <View
                    className={`${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-neutral-background border-neutral-border"
                    } rounded-xl p-3 border`}
                  >
                    <Text
                      className={`text-xs mb-1 font-medium ${
                        isDark ? "text-gray-400" : "text-neutral-text-sub"
                      }`}
                    >
                      Password
                    </Text>
                    <View className="flex-row items-center">
                      <TextInput
                        value={authPassword}
                        onChangeText={(val) => {
                          setAuthPassword(val);
                          if (val.length >= 4) setAuthError("");
                        }}
                        placeholder="At least 4 characters"
                        placeholderTextColor={isDark ? "#6B7280" : Colors.text.muted}
                        secureTextEntry={!showAuthPassword}
                        className={`flex-1 text-base font-medium p-0 ${
                          isDark ? "text-white" : "text-neutral-text-main"
                        }`}
                      />
                      <TouchableOpacity
                        onPress={() => setShowAuthPassword(!showAuthPassword)}
                      >
                        <Ionicons
                          name={showAuthPassword ? "eye-off-outline" : "eye-outline"}
                          size={20}
                          color={isDark ? "#9CA3AF" : Colors.text.muted}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleInAppSubmit}
                    disabled={authLoading}
                    className="bg-secondary-orange py-3.5 rounded-xl items-center justify-center mt-2 shadow-sm"
                  >
                    {authLoading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text className="text-white font-bold text-base">
                        Submit Registration
                      </Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setShowAuthModal(false);
                      router.push("/(auth)/sign-up");
                    }}
                    className="items-center py-2"
                  >
                    <Text className="text-primary text-xs font-semibold">
                      Open Full Register Screen →
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View
          className="flex-1 justify-center items-center px-6"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View className="bg-white rounded-3xl p-6 w-full max-w-sm items-center shadow-xl">
            <View className="w-14 h-14 bg-rose-100 rounded-full items-center justify-center mb-3">
              <Ionicons name="log-out" size={28} color="#E11D48" />
            </View>
            <Text className="text-xl font-bold text-neutral-text-main mb-1">
              Log Out?
            </Text>
            <Text className="text-neutral-text-sub text-center text-sm mb-6">
              Are you sure you want to log out of your account?
            </Text>
            <View className="flex-row gap-3 w-full">
              <TouchableOpacity
                onPress={() => setShowLogoutModal(false)}
                className="flex-1 py-3 bg-neutral-background rounded-xl items-center border border-neutral-border"
              >
                <Text className="text-neutral-text-main font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmLogout}
                className="flex-1 py-3 bg-rose-600 rounded-xl items-center"
              >
                <Text className="text-white font-bold">Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AccountScreen;
