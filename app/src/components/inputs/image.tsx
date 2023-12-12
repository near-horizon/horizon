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
import { RefreshCcw04Svg, UploadCloud01Svg, User01Svg } from "~/icons";
import { useRef, useState } from "react";
import { generateImage, uploadImage } from "~/lib/utils";
import { Icon } from "../icon";
import { MAX_IMAGE_SIZE } from "~/lib/constants/inputs";
import { NUMBER } from "~/lib/format";

export function ImageInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      setCid: (cid: string) => void;
      cid: string;
      generateEnabled?: boolean;
      generate?: boolean;
    },
) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="grid w-full grid-cols-12 items-start justify-end gap-2 space-y-0">
          {!props.noLabel && (
            <FormLabel className="col-span-2 text-right capitalize">
              {props.label ?? field.name}
              {props.rules?.required && " *"}
            </FormLabel>
          )}
          <div className="col-span-10 flex flex-row items-center justify-start gap-5">
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-input bg-background-light p-1 shadow shadow-ui-elements-light">
              {props.cid ? (
                <>
                  <Icon
                    name={props.label ?? ""}
                    image={{ ipfs_cid: props.cid }}
                    className="h-full w-full rounded-lg"
                  />
                  {uploading && (
                    <RefreshCcw04Svg className="absolute inset-0 animate-spin-counter" />
                  )}
                </>
              ) : uploading ? (
                <RefreshCcw04Svg className="h-10 w-10 animate-spin-counter" />
              ) : (
                <User01Svg className="h-10 w-10" />
              )}
            </div>
            <FormControl>
              <div className="flex flex-col items-start justify-start gap-2">
                <Input
                  disabled={field.disabled}
                  name={field.name}
                  onBlur={field.onBlur}
                  ref={ref}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onChange={async (e) => {
                    field.onChange(e);
                    if (e.target.files) {
                      const [file] = e.target.files;
                      if (file) {
                        if (file.size > MAX_IMAGE_SIZE) {
                          props.control?.setError(field.name, {
                            message:
                              "Image must be less than " +
                              NUMBER.bytes(MAX_IMAGE_SIZE),
                          });
                          return;
                        }

                        try {
                          setUploading(true);
                          const cid = await uploadImage(file);
                          if (cid) {
                            props.setCid(cid);
                          }
                        } catch (_e) {
                          console.error(_e);
                          props.control?.setError(field.name, {
                            message: "Failed to upload image",
                          });
                        }
                        setUploading(false);
                      }
                    }
                  }}
                  placeholder={props.placeholder}
                  type="file"
                  accept="image/png, image/jpeg, image/gif, image/svg+xml, image/webp"
                  className="hidden"
                />
                {props.generate && (
                  <Button
                    className="flex flex-row items-center gap-2"
                    variant="outline"
                    type="button"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={async () => {
                      try {
                        setUploading(true);
                        const cid = await generateImage();
                        if (cid) {
                          props.setCid(cid);
                        }
                      } catch (_e) {
                        console.error(_e);
                        props.control?.setError(field.name, {
                          message: "Failed to generate image",
                        });
                      }
                      setUploading(false);
                    }}
                    disabled={uploading || !props.generateEnabled}
                  >
                    <RefreshCcw04Svg className="h-5 w-5" />
                    Generate image
                  </Button>
                )}
                <div className="flex flex-row items-center gap-2">
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
                    {!props.cid ? "Upload image" : "Replace image"}
                  </Button>
                  <span className="text-xs text-gray-500">
                    JPG, PNG, GIF, SVG
                    <br />
                    Max. file size: 2MB
                  </span>
                </div>
              </div>
            </FormControl>
          </div>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage className="col-start-3" />
        </FormItem>
      )}
    />
  );
}
