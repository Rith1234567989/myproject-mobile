import { useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

export interface JobTypeItem {
  id: string;
  labelKey: string;
  defaultLabel: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  image?: ImageSourcePropType;
  outerBgClass: string;
  innerBgClass: string;
  iconSize?: number;
}

export const JOB_TYPES: JobTypeItem[] = [
  {
    id: "full-time",
    labelKey: "fullTime",
    defaultLabel: "Full-time",
    image: require("@/assets/images/jobtype/full-time.png"),
    outerBgClass: "bg-red-50 border border-red-100",
    innerBgClass: "bg-red-500",
    iconSize: 15,
  },
  {
    id: "part-time",
    labelKey: "partTime",
    defaultLabel: "Part-time",
    image: require("@/assets/images/jobtype/part-time.png"),
    outerBgClass: "bg-sky-50 border border-sky-100",
    innerBgClass: "bg-sky-100/60 border border-sky-300",
    iconSize: 17,
  },
  {
    id: "internship",
    labelKey: "internship",
    defaultLabel: "Internship",
    image: require("@/assets/images/jobtype/internships.png"),
    outerBgClass: "bg-purple-50 border border-purple-100",
    innerBgClass: "bg-purple-100/60 border border-purple-300",
    iconSize: 17,
  },
  {
    id: "freelance",
    labelKey: "freelance",
    defaultLabel: "Freelance",
    image: require("@/assets/images/jobtype/freelance.png"),
    outerBgClass: "bg-pink-50 border border-pink-100",
    innerBgClass: "bg-pink-100/60 border border-pink-300",
    iconSize: 17,
  },
  {
    id: "show-more",
    labelKey: "showMore",
    defaultLabel: "Show More",
    image: require("@/assets/images/jobtype/other-jobs.png"),
    outerBgClass: "bg-gray-100 border border-gray-200",
    innerBgClass: "bg-gray-200/60 border border-gray-300",
    iconSize: 17,
  },
];

export interface JobTypeQuickFilterProps {
  onSelectType?: (typeId: string) => void;
  selectedTypeId?: string;
}

export default function JobTypeQuickFilter({
  onSelectType,
  selectedTypeId,
}: JobTypeQuickFilterProps) {
  const { t } = useLanguage();

  return (
    <View className="flex-row items-center justify-between px-2 pt-3 pb-1 bg-white">
      {JOB_TYPES.map((item) => {
        const isSelected = selectedTypeId === item.id;
        const label = t(item.labelKey) || item.defaultLabel;

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onSelectType?.(item.id)}
            className="items-center w-[18%]"
            activeOpacity={0.7}
          >
            {/* Outer Circle Halo Container */}
            <View
              className={`w-12 h-12 rounded-full items-center justify-center mb-1 ${item.outerBgClass} ${isSelected ? "ring-2 ring-sky-500" : ""
                }`}
            >
              {/* Inner Circle Badge */}
              <View className={`w-7 h-7 rounded-full items-center justify-center ${item.innerBgClass}`}>
                {item.image ? (
                  <Image
                    source={item.image}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                ) : item.icon ? (
                  <Ionicons
                    name={item.icon}
                    size={item.iconSize || 16}
                    color={item.iconColor}
                  />
                ) : null}
              </View>
            </View>

            {/* Label */}
            <Text
              className="text-[11px] font-semibold text-gray-800 text-center leading-3.5"
              numberOfLines={2}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

