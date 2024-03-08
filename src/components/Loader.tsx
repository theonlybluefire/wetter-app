import { motion } from "framer-motion";
import { LeafyGreen } from "lucide-react";
import React from "react";

export default () => {
  return (
    <div className='flex h-20 justify-center text-center'>
      <motion.div
        className="w-21 h-21 relative bg-blue-700"
        initial={{ scale: 0}}
        animate={{ scale: 1}}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
      >
        <motion.div
          className="absolute left-1/2 bottom-0 w-16 h-16 rounded-full bg-blue-700"
          initial={{ y: 0,x:0, scale: 1 }}
          animate={{ y: "-50%",x:"-50%", scale: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

