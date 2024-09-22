import SmallCard from "@/components/SmallCard";
import MillExtractionCard from "@/components/MillExtractionCard";
import ChuteLevelCard from "@/components/ChuteLevelCard";
import MillOperationalCard from "@/components/MillOperationalCard";
import MillOprCard from "@/components/MillOprCard";

export default function Home() {
  return (
    <div className="bg-custom-bg min-h-screen px-20 py-16 flex flex-col gap-6">
      <div className="text-5xl font-bold text-primary-navy-blue">Dashboard</div>
      <div className="flex min-w-full justify-between flex-initial">
        <div className="w-1/4">
          <MillExtractionCard percentage={80} prediction={90} />
        </div>
        <div className="flex w-1/2 justify-between mx-[25px]">
          <div className="flex flex-col justify-between w-1/2 mr-[25px]">
            <SmallCard iconType="speed" value={5} prediction={6} unit="rpm" />
            <SmallCard
              iconType="g"
              value={2000}
              prediction={2000}
              unit="Psi."
            />
          </div>
          <div className="flex flex-col justify-between w-1/2">
            <SmallCard iconType="ratio" value={1.2} prediction={1.4} unit="" />
            <SmallCard
              iconType="p"
              value={2000}
              prediction={2100}
              unit="Psi."
            />
          </div>
        </div>
        <div className="w-1/4">
          <ChuteLevelCard percentage={80} />
        </div>
      </div>
      <div>
        <div className="w-7/12">
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

        </div>
      </div>
      <div>
        <div className="w-7/12">
          <MillOprCard
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
      </div>
    </div>
  );
}
