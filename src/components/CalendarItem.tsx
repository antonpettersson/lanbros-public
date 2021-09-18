import React from "react";
import { ICalendarItem } from "../types/calendar";

const CalendarItem = (props: ICalendarItem) => {
  const d = Date;
  const startDate = new d(props.start.dateTime).toLocaleString();
  const endDate = new d(props.end.dateTime).toLocaleString();

  return (
    <div>
      <p>{props.summary}</p>
      <p>{startDate}</p>
      <p>{endDate}</p>
    </div>
  );
};

export default CalendarItem;
