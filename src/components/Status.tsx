import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight } from "@phosphor-icons/react";

interface StatusProps {
  status: "add" | "minus" | "equal";
  prediction: number;
  unit?: string;
}

export default function Status({ status, prediction, unit = '%' }: StatusProps) {
  const [isAdd, setAdd] = useState(false);
  const formattedPrediction = parseFloat(prediction.toFixed(4));

  useEffect(() => {
    setAdd(status === "add");
  }, [status]);

  return (
    <>
      {isAdd ? (
        <div className="flex items-center gap-0.5 justify-center min-w-[42px] h-[25px] border border-secondary-green bg-secondary-green bg-opacity-20 py-1 px-1 rounded-sm">
          <div className="flex justify-between text-xs font-bold text-green leading-3">
            <div>{formattedPrediction}&nbsp;</div>
            <div>{unit}</div>
          </div>
          <ArrowUpRight size={14} weight="bold" className="text-green" />
        </div>
      ) : (
        <div className="flex items-center gap-0.5 justify-center min-w-[42px] h-[25px] border border-secondary-red bg-secondary-red bg-opacity-20 py-1.5 px-1 rounded-sm">
          <div className="flex justify-between text-xs font-bold text-red leading-3">
            <div>{formattedPrediction}&nbsp;</div>
            <div>{unit}</div>
          </div>
          <ArrowDownRight size={14} weight="bold" className="text-red" />
        </div>
      )}
    </>
  );
}