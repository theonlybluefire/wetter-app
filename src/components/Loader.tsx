import React from "react";
import { cardio } from 'ldrs'
import { motion } from "framer-motion"


export function Loader() {
  cardio.register()
  return (
    <motion.div 
      key="Loader"
      initial={{opacity:0,y:-500}}
      animate={{opacity:1,y:0}}
      className="top-0 absolute w-full h-full backdrop-blur-md">
      <div className="rounded-3xl absolute w-1/3 h-1/3 top-1/3 left-1/3 bg-dark-blue/30 flex grid justify-center items-center">
        <l-cardio
          size="50"
          stroke="4"
          speed="2" 
          color="#459FF6" 
        ></l-cardio>
      </div> 
    </motion.div>
  )
}