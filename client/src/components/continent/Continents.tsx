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
  server: string;
}

function Continents({ server }: ContinentsInter) {
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
      Baphomet: "Conqueror of Storm Baphomet",
      miniBosses: [
        "Brilliant Glory Trian",
        "Light Wing Griffon",
        "Crying Fiend Warbear",
      ],
    },
    {
      name: "Flurence",
      Baphomet: "Conqueror of Cold Baphomet",
      miniBosses: [
        "Golden Mane Werewolf",
        "Golden Crystal Grooming",
        "Snow Mountain Master Yeti",
      ],
    },
    {
      name: "Rukurangma",
      Baphomet: "Conqueror of Radiance Baphomet",
      miniBosses: [
        "Burning Crimson Shadow Walker",
        "Red Heart Giant Rock Golem",
        "Mighty Golden Horn Dupa",
      ],
    },
  ];

  return (
    <div>
      <PageSelector setPage={setPage} continents={continents} />
      <div className={styles.container}>
        {continents.map((continent, index) => (
          <div key={continent.name}>
            {page === index && (
              <Continent continent={continent} server={server} />
            )}
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
  server: string;
}

function Continent({ continent, server }: continentInter) {
  const [[daysMB, hoursMB, minutesMB, secondsMB], setCountDownDateMB]: any =
    useCountdown(new Date(), continent.name, server, "miniBoss");
  const [
    [daysBAPH, hoursBAPH, minutesBAPH, secondsBAPH],
    setCountDownDateBaph,
  ]: any = useCountdown(new Date(), continent.name, server, "baphomet");

  React.useEffect(() => {
    //fetch baph and mb time
    fetch(server + "/miniboss/getTimes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].continent === continent.name) {
            const newDate = new Date(
              data[i].nextYear,
              data[i].nextMonth,
              data[i].nextDay,
              data[i].nextHour,
              data[i].nextMinute,
              0,
              0
            );
            setCountDownDateMB(newDate.getTime());
            setCountDownDateBaph(new Date().getTime());
          }
        }
      });
  }, []);

  // code as example to set new date.
  // const newDate = new Date(2023, 5, 3, 22, 30, 0, 0);
  // const newerDate = newDate.setHours(newDate.getHours() + 13);
  // const newerdater = newDate.setMinutes(newDate.getMinutes() + 20);

  return (
    <>
      <div>Times only work for US East Taor Server</div>
      <div>
        Developed by Chedic, join our clan KyoshiWarriors for more resources!
      </div>
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
