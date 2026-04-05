import { useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function DifferencesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ttl-section",
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".diff-card",
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".diff-card",
            start: "top 85%",
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="differences"
      ref={containerRef}
      className="py-24 px-6 bg-[#030303] text-white overflow-hidden relative border-t border-white/5"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-white/20 to-transparent" />

      <div className="ttl-container max-w-[1200px] mx-auto">
        <div className="ttl-section mb-20 pt-10">
          <p className="text-[#a1a1aa] text-[10px] font-black tracking-[0.3em] mb-4 uppercase">
            ¿Cuál es la diferencia?
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            Diferentes caminos
            <br />
            <span className=" text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-400">
              un mismo objetivo
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl font-medium">
            La arquitectura no es un estilo, es una decisión de diseño. ¿Debería
            el hardware ser inteligente o el compilador?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-xs font-black text-[#a1a1aa] shadow-xl">
            VS
          </div>

          <div className="diff-card p-6 md:p-12 rounded-4xl bg-[#0a0a0a] border border-white/5 hover:border-[#3b82f6]/30 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/5 rounded-bl-[100px] transition-colors group-hover:bg-[#3b82f6]/10" />

            <div className="mb-10 text-[#3b82f6]">
              <div className="w-12 h-12 bg-[#3b82f6]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#3b82f6]/20 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-xl font-black tracking-tight">CISC</p>
            </div>

            <h3 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight leading-tight">
              Maximizar poder por instrucción
            </h3>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6] text-[10px] font-black tracking-[0.2em] uppercase mb-8">
              👨‍🍳 Analogía: Servicio Completo
            </div>

            <p className="text-[#a1a1aa] leading-relaxed font-medium text-lg">
              El programa le dice al procesador: "Haz un pastel". El procesador
              tiene una instrucción compleja interna que: busca los
              ingredientes, bate, hornea y entrega el resultado. Hardware
              complejo, código simple.
            </p>
          </div>

          <div className="diff-card p-6 md:p-12 rounded-4xl bg-[#0a0a0a] border border-white/5 hover:border-[#eab308]/30 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#eab308]/5 rounded-bl-[100px] transition-colors group-hover:bg-[#eab308]/10" />

            <div className="mb-10 text-[#eab308]">
              <div className="w-12 h-12 bg-[#eab308]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#eab308]/20 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-xl font-black tracking-tight">RISC</p>
            </div>

            <h3 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight leading-tight">
              Simplicidad = Velocidad
            </h3>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#eab308]/10 border border-[#eab308]/20 text-[#eab308] text-[10px] font-black tracking-[0.2em] uppercase mb-8">
              👨‍🍳 Analogía: Chef Especializado
            </div>

            <p className="text-[#a1a1aa] leading-relaxed font-medium text-lg">
              El programa dice: 'Busca harina', 'Busca huevos', 'Mezcla',
              'Hornea'. Múltiples instrucciones simples, que se ejecutan en un
              único ciclo de reloj. Hardware simple, código complejo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
