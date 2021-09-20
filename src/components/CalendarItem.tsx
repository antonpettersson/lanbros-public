import React from "react";
import { ICalendarItem } from "../types/calendar";

const CalendarItem = (props: ICalendarItem) => {
  const d = Date;

  const today = new Date().getDate();
  const todayMonth = new Date().getMonth() + 1;

  const startDate = new d(props.start.dateTime).toLocaleString();
  const month = new d(startDate).getMonth();
  const day = new d(startDate).getDate();

  const startHour = new d(props.start.dateTime).getHours();
  const startMinute = new d(props.start.dateTime).getMinutes();
  const endHour = new d(props.end.dateTime).getHours();
  const endMinute = new d(props.end.dateTime).getMinutes();

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
          {month + 1}/{day}
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
