"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SignUpModal from "../SignUpForm/SignUpModal";
import LogInModal from "../LogInForm/LogInModal";
import { montserrat } from "@/fonts/fonts";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<SVGSVGElement>(null);
  const shimmerParentRef = useRef<HTMLButtonElement>(null);
  const linkedinRef = useRef<SVGSVGElement>(null);
  const githubRef = useRef<SVGSVGElement>(null);
  const userC = useUser();
  const router = useRouter();

  useEffect(() => {
    const shimmer = shimmerRef.current;
    const shimmerParent = shimmerParentRef.current;
    const search = searchRef.current;
    const linkedin = linkedinRef.current;
    const github = githubRef.current;
    if (shimmer && shimmerParent && search) {
      const shimmerAnimation = () => {
        gsap.to(shimmer, {
          duration: 0.3,
          x: -4,
          y: 3,
          ease: "circ.in",
          yoyo: true,
          repeat: 1,
        });
        gsap.to(search, {
          duration: 0.3,
          scale: 1.3,
          ease: "circ.in",
          repeat: 1,
          yoyo: true,
        });
      };
      shimmerParent.addEventListener("mouseenter", shimmerAnimation);
    }
    if (linkedin && github) {
      const dance = (element: SVGSVGElement) => {
        const tl = gsap.timeline();
        tl.to(element, {
          duration: 0.3,
          rotate: 15,
          repeat: 1,
          ease: "back.in(2)",
          yoyo: true,
        });
        tl.to(element, {
          duration: 0.3,
          repeat: 1,
          yoyo: true,
        });
      };
      linkedin.addEventListener("mouseenter", () => dance(linkedin));
      github.addEventListener("mouseenter", () => dance(github));
    }
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDashboardNavigation = () => {
    setIsNavigating(true);
    router.push("/user/dashboard");
  };

  return (
    <nav className="flex flex-col fixed w-full bg-[#1c1f58] text-white z-[1000]">
      <div className="flex justify-between items-center shadow-md px-4 md:px-8 lg:px-16 py-3 md:py-4">
        <div className="flex items-center gap-4 md:gap-[4rem]">
          <div className={`${montserrat} text-white text-[1.2rem] md:text-[1.8rem] cursor-pointer font-bold`}>
            <h1>
              BudgetBuddy<span className="text-green-500">.</span>
            </h1>
          </div>

          <div className={`hidden md:flex gap-[1.5rem] ${montserrat}`}>
            {["Home", "About", "Contact"].map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  const target = item.toLowerCase();
                  if (target === "home") {
                    router.push("/");
                  } else {
                    router.push(`/${target}`);
                  }
                }}
                className="text-[1rem] font-semibold cursor-pointer opacity-90 relative group"
              >
                <p>{item}</p>
                <div className="absolute bottom-0 left-0 h-[2px] bg-green-500 w-0 group-hover:animate-slideIn group-hover:group-hover-none animate-slideOut"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {!userC.isSignedIn && (
              <div className="flex gap-5 justify-center items-center">
                <LogInModal />
                <SignUpModal />
              </div>
            )}

            {userC.isSignedIn && (
              <div
                onClick={handleDashboardNavigation}
                className={`${montserrat} bg-green-500 px-5 py-2 rounded-lg font-semibold cursor-pointer text-white hover:bg-green-600 transition-all duration-300 relative overflow-hidden`}
              >
                <p className={`transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>Dashboard</p>
                {isNavigating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1c1f58] px-4 py-4 shadow-lg animate-slideDown">
          <div className="flex flex-col gap-6">
            {["Home", "About", "Contact"].map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  const target = item.toLowerCase();
                  if (target === "home") {
                    router.push("/");
                  } else {
                    router.push(`/${target}`);
                  }
                  setIsMenuOpen(false);
                }}
                className={`${montserrat} text-[1.1rem] font-semibold cursor-pointer hover:text-green-500 transition-colors py-2`}
              >
                <p>{item}</p>
              </div>
            ))}
            
            {!userC.isSignedIn && (
              <div className="flex flex-col gap-4 pt-4 border-t border-gray-700">
                <div className="py-2">
                  <LogInModal />
                </div>
                <div className="py-2">
                  <SignUpModal />
                </div>
              </div>
            )}

            {userC.isSignedIn && (
              <div
                onClick={() => {
                  handleDashboardNavigation();
                  setIsMenuOpen(false);
                }}
                className={`${montserrat} bg-green-500 px-5 py-3 rounded-lg font-semibold cursor-pointer text-white text-center hover:bg-green-600 transition-all duration-300 relative overflow-hidden mt-4 border-t border-gray-700`}
              >
                <p className={`transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>Dashboard</p>
                {isNavigating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
