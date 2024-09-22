'use client'
import React, { useState, useEffect } from 'react';
import SmallCard from "@/components/SmallCard";
import MillExtractionCard from "@/components/MillExtractionCard";
import ChuteLevelCard from "@/components/ChuteLevelCard";
import MillOperationalCard from "@/components/MillOperationalCard";
import JuiceExtractionCard from "@/components/JuiceExtractionCard";
import data from "@/app/data/output.json"; // Import JSON data

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
    <div className="bg-custom-bg min-h-screen px-20 py-16 flex flex-col gap-6">
      <div className="text-5xl font-bold text-primary-navy-blue">Dashboard</div>
      <div className="flex min-w-full justify-between flex-initial">
        <div className="w-1/4">
          <MillExtractionCard 
            percentage={currentData.first_mill_extraction_percentage} 
            prediction={currentData.prediction_first_mill_extraction} 
          />
        </div>
        <div className="flex w-1/2 justify-between mx-[25px]">
          <div className="flex flex-col justify-between w-1/2 mr-[25px]">
            <SmallCard 
              iconType="speed" 
              value={currentData.mill_speed || 0} 
              prediction={6} 
              unit="rpm" 
            />
            <SmallCard 
              iconType="g" 
              value={currentData.hydraulic_top_cap_pressure || 0} 
              prediction={2000} 
              unit="Psi." 
            />
          </div>
          <div className="flex flex-col justify-between w-1/2">
            <SmallCard 
              iconType="ratio" 
              value={currentData.mill_ratio || 0} 
              prediction={1.4} 
              unit="" 
            />
            <SmallCard 
              iconType="p" 
              value={currentData.hydraulic_top_cap_pressure || 0} 
              prediction={2100} 
              unit="Psi." 
            />
          </div>
        </div>
        <div className="w-1/4">
          <ChuteLevelCard percentage={80} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-7/12 mr-[25px]">
          <MillOperationalCard
            millData={{
              millSpeed: [
                5.71165, 11.44813, 11.44295, 5.70069, 5.73559, 5.71442, 5.71299,
                5.72897,
              ],
              millRatio: [
                1.27885, 2.55823, 2.55483, 1.27673, 1.27806, 1.27519, 1.28007,
                1.2765,
              ],
              gSidePressure: [
                3061.61, 6126.67, 6133.87, 3070.36, 3066.35, 3065.66, 3069.34,
                3068.42,
              ],
              pSidePressure: [
                2917.16, 5854.95, 5866.31, 2947.32, 2944.64, 2931.4, 2936.46,
                2936.95,
              ],
              firstMillExtraction: [
                70.6455, 141.3713, 145.0071, 74.8984, 68.9943, 70.0832, 74.6836,
                75.4253,
              ],
            }}
          />
        </div>
        <div className="w-5/12">
          <JuiceExtractionCard
            juiceData={{
              actual: [
                77.3732, 78.6323, 75.9348, 76.0187, 71.5434, 73.1423, 72.4097,
                71.6301,
              ],
              predict: [
                79.0732, 77.1323, 77.6348, 74.5187, 73.24340000000001, 71.6423,
                74.1097, 70.1301,
              ],
            }}
            rmse={5}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-1/4 mr-[25px]">
          <SmallCard iconType="pol" value={currentData.pol_shredded_cane_percentage || 0} />
        </div>
        <div className="w-1/4 mr-[25px]">
          <SmallCard iconType="fiber" value={currentData.fiber_shredded_cane_percentage || 0} />
        </div>
        <div className="w-1/4 mr-[25px]">
          <SmallCard iconType="torque" value={11908.4} />
        </div>
        <div className="w-1/4">
        </div>
      </div>
    </div>
  );
}
