"use client";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { bricolage_grotesque, montserrat, poppins } from "@/fonts/fonts";
import SignUpModal from "../SignUpForm/SignUpModal";
import LogInModal from "../LogInForm/LogInModal";
export default function Navbar2() {
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<SVGSVGElement>(null);
  const shimmerParentRef = useRef<HTMLButtonElement>(null);
  const linkedinRef = useRef<SVGSVGElement>(null);
  const githubRef = useRef<SVGSVGElement>(null);

  //shimmer
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

  return (
    <nav
      className={` flex justify-between items-center shadow-md pb-[1rem] pl-[13rem] pr-[16rem] pt-[1rem]  fixed bg-[#1c1f58] text-white w-screen z-[1000]`}
    >
      <div className=" flex items-center gap-[4rem] justify-between">
        <div
          className={`${montserrat} text-white text-[1.8rem] cursor-pointer  font-bold `}
        >
          <h1>
            BudgetBuddy<span className="text-green-500">.</span>
          </h1>
        </div>
        <div className={`flex gap-[1.5rem] ${montserrat}`}>
          {["Home", "Goals", "Finances"].map((item, index) => (
            <div
              key={index}
              className="text-[1rem] font-semibold cursor-pointer opacity-90 relative group"
            >
              <p>{item}</p>
              <div className="absolute bottom-0 left-0 h-[2px] bg-green-500 w-0 group-hover:animate-slideIn group-hover:group-hover-none animate-slideOut"></div>
            </div>
          ))}
        </div>
      </div>

      <div className=" flex gap-5 justify-center items-center">
        <LogInModal/>
        <SignUpModal/>
        {/* <div
          className={`${montserrat}  bg-green-500 px-5 py-2 rounded-lg font-semibold cursor-pointer text-white`}
        >
          <p>Create an Account</p>
        </div> */}
      </div>
    </nav>
  );
}
