import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const API_ENDPOINT =
  "https://www.googleapis.com/calendar/v3/calendars/" +
  "askcfmm90aj0dee5tu64ngp068@group.calendar.google.com/" +
  "events?key=";

const handler: Handler = async (event, context) => {
  try {
    const response = await fetch(API_ENDPOINT + process.env.VITE_API_KEY, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify({
          data,
        }),
      };
  } catch (err: any) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};

export { handler };
