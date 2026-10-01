import SafeAreaView from "@/components/common/SafeAreaView";
import { Colors } from "@/constants/Colors";
import { CATEGORIES } from "@/constants/data/categories";
import { SAMPLE_PRODUCTS } from "@/constants/data/products";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CAMBODIA_PROVINCES = [
  "Phnom Penh",
  "Siem Reap",
  "Battambang",
  "Preah Sihanouk (Kampong Som)",
  "Kampot",
  "Kandal",
  "Kampong Cham",
  "Takeo",
  "Kampong Speu",
  "Svay Rieng",
  "Prey Veng",
  "Banteay Meanchey",
  "Pursat",
  "Kratie",
  "Stung Treng",
];

const CONDITIONS = [
  { id: "new", label: "New (100%)", tag: "NEW" },
  { id: "like_new", label: "Used - Like New (99%)", tag: "99%" },
  { id: "good", label: "Used - Good (90%+)", tag: "90%" },
  { id: "fair", label: "Used - Fair", tag: "FAIR" },
];

const JOB_TYPES = [
  { id: "Full-time", label: "Full-time (ពេញម៉ោង)" },
  { id: "Part-time", label: "Part-time (ក្រៅម៉ោង)" },
  { id: "Contract", label: "Contract (កិច្ចសន្យា)" },
  { id: "Internship", label: "Internship (ហាត់ការ)" },
  { id: "Remote", label: "Remote (ធ្វើការពីផ្ទះ)" },
];

const EXPERIENCE_LEVELS = [
  { id: "No experience", label: "No experience (គ្មានបទពិសោធន៍)" },
  { id: "1Year+ Experience", label: "1 Year+ (១ ឆ្នាំឡើង)" },
  { id: "2Year+ Experience", label: "2 Years+ (២ ឆ្នាំឡើង)" },
  { id: "3-5 Years", label: "3-5 Years (៣-៥ ឆ្នាំ)" },
  { id: "Senior / Executive", label: "Senior / Executive (ថ្នាក់ដឹកនាំ)" },
];

const SAMPLE_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800",
  "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800",
];

const EditProductScreen = () => {
  const { id } = useLocalSearchParams();
  const existingProduct = SAMPLE_PRODUCTS.find((p) => p.id === id) || SAMPLE_PRODUCTS[0];

  // Form State initialized with product data
  const initialImages = existingProduct.images
    ? [existingProduct.image, ...existingProduct.images].filter((img): img is string => !!img)
    : existingProduct.image
      ? [existingProduct.image]
      : [SAMPLE_IMAGE_POOL[0]];

  const initialCategory =
    CATEGORIES.find(
      (c) =>
        c.name.toLowerCase() === (existingProduct.mainCategory || "").toLowerCase() ||
        (c.id === "jobs" && (existingProduct.mainCategory === "Jobs" || !!existingProduct.jobType))
    ) || CATEGORIES[0];

  const [images, setImages] = useState<string[]>(initialImages);
  const [selectedMainCat, setSelectedMainCat] = useState<any>(initialCategory);
  const [selectedSubCat, setSelectedSubCat] = useState<any>(
    initialCategory?.subs?.find(
      (s: any) => s.name.toLowerCase() === (existingProduct.category || "").toLowerCase()
    ) || initialCategory?.subs?.[0] || null
  );
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [title, setTitle] = useState(existingProduct.title);
  const [price, setPrice] = useState(existingProduct.price ? existingProduct.price.toString() : "0");
  const [currency, setCurrency] = useState<"USD" | "KHR">("USD");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [isFree, setIsFree] = useState(existingProduct.price === 0);
  const [isSold, setIsSold] = useState(false);

  const [condition, setCondition] = useState("like_new");
  const [jobType, setJobType] = useState<string>(existingProduct.jobType || "Full-time");
  const [experienceLevel, setExperienceLevel] = useState<string>(
    existingProduct.experienceLevel || "2Year+ Experience"
  );

  const isJob =
    selectedMainCat?.id === "jobs" ||
    selectedMainCat?.name === "Jobs" ||
    existingProduct.mainCategory === "Jobs" ||
    !!existingProduct.jobType;

  const [province, setProvince] = useState(existingProduct.location || "Phnom Penh");
  const [district, setDistrict] = useState("Toul Kork");
  const [commune, setCommune] = useState("Boeung Kak 1");
  const [provinceModalVisible, setProvinceModalVisible] = useState(false);

  const [phones, setPhones] = useState<string[]>(
    existingProduct.phones && existingProduct.phones.length > 0
      ? existingProduct.phones
      : ["012 345 678"]
  );
  const [telegram, setTelegram] = useState(
    existingProduct.telegram?.[0] || "@seller_khmer24"
  );
  const [description, setDescription] = useState(
    existingProduct.description || "Good condition, smooth user experience."
  );

  // Handlers
  const handleAddPhoto = () => {
    if (images.length >= 10) {
      Alert.alert("Limit Reached", "You can upload a maximum of 10 photos.");
      return;
    }
    const nextImg = SAMPLE_IMAGE_POOL[images.length % SAMPLE_IMAGE_POOL.length];
    setImages([...images, nextImg]);
  };

  const handleRemovePhoto = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddPhone = () => {
    if (phones.length < 3) {
      setPhones([...phones, ""]);
    }
  };

  const handlePhoneChange = (text: string, index: number) => {
    const updated = [...phones];
    updated[index] = text;
    setPhones(updated);
  };

  const handleRemovePhone = (index: number) => {
    if (phones.length > 1) {
      setPhones(phones.filter((_, i) => i !== index));
    }
  };

  const handleSaveChanges = () => {
    if (!title.trim()) {
      Alert.alert("Required", "Please enter a title for your ad.");
      return;
    }

    Alert.alert(
      "Updated Successfully!",
      "Your changes to this listing have been saved.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleDeleteListing = () => {
    Alert.alert(
      "Delete Listing?",
      "Are you sure you want to permanently delete this ad from Khmer24?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert("Deleted", "Your listing has been removed.");
            router.push("/(tabs)");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="bg-neutral-surface flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Khmer24 Header */}
      <View className="flex-row items-center justify-between border-b border-neutral-border bg-white px-4 py-3 shadow-sm">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <Ionicons name="arrow-back" size={22} color={Colors.text.primary} />
          <Text className="ml-1 text-sm font-medium text-neutral-text-main">Back</Text>
        </TouchableOpacity>

        <Text className="text-base font-bold text-neutral-text-main">
          Edit Listing (កែប្រែទំនិញ)
        </Text>

        <TouchableOpacity
          onPress={handleSaveChanges}
          className="rounded-full bg-primary px-4 py-1.5"
        >
          <Text className="text-xs font-bold text-white">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 bg-neutral-background"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Listing Status Control Banner */}
        <View className="mb-2 bg-white p-4 flex-row items-center justify-between border-b border-neutral-border">
          <View>
            <Text className="text-sm font-bold text-neutral-text-main">
              Listing Status: {isSold ? "Marked as SOLD" : "ACTIVE"}
            </Text>
            <Text className="text-xs text-neutral-text-sub">
              {isSold ? "This ad will not appear in search results" : "Visible to all buyers on Khmer24"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsSold(!isSold)}
            className={`px-3 py-1.5 rounded-lg border ${
              isSold
                ? "bg-neutral-background border-neutral-border"
                : "bg-emerald-50 border-emerald-500"
            }`}
          >
            <Text className={`text-xs font-bold ${isSold ? "text-neutral-text-sub" : "text-emerald-700"}`}>
              {isSold ? "Re-activate" : "Mark as Sold"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 1. Photos Section */}
        <View className="mb-2 bg-white p-4">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="camera" size={20} color={Colors.primary.DEFAULT} />
              <Text className="ml-2 text-base font-bold text-neutral-text-main">
                Listing Photos
              </Text>
            </View>
            <Text className="text-xs font-medium text-neutral-text-sub">
              {images.length}/10 Photos
            </Text>
          </View>

          {/* Photo Grid */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3 py-1">
              <TouchableOpacity
                onPress={handleAddPhoto}
                className="h-24 w-24 items-center justify-center rounded-xl border-2 border-dashed border-primary/50 bg-primary/5"
              >
                <Ionicons name="add-circle" size={32} color={Colors.primary.DEFAULT} />
                <Text className="mt-1 text-[11px] font-semibold text-primary">
                  Add Photo
                </Text>
              </TouchableOpacity>

              {images.map((imgUri, index) => (
                <View key={index} className="relative h-24 w-24 rounded-xl overflow-hidden bg-neutral-border">
                  <Image source={{ uri: imgUri }} className="h-full w-full" resizeMode="cover" />
                  
                  {index === 0 && (
                    <View className="absolute bottom-0 left-0 right-0 bg-primary/90 py-0.5 items-center">
                      <Text className="text-[9px] font-bold text-white uppercase tracking-wider">
                        Cover Photo
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={() => handleRemovePhoto(index)}
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 items-center justify-center"
                  >
                    <Ionicons name="close" size={14} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 2. Category */}
        <View className="mb-2 bg-white p-4">
          <Text className="mb-2 text-xs font-semibold text-neutral-text-sub uppercase tracking-wider">
            Category
          </Text>
          <TouchableOpacity
            onPress={() => setCategoryModalVisible(true)}
            className="flex-row items-center justify-between rounded-xl border border-neutral-border bg-neutral-background px-4 py-3"
          >
            <View className="flex-row items-center flex-1">
              <View className="h-9 w-9 rounded-lg bg-primary/10 items-center justify-center mr-3">
                <Ionicons name="grid" size={20} color={Colors.primary.DEFAULT} />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-neutral-text-main" numberOfLines={1}>
                  {selectedMainCat?.name || "Select Category"}
                </Text>
                {selectedSubCat && (
                  <Text className="text-xs text-neutral-text-sub" numberOfLines={1}>
                    {selectedSubCat.name}
                  </Text>
                )}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.text.muted} />
          </TouchableOpacity>
        </View>

        {/* 3. Title & Price / Salary */}
        <View className="mb-2 bg-white p-4 gap-4">
          <View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs font-semibold text-neutral-text-sub uppercase tracking-wider">
                {isJob ? "Job Position Title *" : "Ad Title *"}
              </Text>
              <Text className="text-xs text-neutral-text-muted">
                {title.length}/100
              </Text>
            </View>
            <TextInput
              value={title}
              onChangeText={setTitle}
              maxLength={100}
              placeholder={isJob ? "e.g. Nail Salon Technician / Cashier" : "e.g. iPhone 15 Pro Max"}
              placeholderTextColor={Colors.text.muted}
              className="rounded-xl border border-neutral-border px-4 py-3 text-sm text-neutral-text-main bg-white"
            />
          </View>

          <View>
            <Text className="mb-2 text-xs font-semibold text-neutral-text-sub uppercase tracking-wider">
              {isJob ? "Monthly Salary / Compensation *" : "Price *"}
            </Text>

            <View className="flex-row items-center gap-3 mb-3">
              <View className="flex-row rounded-xl border border-neutral-border bg-neutral-background p-1">
                <TouchableOpacity
                  onPress={() => setCurrency("USD")}
                  className={`px-3 py-1.5 rounded-lg ${currency === "USD" ? "bg-primary" : ""}`}
                >
                  <Text className={`text-xs font-bold ${currency === "USD" ? "text-white" : "text-neutral-text-sub"}`}>
                    $ USD
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCurrency("KHR")}
                  className={`px-3 py-1.5 rounded-lg ${currency === "KHR" ? "bg-primary" : ""}`}
                >
                  <Text className={`text-xs font-bold ${currency === "KHR" ? "text-white" : "text-neutral-text-sub"}`}>
                    ៛ KHR
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-1 relative">
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  editable={!isFree}
                  placeholder={isFree ? "Negotiable / Unpaid" : isJob ? "e.g. 250" : "0.00"}
                  placeholderTextColor={Colors.text.muted}
                  className="rounded-xl border border-neutral-border px-4 py-3 text-base font-bold text-danger bg-white"
                />
              </View>
            </View>

            <View className="flex-row gap-6">
              <TouchableOpacity
                onPress={() => setIsNegotiable(!isNegotiable)}
                className="flex-row items-center"
              >
                <View className={`h-5 w-5 rounded border items-center justify-center mr-2 ${isNegotiable ? "bg-primary border-primary" : "border-neutral-border bg-white"}`}>
                  {isNegotiable && <Ionicons name="checkmark" size={14} color="white" />}
                </View>
                <Text className="text-xs font-medium text-neutral-text-main">
                  {isJob ? "Salary Negotiable (តម្លៃចរចា)" : "Negotiable (តម្លៃចរចា)"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsFree(!isFree);
                  if (!isFree) setPrice("0");
                }}
                className="flex-row items-center"
              >
                <View className={`h-5 w-5 rounded border items-center justify-center mr-2 ${isFree ? "bg-emerald-500 border-emerald-500" : "border-neutral-border bg-white"}`}>
                  {isFree && <Ionicons name="checkmark" size={14} color="white" />}
                </View>
                <Text className="text-xs font-medium text-neutral-text-main">
                  {isJob ? "Unpaid / Volunteer" : "Giveaway / Free"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 4. Condition or Job Specifications */}
        {isJob ? (
          <View className="mb-2 bg-white p-4 gap-4">
            <View>
              <Text className="mb-2 text-xs font-semibold text-neutral-text-sub uppercase tracking-wider">
                Job Employment Type
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {JOB_TYPES.map((jt) => {
                  const isSelected = jobType === jt.id;
                  return (
                    <TouchableOpacity
                      key={jt.id}
                      onPress={() => setJobType(jt.id)}
                      className={`flex-row items-center rounded-xl px-3 py-2 border ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-neutral-border bg-neutral-background"
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          isSelected ? "text-primary" : "text-neutral-text-sub"
                        }`}
                      >
                        {jt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View>
              <Text className="mb-2 text-xs font-semibold text-neutral-text-sub uppercase tracking-wider">
                Required Experience Level
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {EXPERIENCE_LEVELS.map((exp) => {
                  const isSelected = experienceLevel === exp.id;
                  return (
                    <TouchableOpacity
                      key={exp.id}
                      onPress={() => setExperienceLevel(exp.id)}
                      className={`flex-row items-center rounded-xl px-3 py-2 border ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-neutral-border bg-neutral-background"
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          isSelected ? "text-primary" : "text-neutral-text-sub"
                        }`}
                      >
                        {exp.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        ) : (
          <View className="mb-2 bg-white p-4 gap-4">
            <Text className="text-xs font-semibold text-neutral-text-sub uppercase tracking-wider">
              Item Condition
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {CONDITIONS.map((cond) => {
                const isSelected = condition === cond.id;
                return (
                  <TouchableOpacity
                    key={cond.id}
                    onPress={() => setCondition(cond.id)}
                    className={`flex-row items-center rounded-xl px-3 py-2 border ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-neutral-border bg-neutral-background"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        isSelected ? "text-primary" : "text-neutral-text-sub"
                      }`}
                    >
                      {cond.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* 5. Location */}
        <View className="mb-2 bg-white p-4 gap-3">
          <Text className="text-xs font-semibold text-neutral-text-sub uppercase tracking-wider">
            Item Location
          </Text>

          <TouchableOpacity
            onPress={() => setProvinceModalVisible(true)}
            className="flex-row items-center justify-between rounded-xl border border-neutral-border px-4 py-3 bg-neutral-background"
          >
            <View className="flex-row items-center">
              <Ionicons name="location-sharp" size={18} color={Colors.danger} />
              <Text className="ml-2 text-sm font-bold text-neutral-text-main">
                {province}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={16} color={Colors.text.muted} />
          </TouchableOpacity>

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-1 text-xs font-medium text-neutral-text-sub">District</Text>
              <TextInput
                value={district}
                onChangeText={setDistrict}
                className="rounded-xl border border-neutral-border px-3 py-2.5 text-xs text-neutral-text-main bg-white"
              />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-xs font-medium text-neutral-text-sub">Commune</Text>
              <TextInput
                value={commune}
                onChangeText={setCommune}
                className="rounded-xl border border-neutral-border px-3 py-2.5 text-xs text-neutral-text-main bg-white"
              />
            </View>
          </View>
        </View>

        {/* 6. Contact Info */}
        <View className="mb-2 bg-white p-4 gap-4">
          <Text className="text-xs font-semibold text-neutral-text-sub uppercase tracking-wider">
            Seller Contact Info
          </Text>

          {phones.map((phone, idx) => (
            <View key={idx} className="flex-row items-center gap-2">
              <View className="h-10 w-10 rounded-xl bg-orange-500 items-center justify-center">
                <Ionicons name="call" size={18} color="white" />
              </View>
              <TextInput
                value={phone}
                onChangeText={(t) => handlePhoneChange(t, idx)}
                keyboardType="phone-pad"
                className="flex-1 rounded-xl border border-neutral-border px-4 py-2.5 text-sm font-semibold text-neutral-text-main bg-white"
              />
              {phones.length > 1 && (
                <TouchableOpacity onPress={() => handleRemovePhone(idx)}>
                  <Ionicons name="trash-outline" size={18} color={Colors.danger} />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {phones.length < 3 && (
            <TouchableOpacity
              onPress={handleAddPhone}
              className="flex-row items-center justify-center py-2 border border-dashed border-primary rounded-xl bg-primary/5"
            >
              <Ionicons name="add" size={16} color={Colors.primary.DEFAULT} />
              <Text className="ml-1 text-xs font-bold text-primary">
                Add Secondary Phone Number
              </Text>
            </TouchableOpacity>
          )}

          <View className="flex-row items-center gap-2">
            <View className="h-10 w-10 rounded-xl bg-sky-500 items-center justify-center">
              <Ionicons name="paper-plane" size={18} color="white" />
            </View>
            <TextInput
              value={telegram}
              onChangeText={setTelegram}
              className="flex-1 rounded-xl border border-neutral-border px-4 py-2.5 text-sm font-semibold text-neutral-text-main bg-white"
            />
          </View>
        </View>

        {/* 7. Description */}
        <View className="mb-4 bg-white p-4">
          <Text className="mb-2 text-xs font-semibold text-neutral-text-sub uppercase tracking-wider">
            Detailed Description
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            className="h-32 rounded-xl border border-neutral-border p-3 text-sm text-neutral-text-main bg-white"
          />
        </View>

        {/* Delete Button Area */}
        <View className="p-4">
          <TouchableOpacity
            onPress={handleDeleteListing}
            className="flex-row items-center justify-center rounded-xl bg-red-50 border border-red-200 py-3"
          >
            <Ionicons name="trash" size={18} color={Colors.danger} />
            <Text className="ml-2 font-bold text-danger">Delete This Listing</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Bottom Save Action Bar */}
      <View className="border-t border-neutral-border bg-white px-4 py-3 shadow-lg">
        <TouchableOpacity
          onPress={handleSaveChanges}
          className="w-full items-center justify-center rounded-xl bg-primary py-3.5 shadow-md"
        >
          <Text className="text-base font-bold text-white">
            Save Changes (រក្សាទុក)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Modal */}
      <Modal
        visible={categoryModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View className="h-[80%] bg-white rounded-t-3xl p-4">
            <View className="flex-row items-center justify-between pb-3 border-b border-neutral-border">
              <Text className="text-base font-bold text-neutral-text-main">
                Select Category
              </Text>
              <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 py-2">
              {CATEGORIES.map((cat) => (
                <View key={cat.id} className="mb-2 border-b border-neutral-border/40 pb-2">
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedMainCat(cat);
                      setSelectedSubCat(cat.subs?.[0] || null);
                    }}
                    className="flex-row items-center justify-between py-2"
                  >
                    <View className="flex-row items-center">
                      <Image source={cat.image} className="h-6 w-6 mr-3" resizeMode="contain" />
                      <Text className="text-sm font-bold text-neutral-text-main">
                        {cat.name}
                      </Text>
                    </View>
                    {selectedMainCat?.id === cat.id && (
                      <Ionicons name="checkmark-circle" size={20} color={Colors.primary.DEFAULT} />
                    )}
                  </TouchableOpacity>

                  {cat.subs && (
                    <View className="ml-9 gap-1 mt-1">
                      {cat.subs.map((sub) => (
                        <TouchableOpacity
                          key={sub.id}
                          onPress={() => {
                            setSelectedMainCat(cat);
                            setSelectedSubCat(sub);
                            setCategoryModalVisible(false);
                          }}
                          className={`flex-row items-center justify-between py-2 px-3 rounded-lg ${
                            selectedSubCat?.id === sub.id ? "bg-primary/10" : ""
                          }`}
                        >
                          <Text
                            className={`text-xs font-semibold ${
                              selectedSubCat?.id === sub.id
                                ? "text-primary"
                                : "text-neutral-text-sub"
                            }`}
                          >
                            {sub.name}
                          </Text>
                          {selectedSubCat?.id === sub.id && (
                            <Ionicons name="checkmark" size={16} color={Colors.primary.DEFAULT} />
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Province Modal */}
      <Modal
        visible={provinceModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setProvinceModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View className="h-[60%] bg-white rounded-t-3xl p-4">
            <View className="flex-row items-center justify-between pb-3 border-b border-neutral-border">
              <Text className="text-base font-bold text-neutral-text-main">
                Select City / Province
              </Text>
              <TouchableOpacity onPress={() => setProvinceModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 py-2">
              {CAMBODIA_PROVINCES.map((prov) => (
                <TouchableOpacity
                  key={prov}
                  onPress={() => {
                    setProvince(prov);
                    setProvinceModalVisible(false);
                  }}
                  className="flex-row items-center justify-between py-3 border-b border-neutral-border/40 px-2"
                >
                  <Text
                    className={`text-sm font-semibold ${
                      province === prov ? "text-primary font-bold" : "text-neutral-text-main"
                    }`}
                  >
                    {prov}
                  </Text>
                  {province === prov && (
                    <Ionicons name="checkmark" size={18} color={Colors.primary.DEFAULT} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditProductScreen;
