import { useState } from "react";
import Continents from "./components/continent/Continents";

// const serverURL = import.meta.env.VITE_SERVER_URL as string;
const serverURL = "http://localhost:3001" as string;

function App() {
  return (
    <>
      <Continents url={serverURL} />
    </>
  );
}

export default App;
