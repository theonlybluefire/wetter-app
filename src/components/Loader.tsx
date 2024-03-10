import { motion } from "framer-motion";
import React from "react";

export default () => {
  return (
    <div className='flex h-20 justify-center text-center'>
      <motion.div className=" w-5 h-5 rounded-md bg-blue-700"
      initial={{rotate:0}}
      animate={{rotate:[180,0,-180],borderRadius:[6,10,6]}}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
        yoyo: Infinity,
        repeatType: "reverse"  
      }}
      >
      </motion.div>
  </div>
  );
};

