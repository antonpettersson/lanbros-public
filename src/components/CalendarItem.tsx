import React from "react";
import { ICalendarItem } from "../types/calendar";

const CalendarItem = (props: ICalendarItem) => {
  const d = Date;
  
  const startDate = new d(props.start.dateTime).toLocaleString();
  const month = new d(startDate).getMonth();
  const day = new d(startDate).getDate();

  const startHour = new d(props.start.dateTime).getHours();
  const startMinute = new d(props.start.dateTime).getMinutes();
  const endHour = new d(props.end.dateTime).getHours();
  const endMinute = new d(props.end.dateTime).getMinutes();

  const getFormattedHours = (date: Date) => {
    // TODO: Fix for 0 before single 0
    const hours = date.getHours();
    return hours > 9 ? `${hours}` : `0${hours}`;
  };

  return (
    <div>
      <div>
        <div>{month + 1}/{day}</div>
        <div>{startHour}:{startMinute}-{endHour}:{endMinute}</div>
      </div>
      <div>
        <div>{props.summary}</div>
        <div></div>
      </div>
    </div>
  )

/*   return (
    <div>
      <div>
        <h5 style={{ marginBottom: "0.2em", marginTop: "1em" }}>{props.summary}</h5>
      </div>
      <div></div>
      <div style={{ fontSize: "0.5em" }}>
        <span>{props.description}</span>
        <div>
          <div>
            <span>{month + 1}/{day}</span>
          </div>
          <div>
            <span>{endDate}</span>
          </div>
        </div>
      </div>
    </div>
  ); */
};

export default CalendarItem;
