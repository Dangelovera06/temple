import React from "react";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Hero from "../components/landing/Hero";
import HardTruth from "../components/landing/HardTruth";
import EmotionalCore from "../components/landing/EmotionalCore";
import Proof from "../components/landing/Proof";
import Blueprint from "../components/landing/Blueprint";
import FinalClose from "../components/landing/FinalClose";

export default function Landing() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden w-full" style={{ backgroundColor: 'var(--neutral-950)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl w-full" style={{ backgroundColor: 'var(--alpha-white-5)', borderBottom: '1px solid var(--alpha-white-10)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="text-xl sm:text-2xl" style={{ color: 'var(--white)', fontFamily: 'var(--font-display)' }}>
              Archify.io
            </div>
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#proof" className="text-sm transition-colors hover:text-white" style={{ color: 'var(--neutral-400)' }}>Results</a>
              <a href="#blueprint" className="text-sm transition-colors hover:text-white" style={{ color: 'var(--neutral-400)' }}>How It Works</a>
              <button
                className="relative inline-flex items-center justify-center gap-2 rounded-xl px-4 sm:px-6 py-2 text-black transition-all active:translate-y-px active:scale-[0.99] hover:saturate-110 hover:brightness-105 text-sm"
                style={{
                  background: "linear-gradient(290deg, #ffd999 0%, #ffb433 30.2857%, #f5d49a 67.2878%, #ffb433 100%)",
                  boxShadow: "0 1px 0 rgba(0,0,0,.08)"
                }}
              >
                <span 
                  className="pointer-events-none absolute inset-0 rounded-full blur-[10px] opacity-40"
                  style={{
                    background: "radial-gradient(50% 50% at 50% 50%, #ffc766 0%, rgba(0,0,0,0) 100%)"
                  }}
                />
                <span 
                  className="pointer-events-none absolute inset-0 rounded-full blur-[10px]"
                  style={{
                    background: "radial-gradient(50% 50% at 50% 50%, #ffd999 0%, rgba(0,0,0,0) 100%)"
                  }}
                />
                <span className="relative font-semibold leading-relaxed whitespace-nowrap">
                  Get Started
                </span>
              </button>
            </div>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="p-2 transition-colors"
                    style={{ color: 'var(--white)' }}
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48"
                  style={{ 
                    backgroundColor: 'var(--neutral-900)', 
                    borderColor: 'var(--alpha-white-10)',
                    color: 'var(--white)'
                  }}
                >
                  <DropdownMenuItem 
                    onClick={() => scrollToSection('proof')}
                    className="cursor-pointer"
                    style={{ color: 'var(--neutral-300)' }}
                  >
                    Results
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => scrollToSection('blueprint')}
                    className="cursor-pointer"
                    style={{ color: 'var(--neutral-300)' }}
                  >
                    How It Works
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="cursor-pointer"
                    style={{ color: 'var(--neutral-300)' }}
                  >
                    Get Started
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <Hero />
      <HardTruth />
      <EmotionalCore />
      <Proof />
      <Blueprint />
      <FinalClose />

      {/* Footer */}
      <footer className="py-8 sm:py-12 w-full" style={{ borderTop: '1px solid var(--alpha-white-10)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl sm:text-2xl mb-3 sm:mb-4" style={{ color: 'var(--white)', fontFamily: 'var(--font-display)' }}>
            Archify.io
          </div>
          <p className="text-xs sm:text-sm mb-6 sm:mb-8" style={{ color: 'var(--neutral-500)' }}>
            Turning social media into predictable implant revenue
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 sm:mb-8">
            <a href="#" className="text-xs sm:text-sm transition-colors hover:text-white" style={{ color: 'var(--neutral-400)' }}>Privacy Policy</a>
            <a href="#" className="text-xs sm:text-sm transition-colors hover:text-white" style={{ color: 'var(--neutral-400)' }}>Terms of Service</a>
            <a href="#" className="text-xs sm:text-sm transition-colors hover:text-white" style={{ color: 'var(--neutral-400)' }}>Contact</a>
          </div>
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--neutral-600)' }}>
            © 2025 Archify.io. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}