

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, MapPin, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home") },
  { title: "Services", url: createPageUrl("Services") },
  { title: "About", url: createPageUrl("About") },
  { title: "Gallery", url: createPageUrl("Gallery") },
  { title: "Contact", url: createPageUrl("Contact") },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const lightBg = '#f8f9fa';
  const neumorphicExtruded = {
    borderRadius: '1rem',
    background: lightBg,
    boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
  };
  
  const neumorphicPressed = {
    borderRadius: '1rem',
    background: lightBg,
    boxShadow: 'inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff',
  };

  const NavLinks = ({ mobile = false, onClose = () => {} }) => (
    <div className={`flex ${mobile ? 'flex-col space-y-6' : 'space-x-2'} items-center`}>
      {navigationItems.map((item) => (
        <Link
          key={item.title}
          to={item.url}
          onClick={onClose}
          style={location.pathname === item.url ? neumorphicPressed : {}}
          className={`font-semibold text-base transition-all duration-300 rounded-2xl px-4 py-2 ${
            location.pathname === item.url
              ? 'text-blue-800'
              : 'text-gray-700 hover:text-blue-800'
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#f8f9fa]/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ed156c6a2_ChatGPTImageAug21202501_20_44PM.png"
                alt="Digital Dentistry Mastery Icon"
                className="h-12 w-12"
              />
              <div className="flex flex-col">
                  <span className="text-xl font-extrabold text-gray-900 leading-tight tracking-tighter">DIGITAL DENTISTRY</span>
                  <span className="text-base font-bold text-blue-800 -mt-1 tracking-tighter">MASTERY</span>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:block" style={neumorphicExtruded}>
                <div className="p-1">
                  <NavLinks />
                </div>
              </nav>

              {/* Get Started Button */}
              <Button asChild style={neumorphicExtruded} className="hidden md:inline-flex font-bold text-blue-800 border-none hover:text-blue-900 active:shadow-[inset_8px_8px_16px_#d1d9e6,_inset_-8px_-8px_16px_#ffffff] transition-all duration-200">
                <Link to={createPageUrl("Contact")}>
                  GET STARTED
                </Link>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  style={neumorphicExtruded}
                  className="border-none"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#f8f9fa] border-none">
                <div className="flex flex-col space-y-8 mt-8">
                  <div className="mb-4">
                    <Link to={createPageUrl("Home")} className="flex items-center space-x-3">
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ed156c6a2_ChatGPTImageAug21202501_20_44PM.png"
                        alt="Digital Dentistry Mastery Icon"
                        className="h-10 w-10"
                      />
                      <div className="flex flex-col">
                        <span className="text-lg font-extrabold text-gray-900 leading-tight">DIGITAL DENTISTRY</span>
                        <span className="text-sm font-bold text-blue-800 -mt-1">MASTERY</span>
                      </div>
                    </Link>
                  </div>
                  
                  <NavLinks mobile onClose={() => {}} />
                  
                  {/* Mobile Get Started */}
                  <Button asChild style={neumorphicExtruded} className="font-bold text-blue-800 border-none">
                    <Link to={createPageUrl("Contact")}>
                      GET STARTED
                    </Link>
                  </Button>
                  
                  {/* Mobile contact info */}
                  <div className="pt-8 space-y-4">
                     <div style={neumorphicExtruded} className="p-4 flex items-center space-x-2 text-gray-700 font-semibold">
                      <Phone className="w-5 h-5 text-blue-800" />
                      <span>(772) 555-0123</span>
                    </div>
                    <div style={neumorphicExtruded} className="p-4 flex items-center space-x-2 text-gray-700 font-semibold">
                      <MapPin className="w-5 h-5 text-blue-800" />
                      <span>Port St. Lucie, FL</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#f8f9fa] mt-16">
        <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                <div className="md:col-span-1">
                    <div className="mb-4 flex items-center space-x-3 justify-center md:justify-start">
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ed156c6a2_ChatGPTImageAug21202501_20_44PM.png"
                        alt="Digital Dentistry Mastery Icon"
                        className="h-8 w-8"
                      />
                      <div>
                        <span className="text-sm font-bold text-gray-900 leading-tight block">DIGITAL DENTISTRY</span>
                        <span className="text-xs font-bold text-blue-800 leading-tight block">MASTERY</span>
                      </div>
                    </div>
                    <p className="font-semibold mb-4 text-gray-600">
                        State-of-the-art digital dental laboratory serving dental practices with precision cosmetic printing and design services.
                    </p>
                </div>
                
                <div className="md:col-span-1">
                    <h4 className="text-lg font-bold mb-4 text-blue-800">SERVICES</h4>
                    <ul className="space-y-2 font-semibold text-gray-600">
                        <li>3D Cosmetic Printing</li>
                        <li>Digital Design</li>
                        <li>Crown & Bridge Work</li>
                        <li>Orthodontic Appliances</li>
                    </ul>
                </div>

                <div className="md:col-span-1">
                    <h4 className="text-lg font-bold mb-4 text-blue-800">CONTACT</h4>
                     <div className="space-y-2 font-semibold text-gray-600">
                        <div className="flex items-center justify-center md:justify-start space-x-2">
                            <Phone className="w-4 h-4 text-blue-800" />
                            <span>(772) 555-0123</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start space-x-2">
                            <MapPin className="w-4 h-4 text-blue-800" />
                            <span>Port St. Lucie, Florida</span>
                        </div>
                    </div>
                </div>
            </div>
          
            <div className="mt-12 pt-8 text-center" style={{boxShadow: 'inset 0px 4px 8px -4px #d1d9e6'}}>
                <p className="font-bold text-gray-600">&copy; 2025 Digital Dentistry Mastery. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
