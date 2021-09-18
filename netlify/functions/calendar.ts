import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const API_ENDPOINT =
  "https://www.googleapis.com/calendar/v3/calendars/" +
  "askcfmm90aj0dee5tu64ngp068@group.calendar.google.com/" +
  "events?key=";

const handler: Handler = async (event, context) => {
  const d = Date;
  const now = new Date(d.now());

  try {
    const response = await fetch(API_ENDPOINT + process.env.VITE_API_KEY, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const items: any = await response.json().then((r: any) => {
      return r.items.filter((item: any) => {
        if (new Date(item.start.dateTime) > now) {
          return item;
        }
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        items,
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
