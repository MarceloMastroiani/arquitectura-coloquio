import { Zap, Wrench, BarChart2, CheckCircle2, Package, Target, HardDrive, Smartphone, Laptop } from "lucide-react"

export function ExecutionVisualizer() {
  return (
    <section id="visualizer" className="py-24 px-6 bg-black text-white relative">
      <div className="max-w-[1200px] mx-auto border-t border-white/5 pt-20">
        
        {/* RISC Part */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10 flex-wrap">
            <h3 className="text-4xl font-black flex items-center gap-4 tracking-tight">
              <Zap className="text-[#eab308] w-10 h-10" /> RISC Moderno
            </h3>
            <span className="px-3 py-1.5 rounded-md bg-[#eab308]/10 text-[#eab308] text-[10px] font-black uppercase tracking-widest border border-[#eab308]/20 mt-1">EJEMPLO INTUITIVO</span>
            <span className="px-3 py-1.5 rounded-md bg-white/5 text-zinc-400 text-[10px] font-black uppercase tracking-widest border border-white/10 mt-1">1 CICLO = 1 INSTRUCCIÓN</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Background connection line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden md:block -translate-y-1/2 z-0" />
            
            <div className="p-8 rounded-[2rem] bg-[#050505] border border-white/5 z-10 flex flex-col items-center text-center relative overflow-hidden group hover:border-[#eab308]/30 transition-colors">
              <div className="w-16 h-16 rounded-[1rem] bg-[#111] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-[#eab308]" />
              </div>
              <p className="font-black text-xl tracking-tight mb-2">CARGAR A</p>
              <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] mb-6">MEMORIA -&gt; REGISTRO</p>
              <span className="text-xs font-black text-[#eab308] tracking-widest uppercase">Ciclo 1</span>
            </div>
            
            <div className="p-8 rounded-[2rem] bg-[#050505] border border-white/5 z-10 flex flex-col items-center text-center relative overflow-hidden group hover:border-[#eab308]/30 transition-colors">
              <div className="w-16 h-16 rounded-[1rem] bg-[#111] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-[#eab308]" />
              </div>
              <p className="font-black text-xl tracking-tight mb-2">SUMAR A, B</p>
              <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] mb-6">ALU (REGISTROS)</p>
              <span className="text-xs font-black text-[#eab308] tracking-widest uppercase">Ciclo 2</span>
            </div>

            <div className="p-8 rounded-[2rem] bg-[#050505] border border-white/5 z-10 flex flex-col items-center text-center relative overflow-hidden group hover:border-[#eab308]/30 transition-colors">
              <div className="w-16 h-16 rounded-[1rem] bg-[#111] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HardDrive className="w-8 h-8 text-[#eab308]" />
              </div>
              <p className="font-black text-xl tracking-tight mb-2">GUARDAR C</p>
              <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] mb-6">REGISTRO -&gt; MEMORIA</p>
              <span className="text-xs font-black text-[#eab308] tracking-widest uppercase">Ciclo 3</span>
            </div>
          </div>
          <p className="text-center text-xs text-zinc-500 mt-10 font-bold tracking-widest uppercase">Múltiples instrucciones simples que toman 1 ciclo atómico cada una.</p>
        </div>

        {/* CISC Part */}
        <div className="mb-24 border-t border-white/5 pt-20">
          <div className="flex items-center gap-4 flex-wrap mb-4">
            <h3 className="text-4xl font-black flex items-center gap-4 tracking-tight">
              <Wrench className="text-[#3b82f6] w-10 h-10" /> CISC Variable
            </h3>
            <span className="px-3 py-1.5 rounded-md bg-[#3b82f6]/10 text-[#3b82f6] text-[10px] font-black uppercase tracking-widest border border-[#3b82f6]/20 mt-1">X86 AMD / INTEL</span>
            <span className="px-3 py-1.5 rounded-md bg-white/5 text-zinc-400 text-[10px] font-black uppercase tracking-widest border border-white/10 mt-1">1 INSTRUCCIÓN LARGA</span>
          </div>
            
          <p className="text-zinc-400 font-medium text-lg max-w-2xl mb-12">La longitud de la instrucción requerida por el procesador depende enteramente de la complejidad intrínseca de la tarea solicitada al hardware.</p>
          
          <div className="flex flex-col gap-6">
            {/* Short instruction */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="text-xs text-zinc-500 font-black tracking-widest w-32 shrink-0 md:text-right">2 BYTES</span>
              <div className="h-16 w-full md:w-[25%] rounded-[1rem] bg-[#050505] border border-white/10 flex items-center px-6 transition-colors hover:border-[#3b82f6]/40 cursor-help">
                 <span className="text-[#3b82f6] font-black tracking-widest">ADD EAX, EBX</span>
              </div>
            </div>
            
            {/* Medium instruction */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="text-xs text-zinc-500 font-black tracking-widest w-32 shrink-0 md:text-right">6 BYTES</span>
              <div className="h-16 w-full md:w-[50%] rounded-[1rem] bg-[#050505] border border-white/10 flex items-center px-6 relative overflow-hidden group hover:border-[#3b82f6]/40 transition-colors cursor-help">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#3b82f6]/50 to-transparent" />
                <span className="text-[#3b82f6] font-black tracking-widest truncate relative z-10">ADD [EAX + 4], EBX</span>
                <span className="absolute right-6 text-[10px] text-zinc-500 tracking-widest font-bold hidden sm:block">MEMORIA Y REGISTROS</span>
              </div>
            </div>

            {/* Huge instruction */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="text-xs text-[#3b82f6] font-black tracking-widest w-32 shrink-0 md:text-right">15 BYTES (Max)</span>
              <div className="h-20 w-full rounded-[1.5rem] bg-[#0a0a0a] border-2 border-[#3b82f6]/30 flex items-center px-6 md:px-8 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)] group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/5 to-transparent" />
                <div className="absolute right-4 text-[#3b82f6] opacity-10 group-hover:scale-110 transition-transform">
                  <Target className="w-48 h-48" />
                </div>
                <span className="text-[#3b82f6] font-black tracking-widest text-sm sm:text-[17px] relative z-10 truncate drop-shadow-lg">
                  LOCK ADD DWORD PTR [RAX + RBX*4 + 0x12], 0xABCDEF
                </span>
                <span className="absolute right-8 text-[10px] bg-[#3b82f6]/20 text-[#3b82f6] px-3 py-1.5 rounded font-black tracking-[0.2em] hidden lg:block backdrop-blur-sm border border-[#3b82f6]/30">INSTRUCCIÓN ATÓMICA DE X86-64</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion Visual */}
        <div className="border-t border-white/5 pt-20">
          <h2 className="text-4xl font-black mb-12 flex items-center gap-4 tracking-tight">
            <BarChart2 className="w-10 h-10 text-white" /> Conclusión Visual
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* RISC Summary */}
            <div className="p-10 rounded-[2.5rem] bg-[#050505] border border-white/5 hover:border-white/10 transition-colors">
              <p className="text-[#eab308] text-[11px] font-black tracking-[0.3em] mb-10 uppercase">Arquitectura RISC</p>
              
              <div className="flex gap-2 mb-10 items-center h-14">
                {[...Array(12)].map((_, i) => (
                  <div key={`risc-${i}`} className="flex-1 h-full bg-[#eab308]/20 rounded-md border-b-2 border-[#eab308]/60" />
                ))}
              </div>

              <p className="text-zinc-400 font-medium leading-relaxed mb-6">
                Transistores volcados en optimizar la ejecución predecible. Instrucciones de mismo tamaño que permiten a la unidad de decodificación trabajar rapidísimo.
              </p>
              <ul className="text-xs font-black tracking-[0.15em] uppercase space-y-3 text-[#eab308]">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5"/> Mucha Caché y Más Registros Internos</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5"/> Compiladores Más Inteligentes y Pesados</li>
              </ul>
            </div>

            {/* CISC Summary */}
            <div className="p-10 rounded-[2.5rem] bg-[#050505] border border-white/5 hover:border-white/10 transition-colors">
              <p className="text-[#3b82f6] text-[11px] font-black tracking-[0.3em] mb-10 uppercase">Arquitectura CISC</p>
              
              <div className="flex gap-2 mb-10 items-center h-14">
                <div className="w-[15%] h-full bg-[#3b82f6]/20 rounded-md border-b-2 border-[#3b82f6]/60" />
                <div className="w-[45%] h-full bg-[#3b82f6]/20 rounded-md border-b-2 border-[#3b82f6]/60" />
                <div className="w-[10%] h-full bg-[#3b82f6]/20 rounded-md border-b-2 border-[#3b82f6]/60" />
                <div className="w-[30%] h-full bg-[#3b82f6]/20 rounded-md border-b-2 border-[#3b82f6]/60" />
              </div>

              <p className="text-zinc-400 font-medium leading-relaxed mb-6">
                Porciones inmensas del silicio están dedicadas 100% a decodificar y traducir enormemente largas instrucciones a micro-código inteligible.
              </p>
              <ul className="text-xs font-black tracking-[0.15em] uppercase space-y-3 text-[#3b82f6]">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5"/> Unidad de Control Ultra-Compleja Interna</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5"/> Retrocompatibilidad Extrema (Legacy)</li>
              </ul>
            </div>
          </div>

          {/* CHIPS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            <div className="p-6 md:p-8 rounded-[2rem] bg-[#050505] border border-white/5 flex flex-col items-start hover:border-[#3b82f6]/40 transition-all group">
              <div className="w-12 h-12 rounded-full bg-[#3b82f6] mb-5 flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">i9</div>
              <h4 className="font-bold text-white mb-1.5 text-balance">Intel Core i9 14900K</h4>
              <span className="text-[10px] font-black tracking-widest text-[#3b82f6] mb-6">CISC / X86</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-auto"><Laptop className="w-4 h-4 inline mr-2"/> PC / Server</p>
            </div>
            
            <div className="p-6 md:p-8 rounded-[2rem] bg-[#050505] border border-white/5 flex flex-col items-start hover:border-red-500/40 transition-all group">
              <div className="w-12 h-12 rounded-full bg-red-600 mb-5 flex items-center justify-center text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]"><Zap className="w-6 h-6"/></div>
              <h4 className="font-bold text-white mb-1.5 text-balance">AMD Ryzen 9 7950X</h4>
              <span className="text-[10px] font-black tracking-widest text-red-500 mb-6">CISC / X86</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-auto"><Laptop className="w-4 h-4 inline mr-2"/> PC / Server</p>
            </div>
            
            <div className="p-6 md:p-8 rounded-[2rem] bg-[#050505] border border-white/5 flex flex-col items-start hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-full bg-emerald-500 mb-5 flex items-center justify-center text-black font-black text-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)]"></div>
              <h4 className="font-bold text-white mb-1.5 text-balance">Apple M3 Max</h4>
              <span className="text-[10px] font-black tracking-widest text-emerald-400 mb-6">RISC / ARM</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-auto"><Laptop className="w-4 h-4 inline mr-2"/> Premium</p>
            </div>
            
            <div className="p-6 md:p-8 rounded-[2rem] bg-[#050505] border border-white/5 flex flex-col items-start hover:border-orange-500/40 transition-all group">
              <div className="w-12 h-12 rounded-full bg-orange-500 mb-5 flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(249,115,22,0.3)]">🔥</div>
              <h4 className="font-bold text-white mb-1.5 text-balance">Snapdragon 8 Gen 3</h4>
              <span className="text-[10px] font-black tracking-widest text-orange-400 mb-6">RISC / ARM</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-auto"><Smartphone className="w-4 h-4 inline mr-2"/> Mobile SoC</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
