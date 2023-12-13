import { Download01Svg, File06Svg, Share03Svg } from "~/icons";
import { getFileURL } from "~/lib/utils";
import { ExternalLink } from "./external-link";

export function FileDescription({ file }: { file: string }) {
  const value = getFileURL(file);

  if (typeof value === "string") {
    return (
      <div className="flex w-full flex-col items-start justify-start gap-2 rounded-lg border border-ui-elements-light bg-background-light px-4 py-2">
        <span className="flex w-full flex-row items-center justify-start gap-2">
          <File06Svg className="h-6 w-6 text-ui-elements-gray" />
          <ExternalLink href={value}>
            <span className="flex flex-row items-center justify-start gap-2">
              {value}
              <Share03Svg className="h-4 w-4 text-ui-elements-gray" />
            </span>
          </ExternalLink>
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 rounded-lg border border-ui-elements-light bg-background-light px-4 py-2">
      <span className="flex w-full flex-row items-center justify-start gap-2">
        <File06Svg className="h-6 w-6 text-ui-elements-gray" />
        <a
          href={value.url}
          download
          className="flex max-w-prose flex-row items-center justify-start gap-2 truncate text-text-link"
        >
          {value.filename}
          <Download01Svg className="h-4 w-4 text-ui-elements-gray" />
        </a>
        <small className="text-sm font-medium text-ui-elements-gray">
          {value.size}
        </small>
      </span>
      <small className="text-sm font-medium text-ui-elements-gray">
        Uploaded {value.uploaded}
      </small>
    </div>
  );
}
