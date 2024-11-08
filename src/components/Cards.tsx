import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

const Cards = () => {
  return (
    <div className='w-full max-w-[1370px] mx-auto grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 -mt-24'>
        <Card className='col-span-1 m-2 border shadow-xl'>
            <CardHeader>
                <CardTitle>Remaining</CardTitle>
                <CardDescription>Aug 12, 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

        <Card  className='col-span-1 m-2 border shadow-xl'>
            <CardHeader>
                <CardTitle>Income</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

        <Card  className='lg:col-span-1 md:col-span-3 col-span-1 m-2 border shadow-xl'>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    </div>
  )
}

export default Cards