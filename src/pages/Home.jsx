import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { state } from "../store"

import {
    slideAnimation, fadeAnimation, headTextAnimation, headContainerAnimation, headContentAnimation 
} from "../config/motion";

export function Home() {
    const snap = useSnapshot(state)

    return (
    <AnimatePresence>
        {snap.intro && (
            <motion.section >
                <motion.img src="/three2_thumb.png" alt="logo" {...slideAnimation( "left","down")}/>
                <motion.div {...slideAnimation( "left","none")} >
                    <motion.h1 {...headTextAnimation} >LET'S DO IT!</motion.h1>
                </motion.div>
                <motion.div {...slideAnimation( "none","up")} >
                    <motion.p >In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</motion.p>
                </motion.div>
            </motion.section>
        )}
    </AnimatePresence>)
}