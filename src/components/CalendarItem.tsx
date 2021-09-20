import React from "react";
import { ICalendarItem } from "../types/calendar";

const CalendarItem = (props: ICalendarItem) => {
  const d = Date;

  const startDate = new d(props.start.dateTime);
  const month = startDate.getMonth();
  const day = startDate.getDate();
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();

  const endDate = new d(props.end.dateTime);
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();

  const padLeadingZero = (num: number) => {
    if (num > 9) {
      return `${num}`;
    }
    return `0${num}`;
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: "0.5em", backgroundColor: "#f59219" }}>
        <div style={{ fontSize: "0.7em", fontWeight: 500 }}>
          {day}/{month + 1}
        </div>
        <div style={{ fontSize: "0.35em", fontWeight: 500 }}>
          {startHour}:{padLeadingZero(startMinute)}-{endHour}:
          {padLeadingZero(endMinute)}
        </div>
      </div>
      <div style={{ padding: "0.5em", minWidth: '13em' }}>
        <div style={{ fontSize: "0.7em", fontWeight: 500 }}>
          {props.summary}
        </div>
        <div style={{ fontSize: "0.4em" }}>{props.description}</div>
      </div>
    </div>
  );
};

export default CalendarItem;
