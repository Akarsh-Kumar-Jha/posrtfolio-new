'use client';
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { motion, useScroll, MotionStyle } from "motion/react";

function Navbar() {
    const { scrollYProgress } = useScroll();
    return (
        <motion.nav 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }} 
            className="h-auto min-h-[10vh] md:h-[12vh] w-full sticky top-0 z-50 flex flex-row items-center justify-between py-4 px-1 md:p-3 border-b-2 border-border backdrop-blur-lg"
        >
            <motion.div
                style={{ scaleX: scrollYProgress } as MotionStyle}
                className="absolute top-full left-0 h-0.75 w-full origin-left bg-primary transition-transform duration-500 ease-in-out rounded-3xl"
            />
            <div className="flex flex-row justify-center items-center gap-x-3 md:gap-x-5">
                <Link href={'/'}>
                    <motion.img 
                        whileHover={{ scale: 0.9 }} 
                        transition={{ duration: 0.3 }} 
                        className="size-12 md:size-16 cursor-pointer" 
                        src="https://res.cloudinary.com/dlnzbkyit/image/upload/v1766583987/wmremove-transformed_1_a7cxbk.png" 
                        alt="Logo"
                    />
                </Link>
                <div className="flex flex-row justify-center items-center gap-x-3 md:gap-x-5 text-xs md:text-sm text-foreground font-semibold font-sans">
                    <Link href={'/#about'}>About</Link>
                    <Link href={'/blogs'}>Blogs</Link>
                    <Link href={'/projects'}>Projects</Link>
                </div>
            </div>
            <div>
                <ThemeToggle />
            </div>
        </motion.nav>
    );
}

export default Navbar;