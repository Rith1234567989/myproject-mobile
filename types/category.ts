import { ImageSourcePropType } from "react-native";

export interface Category {
  id: string;
  name: string;
  image: ImageSourcePropType;
  subs?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  image: ImageSourcePropType;
  brands?: Brand[];
  types?: CategoryType[];
}

export interface Brand {
  id: string;
  name: string;
  image: ImageSourcePropType;
  models?: Model[];
  // Some brands in the data file don't have models property explicitly shown in the first few lines,
  // but it's optional in the interface so it's fine.
}

export interface Model {
  id: string;
  name: string;
  image?: ImageSourcePropType; // Some models might have images
}

export interface CategoryType {
  id: string;
  name: string;
  image: ImageSourcePropType;
}
