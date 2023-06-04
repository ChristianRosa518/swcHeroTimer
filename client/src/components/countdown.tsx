import { useEffect, useState } from "react";

const useCountdown = (targetDate: Date, continent: string, url: string) => {
  const [countDownDate, setCountDownDate] = useState<number>(
    targetDate.getTime()
  );

  // const countDownDate = targetDate.getTime();
  // promise<number>, number, bigint. just gonna use any here.
  const [newDate, setNewDate] = useState();
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval2 = setInterval(() => {
      const [days, hours, minutes, seconds] = getReturnValues(countDownDate);
      console.log(days + hours + minutes + seconds + "current Time");
      if (days + hours + minutes + seconds <= 0) {
        updateMBTime();
      }
    }, 4000);
    return () => clearInterval(interval2);
  }, []);

  const updateMBTime = async () => {
    const data: any = await fetch(url + "/miniboss/updateMiniBoss", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: continent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newDate = new Date(
          data.years,
          data.months,
          data.days,
          data.hours,
          data.minutes,
          data.seconds
        );
        console.log(newDate);
        // setCountDownDate(newDate.getTime());
      });
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
