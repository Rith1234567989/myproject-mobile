import FilterChips from "@/components/category/FilterChips";
import ModelGrid from "@/components/category/ModelGrid";
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

type ViewMode = "list" | "grid";

export default function BrandScreen() {
  const { categoryId, subCategoryId, brandId } = useLocalSearchParams<{
    categoryId: string;
    subCategoryId: string;
    brandId: string;
  }>();
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  // Find the category, subcategory, and brand data
  const data = useMemo(() => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    const subCategory = category?.subs?.find((s) => s.id === subCategoryId);
    const brand = subCategory?.brands?.find((b) => b.id === brandId) as
      | {
          id: string;
          name: string;
          image: any;
          models?: { id: string; name: string }[];
        }
      | undefined;

    // Fallback for brand name if not found in data (using ID pretty printed)
    const brandName =
      brand?.name ||
      brandId
        ?.split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    return {
      category,
      subCategory,
      brand,
      brandName,
    };
  }, [categoryId, subCategoryId, brandId]);

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
          <Text className="text-xl font-bold text-gray-900">
            {data.subCategory?.name || subCategoryId} • {data.brandName}
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
          {/* Models Grid - Only show if brand has models */}
          {data.brand?.models && data.brand.models.length > 0 && (
            <ModelGrid models={data.brand.models} showMore={true} />
          )}

          {/* Type Selector - User can still filter by type */}
          {data.subCategory?.types && data.subCategory.types.length > 0 && (
            <View>
              <Divider />
              <TypeSelector
                types={data.subCategory.types}
                onTypePress={(typeId) =>
                  router.push(
                    `/(categories)/${categoryId}/${subCategoryId}/${brandId}/${typeId}`,
                  )
                }
              />
            </View>
          )}

          <Divider variant="thick" />

          {/* Products Section */}
          <View className="mt-2">
            {viewMode === "list" ? (
              <View>
                {!data.brand?.models && <PromoCard viewMode="list" />}
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
                {!data.brand?.models && <PromoCard viewMode="grid" />}
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
