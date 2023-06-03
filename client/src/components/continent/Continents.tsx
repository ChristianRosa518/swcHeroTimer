import React from "react";
import styles from "./Continents.module.css";
import page from "./Page.module.css";

import { useCountdown } from "../countdown";

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
      Baphomet: "Conqueror of Flame Baphomet",
      miniBosses: [
        "Dark Panolpy Giant Sandworm",
        "Pitchblack Scale Serpent",
        "Illusion Minion",
      ],
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
          <div key={continent.name}>
            {page === index && <Continent continent={continent} />}
          </div>
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
  const [days, hours, minutes, seconds] = useCountdown(
    new Date(2023, 5, 3, 22, 30, 0, 0)
  );
  // 10:30 pm in 13h 17m
  const timeZoneMinutesOffSet = new Date().getTimezoneOffset();

  return (
    <>
      <div>{new Date().getMonth()}</div>
      <div>{continent.name}</div>
      <div>
        {continent.Baphomet} : {days}, {hours}, {minutes}, {seconds}
      </div>
      {continent.miniBosses.map((name) => (
        <div key={name}>{name}</div>
      ))}
      {}
    </>
  );
}
export default Continents;
