import exp from "constants";
import { Montserrat, Poppins } from "next/font/google";

const montserrat_init = Montserrat({
    subsets: ['latin'],
    weight: ['200','300','400','600','800'],
    variable: '--font-montserrat'
})
const poppins_init = Poppins({
    subsets: ['latin'],
    weight: ['200','300','400','600','800'],
    variable: '--font-poppins'
})

export const montserrat = montserrat_init.className
export const poppins = poppins_init.className