'use client';
import React from 'react'
import ProjectShowcase from './ProjectShowcase';
import { IconType } from 'react-icons';
import { SiExpress, SiGoogle, SiMongodb, SiReact, SiSocketdotio } from 'react-icons/si';
import { Button } from './ui/button';
import Link from 'next/link';

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

function FeaturedProjects() {
  const Featuredprojects: Project[] = [
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
  ];

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center gap-y-10'>
      <h2 className='text-2xl md:text-3xl text-foreground text-left self-start border-b-2 border-border'>
        <span className='text-foreground/60'>Featured</span> Projects
      </h2>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-5 md:gap-y-3'>
        {Featuredprojects.map((project: Project) => {
          return (
            <ProjectShowcase key={project.id} project={project} />
          )
        })}
      </div>
      <div className='mt-5 mb-5'>
        <Link href='/projects'>
          <Button className='bg-primary border-2 border-border cursor-pointer hover:scale-95 hover:bg-accent text-black font-semibold'>
            See More Projects...
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedProjects;