"use client";
import React, { useState, useEffect } from "react";
import SmallCard from "@/components/SmallCard";
import MillExtractionCard from "@/components/FirstMillExtractionCard";
import ChuteLevelCard from "@/components/ChuteLevelCard";
import MillOperationalCard from "@/components/MillOperationalCard";
import JuiceExtractionCard from "@/components/JuiceExtractionCard";
import data from "@/app/data/output.json";
import dataDisplay from "@/app/data/display.json";
import TargetCard from "@/components/TargetCard";
import PiCard from "@/components/PiCard";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the index every 2000ms
      setCurrentIndex((prevIndex) =>
        prevIndex === dataDisplay.dataDisplay.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const currentData = dataDisplay.dataDisplay[currentIndex]; // Get the current dataDisplay based on the index

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
              value={currentData.psf_speed || 0}
              prediction={currentData.psf_speed_predict}
              unit="rpm"
            />
            <SmallCard
              iconType="psfCurrent"
              value={currentData.psf_current || 0}
              prediction={currentData.psf_current_predict}
              unit="Amp"
            />
          </div>
          <div className="flex flex-col justify-between w-1/2 mr-[25px] gap-[25px]">
            <SmallCard
              iconType="crushingSpeed"
              value={currentData.crushing_speed || 0}
              prediction={currentData.crushing_speed_predict}
              unit="rpm"
            />
            <SmallCard
              iconType="crushingCurrent"
              value={currentData.crushing_current || 0}
              prediction={currentData.crushing_current_predict}
              unit="Amp"
            />
          </div>
          <div className="flex flex-col justify-between w-1/2 gap-[25px]">
            <SmallCard
              iconType="g"
              value={currentData.g_side_pressure || 0}
              prediction={currentData.g_side_pressure_predict}
              unit="Psi."
            />
            <SmallCard
              iconType="p"
              value={currentData.p_side_pressure || 0}
              prediction={currentData.p_side_pressure_predict}
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
              percentage={currentData.mill_extraction}
              prediction={currentData.mill_extraction_predict}
            />
          </div>
          <div className="flex flex-col justify-between w-1/5 mr-[25px]">
            <TargetCard
              iconType="pol"
              first={currentData.pol_first_bagasse_percentage || 0}
              shredded={currentData.pol_shredded_cane_percentage || 0}
            />
          </div>
          <div className="flex flex-col justify-between w-1/5 mr-[25px]">
            <TargetCard
              iconType="fiber"
              first={currentData.fiber_first_bagasse_percentage || 0}
              shredded={currentData.fiber_shredded_cane_percentage || 0}
            />
          </div>
          <div className="flex flex-col justify-between w-1/5 mr-[25px]">
            <TargetCard
              iconType="moisture"
              first={currentData.moisture_first_bagasse_percentage || 0}
              shredded={currentData.moisture_shredded_cane_percentage || 0}
            />
          </div>
          <div className="w-1/5">
            <ChuteLevelCard percentage={currentData.chute_level} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-7/12 mr-[25px]">
            <MillOperationalCard
              millData={{
                fiber: [
                  40.93188666666666, 41.53821538461538, 42.1766, 40.85375555555556,
                  42.2286875, 42.222813333333335, 42.135106666666665, 42.10496153846154
                ],
                moisture: [
                  42.52235333333333, 42.26698461538462, 42.478275, 44.005766666666666,
                  41.3603375, 41.31212, 41.73322, 41.49173846153846
                ],
                pol: [
                  14.793233333333331, 14.21696153846154, 13.360375, 13.929655555555556,
                  13.486225, 13.5652, 13.666266666666669, 13.695607692307693
                ],
                firstMillExtraction: [
                  72.89335333333334, 74.16583076923077, 75.059675, 74.77127777777778,
                  76.2900625, 75.81694666666667, 76.1747, 74.00877692307692
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
