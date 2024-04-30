import React from 'react'
import DarkMode from './DarkMode'

const Header = () => {
  return (
    <div className=' flex justify-end dark:bg-black text-white'>
      <DarkMode/>
    </div>
  )
}

export default Header
