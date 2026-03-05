import { useState } from "react";
import { ChevronRight, ArrowLeft, Phone, CheckCircle2, AlertTriangle } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  phoneModels,
  storageOptions,
  conditionOptions,
  screenOptions,
  batteryOptions,
  complectnessOptions,
  type ConditionOption,
} from "@/data/calculatorData";

type Step = "welcome" | "model" | "unsupported" | "storage" | "condition" | "screen" | "battery" | "completeness" | "result";

const STEPS_ORDER: Step[] = ["welcome", "model", "storage", "condition", "screen", "battery", "completeness", "result"];

const Calculator = () => {
  const [step, setStep] = useState<Step>("welcome");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedBattery, setSelectedBattery] = useState("");
  const [selectedCompleteness, setSelectedCompleteness] = useState("");

  const currentIndex = STEPS_ORDER.indexOf(step);
  const totalSteps = STEPS_ORDER.length - 2;
  const progressStep = currentIndex > 0 && currentIndex < STEPS_ORDER.length - 1 ? currentIndex : 0;

  const goNext = () => {
    const idx = STEPS_ORDER.indexOf(step);
    if (idx < STEPS_ORDER.length - 1) setStep(STEPS_ORDER[idx + 1]);
  };

  const goBack = () => {
    if (step === "unsupported") {
      setStep("model");
      return;
    }
    const idx = STEPS_ORDER.indexOf(step);
    if (idx > 0) setStep(STEPS_ORDER[idx - 1]);
  };

  const calculatePrice = () => {
    const model = phoneModels.find((m) => m.id === selectedModel);
    if (!model) return 0;
    const storage = storageOptions.find((s) => s.id === selectedStorage);
    const condition = conditionOptions.find((c) => c.id === selectedCondition);
    const screen = screenOptions.find((s) => s.id === selectedScreen);
    const battery = batteryOptions.find((b) => b.id === selectedBattery);
    const completeness = complectnessOptions.find((c) => c.id === selectedCompleteness);
    const price =
      model.basePrice *
      (storage?.multiplier ?? 1) *
      (condition?.multiplier ?? 1) *
      (screen?.multiplier ?? 1) *
      (battery?.multiplier ?? 1) *
      (completeness?.multiplier ?? 1);
    return Math.round(price / 100) * 100;
  };

  const restart = () => {
    setStep("welcome");
    setSelectedModel("");
    setSelectedStorage("");
    setSelectedCondition("");
    setSelectedScreen("");
    setSelectedBattery("");
    setSelectedCompleteness("");
  };

  const buildContactMessage = () => {
    const model = phoneModels.find((m) => m.id === selectedModel);
    const storage = storageOptions.find((s) => s.id === selectedStorage);
    const condition = conditionOptions.find((c) => c.id === selectedCondition);
    const screen = screenOptions.find((s) => s.id === selectedScreen);
    const battery = batteryOptions.find((b) => b.id === selectedBattery);
    const completeness = complectnessOptions.find((c) => c.id === selectedCompleteness);
    const price = calculatePrice();

    return `Здравствуйте! Хочу продать iPhone.\n\nМодель: ${model?.name ?? ""}\nПамять: ${storage?.label ?? ""}\nСостояние корпуса: ${condition?.label ?? ""}\nЭкран: ${screen?.label ?? ""}\nБатарея: ${battery?.label ?? ""}\nКомплектация: ${completeness?.label ?? ""}\n\nПредварительная оценка: ${price.toLocaleString("ru-RU")} ₽`;
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
          <p className="font-semibold text-foreground">{label}</p>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
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

  const renderConditionStep = (
    title: string,
    subtitle: string,
    options: ConditionOption[],
    selected: string,
    onSelect: (id: string) => void
  ) => (
    <div className="animate-fade-in-up">
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
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-2xl rounded-2xl shadow-elevated border" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
          <div className="p-6 md:p-12 max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Progress bar */}
            {progressStep > 0 && step !== "result" && step !== "unsupported" && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <button onClick={goBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Назад
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {progressStep} из {totalSteps}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div
                    className="bg-primary rounded-full h-1.5 transition-all duration-500"
                    style={{ width: `${(progressStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Back button for unsupported */}
            {step === "unsupported" && (
              <div className="mb-8">
                <button onClick={goBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Назад
                </button>
              </div>
            )}

            {/* Welcome */}
            {step === "welcome" && (
              <div className="text-center space-y-8 animate-fade-in-up">
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                    <img src={logo} alt="Скупка Айфонов" className="relative w-40 h-40 object-contain rounded-2xl" />
                  </div>
                  <p className="text-sm font-medium text-primary tracking-wider uppercase">
                    Скупка-айфонов.рф
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    Узнай стоимость<br />своего iPhone 👋
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Ответь на несколько вопросов и получи предварительную оценку за минуту
                  </p>
                </div>
                <button
                  onClick={goNext}
                  className="w-full h-16 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-primary-foreground flex items-center justify-center gap-2"
                >
                  Начать оценку <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Model selection */}
            {step === "model" && (
              <div className="animate-fade-in-up">
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
              </div>
            )}

            {/* Unsupported model */}
            {step === "unsupported" && (
              <div className="text-center space-y-8 animate-fade-in-up">
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
              <div className="animate-fade-in-up">
                <StepHeader title="Объём памяти 💾" subtitle="Сколько гигабайт у вашего iPhone?" />
                <div className="space-y-3">
                  {storageOptions.map((opt) => (
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
              </div>
            )}

            {/* Condition */}
            {step === "condition" &&
              renderConditionStep("Состояние корпуса 🔍", "Оцените внешний вид вашего iPhone", conditionOptions, selectedCondition, setSelectedCondition)}

            {/* Screen */}
            {step === "screen" &&
              renderConditionStep("Состояние экрана 📺", "Оцените экран вашего iPhone", screenOptions, selectedScreen, setSelectedScreen)}

            {/* Battery */}
            {step === "battery" &&
              renderConditionStep("Состояние батареи 🔋", "Ёмкость аккумулятора (Настройки → Аккумулятор)", batteryOptions, selectedBattery, setSelectedBattery)}

            {/* Completeness */}
            {step === "completeness" &&
              renderConditionStep("Комплектация 📦", "Что идёт в комплекте?", complectnessOptions, selectedCompleteness, setSelectedCompleteness)}

            {/* Result */}
            {step === "result" && (
              <div className="text-center space-y-8 animate-fade-in-up">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Предварительная оценка
                  </h2>
                  <p className="text-muted-foreground">
                    {phoneModels.find((m) => m.id === selectedModel)?.name}
                    {" · "}
                    {storageOptions.find((s) => s.id === selectedStorage)?.label}
                  </p>
                </div>
                <div className="py-6">
                  <p className="text-sm text-muted-foreground mb-2">Ориентировочная стоимость выкупа</p>
                  <p className="text-5xl md:text-6xl font-extrabold text-primary">
                    {calculatePrice().toLocaleString("ru-RU")} ₽
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-sm text-muted-foreground">
                  Точная стоимость определяется после осмотра устройства специалистом. Свяжитесь с нами для записи на оценку.
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] transition-all text-lg font-semibold rounded-2xl shadow-lg text-primary-foreground flex items-center justify-center gap-2"
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    href={telegramUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 bg-[hsl(200,80%,50%)] hover:bg-[hsl(200,80%,45%)] transition-all text-lg font-semibold rounded-2xl shadow-lg text-primary-foreground flex items-center justify-center gap-2"
                  >
                    ✈️ Telegram
                  </a>
                  <a
                    href={vkUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 bg-[hsl(220,60%,50%)] hover:bg-[hsl(220,60%,45%)] transition-all text-lg font-semibold rounded-2xl shadow-lg text-primary-foreground flex items-center justify-center gap-2"
                  >
                    🔵 ВКонтакте
                  </a>
                  <button
                    onClick={restart}
                    className="w-full h-14 border-2 border-border hover:border-muted-foreground/30 transition-all text-lg font-semibold rounded-2xl text-foreground flex items-center justify-center"
                  >
                    Оценить другой iPhone
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
