import { Colors } from "@/constants/Colors";
import SafeAreaView from "@/components/common/SafeAreaView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ContactUsScreen = () => {
  const [hoursExpanded, setHoursExpanded] = useState(false);

  const handleCall = () => {
    Linking.openURL("tel:092724724");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:info@psanpic.com");
  };

  const schedule = [
    { day: "Monday", hours: "08:00 AM - 05:00 PM" },
    { day: "Tuesday", hours: "08:00 AM - 05:00 PM" },
    { day: "Wednesday", hours: "08:00 AM - 05:00 PM" },
    { day: "Thursday", hours: "08:00 AM - 05:00 PM" },
    { day: "Friday", hours: "08:00 AM - 05:00 PM" },
    { day: "Saturday", hours: "08:00 AM - 12:00 PM", bold: true },
    { day: "Sunday", hours: "Close", bold: true },
  ];

  return (
    <SafeAreaView
      statusBarColor={Colors.primary.DEFAULT}
      statusBarStyle="light-content"
      className="bg-neutral-surface"
    >
      {/* Blue Header */}
      <View className="bg-primary px-4 pb-4">
        <View className="flex-row items-center gap-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-semibold">Contact Us</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        {/* Phone Numbers */}
        <View className="flex-row items-center px-4 py-6 border-b border-neutral-border">
          <Ionicons name="call-outline" size={24} color={Colors.text.sub} />
          <Text className="ml-4 text-primary text-base">
            092724724 / 081724724 / 093724724
          </Text>
        </View>

        {/* Email */}
        <View className="flex-row items-center px-4 py-6 border-b border-neutral-border">
          <Ionicons name="mail-outline" size={24} color={Colors.text.sub} />
          <Text className="ml-4 text-primary text-base">info@psanpic.com</Text>
        </View>

        {/* Operating Hours */}
        <TouchableOpacity
          onPress={() => setHoursExpanded(!hoursExpanded)}
          className="px-4 py-6 border-b border-neutral-border"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Ionicons name="time-outline" size={24} color={Colors.text.sub} />
              <View className="ml-4 flex-1">
                <Text className="text-base">
                  <Text className="text-danger font-semibold">Closed</Text>
                  <Text className="text-neutral-text-main">
                    {" "}
                    • Open 08:00 MON
                  </Text>
                </Text>
              </View>
            </View>
            <Ionicons
              name={hoursExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color={Colors.text.sub}
            />
          </View>

          {/* Schedule Details */}
          {hoursExpanded && (
            <View className="mt-4 ml-10">
              {schedule.map((item) => (
                <View key={item.day} className="flex-row justify-between py-2">
                  <Text
                    className={`text-base ${
                      item.bold ? "font-semibold" : ""
                    } text-neutral-text-main`}
                  >
                    {item.day}
                  </Text>
                  <Text
                    className={`text-base ${
                      item.bold ? "font-semibold" : ""
                    } text-neutral-text-main`}
                  >
                    {item.hours}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className="flex-row gap-3 px-3 py-3 border-t border-neutral-border">
        <TouchableOpacity
          onPress={handleEmail}
          className="flex-1 bg-primary py-4 rounded-lg flex-row items-center justify-center gap-2"
        >
          <Ionicons name="mail-outline" size={24} color="white" />
          <Text className="text-white font-semibold text-base">Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCall}
          className="flex-1 bg-secondary-orange py-4 rounded-lg flex-row items-center justify-center gap-2"
        >
          <Ionicons name="call-outline" size={24} color="white" />
          <Text className="text-white font-semibold text-base">Call</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ContactUsScreen;
