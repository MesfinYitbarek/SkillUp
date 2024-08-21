import React, { useState } from "react";
import ProgressedCourses from "./ProgressedCourses";
import CompletedCourses from "./CompletedCourses";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import Footer from "../../components/Common/Footer";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StudentCourses = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto  px-4">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="course tabs"
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  fontWeight: 600,
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <Tab label="In Progress" {...a11yProps(0)} />
              <Tab label="Completed" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ProgressedCourses />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CompletedCourses />
          </CustomTabPanel>
        </Box>
      </div>
    
    </div>
  );
};

export default StudentCourses;