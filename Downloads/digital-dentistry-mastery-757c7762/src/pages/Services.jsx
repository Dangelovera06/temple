
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Printer, Palette, Shield, Layers, Target, Cpu, CheckCircle, ArrowRight
} from "lucide-react";

export default function Services() {
  const lightBg = '#f8f9fa';
  const neumorphicExtruded = {
    borderRadius: '1.5rem',
    background: lightBg,
    boxShadow: '12px 12px 24px #d1d9e6, -12px -12px 24px #ffffff',
  };

  const mainServices = [
    { icon: Printer, title: "3D COSMETIC PRINTING", description: "Advanced 3D printing for crowns, veneers, and bridges.", features: ["High-resolution printing", "Biocompatible materials", "Perfect color matching"] },
    { icon: Palette, title: "DIGITAL DESIGN", description: "CAD/CAM services from scan to final restoration.", features: ["3D scanning integration", "Custom design workflow", "Preview renderings"] },
    { icon: Shield, title: "CROWN & BRIDGE WORK", description: "Full-coverage restorations with optimal fit and aesthetics.", features: ["Single crown fabrication", "Multi-unit bridges", "Implant-supported crowns"] },
    { icon: Layers, title: "ORTHODONTIC APPLIANCES", description: "Custom devices including clear aligners and retainers.", features: ["Clear aligner therapy", "Custom retainers", "Night guards"] },
    { icon: Target, title: "SURGICAL GUIDES", description: "Precision-guided solutions for implant placement.", features: ["Implant placement guides", "Bone reduction guides", "3D planning integration"] },
    { icon: Cpu, title: "DIGITAL WORKFLOW", description: "Complete digital integration from impression to delivery.", features: ["Digital impressions", "Cloud-based collaboration", "Real-time updates"] }
  ];

  return (
    <div className="bg-[#f8f9fa]">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
            <div className="inline-block bg-[#f8f9fa] text-blue-800 px-6 py-2 font-bold text-sm mb-6" style={{...neumorphicExtruded, borderRadius: '2rem'}}>
              COMPREHENSIVE LAB SERVICES
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-8">
                Advanced <span className="text-blue-800">Digital</span> Solutions
            </h1>
            <p className="text-xl font-semibold text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with expert craftsmanship to deliver exceptional restorations for dental practices.
            </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <div key={index} style={neumorphicExtruded} className="p-8 flex flex-col">
                <div className="flex items-center space-x-4 mb-4">
                    <service.icon className="w-8 h-8 text-blue-800" />
                    <h3 className="font-bold text-lg text-gray-800">{service.title}</h3>
                </div>
                <p className="font-semibold text-gray-600 mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-800 flex-shrink-0" />
                        <span className="font-semibold text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                </ul>
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
                    Ready to Get <span className="text-blue-800">Started?</span>
                </h2>
                <p className="text-xl font-semibold text-gray-600 mb-8 max-w-2xl mx-auto">
                    Contact us today to discuss your practice's specific needs and discover how our advanced digital solutions can enhance your patient care.
                </p>
                <Link 
                    to={createPageUrl("Contact")}
                    style={neumorphicExtruded}
                    className="inline-flex items-center space-x-2 font-bold text-gray-700 text-lg px-8 py-6 border-none hover:text-blue-800 active:shadow-[inset_8px_8px_16px_#d1d9e6,_inset_-8px_-8px_16px_#ffffff] transition-all duration-200"
                >
                    <span>REQUEST QUOTE</span>
                    <ArrowRight className="w-5 h-5" />
                </Link>
             </div>
        </div>
      </section>
    </div>
  );
}