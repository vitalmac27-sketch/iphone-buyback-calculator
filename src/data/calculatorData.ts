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
  { id: "13", name: "iPhone 13", basePrice: 27000, supported: true },
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
