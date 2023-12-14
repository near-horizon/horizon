"use client";

import Color from "color-thief-react";

export function Cover({ url }: { url: string }) {
  return (
    <Color src={url} format="rgbString" crossOrigin="anonymous">
      {({ data, loading, error }) => {
        const backgroundColor = !data || loading || error ? "#458bca" : data;

        return (
          <div
            style={{ backgroundColor }}
            className="h-full w-full transition-colors duration-300 ease-in-out"
          ></div>
        );
      }}
    </Color>
  );
}
