import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from '@mui/icons-material/Check';

const courseDescription = [
  {
    description: `If you're an office worker, student, administrator, or just want to become more productive with your computer,
     programming will allow you write code that can automate tedious tasks. 
      This course follows the popular (and free!) book, Automate the Boring Stuff with Python.
      Automate the Boring Stuff with Python was written for people who want to get up to speed writing small programs that do 
      practical tasks as soon as possible. You don't need to know sorting algorithms or object-oriented programming, so this 
      course skips all the computer science and concentrates on writing code that gets stuff done.`,
  },
];

const courseMainPoints = [
  {
    MainPoints:
      "Automate tasks on their computer by writing simple Python programs.",
  },
  {
    MainPoints: "Programmatically generate and update Excel spreadsheets.",
  },
  {
    MainPoints: "Crawl web sites and pull information from online sources.",
  },
  {
    MainPoints:
      "Use Python's debugging tools to quickly figure out bugs in your code.",
  },
  {
    MainPoints: "Write programs that can do text pattern recognition with ",
  },
];

const requirements = [
  {
    requirement: "No programming experience is required.",
  },
  {
    requirement:
      "Downloading and installing Python is covered at the start of the course.",
  },
  {
    requirement:
      "Basic computer skills: surfing websites, running programs, saving and opening documents, etc.",
  },
];

const CourseInfo = () => {
  return (
    <div className=" flex flex-col gap-7">
      <div className="p-6  border border-slate-300 ">
        <h1 className=" text-2xl font-bold py-4">What you'll learn</h1>
        <div className="sm:grid sm:grid-cols-2 ">
          {courseMainPoints.map((data) => (
            <p >
              <CheckCircleOutlineIcon className="text-blue-600 mr-2" />{" "}
              {data.MainPoints}
            </p>
          ))}
        </div>
      </div>
      <div>
      <h1 className=" py-5  font-bold text-2xl">Requirements</h1>
        {requirements.map((data) => (
          <p className=" text-justify"><CheckIcon className=" mr-3"/> {data.requirement}</p>
        ))}
      </div>
      <div>
        <h1 className=" py-5  font-bold text-2xl">Description</h1>
        {courseDescription.map((data) => (
          <p className=" text-justify">{data.description}</p>
        ))}
      </div>
     
    </div>
  );
};

export default CourseInfo;
