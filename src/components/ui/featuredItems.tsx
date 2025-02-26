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
    <section className="mx-auto max-w-7xl px-4 py-12 text-[#1c1f58]">
      <div className="mb-8 flex flex-col items-center  justify-center gap-4 md:flex-row md:items-center md:px-8">
        <h2
          className={`max-w-3xl text-3xl font-semibold md:text-4xl text-center leading-10 ${poppins}`}
        >
          What will you accomplish with BudgetBuddy?
        </h2>
      </div>
      <div className={`${poppins} mb-4 grid grid-cols-12 gap-4`}>
        <BounceCard className="col-span-12 md:col-span-5">
          <CardTitle>Pay off debt and stay out for good</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-0 translate-y-8 rounded-t-2xl  transition-transform duration-[250ms] group-hover:translate-y-0 group-hover:rotate-[2deg]">
           <Image src={card} alt={"card"}/>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-7">
          <CardTitle>Be less stressed about money</CardTitle>
          <div className="absolute bottom-0 left-[10%] right-[10%] top-[15%]  translate-y-8 rounded-t-2xl  transition-transform duration-[250ms] group-hover:translate-y-0 group-hover:rotate-[2deg]">
           <Image src={stress} alt={"card"} />
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-7">
          <CardTitle>Save more money without feeling restricted</CardTitle>
          <div className="absolute bottom-0 left-[10%] right-[10%] top-[25%]      translate-y-8 rounded-t-2xl  transition-transform duration-[250ms] group-hover:translate-y-0 group-hover:rotate-[2deg]">
           <Image src={nores} alt={"card"} />
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-5">
          <CardTitle>Feel organised about my finances</CardTitle>
          <div className="absolute bottom-0 left-[10%] right-[10%] top-0      translate-y-8 rounded-t-2xl  transition-transform duration-[250ms] group-hover:translate-y-0 group-hover:rotate-[2deg]">
           <Image src={coins} alt={"card"} />
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
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
  );
};
