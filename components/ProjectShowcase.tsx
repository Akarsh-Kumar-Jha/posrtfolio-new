'use client';
import React from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  description: string;
  github: string;
  image: string;
  link: string;
  tech: {
    icon: IconType;
    name: string;
    color: string;
  }[];
};


function ProjectShowcase({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onClick={() => window.open(project.link, '_blank')}
      className="group font-serif cursor-pointer h-auto min-h-120 w-full sm:w-80 rounded-2xl bg-card border-2 border-border overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-shadow"
    >
      <div className="h-48 sm:h-[40%] w-full overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full object-cover"
          src={project.image}
          alt={project.title}
        />
      </div>

      <div className="flex-1 w-full px-4 py-4 sm:px-3 sm:py-2 flex flex-col">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
          {project.title}
        </h2>

        <p className="text-sm text-foreground/70 mt-2 leading-relaxed line-clamp-3 sm:line-clamp-none">
          {project.description}
        </p>

        <div className="mt-auto pt-5">
          <h3 className="text-base sm:text-lg font-semibold border-b border-border pb-1 mb-3">
            Tech Used
          </h3>

          <div className="flex flex-wrap gap-4 sm:gap-x-5">
            {project.tech.map((tech, idx) => (
              <div
                key={idx}
                className="relative group/icon cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <tech.icon
                    style={{ color: tech.color }}
                    className="text-xl sm:text-2xl"
                  />
                </motion.div>

                <span
                  className="hidden sm:block pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                  scale-0 group-hover/icon:scale-100 opacity-0 group-hover/icon:opacity-100
                  transition-all duration-200
                  bg-card border border-border px-2 py-1 rounded-md text-xs whitespace-nowrap shadow-md"
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-3 pt-0 mt-auto">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            window.open(project.github, '_blank');
          }} 
          className="w-full bg-secondary hover:bg-accent cursor-pointer border-2 border-border text-foreground dark:text-black font-semibold"
        >
          <FaGithub /> Repository
        </Button>
      </div>
    </motion.div>
  );
}

export default ProjectShowcase;