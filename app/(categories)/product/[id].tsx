import SafeAreaView from "@/components/common/SafeAreaView";
import { Colors } from "@/constants/Colors";
import { SAMPLE_PRODUCTS } from "@/constants/data/products";
import { Ionicons } from "@expo/vector-icons";
import { setStringAsync } from "expo-clipboard";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  Share,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const product = SAMPLE_PRODUCTS.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [revealedPhones, setRevealedPhones] = useState<number[]>([]);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  if (!product) {
    return (
      <SafeAreaView className="bg-neutral-surface">
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-neutral-text-sub">Product not found</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 rounded-lg bg-primary px-6 py-2"
          >
            <Text className="font-bold text-white">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const getImageSource = (img: any) => {
    if (!img) return undefined;
    if (typeof img === "string") return { uri: img };
    return img;
  };

  const allImages = product.images
    ? [product.image, ...product.images].filter((img) => !!img)
    : product.image
      ? [product.image]
      : [];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${product.title} on Global Link!`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopyLink = async () => {
    const link = `https://globallink.com/product/${product.id}`;
    await setStringAsync(link);
    if (Platform.OS === "android") {
      ToastAndroid.show("Link copied!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Copied", "Link copied to clipboard");
    }
    setShareModalVisible(false);
  };

  const handleDownload = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Download started...", ToastAndroid.SHORT);
    } else {
      Alert.alert("Download", "Download started...");
    }
  };

  const handleContact = (type: "call" | "sms" | "telegram", value?: string) => {
    if (!value) return;
    let url = "";
    switch (type) {
      case "call":
        url = `tel:${value}`;
        break;
      case "sms":
        url = `sms:${value}`;
        break;
      case "telegram":
        url = value.startsWith("http") ? value : `https://t.me/${value}`;
        break;
    }
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err),
    );
  };

  return (
    <View className="flex-1 bg-neutral-background">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header Actions - Absolute positioned */}
      <View className="absolute left-0 right-0 top-0 z-10 flex-row justify-between px-4 pt-12">
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-full bg-black/30 p-2 backdrop-blur-md"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => router.push(`/product/edit/${product.id}`)}
            className="rounded-full bg-black/30 p-2 backdrop-blur-md"
          >
            <Ionicons name="create-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/report/[id]",
                params: { id: product.id, title: product.title },
              })
            }
            className="rounded-full bg-black/30 p-2 backdrop-blur-md"
          >
            <Ionicons name="flag-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full bg-black/30 p-2 backdrop-blur-md">
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShareModalVisible(true)}
            className="rounded-full bg-black/30 p-2 backdrop-blur-md"
          >
            <Ionicons name="share-social-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Image Carousel */}
        <View className="relative h-72 w-full bg-neutral-background">
          {allImages.length > 0 ? (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
                const slide = Math.ceil(
                  e.nativeEvent.contentOffset.x /
                  e.nativeEvent.layoutMeasurement.width,
                );
                if (slide !== activeImageIndex) setActiveImageIndex(slide);
              }}
              scrollEventThrottle={16}
            >
              {allImages.map((img, index) => (
                <Image
                  key={index}
                  source={getImageSource(img)}
                  style={{ width, height: 288 }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          ) : (
            <View className="h-full w-full items-center justify-center bg-neutral-background">
              <Ionicons
                name="image-outline"
                size={48}
                color={Colors.text.muted}
              />
              <Text className="mt-2 text-neutral-text-muted">
                No Image Available
              </Text>
            </View>
          )}

          {/* Image Dots */}
          {allImages.length > 1 && (
            <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
              {allImages.map((_, i) => (
                <View
                  key={i}
                  className={`h-2 w-2 rounded-full ${i === activeImageIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </View>
          )}

          {/* Image Badge Count */}
          {allImages.length > 0 && (
            <View className="absolute bottom-4 right-4 rounded-md bg-black/60 px-2 py-1">
              <Text className="text-xs font-medium text-white">
                {activeImageIndex + 1}/{allImages.length}
              </Text>
            </View>
          )}
        </View>

        {/* Basic Info */}
        <View className="bg-neutral-surface px-4 py-4">
          <View className="flex-row justify-between items-start">
            <Text className="flex-1 text-xl font-bold text-neutral-text-main leading-7 mr-2">
              {product.title}
            </Text>
            <TouchableOpacity
              onPress={() => router.push(`/product/edit/${product.id}`)}
              className="flex-row items-center bg-primary/10 px-3 py-1 rounded-full border border-primary/20"
            >
              <Ionicons name="create" size={14} color={Colors.primary.DEFAULT} />
              <Text className="ml-1 text-xs font-bold text-primary">Edit</Text>
            </TouchableOpacity>
          </View>

          <Text className="mt-2 text-2xl font-bold text-danger">
            ${product.price.toLocaleString()}
            {product.jobType ? "+/month" : ""}
          </Text>
          <Text className="mt-1 text-xs text-neutral-text-sub">
            {product.location} - {product.date}
          </Text>

          {/* Khmer24 Seller Management Tools */}
          <View className="mt-3 flex-row gap-2 pt-3 border-t border-neutral-border/60">
            <TouchableOpacity
              onPress={() => router.push(`/product/edit/${product.id}`)}
              className="flex-1 flex-row items-center justify-center bg-neutral-background py-2 rounded-lg border border-neutral-border"
            >
              <Ionicons name="create-outline" size={16} color={Colors.text.primary} />
              <Text className="ml-1.5 text-xs font-bold text-neutral-text-main">
                Edit Listing
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Alert.alert("Success", "Listing marked as SOLD!")}
              className="flex-1 flex-row items-center justify-center bg-neutral-background py-2 rounded-lg border border-neutral-border"
            >
              <Ionicons name="checkmark-circle-outline" size={16} color={Colors.primary.DEFAULT} />
              <Text className="ml-1.5 text-xs font-bold text-neutral-text-main">
                Mark as Sold
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Alert.alert("Bumped!", "Your ad has been renewed to top of search!")}
              className="flex-1 flex-row items-center justify-center bg-orange-50 py-2 rounded-lg border border-orange-200"
            >
              <Ionicons name="arrow-up-circle-outline" size={16} color={Colors.secondary.orange} />
              <Text className="ml-1.5 text-xs font-bold text-secondary-orange">
                Bump Ad
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description Section */}
        <View className="mt-2 bg-neutral-surface p-4">
          <Text className="mb-4 text-lg font-bold text-neutral-text-main">
            Description
          </Text>

          {/* Attributes Grid */}
          <View className="mb-6 gap-2">
            <View className="flex-row">
              <Text className="w-32 text-neutral-text-sub">ID:</Text>
              <Text className="flex-1 text-neutral-text-main">
                {product.id}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="w-32 text-neutral-text-sub">Main Category:</Text>
              <Text className="flex-1 text-primary">
                {product.mainCategory || "N/A"}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="w-32 text-neutral-text-sub">Category:</Text>
              <Text className="flex-1 text-primary">
                {product.category || "N/A"}
              </Text>
            </View>
            {product.jobType && (
              <View className="flex-row">
                <Text className="w-32 text-neutral-text-sub">Job Type:</Text>
                <Text className="flex-1 text-primary font-bold">{product.jobType}</Text>
              </View>
            )}
            {product.experienceLevel && (
              <View className="flex-row">
                <Text className="w-32 text-neutral-text-sub">Experience:</Text>
                <Text className="flex-1 text-neutral-text-main font-bold">
                  {product.experienceLevel}
                </Text>
              </View>
            )}
            {product.type && (
              <View className="flex-row">
                <Text className="w-32 text-neutral-text-sub">Type:</Text>
                <Text className="flex-1 text-primary">{product.type}</Text>
              </View>
            )}
            {product.condition && (
              <View className="flex-row">
                <Text className="w-32 text-neutral-text-sub">Condition:</Text>
                <Text className="flex-1 text-neutral-text-main">
                  {product.condition}
                </Text>
              </View>
            )}
            {product.bedrooms !== undefined && (
              <View className="flex-row">
                <Text className="w-32 text-neutral-text-sub">Bedroom:</Text>
                <Text className="flex-1 text-neutral-text-main">
                  {product.bedrooms}
                </Text>
              </View>
            )}
            {product.bathrooms !== undefined && (
              <View className="flex-row">
                <Text className="w-32 text-neutral-text-sub">Bathroom:</Text>
                <Text className="flex-1 text-neutral-text-main">
                  {product.bathrooms}
                </Text>
              </View>
            )}
            {product.facing && (
              <View className="flex-row">
                <Text className="w-32 text-neutral-text-sub">Facing:</Text>
                <Text className="flex-1 text-neutral-text-main">
                  {product.facing}
                </Text>
              </View>
            )}
            {product.size && (
              <View className="flex-row">
                <Text className="w-32 text-neutral-text-sub">Size:</Text>
                <Text className="flex-1 text-neutral-text-main">
                  {product.size}
                </Text>
              </View>
            )}
          </View>

          <View className="h-[1px] w-full bg-neutral-background mb-4" />

          <Text className="text-base leading-6 text-neutral-text-main">
            {product.description}
          </Text>
        </View>

        {/* Contact Links */}
        <View className="mt-2 bg-neutral-surface p-4">
          {product.locationUrl && (
            <View className="mb-4">
              <Text className="text-neutral-text-main mb-1">- Location:</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(product.locationUrl!)}
              >
                <Text className="text-primary underline">
                  {product.locationUrl}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {product.telegram && product.telegram.length > 0 && (
            <View className="mb-4">
              <Text className="text-neutral-text-main mb-1">- Telegram:</Text>
              {product.telegram.map((tg, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleContact("telegram", tg)}
                  className="mb-1"
                >
                  <Text className="text-primary underline">{tg}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text className="font-bold text-neutral-text-main mb-2">
            Contact Info:
          </Text>
          <Text className="text-neutral-text-sub mb-4">
            Please don&apos;t forget to mention that you found this ad on
            psaNPIC.
          </Text>

          {product.phones?.map((phone, index) => {
            const isRevealed = revealedPhones.includes(index);
            const maskedPhone =
              phone.length > 3
                ? phone.substring(0, phone.length - 3) + "XXX"
                : phone;

            return (
              <View key={index} className="flex-row items-center mb-2">
                <View className="w-6 h-6 bg-secondary-orange rounded flex items-center justify-center mr-2">
                  <Ionicons name="call" size={14} color="white" />
                </View>
                <Text className="text-lg font-medium text-neutral-text-main mr-2">
                  {isRevealed ? phone : maskedPhone}
                </Text>
                {!isRevealed && (
                  <TouchableOpacity
                    onPress={() =>
                      setRevealedPhones((prev) => [...prev, index])
                    }
                  >
                    <Text className="text-primary underline text-sm italic">
                      Click to Show
                    </Text>
                  </TouchableOpacity>
                )}
                {isRevealed && (
                  <TouchableOpacity
                    onPress={() => handleContact("call", phone)}
                  >
                    <Text className="text-primary underline text-sm italic">
                      Call Now
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Location Display */}
        <View className="mt-2 bg-neutral-surface p-4">
          <View className="flex-row">
            <Ionicons
              name="location-sharp"
              size={24}
              color={Colors.text.muted}
              style={{ marginTop: 2 }}
            />
            <View className="ml-2 flex-1">
              <Text className="text-base font-medium text-neutral-text-main">
                Location:{" "}
                <Text className="font-normal">
                  {product.fullAddress || product.location}
                </Text>
              </Text>
            </View>
          </View>

          {/* Map Placeholder */}
          <View className="mt-4 h-48 w-full overflow-hidden rounded-lg bg-neutral-background items-center justify-center border border-neutral-border">
            <Image
              source={require("@/assets/images/map_placeholder.png")}
              className="absolute w-full h-full opacity-50"
              resizeMode="cover"
              onError={(e) => { }}
            />
            <TouchableOpacity
              onPress={() =>
                product.locationUrl && Linking.openURL(product.locationUrl)
              }
              className="flex-row items-center bg-neutral-surface px-4 py-2 rounded-full shadow-sm"
            >
              <Ionicons name="map" size={20} color={Colors.danger} />
              <Text className="ml-2 font-medium text-neutral-text-main">
                Show Location on Map
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Loan Calculator */}
        <View className="mt-2 bg-neutral-surface p-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-lg font-bold text-neutral-text-main">
              Loan Calculator
            </Text>
            <TouchableOpacity>
              <Text className="text-primary font-medium">
                Payment Schedule &gt;
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-4 mb-8">
            {/* Donut Chart Placeholder */}
            <View className="w-32 h-32 rounded-full border-[10px] border-primary items-center justify-center border-l-secondary-orange border-t-emerald-500">
              <Text className="font-bold text-lg text-neutral-text-main">
                $2,623
              </Text>
              <Text className="text-xs text-center text-neutral-text-sub">
                Per month{"\n"}Over 8 Years
              </Text>
            </View>

            {/* Legend */}
            <View className="flex-1 justify-center gap-2">
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full border border-emerald-500 mr-2" />
                  <Text className="text-xs text-neutral-text-sub">
                    Down Payment
                  </Text>
                </View>
                <Text className="text-xs font-medium text-neutral-text-main">
                  $49,000
                </Text>
              </View>
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full border border-primary mr-2" />
                  <Text className="text-xs text-neutral-text-sub">
                    Loan Amount
                  </Text>
                </View>
                <Text className="text-xs font-medium text-neutral-text-main">
                  $196,000
                </Text>
              </View>
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full border border-secondary-orange mr-2" />
                  <Text className="text-xs text-neutral-text-sub">
                    Total Interest
                  </Text>
                </View>
                <Text className="text-xs font-medium text-neutral-text-main">
                  $55,875
                </Text>
              </View>
              <View className="h-[1px] bg-neutral-border my-1" />
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full border border-primary mr-2" />
                  <Text className="text-xs font-bold text-neutral-text-main">
                    Total Payment
                  </Text>
                </View>
                <Text className="text-xs font-bold text-neutral-text-main">
                  $300,875
                </Text>
              </View>
            </View>
          </View>

          {/* Sliders Placeholder */}
          <View className="gap-4">
            <View className="flex-row items-center gap-4">
              <Text className="w-24 text-right text-sm font-medium text-neutral-text-sub">
                Down Payment
              </Text>
              <View className="flex-1 h-1 bg-primary/20 rounded-full relative">
                <View
                  className="absolute left-0 top-[-6px] w-4 h-4 bg-primary rounded-full shadow"
                  style={{ left: "20%" }}
                />
              </View>
              <Text className="w-12 text-sm text-neutral-text-sub">20%</Text>
            </View>
            <View className="flex-row items-center gap-4">
              <Text className="w-24 text-right text-sm font-medium text-neutral-text-sub">
                Interest
              </Text>
              <View className="flex-1 h-1 bg-primary/20 rounded-full relative">
                <View
                  className="absolute left-0 top-[-6px] w-4 h-4 bg-primary rounded-full shadow"
                  style={{ left: "40%" }}
                />
              </View>
              <Text className="w-12 text-sm text-neutral-text-sub">6.5%</Text>
            </View>
            <View className="flex-row items-center gap-4">
              <Text className="w-24 text-right text-sm font-medium text-neutral-text-sub">
                Term
              </Text>
              <View className="flex-1 h-1 bg-primary/20 rounded-full relative">
                <View
                  className="absolute left-0 top-[-6px] w-4 h-4 bg-primary rounded-full shadow"
                  style={{ left: "60%" }}
                />
              </View>
              <Text className="w-12 text-sm text-neutral-text-sub">
                8 Years
              </Text>
            </View>
          </View>
        </View>

        {/* Seller Profile */}
        {product.seller && (
          <View className="mt-2.5 bg-neutral-surface p-4 rounded-xl border border-neutral-border/60 mx-3 shadow-sm">
            <View className="flex-row items-center">
              {/* Avatar with Online Status Badge */}
              <View className="relative h-16 w-16 mr-3.5">
                <View className="h-16 w-16 bg-neutral-background rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                  {product.seller.avatar ? (
                    <Image
                      source={{ uri: product.seller.avatar }}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <View className="w-full h-full items-center justify-center bg-primary/10 rounded-full">
                      <Text className="text-xl font-bold text-primary">
                        {product.seller.name.charAt(0)}
                      </Text>
                    </View>
                  )}
                </View>
                {/* Active Online Indicator */}
                <View className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white" />
              </View>

              {/* Seller Info */}
              <View className="flex-1">
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-base font-bold text-neutral-text-main">
                    {product.seller.name}
                  </Text>
                  <Ionicons
                    name="checkmark-circle"
                    size={17}
                    color={Colors.primary.DEFAULT}
                  />
                </View>
                <Text className="text-xs text-neutral-text-sub mt-0.5">
                  {product.seller.username}
                </Text>

                {/* Rating & Member Since Row */}
                <View className="flex-row items-center gap-2 mt-1.5">
                  <View className="flex-row items-center bg-amber-500/10 px-2 py-0.5 rounded-full">
                    <Ionicons name="star" size={12} color="#f59e0b" />
                    <Text className="text-xs font-bold text-amber-600 ml-1">
                      4.9
                    </Text>
                    <Text className="text-[10px] text-amber-600/80 ml-0.5">
                      (48)
                    </Text>
                  </View>
                  <Text className="text-xs text-neutral-text-muted">
                    • Member since {product.seller.memberSince}
                  </Text>
                </View>
              </View>
            </View>

            {/* Profile Actions */}
            <View className="mt-4 flex-row gap-3 pt-3 border-t border-neutral-border/40">
              <TouchableOpacity
                onPress={() => router.push(`/user/${product.seller?.name || "1"}`)}
                className="flex-1 bg-primary/10 py-2.5 rounded-xl items-center flex-row justify-center gap-1.5"
                activeOpacity={0.7}
              >
                <Ionicons name="person-outline" size={16} color={Colors.primary.DEFAULT} />
                <Text className="text-primary font-semibold text-xs">View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-neutral-surface border border-primary/40 py-2.5 rounded-xl items-center flex-row justify-center gap-1.5"
                activeOpacity={0.7}
              >
                <Ionicons name="person-add-outline" size={16} color={Colors.primary.DEFAULT} />
                <Text className="text-primary font-semibold text-xs">Follow Seller</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Space before bottom bar */}
        <View className="h-24" />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-neutral-surface border-t border-neutral-border/80 px-4 py-3 flex-row items-center gap-3 shadow-lg">
        <TouchableOpacity
          className="items-center justify-center px-3 py-1 bg-neutral-background rounded-xl"
          activeOpacity={0.7}
        >
          <Ionicons
            name={product.isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={product.isFavorite ? Colors.danger : Colors.text.sub}
          />
          <Text className="text-[10px] font-medium text-neutral-text-sub mt-0.5">
            {product.likes || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-primary rounded-xl items-center justify-center flex-row gap-2 py-3.5 shadow-sm"
          onPress={() =>
            product.phones &&
            product.phones.length > 0 &&
            handleContact("call", product.phones[0])
          }
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={18} color="white" />
          <Text className="text-white font-bold text-sm">Call Seller</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-secondary-orange rounded-xl items-center justify-center flex-row gap-2 py-3.5 shadow-sm"
          onPress={() =>
            router.push({
              pathname: "/(tabs)/chat",
              params: {
                sellerName: product.seller?.name || "Verified Seller",
                title: product.title,
                price: `$${product.price}`,
                image: product.image,
              },
            })
          }
          activeOpacity={0.8}
        >
          <Ionicons name="chatbubble-ellipses" size={18} color="white" />
          <Text className="text-white font-bold text-sm">Chat Now</Text>
        </TouchableOpacity>
      </View>

      {/* Share Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={shareModalVisible}
        onRequestClose={() => setShareModalVisible(false)}
        statusBarTranslucent
      >
        <TouchableOpacity
          className="flex-1 bg-black/60 justify-end"
          activeOpacity={1}
          onPress={() => setShareModalVisible(false)}
        >
          <View className="w-full">
            {/* Modal Drag Indicator - Above the sheet on the dark background */}
            <View className="items-center mb-3">
              <View className="w-12 h-1.5 bg-white/95 rounded-full" />
            </View>

            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              className="bg-neutral-background rounded-t-3xl p-4 w-full pb-8"
            >
              {/* Product Card Preview (White Card) */}
              <View
                className="bg-neutral-surface rounded-2xl overflow-hidden p-3 shadow-md mb-6 border border-neutral-border/50"
                style={{
                  elevation: 3,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}
              >
                {/* Images Collage - Top large image and three bottom small images */}
                <View className="rounded-xl overflow-hidden mb-3 gap-[2px]">
                  {/* Large Top Image */}
                  <View className="h-44 w-full bg-neutral-background">
                    <Image
                      source={getImageSource(allImages[0])}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>

                  {/* Bottom Three Images */}
                  {allImages.length > 1 && (
                    <View className="flex-row h-20 gap-[2px]">
                      {/* Small Image 1 */}
                      <View className="flex-1 bg-neutral-background">
                        <Image
                          source={getImageSource(allImages[1] || allImages[0])}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      </View>
                      {/* Small Image 2 */}
                      <View className="flex-1 bg-neutral-background">
                        <Image
                          source={getImageSource(allImages[2] || allImages[1] || allImages[0])}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      </View>
                      {/* Small Image 3 */}
                      <View className="flex-1 bg-neutral-background relative">
                        <Image
                          source={getImageSource(allImages[3] || allImages[2] || allImages[0])}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                        {allImages.length > 4 && (
                          <View className="absolute inset-0 bg-black/40 items-center justify-center">
                            <Text className="text-white text-base font-bold">
                              +{allImages.length - 3}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </View>

                {/* Seller Info, Product Title, & Price aligned with QR Code */}
                <View className="flex-row justify-between px-1 py-1">
                  {/* Left Column (Info) */}
                  <View className="flex-1 mr-3 justify-between">
                    <View>
                      {/* Seller Info Row */}
                      <View className="flex-row items-center mb-1.5">
                        {product.seller?.avatar ? (
                          <Image
                            source={{ uri: product.seller.avatar }}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                        ) : (
                          <View className="w-6 h-6 rounded-full bg-neutral-background items-center justify-center mr-2 border border-neutral-border">
                            <Text className="text-[10px] font-bold text-neutral-text-sub">
                              {product.seller?.name?.charAt(0) || "S"}
                            </Text>
                          </View>
                        )}
                        <Text className="text-neutral-text-sub text-xs font-semibold">
                          {product.seller?.name || "Anonymous Seller"}
                        </Text>
                      </View>

                      {/* Product Title */}
                      <Text
                        className="text-[15px] font-bold text-neutral-text-main leading-5 mb-1"
                        numberOfLines={2}
                      >
                        {product.title}
                      </Text>

                      {/* Phone & Address/Location */}
                      <Text
                        className="text-neutral-text-sub text-[10px] mb-1.5 font-medium"
                        numberOfLines={1}
                      >
                        {product.phones?.[0] ? `${product.phones[0]} • ` : ""}
                        {product.location}
                      </Text>
                    </View>

                    {/* Price */}
                    <Text className="text-danger text-lg font-bold">
                      ${product.price.toLocaleString()}
                    </Text>
                  </View>

                  {/* Right Column (QR Code) */}
                  <View className="w-20 h-20 bg-white p-1 border border-neutral-border rounded-lg relative self-end mb-1">
                    <Image
                      source={{
                        uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://psanpic.com/product/${product.id}`,
                      }}
                      className="w-full h-full"
                    />
                    {/* Icon overlay */}
                    <View className="absolute inset-0 items-center justify-center">
                      <View className="bg-white p-0.5 rounded shadow-sm">
                        <Image
                          source={require("@/assets/images/psa-npic.png")}
                          className="w-5 h-5"
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row justify-around w-full mt-2 mb-2 px-2">
                <TouchableOpacity
                  onPress={handleDownload}
                  className="items-center"
                >
                  <View className="w-14 h-14 rounded-full bg-neutral-border items-center justify-center mb-2">
                    <Ionicons
                      name="download-outline"
                      size={24}
                      color={Colors.text.primary}
                    />
                  </View>
                  <Text className="text-neutral-text-sub text-xs font-semibold">
                    Download
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCopyLink}
                  className="items-center"
                >
                  <View className="w-14 h-14 rounded-full bg-neutral-border items-center justify-center mb-2">
                    <Ionicons
                      name="link-outline"
                      size={24}
                      color={Colors.text.primary}
                    />
                  </View>
                  <Text className="text-neutral-text-sub text-xs font-semibold">
                    Copy link
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleShare}
                  className="items-center"
                >
                  <View className="w-14 h-14 rounded-full bg-neutral-border items-center justify-center mb-2">
                    <Ionicons
                      name="arrow-redo-outline"
                      size={24}
                      color={Colors.text.primary}
                    />
                  </View>
                  <Text className="text-neutral-text-sub text-xs font-semibold">
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ProductDetailScreen;
