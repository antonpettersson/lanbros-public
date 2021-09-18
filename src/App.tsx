import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";

import Loader from "react-loader-spinner";
import { ICalendar, ICalendarItem } from "./types/calendar";
import CalendarItem from "./components/CalendarItem";

enum LoadingStateTypes {
  LOADING = "LOADING",
  NOT_LOADING = "NOT_LOADING",
  ERROR = "ERROR",
}

function App() {
  const [loadingState, setLoadingState] = useState<LoadingStateTypes>(
    LoadingStateTypes.NOT_LOADING
  );
  const [calendar, setCalendar] = useState<ICalendarItem[] | undefined>();

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
      .then((data: ICalendar) => {
        setCalendar(data.items);
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

        {loadingState === LoadingStateTypes.NOT_LOADING &&
          calendar &&
          calendar.map((item, index) => {
            return (
              item && (
                <CalendarItem
                  key={index}
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

export default App;
