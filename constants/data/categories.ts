export interface CategoryModel {
  id: string;
  name: string;
  image?: any;
}

export interface CategoryBrand {
  id: string;
  name: string;
  image: any;
  models?: CategoryModel[];
}

export interface CategoryType {
  id: string;
  name: string;
  image: any;
}

export interface SubCategory {
  id: string;
  name: string;
  image: any;
  icon?: string;
  color?: string;
  brands?: CategoryBrand[];
  types?: CategoryType[];
}

export interface Category {
  id: string;
  name: string;
  image: any;
  subs?: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    id: "car-and-vehicles",
    name: "Cars and Vehicles",
    image: require("@/assets/images/s-cars-and-vehicles.webp"),
    subs: [
      {
        id: "car-for-sale",
        name: "Cars for Sale",
        image: require("@/assets/images/cars-for-sale.png"),
        brands: [
          {
            id: "mg",
            name: "MG",
            image: require("@/assets/images/mg.png"),
            models: [
              {
                id: "5-ev",
                name: "5 EV",
              },
              {
                id: "6",
                name: "6",
              },
              {
                id: "7",
                name: "7",
              },
              {
                id: "gs",
                name: "GS",
              },
              {
                id: "gt",
                name: "GT",
              },
              {
                id: "hs",
                name: "HS",
              },
              {
                id: "rx-5",
                name: "RX5",
              },
              {
                id: "rx-8",
                name: "RX8",
              },
              {
                id: "t-60",
                name: "T60",
              },
              {
                id: "zs",
                name: "ZS",
              },
            ],
          },
          {
            id: "leapmotor",
            name: "Leapmotor",
            image: require("@/assets/images/leapmotor.png"),
            models: [
              {
                id: "c11",
                name: "C11",
              },
              {
                id: "c12",
                name: "C12",
              },
              {
                id: "c16",
                name: "C16",
              },
              {
                id: "c01",
                name: "C01",
              },
              {
                id: "c07",
                name: "C07",
              },
              {
                id: "c31",
                name: "C31",
              },
              {
                id: "c32",
                name: "C32",
              },
            ],
          },
          {
            id: "toyota",
            name: "Toyota",
            image: require("@/assets/images/toyota.png"),
            models: [
              {
                id: "camry",
                name: "Camry",
              },
              {
                id: "corolla",
                name: "Corolla",
              },
              {
                id: "hilux",
                name: "Hilux",
              },
              {
                id: "highlander",
                name: "Highlander",
              },
              {
                id: "rav4",
                name: "RAV4",
              },
              {
                id: "fortuner",
                name: "Fortuner",
              },
              {
                id: "alphard",
                name: "Alphard",
              },
            ],
          },
          {
            id: "lexus",
            name: "Lexus",
            image: require("@/assets/images/lexus.png"),
            models: [
              {
                id: "es",
                name: "ES",
              },
              {
                id: "ls",
                name: "LS",
              },
              {
                id: "rx",
                name: "RX",
              },
              {
                id: "lx",
                name: "LX",
              },
              {
                id: "nx",
                name: "NX",
              },
              {
                id: "ux",
                name: "UX",
              },
            ],
          },
          {
            id: "kia",
            name: "Kia",
            image: require("@/assets/images/kia.png"),
            models: [
              {
                id: "carnival",
                name: "Carnival",
              },
              {
                id: "k5",
                name: "K5",
              },
              {
                id: "sportage",
                name: "Sportage",
              },
              {
                id: "seltos",
                name: "Seltos",
              },
              {
                id: "sonet",
                name: "Sonet",
              },
              {
                id: "picanto",
                name: "Picanto",
              },
            ],
          },
          {
            id: "ford",
            name: "Ford",
            image: require("@/assets/images/ford.png"),
            models: [
              {
                id: "everest",
                name: "Everest",
              },
              {
                id: "ranger",
                name: "Ranger",
              },
              {
                id: "territory",
                name: "Territory",
              },
              {
                id: "mustang",
                name: "Mustang",
              },
            ],
          },
          {
            id: "land-rover",
            name: "Land Rover",
            image: require("@/assets/images/land-rover.png"),
            models: [
              {
                id: "defender",
                name: "Defender",
              },
              {
                id: "discovery",
                name: "Discovery",
              },
              {
                id: "range-rover",
                name: "Range Rover",
              },
              {
                id: "range-rover-sport",
                name: "Range Rover Sport",
              },
              {
                id: "range-rover-velar",
                name: "Range Rover Velar",
              },
            ],
          },
          {
            id: "mercedes-benz",
            name: "Mercedes-Benz",
            image: require("@/assets/images/mercedes-benz.png"),
            models: [
              {
                id: "c-class",
                name: "C-Class",
              },
              {
                id: "e-class",
                name: "E-Class",
              },
              {
                id: "s-class",
                name: "S-Class",
              },
              {
                id: "glc",
                name: "GLC",
              },
              {
                id: "gle",
                name: "GLE",
              },
              {
                id: "g-class",
                name: "G-Class",
              },
            ],
          },
          {
            id: "audi",
            name: "Audi",
            image: require("@/assets/images/audi.png"),
            models: [
              {
                id: "a4",
                name: "A4",
              },
              {
                id: "a6",
                name: "A6",
              },
              {
                id: "a8",
                name: "A8",
              },
              {
                id: "q5",
                name: "Q5",
              },
              {
                id: "q7",
                name: "Q7",
              },
              {
                id: "q8",
                name: "Q8",
              },
            ],
          },
        ],
        types: [
          {
            id: "sedan",
            name: "Sedan",
            image: require("@/assets/images/sedan.png"),
          },
          {
            id: "hatchback",
            name: "Hatchback",
            image: require("@/assets/images/hatchback.png"),
          },
          {
            id: "pickup",
            name: "Pickup",
            image: require("@/assets/images/pickup.png"),
          },
          {
            id: "suv",
            name: "SUV",
            image: require("@/assets/images/suv.png"),
          },
        ],
      },
      {
        id: "bicycles",
        name: "Bicycles",
        image: require("@/assets/images/bicycles.png"),
      },
      {
        id: "motorcycle-for-sale",
        name: "Motorcycle for Sale",
        image: require("@/assets/images/motorcycles-for-sale.png"),
        brands: [
          {
            id: "honda",
            name: "Honda",
            image: require("@/assets/images/s-cars-and-vehicles.webp"),
          },
          {
            id: "yamaha",
            name: "Yamaha",
            image: require("@/assets/images/s-cars-and-vehicles.webp"),
          },
          {
            id: "suzuki",
            name: "Suzuki",
            image: require("@/assets/images/s-cars-and-vehicles.webp"),
          },
          {
            id: "kawasaki",
            name: "Kawasaki",
            image: require("@/assets/images/s-cars-and-vehicles.webp"),
          },
        ],
      },
      {
        id: "vehicles-for-rent",
        name: "Vehicles for Rent",
        image: require("@/assets/images/vehicles-for-rent.png"),
        types: [
          {
            id: "car-rental",
            name: "Car Rental",
            image: require("@/assets/images/s-cars-and-vehicles.webp"),
          },
          {
            id: "van-rental",
            name: "Van Rental",
            image: require("@/assets/images/s-cars-and-vehicles.webp"),
          },
          {
            id: "truck-rental",
            name: "Truck Rental",
            image: require("@/assets/images/s-cars-and-vehicles.webp"),
          },
        ],
      },
      {
        id: "maintenance-and-repair",
        name: "Maintenance & Repair",
        image: require("@/assets/images/maintenance-repair.png"),
      },
      {
        id: "lorries-vans-and-vehicles",
        name: "Lorries, Vans & Vehicles",
        image: require("@/assets/images/lorries-vans-and-tractors.png"),
        types: [
          {
            id: "heavy-truck",
            name: "Heavy Truck",
            image: require("@/assets/images/s-cars-and-vehicles.webp"),
          },
          {
            id: "light-truck",
            name: "Light Truck",
            image: require("@/assets/images/s-cars-and-vehicles.webp"),
          },
        ],
      },
      {
        id: "financing-and-insurance",
        name: "Financing & Insurance",
        image: require("@/assets/images/financing-insurance.png"),
      },
      {
        id: "tuk-tuk-and-remork",
        name: "Tuk Tuk & Remork",
        image: require("@/assets/images/tuk-tuk-and-remork.png"),
      },
      {
        id: "parts-and-accessories",
        name: "Parts & Accessories",
        image: require("@/assets/images/parts-accessories.png"),
      },
      {
        id: "others",
        name: "Others",
        image: require("@/assets/images/others-vihicles.png"),
      },
    ],
  },
  {
    id: "phones-tablets",
    name: "Phones & Tablets",
    image: require("@/assets/images/s-mobile-phones-tablets.webp"),
    subs: [
      {
        id: "phones",
        name: "Phones",
        image: require("@/assets/images/phones.png"),
        brands: [
          {
            id: "apple",
            name: "Apple",
            image: require("@/assets/images/brand-apple.png"),
            models: [
              { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max" },
              { id: "iphone-15-pro", name: "iPhone 15 Pro" },
              { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max" },
              { id: "iphone-13", name: "iPhone 13" },
            ],
          },
          {
            id: "samsung",
            name: "Samsung",
            image: require("@/assets/images/brand-samsung.png"),
            models: [
              { id: "s24-ultra", name: "Galaxy S24 Ultra" },
              { id: "s23-ultra", name: "Galaxy S23 Ultra" },
              { id: "z-fold-5", name: "Galaxy Z Fold 5" },
            ],
          },
          {
            id: "huawei",
            name: "Huawei",
            image: require("@/assets/images/brand-huawei.png"),
            models: [
              { id: "mate-60-pro", name: "Mate 60 Pro" },
              { id: "p60-pro", name: "P60 Pro" },
            ],
          },
          {
            id: "sony",
            name: "Sony",
            image: require("@/assets/images/brand-sony.png"),
            models: [
              { id: "xperia-1-v", name: "Xperia 1 V" },
              { id: "xperia-5-v", name: "Xperia 5 V" },
            ],
          },
          {
            id: "oppo",
            name: "Oppo",
            image: require("@/assets/images/brand-oppo.png"),
            models: [
              { id: "find-x6-pro", name: "Find X6 Pro" },
              { id: "reno-10-pro", name: "Reno 10 Pro" },
            ],
          },
          {
            id: "lg",
            name: "LG",
            image: require("@/assets/images/brand-lg.png"),
            models: [
              { id: "v60", name: "V60 ThinQ" },
              { id: "wing", name: "Wing" },
            ],
          },
          {
            id: "vivo",
            name: "Vivo",
            image: require("@/assets/images/brand-vivo.png"),
            models: [
              { id: "x90-pro", name: "X90 Pro" },
              { id: "v27-pro", name: "V27 Pro" },
            ],
          },
          {
            id: "nokia",
            name: "Nokia",
            image: require("@/assets/images/brand-nokia.png"),
            models: [
              { id: "xr21", name: "XR21" },
              { id: "g60", name: "G60 5G" },
            ],
          },
          {
            id: "meizu",
            name: "Meizu",
            image: require("@/assets/images/brand-meizu.png"),
            models: [
              { id: "meizu-20-pro", name: "Meizu 20 Pro" },
            ],
          },
          {
            id: "oneplus",
            name: "OnePlus",
            image: require("@/assets/images/brand-oneplus.png"),
            models: [
              { id: "oneplus-11", name: "OnePlus 11" },
              { id: "open", name: "OnePlus Open" },
            ],
          },
          {
            id: "blackberry",
            name: "BlackBerry",
            image: require("@/assets/images/brand-blackberry.png"),
            models: [
              { id: "key2", name: "KEY2" },
              { id: "priv", name: "Priv" },
            ],
          },
          {
            id: "htc",
            name: "HTC",
            image: require("@/assets/images/brand-htc.png"),
            models: [
              { id: "u23-pro", name: "U23 Pro" },
            ],
          },
          {
            id: "acer",
            name: "Acer",
            image: require("@/assets/images/brand-acer.png"),
            models: [
              { id: "liquid-z6", name: "Liquid Z6" },
            ],
          },
          {
            id: "google",
            name: "Google",
            image: require("@/assets/images/brand-google.png"),
            models: [
              { id: "pixel-8-pro", name: "Pixel 8 Pro" },
              { id: "pixel-7a", name: "Pixel 7a" },
            ],
          },
          {
            id: "xiaomi",
            name: "Xiaomi",
            image: require("@/assets/images/brand-xiaomi.png"),
            models: [
              { id: "xiaomi-13-ultra", name: "Xiaomi 13 Ultra" },
              { id: "redmi-note-13-pro", name: "Redmi Note 13 Pro" },
            ],
          },
          {
            id: "motorola",
            name: "Motorola",
            image: require("@/assets/images/brand-motorola.png"),
            models: [
              { id: "razr-40-ultra", name: "Razr 40 Ultra" },
              { id: "edge-40-pro", name: "Edge 40 Pro" },
            ],
          },
          {
            id: "alcatel",
            name: "Alcatel",
            image: require("@/assets/images/brand-alcatel.png"),
            models: [
              { id: "alcatel-1s", name: "Alcatel 1S" },
            ],
          },
          {
            id: "singtech",
            name: "SingTech",
            image: require("@/assets/images/brand-singtech.png"),
            models: [
              { id: "singtech-s1", name: "SingTech S1" },
            ],
          },
          {
            id: "vertu",
            name: "Vertu",
            image: require("@/assets/images/brand-vertu.png"),
            models: [
              { id: "metavertu", name: "Metavertu" },
              { id: "signature-touch", name: "Signature Touch" },
            ],
          },
          {
            id: "zte",
            name: "ZTE",
            image: require("@/assets/images/brand-zte.png"),
            models: [
              { id: "axon-50-ultra", name: "Axon 50 Ultra" },
              { id: "nubia-z50-s-pro", name: "Nubia Z50S Pro" },
            ],
          },
          {
            id: "asus",
            name: "ASUS",
            image: require("@/assets/images/brand-asus.png"),
            models: [
              { id: "rog-phone-7", name: "ROG Phone 7" },
              { id: "zenfone-10", name: "Zenfone 10" },
            ],
          },
          {
            id: "camfone",
            name: "Camfone",
            image: require("@/assets/images/brand-camfone.png"),
            models: [
              { id: "hero-10", name: "Hero 10" },
            ],
          },
          {
            id: "hmd",
            name: "HMD",
            image: require("@/assets/images/brand-hmd.png"),
            models: [
              { id: "hmd-pulse", name: "Pulse Pro" },
            ],
          },
          {
            id: "honor",
            name: "Honor",
            image: require("@/assets/images/brand-honor.png"),
            models: [
              { id: "magic-5-pro", name: "Magic 5 Pro" },
              { id: "honor-90", name: "Honor 90" },
            ],
          },
          {
            id: "infinix",
            name: "Infinix",
            image: require("@/assets/images/brand-infinix.png"),
            models: [
              { id: "zero-30-5g", name: "Zero 30 5G" },
              { id: "note-30-vip", name: "Note 30 VIP" },
            ],
          },
          {
            id: "iqoo",
            name: "iQOO",
            image: require("@/assets/images/brand-iqoo.png"),
            models: [
              { id: "iqoo-11-pro", name: "iQOO 11 Pro" },
              { id: "iqoo-neo-8", name: "iQOO Neo 8" },
            ],
          },
          {
            id: "meitu",
            name: "Meitu",
            image: require("@/assets/images/brand-meitu.png"),
            models: [
              { id: "t9", name: "Meitu T9" },
            ],
          },
          {
            id: "poco",
            name: "POCO",
            image: require("@/assets/images/brand-poco.png"),
            models: [
              { id: "f5-pro", name: "POCO F5 Pro" },
              { id: "x5-pro-5g", name: "POCO X5 Pro 5G" },
            ],
          },
          {
            id: "realme",
            name: "Realme",
            image: require("@/assets/images/brand-realme.png"),
            models: [
              { id: "gt-5-pro", name: "GT 5 Pro" },
              { id: "realme-11-pro-plus", name: "Realme 11 Pro+" },
            ],
          },
          {
            id: "redmi",
            name: "Redmi",
            image: require("@/assets/images/brand-redmi.png"),
            models: [
              { id: "k60-ultra", name: "Redmi K60 Ultra" },
              { id: "note-12-turbo", name: "Redmi Note 12 Turbo" },
            ],
          },
          {
            id: "tecno",
            name: "Tecno",
            image: require("@/assets/images/brand-tecno.png"),
            models: [
              { id: "phantom-v-fold", name: "Phantom V Fold" },
              { id: "camon-20-premier", name: "Camon 20 Premier" },
            ],
          },
          {
            id: "other",
            name: "Other - ផ្សេងៗ",
            image: require("@/assets/images/brand-other.png"),
            models: [],
          },
        ],
      },
      {
        id: "tablets",
        name: "Tablets",
        image: require("@/assets/images/tablets.png"),
        brands: [
          {
            id: "apple",
            name: "Apple",
            image: require("@/assets/images/brand-apple.png"),
            models: [{ id: "ipad-pro", name: "iPad Pro" }, { id: "ipad-air", name: "iPad Air" }],
          },
          {
            id: "samsung",
            name: "Samsung",
            image: require("@/assets/images/brand-samsung.png"),
            models: [{ id: "galaxy-tab-s9", name: "Galaxy Tab S9" }],
          },
          {
            id: "xiaomi",
            name: "Xiaomi",
            image: require("@/assets/images/brand-xiaomi.png"),
            models: [{ id: "pad-6", name: "Xiaomi Pad 6" }],
          },
          {
            id: "huawei",
            name: "Huawei",
            image: require("@/assets/images/brand-huawei.png"),
            models: [{ id: "matepad-pro", name: "MatePad Pro" }],
          },
        ],
      },
      {
        id: "smart-watches",
        name: "Smart Watches",
        image: require("@/assets/images/smart-watches.png"),
        brands: [
          {
            id: "apple",
            name: "Apple",
            image: require("@/assets/images/brand-apple.png"),
            models: [{ id: "watch-series-9", name: "Apple Watch Series 9" }, { id: "watch-ultra-2", name: "Apple Watch Ultra 2" }],
          },
          {
            id: "samsung",
            name: "Samsung",
            image: require("@/assets/images/brand-samsung.png"),
            models: [{ id: "galaxy-watch-6", name: "Galaxy Watch 6" }],
          },
          {
            id: "xiaomi",
            name: "Xiaomi",
            image: require("@/assets/images/brand-xiaomi.png"),
            models: [{ id: "watch-s3", name: "Xiaomi Watch S3" }],
          },
          {
            id: "huawei",
            name: "Huawei",
            image: require("@/assets/images/brand-huawei.png"),
            models: [{ id: "watch-gt-4", name: "Huawei Watch GT 4" }],
          },
        ],
      },
      {
        id: "phone-accessories",
        name: "Phone Accessories",
        image: require("@/assets/images/phone-accessories.png"),
        types: [
          { id: "phone-case", name: "Phone Case", image: require("@/assets/images/phone-accessories.png") },
          { id: "screen-protector", name: "Screen Protector", image: require("@/assets/images/phone-accessories.png") },
          { id: "charger", name: "Phone Charger", image: require("@/assets/images/phone-accessories.png") },
          { id: "headphone", name: "Phone Headphone", image: require("@/assets/images/phone-accessories.png") },
        ],
      },
      {
        id: "phone-numbers",
        name: "Phone Numbers",
        image: require("@/assets/images/phone-numbers.png"),
        types: [
          { id: "metfone", name: "Metfone", image: require("@/assets/images/phone-numbers.png") },
          { id: "cellcard", name: "Cellcard", image: require("@/assets/images/phone-numbers.png") },
          { id: "smart", name: "Smart", image: require("@/assets/images/phone-numbers.png") },
          { id: "other", name: "Other - ផ្សេងៗ", image: require("@/assets/images/brand-other.png") },
        ],
      }],
  },
  {
    id: "computers-accessories",
    name: "Computers & Accessories",
    image: require("@/assets/images/s-computer-and-accessories.webp"),
    subs: [
      {
        id: "laptop",
        name: "Laptop",
        image: require("@/assets/images/laptops.png"),
        brands: [
          {
            id: "acer",
            name: "Acer",
            image: require("@/assets/images/Desktop/acer.png"),
          },
          {
            id: "apple",
            name: "Apple",
            image: require("@/assets/images/Desktop/apple.png"),
          },
          {
            id: "asus",
            name: "Asus",
            image: require("@/assets/images/Desktop/asus.png"),
          },
          {
            id: "dell",
            name: "Dell",
            image: require("@/assets/images/Desktop/dell.png"),
          },
          {
            id: "fujitsu",
            name: "Fujitsu",
            image: require("@/assets/images/Desktop/fujitsu.png"),
          },
          {
            id: "hp",
            name: "HP",
            image: require("@/assets/images/Desktop/hp.png"),
          },
          {
            id: "lenovo",
            name: "Lenovo",
            image: require("@/assets/images/Desktop/lenovo.png"),
          },
          {
            id: "microsoft",
            name: "Microsoft",
            image: require("@/assets/images/Desktop/microsoft.png"),
          },
          {
            id: "msi",
            name: "MSI",
            image: require("@/assets/images/Desktop/msi.png"),
          },
          {
            id: "samsung",
            name: "Samsung",
            image: require("@/assets/images/Desktop/samsung.png"),
          },
          {
            id: "other",
            name: "Other - ផ្សេងៗ",
            image: require("@/assets/images/Desktop/other.png"),
          },
        ],
      },
      {
        id: "desktop",
        name: "Desktop",
        image: require("@/assets/images/desktops.png"),
        brands: [
          {
            id: "acer",
            name: "Acer",
            image: require("@/assets/images/Desktop/acer.png"),
          },
          {
            id: "aoc",
            name: "AOC",
            image: require("@/assets/images/Desktop/aoc.png"),
          },
          {
            id: "apple",
            name: "Apple",
            image: require("@/assets/images/Desktop/apple.png"),
          },
          {
            id: "asus",
            name: "Asus",
            image: require("@/assets/images/Desktop/asus.png"),
          },
          {
            id: "dell",
            name: "Dell",
            image: require("@/assets/images/Desktop/dell.png"),
          },
          {
            id: "fujitsu",
            name: "Fujitsu",
            image: require("@/assets/images/Desktop/fujitsu.png"),
          },
          {
            id: "hp",
            name: "HP",
            image: require("@/assets/images/Desktop/hp.png"),
          },
          {
            id: "lenovo",
            name: "Lenovo",
            image: require("@/assets/images/Desktop/lenovo.png"),
          },
          {
            id: "microsoft",
            name: "Microsoft",
            image: require("@/assets/images/Desktop/microsoft.png"),
          },
          {
            id: "msi",
            name: "MSI",
            image: require("@/assets/images/Desktop/msi.png"),
          },
          {
            id: "samsung",
            name: "Samsung",
            image: require("@/assets/images/Desktop/samsung.png"),
          },
          {
            id: "other",
            name: "Other - ផ្សេងៗ",
            image: require("@/assets/images/Desktop/other.png"),
          },
        ],
      },
      {
        id: "all-in-one",
        name: "All-in-one",
        image: require("@/assets/images/all-in-one.png"),
        brands: [
          {
            id: "acer",
            name: "Acer",
            image: require("@/assets/images/Desktop/acer.png"),
          },
          {
            id: "apple",
            name: "Apple",
            image: require("@/assets/images/Desktop/apple.png"),
          },
          {
            id: "asus",
            name: "Asus",
            image: require("@/assets/images/Desktop/asus.png"),
          },
          {
            id: "dell",
            name: "Dell",
            image: require("@/assets/images/Desktop/dell.png"),
          },
          {
            id: "hp",
            name: "HP",
            image: require("@/assets/images/Desktop/hp.png"),
          },
          {
            id: "lenovo",
            name: "Lenovo",
            image: require("@/assets/images/Desktop/lenovo.png"),
          },
          {
            id: "msi",
            name: "MSI",
            image: require("@/assets/images/Desktop/msi.png"),
          },
          {
            id: "samsung",
            name: "Samsung",
            image: require("@/assets/images/Desktop/samsung.png"),
          },
          {
            id: "other",
            name: "Other - ផ្សេងៗ",
            image: require("@/assets/images/Desktop/other.png"),
          },
        ],
      },
      {
        id: "monitor",
        name: "Monitor",
        image: require("@/assets/images/monitors.png"),
        brands: [
          {
            id: "acer",
            name: "Acer",
            image: require("@/assets/images/Desktop/acer.png"),
          },
          {
            id: "aoc",
            name: "AOC",
            image: require("@/assets/images/Desktop/aoc.png"),
          },
          {
            id: "apple",
            name: "Apple",
            image: require("@/assets/images/Desktop/apple.png"),
          },
          {
            id: "asus",
            name: "Asus",
            image: require("@/assets/images/Desktop/asus.png"),
          },
          {
            id: "dell",
            name: "Dell",
            image: require("@/assets/images/Desktop/dell.png"),
          },
          {
            id: "hp",
            name: "HP",
            image: require("@/assets/images/Desktop/hp.png"),
          },
          {
            id: "lenovo",
            name: "Lenovo",
            image: require("@/assets/images/Desktop/lenovo.png"),
          },
          {
            id: "msi",
            name: "MSI",
            image: require("@/assets/images/Desktop/msi.png"),
          },
          {
            id: "samsung",
            name: "Samsung",
            image: require("@/assets/images/Desktop/samsung.png"),
          },
          {
            id: "other",
            name: "Other - ផ្សេងៗ",
            image: require("@/assets/images/Desktop/other.png"),
          },
        ],
      },
      {
        id: "printer-and-scanners",
        name: "Printer & Scanners",
        image: require("@/assets/images/printers-scanners.png"),
        brands: [
          {
            id: "brother",
            name: "Brother",
            image: require("@/assets/images/printers-scanners/brother.png"),
          },
          {
            id: "canon",
            name: "Canon",
            image: require("@/assets/images/printers-scanners/canon.png"),
          },
          {
            id: "epson",
            name: "Epson",
            image: require("@/assets/images/printers-scanners/epson.png"),
          },
          {
            id: "hp",
            name: "HP",
            image: require("@/assets/images/printers-scanners/hp.png"),
          },
          {
            id: "acer",
            name: "Acer",
            image: require("@/assets/images/printers-scanners/acer.png"),
          },
          {
            id: "apple",
            name: "Apple",
            image: require("@/assets/images/printers-scanners/apple.png"),
          },
          {
            id: "asus",
            name: "Asus",
            image: require("@/assets/images/printers-scanners/asus.png"),
          },
          {
            id: "dell",
            name: "Dell",
            image: require("@/assets/images/printers-scanners/dell.png"),
          },
          {
            id: "evolis",
            name: "Evolis",
            image: require("@/assets/images/printers-scanners/evolis.png"),
          },
          {
            id: "fujitsu",
            name: "Fujitsu",
            image: require("@/assets/images/printers-scanners/fujitsu.png"),
          },
          {
            id: "kyocera",
            name: "Kyocera",
            image: require("@/assets/images/printers-scanners/kyocera.png"),
          },
          {
            id: "zebra",
            name: "Zebra",
            image: require("@/assets/images/printers-scanners/zebra.png"),
          },
          {
            id: "other",
            name: "Other - ផ្សេងៗ",
            image: require("@/assets/images/printers-scanners/other.png"),
          },
        ],
      },
      {
        id: "parts-and-accessories",
        name: "Parts & Accessories",
        image: require("@/assets/images/parts-accessories-c.png"),
        types: [
          {
            id: "keyboards-mice",
            name: "Keyboards, Mice(Mouse) & Input Devices",
            image: require("@/assets/images/parts-accessories/keyboards-mice.png"),
          },
          {
            id: "speakers",
            name: "Speakers",
            image: require("@/assets/images/parts-accessories/speakers.png"),
          },
          {
            id: "headsets-microphones",
            name: "Headsets & Microphones",
            image: require("@/assets/images/parts-accessories/headsets-microphones.png"),
          },
          {
            id: "monitor-accessories",
            name: "Monitor Accessories",
            image: require("@/assets/images/parts-accessories/monitor-accessories.png"),
          },
          {
            id: "storage-media",
            name: "Storage & Media",
            image: require("@/assets/images/parts-accessories/storage-media.png"),
          },
          {
            id: "memory-cards-and-readers",
            name: "Memory Cards & Readers",
            image: require("@/assets/images/parts-accessories/memory-cards-and-readers.png"),
          },
          {
            id: "internet-modems",
            name: "Internet Modems",
            image: require("@/assets/images/parts-accessories/internet-modems.png"),
          },
          {
            id: "cables-adapters",
            name: "Cables & Adapters",
            image: require("@/assets/images/parts-accessories/cables-adapters.png"),
          },
          {
            id: "laptop-batteries-chargers",
            name: "Laptop Batteries & Chargers",
            image: require("@/assets/images/parts-accessories/laptop-batteries-chargers.png"),
          },
          {
            id: "cases-bags",
            name: "Cases & Bags",
            image: require("@/assets/images/parts-accessories/cases-bags.png"),
          },
          {
            id: "pc-components",
            name: "PC Components",
            image: require("@/assets/images/parts-accessories/pc-components.png"),
          },
          {
            id: "network-components",
            name: "Network Components",
            image: require("@/assets/images/parts-accessories/network-components.png"),
          },
          {
            id: "printers-inks-and-toners",
            name: "Printer Inks & Toners",
            image: require("@/assets/images/parts-accessories/printers-inks-and-toners.png"),
          },
          {
            id: "printers-scanners",
            name: "Printers & Scanners",
            image: require("@/assets/images/parts-accessories/printers-scanners.png"),
          },
          {
            id: "projectors-accessory",
            name: "Projectors & Accessory",
            image: require("@/assets/images/parts-accessories/projectors-accessory.png"),
          },
          {
            id: "stands",
            name: "Stand",
            image: require("@/assets/images/parts-accessories/stands.png"),
          },
          {
            id: "other",
            name: "Other - ផ្សេងៗ",
            image: require("@/assets/images/parts-accessories/other.png"),
          },
        ],
      },
      {
        id: "software",
        name: "Software",
        image: require("@/assets/images/softwares.png"),
      },
    ],
  },
  {
    id: "electronics-appliances",
    name: "Electronics & Appliances",
    image: require("@/assets/images/s-electronics-appliances.webp"),
    subs: [
      {
        id: "washing-machine-and-dryer",
        name: "Washing Machine & Dryer",
        image: require("@/assets/images/washing-machine-and-dryer.png"),
      },
      {
        id: "fridge-and-freezers",
        name: "Fridge & Freezers",
        image: require("@/assets/images/fridge-and-freezers.png"),
      },
      {
        id: "air-conditioner-and-heating",
        name: "Air Conditioner & Heating",
        image: require("@/assets/images/air-conditioner.png"),
      },
      {
        id: "tools",
        name: "Tools",
        image: require("@/assets/images/tools.png"),
      },
      {
        id: "machinery",
        name: "Machinery",
        image: require("@/assets/images/machinery.png"),
      },
      {
        id: "consumer-electronics",
        name: "Consumer Electronics",
        image: require("@/assets/images/consumer-electronics.png"),
      },
      {
        id: "security-camera",
        name: "Security Camera",
        image: require("@/assets/images/security-camera.png"),
      },
      {
        id: "lighting",
        name: "Lighting",
        image: require("@/assets/images/lighting.png"),
      },
      {
        id: "cameras-and-camcorders",
        name: "Cameras & Camcorders",
        image: require("@/assets/images/cameras-and-camcorders.png"),
      },
      {
        id: "tvs-video-and-audio",
        name: "TVs & Video & Audio",
        image: require("@/assets/images/tvs-video-and-audio.png"),
      },
      {
        id: "home-appliances",
        name: "Home Appliances",
        image: require("@/assets/images/home-appliances.png"),
      },
      {
        id: "video-games-consoles-types",
        name: "Video Games Consoles & Types",
        image: require("@/assets/images/video-games-consoles-types.png"),
      },
    ],
  },
  {
    id: "property-housing-rentals",
    name: "House & Land",
    image: require("@/assets/images/s-property-housing-rentals.webp"),
    subs: [
      {
        id: "house-for-sale",
        name: "House For Sale",
        image: require("@/assets/images/house-for-sale.png"),
        types: [
          {
            id: "flat",
            name: "Flat",
            image: require("@/assets/images/house-for-sale.png"),
          },
          {
            id: "house",
            name: "House",
            image: require("@/assets/images/house-for-sale.png"),
          },
          {
            id: "shophouses",
            name: "Shophouses",
            image: require("@/assets/images/house-for-sale.png"),
          },
          {
            id: "villa",
            name: "Villa",
            image: require("@/assets/images/house-for-sale.png"),
          },
        ],
      },
      {
        id: "house-for-rent",
        name: "House For Rent",
        image: require("@/assets/images/house-for-rent.png"),
        types: [
          {
            id: "flat",
            name: "Flat",
            image: require("@/assets/images/house-for-rent.png"),
          },
          {
            id: "house",
            name: "House",
            image: require("@/assets/images/house-for-rent.png"),
          },
          {
            id: "shophouses",
            name: "Shophouses",
            image: require("@/assets/images/house-for-rent.png"),
          },
          {
            id: "villa",
            name: "Villa",
            image: require("@/assets/images/house-for-rent.png"),
          },
        ],
      },
      {
        id: "condo-for-sale",
        name: "Condo For Sale",
        image: require("@/assets/images/condo-for-sale.png"),
      },
      {
        id: "apartment-for-rent",
        name: "Apartment For Rent",
        image: require("@/assets/images/apartment-for-rent.png"),
      },
      {
        id: "land-for-rent",
        name: "Land For Rent",
        image: require("@/assets/images/land-for-rent.png"),
      },
      {
        id: "land-for-sale",
        name: "Land For Sale",
        image: require("@/assets/images/land-for-sale.png"),
      },
      {
        id: "commercial-properties-for-sale",
        name: "Commercial Properties For Sale",
        image: require("@/assets/images/commercial-properties-for-sale.png"),
        types: [
          {
            id: "building",
            name: "Building",
            image: require("@/assets/images/commercial-properties-for-sale.png"),
          },
          {
            id: "office",
            name: "Office",
            image: require("@/assets/images/commercial-properties-for-sale.png"),
          },
          {
            id: "warehouse",
            name: "Warehouse",
            image: require("@/assets/images/commercial-properties-for-sale.png"),
          },
          {
            id: "retail",
            name: "Retail",
            image: require("@/assets/images/commercial-properties-for-sale.png"),
          },
        ],
      },
      {
        id: "commercial-properties-for-rent",
        name: "Commercial Properties For Rent",
        image: require("@/assets/images/commercial-properties-for-rent.png"),
        types: [
          {
            id: "building",
            name: "Building",
            image: require("@/assets/images/commercial-properties-for-rent.png"),
          },
          {
            id: "office",
            name: "Office",
            image: require("@/assets/images/commercial-properties-for-rent.png"),
          },
          {
            id: "warehouse",
            name: "Warehouse",
            image: require("@/assets/images/commercial-properties-for-rent.png"),
          },
          {
            id: "retail",
            name: "Retail",
            image: require("@/assets/images/commercial-properties-for-rent.png"),
          },
        ],
      },
      {
        id: "room-for-rent",
        name: "Room For Rent",
        image: require("@/assets/images/room-for-rent.png"),
      },
      {
        id: "properties-wanted",
        name: "Properties Wanted",
        image: require("@/assets/images/properties-wanted.png"),
      },
      {
        id: "agent-services",
        name: "Agent Services",
        image: require("@/assets/images/agent-services.png"),
      },
    ],
  },
  {
    id: "jobs",
    name: "Jobs",
    image: require("@/assets/images/s-jobs.webp"),
    subs: [
      { id: "accounting", name: "Accounting", icon: "calculator-outline", color: "#1D4ED8", image: require("@/assets/images/job-accounting.png") },
      { id: "administration", name: "Administration", icon: "briefcase-outline", color: "#2563EB", image: require("@/assets/images/job-administration.png") },
      { id: "architecture", name: "Architecture/Engineering", icon: "construct-outline", color: "#D97706", image: require("@/assets/images/job-architecture.png") },
      { id: "assistant", name: "Assistant/Secretary", icon: "clipboard-outline", color: "#4F46E5", image: require("@/assets/images/job-assistant.png") },
      { id: "audit-taxation", name: "Audit/Taxation", icon: "document-text-outline", color: "#0D9488", image: require("@/assets/images/job-audit-taxation.png") },
      { id: "banking-insurance", name: "Banking/Insurance", icon: "card-outline", color: "#DC2626", image: require("@/assets/images/banking-insurance.png") },
      { id: "cashier-receptionist", name: "Cashier/Receptionist", icon: "receipt-outline", color: "#0284C7", image: require("@/assets/images/job-cashier-receptionist.png") },
      { id: "restaurant-catering", name: "Restaurant/Catering", icon: "restaurant-outline", color: "#B45309", image: require("@/assets/images/job-restaurant-catering.png") },
      { id: "cleaner-housekeeper", name: "Cleaner/Housekeeper", icon: "sparkles-outline", color: "#06B6D4", image: require("@/assets/images/job-cleaner-housekeeper.png") },
      { id: "consultant", name: "Consultant", icon: "chatbubbles-outline", color: "#3B82F6", image: require("@/assets/images/job-consultant.png") },
      { id: "customer-service", name: "Customer Service", icon: "headset-outline", color: "#7C3AED", image: require("@/assets/images/customer-service.png") },
      { id: "design", name: "Design", icon: "color-palette-outline", color: "#EC4899", image: require("@/assets/images/job-design.png") },
      { id: "education-training", name: "Education/Training", icon: "school-outline", color: "#16A34A", image: require("@/assets/images/job-education-training.png") },
      { id: "finance", name: "Finance", icon: "analytics-outline", color: "#E11D48", image: require("@/assets/images/job-finance.png") },
      { id: "delivery-logistics", name: "Delivery/Logistics", icon: "cube-outline", color: "#EA580C", image: require("@/assets/images/job-delivery-logistics.png") },
      { id: "hotel-hospital", name: "Hotel / Hospital", icon: "medkit-outline", color: "#EF4444", image: require("@/assets/images/job-hotel-hospital.png") },
      { id: "human-resources", name: "Human Resources", icon: "people-outline", color: "#2563EB", image: require("@/assets/images/job-human-resources.png") },
      { id: "information-technology", name: "Information Technology", icon: "code-slash-outline", color: "#6366F1", image: require("@/assets/images/job-information-technology.png") },
      { id: "lawyer-legal", name: "Lawyer/Legal Services", icon: "scale-outline", color: "#D97706", image: require("@/assets/images/job-lawyer-legal.png") },
      { id: "management", name: "Management", icon: "ribbon-outline", color: "#1E40AF", image: require("@/assets/images/job-management.png") },
      { id: "manufacturing", name: "Manufacturing", icon: "cog-outline", color: "#475569", image: require("@/assets/images/manufacturing.png") },
      { id: "marketing", name: "Marketing", icon: "megaphone-outline", color: "#F59E0B", image: require("@/assets/images/marketing.png") },
      { id: "media-advertising", name: "Media/Advertising", icon: "videocam-outline", color: "#8B5CF6", image: require("@/assets/images/job-media-advertising.png") },
      { id: "medical-health", name: "Medical/Health", icon: "fitness-outline", color: "#0284C7", image: require("@/assets/images/job-medical-health.png") },
      { id: "purchasing-merchandising", name: "Purchasing/Merchandising", icon: "cart-outline", color: "#F97316", image: require("@/assets/images/job-purchasing-merchandising.png") },
      { id: "operations", name: "Operations", icon: "sync-outline", color: "#64748B", image: require("@/assets/images/job-operations.png") },
      { id: "project-management", name: "Project Management", icon: "folder-open-outline", color: "#059669", image: require("@/assets/images/job-project-management.png") },
      { id: "quality-control", name: "Quality Control", icon: "checkmark-done-circle-outline", color: "#0284C7", image: require("@/assets/images/job-quality-control.png") },
      { id: "resort-casino", name: "Resort/Casino", icon: "game-controller-outline", color: "#9333EA", image: require("@/assets/images/job-resort-casino.png") },
      { id: "sales", name: "Sales", icon: "pricetag-outline", color: "#E11D48", image: require("@/assets/images/job-sales.png") },
      { id: "security-driver", name: "Security/Driver", icon: "shield-checkmark-outline", color: "#1E3A8A", image: require("@/assets/images/job-security-driver.png") },
      { id: "technician", name: "Technician", icon: "hardware-chip-outline", color: "#0284C7", image: require("@/assets/images/job-technician.png") },
      { id: "telecom", name: "Telecommunications", icon: "cellular-outline", color: "#2563EB", image: require("@/assets/images/job-telecom.png") },
      { id: "translation", name: "Translation/Interpretation", icon: "language-outline", color: "#0D9488", image: require("@/assets/images/job-translation.png") },
      { id: "travel-agency", name: "Travel Agency/Ticket Sales", icon: "airplane-outline", color: "#0284C7", image: require("@/assets/images/job-travel-agency.png") },
      { id: "others", name: "Others", icon: "grid-outline", color: "#6B7280", image: require("@/assets/images/others.png") },
    ],
  },

  {
    id: "services",
    name: "Services",
    image: require("@/assets/images/s-services.webp"),
    subs: [
      { id: "accounting", name: "Accounting", icon: "folder-open-outline", color: "#2563EB", image: require("@/assets/images/service/accounting.png") },
      { id: "financial-services", name: "Financial Services", icon: "analytics-outline", color: "#E11D48", image: require("@/assets/images/service/financial-services.png") },
      { id: "travel-tourism", name: "Travel & Tourism", icon: "briefcase-outline", color: "#EA580C", image: require("@/assets/images/service/travel&tourism.png") },
      { id: "automotive-services", name: "Automotive Services", icon: "car-outline", color: "#475569", image: require("@/assets/images/service/automotive.png") },
      { id: "advertising-media", name: "Advertising & Media", icon: "videocam-outline", color: "#8B5CF6", image: require("@/assets/images/service/advertising&media.png") },
      { id: "wedding-decor", name: "Wedding & Ceremony Decor", icon: "ribbon-outline", color: "#D97706", image: require("@/assets/images/service/bridal-services.png") },
      { id: "cleaning-housekeeper", name: "Cleaning & Housekeeping", icon: "sparkles-outline", color: "#06B6D4", image: require("@/assets/images/service/cleaning&maid-services.png") },
      { id: "construction-architecture", name: "Construction & Architecture", icon: "construct-outline", color: "#D97706", image: require("@/assets/images/service/construction,arch.&interiors.png") },
      { id: "education-training", name: "Education & Training", icon: "school-outline", color: "#16A34A", image: require("@/assets/images/service/education&training.png") },
      { id: "engineering-services", name: "Engineering Services", icon: "cog-outline", color: "#F59E0B", image: require("@/assets/images/service/engineering.png") },
      { id: "insurance", name: "Insurance", icon: "shield-checkmark-outline", color: "#DC2626", image: require("@/assets/images/service/insurance.png") },
      { id: "massage-spa", name: "Massage & Spa", icon: "flower-outline", color: "#16A34A", image: require("@/assets/images/service/massage-spa.png") },
      { id: "hospitality-tourism", name: "Hospitality & Tourism", icon: "business-outline", color: "#0284C7", image: require("@/assets/images/service/hospitality-travel-tourism.png") },
      { id: "health-medical", name: "Health & Medical", icon: "medkit-outline", color: "#EF4444", image: require("@/assets/images/service/health-medical-pharma.png") },
      { id: "it-telecom", name: "IT & Telecommunication", icon: "code-slash-outline", color: "#6366F1", image: require("@/assets/images/service/it-telecom.png") },
      { id: "design-renovation", name: "Design & Renovation", icon: "color-palette-outline", color: "#EC4899", image: require("@/assets/images/service/interior-design-renovation.png") },
      { id: "legal-services", name: "Legal Services", icon: "scale-outline", color: "#D97706", image: require("@/assets/images/service/legal.png") },
      { id: "transportation-services", name: "Transportation Services", icon: "cube-outline", color: "#EA580C", image: require("@/assets/images/service/movers-logistics.png") },
      { id: "plumbing-electrical", name: "Plumbing & Electrical", icon: "flash-outline", color: "#3B82F6", image: require("@/assets/images/service/plumbing-electrical.png") },
      { id: "real-estate-services", name: "Real Estate Services", icon: "home-outline", color: "#059669", image: require("@/assets/images/service/property-real-estate.png") },
      { id: "science", name: "Science", icon: "flask-outline", color: "#0EA5E9", image: require("@/assets/images/service/science.png") },
      { id: "supply-logistics", name: "Supply & Logistics", icon: "bus-outline", color: "#E11D48", image: require("@/assets/images/service/supply-chain-logistics.png") },
      { id: "printing-publishing", name: "Printing & Publishing", icon: "print-outline", color: "#475569", image: require("@/assets/images/service/printing-publishing.png") },
      { id: "other-services", name: "Other Services", icon: "grid-outline", color: "#6B7280", image: require("@/assets/images/service/other-services.png") },
    ],
  },
  {
    id: "fashion-beauty",
    name: "Fashion & Beauty",
    image: require("@/assets/images/s-fashion-beauty.webp"),
    subs: [
      {
        id: "women-fashion",
        name: "Women's Fashion",
        image: require("@/assets/images/Fashion/womens-fashion.png"),
        types: [
          {
            id: "women-accessories",
            name: "Women's Accessories",
            image: require("@/assets/images/Fashion/women-accessories.png"),
          },
          {
            id: "women-clothing",
            name: "Women's Clothing",
            image: require("@/assets/images/Fashion/women-clothing.png"),
          },
          {
            id: "women-shoes",
            name: "Women's Shoes",
            image: require("@/assets/images/Fashion/women-shoes.png"),
          },
          {
            id: "women-bags",
            name: "Women's Bags",
            image: require("@/assets/images/Fashion/women-handbags.png"),
          },
        ],
      },
      {
        id: "men-fashion",
        name: "Men's Fashion",
        image: require("@/assets/images/Fashion/mens-fashion.png"),
        types: [
          {
            id: "men-accessories",
            name: "Men's Accessories",
            image: require("@/assets/images/Fashion/men-accessories.png"),
          },
          {
            id: "men-clothing",
            name: "Men's Clothing",
            image: require("@/assets/images/Fashion/men-clothing.png"),
          },
          {
            id: "men-shoes",
            name: "Men's Shoes",
            image: require("@/assets/images/Fashion/men-shoes.png"),
          },
          {
            id: "men-watches",
            name: "Men's Watches",
            image: require("@/assets/images/Fashion/men-watches.png"),
          },
        ],
      },
      {
        id: "baby-kids",
        name: "Baby & Kids",
        image: require("@/assets/images/Fashion/baby-and-kids-fashion.png"),
        types: [
          {
            id: "baby-kids-clothing",
            name: "Baby & Kids Clothing",
            image: require("@/assets/images/Fashion/kid-clothing.png"),
          },
          {
            id: "baby-kids-shoes",
            name: "Baby & Kids Shoes",
            image: require("@/assets/images/Fashion/kid-shoes.png"),
          },
          {
            id: "baby-kids-accessories",
            name: "Baby & Kids Accessories",
            image: require("@/assets/images/Fashion/kid-accessories.png"),
          },
        ],
      },
      {
        id: "travel-and-luggage",
        name: "Travel & Luggage",
        image: require("@/assets/images/Fashion/travel-and-luggage.png"),
        types: [
          {
            id: "backpacks",
            name: "Backpacks",
            image: require("@/assets/images/Fashion/backpacks.png"),
          },
          {
            id: "travel-bags",
            name: "Travel Bags",
            image: require("@/assets/images/Fashion/bags.png"),
          },
          {
            id: "luggage",
            name: "Luggage",
            image: require("@/assets/images/Fashion/Luggage.png"),
          },
        ],
      },
      {
        id: "fashion-accessories",
        name: "Fashion Accessories",
        image: require("@/assets/images/Fashion/fashion-accessories.png"),
        types: [
          {
            id: "rings",
            name: "Rings",
            image: require("@/assets/images/Fashion/rings.png"),
          },
          {
            id: "necklaces",
            name: "Necklaces",
            image: require("@/assets/images/Fashion/necklaces.png"),
          },
          {
            id: "earrings",
            name: "Earrings",
            image: require("@/assets/images/Fashion/earrings.png"),
          },
          {
            id: "watches",
            name: "Watches",
            image: require("@/assets/images/Fashion/women-watches.png"),
          },
          {
            id: "jewelry",
            name: "Jewelry",
            image: require("@/assets/images/Fashion/jewelry-accessories.png"),
          },
          {
            id: "glasses",
            name: "Glasses",
            image: require("@/assets/images/Fashion/sunglasses.png"),
          },
        ],
      },
      {
        id: "beauty-and-healthcare-products",
        name: "Beauty & Healthcare Products",
        image: require("@/assets/images/Fashion/beauty-healthcare-products.png"),
      },
    ],
  },
  {
    id: "furniture-and-decor",
    name: "Furniture & Decor",
    image: require("@/assets/images/s-furniture-decor.webp"),
    subs: [
      {
        id: "tables-and-desks",
        name: "Tables & Desks",
        image: require("@/assets/images/furniture/tables-and-desks.png"),
      },
      {
        id: "chairs-and-sofas",
        name: "Chairs & Sofas",
        image: require("@/assets/images/furniture/chairs-and-sofas.png"),
      },
      {
        id: "wardrobes-and-cabinets",
        name: "Wardrobes & Cabinets",
        image: require("@/assets/images/furniture/wardrobes-and-cabinets.png"),
      },
      {
        id: "shelves-and-drawers",
        name: "Shelves & Drawers",
        image: require("@/assets/images/furniture/shelves-and-drawers.png"),
      },
      {
        id: "beds-and-mattresses",
        name: "Beds & Mattresses",
        image: require("@/assets/images/furniture/beds-and-mattresses.png"),
      },
      {
        id: "cabinets-and-carpet",
        name: "Cabinets & Carpet",
        image: require("@/assets/images/furniture/curtain-and-carpet.png"),
      },
      {
        id: "other-furniture",
        name: "Other Furniture",
        image: require("@/assets/images/furniture/other-furniture.png"),
      },
      {
        id: "kitchenware",
        name: "Kitchenware",
        image: require("@/assets/images/furniture/kitchenware.png"),
      },
      {
        id: "household-items",
        name: "Household Items",
        image: require("@/assets/images/furniture/household-items.png"),
      },
      {
        id: "handcrafts-paintings",
        name: "Handcrafts & Paintings",
        image: require("@/assets/images/furniture/handicrafts-paintings.png"),
      },
    ],
  },
  {
    id: "books-sports-hobbies",
    name: "Books, Sports & hobbies",
    image: require("@/assets/images/s-books-sports-hobbies.webp"),
    subs: [
      {
        id: "musical-instruments",
        name: "Musical Instruments",
        image: require("@/assets/images/sports-hobbies/musical-instruments.png"),
        types: [
          {
            id: "guitars",
            name: "Guitars",
            image: require("@/assets/images/sports-hobbies/musical-instruments.png"),
          },
          {
            id: "pianos",
            name: "Pianos",
            image: require("@/assets/images/sports-hobbies/musical-instruments.png"),
          },
          {
            id: "drums",
            name: "Drums",
            image: require("@/assets/images/sports-hobbies/musical-instruments.png"),
          },
          {
            id: "bass",
            name: "Bass",
            image: require("@/assets/images/sports-hobbies/musical-instruments.png"),
          },
          {
            id: "violin",
            name: "Violin",
            image: require("@/assets/images/sports-hobbies/musical-instruments.png"),
          },
          {
            id: "guitar",
            name: "Guitar",
            image: require("@/assets/images/sports-hobbies/musical-instruments.png"),
          },
        ],
      },
      {
        id: "books",
        name: "Books",
        image: require("@/assets/images/sports-hobbies/books.jpg"),
      },
      {
        id: "cds-dvds-vhs",
        name: "CDs, DVDs, VHS",
        image: require("@/assets/images/sports-hobbies/cds-dvds-vhs.jpg"),
      },
      {
        id: "sports-equipment",
        name: "Sports Equipment",
        image: require("@/assets/images/sports-hobbies/sports-equipment.png"),
      },
      {
        id: "fishing",
        name: "Fishing",
        image: require("@/assets/images/sports-hobbies/fishing.png"),
      },
      {
        id: "hike-and-camp",
        name: "Hike & Camp",
        image: require("@/assets/images/sports-hobbies/hike-and-camp.png"),
      },
      {
        id: "others",
        name: "Others",
        image: require("@/assets/images/sports-hobbies/others.png"),
      },
    ],
  },
  {
    id: "pets",
    name: "Pets",
    image: require("@/assets/images/s-pets.webp"),
    subs: [
      {
        id: "dogs",
        name: "Dogs",
        image: require("@/assets/images/pet/dogs.png"),
      },
      {
        id: "cats",
        name: "Cats",
        image: require("@/assets/images/pet/cats.png"),
      },
      {
        id: "birds",
        name: "Birds",
        image: require("@/assets/images/pet/birds.png"),
      },
      {
        id: "fish",
        name: "Fish",
        image: require("@/assets/images/pet/fish.png"),
      },
      {
        id: "reptiles",
        name: "Reptiles",
        image: require("@/assets/images/pet/others.png"),
      },
      {
        id: "pet-food",
        name: "Pet Food",
        image: require("@/assets/images/pet/pet-food.png"),
      },
      {
        id: "pet-accessories",
        name: "Pet Accessories",
        image: require("@/assets/images/pet/pet-accessories.png"),
      },
    ],
  },
  {
    id: "foods",
    name: "Foods",
    image: require("@/assets/images/s-foods.webp"),
    subs: [
      {
        id: "fruits",
        name: "Fruits",
        image: require("@/assets/images/food/fruits.png"),
      },
      {
        id: "vegetables",
        name: "Vegetables",
        image: require("@/assets/images/food/vegetables.png"),
      },
      {
        id: "grains",
        name: "Rice & Cereal",
        image: require("@/assets/images/food/rice-and-cereal.png"),
      },
      {
        id: "bread-and-bakery",
        name: "Bread & Bakery",
        image: require("@/assets/images/food/bread-and-bakery.png"),
      },
      {
        id: "meat",
        name: "Meat",
        image: require("@/assets/images/food/meat.png"),
      },
      {
        id: "seafood",
        name: "Seafood",
        image: require("@/assets/images/food/seafood.png"),
      },
      {
        id: "beverages",
        name: "Beverages",
        image: require("@/assets/images/food/beverages.png"),
      },
      {
        id: "beer-and-wine",
        name: "Beer & Wine",
        image: require("@/assets/images/food/beer-and-wine.png"),
      },
      {
        id: "grocery",
        name: "Grocery & Sauces",
        image: require("@/assets/images/food/grocery.png"),
      },
      {
        id: "others",
        name: "Others",
        image: require("@/assets/images/food/others.png"),
      },
    ],
  },
];

export default CATEGORIES;
