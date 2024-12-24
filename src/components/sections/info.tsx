import React from "react";
import { RollingText } from "../rolling-text";
import { outerSans } from "@/fonts";
import Image from "next/image";
import { CrosshairIcon } from "../icons/CrosshairIcon";
import { cn } from "@/lib/utils";
import { WireframeLine } from "../lines";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Info = () => {
  const renderCrosshairIcons = () => (
    <div className="flex h-40 items-center justify-between px-4 md:px-0">
      <CrosshairIcon />
      <CrosshairIcon />
    </div>
  );

  const renderTitle = (className: string) => (
    <RollingText
      text="info"
      className={cn(
        `${outerSans.className} mb-8 ml-auto mr-0 max-w-52 border-[1px] border-divider py-4 text-center text-2xl`,
        className,
      )}
    />
  );
  return (
    <>
      <WireframeLine orientation="tr" className="md:-translate-x-1/4" />
      <WireframeLine orientation="tl" className="md:-translate-x-1/4" />
      <WireframeLine orientation="h" className="top-1/2" />

      <div className="container mx-auto flex h-full flex-col">
        {renderCrosshairIcons()}

        {/* Content container */}
        <div className="flex grow flex-col items-center justify-between gap-4 md:flex-row md:px-2">
          {/* Image container */}
          {renderTitle("md:hidden block w-full mx-0")}
          <div className="w-3/4 rounded-lg bg-[var(--foreground)] md:w-1/2 xl:w-[40%]">
            <div className="flex flex-row justify-between px-2 pt-2 text-[var(--background)]">
              <p>{"[DV]"}</p>
              <p>23</p>
            </div>

            <Image alt="info" src="/info1.png" width={1000} height={1000} />
          </div>

          {/* Text container */}
          <div className="h-full w-3/4 md:w-[40%]">
            {renderTitle("hidden md:block")}

            <p className="text-lg">
              I explore the intersection of engineering, data science and AI
            </p>

            <div className="flex items-center justify-between pt-8">
              <div className="flex items-center gap-4">
                <ArrowLeft
                  width={28}
                  height={28}
                  className="rounded-full border-[1px] border-divider"
                />
                <ArrowRight
                  width={28}
                  height={28}
                  className="rounded-full border-[1px] border-divider"
                />
              </div>

              <span className="text-sm font-thin text-gray-300">
                - [Finn Formica]
              </span>
            </div>
          </div>
        </div>

        {renderCrosshairIcons()}
      </div>
    </>
  );
};

export default Info;
