import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full mb-8 border border-blue-500/30">
          <span className="text-sm font-semibold text-blue-300 tracking-wide">
            NEW: AI-POWERED VIDEO SCRIPTS
          </span>
        </div>

        {/* Main Headlines */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
          Stop Wasting Hours on 
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
            Video Scripts That Don't Convert
          </span>
        </h1>

        {/* Subheadline */}
        <h2 className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Finally... A Simple System That Turns AI Into Your Personal Copywriter for High-Converting Videos
        </h2>

        {/* Description */}
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Most business owners spend weeks writing scripts that fall flat. But what if you could create persuasive video content in minutes using AI tools you already know about.
        </p>

        {/* Key Points */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-lg text-gray-300 mb-4">
            <strong className="text-white">This isn't about fancy editing or expensive equipment.</strong>
          </div>
          <div className="text-lg text-gray-300">
            <strong className="text-white">It's about having the right prompts and frameworks that make AI write like a seasoned copywriter.</strong>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <Button 
            onClick={() => scrollToSection('for-who')}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-12 py-6 rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            Get The Complete System Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-8 items-center text-gray-400">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-sm">Students Trained</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-sm">Scripts Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.9★</div>
            <div className="text-sm">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
