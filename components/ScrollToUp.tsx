'use client';
import React from 'react'
import { BiUpArrowCircle } from 'react-icons/bi';

function ScrollToUp() {
  return (
    <BiUpArrowCircle onClick={() => window.scrollTo({top:10,behavior:'smooth'})} className='text-4xl text-accent animate-ping cursor-pointer' />
  )
}

export default ScrollToUp