import Continents from "./components/continent/Continents";

const serverURL = import.meta.env.VITE_SERVER_URL as string;
// const serverURL = "http://localhost:3001" as string;

function App() {
  return (
    <>
      {serverURL}
      <Continents server={serverURL} />
    </>
  );
}

export default App;
