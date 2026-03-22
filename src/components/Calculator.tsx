import { useState, useMemo } from "react";
import { ChevronRight, ArrowLeft, Phone, CheckCircle2, AlertTriangle, Smartphone, Laptop, Tablet, Watch } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.jpg";
import MacbookCalculator from "@/components/MacbookCalculator";
import IpadCalculator from "@/components/IpadCalculator";
import WatchCalculator from "@/components/WatchCalculator";
import {
  phoneModels,
  storageOptions,
  conditionOptions,
  screenOptions,
  complectnessOptions,
  iphoneCompletenessItems,
  getIphoneCompletenessMultiplier,
  type ConditionOption,
  type IphoneCompletenessItem,
} from "@/data/calculatorData";

type DeviceCategory = "iphone" | "macbook" | "ipad" | "applewatch" | null;
type Step = "welcome" | "model" | "unsupported" | "storage" | "battery" | "screen" | "condition" | "completeness" | "result";

const STEPS_ORDER: Step[] = ["welcome", "model", "storage", "battery", "screen", "condition", "completeness", "result"];

const getBatteryMultiplier = (percent: number): number => {
  const map: Record<number, number> = {
    100: 0.93,
    99: 0.91,
    98: 0.89,
    97: 0.87,
    96: 0.85,
    95: 0.84,
    94: 0.83,
    93: 0.82,
    92: 0.81,
    91: 0.80,
    90: 0.77,
    89: 0.75,
    88: 0.72,
    87: 0.70,
    86: 0.67,
    85: 0.65,
  };
  return map[percent] ?? 0.65;
};

const Calculator = () => {
  const [deviceCategory, setDeviceCategory] = useState<DeviceCategory>(null);
  const [step, setStep] = useState<Step>("welcome");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [batteryPercent, setBatteryPercent] = useState(0);
  const [selectedCompleteness, setSelectedCompleteness] = useState<IphoneCompletenessItem[]>([]);

  const isIPhone17 = selectedModel.startsWith("17");

  const currentIndex = STEPS_ORDER.indexOf(step);
  const totalSteps = STEPS_ORDER.length - 2;
  const progressStep = currentIndex > 0 && currentIndex < STEPS_ORDER.length - 1 ? currentIndex : 0;

  const filteredStorageOptions = useMemo(() => {
    if (isIPhone17) {
      return storageOptions.filter((s) => s.id !== "128");
    }
    return storageOptions.filter((s) => s.id !== "2048");
  }, [isIPhone17]);


  const goNext = () => {
    const idx = STEPS_ORDER.indexOf(step);
    if (idx < STEPS_ORDER.length - 1) setStep(STEPS_ORDER[idx + 1]);
  };

  const goBack = () => {
    if (step === "unsupported") {
      setStep("model");
      return;
    }
    if (step === "model") {
      setStep("welcome");
      setDeviceCategory(null);
      return;
    }
    const idx = STEPS_ORDER.indexOf(step);
    if (idx > 0) setStep(STEPS_ORDER[idx - 1]);
  };

  const calculatePrice = () => {
    const model = phoneModels.find((m) => m.id === selectedModel);
    if (!model) return 0;

    const storage = storageOptions.find((s) => s.id === selectedStorage);
    let basePrice = model.basePrice * (storage?.multiplier ?? 1);

    const condition = conditionOptions.find((c) => c.id === selectedCondition);
    const screen = screenOptions.find((s) => s.id === selectedScreen);
    const batteryMult = getBatteryMultiplier(batteryPercent);
    const complMult = getIphoneCompletenessMultiplier(selectedCompleteness);
    const price =
      basePrice *
      (condition?.multiplier ?? 1) *
      (screen?.multiplier ?? 1) *
      batteryMult *
      complMult;
    return Math.ceil(price / 500) * 500;
  };

  const restart = () => {
    setStep("welcome");
    setDeviceCategory(null);
    setSelectedModel("");
    setSelectedStorage("");
    setSelectedCondition("");
    setSelectedScreen("");
    setBatteryPercent(0);
    setSelectedCompleteness([]);
  };

  const buildContactMessage = () => {
    const model = phoneModels.find((m) => m.id === selectedModel);
    const storage = storageOptions.find((s) => s.id === selectedStorage);
    const condition = conditionOptions.find((c) => c.id === selectedCondition);
    const screen = screenOptions.find((s) => s.id === selectedScreen);
    const complLabels = selectedCompleteness.map((id) => iphoneCompletenessItems.find((c) => c.id === id)?.label).filter(Boolean).join(", ");

    return `Здравствуйте! Хочу продать iPhone.\n\n📱 ${model?.name ?? ""} ${storage?.label ?? ""}\n🔋 ${batteryPercent}% • ${screen?.label ?? ""}\n🖥 Корпус: ${condition?.label ?? ""}\n📦 ${complLabels || "Только телефон"}`;
  };

  const whatsappUrl = () => {
    const msg = encodeURIComponent(buildContactMessage());
    return `https://wa.me/89503185530?text=${msg}`;
  };

  const telegramUrl = () => {
    const msg = encodeURIComponent(buildContactMessage());
    return `https://t.me/eofffer?text=${msg}`;
  };

  const vkUrl = () => {
    return `https://vk.me/skupka_iphones`;
  };

  const OptionCard = ({
    label,
    description,
    selected,
    onClick,
  }: {
    label: string;
    description?: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
        selected
          ? "border-primary/60 shadow-[0_0_20px_-4px_hsl(160,55%,45%,0.3)]"
          : "border-[var(--glass-border)] hover:border-primary/30"
      }`}
      style={{
        background: selected ? 'var(--glass-highlight)' : 'hsla(220, 20%, 16%, 0.4)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground text-base md:text-lg">{label}</p>
          {description && <p className="text-sm md:text-base text-muted-foreground mt-1">{description}</p>}
        </div>
        {selected && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
      </div>
    </button>
  );

  const StepHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="space-y-2 mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );


  const BottomBackButton = () => (
    <button
      onClick={goBack}
      className="w-full h-12 mt-4 border border-[var(--glass-border)] hover:border-primary/30 transition-all text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground flex items-center justify-center gap-2"
      style={{ background: 'hsla(220, 20%, 16%, 0.4)', backdropFilter: 'blur(12px)' }}
    >
      <ArrowLeft className="w-4 h-4" /> Назад
    </button>
  );

  const renderConditionStep = (
    title: string,
    subtitle: string,
    options: ConditionOption[],
    selected: string,
    onSelect: (id: string) => void
  ) => (
    <div>
      <StepHeader title={title} subtitle={subtitle} />
      <div className="space-y-3">
        {options.map((opt) => (
          <OptionCard
            key={opt.id}
            label={opt.label}
            description={opt.description}
            selected={selected === opt.id}
            onClick={() => {
              onSelect(opt.id);
              setTimeout(goNext, 300);
            }}
          />
        ))}
      </div>
      <BottomBackButton />
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-2xl rounded-2xl shadow-elevated border overflow-hidden" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
          <div className="p-6 md:p-12 max-h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden">
            {/* Progress bar */}
            {progressStep > 0 && step !== "result" && step !== "unsupported" && deviceCategory !== "macbook" && deviceCategory !== "ipad" && deviceCategory !== "applewatch" && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalSteps }, (_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            i + 1 < progressStep
                              ? "bg-primary text-primary-foreground"
                              : i + 1 === progressStep
                              ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                              : "text-muted-foreground"
                          }`}
                          style={{
                            background: i + 1 > progressStep ? 'hsla(220, 20%, 30%, 0.5)' : undefined,
                          }}
                        >
                          {i + 1}
                        </div>
                        {i < totalSteps - 1 && (
                          <div
                            className="w-4 h-0.5 rounded-full transition-all duration-300"
                            style={{
                              background: i + 1 < progressStep ? 'hsl(var(--primary))' : 'hsla(220, 20%, 30%, 0.5)',
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    Шаг {progressStep} из {totalSteps}
                  </span>
                </div>
              </div>
            )}

            <div>

            {/* Welcome */}
            {step === "welcome" && !deviceCategory && (
              <div className="text-center space-y-8">
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative" style={{ minHeight: '120px' }}>
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <img src={logo} alt="Скупка Айфонов" loading="eager" decoding="sync" className="relative w-full max-w-md h-auto object-contain rounded-2xl" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    Оцени своё устройство 👋
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Выбери категорию устройства для оценки
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { id: "iphone" as const, label: "iPhone", icon: Smartphone, available: true },
                    { id: "macbook" as const, label: "MacBook", icon: Laptop, available: true },
                    { id: "ipad" as const, label: "iPad", icon: Tablet, available: true },
                    { id: "applewatch" as const, label: "Apple Watch", icon: Watch, available: true },
                  ]).map((device) => (
                    <button
                      key={device.id}
                      onClick={() => {
                        if (device.available) {
                          setDeviceCategory(device.id);
                          setStep("model");
                        }
                      }}
                      className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 ${
                        device.available
                          ? "border-[var(--glass-border)] hover:border-primary/50 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                          : "border-[var(--glass-border)] opacity-50 cursor-not-allowed"
                      }`}
                      style={{
                        background: 'hsla(220, 20%, 16%, 0.4)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      }}
                    >
                      <device.icon className={`w-10 h-10 ${device.available ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`font-semibold text-lg ${device.available ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {device.label}
                      </span>
                      {!device.available && (
                        <span className="absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          Скоро
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}


            {/* MacBook calculator */}
            {deviceCategory === "macbook" && step === "model" && (
              <MacbookCalculator
                onBack={() => { setStep("welcome"); setDeviceCategory(null); }}
                onRestart={restart}
              />
            )}

            {/* iPad calculator */}
            {deviceCategory === "ipad" && step === "model" && (
              <IpadCalculator
                onBack={() => { setStep("welcome"); setDeviceCategory(null); }}
                onRestart={restart}
              />
            )}

            {/* Apple Watch calculator */}
            {deviceCategory === "applewatch" && step === "model" && (
              <WatchCalculator
                onBack={() => { setStep("welcome"); setDeviceCategory(null); }}
                onRestart={restart}
              />
            )}

            {/* Model selection */}
            {step === "model" && deviceCategory === "iphone" && (
              <div>
                <StepHeader title="Выберите модель 📱" subtitle="Какой у вас iPhone?" />
                <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                  {phoneModels.map((model) => (
                    <OptionCard
                      key={model.id}
                      label={model.name}
                      selected={selectedModel === model.id}
                      onClick={() => {
                        setSelectedModel(model.id);
                        if (model.supported) {
                          setTimeout(goNext, 300);
                        } else {
                          setTimeout(() => setStep("unsupported"), 300);
                        }
                      }}
                    />
                  ))}
                </div>
                <BottomBackButton />
              </div>
            )}

            {/* Unsupported model */}
            {step === "unsupported" && (
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-10 h-10 text-destructive" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    К сожалению, эту модель мы не выкупаем
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Мы принимаем iPhone от 13 серии и новее. Выберите другую модель или свяжитесь с нами для уточнения.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setSelectedModel("");
                      setStep("model");
                    }}
                    className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-lg font-semibold rounded-2xl shadow-lg text-primary-foreground flex items-center justify-center gap-2"
                  >
                    Выбрать другую модель
                  </button>
                  <a
                    href="https://wa.me/89503185530?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BE%20%D0%B2%D1%8B%D0%BA%D1%83%D0%BF%D0%B5."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 border-2 border-border hover:border-muted-foreground/30 transition-all text-lg font-semibold rounded-2xl text-foreground flex items-center justify-center"
                  >
                    Связаться с нами
                  </a>
                </div>
              </div>
            )}

            {/* Storage */}
            {step === "storage" && (
              <div>
                <StepHeader title="Объём памяти 💾" subtitle="Сколько гигабайт у вашего iPhone?" />
                <div className="space-y-3">
                  {filteredStorageOptions.map((opt) => (
                    <OptionCard
                      key={opt.id}
                      label={opt.label}
                      selected={selectedStorage === opt.id}
                      onClick={() => {
                        setSelectedStorage(opt.id);
                        setTimeout(goNext, 300);
                      }}
                    />
                  ))}
                </div>
                <BottomBackButton />
              </div>
            )}


            {/* Condition */}
            {step === "condition" &&
              renderConditionStep("Состояние корпуса 🔍", "Оцените внешний вид вашего iPhone", conditionOptions, selectedCondition, setSelectedCondition)}

            {/* Screen */}
            {step === "screen" &&
              renderConditionStep("Состояние экрана 📺", "Оцените экран вашего iPhone", screenOptions, selectedScreen, setSelectedScreen)}

            {/* Battery */}
            {step === "battery" && (
              <div>
                <StepHeader title="Состояние батареи 🔋" subtitle="Ёмкость аккумулятора (Настройки → Аккумулятор)" />
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 16 }, (_, i) => 100 - i).map((pct) => (
                    <button
                      key={pct}
                      onClick={() => {
                        setBatteryPercent(pct);
                        setTimeout(goNext, 300);
                      }}
                      className={`h-14 rounded-xl border text-center font-semibold transition-all duration-300 ${
                        batteryPercent === pct
                          ? "border-primary/60 shadow-[0_0_20px_-4px_hsl(160,55%,45%,0.3)] text-primary"
                          : "border-[var(--glass-border)] hover:border-primary/30 text-foreground"
                      }`}
                      style={{
                        background: batteryPercent === pct ? 'var(--glass-highlight)' : 'hsla(220, 20%, 16%, 0.4)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      }}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <BottomBackButton />
              </div>
            )}

            {/* Completeness with checkboxes */}
            {step === "completeness" && (
              <div>
                <StepHeader title="Комплектация 📦" subtitle="Что идёт в комплекте? Отметьте всё, что есть" />
                <div className="space-y-3">
                  {iphoneCompletenessItems.map((item) => {
                    const checked = selectedCompleteness.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          setSelectedCompleteness((prev) =>
                            prev.includes(item.id) ? prev.filter((i) => i !== item.id) : [...prev, item.id]
                          )
                        }
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                          checked ? "border-primary/60 shadow-[0_0_20px_-4px_hsl(160,55%,45%,0.3)]" : "border-[var(--glass-border)] hover:border-primary/30"
                        }`}
                        style={{
                          background: checked ? 'var(--glass-highlight)' : 'hsla(220, 20%, 16%, 0.4)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                checked ? "bg-primary border-primary" : "border-muted-foreground/40"
                              }`}
                            >
                              {checked && (
                                <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M2 6l3 3 5-5" />
                                </svg>
                              )}
                            </div>
                            <p className="font-semibold text-foreground text-base md:text-lg">{item.label}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={goNext}
                  className="w-full h-14 mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-lg font-semibold rounded-2xl shadow-lg text-primary-foreground flex items-center justify-center gap-2"
                >
                  Далее
                </button>
                <BottomBackButton />
              </div>
            )}

            {/* Result */}
            {step === "result" && (
              <div>
                <div className="text-center space-y-8">
                <div className="space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="text-6xl mx-auto"
                  >
                    🎉
                  </motion.div>
                   <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                     Ваше устройство подходит! ✅
                   </h2>
                  <p className="text-lg text-muted-foreground">
                    Свяжитесь с менеджером для оценки вашего устройства
                  </p>
                  <div className="space-y-1 text-base text-muted-foreground">
                    <p>📱 {phoneModels.find((m) => m.id === selectedModel)?.name} {storageOptions.find((s) => s.id === selectedStorage)?.label}</p>
                    <p>🔋 {batteryPercent}% • {screenOptions.find((s) => s.id === selectedScreen)?.label}</p>
                    <p>📦 {selectedCompleteness.map((id) => iphoneCompletenessItems.find((c) => c.id === id)?.label).filter(Boolean).join(", ") || "Только телефон"}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-lg font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, hsl(142, 70%, 42%), hsl(142, 70%, 34%))' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Связаться в WhatsApp
                  </a>
                  <a
                    href={telegramUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-lg font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, hsl(200, 80%, 52%), hsl(200, 80%, 42%))' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    Связаться в Telegram
                  </a>
                  <a
                    href={vkUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-lg font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, hsl(220, 60%, 52%), hsl(220, 60%, 42%))' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.27 4.675 2.85 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.305-.491.745-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>
                    Связаться в ВКонтакте
                  </a>
                  <button
                    onClick={restart}
                    className="w-full h-14 border border-[var(--glass-border)] hover:border-primary/30 transition-all text-lg font-semibold rounded-2xl text-foreground flex items-center justify-center"
                    style={{ background: 'hsla(220, 20%, 16%, 0.4)', backdropFilter: 'blur(12px)' }}
                  >
                    Оценить другое устройство
                  </button>
                </div>
              </div>
              </div>
            )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
