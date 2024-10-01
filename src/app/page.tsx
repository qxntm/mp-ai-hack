"use client";
import React, { useState, useEffect } from "react";
import SmallCard from "@/components/SmallCard";
import MillExtractionCard from "@/components/FirstMillExtractionCard";
import ChuteLevelCard from "@/components/ChuteLevelCard";
import MillOperationalCard from "@/components/MillOperationalCard";
import JuiceExtractionCard from "@/components/JuiceExtractionCard";
import data from "@/app/data/output.json"; // Import JSON data
import TargetCard from "@/components/TargetCard";
import PiCard from "@/components/PiCard";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the index every 2000ms
      setCurrentIndex((prevIndex) =>
        prevIndex === data.data.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const currentData = data.data[currentIndex]; // Get the current data based on the index

  return (
    <div className="bg-custom-bg min-h-screen px-20 py-16">
      {/* Machine Configuration */}
      <div className="flex flex-col gap-6">
        <div className="text-5xl font-bold text-primary-navy-blue">
          Machine Configuration
        </div>
        <div className="flex">
          <div className="flex flex-col justify-between w-1/2 mr-[25px] gap-[25px]">
            <SmallCard
              iconType="psfSpeed"
              value={currentData.mill_speed || 0}
              prediction={6}
              unit="rpm"
            />
            <SmallCard
              iconType="psfCurrent"
              value={currentData.hydraulic_top_cap_pressure || 0}
              prediction={2000}
              unit="Amp"
            />
          </div>
          <div className="flex flex-col justify-between w-1/2 mr-[25px] gap-[25px]">
            <SmallCard
              iconType="crushingSpeed"
              value={currentData.mill_ratio || 0}
              prediction={1.4}
              unit="rpm"
            />
            <SmallCard
              iconType="crushingCurrent"
              value={currentData.hydraulic_top_cap_pressure || 0}
              prediction={2100}
              unit="Amp"
            />
          </div>
          <div className="flex flex-col justify-between w-1/2 gap-[25px]">
            <SmallCard
              iconType="g"
              value={currentData.hydraulic_top_cap_pressure || 0}
              prediction={1.4}
              unit="Psi."
            />
            <SmallCard
              iconType="p"
              value={currentData.hydraulic_top_cap_pressure || 0}
              prediction={2100}
              unit="Psi."
            />
          </div>
        </div>
      </div>

      {/* Target section */}
      <div className="flex flex-col gap-6">
        <div className="text-5xl font-bold text-primary-navy-blue mt-10">
          Target
        </div>
        <div className="flex">
          <div className="w-1/5 mr-[25px] flex flex-col space-y-[25px]">
            <PiCard value={5} />
            <MillExtractionCard
              percentage={currentData.first_mill_extraction_percentage}
              prediction={currentData.prediction_first_mill_extraction}
            />
          </div>
          <div className="flex flex-col justify-between w-1/5 mr-[25px]">
            <TargetCard
              iconType="pol"
              first={currentData.mill_speed || 0}
              shredded={currentData.mill_ratio || 0}
            />
          </div>
          <div className="flex flex-col justify-between w-1/5 mr-[25px]">
            <TargetCard
              iconType="fiber"
              first={currentData.mill_speed || 0}
              shredded={currentData.mill_ratio || 0}
            />
          </div>
          <div className="flex flex-col justify-between w-1/5 mr-[25px]">
            <TargetCard
              iconType="moisture"
              first={currentData.mill_speed || 0}
              shredded={currentData.mill_ratio || 0}
            />
          </div>
          <div className="w-1/5">
            <ChuteLevelCard percentage={80} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-7/12 mr-[25px]">
            <MillOperationalCard
              millData={{
                fiber: [
                  39.173, 78.7305, 79.7266, 40.6133, 40.7318, 40.2522, 42.4928,
                  42.4662,
                ],
                moisture: [
                  46.3232, 89.8382, 89.4427, 43.7368, 44.1023, 43.6163, 42.5346,
                  41.672,
                ],
                pol: [
                  15.2163, 30.9792, 28.6212, 13.8767, 16.945, 16.9013, 14.5092,
                  14.6775,
                ],
                firstMillExtraction: [
                  76.632, 75.4217, 73.127, 74.107, 76.1959, 76.4614, 72.9596,
                ],
              }}
            />
          </div>
          <div className="w-5/12">
            <JuiceExtractionCard
              juiceData={{
                actual: [
                  77.3732, 78.6323, 75.9348, 76.0187, 71.5434, 73.1423, 72.4097,
                ],
                predict: [
                  79.0732, 77.1323, 77.6348, 74.5187, 73.24340000000001,
                  71.6423, 74.1097, 70.1301,
                ],
              }}
              rmse={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
