export type MacbookSeries = "air" | "pro";

export interface MacbookModel {
  id: string;
  name: string;
  chip: string;
  series: MacbookSeries;
  sizes: string[];
  ramOptions: number[];
  ssdOptions: number[];
  basePrice: number;
}

export const macbookModels: MacbookModel[] = [
  // MacBook Air
  { id: "air_m5", name: "MacBook Air M5", chip: "M5", series: "air", sizes: ['13"', '15"'], ramOptions: [16, 24, 32], ssdOptions: [512, 1024, 2048, 4096], basePrice: 95000 },
  { id: "air_m4", name: "MacBook Air M4", chip: "M4", series: "air", sizes: ['13"', '15"'], ramOptions: [16, 24, 32], ssdOptions: [256, 512, 1024, 2048], basePrice: 80000 },
  { id: "air_m3_15", name: 'MacBook Air M3 15"', chip: "M3", series: "air", sizes: ['15.3"'], ramOptions: [8, 16, 24], ssdOptions: [256, 512, 1024, 2048], basePrice: 65000 },
  { id: "air_m3_13", name: 'MacBook Air M3 13"', chip: "M3", series: "air", sizes: ['13.6"'], ramOptions: [8, 16, 24], ssdOptions: [256, 512, 1024, 2048], basePrice: 58000 },
  { id: "air_m2_15", name: 'MacBook Air M2 15"', chip: "M2", series: "air", sizes: ['15.3"'], ramOptions: [8, 16, 24], ssdOptions: [256, 512, 1024, 2048], basePrice: 55000 },
  { id: "air_m2_13", name: 'MacBook Air M2 13"', chip: "M2", series: "air", sizes: ['13.6"'], ramOptions: [8, 16, 24], ssdOptions: [256, 512, 1024, 2048], basePrice: 45000 },
  { id: "air_m1", name: 'MacBook Air M1 13"', chip: "M1", series: "air", sizes: ['13"'], ramOptions: [8, 16], ssdOptions: [256, 512, 1024, 2048], basePrice: 32000 },

  // MacBook Pro 16"
  { id: "pro16_m5_max", name: 'MacBook Pro 16" M5 Max', chip: "M5 Max", series: "pro", sizes: ['16"'], ramOptions: [36, 48, 64, 96, 128], ssdOptions: [2048, 4096, 8192], basePrice: 250000 },
  { id: "pro16_m5_pro", name: 'MacBook Pro 16" M5 Pro', chip: "M5 Pro", series: "pro", sizes: ['16"'], ramOptions: [24, 36, 48, 64], ssdOptions: [1024, 2048, 4096, 8192], basePrice: 170000 },
  { id: "pro16_m4_max", name: 'MacBook Pro 16" M4 Max', chip: "M4 Max", series: "pro", sizes: ['16"'], ramOptions: [36, 48, 64, 128], ssdOptions: [1024, 2048, 4096, 8192], basePrice: 230000 },
  { id: "pro16_m4_pro", name: 'MacBook Pro 16" M4 Pro', chip: "M4 Pro", series: "pro", sizes: ['16"'], ramOptions: [24, 36, 48], ssdOptions: [512, 1024, 2048, 4096], basePrice: 150000 },
  { id: "pro16_m3_max", name: 'MacBook Pro 16" M3 Max', chip: "M3 Max", series: "pro", sizes: ['16"'], ramOptions: [36, 48, 64, 128], ssdOptions: [1024, 2048, 4096, 8192], basePrice: 200000 },
  { id: "pro16_m3_pro", name: 'MacBook Pro 16" M3 Pro', chip: "M3 Pro", series: "pro", sizes: ['16"'], ramOptions: [18, 36], ssdOptions: [512, 1024, 2048, 4096], basePrice: 130000 },
  { id: "pro16_m2_max", name: 'MacBook Pro 16" M2 Max', chip: "M2 Max", series: "pro", sizes: ['16"'], ramOptions: [32, 64, 96], ssdOptions: [1024, 2048, 4096, 8192], basePrice: 160000 },
  { id: "pro16_m2_pro", name: 'MacBook Pro 16" M2 Pro', chip: "M2 Pro", series: "pro", sizes: ['16"'], ramOptions: [16, 32], ssdOptions: [512, 1024, 2048, 4096, 8192], basePrice: 110000 },
  { id: "pro16_m1_max", name: 'MacBook Pro 16" M1 Max', chip: "M1 Max", series: "pro", sizes: ['16"'], ramOptions: [32, 64], ssdOptions: [1024, 2048, 4096, 8192], basePrice: 120000 },
  { id: "pro16_m1_pro", name: 'MacBook Pro 16" M1 Pro', chip: "M1 Pro", series: "pro", sizes: ['16"'], ramOptions: [16, 32], ssdOptions: [512, 1024, 2048, 4096, 8192], basePrice: 90000 },

  // MacBook Pro 14"
  { id: "pro14_m5_max", name: 'MacBook Pro 14" M5 Max', chip: "M5 Max", series: "pro", sizes: ['14"'], ramOptions: [36, 48, 64, 96, 128], ssdOptions: [2048, 4096, 8192], basePrice: 220000 },
  { id: "pro14_m5_pro", name: 'MacBook Pro 14" M5 Pro', chip: "M5 Pro", series: "pro", sizes: ['14"'], ramOptions: [24, 36, 48, 64], ssdOptions: [1024, 2048, 4096, 8192], basePrice: 150000 },
  { id: "pro14_m5", name: 'MacBook Pro 14" M5', chip: "M5", series: "pro", sizes: ['14"'], ramOptions: [16, 24, 32], ssdOptions: [512, 1024, 2048, 4096], basePrice: 110000 },
  { id: "pro14_m4_max", name: 'MacBook Pro 14" M4 Max', chip: "M4 Max", series: "pro", sizes: ['14"'], ramOptions: [36, 48, 64, 128], ssdOptions: [1024, 2048, 4096, 8192], basePrice: 200000 },
  { id: "pro14_m4_pro", name: 'MacBook Pro 14" M4 Pro', chip: "M4 Pro", series: "pro", sizes: ['14"'], ramOptions: [24, 36, 48], ssdOptions: [512, 1024, 2048, 4096], basePrice: 130000 },
  { id: "pro14_m4", name: 'MacBook Pro 14" M4', chip: "M4", series: "pro", sizes: ['14"'], ramOptions: [16, 24, 32], ssdOptions: [512, 1024, 2048, 4096], basePrice: 100000 },
  { id: "pro14_m3_max", name: 'MacBook Pro 14" M3 Max', chip: "M3 Max", series: "pro", sizes: ['14"'], ramOptions: [36, 48, 64, 128], ssdOptions: [1024, 2048, 4096, 8192], basePrice: 180000 },
  { id: "pro14_m3_pro", name: 'MacBook Pro 14" M3 Pro', chip: "M3 Pro", series: "pro", sizes: ['14"'], ramOptions: [18, 36], ssdOptions: [512, 1024, 2048, 4096], basePrice: 110000 },
  { id: "pro14_m3", name: 'MacBook Pro 14" M3', chip: "M3", series: "pro", sizes: ['14"'], ramOptions: [8, 16, 24], ssdOptions: [512, 1024, 2048], basePrice: 85000 },
  { id: "pro14_m2_max", name: 'MacBook Pro 14" M2 Max', chip: "M2 Max", series: "pro", sizes: ['14"'], ramOptions: [32, 64, 96], ssdOptions: [1024, 2048, 4096, 8192], basePrice: 140000 },
  { id: "pro14_m2_pro", name: 'MacBook Pro 14" M2 Pro', chip: "M2 Pro", series: "pro", sizes: ['14"'], ramOptions: [16, 32], ssdOptions: [512, 1024, 2048, 4096, 8192], basePrice: 95000 },
  { id: "pro14_m1_max", name: 'MacBook Pro 14" M1 Max', chip: "M1 Max", series: "pro", sizes: ['14"'], ramOptions: [32, 64], ssdOptions: [512, 1024, 2048, 4096, 8192], basePrice: 110000 },
  { id: "pro14_m1_pro", name: 'MacBook Pro 14" M1 Pro', chip: "M1 Pro", series: "pro", sizes: ['14"'], ramOptions: [16, 32], ssdOptions: [512, 1024, 2048, 4096, 8192], basePrice: 80000 },

  // MacBook Pro 13"
  { id: "pro13_m2", name: 'MacBook Pro 13" M2', chip: "M2", series: "pro", sizes: ['13"'], ramOptions: [8, 16, 24], ssdOptions: [256, 512, 1024, 2048], basePrice: 50000 },
  { id: "pro13_m1", name: 'MacBook Pro 13" M1', chip: "M1", series: "pro", sizes: ['13"'], ramOptions: [8, 16], ssdOptions: [256, 512, 1024, 2048], basePrice: 35000 },
];

export const formatSsd = (gb: number): string => {
  if (gb >= 1024) return `${gb / 1024} ТБ`;
  return `${gb} ГБ`;
};

export const formatRam = (gb: number): string => `${gb} ГБ`;

// RAM multiplier relative to base (lowest) RAM option
export const getRamMultiplier = (ram: number, options: number[]): number => {
  const minRam = Math.min(...options);
  const ratio = ram / minRam;
  if (ratio <= 1) return 1.0;
  if (ratio <= 1.5) return 1.08;
  if (ratio <= 2) return 1.15;
  if (ratio <= 3) return 1.25;
  if (ratio <= 4) return 1.35;
  return 1.45;
};

// SSD multiplier relative to base (lowest) SSD option
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

export interface MacbookConditionOption {
  id: string;
  label: string;
  description: string;
  multiplier: number;
}

export const macbookScreenOptions: MacbookConditionOption[] = [
  { id: "perfect", label: "Без дефектов", description: "Экран без царапин и повреждений", multiplier: 1.0 },
  { id: "minor", label: "Мелкие царапины", description: "Незначительные следы использования", multiplier: 0.95 },
  { id: "scratched", label: "Заметные царапины", description: "Видимые царапины на экране", multiplier: 0.85 },
  { id: "damaged", label: "Повреждён", description: "Трещины, пятна или неработающие области", multiplier: 0.6 },
];

export const macbookBodyOptions: MacbookConditionOption[] = [
  { id: "ideal", label: "Идеальное", description: "Без царапин и потёртостей, как новый", multiplier: 1.0 },
  { id: "good", label: "Хорошее", description: "Минимальные следы использования", multiplier: 0.92 },
  { id: "normal", label: "Среднее", description: "Заметные царапины и потёртости", multiplier: 0.8 },
  { id: "bad", label: "Плохое", description: "Сильные повреждения, вмятины", multiplier: 0.6 },
];

export const macbookCompletenessOptions: MacbookConditionOption[] = [
  { id: "full", label: "Полная комплектация", description: "Коробка и зарядное устройство", multiplier: 1.0 },
  { id: "charger", label: "Только зарядное", description: "Зарядное устройство без коробки", multiplier: 0.97 },
  { id: "none", label: "Только ноутбук", description: "Без аксессуаров и коробки", multiplier: 0.93 },
];
