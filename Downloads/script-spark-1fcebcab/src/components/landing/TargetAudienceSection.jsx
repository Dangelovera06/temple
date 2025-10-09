import React from 'react';
import { Briefcase, Users, TrendingUp, GraduationCap, Building2 } from 'lucide-react';

export default function TargetAudienceSection() {
  const audiences = [
    {
      icon: Users,
      title: "Business Coaches & Consultants",
      description: "Stop struggling with video content. Get scripts that position you as the obvious choice for high-ticket clients.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Briefcase,
      title: "E-commerce Store Owners",
      description: "Turn product videos into profit machines with scripts that make people want to buy now, not later.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Content Creators & Influencers",
      description: "Build authority and monetize your audience with videos that actually convert followers into paying customers.",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Building2,
      title: "Marketing Agencies & Freelancers",
      description: "Deliver better results for clients with proven script templates that work across any industry.",
      gradient: "from-violet-500 to-violet-600"
    },
    {
      icon: GraduationCap,
      title: "Course Creators & Educators",
      description: "Transform boring educational content into engaging videos that sell your expertise while you sleep.",
      gradient: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section id="for-who" className="py-32 bg-black relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Centered Header */}
        <div className="mb-20 text-center mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full mb-8 border border-blue-500/30">
            <span className="text-base font-semibold text-blue-300 tracking-wide">
              WHO THIS IS FOR
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            This System Works For:
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Whether you're building authority, scaling your business, or serving clients - this playbook is your shortcut to professional video content.
          </p>
        </div>

        {/* Centered Grid of Bigger Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="group bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 rounded-3xl p-10 hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-3 text-center"
            >
              {/* Icon */}
              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${audience.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <audience.icon className="w-10 h-10 text-white" />
              </div>
              
              {/* Text Content */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  {audience.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-base">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div id="proof" className="mt-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-12 text-center border border-blue-500/20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Join 500+ Entrepreneurs Already Creating Converting Videos
            </h3>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-400 mt-2">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-gray-400 mt-2">Scripts Generated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">4.9★</div>
                <div className="text-sm text-gray-400 mt-2">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}