import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        window.scrollY > 50
          ? 'bg-black/80 backdrop-blur-md border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            The One Thing
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('problem')}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
            >
              Problem
            </button>
            <button
              onClick={() => scrollToSection('solution')}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
            >
              Solution
            </button>
            <button
              onClick={() => scrollToSection('for-who')}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
            >
              Who It's For
            </button>
            <Button 
              onClick={() => scrollToSection('for-who')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('problem')}
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium text-left"
              >
                Problem
              </button>
              <button
                onClick={() => scrollToSection('solution')}
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium text-left"
              >
                Solution
              </button>
              <button
                onClick={() => scrollToSection('for-who')}
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium text-left"
              >
                Who It's For
              </button>
              <Button 
                onClick={() => scrollToSection('for-who')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50 w-full mt-2"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
