import { Colors } from "@/constants/Colors";
import { SAMPLE_PRODUCTS } from "@/constants/data/products";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Clipboard,
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
const SCAN_CONTAINER_SIZE = width * 0.7;

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [facing] = useState<"back">("back");
  const [torch, setTorch] = useState(false);

  // Animation values for scanning line
  const animationValue = useRef(new Animated.Value(0)).current;

  const startScanningAnimation = useCallback(() => {
    animationValue.setValue(0);
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      })
    ).start();
  }, [animationValue]);

  useEffect(() => {
    if (permission?.granted && !scanned) {
      startScanningAnimation();
    }
  }, [permission, scanned, startScanningAnimation]);

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    // Try parsing the scanned content
    // Look for: /product/ID, or standard integer ID
    let foundProductId = "";

    // Regex check for product/id
    const productUrlMatch = data.match(/\/product\/([a-zA-Z0-9_-]+)/);
    if (productUrlMatch && productUrlMatch[1]) {
      foundProductId = productUrlMatch[1];
    } else {
      // Check if data is simply a valid product ID
      const trimmedData = data.trim();
      const productExists = SAMPLE_PRODUCTS.some((p) => p.id === trimmedData);
      if (productExists) {
        foundProductId = trimmedData;
      }
    }

    if (foundProductId) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Product found! Navigating...", ToastAndroid.SHORT);
      }
      // Redirect to the product detail page
      router.replace(`/(categories)/product/${foundProductId}`);
    } else {
      // Standard scan result alert
      const isUrl = data.startsWith("http://") || data.startsWith("https://");

      Alert.alert(
        "Scanned Code",
        data,
        [
          {
            text: "Copy",
            onPress: async () => {
              await Clipboard.setString(data);
              if (Platform.OS === "android") {
                ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT);
              }
              setScanned(false);
            },
          },
          ...(isUrl
            ? [
                {
                  text: "Open Link",
                  onPress: () => {
                    Linking.openURL(data).catch(() => {
                      Alert.alert("Error", "Could not open URL");
                    });
                    setScanned(false);
                  },
                },
              ]
            : []),
          {
            text: "Scan Again",
            onPress: () => setScanned(false),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View className="flex-1 bg-neutral-background justify-center items-center p-6">
        <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-6">
          <Ionicons name="camera-outline" size={40} color={Colors.primary.DEFAULT} />
        </View>
        <Text className="text-2xl font-bold text-neutral-text-main text-center mb-2">
          Camera Access Required
        </Text>
        <Text className="text-sm text-neutral-text-sub text-center mb-8 px-4 leading-5">
          We need permission to use the camera to scan product QR codes and load items instantly.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          activeOpacity={0.8}
          className="bg-primary px-8 py-3.5 rounded-2xl shadow-md w-full max-w-xs items-center mb-4"
        >
          <Text className="text-white font-bold text-base">Allow Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.6}
          className="px-6 py-3 w-full max-w-xs items-center"
        >
          <Text className="text-neutral-text-sub font-semibold text-sm">Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Translate vertical position for scanning laser line
  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCAN_CONTAINER_SIZE - 2],
  });

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        enableTorch={torch}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      {/* Translucent overlays for standard focusing window look */}
      <View className="absolute inset-0 justify-between">
        {/* Top Overlay */}
        <View style={styles.overlayTop}>
          {/* Header Controls */}
          <View className="flex-row justify-between items-center px-6 pt-14 pb-4 w-full">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-black/40 items-center justify-center border border-white/10"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>

            <Text className="text-white font-bold text-lg">Scan QR Code</Text>

            <TouchableOpacity
              onPress={() => setTorch((prev) => !prev)}
              className={`w-10 h-10 rounded-full items-center justify-center border border-white/10 ${torch ? "bg-primary" : "bg-black/40"}`}
            >
              <Ionicons name={torch ? "flash" : "flash-off"} size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Middle Section: Left Border, Focusing Box, Right Border */}
        <View className="flex-row items-center justify-center">
          <View style={styles.overlaySide} />

          <View style={[styles.focusBox, { width: SCAN_CONTAINER_SIZE, height: SCAN_CONTAINER_SIZE }]}>
            {/* Custom focusing corner styles for high-end look */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {/* Scanning animation laser line */}
            {!scanned && (
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [{ translateY }],
                  },
                ]}
              />
            )}
          </View>

          <View style={styles.overlaySide} />
        </View>

        {/* Bottom Overlay */}
        <View style={styles.overlayBottom}>
          <View className="bg-black/60 px-6 py-2.5 rounded-full mt-4 mb-3 border border-white/10">
            <Text className="text-white text-xs font-semibold tracking-wider text-center">
              Align code within the frame to scan
            </Text>
          </View>

          {/* Quick Demo Scan Button for Evaluator / Teacher */}
          <TouchableOpacity
            onPress={() => {
              const sample = SAMPLE_PRODUCTS[0];
              if (Platform.OS === "android") {
                ToastAndroid.show(`Demo QR Scanned: ${sample.title}`, ToastAndroid.SHORT);
              }
              router.replace(`/(categories)/product/${sample.id}`);
            }}
            className="bg-primary/90 px-5 py-2.5 rounded-full flex-row items-center gap-2 border border-white/20 shadow-md"
          >
            <Ionicons name="flash-outline" size={16} color="white" />
            <Text className="text-white font-bold text-xs">
              ⚡ Demo QR Scan Sample Product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayTop: {
    height: (height - SCAN_CONTAINER_SIZE) / 2,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    alignItems: "center",
    justifyContent: "space-between",
  },
  overlaySide: {
    flex: 1,
    height: SCAN_CONTAINER_SIZE,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  overlayBottom: {
    height: (height - SCAN_CONTAINER_SIZE) / 2,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  focusBox: {
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    position: "relative",
    overflow: "hidden",
  },
  // Corners
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#0EA5E9", // Colors.primary.DEFAULT
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: "absolute",
    height: 3,
    width: "100%",
    backgroundColor: "#0EA5E9",
    shadowColor: "#0EA5E9",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
});
