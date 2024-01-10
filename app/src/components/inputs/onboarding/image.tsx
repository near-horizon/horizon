import {
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "~/components/ui/input";
import { type InputProps } from "~/lib/validation/inputs";
import { Button } from "~/components/ui/button";
import { RefreshCcw04Svg, UploadCloud01Svg, User01Svg } from "~/icons";
import { useCallback, useRef, useState } from "react";
import { cn, generateImage, uploadImage } from "~/lib/utils";
import { Icon } from "~/components/icon";
import { MAX_IMAGE_SIZE } from "~/lib/constants/inputs";
import { NUMBER } from "~/lib/format";
import { OnboardingBuilder } from "./builder";

export function OnboardingImage<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      setCid: (cid: string) => void;
      cid: string;
      generatePrompt?: string;
      generateEnabled?: boolean;
      generate?: boolean;
      accountId: string;
      clearError?: () => void;
    },
) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = useCallback(
    async (
      e: React.ChangeEvent<HTMLInputElement>,
      field: ControllerRenderProps<TFieldValues, TName>,
    ) => {
      field.onChange(e);
      if (e.target.files) {
        const [file] = e.target.files;
        if (file) {
          if (file.size > MAX_IMAGE_SIZE) {
            props.control?.setError(field.name, {
              message:
                "Image must be less than " + NUMBER.bytes(MAX_IMAGE_SIZE),
            });
            return;
          }

          try {
            setUploading(true);
            const cid = await uploadImage(file);
            if (cid) {
              props.setCid(cid);
              props.clearError?.();
            }
          } catch (_e) {
            console.error(_e);
            props.control?.setError(field.name, {
              type: "validate",
              message: "Failed to upload image",
            });
          }
          setUploading(false);
        }
      }
    },
    [props],
  );

  const handleGenerate = useCallback(
    async (field: ControllerRenderProps<TFieldValues, TName>) => {
      try {
        setUploading(true);
        const cid = await generateImage(props.accountId, props.generatePrompt);
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
    },
    [props],
  );

  return (
    <OnboardingBuilder {...props}>
      {({ field }) => (
        <div
          className={cn(
            "w-full border border-ui-elements-light bg-ui-elements-white p-7",
            "flex flex-col items-center justify-start gap-6 rounded-2xl md:flex-row",
          )}
        >
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-input bg-background-light shadow shadow-ui-elements-light">
            {props.cid ? (
              <>
                <Icon
                  name={props.label ?? ""}
                  image={{ ipfs_cid: props.cid }}
                  className="h-full w-full object-center"
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

          <div className="flex flex-col items-center justify-start gap-2 md:flex-row md:items-start">
            <Input
              disabled={field.disabled}
              name={field.name}
              onBlur={field.onBlur}
              ref={ref}
              onChange={(e) => {
                void handleChange(e, field);
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
                onClick={() => {
                  void handleGenerate(field);
                }}
                disabled={uploading || !props.generateEnabled}
              >
                <RefreshCcw04Svg className="h-5 w-5" />
                Generate image
              </Button>
            )}

            <div className="flex flex-col items-center gap-2 md:flex-row">
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
                <br className="hidden md:block" />
                Max. file size: 2MB
              </span>
            </div>
          </div>
        </div>
      )}
    </OnboardingBuilder>
  );
}
