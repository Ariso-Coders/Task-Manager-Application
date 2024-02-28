
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (

    <div className='min-h-screen w-full flex justify-center overflow-x-hidden '>
      <div className=' fixed left-0 top-0 h-screen w-1/5 bg-red-500'> left</div>
      <div className=' absolute right-0 top-0 min-h-full w-4/5  flex flex-col justify-start'>

        <div>navbar</div>
        <div>{children}</div>

      </div>

    </div>

  )
}

export default Layout;