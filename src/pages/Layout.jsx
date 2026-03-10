
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: 'var(--neutral-950)' }}>
      <style>{`
        :root {
          /* Brand Colors */
          --brand-50: #ffd999;
          --brand-100: #ffc766;
          --brand-200: #ffb433;
          --brand-300: #ffa201;
          --brand-400: #e69200;
          --brand-500: #cc8100;
          --brand-600: #b37100;
          --brand-700: #996000;
          --brand-800: #805000;
          --brand-900: #664000;
          
          /* Neutral Colors */
          --neutral-50: #f7f7f7;
          --neutral-100: #e3e3e3;
          --neutral-200: #c8c8c8;
          --neutral-300: #a4a4a4;
          --neutral-400: #818181;
          --neutral-500: #666666;
          --neutral-600: #515151;
          --neutral-700: #434343;
          --neutral-800: #383838;
          --neutral-900: #1a1a1a;
          --neutral-950: #0a090d;
          
          /* Danger Colors */
          --danger-50: #fef3f2;
          --danger-100: #fee4e2;
          --danger-200: #fecdca;
          --danger-300: #fda29b;
          --danger-400: #f97066;
          --danger-500: #f04436;
          --danger-600: #d92d20;
          --danger-700: #b42318;
          --danger-800: #912018;
          --danger-900: #7a271a;
          
          /* Primitives */
          --white: #ffffff;
          --black: #000000;
          --alpha-white-5: rgba(255, 255, 255, 0.05);
          --alpha-white-10: rgba(255, 255, 255, 0.10);
          --alpha-white-20: rgba(255, 255, 255, 0.20);
          --alpha-black-5: rgba(0, 0, 0, 0.05);
          --alpha-black-10: rgba(0, 0, 0, 0.10);
          
          /* Typography */
          --font-display: 'Times New Roman', Times, serif;
          --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          
          /* Shadows */
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        /* Prevent horizontal scroll */
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
          background-color: var(--neutral-950);
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* Typography Classes */
        .heading-1 {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        
        .heading-2 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        
        .heading-3 {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        
        .body-large {
          font-family: var(--font-body);
          font-size: 1.25rem;
          line-height: 1.7;
          letter-spacing: -0.01em;
        }
        
        .body {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.6;
          letter-spacing: 0;
        }
        
        .body-small {
          font-family: var(--font-body);
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: 0;
        }
        
        .caption {
          font-family: var(--font-body);
          font-size: 0.75rem;
          line-height: 1.4;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        
        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }
        
        /* Remove tap highlight on mobile */
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
      {children}
    </div>
  );
}
