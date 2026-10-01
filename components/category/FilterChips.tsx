import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export interface FilterItem {
  key?: string;
  label: string;
  icon?: string;
  hasDropdown?: boolean;
}

interface FilterChipsProps {
  categoryId?: string;
  filters?: FilterItem[];
  onLocationPress?: () => void;
  onFiltersPress?: () => void;
  selectedLocation?: string;
}

const FilterChips = ({
  categoryId,
  filters,
  onLocationPress,
  onFiltersPress,
  selectedLocation,
}: FilterChipsProps) => {
  const { t } = useLanguage();

  const isJobs = categoryId === "jobs";

  const defaultFilters: FilterItem[] = [
    { key: "filters", label: t("filters"), icon: "options-outline" },
    { key: "location", label: t("location"), icon: "location", hasDropdown: true },
    { key: "sort", label: t("sort"), hasDropdown: true },
    { key: isJobs ? "salary" : "price", label: isJobs ? t("salary") : t("price"), hasDropdown: true },
  ];

  const items = filters || defaultFilters;

  const handleFilterPress = (filter: FilterItem) => {
    if (filter.key === "location" && onLocationPress) {
      onLocationPress();
    } else if (filter.key === "filters" && onFiltersPress) {
      onFiltersPress();
    }
  };

  return (
    <View className="py-2 bg-white">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}
      >
        {items.map((filter, index) => {
          const isLocation = filter.key === "location" || filter.label === t("location");
          const displayLabel =
            isLocation && selectedLocation ? selectedLocation : filter.label;
          const isSelected = isLocation && selectedLocation;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleFilterPress(filter)}
              className={`flex-row items-center rounded-lg px-3 py-2 bg-gray-100 ${
                isSelected ? "bg-sky-500" : "bg-gray-100"
              }`}
              activeOpacity={0.7}
            >
              {filter.icon && (
                <Ionicons
                  name={filter.icon as any}
                  size={16}
                  color={isSelected ? "white" : "#374151"}
                  style={{ marginRight: 4 }}
                />
              )}
              <Text
                className={`text-sm font-semibold ${
                  isSelected ? "text-white" : "text-gray-800"
                }`}
              >
                {displayLabel}
              </Text>
              {filter.hasDropdown && (
                <Ionicons
                  name="caret-down"
                  size={11}
                  color={isSelected ? "white" : "#4B5563"}
                  style={{ marginLeft: 4 }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View className="mt-2 h-[1px] bg-gray-200" />
    </View>
  );
};

export default FilterChips;
