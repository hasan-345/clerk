"use client";
import { usePathname } from 'next/navigation';
import React from 'react'
import NavButton from './NavButton';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Menu } from 'lucide-react';
  

const Navigation = () => {

    const pathName = usePathname()

    const navItems = [
        {
            href: "/dashboard",
            label: "Overview"
        },
        {
            href: "/transactions",
            label: "Transactions"
        },
        {
            href: "/accounts",
            label: "Accounts"
        },
        {
            href: "/categories",
            label: "Categories"
        },
        {
            href: "/settings",
            label: "Settings"
        }
    ]


  return (
    <div className='flex items-center gap-x-4 text-slate-100 justify-center'>
        {navItems.map((nav)=>(
            <>
            <NavButton
            key={nav.href}
            href={nav.href}
            label={nav.label}
            isActive={pathName === nav.href}
            />
            </>
        ))}

          <div className='flex lg:hidden'>
                <Sheet>
                    <SheetTrigger className='font-normal py-1 px-2 rounded-md bg-white/10 hover:bg-white/20  border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition'>
                        
                    <Menu className='size-6'/>
                          </SheetTrigger>
                    <SheetContent className='pt-9' side={"left"}>
                        {navItems.map((nav)=>(
                           <Button 
                            key={nav.href}
                           variant={pathName === nav.href? "secondary": "ghost"}
                           className={"w-full my-1 justify-start"}
                           >
                               <Link href={nav.href} className='my-3'>
                                  {nav.label}
                               </Link>
                       </Button>
                        ))}
                    
                    </SheetContent>
                </Sheet>
            </div>  
               
    </div>
  )
}

export default Navigation