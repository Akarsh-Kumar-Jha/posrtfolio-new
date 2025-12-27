import React from 'react'
import ProfileImage from './ProfileImage'

function LandingPage() {
  return (
    <div className='w-full min-h-[80vh] md:h-screen flex flex-col justify-center md:justify-evenly items-center gap-y-5 py-10 md:py-0'>
      <section id='#home' className='h-auto md:h-[75vh] w-full flex items-center justify-center'>
        <ProfileImage />
      </section>
    </div>
  )
}

export default LandingPage