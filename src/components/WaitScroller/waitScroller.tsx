"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { bricolage_grotesque } from "@/fonts/fonts";
gsap.registerPlugin(ScrollTrigger);
interface article {
  id: number;
  title: string;
  slug: string;
  pub_date: string;
  image: string;
  read_time: string;
  views: string;
  description: string;
  author: string;
}

export default function WaitScroller() {
  const [page] = useState(1);
  const pages = 5;
  const startIndex = (page - 1) * pages;
  const endIndex = startIndex + pages;
  const currentArticles = article_data.slice(startIndex, endIndex);

  const arrowRef = useRef<{ [key: number]: SVGSVGElement }>({});
  const articleRef = useRef<{ [key: number]: HTMLDivElement }>({});
  const pointerOneRef = useRef<{ [key: number]: SVGPathElement }>({});
  const pointerTwoRef = useRef<{ [key: number]: SVGPathElement }>({});
  const pointerThreeRef = useRef<{ [key: number]: SVGPathElement }>({});
  const pinnedRef = useRef<HTMLDivElement>(null);
  const pinnedParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinned = pinnedRef.current;
    const pinnedParent = pinnedParentRef.current;

    if (pinned && pinnedParent) {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ScrollTrigger.refresh();
      const pinnedAnim = ScrollTrigger.create({
        trigger: pinned,
        start: "top 100px",
        pin: true,
        anticipatePin: 1,
        pinSpacing: false,
        end: () => `+=${pinnedParent.offsetHeight - pinned.offsetHeight}`,
      });
      return () => {
        pinnedAnim.kill();
        window.scrollTo(0, 0);
      };
    }
  }, [page]);
  useEffect(() => {
    currentArticles.forEach((articles) => {
      const arrow = arrowRef.current[articles.id];
      const articleDiv = articleRef.current[articles.id];
      const pointer1 = pointerOneRef.current[articles.id];
      const pointer2 = pointerTwoRef.current[articles.id];
      const pointer3 = pointerThreeRef.current[articles.id];

      if (arrow && articleDiv && pointer1 && pointer2 && pointer3) {
        const spring = () => {
          const tl = gsap.timeline();
          tl.to(arrow, {
            duration: 0.2,
            width: 30,
            onStart: () => {
              arrow.classList.add("text-primary");
            },
          });
          tl.to(pointer1, {
            opacity: 1,
            duration: 0.1,
          });
          tl.to(pointer2, {
            opacity: 0.8,
            duration: 0.1,
          });
          tl.to(pointer3, {
            opacity: 0.6,
            duration: 0.1,
          });
          tl.to(pointer1, {
            opacity: 0,
            duration: 0.1,
          });
          tl.to(pointer2, {
            opacity: 0,
            duration: 0.1,
          });
          tl.to(pointer3, {
            opacity: 0,
            duration: 0.1,
          });
        };
        const springRev = () => {
          gsap.to(arrow, {
            duration: 0.3,
            width: 20,
            onStart: () => {
              arrow.classList.remove("text-primary");
            },
          });
        };
        articleDiv.addEventListener("mouseenter", spring);
        articleDiv.addEventListener("mouseleave", springRev);
        return () => {
          gsap.killTweensOf([arrow, pointer1, pointer2, pointer3]);
          articleDiv.removeEventListener("mouseenter", spring);
          articleDiv.removeEventListener("mouseleave", springRev);
        };
      }
    });
  }, [currentArticles]);

  return (
    <div className="flex flex-col">
      <div
        className=" flex  justify-center gap-[3rem] px-[2rem]"
        ref={pinnedParentRef}
      >
        <div className="flex flex-col w-[50%] bg-red-800" ref={pinnedRef}>
          <div>
            <p>The YNAB Method</p>
          </div>
          <div>
            <div>
              <p>Our Method is Magic</p>
            </div>
            <div>
              <p>
                YNAB guides you through the practice of giving every dollar a
                job—it&apos;s like having a life coach for your money. Here are five
                questions that can help guide you through it.
              </p>
            </div>
            <div>
              <svg
                width="220"
                height="30"
                viewBox="0 0 220 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M66.5612 6.08881C44.7636 4.44111 22.8285 8.93795 1.03086 7.15294C46.4799 1.69494 68.6895 -2.45863 111.427 13.5721C130.341 20.6435 183.925 47.8649 217.429 2.58745"
                  stroke="#545BFE"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M212.245 5.71118C212.245 5.71118 217.016 3.58291 217.428 1.90088C217.428 1.90088 219.11 7.70216 217.428 9.41852"
                  stroke="#545BFE"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className=" flex flex-col h-fit justify-start gap-[3rem] w-[50%] ">
          {currentArticles.map((article) => (
            <Link
              href={`/${article.slug}`}
              key={article.id}
              className="rounded-[20px] flex w-[100%]  justify-between  bg-primary cursor-pointer"
            >
              <div
                ref={(el) => {
                  if (el) {
                    articleRef.current[article.id] = el;
                  }
                }}
                className="rounded-[20px] flex justify-between px-6 py-4 border-[2px] border-primary bg-base-100 translate-x-[-1%] translate-y-[-3.5%] hover:translate-x-[0%] transition duration-300 hover:translate-y-[0%]"
              >
                <div className="flex flex-col  justify-between pt-6 pb-6 gap-3  w-[70%]">
                  <div className="flex flex-col]">
                    <p
                      className={`font-bold ${bricolage_grotesque} text-[1.375rem] leading-tight  w-[95%]`}
                    >
                      {article.title}
                    </p>
                  </div>
                  <div
                    className={`${bricolage_grotesque} flex w-fit gap-6 text-[0.95rem] font-semibold opacity-[0.6]`}
                  >
                    <div className="flex w-fit justify-center items-center">
                      <p>{article.pub_date}</p>
                    </div>
                    <div className="flex w-fit justify-center items-center">
                      <svg
                        className="mr-1 h-4 w-4 fill-current"
                        viewBox="0 0 576 512"
                      >
                        <path d="M540.9 56.77c-45.95-16.66-90.23-24.09-129.1-24.75-60.7.94-102.7 17.45-123.8 27.72-21.1-10.27-64.1-26.8-123.2-27.74-40-.05-84.4 8.35-129.7 24.77C14.18 64.33 0 84.41 0 106.7v302.9c0 14.66 6.875 28.06 18.89 36.8 11.81 8.531 26.64 10.98 40.73 6.781 118.9-36.34 209.3 19.05 214.3 22.19C277.8 477.6 281.2 480 287.1 480c6.52 0 10.12-2.373 14.07-4.578 10.78-6.688 98.3-57.66 214.3-22.27 14.11 4.25 28.86 1.75 40.75-6.812C569.1 437.6 576 424.2 576 409.6V106.7c0-22.28-14.2-42.35-35.1-49.93zM272 438.1c-24.95-12.03-71.01-29.37-130.5-29.37-27.83 0-58.5 3.812-91.19 13.77-4.406 1.344-9 .594-12.69-2.047C34.02 417.8 32 413.1 32 409.6V106.7c0-8.859 5.562-16.83 13.86-19.83C87.66 71.7 127.9 63.95 164.5 64c51.8.81 89.7 15.26 107.5 23.66V438.1zm272-28.5c0 4.375-2.016 8.234-5.594 10.84-3.766 2.703-8.297 3.422-12.69 2.125C424.1 391.6 341.3 420.4 304 438.3V87.66c17.8-8.4 55.7-22.85 107.4-23.66 35.31-.063 76.34 7.484 118.8 22.88 8.2 3 13.8 10.96 13.8 19.82v302.9z"></path>
                      </svg>
                      <p>{article.read_time}</p>
                    </div>
                    <div className="flex w-fit justify-center items-center">
                      <svg
                        className="mr-1 h-4 w-4 fill-current"
                        viewBox="0 0 384 512"
                      >
                        <path d="M136 320h-16c-4.4 0-8 3.6-8 8v96c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-96c0-4.4-3.6-8-8-8zm64-96h-16c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V232c0-4.4-3.6-8-8-8zm40 72v128c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8zM369.9 97.98L286.02 14.1c-9-9-21.2-14.1-33.89-14.1H47.99C21.5.1 0 21.6 0 48.09v415.92C0 490.5 21.5 512 47.99 512h288.02c26.49 0 47.99-21.5 47.99-47.99V131.97c0-12.69-5.1-24.99-14.1-33.99zM256.03 32.59c2.8.7 5.3 2.1 7.4 4.2l83.88 83.88c2.1 2.1 3.5 4.6 4.2 7.4h-95.48V32.59zm95.98 431.42c0 8.8-7.2 16-16 16H47.99c-8.8 0-16-7.2-16-16V48.09c0-8.8 7.2-16.09 16-16.09h176.04v104.07c0 13.3 10.7 23.93 24 23.93h103.98v304.01z"></path>
                      </svg>
                      <p>{article.views} views</p>
                    </div>
                  </div>
                  <div className={`${bricolage_grotesque}  w-[90%]`}>
                    <p className={`${bricolage_grotesque} text-[1rem]`}>
                      {article.description}
                    </p>
                  </div>
                  <div
                    className={`${bricolage_grotesque} font-bold flex items-center gap-[.3rem]`}
                  >
                    <p>Read More</p>
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.25rem"
                        height="1.25rem"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="bnak8zc"
                        ref={(el) => {
                          if (el) arrowRef.current[article.id] = el;
                        }}
                      >
                        <line x1="5" y1="12" y2="12" x2="18"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                      <svg
                        className="w-8 h-5 text-primary"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          ref={(el) => {
                            if (el) pointerOneRef.current[article.id] = el;
                          }}
                          className="opacity-0"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m0 5 7 7-7 7"
                        />
                        <path
                          ref={(el) => {
                            if (el) pointerTwoRef.current[article.id] = el;
                          }}
                          className="opacity-0"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m10 5 7 7-7 7"
                        />
                        <path
                          ref={(el) => {
                            if (el) pointerThreeRef.current[article.id] = el;
                          }}
                          className="opacity-0"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m20 5 7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
               
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
const article_data: article[] = [
  {
    id: 0,
    title: "Best UI libraries and frameworks to speed up development",
    slug: "uilibs",
    pub_date: "Jun 23, 2024",
    read_time: "2 min read",
    image: "/images/uilib.webp",
    views: "1.2k",
    description:
      "In today's fast-paced world of web development, delivering intuitive, visually appealing, and responsive user interfaces (UI) is essential. However, building UIs ...",
    author: "Yash Jewalkar",
  },
  {
    id: 1,
    title:
      "Animating the Web with GSAP: A Comprehensive Guide to the GreenSock Animation Platform",
    slug: "gsapanimations",
    pub_date: "Jul 5, 2024",
    read_time: "2 min read",
    image: "/images/gsap.webp",
    views: "625",
    description:
      "In the world of modern web development, animations play a critical role in enhancing user experience by making websites more interactive and engaging. Among the numerous  ... ",
    author: "Yash Jewalkar",
  },
  {
    id: 2,
    title:
      "Why You Should Choose TypeScript Over JavaScript: A Developer's Perspective",
    slug: "tsvsjs",
    pub_date: "Jul 19, 2024",
    read_time: "2 min read",
    image: "/images/ts.jpeg",
    views: "349",
    description:
      "JavaScript has been the cornerstone of web development for decades, powering everything from simple interactive elements to complex single-page applications (SPAs) ...",
    author: "Yash Jewalkar",
  },
  {
    id: 3,
    slug: "nextjs",
    title: "Why Next.js Should Be Your Go-to JavaScript Framework",
    pub_date: "Aug 1, 2024",
    read_time: "2 min read",
    image: "/images/next.png",
    views: "233",
    description:
      "In the ever-evolving world of web development, choosing the right framework can be a daunting task. There are several options out there, each with its unique advantages. Next.js ...",
    author: "Yash Jewalkar",
  },
  {
    id: 4,
    title: "Why Tailwind CSS is Better Than Writing Regular CSS",
    slug: "tailwindvsregularcss",
    pub_date: "Aug 26, 2024",
    read_time: "2 min read",
    image: "/images/tailwind.png",
    views: "125",
    description:
      "When building modern web applications, developers often face the challenge of writing clean, scalable, and maintainable styles. While traditional CSS provides the  ...",
    author: "Yash Jewalkar",
  },
  {
    id: 5,
    title:
      "State Management Made Simple: How to Master It Without Breaking a Sweat",
    slug: "statemanagement",
    pub_date: "Sep 7, 2024",
    read_time: "2 min read",
    image: "/images/states.jpg",
    views: "97",
    description:
      "In the rapidly evolving world of web development, handling state effectively is a crucial aspect of building scalable and responsive applications. As developers  ...",
    author: "Yash Jewalkar",
  },
  {
    id: 6,
    title: "How to Build a Portfolio That Gets You Hired",
    slug: "portfolio",
    pub_date: "Oct 2, 2024",
    read_time: "2 min read",
    image: "/images/portfolio.png",
    views: "59",
    description:
      "In today's competitive job market, having a standout portfolio is crucial for developers seeking to showcase their skills and attract potential employers ...",
    author: "Yash Jewalkar",
  },
];
