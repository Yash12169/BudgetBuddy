
"use client";

import { montserrat } from "@/fonts/fonts";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function LandFooter() {
  const [showTerms, setShowTerms] = useState(false);
  const [showSubscribeAlert, setShowSubscribeAlert] = useState(false);
  const [email, setEmail] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowTerms(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const ripple = document.createElement("div");
    ripple.className = "ripple";
    container.appendChild(ripple);

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - 50; 
    const y = e.clientY - rect.top - 50;  

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };

  const handleSubscribe = () => {
    if (email) {
      setShowSubscribeAlert(true);
      setEmail("");
      setTimeout(() => setShowSubscribeAlert(false), 3000);
    }
  };

  const termsContent = `
    Terms and Conditions for BudgetBuddy

    1. Acceptance of Terms
    By accessing and using BudgetBuddy, you agree to be bound by these Terms and Conditions.

    2. Use of Service
    BudgetBuddy provides financial management tools and services. Users are responsible for their financial decisions.

    3. User Responsibilities
    - Maintain accurate account information
    - Protect your login credentials
    - Use the service in compliance with applicable laws

    4. Data Privacy
    We collect and process your data in accordance with our data protection policies.

    5. Service Modifications
    We reserve the right to modify or discontinue the service at any time.

    6. Limitation of Liability
    BudgetBuddy is not responsible for any financial losses or damages arising from the use of our services.

    7. Contact
    For any questions regarding these terms, please contact us through our contact page.
  `;

  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative flex justify-center items-center p-3 bg-gradient-to-b from-[#FFF8ED] to-[#FFE4D6] overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#41d298] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob -top-4 -left-4"></div>
        <div className="absolute w-96 h-96 bg-[#A87AF1] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 -top-4 -right-4"></div>
        <div className="absolute w-96 h-96 bg-[#FF6B6B] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 -bottom-4 left-1/2 transform -translate-x-1/2"></div>
      </div>

      <div 
        ref={containerRef}
        className="footer-container w-[90%] bg-white/80 backdrop-blur-lg text-gray-800 p-6 md:p-12 rounded-[40px] flex flex-col gap-8 md:gap-12 relative z-10"
        onMouseMove={handleRipple}
      >
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 55 55"
                fill="none"
                className="footer-icon"
              >
                <path
                  d="M27.4987 0C28.9993 0 30.4895 0.122416 31.9703 0.366004C33.451 0.610213 34.9014 0.972488 36.3231 1.45407C37.7443 1.93566 39.1163 2.52909 40.4405 3.23562C41.7647 3.94153 43.0224 4.75059 44.2137 5.6628C45.4049 6.57439 46.5147 7.57733 47.5413 8.67099C48.5697 9.76465 49.5005 10.9341 50.3363 12.1806C51.1727 13.4266 51.9016 14.7321 52.5236 16.0986C53.1456 17.4638 53.6527 18.8706 54.0442 20.3191L40.7711 23.9095C40.5766 23.185 40.3218 22.4816 40.0111 21.7987C39.6998 21.1157 39.3351 20.4633 38.9175 19.84C38.4993 19.2174 38.0339 18.6326 37.52 18.0852C37.0067 17.5383 36.4518 17.0369 35.8559 16.5808C35.2599 16.1253 34.6311 15.7208 33.9693 15.3678C33.3075 15.0148 32.6209 14.7178 31.9106 14.4767C31.1997 14.2362 30.4745 14.0548 29.7345 13.9324C28.9938 13.8106 28.2487 13.7497 27.498 13.7497V0H27.4987Z"
                  fill="#A87AF1"
                />
                <path
                  d="M53.6538 19.002C54.1168 20.4293 54.461 21.8846 54.6866 23.3679C54.9122 24.8512 55.0153 26.3432 54.9973 27.8432C54.978 29.3439 54.8376 30.8328 54.5748 32.3098C54.3125 33.7869 53.9316 35.2335 53.4326 36.6478C52.933 38.0634 52.3228 39.4286 51.6001 40.7434C50.8774 42.0583 50.0528 43.3061 49.1257 44.4855C48.1992 45.6649 47.1826 46.7629 46.0759 47.7764C44.9692 48.7899 43.7879 49.7065 42.5321 50.5274L35.0156 39.0128C35.6439 38.6033 36.2342 38.1454 36.7879 37.6377C37.3415 37.1313 37.8498 36.5832 38.3128 35.9922C38.7763 35.4031 39.1883 34.7793 39.55 34.1212C39.911 33.4638 40.2167 32.7808 40.4665 32.0737C40.7157 31.3659 40.9071 30.6426 41.0382 29.905C41.1693 29.1662 41.2396 28.4224 41.2489 27.6711C41.2588 26.9211 41.2066 26.1748 41.0935 25.4334C40.9811 24.6915 40.8089 23.9638 40.5771 23.2505L53.6538 19.002Z"
                  fill="#905EDF"
                />
                <path
                  d="M43.6642 49.7476C42.4506 50.6293 41.1724 51.4079 39.8314 52.0797C38.4904 52.7526 37.1035 53.3113 35.6705 53.7587C34.2376 54.2036 32.7785 54.5298 31.2921 54.7368C29.8058 54.9443 28.3132 55.0288 26.8125 54.9909C25.3124 54.953 23.8254 54.7946 22.3515 54.5131C20.8775 54.2322 19.4365 53.8333 18.0278 53.3162C16.6191 52.7986 15.2619 52.171 13.9558 51.4322C12.6496 50.6939 11.4124 49.8538 10.2441 48.9112L18.8723 38.2051C19.4564 38.6755 20.0747 39.0955 20.7278 39.4653C21.3808 39.8344 22.06 40.1488 22.7635 40.4073C23.4681 40.6658 24.1883 40.8647 24.9253 41.0057C25.6623 41.1468 26.4061 41.2257 27.1561 41.245C27.9061 41.2636 28.6524 41.2213 29.3956 41.1176C30.1382 41.0144 30.8684 40.8504 31.5848 40.6285C32.3007 40.4055 32.9942 40.1252 33.6653 39.789C34.3351 39.4522 34.9746 39.0632 35.5817 38.6233L43.6642 49.7476Z"
                  fill="#6F39C5"
                />
                <path
                  d="M11.3358 49.7478C10.1216 48.8661 8.98753 47.8911 7.93302 46.8235C6.87912 45.7554 5.91844 44.6095 5.05159 43.3847C4.18474 42.16 3.42353 40.873 2.76733 39.5234C2.11176 38.1737 1.5699 36.7799 1.14237 35.342C0.71423 33.9034 0.406016 32.4407 0.217733 30.9518C0.029449 29.4629 -0.0370405 27.9691 0.0195068 26.4696C0.0760541 24.9702 0.253774 23.4857 0.553288 22.0148C0.852802 20.5446 1.26914 19.1086 1.80354 17.7061L14.6522 22.6033C14.385 23.3042 14.1768 24.0226 14.0271 24.7583C13.8773 25.4928 13.7885 26.236 13.7605 26.9854C13.7325 27.7354 13.7655 28.4823 13.8599 29.2268C13.9537 29.9706 14.1079 30.7026 14.3222 31.4209C14.5366 32.1411 14.8069 32.8377 15.135 33.5126C15.4631 34.1874 15.8434 34.8306 16.2772 35.4426C16.7103 36.0547 17.1912 36.6283 17.7182 37.1627C18.2457 37.6958 18.8125 38.1842 19.4196 38.6254L11.3358 49.7478Z"
                  fill="#4E1D9C"
                />
                <path
                  d="M1.3457 19.0017C1.79125 17.6297 2.3418 16.3005 2.99738 15.0149C3.65296 13.7292 4.40423 12.5025 5.25243 11.3356C6.10064 10.1686 7.03523 9.07428 8.05494 8.05457C9.07528 7.03423 10.1689 6.10027 11.3365 5.25144C12.5035 4.40385 13.7308 3.65258 15.0158 2.997C16.3015 2.34205 17.6301 1.79211 19.0027 1.34533C20.3748 0.899785 21.7736 0.56423 23.1984 0.338041C24.6233 0.113095 26.0575 0 27.4997 0L27.4985 13.7497C26.7771 13.7497 26.06 13.8062 25.3478 13.9193C24.6357 14.0318 23.936 14.2002 23.25 14.4233C22.564 14.6457 21.8997 14.921 21.2572 15.2485C20.614 15.576 20.0013 15.9525 19.4172 16.3763C18.8343 16.8001 18.2875 17.2674 17.7767 17.777C17.2672 18.2871 16.7999 18.834 16.3755 19.4181C15.9517 20.0016 15.5757 20.6149 15.2482 21.2568C14.9208 21.8999 14.6455 22.5642 14.423 23.2502L1.3457 19.0017Z"
                  fill="#330778"
                />
              </svg>
              <h1 className={`${montserrat} text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#41d298] to-[#A87AF1] bg-clip-text text-transparent`}>
                BudgetBuddy
              </h1>
            </div>
            <div className="space-y-4">
              <h2 className={`${montserrat} text-2xl md:text-3xl font-bold text-gray-800`}>
                Transform Your Financial Future
              </h2>
              <p className="text-gray-600 text-base md:text-lg">
                Join thousands of smart investors who trust BudgetBuddy to manage their finances and achieve their goals.
              </p>
              <button className="cta-button bg-gradient-to-r from-[#41d298] to-[#A87AF1] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:scale-105 transition-transform">
                Start Your Journey
              </button>
            </div>
          </div>

          {/* Right Column - Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className={`${montserrat} text-xl font-bold text-[#41d298]`}>Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="footer-link">Dashboard</Link></li>
                <li><button onClick={scrollToTop} className="footer-link text-left">Features</button></li>
                <li><Link href="/pricing" className="footer-link">Pricing</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className={`${montserrat} text-xl font-bold text-[#41d298]`}>Connect</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="footer-link">Contact Us</Link></li>
                <li><button onClick={() => setShowTerms(true)} className="footer-link text-left">Terms & Conditions</button></li>
                <li><Link href="/privacy" className="footer-link">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
        
          <div className="space-y-6">
            <h3 className={`${montserrat} text-xl font-bold text-[#41d298]`}>Meet Our Team</h3>
         
            <div className="space-y-2">
              <h4 className={`${montserrat} text-lg font-semibold text-gray-800`}>Yash Jewalkar</h4>
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/in/yash-jewalkar-203b56257" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon hover:text-[#0077b5] transition-colors"
                  title="Yash Jewalkar's LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/Yash12169" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon hover:text-[#333] transition-colors"
                  title="Yash Jewalkar's GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

          
            <div className="space-y-2">
              <h4 className={`${montserrat} text-lg font-semibold text-gray-800`}>Yash Maurya</h4>
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/in/yash-maurya-142136258" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon hover:text-[#0077b5] transition-colors"
                  title="Yash Maurya's LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/yash-maurya23" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon hover:text-[#333] transition-colors"
                  title="Yash Maurya's GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className={`${montserrat} text-xl font-bold text-[#41d298]`}>Stay Updated</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full border-2 border-[#41d298] focus:outline-none focus:border-[#A87AF1] bg-white text-[#41d298] placeholder-[#A87AF1] font-medium"
              />
              <button 
                onClick={handleSubscribe}
                className="px-6 py-2 bg-gradient-to-r from-[#41d298] to-[#A87AF1] text-white rounded-full hover:opacity-90 transition-all font-semibold"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

      
        <div className="text-center text-gray-600 pt-8 border-t border-gray-200">
          <p>© 2025 BudgetBuddy. All rights reserved.</p>
        </div>
      </div>

      
      {showTerms && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div 
            ref={modalRef}
            className="bg-gray-900 p-8 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 ease-in-out"
            style={{
              animation: 'modalSlideIn 0.3s ease-out'
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className={`${montserrat} text-2xl font-bold text-white`}>Terms and Conditions</h2>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prose prose-invert prose-sm">
              {termsContent.split('\n').map((line, index) => (
                <p key={index} className="mb-2 text-gray-200">{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      
      {showSubscribeAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#41d298] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-slide-down">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Successfully subscribed!</span>
        </div>
      )}
    </div>
  );
}