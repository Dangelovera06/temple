import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Zap, Shield, TrendingUp, Lock, Globe, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience unparalleled speed with our optimized infrastructure"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance standards"
  },
  {
    icon: TrendingUp,
    title: "Scalable Growth",
    description: "Scale seamlessly from startup to enterprise"
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your privacy is protected by industry standards"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Deploy anywhere with optimal performance"
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Leverage cutting-edge AI to automate workflows"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32">
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
              Powerful Capabilities
            </span>
          </div>
          <h2 className="heading-2 mb-6" style={{ color: 'var(--white)' }}>
            Built for Excellence
          </h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--neutral-400)' }}>
            Every feature crafted with precision
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                <div className="mb-6 flex justify-center">
                  <div 
                    className="inline-flex p-4 rounded-full transition-all duration-300"
                    style={{ backgroundColor: 'var(--alpha-white-10)' }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: 'var(--brand-200)' }} />
                  </div>
                </div>
                <h3 className="heading-3 mb-3" style={{ color: 'var(--white)' }}>
                  {feature.title}
                </h3>
                <p className="body-small" style={{ color: 'var(--neutral-400)' }}>
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}