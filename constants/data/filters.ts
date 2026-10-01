import { FilterItem } from "@/components/category/FilterChips";

// ===== Filter Configurations =====

/** Vehicles: Filters, Location, Sort, Price, Year, Condition */
export const vehicleFilters: FilterItem[] = [
  { label: "Filters", icon: "options" },
  { label: "Location", icon: "location-sharp", hasDropdown: true },
  { label: "Sort", hasDropdown: true },
  { label: "Price", hasDropdown: true },
  { label: "Year", hasDropdown: true },
  { label: "Condition", hasDropdown: true },
];

/** Basic items: Filters, Location, Sort, Price, Condition */
export const basicFilters: FilterItem[] = [
  { label: "Filters", icon: "options" },
  { label: "Location", icon: "location-sharp", hasDropdown: true },
  { label: "Sort", hasDropdown: true },
  { label: "Price", hasDropdown: true },
  { label: "Condition", hasDropdown: true },
];

/** Phones/Tablets: Filters, Location, Sort, Price, Storage, Condition */
export const phonesFilters: FilterItem[] = [
  { label: "Filters", icon: "options" },
  { label: "Location", icon: "location-sharp", hasDropdown: true },
  { label: "Sort", hasDropdown: true },
  { label: "Price", hasDropdown: true },
  { label: "Storage", hasDropdown: true },
  { label: "Condition", hasDropdown: true },
];

/** Properties: Filters, Location, Sort, Price, Size */
export const houseFilters: FilterItem[] = [
  { label: "Filters", icon: "options" },
  { label: "Location", icon: "location-sharp", hasDropdown: true },
  { label: "Sort", hasDropdown: true },
  { label: "Price", hasDropdown: true },
  { label: "Size", hasDropdown: true },
];

/** Jobs: Filters, Location, Sort, Salary, Experience */
export const jobsFilters: FilterItem[] = [
  { label: "Filters", icon: "options" },
  { label: "Location", icon: "location-sharp", hasDropdown: true },
  { label: "Sort", hasDropdown: true },
  { label: "Salary", hasDropdown: true },
  { label: "Experience", hasDropdown: true },
];

/** Minimal: Filters, Location, Sort */
export const defaultFilters: FilterItem[] = [
  { label: "Filters", icon: "options" },
  { label: "Location", icon: "location-sharp", hasDropdown: true },
  { label: "Sort", hasDropdown: true },
];

/** Furniture: Filters, Location, Sort, Price, Type */
export const furnitureFilters: FilterItem[] = [
  { label: "Filters", icon: "options" },
  { label: "Location", icon: "location-sharp", hasDropdown: true },
  { label: "Sort", hasDropdown: true },
  { label: "Price", hasDropdown: true },
  { label: "Type", hasDropdown: true },
];

// ===== Category Filter Mappings =====

/** Categories that use vehicle filters (year + condition) */
const vehicleSubCategories = new Set(["car-for-sale", "motorcycle-for-sale"]);

/** Categories that use basic filters (price + condition) */
const basicSubCategories = new Set([
  "bicycles",
  "lorries-vans-and-vehicles",
  "parts-and-accessories",
  "smart-watches",
  "phone-accessories",
  "monitor",
  "printer-and-scanners",
  "part-accessories",
  "washing-machine-and-dryer",
  "fridge-and-freezers",
  "air-conditioner-and-heating",
  "consumer-electronics",
  "cameras-and-camcorders",
  "tvs-video-and-audio",
  "home-appliances",
  "video-games-consoles-types",
  "musical-instruments",
]);

/** Categories that use phone filters (storage + condition) */
const phoneSubCategories = new Set([
  "phones",
  "tablets",
  "laptop",
  "desktop",
  "all-in-one",
]);

/** Categories that use house filters (price + size) */
const houseSubCategories = new Set([
  "house-for-sale",
  "house-for-rent",
  "condo-for-sale",
  "apartment-for-rent",
  "land-for-sale",
  "land-for-rent",
  "commercial-property-for-sale",
  "commercial-property-for-rent",
  "room-for-rent",
  "other-property",
]);

/** Categories that use default/minimal filters */
const defaultSubCategories = new Set(["properties-wanted", "agent-services"]);

/** Categories that use furniture filters (price + type) */
const furnitureSubCategories = new Set([
  "tables-and-desks",
  "chairs-and-sofas",
]);

// ===== Main Filter Lookup Function =====

/**
 * Get the appropriate filters for a category/subcategory combination.
 * @param categoryId - The main category ID (e.g., "jobs", "properties")
 * @param subCategoryId - The subcategory ID (e.g., "phones", "car-for-sale")
 * @param hasBothBrandsAndTypes - Whether the subcategory has both brands and types
 * @returns The appropriate filter array or undefined for defaults
 */
export function getFiltersForCategory(
  categoryId: string | string[] | undefined,
  subCategoryId?: string | string[] | undefined,
  hasBothBrandsAndTypes?: boolean,
): FilterItem[] | undefined {
  const catId = Array.isArray(categoryId) ? categoryId[0] : categoryId;
  const subId = Array.isArray(subCategoryId) ? subCategoryId[0] : subCategoryId;

  // Category-level filters (all subcategories inherit)
  if (catId === "jobs") return jobsFilters;
  if (catId === "services") return defaultFilters;
  if (catId === "properties" && !subId) return houseFilters;

  // Subcategory-level filters
  if (subId) {
    // Has both brands AND types = vehicle category (e.g., car-for-sale)
    if (hasBothBrandsAndTypes) return vehicleFilters;

    if (vehicleSubCategories.has(subId)) return vehicleFilters;
    if (basicSubCategories.has(subId)) return basicFilters;
    if (phoneSubCategories.has(subId)) return phonesFilters;
    if (houseSubCategories.has(subId)) return houseFilters;
    if (defaultSubCategories.has(subId)) return defaultFilters;
    if (furnitureSubCategories.has(subId)) return furnitureFilters;
  }

  return undefined; // Use FiltersRow default
}
