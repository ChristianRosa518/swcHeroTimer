import Continents from "./components/continent/Continents";

const serverURL = import.meta.env.VITE_SERVER_URL as string;

function App() {
  return (
    <>
      <Continents server={serverURL} />
    </>
  );
}

export default App;
