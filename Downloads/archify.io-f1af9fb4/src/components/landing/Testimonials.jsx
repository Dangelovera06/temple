import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, TechVentures",
    content: "Archify transformed our entire digital infrastructure. The results exceeded expectations.",
    rating: 5,
    avatar: "SM"
  },
  {
    name: "James Chen",
    role: "CTO, Global Systems",
    content: "The level of sophistication and reliability is unmatched. This is what enterprise solutions should look like.",
    rating: 5,
    avatar: "JC"
  },
  {
    name: "Emily Rodriguez",
    role: "Director, Innovate Co.",
    content: "We've seen a 300% increase in efficiency. Archify is a strategic advantage.",
    rating: 5,
    avatar: "ER"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
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
              Client Testimonials
            </span>
          </div>
          <h2 className="heading-2 mb-6" style={{ color: 'var(--white)' }}>
            Trusted by Leaders
          </h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--neutral-400)' }}>
            See what industry pioneers are saying
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="p-8 rounded-3xl h-full text-center group transition-all duration-300"
                style={{
                  backgroundColor: 'var(--alpha-white-5)',
                  border: '1px solid var(--alpha-white-10)'
                }}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'var(--brand-200)' }} />
                  ))}
                </div>

                <p className="body mb-8" style={{ color: 'var(--neutral-300)' }}>
                  "{testimonial.content}"
                </p>

                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center font-medium"
                    style={{ 
                      backgroundColor: 'var(--alpha-white-10)',
                      color: 'var(--brand-200)'
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="body font-medium" style={{ color: 'var(--white)' }}>
                      {testimonial.name}
                    </div>
                    <div className="body-small" style={{ color: 'var(--neutral-500)' }}>
                      {testimonial.role}
                    </div>
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