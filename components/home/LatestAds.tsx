import { SAMPLE_PRODUCTS } from "@/constants/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProductCard from "../product/ProductCard";
import PromoCard from "./PromoCard";

type ViewMode = "list" | "grid";

const LatestAds = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const { t } = useLanguage();

  return (
    <View className="pt-5 pb-4">
      {/* Section Header */}
      <View className="mb-4 px-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="w-2.5 h-6 bg-sky-500 rounded-full" />
          <Text className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {t("latestAds")}
          </Text>
        </View>

        {/* Layout Toggle Segmented Control */}
        <View className="flex-row items-center rounded-full bg-gray-100 dark:bg-gray-800 p-1 border border-gray-200/80 dark:border-gray-700">
          <TouchableOpacity
            className={`p-1.5 px-3 rounded-full flex-row items-center gap-1 ${
              viewMode === "grid" 
                ? "bg-white dark:bg-gray-900 shadow-2xs border border-gray-200/60 dark:border-gray-700" 
                : "bg-transparent"
            }`}
            onPress={() => setViewMode("grid")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="grid-sharp"
              size={16}
              color={viewMode === "grid" ? "#0EA5E9" : "#9CA3AF"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className={`p-1.5 px-3 rounded-full flex-row items-center gap-1 ${
              viewMode === "list" 
                ? "bg-white dark:bg-gray-900 shadow-2xs border border-gray-200/60 dark:border-gray-700" 
                : "bg-transparent"
            }`}
            onPress={() => setViewMode("list")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="list-sharp"
              size={16}
              color={viewMode === "list" ? "#0EA5E9" : "#9CA3AF"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === "list" ? (
        // List View
        <View>
          <PromoCard viewMode="list" />
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} viewMode="list" />
          ))}
        </View>
      ) : (
        // Grid View
        <View className="px-1.5 flex-row flex-wrap">
          <PromoCard viewMode="grid" />
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} viewMode="grid" />
          ))}
        </View>
      )}
    </View>
  );
};

export default LatestAds;
