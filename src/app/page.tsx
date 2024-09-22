import SmallCard from "@/components/SmallCard";
import MillExtractionCard from "@/components/MillExtractionCard";

export default function Home() {
  return (
    <div className="bg-custom-bg min-h-screen px-20 py-16 flex flex-col gap-6">
      <div className="text-5xl font-bold text-primary-navy-blue">
        Dashboard
      </div>
      <div className="flex min-w-full justify-between flex-initial">
        <div className="w-1/4">
          <MillExtractionCard percentage={80} prediction={90}/>
        </div>
        <div className="flex w-1/2 justify-between mx-[25px]">
          <div className="flex flex-col justify-between w-1/2 mr-[25px]">
            <SmallCard iconType="speed" value={5} prediction={6} unit='rpm' />
            <SmallCard iconType="g" value={2000} prediction={2100} unit='Psi.' />
          </div>
          <div className="flex flex-col justify-between w-1/2">
            <SmallCard iconType="ratio" value={'1/1.3'} prediction={'1/1.4'} unit=''/>
            <SmallCard iconType="p" value={2000} prediction={2100} unit='Psi.' />
          </div>
        </div>
        <div className="w-1/4">
          <MillExtractionCard percentage={80} prediction={90}/>
        </div>
      </div>
    </div>
  );
}
