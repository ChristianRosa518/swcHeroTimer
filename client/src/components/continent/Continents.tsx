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

interface mbTimeInter {
  _id: string;
  continent: string;
  nextYear: number;
  nextMonth: number;
  nextDay: number;
  nextHour: number;
  nextMinute: number;
  serverOffSet: number;
}

function Continents({ server }: ContinentsInter) {
  const [page, setPage] = React.useState<number>(0);
  const [mbTimes, setMbTimes] = React.useState<mbTimeInter[]>([]);
  const [baphoTimes, setBaphoTimes] = React.useState<mbTimeInter[]>([]);

  React.useEffect(() => {
    //fetch miniboss times
    fetch(server + "/miniboss/getTimes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMbTimes(data.data);
      });
  }, []);

  React.useEffect(() => {
    fetch(server + "/baphomet/getTimes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBaphoTimes(data.data);
      });
  }, []);

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
              <Continent
                continent={continent}
                server={server}
                mbTime={mbTimes}
                baphoTimes={baphoTimes}
              />
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
  mbTime: mbTimeInter[];
  baphoTimes: mbTimeInter[];
}

function Continent({ continent, server, mbTime, baphoTimes }: continentInter) {
  const [[daysMB, hoursMB, minutesMB, secondsMB], setCountDownDateMB]: any =
    useCountdown(Date.now(), continent.name, server, "miniBoss");

  const [
    [daysBAPH, hoursBAPH, minutesBAPH, secondsBAPH],
    setCountDownDateBaph,
  ]: any = useCountdown(Date.now(), continent.name, server, "baphomet");

  React.useEffect(() => {
    for (let i = 0; i < mbTime.length; i++) {
      if (mbTime[i].continent === continent.name) {
        const newDate = new Date(
          Date.UTC(
            mbTime[i].nextYear,
            mbTime[i].nextMonth,
            mbTime[i].nextDay,
            mbTime[i].nextHour,
            mbTime[i].nextMinute,
            0,
            0
          )
        );
        console.log(newDate.toUTCString(), "returned mb times");
        setCountDownDateMB(newDate.getTime());
      }
    }
  }, [mbTime]);

  React.useEffect(() => {
    for (let i = 0; i < baphoTimes.length; i++) {
      if (baphoTimes[i].continent === continent.name) {
        const newDateBaph = new Date(
          Date.UTC(
            baphoTimes[i].nextYear,
            baphoTimes[i].nextMonth,
            baphoTimes[i].nextDay,
            baphoTimes[i].nextHour,
            baphoTimes[i].nextMinute,
            0,
            0
          )
        );
        console.log(newDateBaph.toUTCString());
        setCountDownDateBaph(newDateBaph.getTime());

        // console.log(new Date(newDateBaph.getTime() + serverOffset));
      }
    }
  }, [baphoTimes]);

  return (
    <>
      <div>Times only work for US East Taor Server</div>
      <div>
        Developed by Chedic, join our clan KyoshiWarriors for more resources!
      </div>
      <div>{continent.name}</div>
      <div className={styles.nav}>
        <svg height={120} width={300}>
          <path
            fill="#E8D8BD"
            d={
              "M 0 77 V 125 H 96 H 134 C 134 116 144 106 154 106 V 96 C 173 77 173 48 154 29 V 20 C 144 20 134 10 134 0 H 0 V 77"
            }
          ></path>
        </svg>
      </div>
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
