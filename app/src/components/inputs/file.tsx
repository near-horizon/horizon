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
import UploadCloudIcon from "~/components/icons/upload-cloud-01.svg";
import UserIcon from "~/components/icons/user-01.svg";
import RefreshIcon from "~/components/icons/refresh-ccw-04.svg";
import { useRef, useState } from "react";
import { IPFSImage } from "../ipfs-image";
import { generateImage, uploadImage } from "~/lib/utils";

export function FileInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      setCid: (cid: string) => void;
      cid: string;
      generateEnabled?: boolean;
      generate?: boolean;
    }
) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">
            {props.label ?? field.name}
            {props.rules?.required && " *"}
          </FormLabel>
          <div className="flex flex-row items-center justify-start gap-5">
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-ui-elements-gray bg-ui-elements-light shadow shadow-ui-elements-light">
              {props.cid ? (
                <>
                  <IPFSImage cid={props.cid} alt={props.label} />
                  {uploading && (
                    <RefreshIcon className="absolute inset-0 animate-spin-counter" />
                  )}
                </>
              ) : uploading ? (
                <RefreshIcon className="h-10 w-10 animate-spin-counter" />
              ) : (
                <UserIcon className="h-10 w-10" />
              )}
            </div>
            <FormControl>
              <>
                <Input
                  {...field}
                  ref={ref}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onChange={async (e) => {
                    field.onChange(e);
                    if (e.target.files) {
                      try {
                        setUploading(true);
                        const cid = await uploadImage(e.target.files[0]);
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
                  }}
                  placeholder={props.placeholder}
                  type="file"
                  className="hidden"
                />
                <Button
                  className="flex flex-row items-center gap-2"
                  variant="outline"
                  type="button"
                  onClick={() => {
                    ref.current?.click();
                  }}
                  disabled={uploading}
                >
                  <UploadCloudIcon className="h-5 w-5" />
                  {!props.cid ? "Upload file" : "Replace file"}
                </Button>
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
                    <RefreshIcon className="h-5 w-5" />
                    Generate image
                  </Button>
                )}
                {!uploading && props.cid && field.value && (
                  <Button
                    className="flex flex-row items-center gap-2"
                    variant="destructive"
                    type="button"
                    onClick={() => {
                      props.setCid("");
                      field.onChange("");
                    }}
                  >
                    Clear
                  </Button>
                )}
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
