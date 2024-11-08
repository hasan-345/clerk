import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import React from 'react'

const Signup = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 px-2'>
    
      <div className='relative h-full w-full justify-center items-center lg:flex hidden'>
          <img src="/bg.gif" alt="gif" /> 

          <div className='flex justify-center items-end gap-2 absolute left-3 top-4 my-3'>
            <img src="/logo.svg" alt="logo" className='' />
            <h2 className='font-bold text-4xl text-slate-800'>Finance</h2> 
          </div>

      </div> 

      <div className='flex justify-center items-center p-3'>
      <ClerkLoaded>
      <SignUp path='/sign-up' afterSignUpUrl="/dashboard" afterSignOutUrl={"/"} />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className='animate-spin text-muted-foreground text-2xl' />
      </ClerkLoading>  
      </div>  
    
    </div>
  )

}

export default Signup