import { bricolage_grotesque, montserrat, poppins } from "@/fonts/fonts";
import HeroImage from "../ui/heroImage";
import mainshit from '../../assets/mainshit.webp'

export default function Hero() {
  return (
    <div 
      style={{ backgroundImage: `url(${mainshit.src})`, backgroundSize: "cover", backgroundPosition: "center 90%" }}
      className="w-full min-h-screen text-white pt-[5%] flex flex-col md:flex-row px-4 md:px-0 overflow-hidden"
    >
      <div className="w-full md:w-[50%] flex flex-col pt-[8%] gap-5 md:gap-7 items-center md:items-end">
        <div className="flex w-full md:w-[71%] justify-center md:justify-end px-2 md:px-0">
          <p className={`${bricolage_grotesque} font-[600] text-2xl sm:text-3xl md:text-7xl text-center md:text-left w-full md:w-[120%] leading-tight`}>
            How will you spend your{" "}
            <span className="line-through decoration-green-400">money</span>{" "}
            life?
          </p>
        </div>
        <div className="flex w-full md:w-[70%] justify-center md:justify-end px-2 md:px-0">
          <p className={`${bricolage_grotesque} text-lg sm:text-xl md:text-2xl text-center md:text-left max-w-[90%] md:max-w-none`}>
            Create a friendly, flexible plan and spend it well with BudgetBuddy
          </p>
        </div>
        <div className="flex justify-center md:justify-end w-full px-2 md:px-0 mt-2 md:mt-0">
          <div className="w-full md:w-[70%] gap-3 flex flex-col items-center md:items-start">
            <div className="bg-green-500 flex text-white px-6 sm:px-7 py-2.5 sm:py-3 w-fit rounded-lg cursor-pointer hover:bg-green-600 transition-colors">
              <p className={`${montserrat} font-semibold text-sm sm:text-base`}>Get Started for Free</p>
            </div>
            <div className="flex">
              <p className={`${poppins} text-xs sm:text-sm text-center md:text-left`}>It&apos;s easy! No payment required.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[50%] flex justify-center md:justify-start mt-4 md:mt-0">
        <HeroImage />
      </div>
    </div>
  );
}
