import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <main>
      <Navbar/>
       {children} 
       
    </main>
  )
}

export default Layout