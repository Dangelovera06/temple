import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';

export default function CTASection() {
  const features = [
    "Exact AI prompts that convert",
    "Works with all major AI platforms",
    "30-day money-back guarantee",
    "Instant access after purchase"
  ];

  return (
    <section id="cta" className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full mb-6 border border-blue-500/30">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">
              GET STARTED TODAY
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Stop Struggling with Video Scripts?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join 500+ entrepreneurs who are already creating converting videos in minutes, not weeks.
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12 mb-8">
          <h3 className="text-3xl font-bold text-white mb-6">
            Get The Complete AI Script System
          </h3>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              $97
            </div>
            <p className="text-gray-400">One-time payment • Lifetime access</p>
          </div>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 mb-6"
          >
            Get Instant Access Now
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>

          <p className="text-sm text-gray-400">
            30-day money-back guarantee • Secure checkout
          </p>
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap justify-center gap-8 items-center text-gray-400">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="text-sm">Students Trained</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10K+</div>
            <div className="text-sm">Scripts Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">4.9★</div>
            <div className="text-sm">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
