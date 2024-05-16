import React from "react";
import { IoMdSearch } from "react-icons/io";
const Search = () => {
  return (
    
    <div>
      <div className="flex mt-20 ml-20 items-center ">
        <div className="relative group hidden sm:block">
          <input
            type="text"
            placeholder="Search For Courses"
            className="sm:w-[200px]
                             sm:group-hover:w-[300px] transtion-all 
                             duration-300  border-2
                             border-gray-300 px-2 py-3
                             focus:outline-none focus:border-1
                             focus:border-primary
                             dark:border-gray-500
                             dark:bg-gray-800"
          />
        </div>
        <div className=" bg-blue-500 text-white text-2xl  p-3 border-2 border-blue-500">
          <IoMdSearch
            className="
           group-hover:primary
           "
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
