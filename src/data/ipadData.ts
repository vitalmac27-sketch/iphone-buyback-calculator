export interface IpadModel {
  id: string;
  name: string;
  year: number;
  ssdOptions: number[];
  basePrice: number;
}

export const ipadModels: IpadModel[] = [
  // Oldest first
  { id: "ipad10", name: "iPad (10-е поколение)", year: 2023, ssdOptions: [64, 256], basePrice: 18000 },
  { id: "mini6", name: "iPad mini (6-е поколение)", year: 2023, ssdOptions: [64, 256], basePrice: 20000 },
  { id: "air5", name: "iPad Air (5-е поколение)", year: 2023, ssdOptions: [64, 256], basePrice: 25000 },
  { id: "pro_m2_11", name: 'iPad Pro 11" (M2)', year: 2023, ssdOptions: [128, 256, 512, 1024, 2048], basePrice: 40000 },
  { id: "pro_m2_13", name: 'iPad Pro 12.9" (M2)', year: 2023, ssdOptions: [128, 256, 512, 1024, 2048], basePrice: 50000 },
  { id: "mini7", name: "iPad mini (7-е поколение)", year: 2024, ssdOptions: [128, 256, 512], basePrice: 28000 },
  { id: "pro_m4_11", name: 'iPad Pro 11" (M4)', year: 2024, ssdOptions: [256, 512, 1024, 2048], basePrice: 55000 },
  { id: "pro_m4_13", name: 'iPad Pro 13" (M4)', year: 2024, ssdOptions: [256, 512, 1024, 2048], basePrice: 70000 },
  { id: "ipad11", name: "iPad (11-е поколение)", year: 2025, ssdOptions: [128, 256, 512], basePrice: 22000 },
  { id: "air_m3_11", name: 'iPad Air 11" (M3)', year: 2025, ssdOptions: [128, 256, 512, 1024], basePrice: 35000 },
  { id: "air_m3_13", name: 'iPad Air 13" (M3)', year: 2025, ssdOptions: [128, 256, 512, 1024], basePrice: 42000 },
  { id: "pro_m5_11", name: 'iPad Pro 11" (M5)', year: 2025, ssdOptions: [256, 512, 1024, 2048], basePrice: 60000 },
  { id: "pro_m5_13", name: 'iPad Pro 13" (M5)', year: 2025, ssdOptions: [256, 512, 1024, 2048], basePrice: 75000 },
  { id: "air_m4_11", name: 'iPad Air 11" (M4)', year: 2026, ssdOptions: [128, 256, 512, 1024], basePrice: 40000 },
  { id: "air_m4_13", name: 'iPad Air 13" (M4)', year: 2026, ssdOptions: [128, 256, 512, 1024], basePrice: 48000 },
];

export const formatSsd = (gb: number): string => {
  if (gb >= 1024) return `${gb / 1024} ТБ`;
  return `${gb} ГБ`;
};

export const getSsdMultiplier = (ssd: number, options: number[]): number => {
  const minSsd = Math.min(...options);
  const ratio = ssd / minSsd;
  if (ratio <= 1) return 1.0;
  if (ratio <= 2) return 1.1;
  if (ratio <= 4) return 1.2;
  if (ratio <= 8) return 1.35;
  if (ratio <= 16) return 1.5;
  return 1.6;
};

export interface IpadConditionOption {
  id: string;
  label: string;
  description: string;
  multiplier: number;
}

export const ipadScreenOptions: IpadConditionOption[] = [
  { id: "perfect", label: "Без дефектов", description: "Экран без царапин и повреждений", multiplier: 1.0 },
  { id: "minor", label: "Мелкие царапины", description: "Незначительные следы использования", multiplier: 0.95 },
  { id: "scratched", label: "Заметные царапины", description: "Видимые царапины на экране", multiplier: 0.85 },
  { id: "damaged", label: "Повреждён", description: "Трещины, пятна или неработающие области", multiplier: 0.6 },
];

export const ipadBodyOptions: IpadConditionOption[] = [
  { id: "ideal", label: "Идеальное", description: "Без царапин и потёртостей, как новый", multiplier: 1.0 },
  { id: "good", label: "Хорошее", description: "Минимальные следы использования", multiplier: 0.92 },
  { id: "normal", label: "Среднее", description: "Заметные царапины и потёртости", multiplier: 0.8 },
  { id: "bad", label: "Плохое", description: "Сильные повреждения, вмятины", multiplier: 0.6 },
];

export type CompletenessItem = "box" | "cable" | "receipt";

export const completenessItems: { id: CompletenessItem; label: string }[] = [
  { id: "box", label: "Коробка" },
  { id: "cable", label: "Кабель" },
  { id: "receipt", label: "Чек" },
];

export const getCompletenessMultiplier = (items: CompletenessItem[]): number => {
  if (items.length === 3) return 1.0;
  if (items.length === 2) return 0.97;
  if (items.length === 1) return 0.95;
  return 0.93;
};
