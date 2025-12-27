import AboutMe from '@/components/AboutMe'
import FeaturedBlogs from '@/components/FeaturedBlogs'
import FeaturedProjects from '@/components/FeaturedProjects'
import LandingPage from '@/components/LandingPage'
import React from 'react'

function HomePage() {
  return (
   <div className='w-full flex flex-col gap-y-16 md:gap-y-10'>
     <LandingPage />
     <FeaturedProjects />
     <AboutMe />
     <FeaturedBlogs />
   </div>
  )
}

export default HomePage