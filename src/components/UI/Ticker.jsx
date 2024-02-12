import React, { useState, useEffect } from "react";
import moment from "moment";

const CountdownTimer = ({ targetDateTime }) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const duration = moment.duration(moment(targetDateTime).diff(now));

      if (duration.asMilliseconds() <= 0) {
        clearInterval(intervalId);
      } else {
        setRemainingTime({
          days: duration.days(),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDateTime]);

  return (
    <>
      <div>
        <span className="days">{remainingTime.days}</span>
        <div className="smalltext">D</div>
      </div>
      <div>
        <span className="hours">{remainingTime.hours}</span>
        <div className="smalltext">H</div>
      </div>
      <div>
        <span className="minutes">{remainingTime.minutes}</span>
        <div className="smalltext">M</div>
      </div>
      <div>
        <span className="seconds">{remainingTime.seconds}</span>
        <div className="smalltext">S</div>
      </div>
    </>
  );
};

export { CountdownTimer };
