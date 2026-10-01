import SafeAreaView from "@/components/common/SafeAreaView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import {
  LANGUAGES,
  LanguageCode,
  useLanguage,
} from "@/contexts/LanguageContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SettingsScreen = () => {
  const { language, setLanguage, t, currentLanguageObj } = useLanguage();
  const { isDark } = useTheme();
  const { user } = useAuth();
  const { preferences, updatePreferences } = useNotification();

  const [langModalVisible, setLangModalVisible] = useState(false);
  const [notifModalVisible, setNotifModalVisible] = useState(false);
  const [localPrefs, setLocalPrefs] = useState(preferences);

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setLangModalVisible(false);
  };

  const displayName =
    user?.name && user.name !== "DATA" && user.name !== "015455758"
      ? user.name
      : "Ban Sreypov";

  return (
    <SafeAreaView
      statusBarColor={Colors.primary.DEFAULT}
      statusBarStyle="light-content"
      className={isDark ? "bg-gray-950 flex-1" : "bg-neutral-background flex-1"}
    >
      {/* Blue Header */}
      <View className="bg-primary px-4 py-3.5 flex-row items-center justify-between shadow-md">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">{t("settings")}</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View
          className={`px-4 py-3 ${
            isDark ? "bg-gray-950" : "bg-neutral-background"
          }`}
        >
          <Text className="text-neutral-text-muted text-xs font-bold uppercase tracking-wider">
            ACCOUNT
          </Text>
        </View>

        {/* Edit Profile Item */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/edit-profile")}
          className={`px-4 py-4 flex-row items-center justify-between border-b ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-neutral-border"
          }`}
        >
          <View className="flex-row items-center gap-3">
            <View
              className={`w-9 h-9 rounded-full items-center justify-center ${
                isDark ? "bg-gray-800" : "bg-sky-50"
              }`}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color={Colors.primary.DEFAULT}
              />
            </View>
            <View>
              <Text
                className={`text-base font-medium ${
                  isDark ? "text-white" : "text-neutral-text-main"
                }`}
              >
                Edit Profile
              </Text>
              <Text className="text-xs text-neutral-text-sub">
                {displayName} (@{user?.username || "bansreypov"})
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={Colors.text.muted}
          />
        </TouchableOpacity>

        {/* App Settings Section */}
        <View
          className={`px-4 py-3 ${
            isDark ? "bg-gray-950" : "bg-neutral-background"
          }`}
        >
          <Text className="text-neutral-text-muted text-xs font-bold uppercase tracking-wider">
            APP SETTINGS
          </Text>
        </View>

        {/* Language Item */}
        <TouchableOpacity
          onPress={() => setLangModalVisible(true)}
          className={`px-4 py-4 flex-row items-center justify-between border-b ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-neutral-border"
          }`}
        >
          <Text
            className={`text-base font-medium ${
              isDark ? "text-white" : "text-neutral-text-main"
            }`}
          >
            {t("language")}
          </Text>
          <View className="flex-row items-center gap-2">
            <Image
              source={currentLanguageObj.flag}
              className="w-5 h-5 rounded-full"
              resizeMode="contain"
            />
            <Text className="text-primary font-bold text-base">
              {currentLanguageObj.nativeName}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors.text.muted}
            />
          </View>
        </TouchableOpacity>

        {/* Theme */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/theme")}
          className={`px-4 py-4 border-b flex-row items-center justify-between ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-neutral-border"
          }`}
        >
          <Text
            className={`text-base font-medium ${
              isDark ? "text-white" : "text-neutral-text-main"
            }`}
          >
            {t("theme")}
          </Text>
          <View className="flex-row items-center gap-1.5">
            <Text
              className={`text-sm ${
                isDark ? "text-primary font-semibold" : "text-neutral-text-sub"
              }`}
            >
              {isDark ? "Dark Mode" : "Light Mode"}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors.text.muted}
            />
          </View>
        </TouchableOpacity>

        {/* Notification Settings */}
        <TouchableOpacity
          onPress={() => {
            setLocalPrefs(preferences);
            setNotifModalVisible(true);
          }}
          className={`px-4 py-4 border-b flex-row items-center justify-between ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-neutral-border"
          }`}
        >
          <Text
            className={`text-base font-medium ${
              isDark ? "text-white" : "text-neutral-text-main"
            }`}
          >
            {t("notifications")}
          </Text>
          <View className="flex-row items-center gap-1.5">
            <Text className="text-primary font-semibold text-xs">
              {preferences.pushEnabled ? "Enabled" : "Muted"}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors.text.muted}
            />
          </View>
        </TouchableOpacity>

        {/* Support Section */}
        <View
          className={`px-4 py-3 ${
            isDark ? "bg-gray-950" : "bg-neutral-background"
          }`}
        >
          <Text className="text-neutral-text-muted text-xs font-bold uppercase tracking-wider">
            SUPPORT & INFORMATION
          </Text>
        </View>

        {/* Support Items */}
        {[
          "Our Website",
          "Posting Rule",
          "Privacy Policy",
          "Account Deletion",
          "Contact Us",
          "Rate Us",
          "Safety Tips",
          "Feedback",
        ].map((item, index, array) => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              if (item === "Contact Us") {
                router.push("/(auth)/contact-us");
              } else {
                Alert.alert(item, `${item} information & details.`);
              }
            }}
            className={`px-4 py-4 ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-neutral-border"
            } ${index < array.length - 1 ? "border-b" : ""}`}
          >
            <Text
              className={`text-base ${
                isDark ? "text-white" : "text-neutral-text-main"
              }`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Version Info */}
        <View
          className={`py-6 items-center ${
            isDark ? "bg-gray-950" : "bg-neutral-background"
          }`}
        >
          <Text className="text-neutral-text-muted text-xs">
            Version: 2026.09.28
          </Text>
          <Text className="text-neutral-text-muted text-xs mt-1">
            PsaKhmer Platform
          </Text>
        </View>
      </ScrollView>

      {/* Language Selector Modal */}
      <Modal
        visible={langModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLangModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View
            className={`rounded-t-3xl p-5 gap-4 ${
              isDark ? "bg-gray-900" : "bg-white"
            }`}
          >
            <View
              className={`flex-row items-center justify-between border-b pb-3 ${
                isDark ? "border-gray-800" : "border-neutral-border"
              }`}
            >
              <Text
                className={`text-base font-bold ${
                  isDark ? "text-white" : "text-neutral-text-main"
                }`}
              >
                {t("selectLanguage")}
              </Text>
              <TouchableOpacity onPress={() => setLangModalVisible(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color={isDark ? "white" : Colors.text.primary}
                />
              </TouchableOpacity>
            </View>

            <View className="gap-2 py-2">
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    onPress={() => handleSelectLanguage(lang.code)}
                    className={`flex-row items-center justify-between p-4 rounded-2xl border ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : isDark
                        ? "border-gray-800 bg-gray-800"
                        : "border-neutral-border bg-neutral-background"
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <Image
                        source={lang.flag}
                        className="w-8 h-8 rounded-full"
                        resizeMode="contain"
                      />
                      <View>
                        <Text
                          className={`text-base font-bold ${
                            isDark ? "text-white" : "text-neutral-text-main"
                          }`}
                        >
                          {lang.nativeName}
                        </Text>
                        <Text className="text-xs text-neutral-text-sub">
                          {lang.name}
                        </Text>
                      </View>
                    </View>

                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={Colors.primary.DEFAULT}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>

      {/* Notification Settings Modal */}
      <Modal
        visible={notifModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setNotifModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View
            className={`rounded-t-3xl p-5 ${
              isDark ? "bg-gray-900" : "bg-white"
            }`}
          >
            <View
              className={`flex-row items-center justify-between pb-3 border-b ${
                isDark ? "border-gray-800" : "border-neutral-border"
              }`}
            >
              <View>
                <Text
                  className={`text-lg font-bold ${
                    isDark ? "text-white" : "text-neutral-text-main"
                  }`}
                >
                  Notification Settings
                </Text>
                <Text
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-neutral-text-sub"
                  }`}
                >
                  Configure your alert preferences
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setNotifModalVisible(false)}
                className="p-1"
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={isDark ? "white" : Colors.text.primary}
                />
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-[380px] my-3">
              {[
                {
                  key: "pushEnabled",
                  title: "Push Notifications",
                  subtitle: "Enable all push alerts from PsaKhmer",
                  icon: "notifications",
                },
                {
                  key: "priceDropAlerts",
                  title: "Price Drop Alerts",
                  subtitle: "Alerts when saved item prices drop",
                  icon: "trending-down",
                },
                {
                  key: "chatMessages",
                  title: "Chat & Buyer Inquiries",
                  subtitle: "Alerts for new buyer/seller messages",
                  icon: "chatbubbles",
                },
                {
                  key: "adStatusUpdates",
                  title: "Listing Status & Expiry",
                  subtitle: "Ad approvals, bumps, and expiry alerts",
                  icon: "megaphone",
                },
                {
                  key: "promotionsAndDeals",
                  title: "Promotions & Discounts",
                  subtitle: "Exclusive deals and marketing discounts",
                  icon: "pricetag",
                },
                {
                  key: "soundEnabled",
                  title: "Notification Sound",
                  subtitle: "Play sound when alert arrives",
                  icon: "volume-high",
                },
              ].map((item) => (
                <View
                  key={item.key}
                  className={`flex-row items-center justify-between py-3 border-b ${
                    isDark ? "border-gray-800/80" : "border-neutral-border/60"
                  }`}
                >
                  <View className="flex-row items-center gap-3 flex-1 pr-3">
                    <View
                      className={`w-9 h-9 rounded-xl items-center justify-center ${
                        isDark ? "bg-gray-800" : "bg-sky-50"
                      }`}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={18}
                        color={Colors.primary.DEFAULT}
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        className={`text-sm font-semibold ${
                          isDark ? "text-white" : "text-neutral-text-main"
                        }`}
                      >
                        {item.title}
                      </Text>
                      <Text
                        className={`text-[11px] ${
                          isDark ? "text-gray-400" : "text-neutral-text-sub"
                        }`}
                      >
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={
                      localPrefs[item.key as keyof typeof localPrefs] as boolean
                    }
                    onValueChange={(val) =>
                      setLocalPrefs((prev) => ({
                        ...prev,
                        [item.key]: val,
                      }))
                    }
                    trackColor={{
                      false: isDark ? "#374151" : "#E5E7EB",
                      true: Colors.primary.DEFAULT,
                    }}
                    thumbColor="white"
                  />
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                updatePreferences(localPrefs);
                setNotifModalVisible(false);
                Alert.alert(
                  "Saved",
                  "Your notification preferences have been updated."
                );
              }}
              className="bg-primary py-3.5 rounded-2xl items-center justify-center mt-2 shadow-sm"
            >
              <Text className="text-white text-base font-bold">
                Save Preferences
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;
