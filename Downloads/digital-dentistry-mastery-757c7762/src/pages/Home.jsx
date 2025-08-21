import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Clock, Users, Zap, Phone, Star } from "lucide-react";

export default function Home() {
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

    const features = [
        { icon: Award, title: "PRECISION CRAFTSMANSHIP", description: "State-of-the-art 3D printing for flawless restorations." },
        { icon: Clock, title: "RAPID TURNAROUND", description: "Fast production times without compromising quality." },
        { icon: Users, title: "PRACTICE PARTNERSHIP", description: "Collaborative approach with dental practices across Florida." },
        { icon: Zap, title: "CUTTING-EDGE TECH", description: "Latest digital design software and printing equipment." }
    ];

    const services = [
        "3D Cosmetic Printing", "Digital Crown Design", "Bridge Fabrication",
        "Orthodontic Appliances", "Surgical Guides", "Implant Solutions"
    ];

    return (
        <div className="bg-[#f8f9fa]">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="container mx-auto px-6 py-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-block bg-[#f8f9fa] text-blue-800 px-6 py-2 font-bold text-sm" style={{...neumorphicExtruded, borderRadius: '2rem'}}>
                                    FLORIDA'S PREMIER DIGITAL LAB
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                                    Master Digital <span className="text-blue-800">Dentistry</span>
                                </h1>
                                <p className="text-xl font-semibold text-gray-600 max-w-lg">
                                    Our state-of-the-art lab in Port St. Lucie delivers exceptional cosmetic restorations with cutting-edge 3D printing technology for dental practices.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button asChild style={neumorphicExtruded} className="font-bold text-gray-700 text-lg px-8 py-6 border-none hover:text-blue-800 active:shadow-[inset_8px_8px_16px_#d1d9e6,_inset_-8px_-8px_16px_#ffffff] transition-all duration-200">
                                    <Link to={createPageUrl("Services")} className="flex items-center space-x-2">
                                        <span>VIEW SERVICES</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button asChild style={neumorphicExtruded} className="font-bold text-gray-700 text-lg px-8 py-6 border-none hover:text-blue-800 active:shadow-[inset_8px_8px_16px_#d1d9e6,_inset_-8px_-8px_16px_#ffffff] transition-all duration-200">
                                    <Link to={createPageUrl("Contact")} className="flex items-center space-x-2">
                                        <Phone className="w-5 h-5" />
                                        <span>GET QUOTE</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="relative h-96" style={neumorphicExtruded}>
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/015acad82_ai-edited-image-1755789363033.jpg"
                                alt="3D Printed Dental Appliances"
                                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
                            Why Partner With Our <span className="text-blue-800">Lab?</span>
                        </h2>
                        <p className="text-xl font-semibold text-gray-600 max-w-2xl mx-auto">
                            Combining advanced technology with expert craftsmanship to deliver exceptional dental restorations for your practice.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} style={neumorphicExtruded} className="p-8 text-center transition-all duration-300 hover:shadow-[6px_6px_12px_#d1d9e6,_-6px_-6px_12px_#ffffff]">
                                <feature.icon className="w-12 h-12 mx-auto mb-6 text-blue-800" />
                                <h3 className="text-lg font-bold text-gray-800 mb-4">{feature.title}</h3>
                                <p className="font-semibold text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8">
                                Comprehensive <span className="text-blue-800">Lab Services</span>
                            </h2>
                            <p className="text-lg font-semibold text-gray-600 mb-8">
                                From initial design to final fabrication, we provide complete digital dental solutions to enhance your practice's capabilities.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {services.map((service, index) => (
                                    <div key={index} style={neumorphicPressed} className="p-4 font-bold text-center text-gray-700">
                                        {service}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div style={neumorphicExtruded} className="h-64 overflow-hidden">
                                <img 
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/12730b6dc_UntitledProject.jpg"
                                    alt="Digital Smile Design"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                            </div>
                            <div style={neumorphicExtruded} className="h-48 flex items-center justify-center">
                                <div className="text-center">
                                    <Star className="w-12 h-12 mx-auto mb-4 text-blue-800" />
                                    <p className="font-bold text-gray-800">PRECISION RESULTS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                     <div style={neumorphicExtruded} className="p-12">
                        <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
                            Ready to Master Your <span className="text-blue-800">Practice?</span>
                        </h2>
                        <p className="text-xl font-semibold text-gray-600 mb-8 max-w-2xl mx-auto">
                            Partner with Digital Dentistry Mastery today and discover how our advanced lab services can elevate your patient care and practice efficiency.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button asChild style={neumorphicExtruded} className="font-bold text-gray-700 text-lg px-8 py-6 border-none hover:text-blue-800 active:shadow-[inset_8px_8px_16px_#d1d9e6,_inset_-8px_-8px_16px_#ffffff] transition-all duration-200">
                                <Link to={createPageUrl("Contact")}>
                                    BECOME A PARTNER
                                </Link>
                            </Button>
                        </div>
                     </div>
                </div>
            </section>
        </div>
    );
}