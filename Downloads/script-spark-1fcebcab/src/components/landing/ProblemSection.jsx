import React from 'react';
import { AlertTriangle, Clock, X, RotateCcw } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: "Script Paralysis",
      description: "You sit there staring at a blank page. Your mind goes blank. You write something that sounds robotic.",
      color: "text-red-400"
    },
    {
      icon: X,
      title: "Delete and Restart",
      description: "Then you delete it all and start over. This cycle keeps you stuck creating content that gets views but zero sales.",
      color: "text-orange-400"
    },
    {
      icon: RotateCcw,
      title: "Wrong Approach",
      description: "The real problem is you've been approaching video scripts like you're writing a blog post.",
      color: "text-yellow-400"
    }
  ];

  return (
    <section id="problem" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm rounded-full mb-6 border border-red-500/30">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-300">
              THE REAL PROBLEM
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            The "Script Paralysis" Problem
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Here's what nobody talks about...
          </p>
        </div>

        {/* Main Problem Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              The real reason your videos aren't converting isn't bad lighting or poor audio.
            </h3>
            <div className="text-xl text-gray-300 space-y-4">
              <p>It's not even your offer.</p>
              <p className="text-2xl font-semibold text-blue-400">
                The missing piece is having scripts that actually persuade people to take action.
              </p>
            </div>
          </div>
        </div>

        {/* Problem Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 text-center hover:border-red-600/50 transition-all duration-300"
            >
              <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center`}>
                <problem.icon className={`w-8 h-8 ${problem.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-sm rounded-3xl p-12 border border-red-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              And here's the kicker...
            </h3>
            <div className="text-lg text-gray-300 space-y-4">
              <p>Most people think they need to be natural writers or hire expensive copywriters.</p>
              <p className="text-xl font-semibold text-white">But that's not true.</p>
            </div>
          </div>
        </div>

        {/* Emotional Connection */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-300 leading-relaxed">
            <strong className="text-white">You know your product works. You know people need it.</strong>
          </p>
          <p className="text-xl text-gray-300 leading-relaxed mt-4">
            <strong className="text-white">But when it comes to explaining it on video... the words just don't come out right.</strong>
          </p>
          <p className="text-lg text-gray-400 mt-6">
            <strong>Sound familiar?</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
