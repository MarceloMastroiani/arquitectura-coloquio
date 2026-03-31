import { useState, useEffect } from "react"
import { Cpu } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
      <nav className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg border border-white/10">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold tracking-tight text-xl">Arquitectura.</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase items-center text-zinc-400">
          <a href="#hero" className="hover:text-white transition-colors">Inicio</a>
          <a href="#differences" className="hover:text-white transition-colors">Diferencias</a>
          <a href="#cpu-builder" className="hover:text-white transition-colors">Laboratorio</a>
        </div>
      </nav>
    </header>
  )
}
