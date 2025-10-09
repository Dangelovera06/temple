import React from 'react';
import { Sparkles, Zap, Target, Clock } from 'lucide-react';

export default function SolutionSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Hooks Viewers in 3 Seconds",
      description: "Scripts that grab attention immediately and keep people watching"
    },
    {
      icon: Target,
      title: "Persuasive Storytelling",
      description: "Stories that make people lean in and actually care about what you're selling"
    },
    {
      icon: Clock,
      title: "Created in Minutes",
      description: "No more staring at blank pages - professional scripts ready instantly"
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm rounded-full mb-8 border border-green-500/30">
            <Sparkles className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-green-300">THE SOLUTION</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            The AI Script Revolution
          </h2>
          <p className="text-2xl text-gray-300 font-medium mb-8">
            Here's what changes everything...
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto space-y-12">
          {/* AI Explanation */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-10 border border-blue-500/20">
            <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
              AI tools like ChatGPT and Claude can write better sales copy than most humans. But only if you know how to prompt them correctly.
            </p>
            
            <div className="space-y-6">
              <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
                <p className="text-xl text-red-200 font-medium mb-4">❌ What Most People Do:</p>
                <p className="text-lg text-gray-300">
                  Most people ask AI to "write a video script about my product."
                </p>
                <p className="text-lg text-gray-300 mt-2">
                  That's like asking a Ferrari to drive itself without a steering wheel.
                </p>
              </div>

              <div className="bg-green-900/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
                <p className="text-xl text-green-200 font-medium mb-4">✅ What You'll Do Instead:</p>
                <p className="text-lg text-gray-300">
                  But when you use the right prompts and frameworks... AI becomes your personal copywriting team.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border-2 border-gray-800 hover:border-purple-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-3xl p-10 border border-purple-500/20 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              Imagine having scripts that hook viewers in the first 3 seconds. Stories that make people lean in and actually care about what you're selling.
            </h3>
            <p className="text-xl text-gray-200 mb-8">
              All created in minutes, not weeks.
            </p>
            
            <div className="space-y-6 text-lg text-gray-300">
              <p>This system gives you the exact prompts that turn AI into a conversion machine.</p>
              <p>You'll have scripts ready for HeyGen, Synthesia, and every major AI video platform.</p>
              <p>No more staring at blank pages. No more robotic-sounding content.</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Just clear, persuasive scripts that turn viewers into customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
