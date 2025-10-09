import React from 'react';
import { Zap, Bot, Target, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function SolutionSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Hook Viewers in 3 Seconds",
      description: "Scripts that grab attention immediately and make people want to keep watching",
      color: "text-blue-400"
    },
    {
      icon: Target,
      title: "Turn Viewers Into Customers",
      description: "Clear, persuasive scripts that convert viewers into paying customers",
      color: "text-purple-400"
    },
    {
      icon: Clock,
      title: "Created in Minutes, Not Weeks",
      description: "No more staring at blank pages or spending weeks on one script",
      color: "text-green-400"
    }
  ];

  const platforms = [
    "HeyGen", "Synthesia", "ChatGPT", "Claude", "Runway", "Pika"
  ];

  return (
    <section id="solution" className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full mb-6 border border-blue-500/30">
            <Bot className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">
              THE SOLUTION
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            The AI Script Revolution
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Here's what changes everything...
          </p>
        </div>

        {/* Main Solution Statement */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              AI tools like ChatGPT and Claude can write better sales copy than most humans.
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              But only if you know how to prompt them correctly.
            </p>
            <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 mb-6">
              <p className="text-lg text-red-300">
                <strong>Most people ask AI to "write a video script about my product."</strong>
              </p>
              <p className="text-lg text-red-300 mt-2">
                That's like asking a Ferrari to drive itself without a steering wheel.
              </p>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6">
              <p className="text-lg text-green-300">
                <strong>But when you use the right prompts and frameworks... AI becomes your personal copywriting team.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 text-center hover:border-blue-600/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* System Description */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              This system gives you the exact prompts that turn AI into a conversion machine.
            </h3>
            <div className="space-y-4 text-lg text-gray-300">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>You'll have scripts ready for HeyGen, Synthesia, and every major AI video platform.</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No more staring at blank pages.</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No more robotic-sounding content.</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Just clear, persuasive scripts that turn viewers into customers.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Support */}
        <div className="text-center">
          <p className="text-lg text-gray-400 mb-6">Compatible with all major AI platforms:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-3 text-white font-semibold"
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
