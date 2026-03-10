import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {/* Gradient Glow */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[140px]" 
          style={{ 
            background: 'radial-gradient(circle, var(--brand-300) 0%, transparent 70%)',
            opacity: 0.12
          }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-8 leading-tight px-2" style={{ color: 'var(--white)', fontFamily: 'var(--font-display)' }}>
            The Proven Blueprint for{' '}
            <span style={{ color: 'var(--brand-200)' }}>Full-Arch Growth</span>
            {' '}— Launch in Under 7 Days
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto px-4" style={{ color: 'var(--white)', lineHeight: '1.6' }}>
            Turn social media into 20+ implant consults in 14 days — and add $500K+ in predictable revenue
          </p>

          <div className="flex flex-col items-center gap-4 md:gap-6 mb-6 md:mb-8 px-4">
            <button
              className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-black transition-all active:translate-y-px active:scale-[0.99] hover:saturate-110 hover:brightness-105"
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
              <span className="relative font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed whitespace-nowrap flex items-center justify-center gap-2">
                <span>Get the Blueprint. Get the Patients.</span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              </span>
            </button>
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3 rounded-full mx-4"
            style={{
              backgroundColor: 'var(--alpha-white-5)',
              border: '1px solid var(--alpha-white-10)'
            }}
          >
            <Shield className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--brand-200)' }} />
            <span className="text-xs sm:text-sm text-center sm:text-left" style={{ color: 'var(--white)' }}>
              Trusted by leading implant practices nationwide
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" style={{ color: 'var(--brand-200)' }} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}