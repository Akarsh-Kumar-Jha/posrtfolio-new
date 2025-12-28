import AboutMe from '@/components/AboutMe'
import FeaturedBlogs from '@/components/FeaturedBlogs'
import FeaturedProjects from '@/components/FeaturedProjects'
import LandingPage from '@/components/LandingPage'
import RandomQuote from '@/components/RandomQuote'
import React from 'react'

function HomePage() {
  return (
   <div className='w-full flex flex-col gap-y-16 md:gap-y-10'>
     <LandingPage />
     <FeaturedProjects />
     <AboutMe />
     <FeaturedBlogs />
     <RandomQuote />
   </div>
  )
}

export default HomePage