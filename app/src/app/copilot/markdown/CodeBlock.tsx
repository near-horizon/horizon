"use client";

import { type FC, memo, useCallback, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CheckSvg, ClipboardSvg, Download01Svg } from "~/icons";
import { generateRandomString, programmingLanguages } from "~/lib/codeblock";

interface Props {
  language: string;
  value: string;
}

function getRandomString() {
  return generateRandomString(3, true);
}

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch(console.error);
  }, [value]);

  const downloadAsFile = useCallback(() => {
    const fileExtension = programmingLanguages[language] ?? ".file";
    const suggestedFileName = `file-${getRandomString()}${fileExtension}`;
    const fileName = window.prompt("Enter file name" || "", suggestedFileName);

    if (!fileName) {
      // user pressed cancel on prompt
      return;
    }
    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [language, value]);

  return (
    <div className="codeblock w-full font-sans text-[16px]">
      <div className="bg-human-background text-human-foreground flex items-center justify-between rounded-t-[5px] px-4 py-1.5">
        <span className="text-xs lowercase text-white">{language}</span>

        <div className="flex items-center">
          <button
            className="flex items-center gap-1.5 rounded bg-none p-1 text-xs text-primary-foreground"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <>
                <CheckSvg className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <ClipboardSvg className="h-4 w-4" />
                Copy code
              </>
            )}
          </button>
          <button
            className="flex items-center rounded bg-none p-1 text-xs text-white"
            onClick={downloadAsFile}
          >
            <Download01Svg className="h-4 w-4" />
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";
