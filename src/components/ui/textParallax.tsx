"use client";
import React from "react";
import { ContainerScroll } from "./container-scroll-animation";
import Image from "next/image";
import feature2 from "../../assets/working.gif";
import { bricolage_grotesque, montserrat, poppins } from "@/fonts/fonts";

export function TextParallax() {
  return (
    <div className="flex flex-col overflow-hidden px-4 md:px-8">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className={`${poppins} text-3xl md:text-5xl font-semibold text-[#1c1f58] dark:text-white text-center md:text-left`}>
              <span className="block md:inline">We're on a mission to build</span>{" "}
              <span className="block md:inline">a better blueprint for</span>{" "}
              <span className="block md:inline">spending and saving.</span>
              <span className="hidden md:block text-2xl md:text-4xl lg:text-[6rem] font-bold mt-4 leading-none text-transparent">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={feature2}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-[300px] md:h-[500px] lg:h-full w-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
