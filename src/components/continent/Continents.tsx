import React from "react";
import styles from "./Continents.module.css";
import page from "./Page.module.css";

interface heroArea {
  name: string;
  Baphomet: string;
  miniBosses: string[];
}

function Continents() {
  const [page, setPage] = React.useState<number>(0);

  const continents: heroArea[] = [
    {
      name: "Rudelin",
      Baphomet: "Conqueror of Abyss Baphomet",
      miniBosses: [
        "Death Hunter Lich",
        "Nightmare Ruins Guardian",
        "Fickle Ukah",
        "Hissy Jakah",
      ],
    },
    {
      name: "Tesca",
      Baphomet: "hi",
      miniBosses: [""],
    },
    {
      name: "Ayah",
      Baphomet: "hi",
      miniBosses: [""],
    },
    {
      name: "Flurence",
      Baphomet: "hi",
      miniBosses: [""],
    },
    {
      name: "Rukurangma",
      Baphomet: "hi",
      miniBosses: [""],
    },
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
  continents: heroArea[];
}

function PageSelector({ setPage, continents }: pageSelectorInter) {
  return (
    <>
      <div className={page.container}>
        {continents.map((continent, index) => (
          <div
            className={page.selector}
            key={continent.name}
            onClick={() => setPage(index)}
          >
            {continent.name}

            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
}

interface continentInter {
  continent: heroArea;
}

function Continent({ continent }: continentInter) {
  return (
    <>
      <div>{continent.name}</div>
      <div>{continent.Baphomet}</div>
      {continent.miniBosses.map((name) => (
        <div>{name}</div>
      ))}
      {}
    </>
  );
}
export default Continents;
