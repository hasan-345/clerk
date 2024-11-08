import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import React from 'react'
import Navigation from './Navigation'
import { Loader2 } from 'lucide-react'
import Welcome from './Welcome'

const Navbar = () => {
  return (
   <> 
    <div className='bg-gradient_orange w-full min-h-[400px]'>
        <div className='max-w-[1400px] mx-auto h-24 flex items-center justify-between gap-x-4 lg:px-5 px-2 '>
             
          <div className='flex justify-between items-center gap-x-16 w-full'> 
             <div className='justify-center items-end flex gap-2'>
                <img src="/logo.svg" alt="logo" className='lg:h-11 lg:w-11 h-9 w-9' />
                <h2 className='font-bold lg:text-4xl text-3xl text-slate-100'>Finance</h2>
             </div>
             
             <Navigation/>
          </div> 

          <div className=' size-8'> 
         <ClerkLoaded> <UserButton afterSignOutUrl='/' /></ClerkLoaded>
         <ClerkLoading> <Loader2 className='animate-spin text-white size-8' /> </ClerkLoading>
         </div>
        </div>
         <Welcome/>
    </div>



  </>
  )
}

export default Navbar