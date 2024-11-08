import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Plus, Upload } from 'lucide-react'

const Transactions = () => {

  return (

   <div className='max-w-[1400px] mx-auto -mt-24'> 
    <Card className='col-span-1 m-2 border shadow-xl p-3'>
       <div className='flex justify-between w-full'>
          <h2 className='text-2xl font-semibold'>Transactions History</h2>
          <div className='flex gap-x-3'> <Button> <Plus className='w-5 h-5 mr-2'/> <p className='text-base'> Add new</p></Button> 
          <Button> <Upload className='w-5 h-5 mr-2'/> <p className='text-base'> Import</p></Button>
          </div>
       </div>
   </Card>
   </div>
  )
}

export default Transactions