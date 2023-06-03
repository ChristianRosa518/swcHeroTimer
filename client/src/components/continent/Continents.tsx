import React from "react";
import styles from "./Continents.module.css";
import page from "./Page.module.css";

import { useCountdown } from "../countdown";

interface heroArea {
  name: string;
  Baphomet: string;
  miniBosses: string[];
}

interface ContinentsInter {
  url: string;
}

function Continents({ url }: ContinentsInter) {
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
      <PageSelector setPage={setPage} continents={continents} />
      <div className={styles.container}>
        {continents.map((continent, index) => (
          <div key={continent.name}>
            {page === index && <Continent continent={continent} url={url} />}
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
  url: string;
}

function Continent({ continent, url }: continentInter) {
  const [baphTime, setBaphTime] = React.useState<Date>(new Date());
  const [mbTime, setMbTime] = React.useState<Date>(new Date());

  const [daysMB, hoursMB, minutesMB, secondsMB] = useCountdown(
    new Date(2023, 5, 3, 22, 30, 0, 0),
    continent.name
  );
  const [daysBAPH, hoursBAPH, minutesBAPH, secondsBAPH] = useCountdown(
    new Date(2023, 5, 3, 22, 30, 0, 0),
    continent.name
  );
  // months start at 0? why? weird. dumb. Everything else starts at set number. is it cause its array? has to be.

  React.useEffect(() => {
    //fetch baph and mb time
    fetch(url + "/miniboss/getTimes");
    console.log("hi");
  }, []);

  return (
    <>
      <div>{new Date().getMonth()}</div>
      <div>{continent.name}</div>
      <div>
        {continent.Baphomet} : {daysBAPH}, {hoursBAPH}, {minutesBAPH},
        {secondsBAPH}
      </div>
      {continent.miniBosses.map((name) => (
        <div key={name}>
          {name} : {daysMB}, {hoursMB}, {minutesMB}, {secondsMB}
        </div>
      ))}
      {}
    </>
  );
}
export default Continents;
