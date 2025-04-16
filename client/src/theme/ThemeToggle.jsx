import { UseTheme } from "./ThemeContext";
import sun from "../assets/images/sun.png";
import moon from "../assets/images/half moon.png"


export const ThemeToggle = () => {
  const { theme, setTheme } = UseTheme();

  return (
    <button className="switchImg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      // className="w-xs px-1 py-1 text-xs font-small text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      {/* {theme === "dark" ? "LightMode" : "DarkMode"} */}
      <img src={theme === "dark"?moon:sun}/>
    </button>
  );
};