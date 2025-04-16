
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-violet-600 to-indigo-700 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTMwMCAyNTVRMzU1IDIxNSA0MTAgMjE1UTQ1MCAyMTUgNDcyLjUgMjQwUTQ5NSAyNjUgNDk1IDI5NVE0OTUgMzM1IDQ2OCAzODJRNDQxIDQzMCA0MTAgNDMwUTM2NSA0MzAgMzU3LjUgNDE3LjVRMzUwIDQwNSAzNTAgMzg1UTM1MCAzNTUgMzk1IDM0NVE0NDAgMzM1IDQ0MCAzMDVRNDQwIDI3NSAzOTUgMjYyLjVRMzUwIDI1MCAzMjUgMjUwUTI5MCAyNTAgMjY1IDI3NVEyNDAgMzAwIDI0MCAzMzVRMjQwIDQwMCAyNjUgNDQwUTI5MCA0ODAgMzI1IDQ4MFExOTUgNDgwIDE5NSAzNDVRMTk1IDMwNSAyMjUgMjc1UTI1NSAyNDUgMzAwIDI1NVoiLz4KPC9zdmc+Cg==')]"></div>
      </div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Perfect Stay with Ease
          </h1>
          <p className="text-xl mb-8 text-white">
            Book hotels and rooms securely with traditional payment methods or cryptocurrency.
            No intermediaries, just seamless bookings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-transparent backdrop-blur-sm border border-white text-white hover:bg-white/20 text-lg px-8 py-6">
              <Link to="/explore">Explore Hotels</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20 text-lg px-8 py-6 font-semibold bg-white/10 shadow-lg animate-pulse">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
