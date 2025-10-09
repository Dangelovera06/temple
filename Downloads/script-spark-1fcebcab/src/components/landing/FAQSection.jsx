import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    {
      question: "How quickly can I start creating video scripts?",
      answer: "You can start creating scripts within minutes of getting the system. The prompts and frameworks are ready to use immediately with any AI tool."
    },
    {
      question: "Do I need experience with AI tools?",
      answer: "No experience required! The system includes step-by-step instructions for ChatGPT, Claude, and other popular AI platforms."
    },
    {
      question: "What types of videos can I create scripts for?",
      answer: "The system works for sales videos, educational content, product demos, social media posts, course videos, and any other video content that needs to convert."
    },
    {
      question: "Is this compatible with all AI video platforms?",
      answer: "Yes! The scripts work with HeyGen, Synthesia, Runway, Pika, and any other AI video platform. The prompts create universal video scripts."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your purchase, no questions asked."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full mb-6 border border-blue-500/30">
            <span className="text-sm font-semibold text-blue-300">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Got questions? We've got answers. Here are the most common questions about our AI script system.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-600/50 transition-all duration-300"
            >
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-white group-open:text-blue-400 transition-colors">
                    {faq.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
