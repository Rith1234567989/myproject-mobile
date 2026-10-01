import BrandGrid from "@/components/category/BrandGrid";
import FilterChips from "@/components/category/FilterChips";
import TypeSelector from "@/components/category/TypeSelector";
import Divider from "@/components/common/Divider";
import SafeAreaView from "@/components/common/SafeAreaView";
import PromoCard from "@/components/home/PromoCard";
import ProductCard from "@/components/product/ProductCard";
import { CATEGORIES } from "@/constants/data/categories";
import { getFiltersForCategory } from "@/constants/data/filters";
import { SAMPLE_PRODUCTS } from "@/constants/data/products";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useLanguage } from "@/contexts/LanguageContext";

type ViewMode = "list" | "grid";

export default function SubCategoryScreen() {
  const { categoryId, subCategoryId } = useLocalSearchParams<{
    categoryId: string;
    subCategoryId: string;
  }>();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const { getCategoryName, t } = useLanguage();

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  // Fetch data
  const data = useMemo(() => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    const subCategory = category?.subs?.find((s) => s.id === subCategoryId);
    return { category, subCategory };
  }, [categoryId, subCategoryId]);

  const rawSubName = data.subCategory?.name || (subCategoryId as string);
  const subCategoryName = getCategoryName(subCategoryId as string, rawSubName);

  const handleBrandPress = (brandId: string) => {
    router.push(`/(categories)/${categoryId}/${subCategoryId}/${brandId}`);
  };

  const handleTypePress = (typeId: string) => {
    router.push(`/(categories)/${categoryId}/${subCategoryId}/type/${typeId}`);
  };

  return (
    <SafeAreaView statusBarColor="#0EA5E9" statusBarStyle="light-content">
      {/* Header */}
      <View className="bg-[#0EA5E9] px-4 pb-3 pt-3">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center rounded bg-white/20 px-3 py-2">
            <Ionicons name="search" size={20} color="white" />
            <TextInput
              placeholder="Search..."
              placeholderTextColor="white"
              className="ml-2 flex-1 text-base text-white"
              editable={false}
            />
          </View>
          <TouchableOpacity onPress={() => router.push("/filters")}>
            <Ionicons name="options-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 bg-white">
        {/* Title & View Toggle */}
        <View className="flex-row items-center justify-between px-4 py-4">
          <Text className="text-xl font-bold text-gray-900 capitalize">
            {subCategoryName}
          </Text>

          <View className="flex-row gap-4">
            <TouchableOpacity>
              <Text className="text-xl font-bold">%</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="bus-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleViewMode}>
              <Ionicons
                name={viewMode === "list" ? "list-outline" : "grid-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters Row */}
        <FilterChips
          filters={getFiltersForCategory(
            categoryId as string,
            subCategoryId as string,
          )}
          onLocationPress={() => {}}
          onFiltersPress={() => router.push("/filters")}
          selectedLocation={undefined}
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Brand Grid */}
          {data.subCategory?.brands && data.subCategory.brands.length > 0 && (
            <View>
              <BrandGrid
                brands={data.subCategory.brands}
                onBrandPress={handleBrandPress}
              />
              <Divider />
            </View>
          )}

          {/* Type List */}
          {data.subCategory?.types && data.subCategory.types.length > 0 && (
            <TypeSelector
              types={data.subCategory.types}
              onTypePress={handleTypePress}
            />
          )}

          <Divider variant="thick" />

          {/* Products Section */}
          <View className="pt-2">
            {viewMode === "list" ? (
              <View>
                <PromoCard viewMode="list" />
                {SAMPLE_PRODUCTS.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="list"
                  />
                ))}
              </View>
            ) : (
              <View className="flex-row flex-wrap px-1">
                <PromoCard viewMode="grid" />
                {SAMPLE_PRODUCTS.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="grid"
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
