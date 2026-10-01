import { Colors } from "@/constants/Colors";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaViewProps {
  children: React.ReactNode;
  className?: string;
  statusBarColor?: string;
  statusBarStyle?: "light-content" | "dark-content";
}

const SafeAreaView = ({
  children,
  className = "",
  statusBarColor = Colors.neutral.surface,
  statusBarStyle = "dark-content",
}: SafeAreaViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View className={`flex-1 bg-background ${className}`}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor="transparent"
        translucent={true}
      />
      {/* Colored background for status bar area */}
      <View
        style={{
          height: insets.top,
          backgroundColor: statusBarColor,
        }}
      />
      {/* Content area */}
      <View className="flex-1">{children}</View>
    </View>
  );
};

export default SafeAreaView;
