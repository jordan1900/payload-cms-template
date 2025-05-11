"use client";

import { useHeaderTheme } from "@/providers/HeaderTheme";
import React, { Suspense, useEffect } from "react";

import type { Page } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";

export const HomeHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  }, [setHeaderTheme]);

  return (
    <>
      <div
        className="relative -mt-[10.4rem] flex items-center justify-center text-white"
        data-theme="dark"
      >
        {/* Video background */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <Suspense>
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://l4wlsi8vxy8hre4v.public.blob.vercel-storage.com/video/glass-animation-5-f0gPcjmKFIV3ot5MGOdNy2r4QHBoXt.mp4"
              className="w-full h-full object-cover bg-transparent"
              style={{ background: "transparent" }}
            />
          </Suspense>
        </div>
        <div className="container mb-8 z-10 relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 min-h-[80vh]">
          {/* Left: Title and Links */}
          <div className="pt-64 md:pt-0 flex-1 max-w-[36.5rem] md:text-left md:items-start flex flex-col items-center text-center">
            {richText && (
              <RichText className="mb-6" data={richText} enableGutter={false} />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex md:justify-start justify-center gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {/* Right: Media */}
          <div className="flex-1 min-h-[20rem] w-full flex md:w-auto items-center justify-center select-none">
            {media && typeof media === "object" && (
              <Media
                imgClassName="-z-10 object-cover rounded-xl shadow-lg"
                priority
                resource={media}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
