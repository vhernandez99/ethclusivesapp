import React, { Fragment } from "react";
import("./Clock.css")

const Clock = ({ timerDays, timerHours, timerMinutes, timerSeconds }) => {
  return (
    <div>
      <section>
        <section className="TimerContainer">
          <div >
            <section>
              <p className="font ">{timerDays} : {timerHours} : {timerMinutes} : {timerSeconds}</p>
            </section>
          </div>
        </section>
      </section>
    </div>
  );
};

Clock.defaultProps = {
  timerDays: 10,
  timerHours: 10,
  timerMinutes: 10,
  timerSeconds: 10,
};

export default Clock;