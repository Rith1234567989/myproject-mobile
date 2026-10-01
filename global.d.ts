/// <reference types="nativewind/types" />

import "react-native";

declare module "react-native" {
  interface TouchableOpacityProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
}
