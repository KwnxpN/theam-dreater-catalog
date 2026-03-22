import { Button } from "@/components/ui/button";
import sofaHero from "../../assets/images/sofa_hero.png";

const Hero = () => {
  return (
    <div className="flex px-12">
      <div className="flex grid-cols-2 mx-auto space-x-22 bg-white p-8 rounded-3xl">
        <div className="col-span-1">
          <img src={sofaHero} alt="Hero Image" />
        </div>
        <div className="col-span-1 flex flex-col gap-y-3 justify-center">
          <span className="text-sm text-primary font-semibold">
            SUSTAINABLE LIVING
          </span>
          <h1 className="text-7xl font-bold">
            Refined Living <br /> Through <br /> Nature'n <br /> Design{" "}
          </h1>
          <span className="text-gray-500 tracking-wide font-light text-lg">
            Discover our curated collection of premium <br /> home goods crafted
            with an earth-toned <br /> aesthetic. Timeless pieces for the
            modern, <br /> conscious home.
          </span>
          <div className="flex grid-cols-2 items-center justify-center space-x-5">
            <Button className="col-span-1 rounded-2xl p-5">Shop Collection</Button>
            <Button className="col-span-1 rounded-2xl p-5" variant="secondary">View Lookbook</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero