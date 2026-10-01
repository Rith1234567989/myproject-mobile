import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface TypeItem {
  id: string;
  name: string;
  image: any;
}

interface TypeSelectorProps {
  types: TypeItem[];
  onTypePress: (id: string) => void;
}

const TypeSelector = ({ types, onTypePress }: TypeSelectorProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!types || types.length === 0) return null;

  // Show first 4 types + "Show More" = 5 items per row
  const displayTypes = types.slice(0, 4);

  const filteredTypes = useMemo(() => {
    if (!searchQuery.trim()) return types;
    return types.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [types, searchQuery]);

  const handleSelectType = (id: string) => {
    setModalVisible(false);
    onTypePress(id);
  };

  return (
    <View className="px-2 pt-6 pb-4 bg-white">
      <View className="flex-row flex-wrap">
        {displayTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            onPress={() => onTypePress(type.id)}
            className="w-1/5 items-center mb-2"
          >
            <View className="w-14 h-14 mb-4 items-center justify-center">
              <Image
                source={type.image}
                className="h-full w-full bg-gray-100 rounded-full"
                resizeMode="contain"
              />
            </View>
            <Text
              className="text-gray-900 text-xs text-center"
              numberOfLines={1}
            >
              {type.name}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Show More - Only if more than 4 types */}
        {types.length > 4 && (
          <TouchableOpacity
            className="w-1/5 items-center mb-2"
            onPress={() => {
              setSearchQuery("");
              setModalVisible(true);
            }}
          >
            <View className="w-14 h-14 mb-4 rounded-full bg-gray-100 items-center justify-center">
              <Ionicons name="ellipsis-horizontal" size={24} color="gray" />
            </View>
            <Text className="text-gray-900 text-xs text-center">Show More</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Type Selection Modal matching user screenshot */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          className="flex-1 bg-black/50 justify-end"
        >
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-t-3xl h-[85%] w-full overflow-hidden flex-col">
              {/* Handle Bar */}
              <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mt-3 mb-1" />

              {/* Header */}
              <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={20} color="#4B5563" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 text-center flex-1 pr-9">
                  Type
                </Text>
              </View>

              {/* Search Bar */}
              <View className="px-4 py-3 border-b border-gray-100 bg-white">
                <View className="flex-row items-center bg-gray-100/90 rounded-2xl px-3.5 py-2.5">
                  <Ionicons name="search" size={20} color="#9CA3AF" />
                  <TextInput
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="ml-2.5 flex-1 text-base text-gray-900 font-medium py-0"
                    placeholderTextColor="#9CA3AF"
                    autoCorrect={false}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                      <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Scrollable Type Items */}
              <ScrollView
                className="flex-1 px-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
              >
                {filteredTypes.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSelectType(item.id)}
                    className="flex-row items-center py-3.5 border-b border-gray-100"
                    activeOpacity={0.7}
                  >
                    <View className="w-11 h-11 rounded-full bg-gray-50 overflow-hidden items-center justify-center p-1 border border-gray-100">
                      <Image
                        source={item.image}
                        className="w-9 h-9"
                        resizeMode="contain"
                      />
                    </View>
                    <Text className="ml-3.5 text-[15px] font-medium text-gray-900 flex-1 leading-5">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}

                {filteredTypes.length === 0 && (
                  <View className="py-12 items-center justify-center">
                    <Text className="text-gray-400 text-sm font-medium">
                      No types found
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default TypeSelector;
