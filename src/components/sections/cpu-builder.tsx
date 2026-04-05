import { useState, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDndContext,
  defaultDropAnimationSideEffects,
  closestCorners,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Calculator,
  Target,
  Database,
  Cable,
  Cpu,
  RefreshCcw,
  Zap,
  Info,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

// Color scheme mapped strictly to the user's variables from custom implementation
const COLORS: Record<string, string> = {
  amber: "#eab308", // ALU
  blue: "#3b82f6", // UC
  cyan: "#06b6d4", // Registros
  purple: "#a855f7", // Bus
  green: "#10b981",
  red: "#ef4444",
};

interface CPUBlock {
  id: string;
  emoji: string;
  icon: any;
  label: string;
  full: string;
  color: string;
  tagline: string;
  desc: string;
  risc: string;
  cisc: string;
}

// Original detailed text provided exactly as in the snippet
const CPU_PARTS: CPUBlock[] = [
  {
    id: "alu",
    emoji: "🔢",
    icon: Calculator,
    label: "ALU",
    full: "Unidad Aritmético-Lógica",
    color: COLORS.amber,
    tagline: "La calculadora",
    desc: "Es la calculadora del procesador. Suma, resta, multiplica y toma decisiones lógicas. Sin ella, el chip no puede hacer absolutamente nada útil.",
    risc: "Opera solo con ingredientes que ya están sobre la mesa (registros). Nunca va a buscar cosas a la heladera mientras cocina. Simple, rápida y completamente predecible.",
    cisc: "Puede ir a buscar ingredientes a la heladera (memoria) mientras cocina. Hace más trabajo en un solo paso, pero tarda más en prepararse para ejecutar.",
  },
  {
    id: "uc",
    emoji: "🎯",
    icon: Target,
    label: "UC",
    full: "Unidad de Control",
    color: COLORS.blue,
    tagline: "El director de orquesta",
    desc: "Es el director de la cocina. Lee la receta (instrucción) y le dice a cada componente qué tiene que hacer. No cocina nada por sí sola — solo organiza y coordina.",
    risc: "Como un director con recetas siempre del mismo tamaño. Puede leerlas rapidísimo y dar órdenes sin dudar. Un ciclo, una orden, sin pausas.",
    cisc: "Maneja recetas de distintos tamaños y complejidad. A veces son tan largas que necesita más tiempo solo para entenderlas antes de poder empezar a cocinar.",
  },
  {
    id: "regs",
    emoji: "📋",
    icon: Database,
    label: "REGS",
    full: "Banco de Registros",
    color: COLORS.cyan,
    tagline: "La mesa de trabajo",
    desc: "Son las mesadas del chef — el espacio más cercano y accesible. Guardar algo acá es prácticamente instantáneo. Si los datos están en los registros, el procesador vuela.",
    risc: "Tiene MUCHAS mesadas (ARM64: 31 registros). El chef tiene todo a mano y rara vez necesita ir a buscar algo más lejos. Menos viajes, más velocidad.",
    cisc: "Tiene MENOS mesadas (x86-64: 16 registros). El chef tiene que ir a la heladera (memoria) con más frecuencia. Más flexible, pero con más idas y vueltas.",
  },
  {
    id: "bus",
    emoji: "🚌",
    icon: Cable,
    label: "Bus",
    full: "Bus Interno",
    color: COLORS.purple,
    tagline: "La autopista interna",
    desc: "La autopista interna del chip. Conecta todos los componentes entre sí. Si el bus falla o se satura, todo el procesador se detiene — sin importar qué tan potente sea.",
    risc: "Como una autopista muy ordenada donde todos los autos son del mismo tamaño. El tráfico fluye de manera predecible, sin embotellamientos ni sorpresas.",
    cisc: "Como una autopista con carriles de distintos anchos: a veces pasa un auto, a veces un camión. Más flexible, pero mucho más difícil de gestionar.",
  },
];

interface DraggableItemProps {
  component: CPUBlock;
  placed: boolean;
}

function DraggableItem({ component, placed }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: component.id,
      disabled: placed,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: placed ? "auto" : "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative group p-4 rounded-2xl border transition-all duration-300 ${
        placed
          ? "opacity-30 grayscale cursor-default border-white/5 bg-[#050505]"
          : isDragging
            ? "opacity-0 scale-95"
            : "cursor-grab active:cursor-grabbing hover:scale-[1.02] bg-[#0a0a0a] hover:bg-white/5 border-white/10"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 shrink-0 shadow-inner group-hover:rotate-3 transition-transform"
          style={{
            backgroundColor: `${component.color}15`,
            color: component.color,
          }}
        >
          <component.icon className="w-6 h-6" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-black tracking-widest uppercase opacity-70 mb-0.5">
            {component.label}
          </p>
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
            {placed ? "Colocado" : "Arrastrar"}
          </p>
        </div>
      </div>
      {placed && (
        <CheckCircle2 className="absolute top-2 right-2 w-3 h-3 text-emerald-500" />
      )}
    </div>
  );
}

interface DropSlotProps {
  id: string;
  label: string;
  isOccupied: boolean;
  isActive: boolean;
  onClick: () => void;
  isBus?: boolean;
}

function DropSlot({
  id,
  label,
  isOccupied,
  isActive,
  onClick,
  isBus,
}: DropSlotProps) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const { active } = useDndContext();
  const component = CPU_PARTS.find((c) => c.id === id);
  const isCorrectTarget = active?.id === id;

  return (
    <div
      ref={setNodeRef}
      onClick={isOccupied ? onClick : undefined}
      className={`relative flex flex-col items-center justify-center transition-all duration-500 rounded-3xl border-2 p-2 md:p-0 ${
        isOver
          ? "border-white/30 bg-white/5 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          : isOccupied
            ? `bg-black/40 cursor-pointer ${isActive ? "scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.05)] border-solid" : "hover:border-white/20 hover:scale-[1.01] border-solid"}`
            : isCorrectTarget
              ? "border-white/20 bg-white/5 animate-pulse scale-105"
              : "border-dashed border-white/5 bg-[#050505]"
      } ${isBus ? "h-24 md:h-28 w-full" : "aspect-square w-full"}`}
      style={{
        borderColor: isOccupied
          ? `${component?.color || "#333"}40`
          : isCorrectTarget
            ? `${component?.color || "#fff"}60`
            : undefined,
        boxShadow:
          isOccupied && isActive
            ? `0 0 40px ${component?.color || "#333"}10`
            : isCorrectTarget
              ? `0 0 30px ${component?.color || "#fff"}10`
              : "none",
      }}
    >
      {!isOccupied ? (
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 animate-pulse">
          {label}
        </span>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <div
            className={`rounded-2xl flex items-center justify-center border border-white/10 ${isBus ? "w-10 h-10" : "w-12 h-12 mb-1"}`}
            style={{
              backgroundColor: `${component?.color || "#333"}15`,
              color: component?.color || "#fff",
            }}
          >
            {component && (
              <component.icon className={isBus ? "w-5 h-5" : "w-7 h-7"} />
            )}
          </div>
          {!isBus && (
            <p
              className="text-[10px] font-black uppercase tracking-widest text-center px-2"
              style={{ color: component?.color || "#fff" }}
            >
              {component?.label}
            </p>
          )}
          <div
            className={`mt-1 flex items-center gap-1.5 px-2 py-0.5 rounded-full ${isActive ? "bg-white/10" : "bg-transparent"}`}
          >
            <span className="text-[8px] font-black text-zinc-500 tracking-wider">
              {isActive ? "OCULTAR" : "INFO"}
            </span>
            <div
              className={`w-1 h-1 rounded-full ${isOccupied ? "bg-emerald-500" : "bg-zinc-700"}`}
            />
          </div>
        </motion.div>
      )}

      {/* Bus Animation */}
      {isBus && isOccupied && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-20">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-12 rounded-full animate-[packet_3s_linear_infinite]"
              style={{
                top: `${20 + i * 20}%`,
                backgroundColor: Object.values(COLORS)[i] || "#fff",
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CPUBuilder() {
  const [placed, setPlaced] = useState<Record<string, boolean>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // For mouse: 10px movement starts drag
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      // For touch: 250ms hold starts drag, allowing scrolling if they swipe quickly
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor),
  );

  const allPlaced = useMemo(
    () => CPU_PARTS.every((b) => placed[b.id]),
    [placed],
  );

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as string);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { over, active } = e;
    if (over && over.id === active.id) {
      setPlaced((prev) => ({ ...prev, [over.id]: true }));
      setDetail(active.id as string);

      const currentlyPlacedCount = Object.keys(placed).length + 1;
      if (currentlyPlacedCount === CPU_PARTS.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: Object.values(COLORS),
        });
      }
    }
  };

  const activeComponent = CPU_PARTS.find((c) => c.id === activeId);
  const detailBlock = detail ? CPU_PARTS.find((b) => b.id === detail) : null;

  return (
    <section
      id="cpu-builder"
      className="py-20 md:py-32 px-6 bg-black border-t border-white/5 relative overflow-clip"
    >
      <style>{`
        @keyframes packet {
          0% { left: -20%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 120%; opacity: 0; }
        }
      `}</style>

      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header Block */}
        <div className="max-w-[750px] mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-blue-500" />
            <span className="font-mono text-[10px] text-blue-500 tracking-[0.2em] uppercase font-black">
              Laboratorio Experimental
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-[0.95]"
          >
            Armá el <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              Procesador
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-[600px]"
          >
            Imaginá que estás armando la cocina de un chef. Cada componente que
            colocás cumple un rol esencial en cómo se{" "}
            <span className="text-white">cocina</span> cada instrucción. Armá el
            procesador y descubrí qué hace cada parte.
          </motion.p>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          autoScroll={false}
        >
          <div className="grid xl:grid-cols-[1fr_280px] gap-12 items-start">
            {/* Visual Board */}
            <div className="space-y-8">
              <div className="flex items-center justify-between md:px-2">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-zinc-500 tracking-widest uppercase">
                      System Online
                    </span>
                  </div>
                  <div className="hidden md:block h-4 w-px bg-white/10" />
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${allPlaced ? "text-emerald-400" : "text-amber-500"}`}
                  >
                    Progreso:{" "}
                    {Math.round(
                      (Object.keys(placed).length / CPU_PARTS.length) * 100,
                    )}
                    %
                  </span>
                </div>
                <button
                  onClick={() => {
                    setPlaced({});
                    setDetail(null);
                  }}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 hover:border-red-500/30 transition-all font-mono text-[9px] uppercase font-black text-zinc-500 hover:text-red-500"
                >
                  <RefreshCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                  Resetear Chip
                </button>
              </div>

              {/* The DIE (Microchip) */}
              <div className="relative p-6 md:p-16 rounded-4xl md:rounded-[3.5rem] bg-[#030303] border border-white/10 overflow-hidden shadow-2xl">
                {/* Tech Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3b82f610,transparent_70%)]" />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                </div>

                <div className="relative z-10 space-y-8 max-w-[600px] mx-auto">
                  {/* Internal Grid */}
                  <div className="grid grid-cols-3 gap-3 md:gap-8">
                    <DropSlot
                      id="alu"
                      label="ALU"
                      isOccupied={placed.alu}
                      isActive={detail === "alu"}
                      onClick={() => setDetail(detail === "alu" ? null : "alu")}
                    />
                    <DropSlot
                      id="uc"
                      label="UC"
                      isOccupied={placed.uc}
                      isActive={detail === "uc"}
                      onClick={() => setDetail(detail === "uc" ? null : "uc")}
                    />
                    <DropSlot
                      id="regs"
                      label="REGS"
                      isOccupied={placed.regs}
                      isActive={detail === "regs"}
                      onClick={() =>
                        setDetail(detail === "regs" ? null : "regs")
                      }
                    />
                  </div>

                  {/* The Data Bus */}
                  <DropSlot
                    id="bus"
                    label="Bus de Datos"
                    isOccupied={placed.bus}
                    isActive={detail === "bus"}
                    onClick={() => setDetail(detail === "bus" ? null : "bus")}
                    isBus
                  />
                </div>

                <div className="absolute hidden md:block bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-800 tracking-[1em] uppercase font-black select-none pointer-events-none">
                  Placa de Silicio
                </div>
              </div>

              {/* Detail Panel with Framer Motion for smooth entry */}
              <AnimatePresence mode="wait">
                {detailBlock ? (
                  <motion.div
                    key={detailBlock.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="rounded-4xl overflow-hidden border border-white/10 bg-[#050505] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]"
                    style={{ borderColor: `${detailBlock.color}20` }}
                  >
                    <div className="p-8 md:p-10 border-b border-white/5 relative bg-linear-to-br from-white/2 to-transparent">
                      <div className="flex items-center gap-5 mb-6">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10"
                          style={{
                            backgroundColor: `${detailBlock.color}15`,
                            color: detailBlock.color,
                          }}
                        >
                          <detailBlock.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-black tracking-tighter text-white">
                            {detailBlock.full}
                          </h4>
                          <p
                            className="text-[11px] font-black uppercase tracking-[0.2em] opacity-50"
                            style={{ color: detailBlock.color }}
                          >
                            {detailBlock.tagline}
                          </p>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-4xl">
                        {detailBlock.desc}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2">
                      <div className="p-8 md:p-10 bg-[#eab308]/2 border-b md:border-b-0 md:border-r border-white/5 transition-colors hover:bg-[#eab308]/5">
                        <div className="flex items-center gap-3 mb-4">
                          <Zap className="w-4 h-4 text-amber-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                            Filosofía RISC
                          </span>
                        </div>
                        <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
                          {detailBlock.risc}
                        </p>
                      </div>
                      <div className="p-8 md:p-10 bg-[#3b82f6]/2 transition-colors hover:bg-[#3b82f6]/5">
                        <div className="flex items-center gap-3 mb-4">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                            Enfoque CISC
                          </span>
                        </div>
                        <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
                          {detailBlock.cisc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  allPlaced && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-10 rounded-4xl bg-emerald-500/5 border border-emerald-500/20 text-center"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                      <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">
                        Arquitectura Ensamblada
                      </h4>
                      <p className="text-emerald-500/70 text-sm font-bold uppercase tracking-widest">
                        Toca los componentes para ver el análisis comparativo
                      </p>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar Tray */}
            <div className="xl:sticky xl:top-32 space-y-6 xl:order-0 order-last">
              <div className="bg-[#050505] p-4 rounded-3xl border border-white/5">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6 text-center">
                  Bandeja de Partes
                </h3>
                <div className="grid grid-cols-2 xl:grid-cols-1 gap-3">
                  {CPU_PARTS.map((b) => (
                    <DraggableItem
                      key={b.id}
                      component={b}
                      placed={placed[b.id]}
                    />
                  ))}
                </div>
              </div>

              {/* Info Card */}
              <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 hidden xl:block">
                <div className="flex items-center gap-3 mb-3">
                  <Info className="w-4 h-4 text-blue-400" />
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    Guía de Laboratorio
                  </p>
                </div>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                  Completa el diagrama del procesador para visualizar el visor
                  de instrucciones.
                </p>
              </div>
            </div>
          </div>

          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: {
                    opacity: "0.4",
                  },
                },
              }),
            }}
          >
            {activeComponent ? (
              <div
                className="p-6 rounded-2xl bg-[#111] border-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] scale-110 flex items-center gap-5 pointer-events-none"
                style={{
                  borderColor: activeComponent.color,
                  boxShadow: `0 0 40px ${activeComponent.color}40`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10"
                  style={{
                    backgroundColor: `${activeComponent.color}20`,
                    color: activeComponent.color,
                  }}
                >
                  <activeComponent.icon className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <p
                    className="text-[10px] font-black tracking-widest uppercase opacity-70"
                    style={{ color: activeComponent.color }}
                  >
                    {activeComponent.label}
                  </p>
                  <p className="text-[11px] font-bold text-white uppercase tracking-wider">
                    Acoplando...
                  </p>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
}
