import { useEffect, useState } from "react";

const useCountdown = (targetDate: Date, continent: string, url: string) => {
  let countDownDate: any = targetDate.getTime();
  // promise<number>, number, bigint. just gonna use any here.
  const [newDate, setNewDate] = useState();
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    if (countDownDate - new Date().getTime() <= 0) {
      //update times with db call
      countDownDate = updateMBTime(continent, url);
    }

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const updateMBTime = async (name: string, url: string) => {
  const data: any = await fetch(url + "/miniboss/updateMiniBoss", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
    }),
  }).then((res) => res.json);

  console.log(data);
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

export { useCountdown };
