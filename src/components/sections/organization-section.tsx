import { useEffect, useRef } from "react"
import { Zap, Boxes, Cable, Database } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const organizationFeatures = [
  {
    icon: Zap,
    title: "Señales de Control",
    description: "Señales eléctricas que coordinan las operaciones entre los componentes del hardware.",
  },
  {
    icon: Boxes,
    title: "Unidades de Hardware",
    description: "Componentes físicos como la ALU, registros, y unidad de control que ejecutan las operaciones.",
  },
  {
    icon: Cable,
    title: "Interfaces",
    description: "Conexiones entre los diferentes componentes y buses que permiten la comunicación.",
  },
  {
    icon: Database,
    title: "Tecnología de Memoria",
    description: "Tipo de memoria utilizada: SRAM, DRAM, caché multinivel, etc.",
  },
]

export function OrganizationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".org-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)"
      })

      gsap.from(".org-diagram", {
        scrollTrigger: {
          trigger: ".org-diagram",
          start: "top 90%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="organization" ref={sectionRef} className="py-32 px-6 relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="inline-block px-6 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 tracking-wider uppercase border border-accent/20">
            Implementación del Hardware
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-foreground mb-8 tracking-tighter leading-tight">
            ¿Qué es la <span className="text-accent">Organización</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Se refiere a <strong className="text-foreground">cómo se implementan internamente</strong> los
            componentes. Son los detalles de construcción que el programador no necesita conocer.
          </p>
        </div>

        {/* Hardware Diagram */}
        <div className="org-diagram mb-24 p-12 rounded-[2.5rem] bg-card border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.4)] glass overflow-hidden group">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Lines Decor */}
            <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
              <svg className="w-full h-full" viewBox="0 0 800 100">
                <line x1="150" y1="50" x2="650" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
              </svg>
            </div>

            {organizationFeatures.slice(0, 3).map((f) => (
              <div key={f.title} className="flex flex-col items-center">
                <div className="w-full p-8 rounded-3xl bg-accent/5 border border-accent/20 text-center hover:bg-accent/10 hover:border-accent/40 transition-all duration-500 transform group-hover:translate-y-[-5px]">
                  <span className="font-extrabold text-lg text-foreground uppercase tracking-widest">{f.title}</span>
                </div>
                <div className="w-1 h-12 bg-gradient-to-b from-accent/40 to-transparent" />
              </div>
            ))}
          </div>

          <div className="mt-4 p-8 rounded-2xl bg-secondary/30 text-center border border-white/5 relative overflow-hidden group/bus">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent translate-x-[-100%] group-hover/bus:translate-x-[100%] transition-transform duration-1000" />
            <span className="text-base text-accent font-black uppercase tracking-[0.3em]">
              Bus Interno del Procesador
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {organizationFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="org-card group hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 bg-card border-white/5 shadow-xl rounded-3xl"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
                    <feature.icon className="w-8 h-8 text-accent" />
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
      </div>
    </section>
  )
}
