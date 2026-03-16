export interface PhoneModel {
  id: string;
  name: string;
  basePrice: number;
  supported: boolean;
}

export interface StorageOption {
  id: string;
  label: string;
  multiplier: number;
}

export interface ConditionOption {
  id: string;
  label: string;
  description: string;
  multiplier: number;
}

export const phoneModels: PhoneModel[] = [
  { id: "17pm", name: "iPhone 17 Pro Max", basePrice: 130000, supported: true },
  { id: "17p", name: "iPhone 17 Pro", basePrice: 110000, supported: true },
  { id: "17", name: "iPhone 17", basePrice: 80000, supported: true },
  { id: "17air", name: "iPhone 17 Air", basePrice: 85000, supported: true },
  { id: "16pm", name: "iPhone 16 Pro Max", basePrice: 95000, supported: true },
  { id: "16p", name: "iPhone 16 Pro", basePrice: 80000, supported: true },
  { id: "16", name: "iPhone 16", basePrice: 60000, supported: true },
  { id: "16plus", name: "iPhone 16 Plus", basePrice: 65000, supported: true },
  { id: "15pm", name: "iPhone 15 Pro Max", basePrice: 75000, supported: true },
  { id: "15p", name: "iPhone 15 Pro", basePrice: 65000, supported: true },
  { id: "15", name: "iPhone 15", basePrice: 48000, supported: true },
  { id: "15plus", name: "iPhone 15 Plus", basePrice: 52000, supported: true },
  { id: "14pm", name: "iPhone 14 Pro Max", basePrice: 55000, supported: true },
  { id: "14p", name: "iPhone 14 Pro", basePrice: 48000, supported: true },
  { id: "14", name: "iPhone 14", basePrice: 35000, supported: true },
  { id: "14plus", name: "iPhone 14 Plus", basePrice: 38000, supported: true },
  { id: "13pm", name: "iPhone 13 Pro Max", basePrice: 42000, supported: true },
  { id: "13p", name: "iPhone 13 Pro", basePrice: 36000, supported: true },
  { id: "13", name: "iPhone 13", basePrice: 25000, supported: true },
  { id: "13mini", name: "iPhone 13 Mini", basePrice: 22000, supported: true },
  { id: "12pm", name: "iPhone 12 Pro Max", basePrice: 32000, supported: false },
  { id: "12p", name: "iPhone 12 Pro", basePrice: 27000, supported: false },
  { id: "12", name: "iPhone 12", basePrice: 20000, supported: false },
  { id: "12mini", name: "iPhone 12 Mini", basePrice: 15000, supported: false },
  { id: "11pm", name: "iPhone 11 Pro Max", basePrice: 24000, supported: false },
  { id: "11p", name: "iPhone 11 Pro", basePrice: 20000, supported: false },
  { id: "11", name: "iPhone 11", basePrice: 14000, supported: false },
  { id: "se3", name: "iPhone SE (3-е поколение)", basePrice: 12000, supported: false },
  { id: "se2", name: "iPhone SE (2-е поколение)", basePrice: 8000, supported: false },
  { id: "other", name: "Другая модель", basePrice: 0, supported: false },
];

export const storageOptions: StorageOption[] = [
  { id: "128", label: "128 ГБ", multiplier: 1.0 },
  { id: "256", label: "256 ГБ", multiplier: 1.1 },
  { id: "512", label: "512 ГБ", multiplier: 1.2 },
  { id: "1024", label: "1 ТБ", multiplier: 1.35 },
  { id: "2048", label: "2 ТБ", multiplier: 1.5 },
];

export const conditionOptions: ConditionOption[] = [
  { id: "ideal", label: "Идеальное", description: "Без царапин и потёртостей, как новый", multiplier: 1.0 },
  { id: "good", label: "Хорошее", description: "Минимальные следы использования", multiplier: 0.9 },
  { id: "normal", label: "Среднее", description: "Заметные царапины и потёртости", multiplier: 0.75 },
  { id: "bad", label: "Плохое", description: "Сильные повреждения, трещины", multiplier: 0.55 },
];

export const screenOptions: ConditionOption[] = [
  { id: "original_perfect", label: "Без дефектов", description: "Родной экран Apple без повреждений", multiplier: 1.0 },
  { id: "original_scratched", label: "Есть царапины", description: "Родной экран с косметическими дефектами", multiplier: 0.92 },
  { id: "replaced", label: "Заменён", description: "Экран был заменён (не оригинал)", multiplier: 0.8 },
  { id: "cracked", label: "Разбит", description: "Экран треснут или не работает", multiplier: 0.6 },
];

export const batteryOptions: ConditionOption[] = [
  { id: "100", label: "100%", description: "Новая батарея", multiplier: 1.0 },
  { id: "97_99", label: "97–99%", description: "Отличная ёмкость", multiplier: 0.99 },
  { id: "94_96", label: "94–96%", description: "Очень хорошая ёмкость", multiplier: 0.97 },
  { id: "91_93", label: "91–93%", description: "Хорошая ёмкость", multiplier: 0.95 },
  { id: "88_90", label: "88–90%", description: "Нормальная ёмкость", multiplier: 0.93 },
  { id: "85_87", label: "85–87%", description: "Приемлемая ёмкость", multiplier: 0.9 },
];

export const complectnessOptions: ConditionOption[] = [
  { id: "full", label: "Полная комплектация", description: "Коробка и кабель", multiplier: 1.0 },
  { id: "partial", label: "Частичная", description: "Есть коробка или кабель", multiplier: 0.97 },
  { id: "none", label: "Только телефон", description: "Без аксессуаров и коробки", multiplier: 0.93 },
];

export type IphoneCompletenessItem = "box" | "cable" | "receipt";

export const iphoneCompletenessItems: { id: IphoneCompletenessItem; label: string }[] = [
  { id: "box", label: "Коробка" },
  { id: "cable", label: "Кабель" },
  { id: "receipt", label: "Чек" },
];

export const getIphoneCompletenessMultiplier = (items: IphoneCompletenessItem[]): number => {
  if (items.length === 3) return 1.0;
  if (items.length === 2) return 0.97;
  if (items.length === 1) return 0.95;
  return 0.93;
};

export interface ColorOption {
  id: string;
  label: string;
  hex: string;
}

export const modelColors: Record<string, ColorOption[]> = {
  "17": [
    { id: "black", label: "Black", hex: "#1c1c1e" },
    { id: "blue", label: "Blue", hex: "#5b7fa6" },
    { id: "white", label: "White", hex: "#f5f5f0" },
    { id: "sage", label: "Sage", hex: "#a3b18a" },
    { id: "lavender", label: "Lavender", hex: "#b4a7d6" },
  ],
  "17air": [
    { id: "black", label: "Black", hex: "#1c1c1e" },
    { id: "blue", label: "Blue", hex: "#5b7fa6" },
    { id: "white", label: "White", hex: "#f5f5f0" },
    { id: "gold", label: "Gold", hex: "#d4a853" },
  ],
  "17p": [
    { id: "orange", label: "Orange", hex: "#d4764e" },
    { id: "blue", label: "Blue", hex: "#5b7fa6" },
    { id: "silver", label: "Silver", hex: "#c0c0c0" },
  ],
  "17pm": [
    { id: "orange", label: "Orange", hex: "#d4764e" },
    { id: "blue", label: "Blue", hex: "#5b7fa6" },
    { id: "silver", label: "Silver", hex: "#c0c0c0" },
  ],
};

// Color-specific base prices for iPhone 17 series (after -10,000 deduction)
// Key format: "modelId_storageId_colorId"
export const colorPrices: Record<string, number> = {
  // iPhone 17 256GB
  "17_256_black": 68500,
  "17_256_blue": 63500,
  "17_256_white": 68000,
  "17_256_sage": 64500,
  "17_256_lavender": 66000,
  // iPhone 17 512GB
  "17_512_black": 76500,
  "17_512_blue": 81000,
  "17_512_lavender": 87500,
  "17_512_sage": 85500,
  // iPhone 17 Air 256GB
  "17air_256_black": 73500,
  "17air_256_blue": 64500,
  "17air_256_white": 64000,
  "17air_256_gold": 64500,
  // iPhone 17 Air 512GB
  "17air_512_black": 95500,
  "17air_512_blue": 81500,
  "17air_512_white": 87500,
  // iPhone 17 Air 1TB
  "17air_1024_white": 102500,
  "17air_1024_gold": 98500,
  "17air_1024_blue": 94500,
  // iPhone 17 Pro 256GB
  "17p_256_orange": 95000,
  "17p_256_blue": 99000,
  "17p_256_silver": 104500,
  // iPhone 17 Pro 512GB
  "17p_512_orange": 116000,
  "17p_512_blue": 114500,
  "17p_512_silver": 125500,
  // iPhone 17 Pro 1TB
  "17p_1024_blue": 128000,
  "17p_1024_orange": 125500,
  "17p_1024_silver": 140500,
  // iPhone 17 Pro Max 256GB
  "17pm_256_orange": 108500,
  "17pm_256_silver": 111500,
  "17pm_256_blue": 108500,
  // iPhone 17 Pro Max 512GB
  "17pm_512_blue": 121000,
  "17pm_512_orange": 116500,
  "17pm_512_silver": 131500,
  // iPhone 17 Pro Max 1TB
  "17pm_1024_blue": 140500,
  "17pm_1024_orange": 138500,
  "17pm_1024_silver": 141500,
  // iPhone 17 Pro Max 2TB
  "17pm_2048_blue": 144500,
  "17pm_2048_orange": 142500,
};
