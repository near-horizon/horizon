"use client";

import type QRCodeStyling from "qr-code-styling";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Copy01Svg, XSvg } from "~/icons";
import { motion } from "framer-motion";
import { cleanURL } from "~/lib/utils";

function useQRCodeStyling(
  options: ConstructorParameters<typeof QRCodeStyling>[0]
): QRCodeStyling | null {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const QRCodeStylingLib = require("qr-code-styling") as typeof QRCodeStyling;
    const qrCodeStyling = new QRCodeStylingLib(options);
    return qrCodeStyling;
  }
  return null;
}

const qrCodeOptions = {
  width: 300,
  height: 300,
  // type: "svg",
  image: "/icon.png",
  dotsOptions: {
    color: "#000",
    type: "rounded",
  },
  shape: "square",
  cornersDotOptions: {
    type: "dot",
    color: "#66a0ff",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
  },
  backgroundOptions: {
    color: "#fff",
    round: 0.2,
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 10,
  },
} satisfies ConstructorParameters<typeof QRCodeStyling>[0];

export function QRDialog({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useQRCodeStyling(qrCodeOptions);
  const [show, setShow] = useState(false);
  const [finalUrl, setFinalUrl] = useState(url);

  useEffect(() => {
    qrCode?.append(ref.current ?? undefined);
  }, [ref, qrCode]);

  useEffect(() => {
    qrCode?.update({
      data: finalUrl,
    });
  }, [finalUrl, qrCode]);

  useEffect(() => {
    const cleaned = cleanURL(`${window.location.host}${url}`);
    setFinalUrl(cleaned);
  }, [url]);

  return (
    <>
      <Button variant="outline" onClick={() => setShow(true)}>
        Share
      </Button>
      <motion.div
        className="fixed inset-0 z-50 hidden flex-col items-center justify-center"
        variants={{
          hidden: { display: "none" },
          flex: {
            display: "flex",
          },
        }}
        initial="hidden"
        animate={show ? "flex" : "hidden"}
      >
        <motion.div
          className="fixed -inset-full bg-black"
          variants={{
            hidden: { opacity: 0 },
            flex: {
              opacity: 0.2,
            },
          }}
        />
        <motion.div
          className="relative flex flex-col items-center justify-center gap-6 rounded-xl bg-ui-elements-light p-8"
          variants={{
            hidden: { scale: 0.9 },
            flex: { scale: 1, transition: { delay: 0.1, bounce: 0.4 } },
          }}
        >
          <Button
            variant="destructive"
            onClick={() => setShow(false)}
            className="absolute right-4 top-4 !bg-transparent"
          >
            <XSvg className="h-5 w-5" />
          </Button>
          <div className="flex flex-col items-center justify-center gap-4">
            <h4 className="text-2xl font-bold">Scan QR Code</h4>
            <p className="text-ui-elements-gray">
              Scan this to navigate to the profile
            </p>
          </div>
          <div className="flex flex-col items-stretch justify-stretch">
            <div id="qr-code" ref={ref} />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <small className="text-lg text-ui-elements-gray">
              Or copy this link
            </small>
            <div className="flex w-full flex-row items-center justify-between gap-4">
              <span className="flex flex-row items-center justify-start rounded border border-ui-elements-gray bg-white p-3 shadow">
                {finalUrl.substring(8, finalUrl.indexOf("?"))}
              </span>
              <Button
                variant="default"
                onClick={() => {
                  navigator.clipboard.writeText(finalUrl).catch(console.error);
                }}
              >
                <Copy01Svg className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
