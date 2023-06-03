import { useState } from "react";
import Continents from "./components/continent/Continents";

const serverURL = import.meta.env.VITE_SERVER_URL;

function App() {
  return (
    <>
      {serverURL}
      <Continents />
    </>
  );
}

export default App;
