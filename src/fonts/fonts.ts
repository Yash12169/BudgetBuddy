import { Bricolage_Grotesque, Fredoka, Montserrat, Poppins, Source_Sans_3 } from "next/font/google";

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
const source_sans_3_init = Source_Sans_3({
    subsets: ['latin'],
    weight: ['200','300','400','600','800'],
    variable: '--font-source-sans-3'
})
const fredoka_init = Fredoka({
    subsets: ['latin'],
    weight: ['300','400','600',],
    variable: '--font-fredoka'
})
const bricolage_grotesque_init = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['200','300','400','600','800'],
    variable: '--font-bricolage-grotesque'
})
export const montserrat = montserrat_init.className
export const poppins = poppins_init.className
export const source_sans_3 = source_sans_3_init.className
export const fredoka = fredoka_init.className
export const bricolage_grotesque = bricolage_grotesque_init.className