import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const struggles = [
  "The pain of not eating the food they love.",
  "The embarrassment of hiding their smile.",
  "The frustration of dentures that make them feel older than they are."
];

export default function EmotionalCore() {
  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <Heart className="w-6 h-6" style={{ color: 'var(--brand-200)' }} />
            <span className="caption" style={{ color: 'var(--brand-300)' }}>
              The Emotional Core
            </span>
          </div>

          <h2 className="heading-2 mb-8" style={{ color: 'var(--white)' }}>
            Behind Every Consult Is Someone Who Feels Trapped
          </h2>

          <p className="body-large mb-12" style={{ color: 'var(--white)' }}>
            Patients in your city are silently living with:
          </p>

          <div className="space-y-4 mb-12">
            {struggles.map((struggle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl text-center"
                style={{
                  backgroundColor: 'var(--alpha-white-5)',
                  border: '1px solid var(--alpha-white-10)'
                }}
              >
                <p className="body-large" style={{ color: 'var(--neutral-200)' }}>
                  {struggle}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="p-10 rounded-3xl" style={{
            background: 'linear-gradient(135deg, var(--alpha-white-5) 0%, var(--alpha-white-10) 100%)',
            border: '1px solid var(--alpha-white-20)'
          }}>
            <p className="heading-3 mb-4" style={{ color: 'var(--brand-200)' }}>
              Your practice can give them confidence, freedom, and health.
            </p>
            <p className="body-large" style={{ color: 'var(--white)' }}>
              Archify.io makes sure they find you first.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}