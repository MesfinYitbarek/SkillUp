import React from "react";
import LightMode from "../../assets/light-mode.png";
import Darkmode from "../../assets/dark-mode.png";
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
    <div className="relative">
      <LightModeIcon
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)]
        translation-all duration-300 absolute right-0 z-10 
        ${theme === "dark" ? "opacity-0" : "opacity-100"} `}
      />

      <LightModeIcon
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`w-[50px] cursor-pointer
      drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] 
      translation-all  duration-300 
      ${theme === "light" ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
};

export default DarkMode;
