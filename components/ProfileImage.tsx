"use client";
import React from "react";
import { motion } from "framer-motion";
import TechShow from "./TechShow";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";
import { IoIosSend } from "react-icons/io";
import { PiReadCvLogo } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link";

function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
      className="w-full h-full flex flex-col justify-start items-center gap-y-7"
    >
      <div className="size-28 md:size-36 rounded-full object-cover border-2 border-border md:mr-auto md:ml-5 mt-5">
        <img
          className="w-full h-full object-cover rounded-full"
          src="https://res.cloudinary.com/dlnzbkyit/image/upload/v1765542527/wmremove-transformed_hr1m9s.jpg"
          alt="Akarsh Jha"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-3 mt-3">
        <div className="text-2xl md:text-3xl text-foreground font-semibold text-center md:text-left md:mr-auto font-sans">
          <h2>
            Hi, I'm Akarsh Jha —{" "}
            <span className="text-foreground/60">
              A Full Stack web developer.
            </span>
          </h2>
        </div>

        <div className="text-center md:text-left mt-2 tracking-wide leading-snug selection:text-foreground">
          <p className="text-lg md:text-xl text-foreground/60">
            I develop interactive web apps with{" "}
            <span className="inline-flex align-middle">
              <TechShow
                icon={SiTypescript}
                iconColor="#007acc"
                name="TypeScript"
                link="https://www.typescriptlang.org/"
              />
            </span>
            ,{" "}
            <span className="inline-flex align-middle">
              <TechShow
                icon={SiReact}
                iconColor="#007acc"
                name="React"
                link="https://react.dev/"
              />
            </span>{" "}
            ,{" "}
            <span className="inline-flex align-middle">
              <TechShow
                icon={SiNextdotjs}
                iconColor="#EEEEEE"
                name="Next.js"
                link="https://nextjs.org/"
              />
            </span>{" "}
            <span className="inline-flex align-middle">
              <TechShow
                icon={SiMongodb}
                iconColor="#13aa52"
                name="MongoDB"
                link="https://www.mongodb.com/docs/"
              />
            </span>{" "}
            ,{" "}
            <span className="inline-flex align-middle">
              <TechShow
                icon={SiPostgresql}
                iconColor="#007acc"
                name="PostgreSQL"
                link="https://www.postgresql.org/docs/"
              />
            </span>{" "}
            , focusing on clean and intuitive interfaces.
          </p>
        </div>
      </div>
      <div className="w-full md:mr-auto md:ml-2 mt-4 flex flex-wrap justify-center md:justify-start items-center gap-4">
        <Button onClick={() => window.open('https://drive.google.com/file/d/1-OX0m3pcWF6bu2FnQg-r_nq3QyX2OX2g/view?usp=sharing',"_blank")} className="bg-primary border-2 border-border hover:bg-accent text-black font-semibold flex-1 md:flex-none">
          <PiReadCvLogo /> Resume/CV
        </Button>
       <Link href={'/contact'}>
        <Button className="bg-secondary border-2 border-border hover:bg-accent text-black font-semibold flex-1 md:flex-none">
          <IoIosSend /> Get In Touch
        </Button>
       </Link>
      </div>

      <div className="mt-5 w-full md:mr-auto md:ml-2 flex flex-wrap justify-center md:justify-start items-center gap-3">
        {[
          {
            name: "Github",
            link: "https://github.com/Akarsh-Kumar-Jha",
            icon: FaGithub,
          },
          {
            name: "Linkedin",
            link: "https://www.linkedin.com/in/akarsh-kumar-jha-178b19297/",
            icon: FaLinkedin,
          },
          {
            name: "Instagram",
            link: "https://www.instagram.com/akarsh_jha.83/",
            icon: FaInstagram,
          },
          {
            name: "X",
            link: "https://x.com/AkarshJha_",
            icon: CiTwitter,
          },
          {
            name: "Email",
            link: "https://mail.google.com/mail/?view=cm&fs=1&to=akarshdbg@gmail.com",
            icon: MdOutlineMail,
          },
        ].map((item, index) => {
          return (
            <div key={index}>
              <Button
                onClick={() => window.open(item.link, "_blank")}
                className="bg-card cursor-pointer group relative hover:bg-accent text-foreground text-sm border-2 border-border p-2 md:p-3"
              >
                <item.icon className="text-base md:text-sm" />
                <span className="hidden md:block absolute group-hover:scale-100 scale-0 -top-full -translate-y-2 left-1/2 -translate-x-1/2 bg-card p-2 rounded-2xl text-xs text-foreground transition-all">
                  {item.name}
                </span>
              </Button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ProfileImage;