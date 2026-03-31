import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { DifferencesSection } from '@/components/sections/differences-section'
import { CPUBuilder } from '@/components/sections/cpu-builder'
import { ExecutionVisualizer } from '@/components/sections/execution-visualizer'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="arch-theme">
      <main className="min-h-screen bg-black text-white selection:bg-white/20 overflow-x-hidden">
        <Navigation />
        <HeroSection />
        <DifferencesSection />
        <CPUBuilder />
        <ExecutionVisualizer />
      </main>
    </ThemeProvider>
  )
}
