
import { useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

cssInterop(LinearGradient, { className: "style" });
cssInterop(BlurView, { className: "style" });

const NearbySection = () => {
  const { t } = useLanguage();

  return (
    <View className="pt-4 pb-2">
      <LinearGradient 
        colors={["#38BDF8", "#818CF8", "#F8FAFC"]} 
        locations={[0, 0.45, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full pt-6 pb-6 px-3"
      >
        <View className="flex-row items-center justify-between mb-4 px-2">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-2xl items-center justify-center shadow-md border border-white/80">
              <Ionicons
                name="location-sharp"
                size={22}
                color="#0EA5E9"
              />
            </View>
            <View className="ml-3">
              <Text className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {t("nearbyListings")}
              </Text>
              <Text className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Discover listings in your local area
              </Text>
            </View>
          </View>
        </View>

        <View
          className="w-full h-64 rounded-3xl overflow-hidden bg-white/30 border border-white/60 relative"
          style={{ 
            elevation: 10, 
            shadowColor: "#0284C7", 
            shadowOffset: { width: 0, height: 6 }, 
            shadowOpacity: 0.15, 
            shadowRadius: 16 
          }}
        >
          <Image
            source={require("@/assets/images/map_placeholder.png")}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />

          <BlurView
            intensity={45}
            tint="light"
            className="absolute inset-0 items-center justify-center p-6 bg-white/30"
          >
            {/* Animated Pin Ring Badge */}
            <View className="w-20 h-20 bg-sky-500/20 rounded-full items-center justify-center mb-4 border-2 border-sky-400/40">
              <View className="w-14 h-14 bg-white dark:bg-gray-900 rounded-full items-center justify-center shadow-lg border border-sky-100">
                <Ionicons name="navigate" size={28} color="#0EA5E9" />
              </View>
            </View>

            <Text className="text-gray-900 dark:text-white text-lg font-black text-center mb-1 px-4 tracking-tight">
              {t("nearbyListings")}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300 text-xs font-medium text-center mb-5 px-6 leading-4">
              Explore deals, items, and services right in your neighborhood.
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-sky-500 hover:bg-sky-600 px-8 py-3.5 rounded-2xl shadow-md border border-sky-400/50 flex-row items-center gap-2"
            >
              <Ionicons name="location" size={18} color="white" />
              <Text className="text-white font-bold text-sm">
                Enable Location
              </Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default NearbySection;
