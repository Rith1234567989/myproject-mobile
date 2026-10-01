import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useGridCardSize } from "../../hooks/useGridCardSize";

cssInterop(LinearGradient, { className: "style" });

interface PromoCardProps {
  viewMode?: "list" | "grid";
}

const PromoCard = ({ viewMode = "list" }: PromoCardProps) => {
  const { total } = useGridCardSize();

  if (viewMode === "grid") {
    return (
      <View className="w-1/2 p-1.5">
        <View 
          className="rounded-3xl overflow-hidden shadow-sm"
          style={{ height: total }}
        >
          <LinearGradient
            colors={["#0EA5E9", "#6366F1", "#8B5CF6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="h-full items-center justify-between p-4 flex-1"
          >
            {/* Sparkles Icon Badge */}
            <View className="w-10 h-10 rounded-2xl bg-white/20 items-center justify-center border border-white/30 mb-2">
              <Ionicons name="sparkles" size={20} color="white" />
            </View>

            {/* Content */}
            <View className="flex-1 items-center justify-center my-1">
              <Text className="mb-2 text-center text-base font-black text-white leading-5">
                Want to see your ads here?
              </Text>
              <Text className="text-center text-[11px] leading-4 text-white/90 font-medium" numberOfLines={3}>
                Make extra cash by selling on psakhmer. It&apos;s quick & easy!
              </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
              className="w-full rounded-2xl bg-white py-2.5 shadow-md"
              onPress={() => router.push("/(tabs)/sell")}
              activeOpacity={0.8}
            >
              <Text className="text-center text-xs font-bold text-sky-600 uppercase tracking-wide">
                Start Selling
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }

  // List view - full width
  return (
    <View className="px-4 py-2">
      <View 
        className="rounded-3xl overflow-hidden"
        style={{
          elevation: 4,
          shadowColor: "#6366F1",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        }}
      >
        <LinearGradient
          colors={["#0EA5E9", "#6366F1", "#8B5CF6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-5"
        >
          <View className="flex-row items-center gap-2 mb-2">
            <View className="w-8 h-8 rounded-xl bg-white/20 items-center justify-center border border-white/30">
              <Ionicons name="sparkles" size={18} color="white" />
            </View>
            <Text className="text-lg font-black text-white tracking-tight">
              Want to see your ads here?
            </Text>
          </View>
          
          <Text className="mb-4 text-xs leading-5 text-white/90 font-medium">
            Turn your unused items into fast cash by posting a free ad on psakhmer in seconds.
          </Text>

          <TouchableOpacity
            className="w-full rounded-2xl bg-white py-3 shadow-md flex-row items-center justify-center gap-2"
            onPress={() => router.push("/(tabs)/sell")}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle" size={18} color="#0EA5E9" />
            <Text className="text-center text-sm font-extrabold text-sky-600 uppercase tracking-wide">
              Start Selling Now
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default PromoCard;
