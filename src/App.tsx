import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";

import Loader from "react-loader-spinner";
import { ICalendar, ICalendarItem } from "./types/calendar";
import CalendarItem from "./components/CalendarItem";
import Button from "./components/Button/Button";
import Card from "./components/Card/Card";

enum LoadingStateTypes {
  LOADING = "LOADING",
  NOT_LOADING = "NOT_LOADING",
  ERROR = "ERROR",
}
// #f59219
function App() {
  const [loadingState, setLoadingState] = useState<LoadingStateTypes>(
    LoadingStateTypes.NOT_LOADING
  );
  const [calendar, setCalendar] = useState<ICalendarItem[] | undefined>();
  const routeToShop = () => {
    window.location.assign("https://shop.spreadshirt.se/lanbros/");
  };
  const routeToDiscord = () => {
    window.location.assign("http://discord.lanbros.net");
  };

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
      <div className="App-menu"></div>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p style={{ fontSize: "1.1rem", marginBottom: "2em" }}>
            Vi spelar spel. Tillsammans.
          </p>
        </div>
        <div style={{marginBottom: '1.5em'}}>
          <Button label={"discord"} action={routeToDiscord} />
          <Button label={"merch"} action={routeToShop} />
        </div>

        {loadingState === LoadingStateTypes.NOT_LOADING &&
          calendar &&
          calendar.map((item, index) => {
            return (
              <div style={{ paddingTop: "0.5em" }}>
                {item && (
                  <Card
                    component={
                      <CalendarItem
                        key={index}
                        summary={item.summary}
                        start={item.start}
                        end={item.end}
                        htmlLink={item.htmlLink}
                        description={item.description}
                      />
                    }
                  />
                )}
              </div>
            );
          })}
        {loadingState === LoadingStateTypes.LOADING && <Spinner />}
      </div>
    </div>
  );
}

const Spinner = () => {
  return <Loader type="Oval" color="#00BFFF" height={30} />;
};

export default App;
