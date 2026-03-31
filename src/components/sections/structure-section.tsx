import { useEffect, useRef } from "react"
import { Cpu, MemoryStick, MonitorCog, Network } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const components = [
  {
    icon: Cpu,
    title: "CPU",
    description: "Unidad Central de Procesamiento que ejecuta las instrucciones.",
    bgColor: "bg-primary/10",
    textColor: "text-primary",
  },
  {
    icon: MemoryStick,
    title: "Memoria Principal",
    description: "Almacena datos e instrucciones durante la ejecución.",
    bgColor: "bg-accent/10",
    textColor: "text-accent",
  },
  {
    icon: MonitorCog,
    title: "Entrada/Salida",
    description: "Dispositivos para comunicación con el exterior.",
    bgColor: "bg-chart-3/10",
    textColor: "text-chart-3",
  },
  {
    icon: Network,
    title: "Interconexión",
    description: "Buses y conexiones que comunican los componentes.",
    bgColor: "bg-chart-4/10",
    textColor: "text-chart-4",
  },
]

export function StructureSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".struct-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        rotateY: 45,
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="structure" ref={sectionRef} className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="inline-block px-6 py-2 rounded-full bg-chart-4/10 text-chart-4 text-sm font-bold mb-6 tracking-wider uppercase border border-white/5">
            Arquitectura de Alto Nivel
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-foreground mb-8 tracking-tighter leading-tight">
            Estructura <span className="text-chart-4">Modular</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Una computadora se compone de cuatro elementos fundamentales que trabajan en conjunto
            para procesar información eficientemente.
          </p>
        </div>

        {/* Visual Diagram Layer 3D */}
        <div className="mb-24 p-12 rounded-[3.5rem] bg-card border border-white/5 shadow-2xl glass relative overflow-hidden group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="struct-card p-10 rounded-[2.5rem] bg-primary/10 border-2 border-primary/20 text-center hover:bg-primary/20 transition-all duration-500">
              <Cpu className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-black text-foreground mb-2 tracking-tight">CPU</h3>
              <p className="text-lg text-muted-foreground">Unidad Central de Procesamiento</p>
            </div>
            <div className="struct-card p-10 rounded-[2.5rem] bg-accent/10 border-2 border-accent/20 text-center hover:bg-accent/20 transition-all duration-500">
              <MemoryStick className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="text-3xl font-black text-foreground mb-2 tracking-tight">Memoria</h3>
              <p className="text-lg text-muted-foreground">RAM y almacenamiento temporal</p>
            </div>
          </div>

          <div className="struct-card p-8 rounded-[2.5rem] bg-chart-4/5 border-2 border-chart-4/20 text-center mb-12 relative overflow-hidden group/bus">
            <Network className="w-12 h-12 text-chart-4 mx-auto mb-3" />
            <h3 className="text-2xl font-black text-foreground mb-2 tracking-widest uppercase">Bus del Sistema</h3>
            <p className="text-lg text-muted-foreground">Datos, Direcciones y Control</p>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-chart-4/5 to-transparent -translate-x-full group-hover/bus:translate-x-full transition-transform duration-1000" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["Teclado", "Monitor", "Disco"].map((io, i) => (
              <div key={io} className="struct-card p-6 rounded-2xl bg-chart-3/5 border border-chart-3/20 text-center hover:bg-chart-3/10 transition-colors">
                <span className="text-lg font-bold text-foreground uppercase tracking-widest">{io}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {components.map((component) => (
            <div
              key={component.title}
              className="p-8 rounded-3xl bg-card border border-white/5 hover:border-white/20 hover:shadow-2xl transition-all duration-500 text-center group"
            >
              <div
                className={`w-20 h-20 rounded-2xl ${component.bgColor} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
              >
                <component.icon className={`w-10 h-10 ${component.textColor}`} />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">{component.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{component.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
