'use client';
import React, { useRef } from 'react'
import { motion } from 'framer-motion';
import { SiCplusplus, SiExpress, SiFramer, SiGit, SiJavascript, SiLangchain, SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPython, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';

function AboutMe() {
    const constraintsRef = useRef<HTMLDivElement>(null);
    return (
        <section id='about' className='min-h-screen w-full flex flex-col justify-center items-center gap-y-10 py-5'>
            <h2 className='text-2xl md:text-3xl text-foreground text-left self-start border-b-2 border-border'><span className='text-foreground/60'>About</span> MySelf</h2>
            
            <div className='flex flex-col-reverse md:flex-row justify-between items-center gap-8 md:gap-x-5'>
                <div className='font-sans w-full md:w-[70%] text-base md:text-lg font-semibold tracking-wide leading-snug text-left'>
                    I am a final-year B.Tech Computer Science (AI) student with a strong interest in full-stack development. I have experience building web applications using React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Python, and LangChain. I also have a solid foundation in C++ and Data Structures, and I’m eager to keep learning and contribute to impactful real-world projects.
                </div>
                <motion.div 
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} 
                    transition={{ duration: 1 }} 
                    className='w-40 md:flex-1 p-2 flex justify-center items-center bg-card rounded-2xl'
                >
                    <img className='w-full rounded-2xl border-2 border-border object-cover' src="https://res.cloudinary.com/dlnzbkyit/image/upload/v1765542527/wmremove-transformed_hr1m9s.jpg" alt="Akarsh Jha" />
                </motion.div>
            </div>

            <div className='w-full flex flex-col justify-evenly items-start gap-y-5'>
                <h2 className='text-lg md:text-xl font-semibold text-left text-foreground border-b-2 border-border'>Skills and Technologies</h2>
                <div 
                    style={{ userSelect: "none" }} 
                    ref={constraintsRef} 
                    className='w-full flex flex-row flex-wrap justify-center md:justify-start items-center gap-3 p-3 md:p-5 bg-card border-2 border-border rounded-2xl overflow-hidden'
                >
                    {[
                        { name: "React", icon: SiReact, color: "#61DAFB", link: "https://react.dev/" },
                        { name: "Next.js", icon: SiNextdotjs, color: "#EEEEEE", link: "https://nextjs.org/" },
                        { name: "Node.js", icon: SiNodedotjs, color: "#3C873A", link: "https://nodejs.org/en/" },
                        { name: "MongoDB", icon: SiMongodb, color: "#47A248", link: "https://www.mongodb.com/" },
                        { name: "Express", icon: SiExpress, color: "#ffffff", link: "https://expressjs.com/" },
                        { name: "Python", icon: SiPython, color: "#3776AB", link: "https://www.python.org/" },
                        { name: "LangChain", icon: SiLangchain, color: "#000000", link: "https://python.langchain.com/" },
                        { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", link: "https://www.postgresql.org/" },
                        { name: "C++", icon: SiCplusplus, color: "#00599C", link: "https://www.cplusplus.com/" },
                        { name: "Git", icon: SiGit, color: "#F05032", link: "https://git-scm.com/" },
                        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC", link: "https://tailwindcss.com/" },
                        { name: "Framer Motion", icon: SiFramer, color: "#fff312", link: "https://www.framer.com/motion/" },
                        { name: "TypeScript", icon: SiTypescript, color: "#007acc", link: "https://www.typescriptlang.org/" },
                        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.button 
                                drag 
                                whileDrag={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }} 
                                dragConstraints={constraintsRef}
                                transition={{stiffness:100}}
                                key={index}
                                className='bg-card hover:scale-95 border-2 cursor-pointer hover:bg-card/90 border-border px-3 py-2 rounded-2xl flex flex-row justify-center items-center gap-x-2'
                            >
                                <Icon style={{ color: item.color }} className="text-sm md:text-base" />
                                <h2 className='text-xs md:text-sm font-semibold text-foreground whitespace-nowrap'>{item.name}</h2>
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
};

export default AboutMe;