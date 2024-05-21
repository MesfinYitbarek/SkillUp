import React from "react";
import { useState,useEffect } from "react";
const CourseCatagories = ({onCategoryChange}) => {
  const [catagory, setCatagory] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    console.log(checked)
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
      console.log(selectedCategories)
    } else {
      const newSelectedCategories = selectedCategories.filter((cat) => cat !== value);
      setSelectedCategories(newSelectedCategories);
    }


    onCategoryChange(selectedCategories);
  };

  React.useEffect(() => {
    const fetchCatagory = async () => {
      try {
        const response = await fetch("/api/courses/catagory",{
     
          ...(selectedCategories.length > 0 && {
            params: { categories: selectedCategories.join(",") },
          }),
        });;
        const data = await response.json();
        setCatagory(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCatagory();
  }, [catagory]);

  useEffect(() => {
    onCategoryChange(selectedCategories);
   
  }, [selectedCategories]);

  return (
    <div className=" sm:mt-26  px-16 py-20">
      <div className=" bg-white shadow-md border-t-4 border-blue-600 container mx-auto px-6 p-10 min-w-[250px]">
        <h1 className="  dark:text-white text-2xl text-sky-800 font-semibold sm:mb-6 mb-28 ">
          Catagory
        </h1>
        <div>
          <ul className=" flex flex-col gap-4">
            {catagory.map((data) => (
              <li>
                {" "}
                <input
                 checked={selectedCategories.includes(data.name)} 
                 type="checkbox" 
                 value={data.name}
                 id={data.name}
                 className="mx-2"
                 onChange={(e) => handleCheckboxChange(e)} />
                <label htmlFor="isPaid">{data.labelName}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseCatagories;
