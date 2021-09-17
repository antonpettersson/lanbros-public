import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Loader from "react-loader-spinner";

enum LoadingStateTypes {
  LOADING = "LOADING",
  NOT_LOADING = "NOT_LOADING",
  ERROR = "ERROR",
}

interface ICalendar {
  calendar: any[];
}

function App() {
  const [loadingState, setLoadingState] = useState<LoadingStateTypes>(
    LoadingStateTypes.NOT_LOADING
  );
  const [calendar, setCalendar] = useState<ICalendar | undefined>();

  useEffect(() => {
    setLoadingState(LoadingStateTypes.LOADING);
    fetch(window.location + ".netlify/functions/calendar", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setCalendar(data);
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
        {(loadingState === LoadingStateTypes.NOT_LOADING && calendar) && (
          <p>boop</p>
        )}
        {loadingState === LoadingStateTypes.LOADING && <Spinner />}
      </header>
    </div>
  );
}

const Spinner = () => {
  return <Loader type="Oval" color="#00BFFF" height={30} />;
};

export default App;
