import CategorySearchHeader from "@/components/category/CategorySearchHeader";
import FilterChips from "@/components/category/FilterChips";
import Divider from "@/components/common/Divider";
import SafeAreaView from "@/components/common/SafeAreaView";
import PromoCard from "@/components/home/PromoCard";
import JobTypeQuickFilter from "@/components/job/JobTypeQuickFilter"; // Job type quick filter component
import ProductCard from "@/components/product/ProductCard";
import { CATEGORIES } from "@/constants/data/categories";
import { SAMPLE_PRODUCTS } from "@/constants/data/products";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLanguage } from "@/contexts/LanguageContext";

type ViewMode = "list" | "grid";

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const { getCategoryName, t } = useLanguage();

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  const category = useMemo(() => {
    return CATEGORIES.find((c) => c.id === categoryId);
  }, [categoryId]);

  const rawName = category?.name || categoryId || "Category";
  const categoryName = getCategoryName(categoryId as string, rawName);

  const handleSubCategoryPress = (subId: string) => {
    router.push(`/(categories)/${categoryId}/${subId}`);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Group subcategories into pages of 8 items (4 cols x 2 rows)
  const subCategoryPages = useMemo(() => {
    if (!category?.subs) return [];
    const pages = [];
    const pageSize = 8;
    for (let i = 0; i < category.subs.length; i += pageSize) {
      pages.push(category.subs.slice(i, i + pageSize));
    }
    return pages;
  }, [category]);

  const handleScroll = (event: any) => {
    if (containerWidth <= 0) return;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / containerWidth);
    if (pageIndex !== currentPage && pageIndex >= 0 && pageIndex < subCategoryPages.length) {
      setCurrentPage(pageIndex);
    }
  };

  return (
    <SafeAreaView statusBarColor="#0EA5E9" statusBarStyle="light-content">
      {/* Header */}
      <CategorySearchHeader
        placeholder={`Search in ${categoryName}...`}
        onFiltersPress={() => router.push("/filters")}
      />

      <View className="flex-1 bg-white">
        {/* Title & View Toggle */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
          <Text className="text-xl font-bold text-gray-900 capitalize">
            {categoryName}
          </Text>

          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={toggleViewMode} className="p-1">
              <Ionicons
                name={viewMode === "list" ? "grid-outline" : "list-outline"}
                size={24}
                color="#1F2937"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters Row */}
        <FilterChips
          categoryId={categoryId as string}
          onLocationPress={() => {}}
          onFiltersPress={() => router.push("/filters")}
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Subcategories Grid matching user screenshot (4 cols x 2 rows paginated) */}
          {subCategoryPages.length > 0 && (
            <View
              className="bg-white pt-2 pb-4 mb-2 border-b border-gray-100"
              onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
            >
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ width: containerWidth ? containerWidth * subCategoryPages.length : "100%" }}
              >
                {subCategoryPages.map((pageSubs, pageIdx) => (
                  <View
                    key={`page-${pageIdx}`}
                    style={{ width: containerWidth || "100%" }}
                    className="flex-row flex-wrap px-2"
                  >
                    {pageSubs.map((sub, index) => (
                      <TouchableOpacity
                        key={`${sub.id}-${index}`}
                        onPress={() => handleSubCategoryPress(sub.id)}
                        className="w-[25%] items-center py-2.5 px-1"
                        activeOpacity={0.7}
                      >
                        <View className="w-14 h-14 mb-1.5 rounded-full bg-slate-100/90 dark:bg-gray-800 items-center justify-center p-2">
                          {sub.image ? (
                            <Image
                              source={sub.image}
                              className="w-10 h-10"
                              resizeMode="contain"
                            />
                          ) : sub.icon ? (
                            <Ionicons name={sub.icon as any} size={27} color={sub.color || "#2563EB"} />
                          ) : null}
                        </View>
                        <Text
                          className="text-[11px] font-medium text-gray-800 text-center leading-3.5"
                          numberOfLines={2}
                        >
                          {getCategoryName(sub.id, sub.name)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </ScrollView>

              {/* Pagination Dots */}
              {subCategoryPages.length > 1 && (
                <View className="flex-row items-center justify-center gap-1.5 mt-3">
                  {subCategoryPages.map((_, dotIdx) => (
                    <View
                      key={`dot-${dotIdx}`}
                      className={`h-2 rounded-full transition-all ${
                        currentPage === dotIdx
                          ? "w-4 bg-orange-500"
                          : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </View>
              )}

              {/* Job Schedule Types (Full-time, Part-time, Internship, Freelance, Show More) */}
              {categoryId === "jobs" && (
                <View className="border-t border-gray-100 mt-3 pt-1">
                  <JobTypeQuickFilter />
                </View>
              )}
            </View>
          )}

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