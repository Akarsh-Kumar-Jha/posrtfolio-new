'use client';
import ProjectShowcase from '@/components/ProjectShowcase';
import React from 'react'
import { IconType } from 'react-icons';
import { SiExpress, SiGoogle, SiMongodb, SiReact, SiSocketdotio, SiTailwindcss } from 'react-icons/si';

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

function ProjectsPage() {
  const Projects: Project[] = [
    {
      id: 1,
      title: "Codox",
      description: "A real-time collaborative coding platform for learning, teamwork, and faster development together.",
      image: "https://res.cloudinary.com/dlnzbkyit/image/upload/v1766610542/wmremove-transformed_2_i2xkni.png",
      github: 'https://github.com/Akarsh-Kumar-Jha/Codox',
      link: 'https://codoox.netlify.app/',
      tech: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Express", icon: SiExpress, color: "#ffffff" },
        { name: "Socket.IO", icon: SiSocketdotio, color: "#010101" },
      ],
    },
    {
      id: 2,
      title: "Satvik AI",
      description: "An AI-powered vegetarian diet planner for healthy eating, lifestyle tracking, and mindful nutrition.",
      image: "https://res.cloudinary.com/dlnzbkyit/image/upload/v1766613050/Gemini_Generated_Image_ffokcpffokcpffok_sf8cd8.jpg",
      github: 'https://github.com/Akarsh-Kumar-Jha/Satvik-Ai',
      link: 'https://satvikai.netlify.app/',
      tech: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Express", icon: SiExpress, color: "#ffffff" },
        { name: "Gemini AI", icon: SiGoogle, color: "#4285F4" },
      ],
    },
    {
      id: 3,
      title: "Tasko",
      description: "A full-stack task manager with JWT auth, Redis caching, and AI-powered subtasks.",
      image: "https://res.cloudinary.com/dlnzbkyit/image/upload/v1766617071/Gemini_Generated_Image_fz1iw2fz1iw2fz1i_ivo7ok.jpg",
      github: 'https://github.com/Akarsh-Kumar-Jha/Tasko',
      link: 'https://taasko.netlify.app/',
      tech: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Express", icon: SiExpress, color: "#ffffff" },
      ],
    },
    {
      id: 4,
      title: "CartPlus",
      description: "An e-commerce frontend with dynamic products, shopping cart, and clean responsive design.",
      image: "https://res.cloudinary.com/dlnzbkyit/image/upload/v1766617397/Gemini_Generated_Image_qbs2xzqbs2xzqbs2_ks2wke.jpg",
      github: 'https://github.com/Akarsh-Kumar-Jha/CartPlus',
      link: 'https://caartplus.netlify.app/',
      tech: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Tailwind Css", icon: SiTailwindcss, color: "#61DAFB" },
      ],
    },
  ];

  return (
    <div className='min-h-[75vh] w-full flex flex-col justify-start items-center gap-y-5 py-10'>
      <h2 className='text-center text-3xl md:text-4xl font-semibold text-foreground border-b-2 border-border'>
        Projects
      </h2>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-7 md:gap-y-10 mt-7 mb-5 justify-items-center'>
        {Projects.map((project: Project) => (
          <ProjectShowcase key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage;