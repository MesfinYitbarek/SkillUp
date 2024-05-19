import React from "react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
const Search = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    
    <div>
      <div className="flex mt-20 ml-20 items-center ">
      <form onSubmit={handleSubmit} action="" className="flex">
        <div className="relative group hidden sm:block">
          
          <input
            type="text"
            value={searchTerm} 
            onChange={handleChange}
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
        <button type="submit" className=" bg-blue-500 text-white text-2xl  p-3 border-2 border-blue-500">
          <IoMdSearch
            className="
           group-hover:primary
           "
          />
        </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
