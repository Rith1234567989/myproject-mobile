import { Colors } from "@/constants/Colors";
import { SAMPLE_PRODUCTS } from "@/constants/data/products";
import ProductCard from "@/components/product/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SafeAreaView from "@/components/common/SafeAreaView";

const SUGGESTIONS = [
  "iPhone",
  "Lexus",
  "Condo",
  "Jobs",
  "Honda",
  "Yamaha",
  "Bicycle",
  "Camera",
  "Villa",
  "Nail Salon",
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Focus search input on mount
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  }, []);

  const filteredProducts = useMemo(() => {
    if (query.trim() === "") return [];
    const normalizedQuery = query.toLowerCase();

    return SAMPLE_PRODUCTS.filter((product) => {
      const matchesTitle = product.title.toLowerCase().includes(normalizedQuery);
      const matchesDesc =
        product.description?.toLowerCase().includes(normalizedQuery) || false;
      const matchesMainCat =
        product.mainCategory?.toLowerCase().includes(normalizedQuery) || false;
      const matchesCat =
        product.category?.toLowerCase().includes(normalizedQuery) || false;

      return matchesTitle || matchesDesc || matchesMainCat || matchesCat;
    });
  }, [query]);

  return (
    <SafeAreaView statusBarColor="white" statusBarStyle="dark-content">
      {/* Search Header */}
      <View
        className="flex-row items-center bg-white px-4 py-3 border-b border-neutral-border/50"
        style={{
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="mr-3 p-1 rounded-full"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>

        {/* Input Field */}
        <View className="flex-1 flex-row items-center bg-neutral-background px-3 py-2 rounded-xl border border-neutral-border/30">
          <Ionicons name="search" size={20} color={Colors.text.muted} />
          <TextInput
            ref={inputRef}
            placeholder="Search products, jobs, cars..."
            placeholderTextColor={Colors.text.muted}
            className="ml-2 flex-1 text-base text-neutral-text-main py-0.5"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => setQuery("")}
              className="p-0.5 rounded-full bg-neutral-border/60"
            >
              <Ionicons name="close" size={16} color={Colors.text.sub} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          className="ml-4 py-2"
        >
          <Text className="text-primary font-bold text-base">Cancel</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 bg-white">
        {/* Suggestion block (when query is empty) */}
        {query.trim() === "" ? (
          <ScrollView className="flex-1 px-4 pt-6">
            <Text className="text-base font-bold text-neutral-text-main mb-4">
              Popular Searches
            </Text>
            <View className="flex-row flex-wrap gap-2.5">
              {SUGGESTIONS.map((suggestion, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setQuery(suggestion)}
                  activeOpacity={0.7}
                  className="bg-neutral-background px-4 py-2 rounded-full border border-neutral-border/20"
                >
                  <Text className="text-sm font-medium text-neutral-text-sub">
                    {suggestion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          /* Results view */
          <View className="flex-1">
            {/* Header info bar */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-neutral-background/30 border-b border-neutral-border/10">
              <Text className="text-sm text-neutral-text-sub font-medium">
                {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} found
              </Text>
              {filteredProducts.length > 0 && (
                <TouchableOpacity
                  onPress={() => setViewMode((prev) => (prev === "list" ? "grid" : "list"))}
                  className="p-1 rounded-md"
                >
                  <Ionicons
                    name={viewMode === "list" ? "grid-outline" : "list-outline"}
                    size={20}
                    color={Colors.text.sub}
                  />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView
              className="flex-1"
              contentContainerStyle={{ paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            >
              {filteredProducts.length === 0 ? (
                /* No Results UI */
                <View className="items-center justify-center p-8 mt-20">
                  <View className="w-20 h-20 bg-neutral-background rounded-full items-center justify-center mb-6">
                    <Ionicons name="search-outline" size={40} color={Colors.text.muted} />
                  </View>
                  <Text className="text-xl font-bold text-neutral-text-main text-center mb-2">
                    No results found for &quot;{query}&quot;
                  </Text>
                  <Text className="text-sm text-neutral-text-sub text-center px-8 leading-5">
                    Check the spelling or try searching for something more general like &quot;iPhone&quot; or &quot;Car&quot;.
                  </Text>
                </View>
              ) : viewMode === "list" ? (
                /* List View Results */
                <View>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode="list"
                    />
                  ))}
                </View>
              ) : (
                /* Grid View Results */
                <View className="flex-row flex-wrap px-1.5 pt-1.5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode="grid"
                    />
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
