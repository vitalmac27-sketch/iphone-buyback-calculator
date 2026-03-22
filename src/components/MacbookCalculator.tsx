import { useState, useMemo } from "react";
import { ChevronRight, ArrowLeft, CheckCircle2, AlertTriangle, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import {
  macbookModels,
  macbookScreenOptions,
  macbookBodyOptions,
  macbookCompletenessOptions,
  formatSsd,
  formatRam,
  getRamMultiplier,
  getSsdMultiplier,
  type MacbookSeries,
  type MacbookConditionOption,
} from "@/data/macbookData";

type MacbookStep = "series" | "model" | "ram" | "ssd" | "battery" | "screen" | "body" | "completeness" | "result";

const MACBOOK_STEPS: MacbookStep[] = ["series", "model", "ram", "ssd", "battery", "screen", "body", "completeness", "result"];

const getBatteryMultiplier = (percent: number): number => {
  const map: Record<number, number> = {
    100: 0.93, 99: 0.91, 98: 0.89, 97: 0.87, 96: 0.85,
    95: 0.84, 94: 0.83, 93: 0.82, 92: 0.81, 91: 0.80,
    90: 0.77, 89: 0.75, 88: 0.72, 87: 0.70, 86: 0.67, 85: 0.65,
  };
  return map[percent] ?? 0.65;
};

interface MacbookCalculatorProps {
  onBack: () => void;
  onRestart: () => void;
}

const MacbookCalculator = ({ onBack, onRestart }: MacbookCalculatorProps) => {
  const [step, setStep] = useState<MacbookStep>("series");
  const [selectedSeries, setSelectedSeries] = useState<MacbookSeries | "">("");
  const [selectedModelId, setSelectedModelId] = useState("");
  const [selectedRam, setSelectedRam] = useState<number>(0);
  const [selectedSsd, setSelectedSsd] = useState<number>(0);
  const [batteryPercent, setBatteryPercent] = useState(100);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedBody, setSelectedBody] = useState("");
  const [selectedCompleteness, setSelectedCompleteness] = useState("");

  const currentIndex = MACBOOK_STEPS.indexOf(step);
  const totalSteps = MACBOOK_STEPS.length - 1; // exclude result
  const progressStep = currentIndex >= 0 && step !== "result" ? currentIndex + 1 : 0;

  const filteredModels = useMemo(() => {
    if (!selectedSeries) return [];
    return macbookModels.filter((m) => m.series === selectedSeries);
  }, [selectedSeries]);

  const selectedModel = macbookModels.find((m) => m.id === selectedModelId);

  const goNext = () => {
    const idx = MACBOOK_STEPS.indexOf(step);
    if (idx < MACBOOK_STEPS.length - 1) setStep(MACBOOK_STEPS[idx + 1]);
  };

  const goBack = () => {
    const idx = MACBOOK_STEPS.indexOf(step);
    if (idx === 0) {
      onBack();
    } else {
      setStep(MACBOOK_STEPS[idx - 1]);
    }
  };

  const calculatePrice = () => {
    if (!selectedModel) return 0;
    const ramMult = getRamMultiplier(selectedRam, selectedModel.ramOptions);
    const ssdMult = getSsdMultiplier(selectedSsd, selectedModel.ssdOptions);
    const batteryMult = getBatteryMultiplier(batteryPercent);
    const screenMult = macbookScreenOptions.find((s) => s.id === selectedScreen)?.multiplier ?? 1;
    const bodyMult = macbookBodyOptions.find((b) => b.id === selectedBody)?.multiplier ?? 1;
    const complMult = macbookCompletenessOptions.find((c) => c.id === selectedCompleteness)?.multiplier ?? 1;
    const price = selectedModel.basePrice * ramMult * ssdMult * batteryMult * screenMult * bodyMult * complMult;
    return Math.ceil(price / 500) * 500;
  };

  const buildContactMessage = () => {
    const screen = macbookScreenOptions.find((s) => s.id === selectedScreen);
    const body = macbookBodyOptions.find((b) => b.id === selectedBody);
    const compl = macbookCompletenessOptions.find((c) => c.id === selectedCompleteness);
    return `Здравствуйте! Хочу продать MacBook.\n\n💻 ${selectedModel?.name ?? ""}\n🧠 RAM: ${formatRam(selectedRam)} • SSD: ${formatSsd(selectedSsd)}\n🔋 ${batteryPercent}% • ${screen?.label ?? ""}\n🖥 Корпус: ${body?.label ?? ""}\n📦 ${compl?.label ?? ""}`;
  };

  const whatsappUrl = () => `https://wa.me/89503185530?text=${encodeURIComponent(buildContactMessage())}`;
  const telegramUrl = () => `https://t.me/eofffer?text=${encodeURIComponent(buildContactMessage())}`;
  const vkUrl = () => `https://vk.me/skupka_iphones`;

  const OptionCard = ({ label, description, selected, onClick }: { label: string; description?: string; selected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
        selected ? "border-primary/60 shadow-[0_0_20px_-4px_hsl(160,55%,45%,0.3)]" : "border-[var(--glass-border)] hover:border-primary/30"
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
    options: MacbookConditionOption[],
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
    <>
      {/* Progress bar */}
      {progressStep > 0 && step !== "result" && (
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

      <div className="animate-fade-in-up">
        {/* Series selection */}
        {step === "series" && (
          <div>
            <StepHeader title="Серия MacBook 💻" subtitle="Выберите серию вашего MacBook" />
            <div className="space-y-3">
              <OptionCard
                label="MacBook Air"
                description="Тонкий и лёгкий"
                selected={selectedSeries === "air"}
                onClick={() => {
                  setSelectedSeries("air");
                  setSelectedModelId("");
                  setTimeout(goNext, 300);
                }}
              />
              <OptionCard
                label="MacBook Pro"
                description="Максимальная производительность"
                selected={selectedSeries === "pro"}
                onClick={() => {
                  setSelectedSeries("pro");
                  setSelectedModelId("");
                  setTimeout(goNext, 300);
                }}
              />
            </div>
            <BottomBackButton />
          </div>
        )}

        {/* Model selection */}
        {step === "model" && (
          <div>
            <StepHeader title="Модель 📱" subtitle={`Какой у вас MacBook ${selectedSeries === "air" ? "Air" : "Pro"}?`} />
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
              {filteredModels.map((model) => (
                <OptionCard
                  key={model.id}
                  label={model.name}
                  description={`Чип ${model.chip}`}
                  selected={selectedModelId === model.id}
                  onClick={() => {
                    setSelectedModelId(model.id);
                    setSelectedRam(0);
                    setSelectedSsd(0);
                    setTimeout(goNext, 300);
                  }}
                />
              ))}
            </div>
            <BottomBackButton />
          </div>
        )}

        {/* RAM selection */}
        {step === "ram" && selectedModel && (
          <div>
            <StepHeader title="Оперативная память 🧠" subtitle="Сколько RAM у вашего MacBook?" />
            <div className="space-y-3">
              {selectedModel.ramOptions.map((ram) => (
                <OptionCard
                  key={ram}
                  label={formatRam(ram)}
                  selected={selectedRam === ram}
                  onClick={() => {
                    setSelectedRam(ram);
                    setTimeout(goNext, 300);
                  }}
                />
              ))}
            </div>
            <BottomBackButton />
          </div>
        )}

        {/* SSD selection */}
        {step === "ssd" && selectedModel && (
          <div>
            <StepHeader title="Объём SSD 💾" subtitle="Какой объём накопителя?" />
            <div className="space-y-3">
              {selectedModel.ssdOptions.map((ssd) => (
                <OptionCard
                  key={ssd}
                  label={formatSsd(ssd)}
                  selected={selectedSsd === ssd}
                  onClick={() => {
                    setSelectedSsd(ssd);
                    setTimeout(goNext, 300);
                  }}
                />
              ))}
            </div>
            <BottomBackButton />
          </div>
        )}

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

        {/* Screen */}
        {step === "screen" && renderConditionStep("Состояние экрана 📺", "Есть ли дефекты на экране?", macbookScreenOptions, selectedScreen, setSelectedScreen)}

        {/* Body */}
        {step === "body" && renderConditionStep("Состояние корпуса 🔍", "Оцените внешний вид корпуса", macbookBodyOptions, selectedBody, setSelectedBody)}

        {/* Completeness */}
        {step === "completeness" && renderConditionStep("Комплектация 📦", "Что идёт в комплекте?", macbookCompletenessOptions, selectedCompleteness, setSelectedCompleteness)}

        {/* Result */}
        {step === "result" && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto"
              >
                <Laptop className="w-10 h-10 text-primary" />
              </motion.div>
               <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                 Ваше устройство подходит! 🎉
               </h2>
              <p className="text-lg text-muted-foreground">
                Свяжитесь с менеджером для оценки вашего устройства
              </p>
              <div className="space-y-1 text-base text-muted-foreground">
                <p>💻 {selectedModel?.name} • {formatRam(selectedRam)} • {formatSsd(selectedSsd)}</p>
                <p>🔋 {batteryPercent}% • {macbookScreenOptions.find((s) => s.id === selectedScreen)?.label}</p>
                <p>📦 {macbookCompletenessOptions.find((c) => c.id === selectedCompleteness)?.label}</p>
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
                onClick={onRestart}
                className="w-full h-14 border border-[var(--glass-border)] hover:border-primary/30 transition-all text-lg font-semibold rounded-2xl text-foreground flex items-center justify-center"
                style={{ background: 'hsla(220, 20%, 16%, 0.4)', backdropFilter: 'blur(12px)' }}
              >
                Оценить другое устройство
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MacbookCalculator;
