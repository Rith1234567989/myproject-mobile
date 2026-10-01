import { Colors } from "@/constants/Colors";
import SafeAreaView from "@/components/common/SafeAreaView";
import { SAMPLE_PRODUCTS } from "@/constants/data/products";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  // In a real app, we would fetch the user by ID.
  const productWithSeller =
    SAMPLE_PRODUCTS.find(
      (p) => p.seller && (p.seller.name === id || p.id === id),
    ) || SAMPLE_PRODUCTS[0];
  const seller = productWithSeller.seller || {
    name: "Sotheavy",
    username: "@chansotheavy",
    avatar: "https://via.placeholder.com/150",
    memberSince: "Jan 2026",
  };

  const sellerProducts = SAMPLE_PRODUCTS; // Show all as "Recent Ads" for demo

  const [activeTab, setActiveTab] = useState<"Home" | "About">("Home");

  return (
    <View className="flex-1 bg-neutral-background">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header Gradient Background */}
      <LinearGradient
        colors={["#5bbdf5", "#dceffa"]}
        className="h-40 w-full absolute top-0 left-0"
      />

      <SafeAreaView className="flex-1">
        {/* Top Navigation */}
        <View className="flex-row justify-between items-center px-4 py-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-black/20 rounded-full items-center justify-center"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-black/20 rounded-full items-center justify-center">
            <Ionicons name="share-social" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 mt-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Info Section */}
          <View className="px-4">
            <View className="flex-row justify-between items-end">
              <View className="relative">
                <Image
                  source={{ uri: seller.avatar }}
                  className="w-24 h-24 rounded-full border-4 border-neutral-surface"
                />
                <View className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-neutral-surface" />
              </View>
              <TouchableOpacity className="bg-neutral-surface px-6 py-2 rounded-lg shadow-sm flex-row items-center gap-2">
                <Ionicons name="add" size={20} color={Colors.primary.DEFAULT} />
                <Text className="text-primary font-bold">Follow</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-3">
              <Text className="text-2xl font-bold text-neutral-text-main">
                {seller.name}
              </Text>
              <Text className="text-neutral-text-sub">{seller.username}</Text>
            </View>

            <View className="flex-row items-center gap-4 mt-2">
              <Text className="text-neutral-text-main font-bold">
                0{" "}
                <Text className="font-normal text-neutral-text-sub">
                  Followers
                </Text>
              </Text>
              <Text className="text-neutral-text-main font-bold">
                0{" "}
                <Text className="font-normal text-neutral-text-sub">
                  Following
                </Text>
              </Text>
            </View>

            <View className="flex-row items-center gap-4 mt-2">
              <View className="flex-row items-center gap-1">
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={Colors.primary.DEFAULT}
                />
                <Text className="text-neutral-text-sub">Verified</Text>
              </View>
              <View className="bg-primary/10 p-0.5 rounded-full">
                <Ionicons
                  name="call"
                  size={12}
                  color={Colors.primary.DEFAULT}
                />
              </View>
            </View>

            <View className="flex-row items-center gap-2 mt-2">
              <Ionicons
                name="calendar-outline"
                size={16}
                color={Colors.text.muted}
              />
              <Text className="text-neutral-text-sub">
                Joined {seller.memberSince}
              </Text>
            </View>

            {/* Action Buttons Row */}
            <View className="flex-row gap-3 mt-6 mb-4">
              <TouchableOpacity className="flex-1 bg-primary rounded-full py-3 flex-row items-center justify-center gap-2 shadow-sm">
                <Ionicons name="share-social" size={20} color="white" />
                <Text className="text-white font-bold text-base">Share</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-12 h-12 border border-primary rounded-full items-center justify-center">
                <Ionicons
                  name="qr-code-outline"
                  size={24}
                  color={Colors.primary.DEFAULT}
                />
              </TouchableOpacity>
              <TouchableOpacity className="w-12 h-12 border border-primary rounded-full items-center justify-center">
                <Ionicons
                  name="ellipsis-horizontal"
                  size={24}
                  color={Colors.primary.DEFAULT}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <View className="flex-row border-b border-neutral-border mt-2">
            <TouchableOpacity
              onPress={() => setActiveTab("Home")}
              className={`flex-1 py-3 border-b-2 ${activeTab === "Home" ? "border-primary" : "border-transparent"}`}
            >
              <Text
                className={`text-center font-bold ${activeTab === "Home" ? "text-primary" : "text-neutral-text-sub"}`}
              >
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("About")}
              className={`flex-1 py-3 border-b-2 ${activeTab === "About" ? "border-primary" : "border-transparent"}`}
            >
              <Text
                className={`text-center font-bold ${activeTab === "About" ? "text-primary" : "text-neutral-text-sub"}`}
              >
                About Me
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === "Home" ? (
            <View className="bg-neutral-background min-h-screen pb-10">
              <View className="flex-row justify-between items-center px-4 py-4">
                <Text className="text-lg font-bold text-neutral-text-main">
                  Recent Ads
                </Text>
                <View className="flex-row gap-2">
                  <Ionicons name="list" size={24} color={Colors.text.muted} />
                  <Ionicons
                    name="grid"
                    size={24}
                    color={Colors.primary.DEFAULT}
                  />
                </View>
              </View>

              {/* Grid */}
              <View className="flex-row flex-wrap px-2">
                {sellerProducts.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="w-1/2 p-2"
                    onPress={() => router.push(`/product/${item.id}`)}
                  >
                    <View className="bg-neutral-surface rounded-lg overflow-hidden shadow-sm">
                      <View className="aspect-square relative">
                        <Image
                          source={typeof item.image === "string" ? { uri: item.image } : item.image || undefined}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                        {/* Red Line */}
                        <View className="absolute top-0 bottom-0 left-8 w-[2px] bg-danger/80" />

                        <TouchableOpacity className="absolute top-2 right-2 bg-black/20 p-1.5 rounded-full">
                          <Ionicons
                            name="heart-outline"
                            size={16}
                            color="white"
                          />
                        </TouchableOpacity>

                        <View className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 rounded">
                          <View className="flex-row items-center gap-1">
                            <Ionicons name="camera" size={10} color="white" />
                            <Text className="text-white text-[10px]">
                              {item.imageCount || 1}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View className="p-2">
                        <Text
                          numberOfLines={2}
                          className="text-neutral-text-main font-medium text-sm h-10 leading-5"
                        >
                          {item.title}
                        </Text>
                        <Text
                          className="text-neutral-text-sub text-xs mt-1"
                          numberOfLines={1}
                        >
                          {item.location}
                        </Text>
                        <Text className="text-neutral-text-sub text-xs">
                          {item.type || "Sale"} •{" "}
                          {item.bedrooms ? `${item.bedrooms} Bedrooms` : "N/A"}
                        </Text>
                        <Text className="text-danger font-bold mt-1">
                          ${item.price.toLocaleString()}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View className="p-4 items-center mt-10">
              <Text className="text-neutral-text-sub">
                No information provided.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
