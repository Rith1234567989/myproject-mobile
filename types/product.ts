export interface Seller {
  name: string;
  username: string;
  avatar?: string;
  memberSince: string;
}

export interface Product {
  id: string;
  title: string;
  image: string | null;
  images?: string[]; // Additional images for gallery
  date: string;
  distance: string;
  location: string;
  condition?: string;
  year?: string;
  taxPaper?: boolean;
  experienceLevel?: string;
  jobType?: string;
  price: number;
  oldPrice?: number;
  imageCount?: number;
  isVerified?: boolean;
  hasFreeDelivery?: boolean;
  isFavorite?: boolean;
  // Detail screen fields
  description?: string;
  mainCategory?: string;
  category?: string;
  bedrooms?: number;
  bathrooms?: number;
  facing?: string;
  size?: string;
  type?: string;
  likes?: number;
  locationUrl?: string;
  telegram?: string[];
  phones?: string[];
  fullAddress?: string;
  seller?: Seller;
}

export interface ProductFilters {
  category?: string;
  location?: string;
  priceRange?: [number, number];
  sortBy?: "latest" | "oldest" | "price-low" | "price-high";
  dateRange?: "any" | "today" | "week" | "month";
}

export interface LoanCalculation {
  downPaymentPercent: number;
  interestRate: number;
  termYears: number;
  downPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}
