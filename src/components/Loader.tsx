import { motion } from "framer-motion";
import React from "react";

const style = {
    width: 20,
    height: 20,
    opacity: 1,
    margin: 8,
    borderRadius: 6,
    display: "inline-block",
    background: "#c81c60",
}
  
const variants = {
    start: {
        scale: 0.5,
        rotate: 0,
    },
    end: {
        scale: 1,
        rotate: 180,
    },
}

export default function Loader(props) {
    return (
        <div>
          <motion.div
                    style={style}
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{    
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "anticipate",
                      duration: 1, 
                      delay: 0
                    }}
                />
          <motion.div
                    style={style}
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{    
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "anticipate",
                      duration: 1, 
                      delay: 0.2
                    }}
                />
          <motion.div
                    style={style}
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{    
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "anticipate",
                      duration: 1, 
                      delay: 0.4
                    }}
                />    
        </div>
    )
}

