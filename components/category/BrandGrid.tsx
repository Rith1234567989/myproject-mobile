import { useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface BrandItem {
  id: string;
  name: string;
  image: any;
}

interface BrandGridProps {
  brands: BrandItem[];
  onBrandPress: (id: string) => void;
}

const BrandGrid = ({ brands, onBrandPress }: BrandGridProps) => {
  const { t } = useLanguage();
  if (!brands || brands.length === 0) return null;

  // Show top 9 brands + "Show More" = 10 items (2 rows of 5)
  const displayBrands = brands.slice(0, 9);

  return (
    <View className="px-2 pt-2 pb-2 bg-gray-50">
      <View className="flex-row flex-wrap">

        {displayBrands.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            className="w-1/5 items-center mb-2"
            onPress={() => onBrandPress(brand.id)}
          >
            <View className="w-14 h-14 mb-2 items-center justify-center">
              <Image
                source={brand.image}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
            <Text
              className="text-xs text-center text-gray-900 mb-2"
              numberOfLines={1}
            >
              {brand.name}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Show More */}
        <TouchableOpacity
          className="w-1/5 items-center mb-2"
          onPress={() => { }}
        >
          <View className="w-14 h-14 mb-2 rounded-full items-center justify-center">
            <Ionicons
              name="ellipsis-horizontal-circle-outline"
              size={28}
              color="gray"
            />
          </View>
          <Text className="text-xs text-center text-gray-900">{t("seeAll")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BrandGrid;
