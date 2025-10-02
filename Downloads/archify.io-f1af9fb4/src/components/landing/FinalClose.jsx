import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone } from "lucide-react";

export default function FinalClose() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full blur-[160px]" 
          style={{ 
            background: 'radial-gradient(circle, var(--brand-300) 0%, transparent 70%)',
            opacity: 0.15
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
            <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--brand-200)' }} />
            <span className="text-xs sm:text-sm uppercase tracking-wider" style={{ color: 'var(--brand-300)' }}>
              Final Close
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8 px-2" style={{ color: 'var(--white)', fontFamily: 'var(--font-display)' }}>
            Your Next Implant Patient Is Scrolling Right Now
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl mb-8 md:mb-12 px-4" style={{ color: 'var(--white)', fontFamily: 'var(--font-display)' }}>
            The Only Question: Will They Find You?
          </p>

          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            <p className="text-base sm:text-lg md:text-xl" style={{ color: 'var(--white)' }}>
              You've seen the proof. You've read the reviews. You know what this system can do.
            </p>
            <p className="text-base sm:text-lg md:text-xl" style={{ color: 'var(--white)' }}>
              The practices that win in 2025 aren't the ones who post the most.
            </p>
            <p className="text-base sm:text-lg md:text-xl font-semibold" style={{ color: 'var(--white)' }}>
              They're the ones who own the scroll.
            </p>
          </div>

          <div className="mb-6 md:mb-8 px-4">
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
              <span className="relative font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed flex items-center justify-center gap-2 sm:gap-3">
                <span className="whitespace-nowrap">Get Started with Archify.io</span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 flex-shrink-0" />
              </span>
            </button>
          </div>

          <p className="text-xs sm:text-sm px-4" style={{ color: 'var(--neutral-500)' }}>
            No contracts. No hidden fees. Just results.
          </p>
        </motion.div>
      </div>
    </section>
  );
}