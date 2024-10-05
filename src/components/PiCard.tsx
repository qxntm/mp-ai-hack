"use client";
import React from "react";

interface ValueProps {
  value: number;
}

export default function PiCard({ value }: ValueProps) {
  const formattedValue = parseFloat(value.toFixed(2));

  return (
    <div className="min-w-[285px] min-h-[103px] bg-white px-[20px] py-[16.5px] rounded-2xl drop-shadow-xl flex gap-4 items-center">
      <div className="rounded-full bg-custom-bg w-[70px] h-[70px] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#062f6e"
          viewBox="0 0 256 256"
        >
          <path d="M224,84H180.2l7.61-41.85a12,12,0,0,0-23.62-4.3L155.8,84H116.2l7.61-41.85a12,12,0,1,0-23.62-4.3L91.8,84H48a12,12,0,0,0,0,24H87.44l-7.27,40H32a12,12,0,0,0,0,24H75.8l-7.61,41.85a12,12,0,0,0,9.66,14A11.43,11.43,0,0,0,80,228a12,12,0,0,0,11.8-9.86L100.2,172h39.6l-7.61,41.85a12,12,0,0,0,9.66,14,11.43,11.43,0,0,0,2.16.2,12,12,0,0,0,11.8-9.86L164.2,172H208a12,12,0,0,0,0-24H168.56l7.27-40H224a12,12,0,0,0,0-24Zm-79.83,64H104.56l7.27-40h39.61Z"></path>
        </svg>
      </div>
      <div className="flex items-center justify-between w-3/5">
        <div className="text-2xl text-primary-navy-blue font-bold">PI</div>
        <div className="text-primary-navy-blue font-bold text-3xl">
          {formattedValue}
        </div>
      </div>
    </div>
  );
}
