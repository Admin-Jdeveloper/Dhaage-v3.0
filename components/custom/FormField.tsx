import React from 'react'
import { FormField,FormControl ,FormDescription ,FormItem ,  FormMessage ,FormLabel} from '../ui/form'
import { Input } from '../ui/input'

export const CustomFormField = ({label,formcontrol,desc}:any) => {
  return (
    <FormField
    control={formcontrol}
    name={label}
    render={({ field }) => (
      <FormItem className='flex flex-col items-center'>
        <FormLabel  >{label}</FormLabel>
        <FormControl>
          <Input className='w-2/3 border border-gray-700 ' placeholder="" {...field} />
        </FormControl>
        <FormDescription>
          {desc}
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default FormField