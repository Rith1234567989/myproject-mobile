import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface CategorySearchHeaderProps {
  placeholder: string;
  onFiltersPress?: () => void;
}

const CategorySearchHeader = ({
  placeholder,
  onFiltersPress,
}: CategorySearchHeaderProps) => {
  return (
    <View className="bg-[#0EA5E9] px-4 pb-3 pt-3">
      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center rounded bg-white/20 px-3 py-2">
          <Ionicons name="search" size={20} color="white" />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="white"
            className="ml-2 flex-1 text-base text-white"
            editable={false}
          />
        </View>
        <TouchableOpacity onPress={onFiltersPress}>
          <Ionicons name="options-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategorySearchHeader;
