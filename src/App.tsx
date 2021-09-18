import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Loader from "react-loader-spinner";

enum LoadingStateTypes {
  LOADING = "LOADING",
  NOT_LOADING = "NOT_LOADING",
  ERROR = "ERROR",
}

interface Data {
  data: ICalendar;
}

interface ICalendar {
  items: ICalendarItem[];
}

interface ICalendarItem {
  start: StartEndData;
  end: StartEndData;
  htmlLink: string;
  summary: string;
}

interface StartEndData {
  dateTime: string;
}

function App() {
  const [loadingState, setLoadingState] = useState<LoadingStateTypes>(
    LoadingStateTypes.NOT_LOADING
  );
  const [calendar, setCalendar] = useState<ICalendarItem[] | undefined>();
  const d = Date;
  const now = new Date(d.now());

  useEffect(() => {
    setLoadingState(LoadingStateTypes.LOADING);
    fetch(window.location + ".netlify/functions/calendar", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data: Data) => {
        setCalendar(data.data.items); // TODO: Slice items by three COMING events.
        setLoadingState(LoadingStateTypes.NOT_LOADING);
      })
      .catch((error) => {
        console.error("Could not fetch calendar data:", error);
        setCalendar(undefined);
        setLoadingState(LoadingStateTypes.ERROR);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        {loadingState === LoadingStateTypes.NOT_LOADING &&
          calendar &&
          calendar.map((item) => {
            return (
              item &&
              new Date(item.start.dateTime) > now && (
                <CalendarItem
                  summary={item.summary}
                  start={item.start}
                  end={item.end}
                  htmlLink={item.htmlLink}
                />
              )
            );
          })}
        {loadingState === LoadingStateTypes.LOADING && <Spinner />}
      </header>
    </div>
  );
}

const Spinner = () => {
  return <Loader type="Oval" color="#00BFFF" height={30} />;
};

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

export default App;
