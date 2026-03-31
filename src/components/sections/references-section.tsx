import { useEffect, useRef } from "react"
import { BookOpen, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import gsap from "gsap"

const references = [
  {
    author: "William Stallings",
    title: "Computer Organization and Architecture: Designing for Performance",
    edition: "11th Edition",
    publisher: "Pearson",
    description: "Texto clásico que cubre tanto la arquitectura como la organización de sistemas computacionales modernos.",
  },
  {
    author: "John L. Hennessy & David A. Patterson",
    title: "Computer Architecture: A Quantitative Approach",
    edition: "6th Edition",
    publisher: "Morgan Kaufmann",
    description: "Referencia fundamental para el diseño de arquitecturas de computas con enfoque cuantitativo.",
  },
  {
    author: "David A. Patterson & John L. Hennessy",
    title: "Computer Organization and Design: The Hardware/Software Interface",
    edition: "RISC-V Edition",
    publisher: "Morgan Kaufmann",
    description: "Excelente introducción a la organización de computadoras usando la arquitectura RISC-V.",
  },
]

export function ReferencesSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ref-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
        opacity: 0,
        x: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="references" ref={containerRef} className="py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <span className="inline-block px-6 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 tracking-wider uppercase border border-accent/20">
            Bibliografía
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-foreground mb-8 tracking-tighter leading-tight">
            Fuentes <span className="text-accent">Académicas</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Referencias fundamentales para profundizar en el estudio de los sistemas digitales modernos.
          </p>
        </div>

        <div className="space-y-10">
          {references.map((reference, i) => (
            <Card
              key={reference.title}
              className="ref-card group hover:scale-[1.01] transition-transform duration-500 bg-card border-white/5 shadow-2xl relative overflow-hidden rounded-[2.5rem]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />
              <CardContent className="p-12">
                <div className="flex flex-col md:flex-row items-start gap-10">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-primary/10 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                    <BookOpen className="w-10 h-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-foreground mb-3 tracking-tight">{reference.title}</h3>
                    <p className="text-xl text-primary font-bold mb-4">{reference.author}</p>
                    <p className="text-lg text-muted-foreground mb-6 font-medium">
                      {reference.edition} • {reference.publisher}
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed italic">{reference.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Premium */}
        <div className="mt-40 pt-16 border-t border-white/5 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <p className="text-lg text-muted-foreground mb-8 font-medium">
            Presentación creada para fines educativos • Arquitectura de Computadoras 2026
          </p>
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-secondary/20 border border-white/5 backdrop-blur-md text-base text-muted-foreground group hover:text-foreground transition-colors cursor-pointer">
            <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-bold tracking-widest uppercase text-xs">Acceder a Repositorio Digital</span>
          </div>
        </div>
      </div>
    </section>
  )
}
