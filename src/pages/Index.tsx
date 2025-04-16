
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturedRooms from "@/components/FeaturedRooms";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Find Your Perfect Space</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our curated selection of available hotels and rooms. Book instantly with secure payment options.
          </p>
        </div>

        <FeaturedRooms />

        <div className="mt-12 text-center">
          <Card className="p-6 bg-transparent border shadow-lg backdrop-blur-sm max-w-xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Ready to book your stay?</h3>
              <p className="text-gray-700 mb-6">
                Create an account to start booking hotels and enjoy a seamless experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 shadow-md">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
