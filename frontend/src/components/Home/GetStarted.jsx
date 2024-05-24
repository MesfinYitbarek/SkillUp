import React from 'react'
import img from "../../assets/background image/pexels-ekaterina-bolovtsova-4050083.jpg";
import { Link } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
const GetStarted = () => {
  return (
    <div>
      <div>
        <div style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "screen",
          width: "100%",
          filter: "brightness(0.5)",
        }}
        className=" bg-gradient-to-r h-[360px]  from-slate-100 to-slate-50  ">

        </div>
        <div className=' text-white font-bold -mb-28 text-center relative -top-60'>
            <h1 className='text-5xl'>Interested? Join us now</h1>
            <Link to={'/sign-in'}>
              <button className=' p-3 px-5 bg-blue-600 text-xl my-7 rounded-xl hover:bg-transparent hover:border-2 hover:border-blue-600 '>Get Started Now <ArrowForward/></button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
