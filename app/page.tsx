import AboutMe from '@/components/AboutMe'
import FeaturedBlogs from '@/components/FeaturedBlogs'
import FeaturedProjects from '@/components/FeaturedProjects'
import LandingPage from '@/components/LandingPage'
import RandomQuote from '@/components/RandomQuote'
import React, { Suspense } from 'react'

async function HomePage() {
  return (
   <div className='w-full flex flex-col gap-y-16 md:gap-y-8 lg:gap-y-5'>
     <LandingPage />
     <FeaturedProjects />
     <AboutMe />
    <Suspense fallback={<div>Loading...</div>}>
       <FeaturedBlogs />
    </Suspense>
     <Suspense fallback={<div>Loading...</div>}>
      <RandomQuote />
     </Suspense>
   </div>
  )
}

export default HomePage