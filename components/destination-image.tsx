"use client";

import Image from "next/image";
import { useState } from "react";
import { FlowerArtwork } from "@/components/flower-artwork";
import { getLocalizedDestinationName } from "@/lib/destination-localization";
import { useI18n } from "@/lib/i18n";
import { Destination } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DestinationImageProps {
  destination: Destination;
  priority?: boolean;
  className?: string;
  overlayClassName?: string;
  imageClassName?: string;
}

export function DestinationImage({
  destination,
  priority = false,
  className,
  overlayClassName,
  imageClassName,
}: DestinationImageProps) {
  const { getCountryLabel, getFlowerLabel, locale, t } = useI18n();
  const [hasError, setHasError] = useState(false);
  const shouldRenderImage = Boolean(destination.imageUrl) && !hasError;
  const destinationName = getLocalizedDestinationName(destination, locale);
  const flowerLabel = getFlowerLabel(destination.flowerType);
  const countryLabel = getCountryLabel(destination.country);
  const imageAlt =
    locale === "zh"
      ? `${destinationName}，${countryLabel} · ${flowerLabel}花期`
      : `${destinationName}, ${countryLabel} during ${flowerLabel} season`;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[#f7efe9]",
        className,
      )}
    >
      {shouldRenderImage ? (
        <Image
          src={destination.imageUrl!}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 33vw"
          className={cn("object-cover", imageClassName)}
          onError={() => setHasError(true)}
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(145deg, ${destination.image.from}, ${destination.image.to})`,
            }}
          />
          <div className="absolute inset-0 opacity-90">
            <FlowerArtwork
              flowerType={destination.flowerType}
              title={destination.destination}
              className="h-full w-full scale-110"
            />
          </div>
          <div className="absolute inset-x-4 bottom-4 rounded-[1rem] border border-white/60 bg-white/68 px-3 py-2 backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.22em] text-pine/48">{t("common.image.preview")}</p>
            <p className="mt-1 text-sm text-pine/82">
              {destination.imageHint ?? `${destinationName} · ${flowerLabel}`}
            </p>
          </div>
        </>
      )}

      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.78),transparent_34%),linear-gradient(180deg,transparent,rgba(47,53,47,0.16))]",
          overlayClassName,
        )}
      />
    </div>
  );
}
