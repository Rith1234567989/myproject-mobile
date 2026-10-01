import { Product } from "@/types/product";
import { useGridCardSize } from "@/hooks/useGridCardSize";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  product: Product;
  viewMode: "list" | "grid";
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const { total } = useGridCardSize();
  const [isFav, setIsFav] = useState(product.isFavorite || false);

  const getImageSource = (img: any) => {
    if (!img) return null;
    if (typeof img === "string") return { uri: img };
    return img;
  };

  const renderImageBadges = () => (
    <>
      {/* Favorite Button */}
      <TouchableOpacity 
        className="absolute right-2.5 top-2.5 rounded-full bg-black/50 p-2 shadow-sm border border-white/20"
        activeOpacity={0.7}
        onPress={(e) => {
          e.stopPropagation();
          setIsFav(!isFav);
        }}
      >
        <Ionicons
          name={isFav ? "heart" : "heart-outline"}
          size={15}
          color={isFav ? "#EF4444" : "white"}
        />
      </TouchableOpacity>

      {/* Free Delivery Badge */}
      {product.hasFreeDelivery && (
        <View className="absolute bottom-2.5 left-2.5 flex-row items-center rounded-full bg-black/70 px-2 py-0.5 border border-white/20">
          <Ionicons name="car" size={11} color="#38BDF8" />
          <Text className="ml-1 text-[10px] font-bold text-white uppercase tracking-wider">
            Free Delivery
          </Text>
        </View>
      )}

      {/* Image Count Badge */}
      {product.imageCount && product.imageCount > 0 && (
        <View className="absolute bottom-2.5 right-2.5 flex-row items-center rounded-full bg-black/70 px-2 py-0.5 border border-white/20">
          <Ionicons name="camera" size={11} color="white" />
          <Text className="ml-1 text-[10px] font-bold text-white">
            {product.imageCount}
          </Text>
        </View>
      )}
    </>
  );

  const getSecondaryInfo = () => {
    const parts = [];
    if (product.type) parts.push(product.type);
    else if (product.condition) parts.push(product.condition);
    else if (product.jobType) parts.push(product.jobType);

    if (product.size) parts.push(product.size);
    else if (product.experienceLevel) parts.push(product.experienceLevel);
    else if (product.year) parts.push(product.year);

    if (product.taxPaper) parts.push("Tax Paper");

    return parts.join(" • ") || " ";
  };

  const renderPlaceholderImage = () => (
    <View className="h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
      <View className="items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-700 p-4">
        <Ionicons name="image-outline" size={32} color="#9CA3AF" />
      </View>
      <Text
        className="absolute px-2 text-center text-xs font-medium text-gray-500"
        numberOfLines={2}
      >
        {product.title}
      </Text>
    </View>
  );

  // LIST VIEW
  if (viewMode === "list") {
    return (
      <View className="px-4 py-1.5">
        <TouchableOpacity
          className="flex-row rounded-3xl bg-white dark:bg-gray-900 p-3 border border-gray-100 dark:border-gray-800"
          style={{
            elevation: 2,
            shadowColor: "#0F172A",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
          }}
          onPress={() => router.push(`/product/${product.id}`)}
          activeOpacity={0.7}
        >
          {/* Image Container */}
          <View className="relative h-32 w-32 overflow-hidden rounded-2xl bg-gray-100">
            {product.image ? (
              <Image
                source={getImageSource(product.image)}
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              renderPlaceholderImage()
            )}
            {renderImageBadges()}
          </View>

          {/* Details */}
          <View className="ml-3 h-32 flex-1 justify-between py-0.5">
            {/* Title */}
            <Text
              className="text-sm font-bold text-gray-900 dark:text-white leading-5"
              numberOfLines={2}
            >
              {product.title}
            </Text>

            {/* Date, Location */}
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={12} color="#6B7280" />
              <Text
                className="ml-1 flex-1 text-xs text-gray-500 dark:text-gray-400 font-medium"
                numberOfLines={1}
              >
                {product.date}
                {product.location ? ` • ${product.location}` : ""}
              </Text>
            </View>

            {/* Condition / Info */}
            <Text className="text-xs text-gray-400 dark:text-gray-500" numberOfLines={1}>
              {getSecondaryInfo()}
            </Text>

            {/* Verified Badge */}
            {product.isVerified && (
              <View className="flex-row items-center">
                <View className="rounded-md bg-sky-50 dark:bg-sky-950 px-2 py-0.5 border border-sky-200 dark:border-sky-800">
                  <Text className="text-[10px] font-bold text-sky-600 dark:text-sky-400">
                    ✓ Verified Account
                  </Text>
                </View>
              </View>
            )}

            {/* Price */}
            <View className="flex-row items-center">
              <Text className="text-base font-black text-rose-600 dark:text-rose-400">
                ${product.price.toLocaleString()}
                {product.jobType ? "+" : ""}
              </Text>
              {product.oldPrice && (
                <Text className="ml-2 text-xs text-gray-400 line-through">
                  ${product.oldPrice.toLocaleString()}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // GRID VIEW
  return (
    <TouchableOpacity
      className="w-1/2 p-1.5"
      onPress={() => router.push(`/product/${product.id}`)}
      activeOpacity={0.75}
    >
      <View
        className="overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
        style={{ 
          height: total,
          elevation: 3,
          shadowColor: "#0F172A",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
        }}
      >
        {/* Image Container */}
        <View className="relative aspect-square">
          {product.image ? (
            <Image
              source={getImageSource(product.image)}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            renderPlaceholderImage()
          )}
          {renderImageBadges()}
        </View>

        {/* Details */}
        <View className="h-36 justify-between p-3">
          {/* Title */}
          <Text
            className="text-xs font-bold text-gray-900 dark:text-white leading-4"
            numberOfLines={2}
          >
            {product.title}
          </Text>

          {/* Location & Time */}
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={11} color="#9CA3AF" />
            <Text
              className="ml-1 flex-1 text-[11px] text-gray-500 font-medium"
              numberOfLines={1}
            >
              {product.date}
              {product.location ? ` • ${product.location}` : ""}
            </Text>
          </View>

          {/* Secondary Specs */}
          <Text className="text-[11px] text-gray-400" numberOfLines={1}>
            {getSecondaryInfo()}
          </Text>

          {/* Verified Account Tag */}
          {product.isVerified && (
            <View className="flex-row items-center">
              <View className="rounded-md bg-sky-50 dark:bg-sky-950 px-1.5 py-0.5 border border-sky-200 dark:border-sky-800">
                <Text className="text-[9px] font-bold text-sky-600 dark:text-sky-400">
                  ✓ Verified
                </Text>
              </View>
            </View>
          )}

          {/* Price */}
          <View className="flex-row items-center">
            <Text className="text-base font-black text-rose-600 dark:text-rose-400">
              ${product.price.toLocaleString()}
              {product.jobType ? "+" : ""}
            </Text>
            {product.oldPrice && (
              <Text className="ml-1.5 text-xs text-gray-400 line-through">
                ${product.oldPrice.toLocaleString()}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
