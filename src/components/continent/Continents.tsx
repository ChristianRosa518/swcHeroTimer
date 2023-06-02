import React from "react";
import styles from "./Continents.module.css";
import page from "./Page.module.css";

function Continents() {
  const [page, setPage] = React.useState<number>(0);

  const continents: string[] = [
    "Rudelin",
    "Tesca",
    "Ayah",
    "Flurence",
    "Rukurangma",
  ];

  return (
    <div>
      {page}
      <PageSelector setPage={setPage} continents={continents} />
      <div className={styles.container}>
        {continents.map((continent, index) => (
          <>{page === index && <Continent continent={continent} />}</>
        ))}
      </div>
    </div>
  );
}

interface pageSelectorInter {
  setPage: React.Dispatch<number>;
  continents: string[];
}

function PageSelector({ setPage, continents }: pageSelectorInter) {
  return (
    <>
      <div className={page.container}>
        {continents.map((continent, index) => (
          <div
            className={page.selector}
            key={continent}
            onClick={() => setPage(index)}
          >
            {continent}
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
}

interface continentInter {
  continent: string;
}

function Continent({ continent }: continentInter) {
  return <>{continent}</>;
}
export default Continents;
