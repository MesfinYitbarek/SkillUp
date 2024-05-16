import React from "react";

const CourseCatagories = () => {
  const [catagory, setCatagory] = React.useState([]);

  React.useEffect(() => {
    const fetchCatagory = async () => {
      try {
        const response = await fetch("/api/courses/catagory");
        const data = await response.json();
        setCatagory(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCatagory();
  }, []);
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
                <input type="checkbox" id={data.name} className="mx-2" />
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
