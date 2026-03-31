import { useEffect, useRef } from "react"
import { Settings, Calculator, Archive, ArrowLeftRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const cpuComponents = [
  {
    icon: Settings,
    title: "Unidad de Control (CU)",
    description: "Coordina todas las operaciones del procesador. Interpreta las instrucciones y genera las señales de control necesarias.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Calculator,
    title: "Unidad Aritmético-Lógica (ALU)",
    description: "Realiza todas las operaciones aritméticas y lógicas esenciales para el procesamiento.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Archive,
    title: "Registros Internos",
    description: "Pequeñas memorias de ultra alta velocidad. Almacenan datos críticos de forma efímera.",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    icon: ArrowLeftRight,
    title: "Interconexión",
    description: "Buses internos que permiten la comunicación a velocidades nanométricas.",
    color: "bg-chart-4/10 text-chart-4",
  },
]

export function CPUSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cpu-part", {
        scrollTrigger: {
          trigger: ".cpu-diagram",
          start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="cpu" ref={sectionRef} className="py-32 px-6 bg-secondary/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="inline-block px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 tracking-wider uppercase border border-primary/20">
            Microarquitectura
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-foreground mb-8 tracking-tighter leading-tight">
            El <span className="text-primary italic">Corazón</span> Digital
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            La Unidad Central de Procesamiento está compuesta por varios elementos que trabajan
            en nanosegundos para ejecutar billones de instrucciones.
          </p>
        </div>

        {/* CPU Internal Diagram Tech Style */}
        <div className="cpu-diagram mb-24 p-12 rounded-[3.5rem] bg-card/60 glass border-2 border-primary/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative">
          <div className="absolute -top-6 left-12 px-8 py-2 bg-primary text-primary-foreground text-lg font-black rounded-3xl tracking-widest uppercase">
            Procesador
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="cpu-part p-10 rounded-[2rem] bg-primary/10 border border-primary/20 backdrop-blur-md hover:bg-primary/20 transition-all duration-500">
              <Settings className="w-14 h-14 text-primary mb-6" />
              <h3 className="text-2xl font-black text-foreground mb-4">Unidad de Control</h3>
              <ul className="text-base text-muted-foreground space-y-3">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Decodifica instrucciones</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Genera señales de control</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Sincroniza operaciones</li>
              </ul>
            </div>

            <div className="cpu-part p-10 rounded-[2rem] bg-accent/10 border border-accent/20 backdrop-blur-md hover:bg-accent/20 transition-all duration-500">
              <Calculator className="w-14 h-14 text-accent mb-6" />
              <h3 className="text-2xl font-black text-foreground mb-4">ALU</h3>
              <ul className="text-base text-muted-foreground space-y-3">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Operaciones aritméticas</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Operaciones lógicas</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Comparaciones</li>
              </ul>
            </div>

            <div className="cpu-part p-10 rounded-[2rem] bg-chart-3/10 border border-chart-3/20 backdrop-blur-md hover:bg-chart-3/20 transition-all duration-500">
              <Archive className="w-14 h-14 text-chart-3 mb-6" />
              <h3 className="text-2xl font-black text-foreground mb-4">Registros</h3>
              <ul className="text-base text-muted-foreground space-y-3">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-chart-3" /> Contador de Programa (PC)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-chart-3" /> Registro de Instrucción (IR)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-chart-3" /> Acumuladores e Índices</li>
              </ul>
            </div>
          </div>

          <div className="cpu-part mt-10 p-10 rounded-[2rem] bg-chart-4/10 border border-chart-4/20 text-center relative overflow-hidden group">
            <span className="text-lg font-black text-foreground uppercase tracking-[0.5em]">Bus Interno del CPU</span>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-chart-4 to-transparent animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cpuComponents.map((component) => (
            <div
              key={component.title}
              className="cpu-part flex items-start gap-8 p-10 rounded-[2.5rem] bg-card border border-white/5 hover:border-white/20 transition-all duration-500 shadow-xl"
            >
              <div className={`w-20 h-20 rounded-[1.5rem] ${component.color} flex items-center justify-center shrink-0`}>
                <component.icon className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">{component.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{component.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
