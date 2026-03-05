export interface PhoneModel {
  id: string;
  name: string;
  basePrice: number;
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
  { id: "16pm", name: "iPhone 16 Pro Max", basePrice: 95000 },
  { id: "16p", name: "iPhone 16 Pro", basePrice: 80000 },
  { id: "16", name: "iPhone 16", basePrice: 60000 },
  { id: "16plus", name: "iPhone 16 Plus", basePrice: 65000 },
  { id: "15pm", name: "iPhone 15 Pro Max", basePrice: 75000 },
  { id: "15p", name: "iPhone 15 Pro", basePrice: 65000 },
  { id: "15", name: "iPhone 15", basePrice: 48000 },
  { id: "15plus", name: "iPhone 15 Plus", basePrice: 52000 },
  { id: "14pm", name: "iPhone 14 Pro Max", basePrice: 55000 },
  { id: "14p", name: "iPhone 14 Pro", basePrice: 48000 },
  { id: "14", name: "iPhone 14", basePrice: 35000 },
  { id: "14plus", name: "iPhone 14 Plus", basePrice: 38000 },
  { id: "13pm", name: "iPhone 13 Pro Max", basePrice: 42000 },
  { id: "13p", name: "iPhone 13 Pro", basePrice: 36000 },
  { id: "13", name: "iPhone 13", basePrice: 27000 },
  { id: "13mini", name: "iPhone 13 Mini", basePrice: 22000 },
  { id: "12pm", name: "iPhone 12 Pro Max", basePrice: 32000 },
  { id: "12p", name: "iPhone 12 Pro", basePrice: 27000 },
  { id: "12", name: "iPhone 12", basePrice: 20000 },
  { id: "12mini", name: "iPhone 12 Mini", basePrice: 15000 },
  { id: "11pm", name: "iPhone 11 Pro Max", basePrice: 24000 },
  { id: "11p", name: "iPhone 11 Pro", basePrice: 20000 },
  { id: "11", name: "iPhone 11", basePrice: 14000 },
];

export const storageOptions: StorageOption[] = [
  { id: "64", label: "64 ГБ", multiplier: 0.85 },
  { id: "128", label: "128 ГБ", multiplier: 1.0 },
  { id: "256", label: "256 ГБ", multiplier: 1.1 },
  { id: "512", label: "512 ГБ", multiplier: 1.2 },
  { id: "1024", label: "1 ТБ", multiplier: 1.35 },
];

export const conditionOptions: ConditionOption[] = [
  { id: "ideal", label: "Идеальное", description: "Без царапин и потёртостей, как новый", multiplier: 1.0 },
  { id: "good", label: "Хорошее", description: "Минимальные следы использования", multiplier: 0.9 },
  { id: "normal", label: "Среднее", description: "Заметные царапины и потёртости", multiplier: 0.75 },
  { id: "bad", label: "Плохое", description: "Сильные повреждения, трещины", multiplier: 0.55 },
];

export const screenOptions: ConditionOption[] = [
  { id: "original_perfect", label: "Оригинал, без дефектов", description: "Родной экран Apple без повреждений", multiplier: 1.0 },
  { id: "original_scratched", label: "Оригинал, есть царапины", description: "Родной экран с косметическими дефектами", multiplier: 0.92 },
  { id: "replaced", label: "Заменён", description: "Экран был заменён (не оригинал)", multiplier: 0.8 },
  { id: "cracked", label: "Разбит", description: "Экран треснут или не работает", multiplier: 0.6 },
];

export const batteryOptions: ConditionOption[] = [
  { id: "90plus", label: "90% и выше", description: "Отличная ёмкость батареи", multiplier: 1.0 },
  { id: "80_90", label: "80–89%", description: "Нормальная ёмкость", multiplier: 0.95 },
  { id: "below80", label: "Ниже 80%", description: "Требуется замена аккумулятора", multiplier: 0.85 },
];

export const complectnessOptions: ConditionOption[] = [
  { id: "full", label: "Полная комплектация", description: "Коробка, кабель, документы", multiplier: 1.0 },
  { id: "partial", label: "Частичная", description: "Есть коробка или кабель", multiplier: 0.97 },
  { id: "none", label: "Только телефон", description: "Без аксессуаров и коробки", multiplier: 0.93 },
];
