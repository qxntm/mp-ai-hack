"use client";
import React, { useState, useEffect } from "react";
import SmallCard from "@/components/SmallCard";
import MillExtractionCard from "@/components/FirstMillExtractionCard";
import ChuteLevelCard from "@/components/ChuteLevelCard";
import MillOperationalCard from "@/components/MillOperationalCard";
import JuiceExtractionCard from "@/components/JuiceExtractionCard";
import dataDisplay from "@/app/data/display.json";
import TargetCard from "@/components/TargetCard";
import PiCard from "@/components/PiCard";
import { useRouter } from "next/navigation";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

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
        <div className="flex items-center justify-between">
          <div className="text-5xl font-bold text-primary-navy-blue">
            Dashboard
          </div>
          <div
            className="hover:opacity-50 hover:cursor-pointer"
            title="Switch View"
            onClick={() => {
              router.push("/");
            }} 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="#062f6e"
              viewBox="0 0 256 256"
            >
              <path d="M237.66,178.34a8,8,0,0,1,0,11.32l-24,24A8,8,0,0,1,200,208V192a72.15,72.15,0,0,1-57.65-30.14l-41.72-58.4A56.1,56.1,0,0,0,55.06,80H32a8,8,0,0,1,0-16H55.06a72.12,72.12,0,0,1,58.59,30.15l41.72,58.4A56.08,56.08,0,0,0,200,176V160a8,8,0,0,1,13.66-5.66ZM143,107a8,8,0,0,0,11.16-1.86l1.2-1.67A56.08,56.08,0,0,1,200,80V96a8,8,0,0,0,13.66,5.66l24-24a8,8,0,0,0,0-11.32l-24-24A8,8,0,0,0,200,48V64a72.15,72.15,0,0,0-57.65,30.14l-1.2,1.67A8,8,0,0,0,143,107Zm-30,42a8,8,0,0,0-11.16,1.86l-1.2,1.67A56.1,56.1,0,0,1,55.06,176H32a8,8,0,0,0,0,16H55.06a72.12,72.12,0,0,0,58.59-30.15l1.2-1.67A8,8,0,0,0,113,149Z"></path>
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-[25px]">
          <div className="grid grid-cols-4 grid-rows-3 gap-[25px]">
            <div className="row-span-2">
              <MillExtractionCard
                percentage={currentData.mill_extraction}
                prediction={currentData.mill_extraction_predict}
              />
            </div>
            <SmallCard
              iconType="psfSpeed"
              value={currentData.psf_speed || 0}
              prediction={currentData.psf_speed_predict}
              unit="rpm"
            />
            <SmallCard
              iconType="crushingSpeed"
              value={currentData.crushing_speed || 0}
              prediction={currentData.crushing_speed_predict}
              unit="rpm"
            />
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
            <SmallCard
              iconType="ratio"
              value={currentData.psf_speed || 0}
              prediction={currentData.psf_speed_predict}
              unit=""
            />
            <SmallCard
              iconType="psfCurrent"
              value={currentData.psf_current || 0}
            />
            <PiCard value={90} />
            <SmallCard
              iconType="crushingCurrent"
              value={currentData.crushing_current || 0}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[25px]">
          <TargetCard
            iconType="pol"
            first={currentData.pol_first_bagasse_percentage || 0}
            shredded={currentData.pol_shredded_cane_percentage || 0}
          />
          <TargetCard
            iconType="fiber"
            first={currentData.fiber_first_bagasse_percentage || 0}
            shredded={currentData.fiber_shredded_cane_percentage || 0}
          />
          <TargetCard
            iconType="moisture"
            first={currentData.moisture_first_bagasse_percentage || 0}
            shredded={currentData.moisture_shredded_cane_percentage || 0}
          />
          <ChuteLevelCard
            percentage={currentData.chute_level}
            prediction={0}
            unit="%"
          />
        </div>
        <MillOperationalCard
          millData={{
            fiber: [
              40.6051, 39.6875, 38.6081, 40.5404, 40.0494, 40.896, 40.9699,
              41.3805, 41.6365, 41.6744, 41.5772, 41.2175, 41.4942, 40.9637,
              42.1571, 40.2315, 40.5053, 39.9865, 39.8573, 41.994, 40.4706,
              40.2389, 40.5503, 40.3257, 40.7402, 40.3609, 40.9626, 41.3707,
              40.9443, 40.5729,
            ],
            moisture: [
              44.4027, 44.7243, 45.6997, 44.8134, 44.0915, 44.0684, 43.0943,
              42.7575, 42.4519, 41.4498, 42.6689, 45.5945, 42.2927, 40.9373,
              42.7644, 45.4002, 44.5717, 44.4456, 44.051, 42.1005, 44.6099,
              44.0119, 43.4203, 43.0338, 43.8973, 43.4767, 43.2455, 42.6233,
              43.8967, 44.0678,
            ],
            pol: [
              14.7377, 15.5517, 16.481, 15.2822, 14.6864, 14.7399, 14.8958,
              14.6352, 13.8682, 13.4403, 13.9674, 14.6446, 14.3913, 13.8698,
              13.8542, 14.6058, 15.1232, 14.8813, 15.2098, 14.2725, 15.9695,
              15.6974, 15.8341, 14.0084, 14.8911, 14.4237, 14.5649, 14.2872,
              15.0261, 15.1092,
            ],
            firstMillExtraction: [
              73.2873, 69.7037, 68.0751, 72.3098, 73.8257, 72.3185, 70.9149,
              73.6007, 76.3253, 76.632, 75.4217, 73.127, 74.107, 76.1959,
              76.4614, 72.9596, 73.9524, 73.8334, 72.3629, 76.044, 73.1249,
              70.6482, 68.9069, 72.3799, 71.0268, 72.8887, 74.8665, 76.0184,
              75.0149, 73.0627,
            ],
          }}
        />
        <JuiceExtractionCard
          juiceData={{
            actual: [
              75.84852857, 75.675675, 79.19410667, 76.92164615, 78.13688,
              77.58235, 76.80775833, 77.9885875, 77.02805, 73.90237692,
              75.78903077, 77.81743571, 77.01234167, 78.27610833, 78.25113333,
              78.64805385, 79.06702143, 78.19972, 76.40006923, 77.44847273,
              79.39926667, 79.68410909, 76.27356667, 75.82001667, 76.27724,
              75.16465556, 76.89938571, 77.17541538, 76.18875714, 77.17044,
            ],
            predict: [
              78.11302947998047, 78.22998046875, 77.77438354492188,
              77.46320343017578, 77.4360122680664, 76.69475555419922,
              76.23036193847656, 77.68696594238281, 78.68258666992188,
              78.71070861816406, 79.14771270751953, 79.036376953125,
              78.951171875, 78.71809387207031, 78.1832046508789,
              77.92611694335938, 78.51300048828125, 78.46075439453125,
              78.29255676269531, 78.23115539550781, 78.23255157470703,
              78.21495056152344, 78.66217041015625, 79.67414093017578,
              80.06708526611328, 79.99750518798828, 79.92992401123047,
              79.68793487548828, 79.52976989746094,
            ],
          }}
        />
      </div>
    </div>
  );
}
