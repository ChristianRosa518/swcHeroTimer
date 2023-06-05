import { useEffect, useState } from "react";

const useCountdown = (
  targetDate: Date,
  continent: string,
  url: string,
  MonType: string
) => {
  const [countDownDate, setCountDownDate] = useState<number>(
    targetDate.getTime()
  );

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  useEffect(() => {
    const [days, hours, minutes, seconds] = getReturnValues(countDown);
    if (days + hours + minutes + seconds < -10) {
      console.log("Running Function");
      updateMBTime();
    }
  }, [countDown]);

  const updateMBTime = async () => {
    await fetch(url + "/" + MonType + "/updateMiniBoss", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: continent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Updating ${MonType} Times`);
        const newDate = new Date(
          data.years,
          data.months,
          data.days,
          data.hours,
          data.minutes,
          data.seconds
        );
        setCountDownDate(newDate.getTime());
      })
      .catch((err) => {
        console.log(err);
      });
    // this is here so i can build, I don't need to have this variable but typescript yknow or maybe I made an error.
  };

  const getReturnValues = (countDown: number) => {
    // console.log(countDown / (1000 * 60 * 60 * 24));
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
