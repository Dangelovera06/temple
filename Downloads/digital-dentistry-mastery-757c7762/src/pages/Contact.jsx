
import React, { useState } from "react";
import { SendEmail } from "@/api/integrations";
import { 
  Phone, MapPin, Clock, Send, CheckCircle, AlertCircle
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const lightBg = '#f8f9fa';
  const neumorphicExtruded = {
    borderRadius: '1.5rem',
    background: lightBg,
    boxShadow: '12px 12px 24px #d1d9e6, -12px -12px 24px #ffffff',
  };

  const neumorphicPressed = {
    borderRadius: '1rem',
    background: lightBg,
    boxShadow: 'inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff',
  };

  const services = [
    "3D Cosmetic Printing", "Digital Crown Design", "Bridge Fabrication", 
    "Orthodontic Appliances", "Surgical Guides", "General Consultation"
  ];
  
  const contactInfo = [
    { icon: Phone, title: "CALL US", details: "(772) 555-0123" },
    { icon: MapPin, title: "VISIT US", details: "Port St. Lucie, FL" },
    { icon: Clock, title: "TURNAROUND", details: "24-48 Hours Rush" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await SendEmail({
        to: "example@example.com", // Placeholder, won't be displayed
        subject: `New Contact Form - ${formData.service} Request from ${formData.name}`,
        body: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nMessage: ${formData.message}`,
        from_name: "Digital Dentistry Lab Website"
      });
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#f8f9fa]">
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
            <div className="inline-block bg-[#f8f9fa] text-blue-800 px-6 py-2 font-bold text-sm mb-6" style={{...neumorphicExtruded, borderRadius: '2rem'}}>
              PARTNER WITH US TODAY
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-8">
                Start Your <span className="text-blue-800">Partnership</span>
            </h1>
            <p className="text-xl font-semibold text-gray-600 max-w-3xl mx-auto">
              Ready to enhance your practice with precision digital dental restoration services from Digital Dentistry Mastery? Contact us for a consultation.
            </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} style={neumorphicExtruded} className="p-8 text-center">
                <info.icon className="w-12 h-12 mx-auto mb-6 text-blue-800" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-xl font-bold text-gray-700">{info.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div style={neumorphicExtruded} className="p-8 md:p-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              Request a <span className="text-blue-800">Partnership Consultation</span>
            </h2>

            {submitStatus === "success" && (
              <div style={neumorphicPressed} className="p-4 mb-8 flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-bold text-green-700">Message sent successfully!</p>
                  <p className="font-semibold text-green-600 text-sm">We'll be in touch shortly to discuss your partnership.</p>
                </div>
              </div>
            )}
            {submitStatus === "error" && (
                <div style={neumorphicPressed} className="p-4 mb-8 flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div>
                  <p className="font-bold text-red-700">Error sending message.</p>
                  <p className="font-semibold text-red-600 text-sm">Please try again or call us directly.</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required placeholder="Practice Name / Contact Name *" style={neumorphicPressed} className="w-full p-4 font-semibold text-gray-800 bg-transparent border-none outline-none placeholder:text-gray-500" />
                <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required placeholder="Email Address *" style={neumorphicPressed} className="w-full p-4 font-semibold text-gray-800 bg-transparent border-none outline-none placeholder:text-gray-500" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 <input type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="Phone Number" style={neumorphicPressed} className="w-full p-4 font-semibold text-gray-800 bg-transparent border-none outline-none placeholder:text-gray-500" />
                <select value={formData.service} onChange={(e) => handleInputChange('service', e.target.value)} required style={{...neumorphicPressed, appearance: 'none'}} className="w-full p-4 font-semibold text-gray-800 bg-transparent border-none outline-none">
                  <option value="" className="bg-[#f8f9fa] text-gray-500">Select service of interest *</option>
                  {services.map((s) => <option key={s} value={s} className="bg-[#f8f9fa] text-gray-800">{s}</option>)}
                </select>
              </div>
              <textarea value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} placeholder="Tell us about your practice and lab service needs..." style={neumorphicPressed} className="w-full p-4 font-semibold text-gray-800 bg-transparent border-none outline-none h-32 placeholder:text-gray-500" />
              <div className="text-center">
                <button type="submit" disabled={isSubmitting} style={neumorphicExtruded} className="inline-flex items-center space-x-2 font-bold text-gray-700 text-lg px-8 py-4 border-none hover:text-blue-800 active:shadow-[inset_8px_8px_16px_#d1d9e6,_inset_-8px_-8px_16px_#ffffff] transition-all duration-200">
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? "SENDING..." : "START PARTNERSHIP"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}