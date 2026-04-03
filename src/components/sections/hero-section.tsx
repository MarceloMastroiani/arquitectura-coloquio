import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-elem", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".vs-cisc", {
        y: 1000,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from(".vs-risc", {
        y: -1000,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen relative flex items-center pt-20 overflow-hidden bg-[#000000] text-white"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/8 select-none pointer-events-none leading-none tracking-tighter mix-blend-screen">
        <span className="vs-cisc inline-block">V</span>
        <span className="vs-risc inline-block">S</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 relative z-10">
        {/* CISC Side */}
        <div className="hero-elem flex flex-col items-start justify-center lg:pr-12">
          <p className="text-[#3b82f6] text-xs font-black tracking-[0.2em] mb-4 uppercase">
            Complex Instruction Set Computer
          </p>
          <h1 className="text-8xl lg:text-[10rem] font-black tracking-tighter mb-4 leading-none">
            CISC
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-medium mb-8 max-w-md leading-relaxed">
            Hace más con menos instrucciones. Una sola orden puede desencadenar
            decenas de operaciones internas.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-5 py-2 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-bold tracking-widest uppercase">
              x86
            </span>
            <span className="px-5 py-2 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-bold tracking-widest uppercase">
              Intel Core
            </span>
            <span className="px-5 py-2 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-bold tracking-widest uppercase">
              AMD Ryzen
            </span>
          </div>
        </div>

        {/* RISC Side */}
        <div className="hero-elem flex flex-col items-start lg:items-end lg:flex-col justify-center text-left lg:text-right lg:pl-12">
          <div className="w-full flex justify-start lg:justify-end">
            <p className="text-[#eab308] text-xs font-black tracking-[0.2em] mb-4 uppercase">
              Reduced Instruction Set Computer
            </p>
          </div>
          <h1 className="text-8xl lg:text-[10rem] font-black tracking-tighter mb-4 w-full leading-none text-left lg:text-right">
            RISC
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-medium mb-8 max-w-md leading-relaxed ml-auto text-left lg:text-right">
            Hace menos por instrucción, pero las ejecuta tan rápido que igual
            gana. Velocidad sobre complejidad.
          </p>
          <div className="flex flex-wrap gap-3 w-full justify-start lg:justify-end">
            <span className="px-5 py-2 rounded-full border border-[#eab308]/30 bg-[#eab308]/10 text-[#eab308] text-xs font-bold tracking-widest uppercase">
              ARM
            </span>
            <span className="px-5 py-2 rounded-full border border-[#eab308]/30 bg-[#eab308]/10 text-[#eab308] text-xs font-bold tracking-widest uppercase">
              Apple Silicon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
