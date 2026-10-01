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

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "ផ្នែក ជាងធ្វើក្រចក និងអ្នកគិតលុយ",
    image: null,
    date: "Jan 05",
    distance: "10.65KM",
    location: "Doun Penh",
    jobType: "Full-time",
    experienceLevel: "2Year+ Experience",
    price: 180,
    isFavorite: false,
    description:
      "ត្រូវការជាងធ្វើក្រចក និងអ្នកគិតលុយ បទពិសោធន៍ 2ឆ្នាំ។ ប្រាក់ខែចាប់ពី $180+។",
    mainCategory: "Jobs",
    category: "Beauty & Spa",
    likes: 5,
    fullAddress: "ផ្ទះលេខ១៩ ផ្លូវលេខ០១ សង្កាត់ព្រែកស Dangkao, Phnom Penh",
    phones: ["097640123", "012333456"],
    seller: {
      name: "Beauty Salon PP",
      username: "@beautysalonpp",
      memberSince: "Jan 01, 2025",
    },
  },
  {
    id: "2",
    title: "វីឡាភ្លោះ កុងបូរី ទួងនីប្រែសរ អាចចរចារបាន",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
    date: "Yesterday",
    distance: "",
    location: "Phnom Penh",
    condition: "New",
    year: "2024",
    taxPaper: true,
    price: 245000,
    imageCount: 4,
    isFavorite: true,
    description:
      "ចូលតំបន់ទទេរដល់ផ្ទះ នៅខាងផ្លូវថ២អទី ពីភ្លាងទ្វារំ នៅតំទមាងទី4\nមានបួងអីង\n\n**តម្លៃអាចចរចារបាន",
    mainCategory: "House & Land",
    category: "House For Sale",
    bedrooms: 4,
    bathrooms: 6,
    facing: "West",
    size: "65m²",
    type: "Villa",
    likes: 2,
    locationUrl: "https://maps.app.goo.gl/vNZhUEesSxLYVoMb9?g_st=ipc",
    telegram: ["https://t.me/SotheavyPeou", "https://t.me/thearithba"],
    phones: ["097640123", "012333456"],
    fullAddress:
      "ផ្ទះលេខ១៩ ផ្លូវលេខ០១ កុងបូរីទួងនី ទី4, Prey Sa, Dangkao, Phnom Penh",
    seller: {
      name: "Sotheavy",
      username: "@chansotheavy",
      memberSince: "Jan 07, 2026",
    },
  },
  {
    id: "3",
    title: "Galaxy Z fold 6",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800",
    ],
    date: "Jan 08",
    distance: "9.65KM",
    location: "Tuol Kouk",
    condition: "Used",
    price: 669,
    imageCount: 6,
    isVerified: true,
    hasFreeDelivery: true,
    isFavorite: false,
    description:
      "Samsung Galaxy Z Fold 6 512GB. ស៊ីមកាត និង esim។ ថ្មល្អ 100%។ មានប្រអប់ និងគ្រឿងបន្ថែម។",
    mainCategory: "Electronics",
    category: "Phones",
    likes: 15,
    phones: ["0886521999"],
    fullAddress: "Tuol Kouk, Phnom Penh",
    seller: {
      name: "Tech Store KH",
      username: "@techstorekh",
      memberSince: "Dec 15, 2024",
    },
  },
  {
    id: "4",
    title: "iPhone 15 Pro Max 256GB",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800",
    ],
    date: "Jan 10",
    distance: "5.2KM",
    location: "BKK1",
    condition: "New",
    price: 1250,
    imageCount: 4,
    isVerified: true,
    hasFreeDelivery: true,
    isFavorite: false,
    description:
      "iPhone 15 Pro Max 256GB ថ្មី 100%។ ពណ៌ Natural Titanium។ មានធានា 1ឆ្នាំ។",
    mainCategory: "Electronics",
    category: "Phones",
    likes: 28,
    phones: ["012345678"],
    fullAddress: "BKK1, Chamkarmon, Phnom Penh",
    seller: {
      name: "Apple Reseller",
      username: "@appleresellerkh",
      memberSince: "Jun 20, 2023",
    },
  },
  {
    id: "5",
    title: "MacBook Pro M3 14inch",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800",
    ],
    date: "Jan 12",
    distance: "8.1KM",
    location: "Chamkarmon",
    condition: "Used",
    year: "2024",
    price: 1899,
    oldPrice: 2100,
    imageCount: 5,
    isFavorite: true,
    description:
      "MacBook Pro 14inch M3 Pro chip។ RAM 18GB, SSD 512GB។ ប្រើប្រាស់បានតែ 3ខែ។ ថ្មល្អ 95%។",
    mainCategory: "Electronics",
    category: "Laptops",
    likes: 12,
    phones: ["0887654321"],
    fullAddress: "Chamkarmon, Phnom Penh",
    seller: {
      name: "Laptop Corner",
      username: "@laptopcorner",
      memberSince: "Mar 10, 2024",
    },
  },
  {
    id: "6",
    title: "គ្រែស្ទាយ Luxury Blue Checkered Bed Frame & Mattress (King Size)",
    image: require("@/assets/images/furniture/blue-checkered-bed.jpg"),
    images: [
      require("@/assets/images/furniture/blue-checkered-bed.jpg"),
    ],
    date: "Today",
    distance: "3.2KM",
    location: "BKK1",
    condition: "New",
    price: 1250,
    oldPrice: 1450,
    imageCount: 1,
    isFavorite: true,
    isVerified: true,
    hasFreeDelivery: true,
    description:
      "គ្រែដេកប្រណីត ស្ទាយ Luxury Blue Checkered Upholstered Bed Frame & Premium Mattress។ សាច់ក្រណាត់ plaid pattern ពណ៌ខៀវស និងជើងឈើប្រណីត។ ផ្តល់នូវភាពស្រស់ស្អាត ផាសុកភាព និងភាពស្អាតបាតសម្រាប់បន្ទប់គេងរបស់អ្នក។",
    mainCategory: "Furniture & Decor",
    category: "Beds & Mattresses",
    likes: 42,
    phones: ["012888999", "097777666"],
    fullAddress: "Street 306, BKK1, Chamkarmon, Phnom Penh",
    seller: {
      name: "Nordic Home & Living",
      username: "@nordichome",
      memberSince: "Feb 2025",
    },
  },
  {
    id: "7",
    title: "ឈុតសៀវភៅ Bestseller Novel Collection (4 Books Set)",
    image: require("@/assets/images/sports-hobbies/books.jpg"),
    images: [
      require("@/assets/images/sports-hobbies/books.jpg"),
    ],
    date: "Today",
    distance: "1.5KM",
    location: "Toul Kouk",
    condition: "Like New",
    price: 35,
    oldPrice: 50,
    imageCount: 1,
    isFavorite: true,
    isVerified: true,
    hasFreeDelivery: false,
    description:
      "ឈុតសៀវភៅប្រលោមលោកល្បីៗ Bestseller Fiction Set រួមមាន An Anonymous Girl, The Far Field, No Exit និងសៀវភៅពេញនិយមជាច្រើនទៀត។ ស្ថានភាពស្អាត 99% ដូចថ្មី។",
    mainCategory: "Books, Sports & hobbies",
    category: "Books",
    likes: 24,
    phones: ["012345999", "098765111"],
    fullAddress: "Street 289, Toul Kouk, Phnom Penh",
    seller: {
      name: "BookWorm Corner",
      username: "@bookwormkh",
      memberSince: "Jan 2024",
    },
  },
  {
    id: "8",
    title: "ឈុត ឌីស អាល់ប៊ុមចម្រៀង និង ភាពយន្ត Original CDs & DVDs Media",
    image: require("@/assets/images/sports-hobbies/cds-dvds-vhs.jpg"),
    images: [
      require("@/assets/images/sports-hobbies/cds-dvds-vhs.jpg"),
    ],
    date: "Yesterday",
    distance: "4.0KM",
    location: "BKK2",
    condition: "Used",
    price: 18,
    imageCount: 1,
    isFavorite: false,
    isVerified: true,
    hasFreeDelivery: true,
    description:
      "ឈុតឌីសចម្រៀង និង ភាពយន្តចាស់ៗ Original Music CDs and Movies collection with jewel cases. ដំណើរការល្អ អានច្បាស់ គ្មានស្នាមឆ្កូត។",
    mainCategory: "Books, Sports & hobbies",
    category: "CDs, DVDs, VHS",
    likes: 19,
    phones: ["015998877"],
    fullAddress: "BKK2, Chamkarmon, Phnom Penh",
    seller: {
      name: "Media Vintage KH",
      username: "@mediavintage",
      memberSince: "Dec 2024",
    },
  },
];
