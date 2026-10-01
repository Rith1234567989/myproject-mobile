import { Colors } from "@/constants/Colors";
import SafeAreaView from "@/components/common/SafeAreaView";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

const REPORT_REASONS = [
  "Suspicious Account",
  "Product already sold",
  "Seller not responding/phone unreachable",
  "Scam/Fraud",
  "Selling counterfeit items",
  "Product no tax",
  "Selling prohibited item",
  "Invalid pricing",
  "Items wrongly categorized",
  "Duplicate posts",
  "Irrelevant content",
  "Other",
];

const ReportScreen = () => {
  const { title } = useLocalSearchParams<{ id: string; title: string }>();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedReason) {
      Alert.alert("Required", "Please select a reason for reporting.");
      return;
    }

    Alert.alert(
      "Report Submitted",
      "Thank you for your report. We will review this product shortly.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ],
    );
  };

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center bg-primary p-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="flex-1 text-lg font-bold text-white" numberOfLines={1}>
          Report: {title || "Product"}
        </Text>
      </View>

      <ScrollView className="flex-1 bg-neutral-surface">
        {REPORT_REASONS.map((reason, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedReason(reason)}
            activeOpacity={0.7}
            className="border-b border-neutral-border p-4"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-base text-neutral-text-main">{reason}</Text>
              {selectedReason === reason && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={Colors.primary.DEFAULT}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
        {/* Extra padding for scroll */}
        <View className="h-24" />
      </ScrollView>

      {/* Footer Submit Button */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-neutral-border bg-neutral-surface p-4">
        <TouchableOpacity
          onPress={handleSubmit}
          className={`rounded-lg py-3 ${
            selectedReason ? "bg-secondary-orange" : "bg-neutral-background"
          }`}
          disabled={!selectedReason}
        >
          <Text
            className={`text-center text-base font-bold ${
              selectedReason ? "text-white" : "text-neutral-text-muted"
            }`}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;
