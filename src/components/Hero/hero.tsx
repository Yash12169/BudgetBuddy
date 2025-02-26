import { bricolage_grotesque, montserrat, poppins } from "@/fonts/fonts";
import HeroImage from "../ui/heroImage";
import mainshit from '../../assets/mainshit.webp'
export default function Hero() {
  return (
    <div  style={{ backgroundImage: `url(${mainshit.src})`, backgroundSize: "cover", backgroundPosition: "center 90%" }}
    className={` w-[100%] h-screen text-white   pt-[5%] flex `}>
      <div className="bgblue-500 w-[50%] flex flex-col pt-[8%] gap-7 ">
        <div className="bg-ble-500 flex w-[100%] justify-end ">
          <div className="flex bg--400 w-[70%]">
            <p
              className={`${bricolage_grotesque} font-[600]  text-7xl w-[100%] leading-tight`}
            >
              How will you spend your{" "}
              <span className="line-through decoration-green-400">money</span>{" "}
              life?
            </p>
          </div>
        </div>
        <div className="bg-bue-500 flex w-[100%] justify-end">
          <p className={`${bricolage_grotesque} text-2xl w-[70%]`}>
            Create a friendly, flexible plan and spend it well with BudgetBuddy
          </p>
        </div>
        <div className="flex justify-end">
          <div className="w-[70%] gap-2 flex flex-col">
            <div className="bg-green-500 flex text-white px-7 py-3 w-fit rounded-lg  cursor-pointer">
              <p className={`${montserrat} font-semibold`}>Get Started for Free</p>
            </div>
            <div className="flex">
                <p className={`${poppins} text-sm`}>It&apos;s easy! No payment required.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-ed-500 w-[50%] flex justify-start">
        <HeroImage />
      </div>
    </div>
  );
}
