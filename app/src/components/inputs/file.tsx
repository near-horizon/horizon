import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "../ui/input";
import { type InputProps } from "~/lib/validation/inputs";
import { Button } from "../ui/button";
import { UploadCloud01Svg } from "~/icons";
import { useRef, useState } from "react";
import { cn, uploadImage } from "~/lib/utils";
import { getImageURL } from "~/lib/client/fetching";
import { Tabs, TabsTrigger } from "../ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { Separator } from "../ui/separator";
import { InputBuilder } from "./input-builder";
import { MAX_FILE_SIZE } from "~/lib/constants/inputs";

export function FileInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<string>("upload");

  return (
    <InputBuilder {...props}>
      {({ field, fieldState }) => (
        <div className="flex min-h-[6rem] w-full flex-col items-start justify-start gap-2 pl-2">
          <Tabs onValueChange={(tab) => setTab(tab)} value={tab} className="">
            <TabsList className="flex flex-row items-center justify-start gap-4">
              <TabsTrigger
                className="flex flex-row items-center justify-center !border-none !bg-transparent px-0 !shadow-none data-[state=inactive]:text-text-link"
                value="upload"
              >
                Upload a file
              </TabsTrigger>
              <Separator className="h-5 w-px" orientation="vertical" />
              <TabsTrigger
                className="flex flex-row items-center justify-center !border-none !bg-transparent px-0 !shadow-none data-[state=inactive]:text-text-link"
                value="paste"
              >
                Paste a link
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="w-full">
            <Input
              {...field}
              type="text"
              value={uploading ? "Uploading..." : field.value}
              disabled={tab === "upload"}
              className={cn(
                "disabled:hidden",
                fieldState.error && "ring ring-destructive ring-offset-2",
              )}
            />
          </div>
          <Input
            ref={ref}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (e) => {
              if (e.target.files) {
                const [file] = e.target.files;
                if (!file) return;

                if (file.size > MAX_FILE_SIZE) {
                  props.control?.setError(field.name, {
                    message: "File size is too large",
                  });
                  return;
                }
                try {
                  setUploading(true);
                  const cid = await uploadImage(file);
                  if (cid) {
                    field.onChange(getImageURL(cid));
                  }
                } catch (_e) {
                  console.error(_e);
                  props.control?.setError(field.name, {
                    message: "Failed to upload file",
                  });
                }
                setUploading(false);
              }
            }}
            placeholder={props.placeholder}
            type="file"
            className="hidden"
            accept=".pdf, .ppt, .jpg"
          />
          <div
            className={cn("flex flex-row items-center justify-start gap-4", {
              hidden: tab === "paste",
            })}
          >
            <Button
              className="flex flex-row items-center gap-2"
              variant="outline"
              type="button"
              onClick={() => {
                ref.current?.click();
              }}
              disabled={uploading}
            >
              <UploadCloud01Svg className="h-5 w-5" />
              {!field.value ? "Upload file" : "Replace file"}
            </Button>
            <span className="text-sm text-ui-elements-gray">
              Supported formats: PDF, PPT, JPG.
              <br />
              Max. file size: 5MB
            </span>
          </div>
        </div>
      )}
    </InputBuilder>
  );
}
