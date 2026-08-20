'use client';
import ProjectShowcase from '@/components/ProjectShowcase';
import React from 'react'
import { IconType } from 'react-icons';
import { SiExpress, SiGithub, SiGoogle, SiLangchain, SiMongodb, SiNodedotjs, SiPrisma, SiReact, SiSocketdotio, SiSupabase, SiTailwindcss, SiZod } from 'react-icons/si';
import { TbCpu, TbHierarchy3 } from 'react-icons/tb';

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
      description: "A real-time collaborative coding platform for interactive learning, teamwork, and faster development together.",
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
      description: "An AI-powered vegetarian diet planner for personalized meal recommendations, lifestyle tracking, and mindful nutrition.",
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
      title: "RepoLens",
      description: "An AI-powered GitHub repository analyzer that inspects codebase architecture, implementation, and code quality using multi-step analysis.",
      image: "https://res.cloudinary.com/dlnzbkyit/image/upload/v1787218599/ChatGPT_Image_Aug_20_2026_03_06_29_PM_iqe5vh.png",
      github: 'https://github.com/Akarsh-Kumar-Jha/gitReport',
      link: 'https://repolens.akarshjha.in/',
      tech: [
        { name: "LangGraph", icon: TbHierarchy3, color: "#FF5722" },
        { name: "LangChain", icon: SiLangchain, color: "#2DD4BF" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "GitHub MCP", icon: SiGithub, color: "#ffffff" },
        { name: "Groq", icon: TbCpu, color: "#F05023" },
        { name: "Zod", icon: SiZod, color: "#3E67B1" },
      ],
    },
    {
      id: 4,
      title: "BugWala",
      description: "An AI-powered resume analysis platform that identifies ATS issues, missing skills, weak projects, and grammar mistakes to build stronger resumes.",
      image: "https://res.cloudinary.com/dlnzbkyit/image/upload/v1787217532/bugwala_showcase_lxs2wa.png",
      github: 'https://github.com/Akarsh-Kumar-Jha/bugwala',
      link: 'https://www.bugwala.in/',
      tech: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#ffffff" },
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
        { name: "LangChain", icon: SiLangchain, color: "#2DD4BF" },
        { name: "Gemini AI", icon: SiGoogle, color: "#4285F4" },
      ],
    },
    {
      id: 5,
      title: "Tasko",
      description: "A full-stack task manager featuring JWT authentication, Redis caching, and AI-driven subtask generation.",
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
      id: 6,
      title: "CartPlus",
      description: "An e-commerce frontend built with dynamic product listings, interactive shopping cart, and clean responsive design.",
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