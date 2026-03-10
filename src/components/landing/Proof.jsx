import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Star, TrendingUp } from "lucide-react";

const stats = [
  { number: "20+", label: "Implant Consults", sublabel: "in the first 14 days" },
  { number: "$250K–$500K+", label: "New Revenue", sublabel: "month after month" },
  { number: "100%", label: "Full-Arch Cases", sublabel: "that transform lives" }
];

const testimonials = [
  {
    quote: "We added $400K in revenue in the first 90 days. Archify.io didn't just fill our schedule — it transformed our practice.",
    author: "Dr. Michael Stevens",
    practice: "Advanced Dental Implants, Austin TX",
    rating: 5
  },
  {
    quote: "Before Archify.io, we were spending $8K/month on ads with zero ROI. Now we have a waitlist for full-arch cases.",
    author: "Dr. Sarah Chen",
    practice: "Pacific Smile Center, San Diego CA",
    rating: 5
  },
  {
    quote: "The patient quality is incredible. These aren't tire-kickers — they're ready to move forward with treatment.",
    author: "Dr. James Rodriguez",
    practice: "Elite Implant Solutions, Miami FL",
    rating: 5
  }
];

export default function Proof() {
  return (
    <section id="proof" className="py-32 relative">
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full blur-[130px]" 
          style={{ 
            background: 'radial-gradient(circle, var(--brand-300) 0%, transparent 70%)',
            opacity: 0.1
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6" style={{ color: 'var(--brand-200)' }} />
            <span className="caption" style={{ color: 'var(--brand-300)' }}>
              Real Results
            </span>
          </div>

          <h2 className="heading-2 mb-6" style={{ color: 'var(--white)' }}>
            Practices Using Archify.io Are Seeing $250K–$500K+ in New Implant Revenue
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-3xl"
              style={{
                backgroundColor: 'var(--alpha-white-5)',
                border: '1px solid var(--alpha-white-10)'
              }}
            >
              <CheckCircle className="w-12 h-12 mx-auto mb-6" style={{ color: 'var(--brand-200)' }} />
              <div className="heading-2 mb-2" style={{ color: 'var(--brand-200)' }}>
                {stat.number}
              </div>
              <div className="body font-semibold mb-2" style={{ color: 'var(--white)' }}>
                {stat.label}
              </div>
              <div className="body-small" style={{ color: 'var(--neutral-400)' }}>
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="p-8 rounded-3xl h-full"
                style={{
                  backgroundColor: 'var(--alpha-white-5)',
                  border: '1px solid var(--alpha-white-10)'
                }}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: 'var(--brand-200)' }} />
                  ))}
                </div>

                <p className="body mb-8" style={{ color: 'var(--neutral-200)', fontStyle: 'italic' }}>
                  "{testimonial.quote}"
                </p>

                <div className="text-center pt-6" style={{ borderTop: '1px solid var(--alpha-white-10)' }}>
                  <div className="body font-semibold mb-1" style={{ color: 'var(--white)' }}>
                    {testimonial.author}
                  </div>
                  <div className="body-small" style={{ color: 'var(--neutral-500)' }}>
                    {testimonial.practice}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}