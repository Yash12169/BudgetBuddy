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
      "Absolutely! We use top-notch encryption and security measures to keep your data safe. Your financial secrets are safe with us—we won’t judge your spending habits, even if you spend more on takeout than groceries.",
  },
  {
    question: "Can I access my budget from different devices?",
    answer:
      "Yes! If you create an account, your budget travels with you—whether you’re using your laptop, phone, or a borrowed tablet from a friend",
  },
  {
    question: "Can I set spending limits for different categories?",
    answer:
      "Yes! You can set spending limits for essentials (like rent) and non-essentials (like your ever-growing sneaker collection). If you go over budget, we won’t yell at you—but we will send you a friendly reminder that maybe, just maybe, you should slow down on the impulse purchases.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "Only if you want to save your data and access it from different devices. If you enjoy the thrill of losing all your financial records every time you clear your browser history, feel free to skip registration! But for a seamless experience (and to avoid budget-related heartbreak), we highly recommend signing up.",
  },
  {
    question: "Can I share my budget with my partner or family?",
    answer:
      "Yes! If you’re co-budgeting with someone, you can share access with a partner, roommate, or even your dog—though we recommend giving financial control only to humans.",
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <div className="flex flex-col gap-9 pt-9 bg-[#FFF8ED]">
      <div className="flex flex-col items-center gap-6">
        <div className={`${montserrat} font-bold text-4xl text-[#1c1f58]`}>
          <p>Any Questions?</p>
        </div>
        <div className={`${poppins} text-lg  text-[#1c1f58]`}>
          <p>
            Find answers to common questions that you may have in your mind.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center  p-5 gap-5">
        {faqs.map((faq, index) => (
          <div key={index} className="w-[70%] p-5 rounded-[25px] bg-[] text-[#1c1f58] border border-green-500">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <p className={`${montserrat} font-semibold`}>{faq.question}</p>
              <svg
                ref={(el) => (iconRefs.current[index] = el)}
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transform: "rotate(180deg)" }}
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
              ref={(el) => (contentRefs.current[index] = el)}
              className="overflow-hidden"
              style={{ height: 0, opacity: 0 }}
            >
              <p className={`${poppins} mt-2`}>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex items-center justify-center">
        <p
          className={`${montserrat} font-semibold text-lg bg-green-500 text-white cursor-pointer w-fit px-5 py-3 rounded-lg`}
        >
          Got More Questions?
        </p>
      </div>

     
    </div>
  );
}

export default Faq;
