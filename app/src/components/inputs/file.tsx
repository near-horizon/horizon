import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
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

export function FileInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<string>("upload");

  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col items-start justify-start gap-6">
            <FormLabel className="font-bold">
              {props.label ?? field.name}
              {props.rules?.required && " *"}
            </FormLabel>
            <Tabs onValueChange={(tab) => setTab(tab)} value={tab} className="">
              <TabsList className="flex flex-row items-center justify-start gap-4">
                <TabsTrigger
                  className="flex flex-row items-center justify-center !border-none px-0 !shadow-none data-[state=inactive]:text-text-link"
                  value="upload"
                >
                  Upload a file
                </TabsTrigger>
                <Separator className="h-5 w-px" orientation="vertical" />
                <TabsTrigger
                  className="flex flex-row items-center justify-center !border-none px-0 !shadow-none data-[state=inactive]:text-text-link"
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
              />
            </div>
            <FormControl>
              <>
                <Input
                  ref={ref}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onChange={async (e) => {
                    if (e.target.files) {
                      try {
                        setUploading(true);
                        const cid = await uploadImage(e.target.files[0]);
                        if (cid) {
                          field.onChange(getImageURL(cid));
                        }
                      } catch (_e) {
                        console.error(_e);
                        props.control?.setError(field.name, {
                          message: "Failed to upload image",
                        });
                      }
                      setUploading(false);
                    }
                  }}
                  placeholder={props.placeholder}
                  type="file"
                  className="hidden"
                />
                <div className="flex flex-row items-center justify-start gap-4">
                  <Button
                    className={cn("flex flex-row items-center gap-2", {
                      hidden: tab === "paste",
                    })}
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
                  {!uploading && field.value && (
                    <Button
                      className="flex flex-row items-center gap-2"
                      variant="destructive"
                      type="button"
                      onClick={() => {
                        field.onChange("");
                      }}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </>
            </FormControl>
          </div>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
