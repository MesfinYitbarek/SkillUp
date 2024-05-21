import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Curriculam = [
  {
    title: "Lesson 1",
    MainPoints:
      "Automate tasks on their computer by writing simple Python programs.",
  },
  {
    title: "Lesson 1",
    MainPoints: "Programmatically generate and update Excel spreadsheets.",
  },
  {
    title: "Lesson 2",
    MainPoints: "Crawl web sites and pull information from online sources.",
  },
  {
    title: "Lesson 3",
    MainPoints:
      "Use Python's debugging tools to quickly figure out bugs in your code.",
  },
  {
    title: "Lesson 4",
    MainPoints: "Write programs that can do text pattern recognition with ",
  },
];

const Lesson = () => {
  return (
    <div className=" text-sky-900">
      <h1 className=" text-2xl font-bold pb-9">Course Curriculum</h1>
      {Curriculam.map((data) => (
        <div>
          <Accordion
            sx={{
              border: "1px solid #F5F5F5",
              marginY: "15px",
            }}
          >
            <AccordionSummary
              sx={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #F5F5F5",
                padding: "6px",
                paddingLeft: "30px",
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>{data.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{data.MainPoints}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default Lesson;
