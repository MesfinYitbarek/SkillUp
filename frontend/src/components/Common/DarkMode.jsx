import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const DarkMode = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;

  React.useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="relative flex items-center">
      {theme === "light" ? (
        <LightModeIcon
          onClick={() => setTheme("dark")}
          className="w-6 h-6 cursor-pointer text-yellow-500 hover:text-yellow-600 transition-all duration-300"
        />
      ) : (
        <DarkModeIcon
          onClick={() => setTheme("light")}
          className="w-6 h-6 cursor-pointer text-gray-300 hover:text-gray-100 transition-all duration-300"
        />
      )}
    </div>
  );
};

export default DarkMode;