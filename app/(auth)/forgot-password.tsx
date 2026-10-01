import { Colors } from "@/constants/Colors";
import SafeAreaView from "@/components/common/SafeAreaView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const ForgotPasswordScreen = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");

  const handleSubmit = () => {
    console.log("Reset password for:", phoneOrEmail);
    // TODO: Implement password reset logic
  };

  return (
    <SafeAreaView
      statusBarColor={Colors.primary.DEFAULT}
      statusBarStyle="light-content"
      className="bg-neutral-background"
    >
      {/* Blue Header */}
      <View className="bg-primary px-4 pb-4">
        <View className="flex-row items-center gap-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-semibold">Find Account</Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        {/* Instructions */}
        <Text className="text-neutral-text-sub text-center text-base leading-6 mb-8">
          Enter your phone number or email that you register on PsaNPIC and
          we&apos;ll send the code to set the new password
        </Text>

        {/* Input Field */}
        <View className="bg-neutral-surface rounded-lg px-4 py-3 shadow-sm mb-6">
          <TextInput
            className="text-base text-neutral-text-main"
            placeholder="Phone Number or Email"
            placeholderTextColor={Colors.text.muted}
            value={phoneOrEmail}
            onChangeText={setPhoneOrEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-secondary-orange py-4 rounded-lg items-center justify-center shadow-sm"
        >
          <Text className="text-white font-bold text-lg">Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
