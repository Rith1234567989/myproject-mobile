import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ModelItem {
  id: string;
  name: string;
}

interface ModelGridProps {
  models: ModelItem[];
  showMore?: boolean;
}

const ModelGrid = ({ models, showMore = true }: ModelGridProps) => {
  if (models.length === 0) return null;

  return (
    <View className="px-4 pt-2 pb-2 bg-neutral-background">
      <View className="flex-row flex-wrap">
        {/* Model Label */}
        <View className="w-1/3 mb-4">
          <Text className="text-base text-neutral-text-muted">Model:</Text>
        </View>

        {/* Model Items */}
        {models.map((model, index) => (
          <TouchableOpacity key={model.id} className="w-1/3 mb-4">
            <Text
              className={`text-base ${index === 0 ? "text-primary" : "text-neutral-text-main"}`}
            >
              {model.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {showMore && (
        <TouchableOpacity className="flex-row items-center justify-center py-2">
          <Text className="text-primary mr-1 font-medium">Show More</Text>
          <Ionicons
            name="chevron-down"
            size={18}
            color={Colors.primary.DEFAULT}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ModelGrid;
