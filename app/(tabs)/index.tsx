import NavBar from "@/components/common/NavBar";
import SafeAreaView from "@/components/common/SafeAreaView";
import LatestAds from "@/components/home/LatestAds";
import NearbySection from "@/components/home/NearbySection";
import { CATEGORIES } from "@/constants/data/categories";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { useLanguage } from "@/contexts/LanguageContext";

const HomeScreen = () => {
  const { getCategoryName } = useLanguage();

  return (
    <SafeAreaView className="bg-slate-50 dark:bg-gray-950">
      <NavBar
        onQRCodePress={() => router.push("/scan")}
        onSearchPress={() => router.push("/search")}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        className="bg-slate-50 dark:bg-gray-950"
      >
        {/* Animated Banner Header */}
        <View className="px-3 pt-3">
          <View
            className="w-full overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
            style={{
              elevation: 4,
              shadowColor: "#0EA5E9",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
            }}
          >
            <View style={{ width: "100%", aspectRatio: 640 / 290 }}>
              <Image
                source={require("@/assets/images/ai.gif")}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
        </View>

        {/* Main Category Grid Container matching user screenshot */}
        <View
          className="mx-3 mt-4 bg-white dark:bg-gray-900 px-1 pt-4 pb-2 rounded-3xl border border-gray-100 dark:border-gray-800"
          style={{
            elevation: 2,
            shadowColor: "#0F172A",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
          }}
        >
          <View className="flex-row flex-wrap">
            {CATEGORIES.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(index * 25).duration(300)}
                className="w-1/4 items-center mb-5"
              >
                <TouchableOpacity
                  onPress={() => router.push(`/(categories)/${item.id}`)}
                  className="items-center w-full px-1"
                  activeOpacity={0.7}
                >
                  <View className="w-14 h-14 items-center justify-center mb-1.5">
                    <Image
                      source={item.image}
                      className="w-12 h-12"
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 text-center leading-4 px-0.5"
                    numberOfLines={2}
                    style={{ minHeight: 32 }}
                  >
                    {getCategoryName(item.id, item.name)}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Nearby Deals Banner Section */}
        <NearbySection />

        {/* Latest Ads Listing Feed */}
        <LatestAds />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
