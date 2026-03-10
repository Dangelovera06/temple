import React from "react";
import { motion } from "framer-motion";
import { XCircle, AlertTriangle } from "lucide-react";

const problems = [
  "Posting random before-and-after photos doesn't create trust.",
  "Boosting ads without strategy wastes thousands.",
  "Patients don't choose the dentist who shouts the loudest — they choose the one they trust the most."
];

export default function HardTruth() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]" 
          style={{ 
            background: 'radial-gradient(circle, var(--danger-700) 0%, transparent 70%)',
            opacity: 0.08
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
          <div className="inline-flex items-center gap-3 mb-8">
            <AlertTriangle className="w-6 h-6" style={{ color: 'var(--danger-500)' }} />
            <span className="caption" style={{ color: 'var(--danger-400)' }}>
              The Hard Truth
            </span>
          </div>

          <h2 className="heading-2 mb-12" style={{ color: 'var(--white)' }}>
            Most Practices Fail on Social Media. Here's Why.
          </h2>

          <div className="space-y-6 mb-12">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 rounded-2xl text-left"
                style={{
                  backgroundColor: 'var(--alpha-white-5)',
                  border: '1px solid var(--alpha-white-10)'
                }}
              >
                <XCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--danger-500)' }} />
                <p className="body-large" style={{ color: 'var(--white)' }}>
                  {problem}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="p-8 rounded-3xl" style={{
            backgroundColor: 'var(--alpha-white-5)',
            border: '2px solid var(--brand-300)'
          }}>
            <p className="body-large" style={{ color: 'var(--white)' }}>
              That's why we built <span style={{ color: 'var(--brand-200)', fontFamily: 'var(--font-display)' }}>Archify.io</span>: a proven system that makes patients trust you first — and book with you instead of the practice down the street.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}