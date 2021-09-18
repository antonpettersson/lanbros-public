export interface ICalendar {
  items: ICalendarItem[];
}

export interface ICalendarItem {
  start: StartEndData;
  end: StartEndData;
  htmlLink: string;
  summary: string;
}

interface StartEndData {
  dateTime: string;
}
