import SafeAreaView from "@/components/common/SafeAreaView";
import { Colors } from "@/constants/Colors";
import {
  AppNotification,
  useNotification,
} from "@/contexts/NotificationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

const NotificationScreen = () => {
  const router = useRouter();
  const { isDark } = useTheme();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markMultipleAsRead,
    markAllAsRead,
    deleteNotification,
    deleteMultiple,
    clearAll,
    preferences,
    updatePreferences,
  } = useNotification();

  const [activeFilter, setActiveFilter] = useState<
    "all" | "unread" | "offers" | "system"
  >("all");

  // Edit / Selection Mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Local preferences state for modal
  const [localPrefs, setLocalPrefs] = useState(preferences);

  const toggleSelectNotification = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map((n) => n.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    Alert.alert(
      "Delete Notifications",
      `Delete ${selectedIds.length} selected notification${
        selectedIds.length > 1 ? "s" : ""
      }?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteMultiple(selectedIds);
            setSelectedIds([]);
            setIsEditMode(false);
          },
        },
      ]
    );
  };

  const handleMarkSelectedAsRead = () => {
    if (selectedIds.length === 0) return;
    markMultipleAsRead(selectedIds);
    setSelectedIds([]);
    setIsEditMode(false);
  };

  const handleNotificationPress = (notif: AppNotification) => {
    if (isEditMode) {
      toggleSelectNotification(notif.id);
      return;
    }

    markAsRead(notif.id);
    if (notif.actionRoute) {
      router.push(notif.actionRoute as any);
    }
  };

  const handleDeleteSingle = (id: string) => {
    deleteNotification(id);
  };

  const handlePromptClearAll = () => {
    Alert.alert(
      "Clear All Notifications",
      "Are you sure you want to remove all notifications?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            clearAll();
            setIsEditMode(false);
            setSelectedIds([]);
          },
        },
      ]
    );
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === "unread") return !notif.isRead;
    if (activeFilter === "offers")
      return notif.category === "price_drop" || notif.category === "promo";
    if (activeFilter === "system")
      return notif.category === "ad_status" || notif.category === "security";
    return true;
  });

  const getCategoryConfig = (category: AppNotification["category"]) => {
    switch (category) {
      case "price_drop":
        return {
          icon: "trending-down",
          bgColor: isDark ? "bg-emerald-950/60" : "bg-emerald-100",
          iconColor: "#10B981",
          tagText: "Price Alert",
        };
      case "message":
        return {
          icon: "chatbubble-ellipses",
          bgColor: isDark ? "bg-sky-950/60" : "bg-sky-100",
          iconColor: Colors.primary.DEFAULT,
          tagText: "Chat",
        };
      case "ad_status":
        return {
          icon: "checkmark-circle",
          bgColor: isDark ? "bg-orange-950/60" : "bg-orange-100",
          iconColor: Colors.secondary.orange,
          tagText: "Listing",
        };
      case "promo":
        return {
          icon: "flash",
          bgColor: isDark ? "bg-purple-950/60" : "bg-purple-100",
          iconColor: "#8B5CF6",
          tagText: "Special Offer",
        };
      case "security":
        return {
          icon: "shield-checkmark",
          bgColor: isDark ? "bg-rose-950/60" : "bg-rose-100",
          iconColor: "#F43F5E",
          tagText: "Security",
        };
    }
  };

  return (
    <SafeAreaView
      statusBarColor={Colors.primary.DEFAULT}
      statusBarStyle="light-content"
      className={isDark ? "bg-gray-950 flex-1" : "bg-neutral-background flex-1"}
    >
      {/* Top Header */}
      <View className="bg-primary px-4 py-3 flex-row items-center justify-between shadow-md">
        <View className="flex-row items-center gap-2.5">
          <Text className="text-white text-xl font-bold tracking-wide">
            Notifications
          </Text>
          {unreadCount > 0 && !isEditMode && (
            <View className="bg-secondary-orange px-2 py-0.5 rounded-full">
              <Text className="text-white text-[11px] font-bold">
                {unreadCount} new
              </Text>
            </View>
          )}
          {isEditMode && (
            <View className="bg-white/20 px-2.5 py-0.5 rounded-full">
              <Text className="text-white text-xs font-bold">
                {selectedIds.length} selected
              </Text>
            </View>
          )}
        </View>

        {/* Action Controls */}
        <View className="flex-row items-center gap-3">
          {notifications.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setIsEditMode(!isEditMode);
                setSelectedIds([]);
              }}
              className="bg-white/15 px-3 py-1 rounded-full active:opacity-80"
            >
              <Text className="text-white text-xs font-bold">
                {isEditMode ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          )}

          {!isEditMode && unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text className="text-sky-100 text-xs font-semibold underline">
                Mark all read
              </Text>
            </TouchableOpacity>
          )}

          {/* Settings Modal Button */}
          <TouchableOpacity
            onPress={() => {
              setLocalPrefs(preferences);
              setShowSettingsModal(true);
            }}
            className="p-1 rounded-full active:opacity-70"
          >
            <Ionicons name="options-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Mode Sub-Bar */}
      {isEditMode && filteredNotifications.length > 0 && (
        <View
          className={`px-4 py-2 flex-row items-center justify-between border-b ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-sky-50/80 border-sky-100"
          }`}
        >
          <TouchableOpacity
            onPress={handleSelectAll}
            className="flex-row items-center gap-2"
          >
            <Ionicons
              name={
                selectedIds.length === filteredNotifications.length &&
                filteredNotifications.length > 0
                  ? "checkbox"
                  : "square-outline"
              }
              size={18}
              color={Colors.primary.DEFAULT}
            />
            <Text
              className={`text-xs font-bold ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {selectedIds.length === filteredNotifications.length
                ? "Deselect All"
                : "Select All"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center gap-3">
            {selectedIds.length > 0 && (
              <TouchableOpacity
                onPress={handleMarkSelectedAsRead}
                className="flex-row items-center gap-1"
              >
                <Ionicons
                  name="checkmark-done"
                  size={16}
                  color={Colors.primary.DEFAULT}
                />
                <Text className="text-primary text-xs font-bold">
                  Mark Read
                </Text>
              </TouchableOpacity>
            )}

            {selectedIds.length > 0 && (
              <TouchableOpacity
                onPress={handleDeleteSelected}
                className="flex-row items-center gap-1"
              >
                <Ionicons name="trash-outline" size={16} color="#EF4444" />
                <Text className="text-red-500 text-xs font-bold">Delete</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handlePromptClearAll}
              className="flex-row items-center gap-1"
            >
              <Text className="text-red-500 text-xs font-semibold">
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Filter Tabs */}
      <View
        className={`border-b p-3 ${
          isDark
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-neutral-border"
        }`}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {[
              { id: "all", label: `All (${notifications.length})` },
              { id: "unread", label: `Unread (${unreadCount})` },
              { id: "offers", label: "Deals & Offers" },
              { id: "system", label: "System Alerts" },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setActiveFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full border ${
                    isActive
                      ? "bg-primary border-primary"
                      : isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-neutral-background border-neutral-border"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      isActive
                        ? "text-white"
                        : isDark
                        ? "text-gray-300"
                        : "text-neutral-text-sub"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.length === 0 ? (
          <View className="items-center justify-center p-8 mt-12">
            <View
              className={`w-20 h-20 rounded-full items-center justify-center mb-3 ${
                isDark ? "bg-gray-800" : "bg-sky-50"
              }`}
            >
              <Ionicons
                name="notifications-off-outline"
                size={38}
                color={Colors.primary.DEFAULT}
              />
            </View>
            <Text
              className={`text-base font-bold text-center ${
                isDark ? "text-white" : "text-neutral-text-main"
              }`}
            >
              {activeFilter === "unread"
                ? "No unread notifications"
                : "No notifications"}
            </Text>
            <Text
              className={`text-xs text-center mt-1 max-w-[260px] ${
                isDark ? "text-gray-400" : "text-neutral-text-sub"
              }`}
            >
              You're all caught up! Updates regarding price drops, saved ads, and
              chats will appear here.
            </Text>
          </View>
        ) : (
          filteredNotifications.map((item) => {
            const config = getCategoryConfig(item.category);
            const isSelected = selectedIds.includes(item.id);

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleNotificationPress(item)}
                activeOpacity={0.75}
                className={`p-4 border-b flex-row items-start ${
                  isDark
                    ? isSelected
                      ? "bg-sky-950/40 border-gray-800"
                      : item.isRead
                      ? "bg-gray-950 border-gray-800/80"
                      : "bg-gray-900 border-gray-800"
                    : isSelected
                    ? "bg-sky-100/60 border-neutral-border/70"
                    : item.isRead
                    ? "bg-white border-neutral-border/60"
                    : "bg-sky-50/70 border-neutral-border/80"
                }`}
              >
                {/* Selection Checkbox in Edit Mode */}
                {isEditMode && (
                  <View className="mr-3 self-center">
                    <Ionicons
                      name={isSelected ? "checkbox" : "square-outline"}
                      size={22}
                      color={
                        isSelected ? Colors.primary.DEFAULT : isDark ? "#6B7280" : "#9CA3AF"
                      }
                    />
                  </View>
                )}

                {/* Category Icon */}
                <View
                  className={`w-11 h-11 rounded-2xl ${config.bgColor} items-center justify-center mr-3 mt-0.5 shadow-2xs`}
                >
                  <Ionicons
                    name={config.icon as any}
                    size={21}
                    color={config.iconColor}
                  />
                </View>

                {/* Main Content */}
                <View className="flex-1 mr-2">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text
                      className={`text-sm flex-1 mr-2 ${
                        item.isRead
                          ? isDark
                            ? "font-medium text-gray-300"
                            : "font-semibold text-neutral-text-main"
                          : isDark
                          ? "font-bold text-white"
                          : "font-bold text-neutral-text-main"
                      }`}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text
                      className={`text-[11px] ${
                        isDark ? "text-gray-500" : "text-neutral-text-muted"
                      }`}
                    >
                      {item.timestamp}
                    </Text>
                  </View>

                  <Text
                    className={`text-xs leading-4 mb-2 ${
                      isDark ? "text-gray-400" : "text-neutral-text-sub"
                    }`}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>

                  {/* Action Link & Tag */}
                  <View className="flex-row items-center gap-2">
                    {item.actionText && (
                      <View className="flex-row items-center gap-1 self-start bg-primary/10 dark:bg-primary/20 px-2.5 py-0.5 rounded-md">
                        <Text className="text-[11px] font-bold text-primary">
                          {item.actionText}
                        </Text>
                        <Ionicons
                          name="chevron-forward"
                          size={12}
                          color={Colors.primary.DEFAULT}
                        />
                      </View>
                    )}
                    <View
                      className={`px-2 py-0.5 rounded-md ${
                        isDark ? "bg-gray-800" : "bg-neutral-background"
                      }`}
                    >
                      <Text
                        className={`text-[10px] font-semibold ${
                          isDark ? "text-gray-400" : "text-neutral-text-sub"
                        }`}
                      >
                        {config.tagText}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Right Image Thumbnail or Delete */}
                <View className="items-end gap-1.5 self-center">
                  {item.itemImage && (
                    <Image
                      source={{ uri: item.itemImage }}
                      className="w-12 h-12 rounded-xl bg-neutral-background border border-neutral-border/80"
                    />
                  )}

                  {!isEditMode && (
                    <View className="flex-row items-center gap-1">
                      {!item.isRead && (
                        <View className="w-2.5 h-2.5 bg-secondary-orange rounded-full" />
                      )}
                      <TouchableOpacity
                        onPress={() => handleDeleteSingle(item.id)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        className="p-1 opacity-40 hover:opacity-100"
                      >
                        <Ionicons
                          name="close-circle-outline"
                          size={16}
                          color={isDark ? "#9CA3AF" : "#6B7280"}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Notification Preferences Settings Modal */}
      <Modal
        visible={showSettingsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSettingsModal(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View
            className={`rounded-t-3xl p-5 ${
              isDark ? "bg-gray-900" : "bg-white"
            }`}
          >
            {/* Modal Header */}
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
                  Customize and edit what alerts you receive
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowSettingsModal(false)}
                className="p-1"
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={isDark ? "white" : Colors.text.primary}
                />
              </TouchableOpacity>
            </View>

            {/* Notification Toggles */}
            <ScrollView className="max-h-[380px] my-3">
              {[
                {
                  key: "pushEnabled",
                  title: "Push Notifications",
                  subtitle: "Enable all mobile push alerts from PsaKhmer",
                  icon: "notifications",
                },
                {
                  key: "priceDropAlerts",
                  title: "Price Drop Alerts",
                  subtitle: "Get notified when saved listing prices decrease",
                  icon: "trending-down",
                },
                {
                  key: "chatMessages",
                  title: "Chat & Buyer Inquiries",
                  subtitle: "Instant alerts for new messages from buyers/sellers",
                  icon: "chatbubbles",
                },
                {
                  key: "adStatusUpdates",
                  title: "Listing Status & Expiry",
                  subtitle: "Ad approval status, bumps, and expiry alerts",
                  icon: "megaphone",
                },
                {
                  key: "promotionsAndDeals",
                  title: "Promotions & Discounts",
                  subtitle: "Special holiday bumps and marketplace offers",
                  icon: "pricetag",
                },
                {
                  key: "soundEnabled",
                  title: "Notification Sound",
                  subtitle: "Play sound when receiving new alerts",
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
                        className={`text-[11px] leading-3.5 ${
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

            {/* Save Preferences Button */}
            <TouchableOpacity
              onPress={() => {
                updatePreferences(localPrefs);
                setShowSettingsModal(false);
                Alert.alert(
                  "Preferences Saved",
                  "Your notification settings have been updated."
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

export default NotificationScreen;
