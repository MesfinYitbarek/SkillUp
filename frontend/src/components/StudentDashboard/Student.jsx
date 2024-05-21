import React, {useState} from 'react'
import ProgressedCourses from './ProgressedCourses'
import CompletedCourses from './CompletedCourses'

const contentData = {
  content1: <ProgressedCourses/>,
  content2: <CompletedCourses/>,
 
};

const StudentCourses = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  return (
    <div className=' mt-4 '>
      
      <div className="flex pl-16 text-lg text-sky-950 font-semibold ">
        <button
          onClick={() => handleClick(1)}
          className=" px-10 py-1 bg-white rounded-lg  focus:bg-blue-500 focus:text-white"
        >
          In Progress
        </button>
        <button
          onClick={() => handleClick(2)}
          className="  px-10 py-1 bg-white rounded-lg  focus:bg-blue-500 focus:text-white"
        >
          Completed
        </button>
       
      </div>
      <div className="my-8 mb-40 px-20">
        {activeButton && (
          <h1 variant="body1">{contentData[`content${activeButton}`]}</h1>
        )}
      </div>
    </div>
  )
}

export default StudentCourses
