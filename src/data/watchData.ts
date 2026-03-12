export interface WatchModel {
  id: string;
  name: string;
  year: number;
  sizes: string[];
  basePrice: number;
}

export const watchModels: WatchModel[] = [
  { id: "se2", name: "Apple Watch SE (2nd gen)", year: 2022, sizes: ["40 mm", "44 mm"], basePrice: 5000 },
  { id: "series9", name: "Apple Watch Series 9", year: 2023, sizes: ["41 mm", "45 mm"], basePrice: 12000 },
  { id: "ultra2", name: "Apple Watch Ultra 2", year: 2023, sizes: ["49 mm"], basePrice: 25000 },
  { id: "series10", name: "Apple Watch Series 10", year: 2024, sizes: ["42 mm", "46 mm"], basePrice: 18000 },
  { id: "se3", name: "Apple Watch SE (3rd gen)", year: 2025, sizes: ["42 mm", "44 mm"], basePrice: 8000 },
  { id: "series11", name: "Apple Watch Series 11", year: 2025, sizes: ["42 mm", "46 mm"], basePrice: 22000 },
  { id: "ultra3", name: "Apple Watch Ultra 3", year: 2025, sizes: ["49 mm"], basePrice: 35000 },
];

export interface WatchConditionOption {
  id: string;
  label: string;
  description: string;
  multiplier: number;
}

export const watchScreenOptions: WatchConditionOption[] = [
  { id: "perfect", label: "Без дефектов", description: "Экран без царапин и повреждений", multiplier: 1.0 },
  { id: "minor", label: "Мелкие царапины", description: "Незначительные следы использования", multiplier: 0.95 },
  { id: "scratched", label: "Заметные царапины", description: "Видимые царапины на экране", multiplier: 0.85 },
  { id: "damaged", label: "Повреждён", description: "Трещины или неработающие области", multiplier: 0.6 },
];

export const watchBodyOptions: WatchConditionOption[] = [
  { id: "ideal", label: "Идеальное", description: "Без царапин и потёртостей, как новый", multiplier: 1.0 },
  { id: "good", label: "Хорошее", description: "Минимальные следы использования", multiplier: 0.92 },
  { id: "normal", label: "Среднее", description: "Заметные царапины и потёртости", multiplier: 0.8 },
  { id: "bad", label: "Плохое", description: "Сильные повреждения, вмятины", multiplier: 0.6 },
];

export type WatchCompletenessItem = "box" | "cable" | "receipt";

export const watchCompletenessItems: { id: WatchCompletenessItem; label: string }[] = [
  { id: "box", label: "Коробка" },
  { id: "cable", label: "Кабель зарядки" },
  { id: "receipt", label: "Чек" },
];

export const getWatchCompletenessMultiplier = (items: WatchCompletenessItem[]): number => {
  if (items.length === 3) return 1.0;
  if (items.length === 2) return 0.97;
  if (items.length === 1) return 0.95;
  return 0.93;
};

export const getSizeMultiplier = (size: string): number => {
  // Larger sizes are worth slightly more
  const mm = parseInt(size);
  if (mm >= 49) return 1.0;
  if (mm >= 45) return 1.0;
  if (mm >= 44) return 0.97;
  if (mm >= 42) return 0.95;
  if (mm >= 41) return 0.93;
  return 0.9;
};
