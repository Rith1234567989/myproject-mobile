import { useWindowDimensions } from "react-native";

export const useGridCardSize = () => {
  const { width } = useWindowDimensions();
  const availableWidth = width - 16;
  const cardWidth = availableWidth / 2 - 12;
  return {
    image: cardWidth,
    details: 144,
    total: cardWidth + 144,
  };
};
