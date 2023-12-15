import { format as fns } from "date-fns";
import { format as timeago } from "timeago.js";

function isValidNumberDate(date: string | number) {
  return !isNaN(Number(date));
}

export const DATE = {
  dateObject: function (timestamp: string | number = Date.now()) {
    const shortened = isValidNumberDate(timestamp)
      ? Number(timestamp.toString().slice(0, 13))
      : timestamp;
    return new Date(shortened);
  },
  timestamp: function (timestamp: string | number = Date.now()) {
    return DATE.dateObject(timestamp).toLocaleDateString("en-GB", {});
  },
  date: function (timestamp: string | number = Date.now()) {
    return DATE.dateObject(timestamp).toLocaleDateString("en-GB");
  },
  time: function (timestamp: string | number = Date.now()) {
    return DATE.dateObject(timestamp).toLocaleString();
  },
  timeago: function (timestamp: string | number = Date.now()) {
    return timeago(timestamp, "en-US");
  },
  input: function (value: string | number | Date = Date.now()) {
    return fns(
      DATE.dateObject(value instanceof Date ? value.toISOString() : value),
      "PPP",
    );
  },
};

export const NUMBER = {
  compact: function (value = 0) {
    return value.toLocaleString("en-US", {
      notation: "compact",
    });
  },
  percentage: function (percentage = 0) {
    return percentage.toLocaleString("en-US", {
      style: "percent",
    });
  },
  bytes: function (bytes: string | number) {
    const size = Number(bytes);
    const unit =
      size < 1000
        ? "byte"
        : size < 1000000
          ? "kilobyte"
          : size < 1000000000
            ? "megabyte"
            : "gigabyte";
    const value =
      size < 1000
        ? size
        : size < 1000000
          ? size / 1000
          : size < 1000000000
            ? size / 1000000
            : size / 1000000000;
    return value.toLocaleString("en-US", {
      unit,
      style: "unit",
      unitDisplay: "narrow",
    });
  },
};

export const STRING = {
  capitalize: function (value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
};
