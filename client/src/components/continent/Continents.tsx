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
    <div className={styles.container}>
      <div className={styles.pageSelectorContainer}>
        <PageSelector setPage={setPage} continents={continents} pager={page} />
        <div className={styles.timerContainer}>
          {continents.map((continent, index) => (
            <div className={styles.bossTimerContainer} key={continent.name}>
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
    </div>
  );
}

interface pageSelectorInter {
  setPage: React.Dispatch<number>;
  continents: heroArea[];
  pager: number;
}

function PageSelector({ setPage, continents, pager }: pageSelectorInter) {
  return (
    <>
      <div className={page.container}>
        <svg height={0} width={0}>
          <defs>
            <clipPath id={"myClip"} clipPathUnits={"objectBoundingBox"}>
              <path d="M0,0 H0.877 C0.877,0.036,0.898,0.107,0.92,0.107 V0.143 C1,0.321,1,0.679,0.92,0.857 V0.893 C0.898,0.893,0.877,0.929,0.877,1 H0M0,0 H0.877 C0.877,0.036,0.898,0.071,0.92,0.071 V0.179 C1,0.393,1,0.607,0.92,0.821 V0.929 C0.898,0.929,0.877,0.964,0.877,1 H0" />
            </clipPath>
          </defs>
        </svg>
        {continents.map((continent, index) => (
          <div
            className={page.navContainer}
            key={continent.name}
            onClick={() => setPage(index)}
          >
            <div
              className={`${page.navBorder} ${
                index === pager ? `${page.navBorderActive}` : ``
              }`}
            >
              <div
                className={`${page.nav} ${
                  index === pager ? `${page.navActive}` : ``
                }`}
              >
                {continent.name}
                {index + 1}
              </div>
            </div>
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
      <div className={styles.bossBox}>
        {daysBAPH + hoursBAPH + minutesBAPH + secondsBAPH < 0 ? (
          <div>{continent.Baphomet} : Loading...</div>
        ) : (
          <div>
            {continent.Baphomet} : {daysBAPH}, {hoursBAPH}, {minutesBAPH},
            {secondsBAPH}
          </div>
        )}
      </div>
      {continent.miniBosses.map((name) => (
        <div className={styles.bossBox} key={name}>
          {daysMB + hoursMB + minutesMB + secondsMB < 0 ? (
            <div>{name} : Loading...</div>
          ) : (
            <div>
              {name} : {daysMB}, {hoursMB}, {minutesMB}, {secondsMB}
            </div>
          )}
        </div>
      ))}
      {}
    </>
  );
}
export default Continents;
