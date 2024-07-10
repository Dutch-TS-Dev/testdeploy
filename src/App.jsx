import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Play from "./Play";

function App() {
  const [count, setCount] = useState(0);

  return <Play />;
}

export default App;
