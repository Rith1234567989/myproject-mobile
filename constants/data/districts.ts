import { District, Commune } from "@/types/location";

export interface DistrictWithCommunes {
  id: string;
  name: string;
  communes: { id: string; name: string }[];
}

// Districts by province - showing main districts for popular provinces
export const DISTRICTS_BY_PROVINCE: Record<string, DistrictWithCommunes[]> = {
  "phnom-penh": [
    {
      id: "chamkar-mon",
      name: "Chamkar Mon",
      communes: [
        { id: "tonle-bassac", name: "Tonle Bassac" },
        { id: "boeung-keng-kang-1", name: "Boeung Keng Kang 1" },
        { id: "boeung-keng-kang-2", name: "Boeung Keng Kang 2" },
        { id: "boeung-keng-kang-3", name: "Boeung Keng Kang 3" },
        { id: "tuol-svay-prey-1", name: "Tuol Svay Prey 1" },
        { id: "tuol-svay-prey-2", name: "Tuol Svay Prey 2" },
      ],
    },
    {
      id: "daun-penh",
      name: "Daun Penh",
      communes: [
        { id: "wat-phnom", name: "Wat Phnom" },
        { id: "srah-chak", name: "Srah Chak" },
        { id: "phsar-thmei-1", name: "Phsar Thmei 1" },
        { id: "phsar-thmei-2", name: "Phsar Thmei 2" },
        { id: "phsar-thmei-3", name: "Phsar Thmei 3" },
        { id: "boeng-raing", name: "Boeng Raing" },
      ],
    },
    {
      id: "7-makara",
      name: "7 Makara",
      communes: [
        { id: "veal-vong", name: "Veal Vong" },
        { id: "mittapheap", name: "Mittapheap" },
        { id: "olympia", name: "Olympia" },
      ],
    },
    {
      id: "toul-kork",
      name: "Toul Kork",
      communes: [
        { id: "boeung-kak-1", name: "Boeung Kak 1" },
        { id: "boeung-kak-2", name: "Boeung Kak 2" },
        { id: "phsar-depou-1", name: "Phsar Depou 1" },
        { id: "phsar-depou-2", name: "Phsar Depou 2" },
        { id: "teuk-laak-1", name: "Teuk Laak 1" },
        { id: "teuk-laak-2", name: "Teuk Laak 2" },
        { id: "teuk-laak-3", name: "Teuk Laak 3" },
      ],
    },
    {
      id: "meanchey",
      name: "Meanchey",
      communes: [
        { id: "stueng-meanchey-1", name: "Stueng Meanchey 1" },
        { id: "stueng-meanchey-2", name: "Stueng Meanchey 2" },
        { id: "stueng-meanchey-3", name: "Stueng Meanchey 3" },
        { id: "boeng-tompun-1", name: "Boeng Tompun 1" },
        { id: "boeng-tompun-2", name: "Boeng Tompun 2" },
      ],
    },
    {
      id: "sen-sok",
      name: "Sen Sok",
      communes: [
        { id: "khmuonh", name: "Khmuonh" },
        { id: "phnom-penh-thmei", name: "Phnom Penh Thmei" },
        { id: "tuek-thla", name: "Tuek Thla" },
        { id: "kouk-khleang", name: "Kouk Khleang" },
      ],
    },
    {
      id: "russey-keo",
      name: "Russey Keo",
      communes: [
        { id: "tuol-sangke", name: "Tuol Sangke" },
        { id: "russey-keo", name: "Russey Keo" },
        { id: "svay-pak", name: "Svay Pak" },
        { id: "kilomaetr-lekh-6", name: "Kilomaetr Lekh 6" },
      ],
    },
    {
      id: "por-sen-chey",
      name: "Por Sen Chey",
      communes: [
        { id: "chaom-chau-1", name: "Chaom Chau 1" },
        { id: "chaom-chau-2", name: "Chaom Chau 2" },
        { id: "kakab-1", name: "Kakab 1" },
        { id: "kakab-2", name: "Kakab 2" },
        { id: "trapeang-krasang", name: "Trapeang Krasang" },
      ],
    },
    {
      id: "chroy-changvar",
      name: "Chroy Changvar",
      communes: [
        { id: "chroy-changvar", name: "Chroy Changvar" },
        { id: "preaek-ta-sek", name: "Preaek Ta Sek" },
        { id: "preaek-lieb", name: "Preaek Lieb" },
      ],
    },
  ],
  "siem-reap": [
    {
      id: "siem-reap-city",
      name: "Siem Reap City",
      communes: [
        { id: "sla-kram", name: "Sla Kram" },
        { id: "svay-dangkum", name: "Svay Dangkum" },
        { id: "sala-kamraeuk", name: "Sala Kamraeuk" },
        { id: "siem-reap", name: "Siem Reap" },
        { id: "kouk-chak", name: "Kouk Chak" },
      ],
    },
    {
      id: "angkor-thom",
      name: "Angkor Thom",
      communes: [
        { id: "leang-dai", name: "Leang Dai" },
        { id: "nokor-thom", name: "Nokor Thom" },
      ],
    },
  ],
  battambang: [
    {
      id: "battambang-city",
      name: "Battambang City",
      communes: [
        { id: "svay-por", name: "Svay Por" },
        { id: "sla-ket", name: "Sla Ket" },
        { id: "o-char", name: "O Char" },
        { id: "rotanak", name: "Rotanak" },
        { id: "chamkar-samraong", name: "Chamkar Samraong" },
      ],
    },
  ],
  kandal: [
    {
      id: "ta-khmau",
      name: "Ta Khmau",
      communes: [
        { id: "ta-khmau", name: "Ta Khmau" },
        { id: "preaek-hou", name: "Preaek Hou" },
        { id: "kampong-samnanh", name: "Kampong Samnanh" },
      ],
    },
  ],
};

// Get districts for a province (returns empty array if not found)
export function getDistrictsForProvince(provinceId: string): DistrictWithCommunes[] {
  return DISTRICTS_BY_PROVINCE[provinceId] || [];
}

// Get communes for a district
export function getCommunesForDistrict(
  provinceId: string,
  districtId: string,
): { id: string; name: string }[] {
  const districts = DISTRICTS_BY_PROVINCE[provinceId] || [];
  const district = districts.find((d) => d.id === districtId);
  return district?.communes || [];
}
