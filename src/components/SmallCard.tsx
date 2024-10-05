"use client";
import React from "react";
import Status from "./Status";

const icons = {
  psfSpeed: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#062f6e"
      viewBox="0 0 256 256"
    >
      <path d="M232,231.47a8.17,8.17,0,0,0-8.25-7.47H182.94l-6.3-44.12,3.24,1.91a16,16,0,0,0,21.91-5.67l11.81-20a16.49,16.49,0,0,0,2.11-11.49,15.92,15.92,0,0,0-7.6-10.74L148.93,99a8.18,8.18,0,0,1-3.33-10.63,8,8,0,0,1,11.21-3.3l20.95,12.33A4,4,0,0,0,183.24,96l30.55-51.9a16,16,0,0,0-5.67-21.92l-20.34-12a16,16,0,0,0-21.91,5.67l-35,59.42a8,8,0,0,1-11.79,2.27A8.13,8.13,0,0,1,117.21,67l12.23-20.78A4,4,0,0,0,128,40.76L76.12,10.22a16,16,0,0,0-21.91,5.67l-11.81,20a16.47,16.47,0,0,0-2.11,11.48,16,16,0,0,0,7.6,10.75L107.08,93a8.16,8.16,0,0,1,3.47,10.3,8,8,0,0,1-11.36,3.62l-21-12.34A4,4,0,0,0,72.76,96l-30.55,51.9a16,16,0,0,0,5.67,21.91l20.34,12a15.57,15.57,0,0,0,10.58,2L73.06,224H32.27A8.17,8.17,0,0,0,24,231.47,8,8,0,0,0,32,240H224A8,8,0,0,0,232,231.47ZM89.22,224,98,162.8l12.77-21.7h0L125,116.93a8.18,8.18,0,0,1,10.62-3.33,8,8,0,0,1,3.3,11.21l-12.33,21a4,4,0,0,0,1.42,5.47l31,18.25L166.78,224Z"></path>
    </svg>
  ),
  psfCurrent: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#062f6e"
      viewBox="0 0 256 256"
    >
      <path d="M200,140a12,12,0,0,1-12,12h-4v4a12,12,0,0,1-24,0v-4h-4a12,12,0,0,1,0-24h4v-4a12,12,0,0,1,24,0v4h4A12,12,0,0,1,200,140ZM100,128H68a12,12,0,0,0,0,24h32a12,12,0,0,0,0-24ZM244,92v92a20,20,0,0,1-20,20H32a20,20,0,0,1-20-20V92A20,20,0,0,1,32,72H44V56A20,20,0,0,1,64,36H96a20,20,0,0,1,20,20V72h24V56a20,20,0,0,1,20-20h32a20,20,0,0,1,20,20V72h12A20,20,0,0,1,244,92ZM164,72h24V60H164ZM68,72H92V60H68ZM220,96H36v84H220Z"></path>
    </svg>
  ),
  p: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#062f6e"
      viewBox="0 0 256 256"
    >
      <path d="M228,112c0,23.6-8.29,45.23-23.35,60.88C190.52,187.57,171.33,196,152,196c-15.45,0-26.78-4.18-34.89-9.31l-9.43,40.06a12,12,0,1,1-23.36-5.5l32-136a12,12,0,1,1,23.36,5.5l-16.45,69.93C126.72,164.86,135.16,172,152,172c25.56,0,52-22.45,52-60A68,68,0,1,0,77.09,146a12,12,0,0,1-20.77,12A92,92,0,1,1,228,112Z"></path>
    </svg>
  ),
  g: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#062f6e"
      viewBox="0 0 256 256"
    >
      <path d="M228,128a100,100,0,1,1-22.86-63.64,12,12,0,0,1-18.51,15.28A76,76,0,1,0,203.05,140H128a12,12,0,0,1,0-24h88A12,12,0,0,1,228,128Z"></path>
    </svg>
  ),
  crushingSpeed: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#062f6e"
      viewBox="0 0 256 256"
    >
      <path d="M120,176a12,12,0,0,1-12,12H80a12,12,0,0,1,0-24h28A12,12,0,0,1,120,176Zm56-12H148a12,12,0,0,0,0,24h28a12,12,0,0,0,0-24Zm68,52a12,12,0,0,1-12,12H24a12,12,0,0,1,0-24h4V88a12,12,0,0,1,19.2-9.6L92,112V88a12,12,0,0,1,19.2-9.6l33.33,25,10.61-74.23A20.1,20.1,0,0,1,174.94,12h18.12a20.1,20.1,0,0,1,19.8,17.17l15,105.13c0,.1.12,1.34.12,1.7v68h4A12,12,0,0,1,244,216Zm-77.57-96.17L172,124h30.16L189.59,36H178.41ZM52,204H204V148H168a12,12,0,0,1-7.2-2.4l-14.38-10.78-.06,0L116,112v24a12,12,0,0,1-19.2,9.6L52,112Z"></path>
    </svg>
  ),
  crushingCurrent: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#062f6e"
      viewBox="0 0 256 256"
    >
      <path d="M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z"></path>
    </svg>
  ),
  ratio: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#062f6e"
      viewBox="0 0 256 256"
    >
      <path d="M208.49,64.47l-144,144a12,12,0,1,1-17-17l144-144a12,12,0,0,1,17,17ZM47.72,104.27A40,40,0,1,1,76,116,39.72,39.72,0,0,1,47.72,104.27ZM60,76a16,16,0,1,0,4.69-11.31A15.87,15.87,0,0,0,60,76ZM220,180a40,40,0,1,1-11.72-28.29A39.71,39.71,0,0,1,220,180Zm-24,0a15.87,15.87,0,0,0-4.69-11.32h0A16,16,0,1,0,196,180Z"></path>
    </svg>
  ),
};

const name = {
  psfSpeed: "PSF Speed",
  psfCurrent: "PSF Current",
  crushingSpeed: "Crushing Speed",
  crushingCurrent: "Crushing Current",
  p: "P Side Pressure",
  g: "G Side Pressure",
  pi: "PI",
  ratio: "Mill Ratio",
  pol: "%Pol Shredded Cane",
  fiber: "%Fiber Shredded Cane",
  moisture: "%Moisture 1st Bagasse",
};

type IconType = keyof typeof icons;

interface IconTypeProps {
  iconType: IconType;
  value: number;
  prediction?: number;
  unit?: string;
}

export default function SmallCard({
  iconType,
  value,
  prediction,
  unit,
}: IconTypeProps) {
  let status: "add" | "minus" | "equal" = "equal"; // Default to "equal" if no prediction

  // Ensure status is one of the three accepted values
  if (prediction !== undefined) {
    status =
      prediction > value ? "add" : prediction < value ? "minus" : "equal";
  }

  const formattedValue = parseFloat(value.toFixed(2));

  return (
    <div className="min-w-[285px] min-h-[112.5px] bg-white px-[20px] py-[21px] rounded-2xl drop-shadow-xl flex gap-4 items-center">
      <div className="rounded-full bg-custom-bg w-[70px] h-[70px] flex items-center justify-center">
        {icons[iconType] || icons.psfSpeed}
      </div>
      <div>
        <div className="text-sm text-primary-blue">{name[iconType]}</div>
        <div className="flex items-center gap-x-3">
          <div className="text-primary-navy-blue font-bold text-3xl">
            {formattedValue}
          </div>
          {status !== "equal" && prediction !== undefined && (
            <Status status={status} prediction={prediction} unit={unit} />
          )}
        </div>
      </div>
    </div>
  );
}
