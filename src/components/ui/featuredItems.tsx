import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { poppins } from "@/fonts/fonts";
import card from '../../assets/card2.png'
import stress from '../../assets/stress19.png'
import coins from '../../assets/coins.png'
import nores from '../../assets/nores4.png'
import Image from "next/image";

export const FeaturedItems = () => {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16 text-[#1c1f58]">
      <div className="mb-6 sm:mb-8 md:mb-12 flex flex-col items-center justify-center gap-3 sm:gap-4">
        <h2 className={`max-w-3xl text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center leading-tight md:leading-10 ${poppins} px-2`}>
          What will you accomplish with BudgetBuddy?
        </h2>
      </div>
      <div className={`${poppins} mb-3 sm:mb-4 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6`}>
        <BounceCard className="col-span-1 md:col-span-5">
          <CardTitle>Pay off debt and stay out for good</CardTitle>
          <div className="absolute bottom-0 left-3 sm:left-4 right-3 sm:right-4 top-0 translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-0 group-hover:rotate-[2deg]">
            <Image src={card} alt="Debt free card" className="w-full h-full object-contain" />
          </div>
        </BounceCard>
        <BounceCard className="col-span-1 md:col-span-7">
          <CardTitle>Be less stressed about money</CardTitle>
          <div className="absolute bottom-0 left-[10%] right-[10%] top-[15%] translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-0 group-hover:rotate-[2deg]">
            <Image src={stress} alt="Stress free finances" className="w-full h-full object-contain" />
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
        <BounceCard className="col-span-1 md:col-span-7">
          <CardTitle>Save more money without feeling restricted</CardTitle>
          <div className="absolute bottom-0 left-[10%] right-[10%] top-[25%] translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-0 group-hover:rotate-[2deg]">
            <Image src={nores} alt="Flexible savings" className="w-full h-full object-contain" />
          </div>
        </BounceCard>
        <BounceCard className="col-span-1 md:col-span-5">
          <CardTitle>Feel organised about my finances</CardTitle>
          <div className="absolute bottom-0 left-[10%] right-[10%] top-0 translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-0 group-hover:rotate-[2deg]">
            <Image src={coins} alt="Organized finances" className="w-full h-full object-contain" />
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100 p-3 sm:p-4 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="mx-auto text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
      {children}
    </h3>
  );
};
