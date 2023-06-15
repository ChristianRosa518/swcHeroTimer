import React from "react";
import styles from "./Continents.module.css";
import page from "./Page.module.css";

// IMAGES
import rudelin from "../images/Rudelin.JPG";
import rudelinWIDE from "../images/RudelinWIDE.JPG";

import tesca from "../images/Tesca.JPG";
import tescaWIDE from "../images/TescaWIDE.JPG";

import ayah from "../images/Ayah.JPG";
import ayahWIDE from "../images/AyahWIDE.JPG";

import flurence from "../images/Fluerence.JPG";
import flurenceWIDE from "../images/FluerenceWIDE.JPG";

import rukurangma from "../images/Rukurangma.JPG";
import rukurangmaWIDE from "../images/RukurangmaWIDE.JPG";

import DeathHunterLich from "../images/BOSSES/Rudelin/DeathHunterLich.png";
import NightMareRuinGuardian from "../images/BOSSES/Rudelin/NightmareRuinsGuardian.png";
import FickleUkah from "../images/BOSSES/Rudelin/FickleUkah.png";
import HissyJakah from "../images/BOSSES/Rudelin/HissyJakah.png";
import RudelinBapho from "../images/BOSSES/Rudelin/RudelinBapho.png";

// IMAGES END

import { useCountdown } from "../countdown";

interface heroArea {
  name: string;
  zone: string;
  Baphomet: string;
  miniBosses: string[];
  image: string;
  imageWide: string;
  baphoImage?: string;
  minibossesIMG: string[];
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
      zone: "Ela Hill",
      Baphomet: "Conqueror of Abyss Baphomet",
      miniBosses: [
        "Death Hunter Lich",
        "Nightmare Ruins Guardian",
        "Fickle Ukah",
        "Hissy Jakah",
      ],
      image: rudelin,
      imageWide: rudelinWIDE,
      baphoImage: RudelinBapho,
      minibossesIMG: [
        DeathHunterLich,
        NightMareRuinGuardian,
        FickleUkah,
        HissyJakah,
      ],
    },
    {
      name: "Tesca",
      zone: "Sakal Desert",
      Baphomet: "Conqueror of Flame Baphomet",
      miniBosses: [
        "Dark Panolpy Giant Sandworm",
        "Pitchblack Scale Serpent",
        "Illusion Minion",
      ],
      image: tesca,
      imageWide: tescaWIDE,
      baphoImage: "",
      minibossesIMG: [],
    },
    {
      name: "Ayah",
      zone: "Glowing Forest",
      Baphomet: "Conqueror of Storm Baphomet",
      miniBosses: [
        "Brilliant Glory Trian",
        "Light Wing Griffon",
        "Crying Fiend Warbear",
      ],
      image: ayah,
      imageWide: ayahWIDE,
      baphoImage: "",
      minibossesIMG: [],
    },
    {
      name: "Flurence",
      zone: "Blue Crystal Plateau",
      Baphomet: "Conqueror of Cold Baphomet",
      miniBosses: [
        "Golden Mane Werewolf",
        "Golden Crystal Grooming",
        "Snow Mountain Master Yeti",
      ],
      image: flurence,
      imageWide: flurenceWIDE,
      baphoImage: "",
      minibossesIMG: [],
    },
    {
      name: "Rukurangma",
      zone: "Ranite Canyon",
      Baphomet: "Conqueror of Radiance Baphomet",
      miniBosses: [
        "Burning Crimson Shadow Walker",
        "Red Heart Giant Rock Golem",
        "Mighty Golden Horn Dupa",
      ],
      image: rukurangma,
      imageWide: rukurangmaWIDE,
      baphoImage: "",
      minibossesIMG: [],
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
            <clipPath id={"icon"} clipPathUnits={"objectBoundingBox"}>
              <path d="M0.505,0 C0.465,0.038,0.384,0.077,0.303,0.077 C0.263,0.077,0.222,0.115,0.222,0.154 C0.141,0.154,0.061,0.269,0.081,0.346 C-0.02,0.423,-0.02,0.577,0.081,0.654 C0.061,0.731,0.141,0.846,0.222,0.846 C0.222,0.885,0.263,0.923,0.303,0.923 C0.384,0.923,0.465,0.962,0.505,1 C0.545,0.962,0.667,0.923,0.667,0.923 C0.747,0.923,0.788,0.885,0.788,0.846 C0.869,0.846,0.949,0.731,0.929,0.654 C1,0.577,1,0.423,0.929,0.346 C0.949,0.269,0.869,0.154,0.788,0.154 C0.788,0.115,0.747,0.077,0.707,0.077 C0.626,0.077,0.545,0.038,0.505,0" />
            </clipPath>
            <clipPath id={"star"} clipPathUnits={"objectBoundingBox"}>
              <path d="M0,0.5 C0.2,0.5,0.5,0.3,0.5,0 C0.5,0.3,0.8,0.5,1,0.5 C0.8,0.5,0.5,0.8,0.5,1 C0.5,0.8,0.2,0.5,0,0.5" />
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
              className={`${
                index === pager ? `${page.starCon}` : `${page.starConInvis}`
              }`}
            >
              <div className={page.starBorder}>
                <div className={page.star}></div>
                <div className={page.starShadow}></div>
              </div>
            </div>
            <div
              className={`${index === pager ? `${page.activeGlow}` : ``}`}
            ></div>

            <div
              className={`${page.navBorder} ${
                index === pager ? `${page.navBorderActive}` : ``
              }`}
            >
              <div className={page.navSecondBorder}></div>
              <div
                className={`${page.nav} ${
                  index === pager ? `${page.navActive}` : ``
                }`}
              >
                <div className={page.backgroundLogo}>
                  <div className={page.fade}></div>
                  <img src={continent.imageWide}></img>
                </div>
                <div className={page.logoCon}>
                  <div className={page.logo}>
                    <img src={continent.image}></img>
                  </div>
                </div>
                <div className={page.title}>
                  <p>{continent.name}</p>
                  <p>{continent.zone}</p>
                </div>
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
          <>
            <div className={styles.bossIcon}>
              <img src={continent.baphoImage} alt="" />
            </div>
            {continent.Baphomet} : {daysBAPH === 0 ? `` : `${daysBAPH}d,`}
            {hoursBAPH === 0 ? `` : `${hoursBAPH}h, `}
            {minutesBAPH === 0 ? `` : `${minutesBAPH}m, `}
            {secondsBAPH === 0 ? `` : `${secondsBAPH}s`}
          </>
        )}
      </div>
      {continent.miniBosses.map((name, index) => (
        <div className={styles.bossBox} key={name}>
          {daysMB + hoursMB + minutesMB + secondsMB < 0 ? (
            <>{name} : Loading...</>
          ) : (
            <>
              <div className={styles.bossIcon}>
                <img src={continent.minibossesIMG[index]} alt="" />
              </div>
              {name} : {daysMB === 0 ? `` : `${daysMB}d,`}
              {hoursMB === 0 ? `` : `${hoursMB}h, `}
              {minutesMB === 0 ? `` : `${minutesMB}m, `}
              {secondsMB === 0 ? `` : `${secondsMB}s`}
            </>
          )}
        </div>
      ))}
      {}
    </>
  );
}
export default Continents;
