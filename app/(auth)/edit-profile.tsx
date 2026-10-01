import SafeAreaView from "@/components/common/SafeAreaView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PRESET_AVATARS = [
  {
    id: "female-1",
    label: "Sreypov (Default)",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "female-2",
    label: "Professional",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "female-3",
    label: "Casual",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "male-1",
    label: "Modern",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "male-2",
    label: "Business",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "business-avatar",
    label: "Store Icon",
    url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=400&auto=format&fit=crop",
  },
];

const PRESET_COVERS = [
  {
    id: "cover-blue",
    label: "Sky Gradient",
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cover-phnompenh",
    label: "City Skyline",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cover-modern",
    label: "Abstract Dark",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cover-minimal",
    label: "Sunset Gold",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
  },
];

const CAMBODIA_CITIES = [
  "Phnom Penh",
  "Siem Reap",
  "Battambang",
  "Sihanoukville",
  "Kampot",
  "Kandal",
  "Poipet",
];

const EditProfileScreen = () => {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { isDark } = useTheme();

  // Sanitize initial values to avoid showing placeholder "DATA"
  const sanitizedName =
    user?.name && user.name !== "DATA" && user.name !== "015455758"
      ? user.name
      : "Ban Sreypov";
  const sanitizedUsername = user?.username ? user.username.replace("@", "") : "bansreypov";
  const sanitizedPhone = user?.phone || "015 455 758";
  const sanitizedEmail = user?.email || "bansreypov@gmail.com";
  const sanitizedLocation = user?.location || "Phnom Penh, Cambodia";
  const sanitizedBio = user?.bio || "Marketplace seller & buyer on PsaKhmer";
  const sanitizedAccountType = user?.accountType || "Normal account";

  const [name, setName] = useState(sanitizedName);
  const [username, setUsername] = useState(sanitizedUsername);
  const [phone, setPhone] = useState(sanitizedPhone);
  const [email, setEmail] = useState(sanitizedEmail);
  const [location, setLocation] = useState(sanitizedLocation);
  const [bio, setBio] = useState(sanitizedBio);
  const [accountType, setAccountType] = useState(sanitizedAccountType);
  const [gender, setGender] = useState(user?.gender || "Female");
  const [telegram, setTelegram] = useState(user?.telegram || "bansreypov");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [coverPhoto, setCoverPhoto] = useState(user?.coverPhoto || "");

  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [customCoverUrl, setCustomCoverUrl] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const MAX_BIO_LENGTH = 180;

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Missing Name", "Please enter your full name.");
      return;
    }

    setIsSaving(true);

    const cleanUsername = username.trim().replace(/^@+/, "");

    updateUser({
      name: name.trim(),
      username: cleanUsername || "bansreypov",
      phone: phone.trim(),
      email: email.trim(),
      location: location.trim(),
      bio: bio.trim(),
      accountType,
      gender,
      telegram: telegram.trim().replace(/^@+/, ""),
      avatar,
      coverPhoto,
    });

    setSavedSuccess(true);
    setIsSaving(false);

    setTimeout(() => {
      router.back();
    }, 700);
  };

  const handleSelectAvatar = (url: string) => {
    setAvatar(url);
    setShowAvatarPicker(false);
  };

  const handleSelectCover = (url: string) => {
    setCoverPhoto(url);
    setShowCoverPicker(false);
  };

  const handleResetToDefault = () => {
    Alert.alert(
      "Reset Changes?",
      "Are you sure you want to discard your modifications?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView
      statusBarColor={Colors.primary.DEFAULT}
      statusBarStyle="light-content"
      className={isDark ? "bg-gray-950 flex-1" : "bg-neutral-background flex-1"}
    >
      {/* Top Header */}
      <View className="bg-primary px-4 py-3 flex-row items-center justify-between shadow-md">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={handleResetToDefault}
            className="p-1 rounded-full active:opacity-70"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Text className="text-white text-lg font-bold tracking-tight">
              Edit Profile
            </Text>
            <Text className="text-white/80 text-[11px]">
              @{username || "bansreypov"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          disabled={isSaving}
          activeOpacity={0.8}
          className="bg-secondary-orange px-4 py-1.5 rounded-full flex-row items-center gap-1.5 shadow-sm"
        >
          <Ionicons name="checkmark-sharp" size={17} color="white" />
          <Text className="text-white font-bold text-sm">
            {isSaving ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Success Notification Alert */}
      {savedSuccess && (
        <View className="bg-emerald-600 py-2.5 px-4 flex-row items-center justify-center gap-2 shadow-md">
          <Ionicons name="checkmark-circle" size={20} color="white" />
          <Text className="text-white font-bold text-sm">
            Profile changes saved successfully!
          </Text>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Cover & Profile Avatar Section */}
          <View className="relative mb-14">
            {/* Cover Banner */}
            <View className="w-full h-36 bg-sky-500 overflow-hidden relative">
              {coverPhoto ? (
                <Image
                  source={{ uri: coverPhoto }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <LinearGradient
                  colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="w-full h-full"
                />
              )}

              {/* Cover Photo Button */}
              <TouchableOpacity
                onPress={() => setShowCoverPicker(!showCoverPicker)}
                className="absolute top-3 right-3 bg-black/50 px-3 py-1.5 rounded-full flex-row items-center gap-1.5 backdrop-blur-md"
              >
                <Ionicons name="camera-outline" size={16} color="white" />
                <Text className="text-white text-xs font-semibold">
                  {showCoverPicker ? "Close Cover" : "Edit Cover"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Floating Unclipped Circular Avatar */}
            <View
              className="absolute left-6"
              style={{
                top: 86,
                zIndex: 40,
                elevation: 10,
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  backgroundColor: "#E5E7EB",
                  borderWidth: 4,
                  borderColor: isDark ? "#1F2937" : "#FFFFFF",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  elevation: 6,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.25,
                  shadowRadius: 6,
                }}
              >
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="person" size={54} color="#9CA3AF" />
                )}
              </View>

              {/* Camera Icon Overlay Badge */}
              <TouchableOpacity
                onPress={() => setShowAvatarPicker(!showAvatarPicker)}
                activeOpacity={0.85}
                className="absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-md"
              >
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>

            {/* Quick label next to avatar */}
            <View className="ml-36 pt-3 pr-4">
              <TouchableOpacity
                onPress={() => setShowAvatarPicker(!showAvatarPicker)}
                className="flex-row items-center gap-1"
              >
                <Text className="text-primary font-bold text-sm">
                  {showAvatarPicker ? "Close Photo Options" : "Change Profile Photo"}
                </Text>
                <Ionicons
                  name={showAvatarPicker ? "chevron-up" : "chevron-down"}
                  size={16}
                  color={Colors.primary.DEFAULT}
                />
              </TouchableOpacity>
              <Text
                className={`text-[11px] ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Tap photo to select or paste URL
              </Text>
            </View>
          </View>

          {/* Cover Photo Picker Palette */}
          {showCoverPicker && (
            <View
              className={`mx-4 mb-4 p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-sm`}
            >
              <Text
                className={`font-bold text-xs uppercase tracking-wider mb-2.5 ${
                  isDark ? "text-gray-300" : "text-neutral-text-main"
                }`}
              >
                Select Cover Photo
              </Text>
              <View className="flex-row flex-wrap justify-between gap-2 mb-3">
                {PRESET_COVERS.map((cov) => (
                  <TouchableOpacity
                    key={cov.id}
                    onPress={() => handleSelectCover(cov.url)}
                    className={`w-[48%] h-16 rounded-xl overflow-hidden border-2 ${
                      coverPhoto === cov.url
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      source={{ uri: cov.url }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    <View className="absolute bottom-0 left-0 right-0 bg-black/40 px-2 py-0.5">
                      <Text className="text-white text-[10px] font-bold">
                        {cov.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <Text
                className={`text-xs mb-1.5 ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Or custom Cover Image URL:
              </Text>
              <View className="flex-row items-center gap-2">
                <TextInput
                  value={customCoverUrl}
                  onChangeText={setCustomCoverUrl}
                  placeholder="https://example.com/banner.jpg"
                  placeholderTextColor={Colors.text.muted}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs border ${
                    isDark
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-neutral-background text-neutral-text-main border-neutral-border"
                  }`}
                />
                <TouchableOpacity
                  onPress={() => {
                    if (customCoverUrl.trim()) {
                      handleSelectCover(customCoverUrl.trim());
                      setCustomCoverUrl("");
                    }
                  }}
                  className="bg-primary px-3 py-2 rounded-xl"
                >
                  <Text className="text-white text-xs font-bold">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Avatar Options Palette */}
          {showAvatarPicker && (
            <View
              className={`mx-4 mb-5 p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-sm`}
            >
              <Text
                className={`font-bold text-xs uppercase tracking-wider mb-3 ${
                  isDark ? "text-gray-300" : "text-neutral-text-main"
                }`}
              >
                Choose Avatar Preset
              </Text>
              <View className="flex-row flex-wrap justify-between gap-3 mb-4">
                {PRESET_AVATARS.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSelectAvatar(item.url)}
                    className="items-center"
                  >
                    <View
                      className={`p-0.5 rounded-full ${
                        avatar === item.url
                          ? "border-2 border-primary"
                          : "border border-neutral-border"
                      }`}
                    >
                      <Image
                        source={{ uri: item.url }}
                        className="w-14 h-14 rounded-full"
                      />
                    </View>
                    <Text
                      className={`text-[10px] font-medium mt-1 ${
                        isDark ? "text-gray-300" : "text-neutral-text-sub"
                      }`}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text
                className={`text-xs mb-1.5 ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Or custom Avatar Image URL:
              </Text>
              <View className="flex-row items-center gap-2">
                <TextInput
                  value={customAvatarUrl}
                  onChangeText={setCustomAvatarUrl}
                  placeholder="https://example.com/avatar.jpg"
                  placeholderTextColor={Colors.text.muted}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs border ${
                    isDark
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-neutral-background text-neutral-text-main border-neutral-border"
                  }`}
                />
                <TouchableOpacity
                  onPress={() => {
                    if (customAvatarUrl.trim()) {
                      handleSelectAvatar(customAvatarUrl.trim());
                      setCustomAvatarUrl("");
                    }
                  }}
                  className="bg-primary px-3 py-2 rounded-xl"
                >
                  <Text className="text-white text-xs font-bold">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Form Content */}
          <View className="px-4 space-y-4">
            {/* Account Type Card */}
            <View
              className={`p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-2xs`}
            >
              <Text
                className={`font-semibold text-xs uppercase tracking-wider mb-2.5 ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Account Type
              </Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => setAccountType("Normal account")}
                  className={`flex-1 py-2.5 px-3 rounded-xl border flex-row items-center justify-center gap-2 ${
                    accountType === "Normal account"
                      ? "bg-sky-50 dark:bg-sky-950/40 border-primary"
                      : isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-neutral-background border-neutral-border"
                  }`}
                >
                  <Ionicons
                    name="person"
                    size={16}
                    color={
                      accountType === "Normal account"
                        ? Colors.primary.DEFAULT
                        : "#9CA3AF"
                    }
                  />
                  <Text
                    className={`text-xs font-bold ${
                      accountType === "Normal account"
                        ? "text-primary"
                        : isDark
                        ? "text-gray-300"
                        : "text-neutral-text-sub"
                    }`}
                  >
                    Normal account
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setAccountType("Business Account")}
                  className={`flex-1 py-2.5 px-3 rounded-xl border flex-row items-center justify-center gap-2 ${
                    accountType === "Business Account"
                      ? "bg-purple-50 dark:bg-purple-950/40 border-purple-600"
                      : isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-neutral-background border-neutral-border"
                  }`}
                >
                  <Ionicons
                    name="briefcase"
                    size={16}
                    color={
                      accountType === "Business Account" ? "#7C3AED" : "#9CA3AF"
                    }
                  />
                  <Text
                    className={`text-xs font-bold ${
                      accountType === "Business Account"
                        ? "text-purple-600 dark:text-purple-400"
                        : isDark
                        ? "text-gray-300"
                        : "text-neutral-text-sub"
                    }`}
                  >
                    Business Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Full Name */}
            <View
              className={`p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-2xs`}
            >
              <Text
                className={`font-semibold text-xs mb-1.5 ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Full Name
              </Text>
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={Colors.primary.DEFAULT}
                />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.text.muted}
                  className={`flex-1 text-base font-semibold p-0 ${
                    isDark ? "text-white" : "text-neutral-text-main"
                  }`}
                />
                {name.length > 0 && (
                  <TouchableOpacity onPress={() => setName("")}>
                    <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Username / Handle */}
            <View
              className={`p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-2xs`}
            >
              <Text
                className={`font-semibold text-xs mb-1.5 ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Username Handle
              </Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-primary font-bold text-base">@</Text>
                <TextInput
                  value={username}
                  onChangeText={(val) =>
                    setUsername(val.toLowerCase().replace(/[^a-z0-9_]/g, ""))
                  }
                  placeholder="username"
                  placeholderTextColor={Colors.text.muted}
                  autoCapitalize="none"
                  className={`flex-1 text-base font-semibold p-0 ${
                    isDark ? "text-white" : "text-neutral-text-main"
                  }`}
                />
                <View className="bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-md">
                  <Text className="text-[10px] text-primary font-bold">
                    PsaKhmer ID
                  </Text>
                </View>
              </View>
            </View>

            {/* Gender Selection */}
            <View
              className={`p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-2xs`}
            >
              <Text
                className={`font-semibold text-xs mb-2.5 ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Gender
              </Text>
              <View className="flex-row gap-2">
                {["Female", "Male", "Other"].map((item) => {
                  const isSelected = gender === item;
                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() => setGender(item)}
                      className={`px-4 py-2 rounded-xl border flex-row items-center gap-1.5 ${
                        isSelected
                          ? "bg-primary border-primary"
                          : isDark
                          ? "bg-gray-800 border-gray-700"
                          : "bg-neutral-background border-neutral-border"
                      }`}
                    >
                      <Ionicons
                        name={
                          item === "Female"
                            ? "female"
                            : item === "Male"
                            ? "male"
                            : "transgender"
                        }
                        size={15}
                        color={isSelected ? "white" : isDark ? "#D1D5DB" : "#6B7280"}
                      />
                      <Text
                        className={`text-xs font-semibold ${
                          isSelected
                            ? "text-white font-bold"
                            : isDark
                            ? "text-gray-300"
                            : "text-neutral-text-main"
                        }`}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Phone Number */}
            <View
              className={`p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-2xs`}
            >
              <Text
                className={`font-semibold text-xs mb-1.5 ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Phone Number
              </Text>
              <View className="flex-row items-center gap-3">
                <View className="flex-row items-center gap-1 bg-neutral-background dark:bg-gray-800 px-2 py-1 rounded-lg">
                  <Text className="text-xs font-bold text-neutral-text-main dark:text-gray-200">
                    🇰🇭 +855
                  </Text>
                </View>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="015 455 758"
                  placeholderTextColor={Colors.text.muted}
                  keyboardType="phone-pad"
                  className={`flex-1 text-base font-semibold p-0 ${
                    isDark ? "text-white" : "text-neutral-text-main"
                  }`}
                />
              </View>
            </View>

            {/* Email Address */}
            <View
              className={`p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-2xs`}
            >
              <Text
                className={`font-semibold text-xs mb-1.5 ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Email Address
              </Text>
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={Colors.primary.DEFAULT}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="user@example.com"
                  placeholderTextColor={Colors.text.muted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className={`flex-1 text-base font-semibold p-0 ${
                    isDark ? "text-white" : "text-neutral-text-main"
                  }`}
                />
              </View>
            </View>

            {/* Telegram Username */}
            <View
              className={`p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-2xs`}
            >
              <Text
                className={`font-semibold text-xs mb-1.5 ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Telegram Contact
              </Text>
              <View className="flex-row items-center gap-3">
                <Ionicons name="paper-plane-outline" size={20} color="#0088CC" />
                <Text className="text-sm font-bold text-sky-500">t.me/</Text>
                <TextInput
                  value={telegram}
                  onChangeText={(val) => setTelegram(val.replace(/^@+/, ""))}
                  placeholder="username"
                  placeholderTextColor={Colors.text.muted}
                  autoCapitalize="none"
                  className={`flex-1 text-base font-semibold p-0 ${
                    isDark ? "text-white" : "text-neutral-text-main"
                  }`}
                />
              </View>
            </View>

            {/* Location & Quick City Chips */}
            <View
              className={`p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-2xs`}
            >
              <Text
                className={`font-semibold text-xs mb-1.5 ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Location / City
              </Text>
              <View className="flex-row items-center gap-3 mb-3">
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={Colors.primary.DEFAULT}
                />
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="e.g. Phnom Penh, Cambodia"
                  placeholderTextColor={Colors.text.muted}
                  className={`flex-1 text-base font-semibold p-0 ${
                    isDark ? "text-white" : "text-neutral-text-main"
                  }`}
                />
              </View>

              {/* Quick Cambodian City Chips */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-1.5">
                  {CAMBODIA_CITIES.map((city) => {
                    const isSelected = location.includes(city);
                    return (
                      <TouchableOpacity
                        key={city}
                        onPress={() => setLocation(`${city}, Cambodia`)}
                        className={`px-3 py-1 rounded-full border ${
                          isSelected
                            ? "bg-primary border-primary"
                            : isDark
                            ? "bg-gray-800 border-gray-700"
                            : "bg-neutral-background border-neutral-border"
                        }`}
                      >
                        <Text
                          className={`text-xs ${
                            isSelected
                              ? "text-white font-bold"
                              : isDark
                              ? "text-gray-300"
                              : "text-neutral-text-sub"
                          }`}
                        >
                          {city}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            {/* About / Bio */}
            <View
              className={`p-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-neutral-border"
              } shadow-2xs`}
            >
              <View className="flex-row items-center justify-between mb-1.5">
                <Text
                  className={`font-semibold text-xs ${
                    isDark ? "text-gray-400" : "text-neutral-text-sub"
                  }`}
                >
                  About Me / Bio
                </Text>
                <Text
                  className={`text-xs ${
                    bio.length > MAX_BIO_LENGTH
                      ? "text-red-500 font-bold"
                      : isDark
                      ? "text-gray-400"
                      : "text-neutral-text-muted"
                  }`}
                >
                  {bio.length}/{MAX_BIO_LENGTH}
                </Text>
              </View>
              <View className="flex-row items-start gap-3">
                <Ionicons
                  name="create-outline"
                  size={20}
                  color={Colors.primary.DEFAULT}
                  style={{ marginTop: 2 }}
                />
                <TextInput
                  value={bio}
                  onChangeText={setBio}
                  maxLength={MAX_BIO_LENGTH}
                  placeholder="Introduce yourself to other buyers and sellers..."
                  placeholderTextColor={Colors.text.muted}
                  multiline
                  numberOfLines={3}
                  className={`flex-1 text-sm font-medium p-0 min-h-[70px] ${
                    isDark ? "text-white" : "text-neutral-text-main"
                  }`}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Big Save Button */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={isSaving}
              activeOpacity={0.88}
              className="mt-2 mb-6 rounded-2xl overflow-hidden shadow-md"
              style={{
                elevation: 4,
                shadowColor: "#F97316",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <LinearGradient
                colors={["#FB923C", "#F97316", "#EA580C"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="py-4 items-center justify-center flex-row gap-2"
              >
                <Ionicons name="checkmark-circle" size={22} color="white" />
                <Text className="text-white text-base font-bold tracking-wide">
                  {isSaving ? "Saving Changes..." : "Save Changes"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={handleResetToDefault}
              className="py-3 items-center justify-center mb-8"
            >
              <Text
                className={`text-sm font-semibold ${
                  isDark ? "text-gray-400" : "text-neutral-text-sub"
                }`}
              >
                Cancel and Discard Changes
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
