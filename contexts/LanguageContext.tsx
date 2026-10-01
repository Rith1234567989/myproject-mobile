import React, { createContext, useContext, useState } from "react";

export type LanguageCode = "en" | "km" | "zh" | "ko";

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: any;
}

export const LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: require("@/assets/images/en-language.png"),
  },
  {
    code: "km",
    name: "Khmer",
    nativeName: "ខ្មែរ",
    flag: require("@/assets/images/kh-language.png"),
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: require("@/assets/images/zh-language.png"),
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국인",
    flag: require("@/assets/images/ko-language.png"),
  },
];

// Dictionary translations for UI
const translations: Record<string, Record<string, string>> = {
  en: {
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    notifications: "Notifications",
    notification: "Notification",
    account: "Account",
    postAd: "Post Ad",
    search: "Search...",
    categories: "Categories",
    subcategories: "Subcategories",
    brands: "Brands",
    brand: "Brand",
    models: "Models",
    all: "All",
    filters: "Filters",
    sort: "Sort",
    price: "Price",
    salary: "Salary",
    location: "Location",
    fullTime: "Full-time",
    partTime: "Part-time",
    internship: "Internship",
    freelance: "Freelance",
    showMore: "Show More",
    condition: "Condition",
    description: "Description",
    contactSeller: "Contact Seller",
    saveChanges: "Save Changes",
    deleteListing: "Delete Listing",
    selectLanguage: "Change Language",
    home: "Home",
    chat: "Chat",
    sell: "Sell",
    accountProfile: "Account Profile",
    nearbyListings: "Nearby Listings",
    latestAds: "Latest Ads",
    seeAll: "See All",
    more: "More",
    less: "Less",
  },
  km: {
    settings: "ការកំណត់",
    language: "ភាសា",
    theme: "រចនាប័ទ្ម",
    notifications: "ការជូនដំណឹង",
    notification: "ការជូនដំណឹង",
    account: "គណនី",
    postAd: "ចុះផ្សាយទំនិញ",
    search: "ស្វែងរក...",
    categories: "ជំពូកទំនិញ",
    subcategories: "ប្រភេទរង",
    brands: "ម៉ាក",
    brand: "ម៉ាក",
    models: "ម៉ូឌែល",
    all: "ទាំងអស់",
    filters: "តម្រង",
    sort: "តម្រៀប",
    price: "តម្លៃ",
    salary: "ប្រាក់ខែ",
    location: "ទីតាំង",
    fullTime: "ពេញម៉ោង",
    partTime: "ក្រៅម៉ោង",
    internship: "ហាត់ការ",
    freelance: "Freelance",
    showMore: "បង្ហាញបន្ថែមទៀត",
    condition: "លក្ខខណ្ឌ",
    description: "ការពិពណ៌នា",
    contactSeller: "ទាក់ទងអ្នកលក់",
    saveChanges: "រក្សាទុកការផ្លាស់ប្តូរ",
    deleteListing: "លុបទំនិញនេះ",
    selectLanguage: "ជ្រើសរើសភាសា",
    home: "ទំព័រដើម",
    chat: "សារ",
    sell: "លក់",
    accountProfile: "គណនីរបស់ខ្ញុំ",
    nearbyListings: "ទំនិញនៅជិតអ្នក",
    latestAds: "ទំនិញថ្មីៗ",
    seeAll: "មើលទាំងអស់",
    more: "បន្ថែម",
    less: "តិចជាង",
  },
  zh: {
    settings: "设置",
    language: "语言",
    theme: "主题",
    notifications: "通知",
    notification: "通知",
    account: "账户",
    postAd: "发布商品",
    search: "搜索...",
    categories: "所有分类",
    subcategories: "子分类",
    brands: "品牌",
    brand: "品牌",
    models: "型号",
    all: "全部",
    price: "价格",
    location: "位置",
    condition: "成色",
    description: "详细说明",
    contactSeller: "联系卖家",
    saveChanges: "保存修改",
    deleteListing: "删除商品",
    selectLanguage: "选择语言",
    home: "首页",
    chat: "消息",
    sell: "发布",
    accountProfile: "个人中心",
    nearbyListings: "附近商品",
    latestAds: "最新商品",
    seeAll: "查看全部",
    more: "更多",
    less: "收起",
  },
  ko: {
    settings: "설정",
    language: "언어",
    theme: "테마",
    notifications: "알림",
    notification: "알림",
    account: "계정",
    postAd: "광고 등록",
    search: "검색...",
    categories: "카테고리",
    subcategories: "하위 카테고리",
    brands: "브랜드",
    brand: "브랜드",
    models: "모델",
    all: "전체",
    price: "가격",
    location: "위치",
    condition: "상태",
    description: "설명",
    contactSeller: "판매자 연락",
    saveChanges: "변경사항 저장",
    deleteListing: "삭제",
    selectLanguage: "언어 변경",
    home: "홈",
    chat: "채팅",
    sell: "판매",
    accountProfile: "계정 프로필",
    nearbyListings: "주변 상품",
    latestAds: "최신 상품",
    seeAll: "모두 보기",
    more: "더보기",
    less: "접기",
  },
};

// Category translations lookup for categories & subcategories
export const CATEGORY_TRANSLATIONS: Record<string, Record<string, string>> = {
  // Phones & Tablets Main & Subs
  "phones-tablets": {
    en: "Phones & Tablets",
    km: "ទូរស័ព្ទ និង ថេបប្លែត",
    zh: "手机和平板",
    ko: "휴대전화 및 태블릿",
  },
  phones: {
    en: "Phones",
    km: "ទូរស័ព្ទ",
    zh: "手机",
    ko: "휴대전화",
  },
  tablets: {
    en: "Tablets",
    km: "ថេបប្លែត",
    zh: "平板电脑",
    ko: "태블릿",
  },
  "smart-watches": {
    en: "Smart Watches",
    km: "នាឡិកាឆ្លាតវៃ",
    zh: "智能手表",
    ko: "스마트워치",
  },
  "phone-accessories": {
    en: "Phone Accessories",
    km: "គ្រឿងបន្លាស់ទូរស័ព្ទ",
    zh: "手机配件",
    ko: "휴대폰 액세서리",
  },
  "phone-numbers": {
    en: "Phone Numbers",
    km: "លេខទូរស័ព្ទ",
    zh: "手机靓号",
    ko: "전화번호",
  },

  // Cars & Vehicles Main & Subs
  "car-and-vehicles": {
    en: "Cars & Vehicles",
    km: "រថយន្ត និង យានយន្ត",
    zh: "汽车与交通工具",
    ko: "자동차 및 차량",
  },
  "cars-for-sale": {
    en: "Cars for Sale",
    km: "ឡានលក់",
    zh: "汽车出售",
    ko: "중고차 판매",
  },
  bicycles: {
    en: "Bicycles",
    km: "កង់",
    zh: "自行车",
    ko: "자전거",
  },
  "motorcycle-for-sale": {
    en: "Motorcycles for Sale",
    km: "ម៉ូតូលក់",
    zh: "摩托车出售",
    ko: "오토바이 판매",
  },
  "vehicles-for-rent": {
    en: "Vehicles for Rent",
    km: "យានយន្តសម្រាប់ជួល",
    zh: "车辆出租",
    ko: "차량 대여",
  },
  "maintenance-and-repair": {
    en: "Maintenance & Repair",
    km: "ថែទាំ និង ជួសជុល",
    zh: "维修保养",
    ko: "정비 및 수리",
  },
  "lorries-vans-and-vehicles": {
    en: "Lorries, Vans & Vehicles",
    km: "រថយន្តដឹកទំនិញ និង វ៉ាន់",
    zh: "货车和客车",
    ko: "트럭 및 밴",
  },
  "financing-and-insurance": {
    en: "Financing & Insurance",
    km: "កម្ចី និង ធានារ៉ាប់រង",
    zh: "金融保险",
    ko: "금융 및 보험",
  },
  "tuk-tuk-and-remork": {
    en: "Tuk Tuk & Remork",
    km: "រ៉ឺម៉ក និង តុចតុច",
    zh: "嘟嘟车和拖车",
    ko: "툭툭 및 리목",
  },
  "parts-and-accessories": {
    en: "Parts & Accessories",
    km: "គ្រឿងបន្លាស់",
    zh: "零部件与配件",
    ko: "부품 및 액세서리",
  },

  // Computers & Accessories Main & Subs
  "computers-accessories": {
    en: "Computers & Accessories",
    km: "កុំព្យូទ័រ និង គ្រឿងបន្លាស់",
    zh: "电脑及配件",
    ko: "컴퓨터 및 액세서리",
  },
  laptops: {
    en: "Laptops",
    km: "កុំព្យូទ័រយួរដៃ",
    zh: "笔记本电脑",
    ko: "노트북",
  },
  desktops: {
    en: "Desktops",
    km: "កុំព្យូទ័រលើតុ",
    zh: "台式电脑",
    ko: "데스크톱",
  },
  "computer-accessories": {
    en: "Computer Accessories",
    km: "គ្រឿងបន្លាស់កុំព្យូទ័រ",
    zh: "电脑配件",
    ko: "컴퓨터 액세서리",
  },
  monitors: {
    en: "Monitors",
    km: "អេក្រង់កុំព្យូទ័រ",
    zh: "显示器",
    ko: "모니터",
  },
  "printers-scanners": {
    en: "Printers & Scanners",
    km: "ម៉ាស៊ីនបោះពុម្ព និង ស្កែន",
    zh: "打印机和扫描仪",
    ko: "프린터 및 스캐너",
  },

  // Electronics & Appliances Main & Subs
  "electronics-appliances": {
    en: "Electronics & Appliances",
    km: "ឧបករណ៍អេឡិចត្រូនិក",
    zh: "电子家电",
    ko: "가전 및 전자제품",
  },
  "washing-machine-dryers": {
    en: "Washing Machine & Dryers",
    km: "ម៉ាស៊ីនបោក និង សម្ងួតខោអាវ",
    zh: "洗衣机和烘干机",
    ko: "세탁기 및 건조기",
  },
  "fridge-freezers": {
    en: "Fridge & Freezers",
    km: "ទូទឹកកក និង ទូក្លាសេ",
    zh: "冰箱和冷柜",
    ko: "냉장고 및 냉동고",
  },
  "air-conditioner-heating": {
    en: "Air Conditioner & Heating",
    km: "ម៉ាស៊ីនត្រជាក់ និង កង្ហារ",
    zh: "空调与制暖",
    ko: "에어컨 및 난방",
  },
  "tv-video-audio": {
    en: "TV, Video & Audio",
    km: "ទូរទស្សន៍ និង គ្រឿងសំឡេង",
    zh: "电视影音",
    ko: "TV, 비디오 및 오디오",
  },
  "home-appliances": {
    en: "Home Appliances",
    km: "ឧបករណ៍ប្រើប្រាស់ក្នុងផ្ទះ",
    zh: "家用电器",
    ko: "가전제품",
  },
  "cameras-camcorders": {
    en: "Cameras & Camcorders",
    km: "ម៉ាស៊ីនថតរូប",
    zh: "相机摄影",
    ko: "카메라 및 캠코더",
  },

  // House & Land Main & Subs
  "property-housing-rentals": {
    en: "House & Land",
    km: "ផ្ទះ និង ដី",
    zh: "房产土地",
    ko: "주택 및 토지",
  },
  "house-for-sale": {
    en: "House for Sale",
    km: "ផ្ទះលក់",
    zh: "房屋出售",
    ko: "주택 매매",
  },
  "house-for-rent": {
    en: "House for Rent",
    km: "ផ្ទះជួល",
    zh: "房屋出租",
    ko: "주택 임대",
  },
  "land-for-sale": {
    en: "Land for Sale",
    km: "ដីលក់",
    zh: "土地出售",
    ko: "토지 매매",
  },
  "land-for-rent": {
    en: "Land for Rent",
    km: "ដីជួល",
    zh: "土地出租",
    ko: "토지 임대",
  },
  "commercial-property": {
    en: "Commercial Property",
    km: "អចលនទ្រព្យពាណិជ្ជកម្ម",
    zh: "商业地产",
    ko: "상업용 부동산",
  },

  // Other Mains
  "catering-restaurant": {
    en: "Catering/ Restaurant",
    km: "សេវាម្ហូបអាហារ និង ភោជនីយដ្ឋាន",
    zh: "餐饮与饭店",
    ko: "케이터링 및 레스토랑",
  },
  jobs: {
    en: "Jobs",
    km: "ការងារ",
    zh: "招聘求职",
    ko: "일자리",
  },
  services: {
    en: "Services",
    km: "សេវាកម្ម",
    zh: "生活服务",
    ko: "서비스",
  },
  "financial-services": { en: "Financial Services", km: "សេវាហិរញ្ញវត្ថុ" },
  "travel-tourism": { en: "Travel & Tourism", km: "ការធ្វើដំណើរ និង ទេសចរណ៍" },
  "automotive-services": { en: "Automotive Services", km: "រថយន្ត" },
  "advertising-media": { en: "Advertising & Media", km: "ការផ្សាយពាណិជ្ជកម្ម & ប្រព័ន្ធផ្សព្វផ្សាយ" },
  "wedding-decor": { en: "Wedding & Ceremony Decor", km: "សំអាងការ" },
  "cleaning-housekeeper": { en: "Cleaning & Housekeeping", km: "សេវាសំអាត& មេផ្ទះ" },
  "construction-architecture": { en: "Construction & Architecture", km: "សំណង់ ស្ថាបត្យកម្ម និងផ្នែកខាងក្នុង" },
  "engineering-services": { en: "Engineering Services", km: "សេវាកម្មវិស្វកម្ម" },
  "massage-spa": { en: "Massage & Spa", km: "ម៉ាសារ & ស្ប៉ា" },
  "hospitality-tourism": { en: "Hospitality & Tourism", km: "បដិសណ្ឋារកិច្ច និង ទេសចរ" },
  "health-medical": { en: "Health & Medical", km: "សុខភាព វេជ្ជសាស្ត្រ & ឱសថ" },
  "it-telecom": { en: "IT & Telecommunication", km: "អាយធី & ទូរគមនាគមន៍" },
  "design-renovation": { en: "Design & Renovation", km: "រចនា និង កែកម្អ" },
  "legal-services": { en: "Legal Services", km: "សេវាច្បាប់" },
  "transportation-services": { en: "Transportation Services", km: "សេវាកម្មដឹកជញ្ជូន" },
  "plumbing-electrical": { en: "Plumbing & Electrical", km: "បំពង់ទឹក & អគ្គិសនី" },
  "real-estate-services": { en: "Real Estate Services", km: "សេវាកម្មអចលនទ្រព្យ" },
  science: { en: "Science", km: "វិទ្យាសាស្ត្រ" },
  "supply-logistics": { en: "Supply & Logistics", km: "ផ្គត់ផ្គង់ & ដឹកជញ្ជូន" },
  "printing-publishing": { en: "Printing & Publishing", km: "បោះពុម្ពផ្សាយ" },
  "other-services": { en: "Other Services", km: "សេវាកម្មផ្សេងទៀត" },
  "fashion-beauty": {
    en: "Fashion & Beauty",
    km: "ម៉ូដ និង សម្រស់",
    zh: "时尚美容",
    ko: "패션 및 뷰티",
  },
  "furniture-decor": {
    en: "Furniture & Decor",
    km: "គ្រឿងសង្ហារឹម",
    zh: "家具家居",
    ko: "가구 및 장식",
  },
  "books-sports-hobbies": {
    en: "Books & Sports",
    km: "សៀវភៅ និង កីឡា",
    zh: "图书体育",
    ko: "도서 및 스포츠",
  },
  pets: {
    en: "Pets",
    km: "សត្វចិញ្ចឹម",
    zh: "宠物",
    ko: "반려동물",
  },
  foods: {
    en: "Foods",
    km: "អាហារ និង ភេសជ្ជៈ",
    zh: "食品美食",
    ko: "식품 및 음료",
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  getCategoryName: (id: string, defaultName: string) => string;
  currentLanguageObj: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  getCategoryName: (_, defaultName) => defaultName,
  currentLanguageObj: LANGUAGES[0],
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<LanguageCode>("en");

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const getCategoryName = (id: string, defaultName: string): string => {
    if (language === "en") return defaultName;

    // 1. Direct ID match
    if (id && CATEGORY_TRANSLATIONS[id]?.[language]) {
      return CATEGORY_TRANSLATIONS[id][language];
    }

    // 2. Normalized ID match
    const normId = id?.toLowerCase().trim();
    if (normId && CATEGORY_TRANSLATIONS[normId]?.[language]) {
      return CATEGORY_TRANSLATIONS[normId][language];
    }

    // 3. English text name match
    if (defaultName) {
      const normName = defaultName.toLowerCase().trim();
      const matchedKey = Object.keys(CATEGORY_TRANSLATIONS).find(
        (key) =>
          CATEGORY_TRANSLATIONS[key]?.en?.toLowerCase().trim() === normName
      );
      if (matchedKey && CATEGORY_TRANSLATIONS[matchedKey]?.[language]) {
        return CATEGORY_TRANSLATIONS[matchedKey][language];
      }
    }

    return defaultName;
  };

  const currentLanguageObj =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getCategoryName,
        currentLanguageObj,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
