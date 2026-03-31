import { useEffect, useRef } from "react"
import { Code, Binary, MapPin, Plug } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const architectureFeatures = [
  {
    icon: Code,
    title: "Conjunto de Instrucciones",
    description: "Define las operaciones que el procesador puede ejecutar, como ADD, MOV, JMP, etc.",
    color: "primary"
  },
  {
    icon: Binary,
    title: "Representación de Datos",
    description: "Cómo se representan los números, caracteres y otros tipos de datos en el sistema.",
    color: "accent"
  },
  {
    icon: MapPin,
    title: "Mecanismos de Direccionamiento",
    description: "Los modos en que se puede acceder a la memoria: directo, indirecto, indexado, etc.",
    color: "chart-3"
  },
  {
    icon: Plug,
    title: "Mecanismos de E/S",
    description: "Cómo el procesador se comunica con los dispositivos de entrada y salida.",
    color: "chart-4"
  },
]

export function ArchitectureSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".arch-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="architecture" ref={sectionRef} className="py-32 px-6 relative overflow-hidden bg-secondary/10">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="inline-block px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 tracking-wider uppercase border border-primary/20">
            Perspectiva del Programador
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-foreground mb-8 tracking-tighter leading-tight">
            ¿Qué es la <span className="text-primary">Arquitectura</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Se refiere a los <strong className="text-foreground">atributos visibles para el programador</strong>.
            Son las características que afectan la ejecución lógica de un programa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {architectureFeatures.map((feature, i) => (
            <Card
              key={feature.title}
              className="arch-card group hover:scale-[1.02] transition-all duration-500 bg-card/40 border-white/5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-primary/20 transition-all group-hover:w-full group-hover:opacity-5 group-hover:bg-primary" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-8 h-8 text-primary group-hover:animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/20 glass text-center">
          <p className="text-lg text-muted-foreground inline-flex flex-wrap justify-center items-center gap-3">
            <span className="font-black text-foreground px-3 py-1 rounded bg-primary/10">Ejemplo:</span> 
            La arquitectura x86 define instrucciones como 
            <code className="px-3 py-1 rounded-lg bg-black text-primary font-mono text-sm border border-primary/20">MOV</code>
            <code className="px-3 py-1 rounded-lg bg-black text-primary font-mono text-sm border border-primary/20">ADD</code>
            e independientemente del fabricante (Intel o AMD).
          </p>
        </div>
      </div>
    </section>
  )
}
