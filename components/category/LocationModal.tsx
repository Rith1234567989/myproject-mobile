import { Colors } from "@/constants/Colors";
import { Province } from "@/types/location";
import { PROVINCES } from "@/constants/data/locations";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface LocationModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (province: Province) => void;
  selectedId?: string;
}

const LocationModal = ({
  visible,
  onClose,
  onSelect,
  selectedId,
}: LocationModalProps) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide up and fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide down and fade out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: fadeAnim,
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      {/* Content */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: SCREEN_HEIGHT * 0.85,
          backgroundColor: Colors.neutral.surface,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Handle Bar */}
        <View className="items-center py-3">
          <View className="h-1 w-12 rounded-full bg-neutral-border" />
        </View>

        {/* Header */}
        <View className="flex-row items-center justify-between border-b border-neutral-background px-4 pb-4">
          <TouchableOpacity
            onPress={onClose}
            className="h-8 w-8 items-center justify-center rounded-full bg-neutral-background"
          >
            <Ionicons name="close" size={20} color={Colors.text.sub} />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-lg font-semibold text-neutral-text-main">
            City/Province
          </Text>
          <View className="w-8" />
        </View>

        {/* Provinces List */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {PROVINCES.map((province) => (
            <TouchableOpacity
              key={province.id}
              onPress={() => onSelect(province)}
              className={`flex-row items-center justify-between border-b border-neutral-background px-5 py-4 ${
                selectedId === province.id ? "bg-secondary/5" : ""
              }`}
            >
              <Text
                className={`text-base ${
                  selectedId === province.id
                    ? "font-semibold text-secondary"
                    : "text-neutral-text-main"
                }`}
              >
                {province.name}
              </Text>
              {selectedId === province.id && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={Colors.secondary.DEFAULT}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

export default LocationModal;
