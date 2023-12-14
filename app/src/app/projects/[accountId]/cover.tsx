"use client";

import Color /* , { useColor } */ from "color-thief-react";

export function Cover({ url }: { url: string }) {
  return (
    <Color url={url} format="rgbString" crossOrigin="anonymous">
      {({ data, loading, error }) => {
        // const { data, loading, error } = useColor(url, "rgbString", {
        //   crossOrigin: "anonymous",
        // });

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
