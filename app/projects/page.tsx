import ProjectsPage from '@/components/ProjectsPage'
import { Metadata } from 'next';
import React from 'react'



export const metadata: Metadata = {
  title: 'Projects | Akarsh Kumar Jha',
  description:
    'Explore my full-stack projects including RepoLens, BugWala, Codox, Satvik AI, Tasko, and CartPlus built using React, Next.js, LangChain, Supabase, and AI.',
  keywords: [
    'Full Stack Projects',
    'React Projects',
    'Next.js Portfolio',
    'RepoLens',
    'BugWala',
    'Codox',
    'Satvik AI',
    'Tasko',
    'CartPlus',
  ],
  openGraph: {
    title: 'Projects | Akarsh Kumar Jha',
    description:
      'A showcase of real-world full-stack applications with codebase analysis, resume review, real-time collaboration, AI, and modern UI.',
    url: 'https://your-portfolio-domain.com/projects',
    siteName: 'Akarsh Jha',
    images: [
      {
        url: 'https://res.cloudinary.com/dlnzbkyit/image/upload/v1787217548/repoLens_showcase_kyqjzk.png',
        width: 1200,
        height: 630,
        alt: 'RepoLens Project Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Akarsh Kumar Jha',
    description:
      'Check out my projects built with LangGraph, LangChain, React, Node.js, Supabase, Express, and AI.',
    images: [
      'https://res.cloudinary.com/dlnzbkyit/image/upload/v1787217548/repoLens_showcase_kyqjzk.png',
    ],
  },
};

function page() {
  return (
    <div className='w-full'>
      <ProjectsPage />
    </div>
  )
}

export default page