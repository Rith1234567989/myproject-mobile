import SafeAreaView from "@/components/common/SafeAreaView";
import {
  getCommunesForDistrict,
  getDistrictsForProvince,
} from "@/constants/data/districts";
import { PROVINCES } from "@/constants/data/locations";
import { getFiltersForCategory } from "@/constants/data/filters";
import { Province } from "@/types/location";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useMemo } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface DropdownOption {
  id: string;
  name: string;
}

// Sort options
const SORT_OPTIONS: DropdownOption[] = [
  { id: "latest", name: "Latest Ads" },
  { id: "oldest", name: "Oldest Ads" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
];

const DATE_OPTIONS: DropdownOption[] = [
  { id: "any", name: "Any Time" },
  { id: "today", name: "Today" },
  { id: "week", name: "This Week" },
  { id: "month", name: "This Month" },
];

const CONDITION_OPTIONS: DropdownOption[] = [
  { id: "new", name: "New" },
  { id: "used", name: "Used" },
];

const STORAGE_OPTIONS: DropdownOption[] = [
  { id: "64gb", name: "64GB" },
  { id: "128gb", name: "128GB" },
  { id: "256gb", name: "256GB" },
  { id: "512gb", name: "512GB" },
  { id: "1tb", name: "1TB" },
];

const PROPERTY_TYPE_OPTIONS: DropdownOption[] = [
  { id: "villa", name: "Villa" },
  { id: "apartment", name: "Apartment" },
  { id: "house", name: "House" },
  { id: "land", name: "Land" },
  { id: "condo", name: "Condo" },
];

const EXPERIENCE_OPTIONS: DropdownOption[] = [
  { id: "no-exp", name: "< 1 year" },
  { id: "1-2", name: "1-2 years" },
  { id: "2-3", name: "2-3 years" },
  { id: "3-5", name: "3-5 years" },
  { id: "5-plus", name: "5+ years" },
];

// Simple dropdown component that opens a selection modal
const SimpleDropdown = ({
  label,
  value,
  placeholder,
  options,
  onSelect,
  disabled = false,
}: {
  label?: string;
  value?: string;
  placeholder: string;
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  disabled?: boolean;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => !disabled && setVisible(true)}
        disabled={disabled}
        className={`flex-row items-center justify-between rounded-lg border border-gray-200 px-4 py-3 ${disabled ? "bg-gray-100" : "bg-white"
          }`}
      >
        <View>
          {label && <Text className="text-xs text-gray-400">{label}</Text>}
          <Text
            className={`text-base ${value ? "text-gray-900" : "text-gray-400"}`}
          >
            {value || placeholder}
          </Text>
        </View>
        <Ionicons
          name="chevron-down"
          size={20}
          color={disabled ? "#D1D5DB" : "#6B7280"}
        />
      </TouchableOpacity>

      {/* Selection Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setVisible(false)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full max-h-[60%] rounded-t-3xl bg-white pb-8"
          >
            <View className="items-center py-4">
              <View className="h-1.5 w-12 rounded-full bg-gray-300" />
            </View>
            <Text className="px-4 pb-4 text-center text-lg font-bold text-gray-900 border-b border-gray-100">
              {placeholder}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => {
                    onSelect(option);
                    setVisible(false);
                  }}
                  activeOpacity={0.7}
                  className="border-b border-gray-100 px-4 py-4 flex-row justify-between items-center"
                >
                  <Text
                    className={`text-base ${value === option.name ? "text-blue-500 font-bold" : "text-gray-900"}`}
                  >
                    {option.name}
                  </Text>
                  {value === option.name && (
                    <Ionicons name="checkmark" size={20} color="#3b82f6" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default function FiltersScreen() {
  const params = useLocalSearchParams();
  const categoryId = params.categoryId as string;
  const subCategoryId = params.subCategoryId as string;

  const [sort, setSort] = useState<string>((params.sort as string) || "");
  const [dateRange, setDateRange] = useState<string>((params.dateRange as string) || "");
  const [province, setProvince] = useState<Province | undefined>(
    params.provinceId ? PROVINCES.find(p => p.id === params.provinceId) : undefined
  );
  const [district, setDistrict] = useState<DropdownOption | undefined>(
    params.districtId ? { id: params.districtId as string, name: params.districtName as string } : undefined
  );
  const [commune, setCommune] = useState<DropdownOption | undefined>(
    params.communeId ? { id: params.communeId as string, name: params.communeName as string } : undefined
  );
  const [minPrice, setMinPrice] = useState((params.minPrice as string) || "");
  const [maxPrice, setMaxPrice] = useState((params.maxPrice as string) || "");
  const [year, setYear] = useState((params.year as string) || "");
  const [condition, setCondition] = useState((params.condition as string) || "");
  const [storage, setStorage] = useState((params.storage as string) || "");
  const [size, setSize] = useState((params.size as string) || "");
  const [type, setType] = useState((params.type as string) || "");
  const [salary, setSalary] = useState((params.salary as string) || "");
  const [experience, setExperience] = useState((params.experience as string) || "");

  const activeFilters = useMemo(() => getFiltersForCategory(categoryId, subCategoryId), [categoryId, subCategoryId]);

  const districts = province ? getDistrictsForProvince(province.id) : [];
  const communes =
    province && district
      ? getCommunesForDistrict(province.id, district.id)
      : [];

  const handleProvinceSelect = (opt: DropdownOption) => {
    const selected = PROVINCES.find((p) => p.id === opt.id);
    setProvince(selected);
    setDistrict(undefined);
    setCommune(undefined);
  };

  const handleDistrictSelect = (opt: DropdownOption) => {
    setDistrict(opt);
    setCommune(undefined);
  };

  const handleApply = () => {
    const filterParams: any = {
      sort,
      dateRange,
      provinceId: province?.id,
      provinceName: province?.name,
      districtId: district?.id,
      districtName: district?.name,
      communeId: commune?.id,
      communeName: commune?.name,
      minPrice,
      maxPrice,
      year,
      condition,
      storage,
      size,
      type,
      salary,
      experience,
    };

    // Remove undefined/empty values
    Object.keys(filterParams).forEach(key => {
      if (!filterParams[key]) delete filterParams[key];
    });

    // Navigate back with params
    router.replace({
      pathname: `/(categories)/${categoryId}${subCategoryId ? `/${subCategoryId}` : ""}`,
      params: { ...filterParams }
    } as any);
  };

  const handleClear = () => {
    setSort("");
    setDateRange("");
    setProvince(undefined);
    setDistrict(undefined);
    setCommune(undefined);
    setMinPrice("");
    setMaxPrice("");
    setYear("");
    setCondition("");
    setStorage("");
    setSize("");
    setType("");
    setSalary("");
    setExperience("");
  };

  const provinceOptions = PROVINCES.map((p) => ({ id: p.id, name: p.name }));
  const districtOptions = districts.map((d) => ({ id: d.id, name: d.name }));
  const communeOptions = communes.map((c) => ({ id: c.id, name: c.name }));

  const isVisible = (label: string) => {
    if (!activeFilters) return true; // Show all if no config (default behavior)
    return activeFilters.some(f => f.label.toLowerCase() === label.toLowerCase());
  };

  return (
    <SafeAreaView statusBarColor="#0EA5E9" statusBarStyle="light-content">
      {/* Header */}
      <View className="flex-row items-center justify-between bg-[#0EA5E9] px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-white">Filters</Text>
        <TouchableOpacity onPress={handleClear}>
          <Text className="text-base font-medium text-white">Clear All</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <ScrollView
          className="flex-1 px-4 pt-4"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Sort */}
          {isVisible("Sort") && (
            <View className="mb-4">
              <SimpleDropdown
                label="Sort"
                value={sort}
                placeholder="Sort"
                options={SORT_OPTIONS}
                onSelect={(opt) => setSort(opt.name)}
              />
            </View>
          )}

          {/* Date Range */}
          {isVisible("Date Range") && (
            <View className="mb-4">
              <SimpleDropdown
                label="Date Range"
                value={dateRange}
                placeholder="Date Range"
                options={DATE_OPTIONS}
                onSelect={(opt) => setDateRange(opt.name)}
              />
            </View>
          )}

          {/* Location */}
          {isVisible("Location") && (
            <>
              <View className="mb-4">
                <SimpleDropdown
                  label="Province"
                  value={province?.name}
                  placeholder="Select Province"
                  options={provinceOptions}
                  onSelect={handleProvinceSelect}
                />
              </View>

              {province && (
                <View className="mb-4">
                  <SimpleDropdown
                    label="District"
                    value={district?.name}
                    placeholder="Select District"
                    options={districtOptions}
                    onSelect={handleDistrictSelect}
                  />
                </View>
              )}

              {district && (
                <View className="mb-4">
                  <SimpleDropdown
                    label="Commune"
                    value={commune?.name}
                    placeholder="Select Commune"
                    options={communeOptions}
                    onSelect={(opt) => setCommune(opt)}
                  />
                </View>
              )}
            </>
          )}

          {/* Price Range */}
          {isVisible("Price") && (
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">
                Price Range
              </Text>
              <View className="flex-row gap-2">
                <TextInput
                  placeholder="Min"
                  value={minPrice}
                  onChangeText={setMinPrice}
                  keyboardType="numeric"
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-base"
                />
                <TextInput
                  placeholder="Max"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                  keyboardType="numeric"
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-base"
                />
              </View>
            </View>
          )}

          {/* Year */}
          {isVisible("Year") && (
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Year</Text>
              <TextInput
                placeholder="e.g., 2024"
                value={year}
                onChangeText={setYear}
                keyboardType="numeric"
                className="rounded-lg border border-gray-200 px-4 py-3 text-base"
              />
            </View>
          )}

          {/* Condition */}
          {(isVisible("Condition") || isVisible("Condition/Status")) && (
            <View className="mb-4">
              <SimpleDropdown
                label="Condition"
                value={condition}
                placeholder="Select Condition"
                options={CONDITION_OPTIONS}
                onSelect={(opt) => setCondition(opt.name)}
              />
            </View>
          )}

          {/* Storage */}
          {isVisible("Storage") && (
            <View className="mb-4">
              <SimpleDropdown
                label="Storage"
                value={storage}
                placeholder="Select Storage"
                options={STORAGE_OPTIONS}
                onSelect={(opt) => setStorage(opt.name)}
              />
            </View>
          )}

          {/* Size */}
          {isVisible("Size") && (
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Size</Text>
              <TextInput
                placeholder="e.g., 100m²"
                value={size}
                onChangeText={setSize}
                className="rounded-lg border border-gray-200 px-4 py-3 text-base"
              />
            </View>
          )}

          {/* Type */}
          {isVisible("Type") && (
            <View className="mb-4">
              <SimpleDropdown
                label="Type"
                value={type}
                placeholder="Select Type"
                options={PROPERTY_TYPE_OPTIONS}
                onSelect={(opt) => setType(opt.name)}
              />
            </View>
          )}

          {/* Salary */}
          {isVisible("Salary") && (
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Salary</Text>
              <TextInput
                placeholder="e.g., $500-$1000"
                value={salary}
                onChangeText={setSalary}
                keyboardType="numeric"
                className="rounded-lg border border-gray-200 px-4 py-3 text-base"
              />
            </View>
          )}

          {/* Experience */}
          {isVisible("Experience") && (
            <View className="mb-4">
              <SimpleDropdown
                label="Experience"
                value={experience}
                placeholder="Select Experience"
                options={EXPERIENCE_OPTIONS}
                onSelect={(opt) => setExperience(opt.name)}
              />
            </View>
          )}
        </ScrollView>

        {/* Sticky Footer */}
        <View className="border-t border-gray-100 bg-white p-4">
          <TouchableOpacity
            onPress={handleApply}
            className="rounded-xl bg-[#0EA5E9] py-4 items-center justify-center shadow-lg"
          >
            <Text className="text-lg font-bold text-white">Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
