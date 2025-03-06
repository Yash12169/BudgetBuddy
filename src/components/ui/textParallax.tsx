"use client";
import React from "react";
import { ContainerScroll } from "./container-scroll-animation";
import Image from "next/image";
import feature2 from "../../assets/working.gif";

import { bricolage_grotesque, montserrat, poppins } from "@/fonts/fonts";


export function TextParallax() {
  return (
    <div className="flex flex-col overflow-hidden ">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className={`${poppins}  text-5xl font-semibold text-[#1c1f58] dark:text-white`}>
            We’re on a mission to build a better blueprint  for spending <br/> and saving.<br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-transparent">
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
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
