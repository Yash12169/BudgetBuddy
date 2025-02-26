import feature1 from "../../assets/feature1.avif";
import feature2 from "../../assets/working.gif";
import feature3 from "../../assets/networth_3.avif";
import Image from "next/image";
import { bricolage_grotesque, poppins } from "@/fonts/fonts";

export default function Features() {
  return (
    <div className="flex flex-col items-center w-full py-16 px-6 gap-[8rem] bg-[#FFF8ED]">

      {/* Feature 1 */}
      <div className="flex flex-col md:flex-row flex-wrap items-center max-w-7xl w-full gap-[8rem]">
        {/* Left Text Content */}
        <div className="md:w-1/2 max-w-md flex flex-col items-start text-left">
          <h2 className={`${bricolage_grotesque} text-4xl md:text-5xl text-[#1c1f58] leading-tight`}>
            Goal Tracking
          </h2>
          <p className={`${poppins} text-[#1c1f58] mt-4`}>
            Prioritize spending and savings goals with our powerful target setting features, 
            and track your progress at a glance.
          </p>
          <button className="text-[#40D299] mt-6 px-6 py-3 rounded-lg border-2 border-[#40D299] hover:text-white hover:bg-[#40D299] transition">
            <span className={`${poppins}`}>Learn More About Goals</span>
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center flex-grow">
          <Image 
            src={feature1} 
            alt="Goal Tracking" 
            className="rounded-lg w-full max-w-sm md:max-w-lg lg:max-w-xl min-w-[250px]"
          />
        </div>
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col md:flex-row flex-wrap items-center max-w-7xl w-full gap-[8rem]">
        {/* Left Image */}
        <div className="md:w-1/2 flex justify-center flex-grow">
          <Image 
            src={feature2} 
            alt="Goal Tracking" 
            className="rounded-lg w-full max-w-sm md:max-w-lg lg:max-w-xl min-w-[250px]"
          />
        </div>

        {/* Right Text Content */}
        <div className="md:w-1/2 max-w-md flex flex-col items-start text-left">
          <h2 className={`${bricolage_grotesque} text-4xl md:text-5xl text-[#1c1f58] leading-tight`}>
            Smart Workflows
          </h2>
          <p className={`${poppins} text-[#1c1f58] mt-4`}>
            Automate financial tasks and optimize your spending patterns with our AI-powered workflow tools.
          </p>
          <button className="text-[#AFE864] mt-6 px-6 py-3 rounded-lg border-2 border-[#AFE864] hover:text-white hover:bg-[#AFE864] transition">
            <span className={`${poppins}`}>Explore Smart Workflows</span>
          </button>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col md:flex-row flex-wrap items-center max-w-7xl w-full gap-[8rem]">
        {/* Left Text Content */}
        <div className="md:w-1/2 max-w-md flex flex-col items-start text-left">
          <h2 className={`${bricolage_grotesque} text-4xl md:text-5xl text-[#1c1f58] leading-tight`}>
            Net Worth Tracking
          </h2>
          <p className={`${poppins} text-[#1c1f58] mt-4`}>
            Get a complete view of your assets and liabilities with real-time net worth calculations.
          </p>
          <button className="text-[#525BFD] mt-6 px-6 py-3 rounded-lg border-2 border-[#525BFD] hover:text-white hover:bg-[#525BFD] transition">
            <span className={`${poppins}`}>Track Your Net Worth</span>
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center flex-grow">
          <Image 
            src={feature3} 
            alt="Net Worth Tracking" 
            className="rounded-lg w-full max-w-sm md:max-w-lg lg:max-w-xl min-w-[250px]"
          />
        </div>
      </div>

    </div>
  );
}
