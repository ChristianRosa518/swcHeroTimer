import { useEffect, useState } from "react";

const useCountdown = (
  targetDate: number,
  continent: string,
  url: string,
  MonType: string
) => {
  const [countDownDate, setCountDownDate] = useState<number>(targetDate);
  const localoffset = new Date().getTimezoneOffset() * 60 * 1000;
  const [countDown, setCountDown] = useState(
    countDownDate - (new Date().getTime() + localoffset)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate + localoffset - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  useEffect(() => {
    // updateMBTime();
    if (countDownDate + localoffset - Date.now() < 0) {
      console.log("Running Function");
      updateMBTime();
    }
  }, [countDown]);

  const updateMBTime = () => {
    fetch(url + "/" + MonType + "/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: continent,
        offset: localoffset,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(`Updating ${MonType} Times`);
        const newDate = new Date(
          Date.UTC(
            data.years,
            data.months,
            data.days,
            data.hours,
            data.minutes,
            data.seconds
          )
        );
        setCountDownDate(newDate.getTime());
      })
      .catch((err) => {
        console.log(err);
      });
    // this is here so i can build, I don't need to have this variable but typescript yknow or maybe I made an error.
  };

  const getReturnValues = (countDown: number) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  };

  return [getReturnValues(countDown), setCountDownDate];
};

export { useCountdown };
