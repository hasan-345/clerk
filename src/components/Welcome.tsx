"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'


const Welcome = () => {

    const {user, isLoaded} = useUser()
  return (
    <div className='max-w-[1400px] mx-auto lg:px-5 px-4 pt-[70px] text-white space-y-2'>
        <h2 className='lg:text-5xl text-white md:text-4xl text-3xl lg:font-semibold font-medium'>
            Welcome back{isLoaded? ", ": " "}{user?.firstName} 👋 
        </h2>
        <p className='text-sm lg:text-base text-[#b0c8d2] pl-2'>This is your Financial Overview Report</p>
    </div>
  )
}

export default Welcome