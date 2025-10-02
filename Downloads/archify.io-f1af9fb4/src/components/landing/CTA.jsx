import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
  "24/7 premium support"
];

export default function CTA() {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Gradient Glow */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[150px]"
          style={{ 
            background: 'radial-gradient(circle, var(--brand-300) 0%, transparent 70%)',
            opacity: 0.1
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-6">
            <span 
              className="caption px-6 py-2 rounded-full"
              style={{ 
                backgroundColor: 'var(--alpha-white-5)', 
                color: 'var(--neutral-400)',
                border: '1px solid var(--alpha-white-10)'
              }}
            >
              Get Started Today
            </span>
          </div>

          <h2 className="heading-2 mb-8" style={{ color: 'var(--white)' }}>
            Ready to Elevate?
          </h2>
          
          <p className="body-large mb-12 max-w-2xl mx-auto" style={{ color: 'var(--neutral-400)' }}>
            Join successful organizations that have transformed their operations
          </p>

          <div className="mb-12 inline-block">
            <div 
              className="rounded-3xl p-12"
              style={{
                backgroundColor: 'var(--alpha-white-5)',
                border: '1px solid var(--alpha-white-10)'
              }}
            >
              <div className="mb-8">
                <div className="caption mb-3" style={{ color: 'var(--neutral-500)' }}>
                  Enterprise Plan
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="heading-1" style={{ color: 'var(--brand-200)' }}>$499</span>
                  <span className="body-large" style={{ color: 'var(--neutral-500)' }}>/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-3"
                  >
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--alpha-white-10)' }}
                    >
                      <Check className="w-3 h-3" style={{ color: 'var(--brand-200)' }} />
                    </div>
                    <span className="body" style={{ color: 'var(--neutral-300)' }}>{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Button 
                className="w-full py-6 text-lg rounded-full group font-medium"
                style={{ backgroundColor: 'var(--white)', color: 'var(--black)' }}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <p className="body-small" style={{ color: 'var(--neutral-500)' }}>
            No commitment required • Upgrade or downgrade anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}