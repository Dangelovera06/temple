
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  ArrowRight, Crown, Smile, Shield, Layers, Target, Grid, Eye
} from "lucide-react";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");

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

  const categories = [
    { id: "all", label: "ALL", icon: Grid },
    { id: "crowns", label: "CROWNS", icon: Crown },
    { id: "veneers", label: "VENEERS", icon: Smile },
    { id: "bridges", label: "BRIDGES", icon: Shield },
    { id: "orthodontics", label: "ORTHO", icon: Layers },
    { id: "implants", label: "IMPLANTS", icon: Target }
  ];

  const portfolioItems = [
    { id: 1, title: "ANTERIOR CROWN", category: "crowns" },
    { id: 2, title: "VENEER TRANSFORMATION", category: "veneers" },
    { id: 3, title: "3-UNIT BRIDGE", category: "bridges" },
    { id: 4, title: "CLEAR ALIGNERS", category: "orthodontics" },
    { id: 5, title: "IMPLANT CROWN", category: "implants" },
    { id: 6, title: "POSTERIOR CROWNS", category: "crowns" },
    { id: 7, title: "SMILE MAKEOVER", category: "veneers" },
    { id: 8, title: "MARYLAND BRIDGE", category: "bridges" },
    { id: 9, title: "NIGHT GUARD", category: "orthodontics" }
  ];

  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="bg-[#f8f9fa]">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
            <div className="inline-block bg-[#f8f9fa] text-blue-800 px-6 py-2 font-bold text-sm mb-6" style={{...neumorphicExtruded, borderRadius: '2rem'}}>
              SHOWCASE OF EXCELLENCE
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-8">
                Our <span className="text-blue-800">Portfolio</span>
            </h1>
            <p className="text-xl font-semibold text-gray-600 max-w-3xl mx-auto">
              Explore our collection of precision-crafted dental restorations created for practices across Florida.
            </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4" style={neumorphicPressed}>
            <div className="w-full p-4">
              <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  style={activeFilter === category.id ? neumorphicPressed : neumorphicExtruded}
                  className={`font-bold text-sm px-6 py-3 border-none transition-all duration-200 flex items-center space-x-2 ${
                    activeFilter === category.id ? 'text-blue-800' : 'text-gray-700 hover:text-blue-800'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} style={neumorphicExtruded}>
                <div className="relative h-64" style={{...neumorphicPressed, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
                  <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                     <div className="text-center">
                      <Eye className="w-12 h-12 mx-auto mb-4 text-blue-800" />
                      <p className="font-bold text-sm text-gray-800">CASE IMAGE</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="font-semibold text-blue-800 text-sm">
                    {categories.find(cat => cat.id === item.category)?.label}
                  </p>
                </div>
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
                  Ready for Your <span className="text-blue-800">Next Project?</span>
              </h2>
              <p className="text-xl font-semibold text-gray-600 mb-8 max-w-2xl mx-auto">
                  Let's create exceptional restorations for your patients with our advanced digital lab services.
              </p>
              <Link
                  to={createPageUrl("Contact")}
                  style={neumorphicExtruded}
                  className="inline-flex items-center space-x-2 font-bold text-gray-700 text-lg px-8 py-6 border-none hover:text-blue-800 active:shadow-[inset_8px_8px_16px_#d1d9e6,_inset_-8px_-8px_16px_#ffffff] transition-all duration-200"
              >
                  <span>START YOUR PROJECT</span>
                  <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
        </div>
      </section>
    </div>
  );
}