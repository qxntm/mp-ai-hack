"use client";
import React from "react";

const icons = {
  pol: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#062f6e"
      viewBox="0 0 256 256"
    >
      <path d="M232,116h-4.72A100.21,100.21,0,0,0,140,28.72V24a12,12,0,0,0-24,0v4.72A100.21,100.21,0,0,0,28.72,116H24a12,12,0,0,0,0,24h4.72A100.21,100.21,0,0,0,116,227.28V232a12,12,0,0,0,24,0v-4.72A100.21,100.21,0,0,0,227.28,140H232a12,12,0,0,0,0-24Zm-92,87v-3a12,12,0,0,0-24,0v3a76.15,76.15,0,0,1-63-63h3a12,12,0,0,0,0-24H53a76.15,76.15,0,0,1,63-63v3a12,12,0,0,0,24,0V53a76.15,76.15,0,0,1,63,63h-3a12,12,0,0,0,0,24h3A76.15,76.15,0,0,1,140,203ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z"></path>
    </svg>
  ),
  fiber: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#062f6e"
      viewBox="0 0 256 256"
    >
      <path d="M227.42,39.86a12,12,0,0,0-11.28-11.28c-39.6-2.33-74.59,2.34-104,13.87C84,53.48,62.31,70.58,49.39,91.9c-17.62,29.11-17.66,64.45-.45,98.19L31.51,207.52a12,12,0,0,0,17,17l17.43-17.43c16.74,8.54,33.88,12.85,50.45,12.85a91.31,91.31,0,0,0,47.74-13.3c21.32-12.92,38.42-34.62,49.45-62.75C225.08,114.46,229.75,79.46,227.42,39.86ZM151.66,186.08C131.57,198.25,108,199.17,83.94,189l84.54-84.54a12,12,0,1,0-17-17L67,172.06c-10.14-24-9.22-47.63,3-67.72,20.91-34.53,70.54-53.72,134-52.25C205.38,115.53,186.19,165.17,151.66,186.08Z"></path>
    </svg>
  ),
  moisture: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#062f6e"
      viewBox="0 0 256 256"
    >
      <path d="M134.88,6.17a12,12,0,0,0-13.76,0,259,259,0,0,0-42.18,39C50.85,77.43,36,111.63,36,144a92,92,0,0,0,184,0C220,66.64,138.36,8.6,134.88,6.17ZM194.08,160H140V144h56A68,68,0,0,1,194.08,160ZM140,120V104h47a115,115,0,0,1,5.68,16Zm19.3-58.71A197.29,197.29,0,0,1,173.68,80H140V41.46A243.5,243.5,0,0,1,159.3,61.29ZM60,144c0-33.31,20-63.37,36.7-82.71A243.5,243.5,0,0,1,116,41.46V210.92A68.1,68.1,0,0,1,60,144Zm80,66.92V184h42.94A68,68,0,0,1,140,210.92Z"></path>
    </svg>
  ),
};

const name = {
  pol: "% Pol",
  fiber: "% Fiber",
  moisture: "% Moisture",
};

type IconType = keyof typeof icons;

interface IconTypeProps {
  iconType: IconType;
  first: number;
  shredded: number;
}

export default function TargetCard({
  iconType,
  first,
  shredded,
}: IconTypeProps) {
  const formattedFirstValue = parseFloat(first.toFixed(2));
  const formattedShreddedValue = parseFloat(shredded.toFixed(2));
  const diffValue = shredded - first;
  const formattedDiffValue = parseFloat(diffValue.toFixed(2));

  return (
    <div className="min-w-[279px] min-h-[400px] bg-white px-[25px] py-[30px] rounded-2xl drop-shadow-xl">
      <div className="flex justify-between items-center">
        <div className="text-2xl text-primary-navy-blue font-bold">
          {name[iconType]}
        </div>
        <div className="rounded-full bg-custom-bg w-[70px] h-[70px] flex items-center justify-center">
          {icons[iconType] || icons.pol}
        </div>
      </div>
      <div className="text-sm text-primary-blue mt-5">1st Bagasse</div>
      <div className="text-primary-navy-blue font-bold text-3xl mt-2">
        {formattedFirstValue}
      </div>
      <div className="text-sm text-primary-blue mt-5">Shredded Cane</div>
      <div className="text-primary-navy-blue font-bold text-3xl mt-2">
        {formattedShreddedValue}
      </div>
      <div className="text-sm text-primary-blue mt-5">
        Shredded Cane - 1st Bagasse
      </div>
      <div className="text-primary-navy-blue font-bold text-3xl mt-2">
        {formattedDiffValue}
      </div>
    </div>
  );
}
