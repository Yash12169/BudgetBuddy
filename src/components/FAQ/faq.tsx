"use client";
import React, { useRef, useState } from "react";
import { montserrat, poppins } from "@/fonts/fonts";
import gsap from "gsap";

const faqs = [
  {
    question: "What is this BudgetBuddy?",
    answer:
      "Ever feel like your money just disappears into thin air? One minute you have it, and the next, poof—it's gone! This budgeting website helps you track your income and expenses, set financial goals, and finally figure out where all your money is going (spoiler: probably food and online shopping). With smart tracking and insightful reports, you can take control of your finances like a pro.",
  },
  {
    question: "Is this website free to use?",
    answer:
      "Royalty fees are typically around 5.9% of gross sales, plus additional marketing contributions.",
  },
  {
    question: " Is my financial data secure?",
    answer:
      "Absolutely! We use top-notch encryption and security measures to keep your data safe. Your financial secrets are safe with us—we won't judge your spending habits, even if you spend more on takeout than groceries.",
  },
  {
    question: "Can I access my budget from different devices?",
    answer:
      "Yes! If you create an account, your budget travels with you—whether you're using your laptop, phone, or a borrowed tablet from a friend",
  },
  {
    question: "Can I set spending limits for different categories?",
    answer:
      "Yes! You can set spending limits for essentials (like rent) and non-essentials (like your ever-growing sneaker collection). If you go over budget, we won't yell at you—but we will send you a friendly reminder that maybe, just maybe, you should slow down on the impulse purchases.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "Only if you want to save your data and access it from different devices. If you enjoy the thrill of losing all your financial records every time you clear your browser history, feel free to skip registration! But for a seamless experience (and to avoid budget-related heartbreak), we highly recommend signing up.",
  },
  {
    question: "Can I share my budget with my partner or family?",
    answer:
      "Yes! If you're co-budgeting with someone, you can share access with a partner, roommate, or even your dog—though we recommend giving financial control only to humans.",
  },
];

function Faq() {
  const [, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(SVGSVGElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => {
      const newIndex = prevIndex === index ? null : index;

      requestAnimationFrame(() => {
        faqs.forEach((_, i) => {
          const content = contentRefs.current[i];
          const icon = iconRefs.current[i];

          if (content) {
            const newHeight = i === newIndex ? content.scrollHeight : 0;
            gsap.to(content, {
              height: newHeight,
              opacity: i === newIndex ? 1 : 0,
              duration: 0.5,
              ease: "power4.inOut",
            });
          }

          if (icon) {
            gsap.to(icon, {
              rotation: i === newIndex ? 360 : 180,
              duration: 0.5,
              ease: "power4.inOut",
            });
          }
        });
      });

      return newIndex;
    });
  };

  return (
    <div className="flex flex-col gap-9 py-8 md:py-16 px-4 md:px-8 bg-[#FFF8ED]">
      <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
        <div className={`${montserrat} font-bold text-3xl md:text-4xl text-[#1c1f58]`}>
          <p>Any Questions?</p>
        </div>
        <div className={`${poppins} text-base md:text-lg text-[#1c1f58] max-w-2xl`}>
          <p>
            Find answers to common questions that you may have in your mind.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-5 w-full">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="w-full md:w-[90%] lg:w-[70%] p-4 md:p-5 rounded-[25px] text-[#1c1f58] border border-green-500 transition-all duration-300 hover:border-green-600"
          >
            <div
              className="flex justify-between items-center cursor-pointer gap-4"
              onClick={() => toggleFAQ(index)}
            >
              <p className={`${montserrat} font-semibold text-sm md:text-base`}>{faq.question}</p>
              <svg
                //@ts-expect-error - TODO: fix this
                ref={(el) => (iconRefs.current[index] = el || null)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none" 
                style={{ transform: "rotate(180deg)", flexShrink: 0 }}
                className="transition-transform duration-300"
              >
                <path
                  d="M17 14L12 9L7 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div
              //@ts-expect-error - TODO: fix this
              ref={(el) => (contentRefs.current[index] = el || null)}
              className="overflow-hidden"
              style={{ height: 0, opacity: 0 }}
            >
              <p className={`${poppins} mt-2 text-sm md:text-base`}>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-4 md:mt-8">
        <button
          className={`${montserrat} font-semibold text-base md:text-lg bg-green-500 text-white cursor-pointer px-4 md:px-5 py-2 md:py-3 rounded-lg hover:bg-green-600 transition-colors`}
        >
          Got More Questions?
        </button>
      </div>
    </div>
  );
}

export default Faq;
