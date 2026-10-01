import { LANGUAGES, useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

interface NavBarProps {
  onThemeToggle?: () => void;
  onLanguageChange?: () => void;
  onQRCodePress?: () => void;
  onSearchPress?: () => void;
  logoSource?: ImageSourcePropType;
}

const NavBar: React.FC<NavBarProps> = ({
  onThemeToggle,
  onLanguageChange,
  onQRCodePress,
  onSearchPress,
  logoSource,
}) => {
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? "#E5E7EB" : "#374151";
  const { language, setLanguage, currentLanguageObj, t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      className="bg-white dark:bg-gray-900 px-4 h-16 flex-row items-center justify-between border-b border-gray-100 dark:border-gray-800"
      style={{
        elevation: 3,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      }}
    >
      {/* Brand Text Logo with modern badge element */}
      <View className="flex-row items-center">
        <Text className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          psa
        </Text>
        <View className="ml-1 px-2 py-0.5 bg-sky-500 rounded-lg justify-center items-center shadow-xs">
          <Text className="text-sm font-black text-white italic leading-none">
            khmer
          </Text>
        </View>
      </View>

      {/* Header Actions */}
      <View className="flex-row items-center gap-2.5">
        {/* Language Flag Selector Pill */}
        <TouchableOpacity
          className="flex-row items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-2.5 py-1.5 rounded-full border border-gray-200/80 dark:border-gray-700 shadow-2xs"
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <View className="w-5 h-5 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 items-center justify-center">
            <Image
              source={currentLanguageObj.flag}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">
            {currentLanguageObj.code}
          </Text>
          <Ionicons name="chevron-down" size={12} color="#6B7280" />
        </TouchableOpacity>

        {/* QR Code Action Button */}
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 items-center justify-center border border-gray-200/60 dark:border-gray-700/60" 
          onPress={onQRCodePress}
          activeOpacity={0.7}
        >
          <Ionicons name="qr-code-outline" size={20} color={iconColor} />
        </TouchableOpacity>

        {/* Search Action Button */}
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-950/40 items-center justify-center border border-sky-100 dark:border-sky-900/60" 
          onPress={onSearchPress}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={20} color="#0EA5E9" />
        </TouchableOpacity>
      </View>

      {/* Change Language Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/60 justify-end"
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-t-3xl pt-3 pb-8 px-5 shadow-2xl border-t border-gray-100 dark:border-gray-800"
          >
            {/* Grab Bar */}
            <View className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4" />

            {/* Header Row */}
            <View className="flex-row items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-2">
              <Text className="text-lg font-bold text-gray-900 dark:text-white">
                {t("selectLanguage") || "Change Language"}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center"
              >
                <Ionicons name="close" size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Language List */}
            <View className="py-1">
              {LANGUAGES.map((lang, index) => {
                const isSelected = language === lang.code;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    onPress={() => {
                      setLanguage(lang.code);
                      setModalVisible(false);
                      onLanguageChange?.();
                    }}
                    className={`flex-row items-center justify-between py-3.5 px-3 rounded-xl mb-1 ${
                      isSelected
                        ? "bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800"
                        : "bg-transparent"
                    }`}
                    activeOpacity={0.7}
                  >
                    {/* Left Flag + Name */}
                    <View className="flex-row items-center gap-3">
                      <View className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 items-center justify-center shadow-2xs">
                        <Image
                          source={lang.flag}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      </View>
                      <View>
                        <Text
                          className={`text-base ${
                            isSelected
                              ? "text-sky-600 font-bold dark:text-sky-400"
                              : "text-gray-900 font-medium dark:text-gray-100"
                          }`}
                        >
                          {lang.nativeName}
                        </Text>
                        <Text className="text-xs text-gray-400">
                          {lang.name}
                        </Text>
                      </View>
                    </View>

                    {/* Right Checkmark or Radio */}
                    <View
                      className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                        isSelected
                          ? "border-sky-500 bg-sky-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {isSelected && (
                        <Ionicons name="checkmark" size={14} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default NavBar;
