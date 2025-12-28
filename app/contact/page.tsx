import { ContactForm } from '@/components/Form'
import React from 'react'

function ContactPage() {
  return (
    <div className='w-full font-mono flex flex-col justify-evenly items-center gap-y-5'>
       <div className='flex flex-col justify-between items-center gap-y-3 border-b-2 border-border py-5 w-full'>
         <h2 className='mt-5 text-foreground text-4xl font-semibold'>Contact</h2>
        <p className='text-xl text-foreground/70'>Reach out anytime — I’ll get back to you soon.</p>
       </div>
       <div className='mt-5 w-full flex flex-col justify-evenly items-center gap-y-5'>
<div className='w-full flex flex-col justify-evenly items-center gap-y-5'>
<ContactForm />
</div>
       </div>

    </div>
  )
}

export default ContactPage