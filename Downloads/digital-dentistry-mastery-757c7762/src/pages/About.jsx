
import React from "react";
import {
  Award, Users, Clock, Target, Zap, Shield, MapPin, GraduationCap, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function About() {
  const lightBg = '#f8f9fa';
  const neumorphicExtruded = {
    borderRadius: '1.5rem',
    background: lightBg,
    boxShadow: '12px 12px 24px #d1d9e6, -12px -12px 24px #ffffff',
  };

  const neumorphicPressed = {
    borderRadius: '1.5rem',
    background: lightBg,
    boxShadow: 'inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff',
  };

  const stats = [
    { number: "15+", label: "YEARS EXPERIENCE", icon: Award },
    { number: "500+", label: "SUCCESSFUL CASES", icon: Target },
    { number: "50+", label: "PARTNER DENTISTS", icon: Users },
    { number: "24HR", label: "TURNAROUND TIME", icon: Clock }
  ];

  const values = [
    { icon: Award, title: "PRECISION", description: "Meticulous attention to detail and accuracy." },
    { icon: Zap, title: "INNOVATION", description: "Investing in the latest technology and techniques." },
    { icon: Users, title: "PARTNERSHIP", description: "Building lasting relationships with dental professionals." },
    { icon: Shield, title: "RELIABILITY", description: "Consistent quality and on-time delivery." }
  ];

  return (
    <div className="bg-[#f8f9fa]">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-[#f8f9fa] text-blue-800 px-6 py-2 font-bold text-sm mb-6" style={{...neumorphicExtruded, borderRadius: '2rem'}}>
                ABOUT OUR TEAM
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8">
                Leading Digital <span className="text-blue-800">Innovation</span>
              </h1>
              <p className="text-xl font-semibold text-gray-600 mb-8">
                Digital Dentistry Mastery has pioneered the digital transformation of dental restoration services for practices in Port St. Lucie and beyond, delivering precision and excellence in every restoration.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4"><GraduationCap className="w-6 h-6 text-blue-800" /><span className="font-bold text-lg text-gray-800">Advanced Digital Lab Certification</span></div>
                <div className="flex items-center space-x-4"><Award className="w-6 h-6 text-blue-800" /><span className="font-bold text-lg text-gray-800">State-of-the-Art Equipment</span></div>
                <div className="flex items-center space-x-4"><MapPin className="w-6 h-6 text-blue-800" /><span className="font-bold text-lg text-gray-800">Based in Port St. Lucie, Florida</span></div>
              </div>
            </div>
            <div className="relative h-96" style={neumorphicExtruded}>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ed156c6a2_ChatGPTImageAug21202501_20_44PM.png"
                    alt="Digital Dentistry Mastery Icon"
                    className="w-24 h-24 mx-auto"
                  />
                  <p className="font-bold text-xl text-gray-800">DIGITAL DENTISTRY</p>
                  <p className="font-bold text-lg text-blue-800">MASTERY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div style={neumorphicPressed} className="p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-800" />
                  <div className="text-4xl font-extrabold text-gray-900 mb-2">{stat.number}</div>
                  <div className="font-bold text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Our Core <span className="text-blue-800">Values</span>
            </h2>
            <p className="text-xl font-semibold text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide every aspect of our work and define our commitment to excellence in serving dental practices.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} style={neumorphicExtruded} className="p-8 text-center">
                <value.icon className="w-12 h-12 mx-auto mb-6 text-blue-800" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="font-semibold text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
             <div style={neumorphicExtruded} className="p-12">
                <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
                    Partner With <span className="text-blue-800">The Best</span>
                </h2>
                <p className="text-xl font-semibold text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join the growing network of dental practices who trust Digital Dentistry Mastery for their most demanding cases and patient care excellence.
                </p>
                <Link
                    to={createPageUrl("Contact")}
                    style={neumorphicExtruded}
                    className="inline-flex items-center space-x-2 font-bold text-gray-700 text-lg px-8 py-6 border-none hover:text-blue-800 active:shadow-[inset_8px_8px_16px_#d1d9e6,_inset_-8px_-8px_16px_#ffffff] transition-all duration-200"
                >
                    <span>START PARTNERSHIP</span>
                    <ArrowRight className="w-5 h-5" />
                </Link>
             </div>
        </div>
      </section>
    </div>
  );
}