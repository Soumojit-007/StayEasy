import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { searchHotelsByLocation, Hotel } from "@/services/hotelApi";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import SearchBar from "@/components/explore/SearchBar";
import FilterPanel from "@/components/explore/FilterPanel";
import HotelList from "@/components/explore/HotelList";
import LoadingState from "@/components/explore/LoadingState";
import { HotelItem } from "@/components/explore/HotelCard";

// Sample room data with more variety (to be used when no search is performed)
const availableRooms: HotelItem[] = [
  {
    id: 1,
    title: "Luxury Suite",
    description: "Spacious suite with premium amenities and city views",
    price: 120,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    location: "Downtown",
    tags: ["Luxury", "City View"],
    type: "hotel"
  },
  {
    id: 2,
    title: "Cozy Studio",
    description: "Perfect for solo travelers or couples looking for comfort",
    price: 75,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    location: "Midtown",
    tags: ["Cozy", "Studio"],
    type: "apartment"
  },
  {
    id: 3,
    title: "Conference Room",
    description: "Professional setup for meetings and presentations",
    price: 200,
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    location: "Business District",
    tags: ["Business", "Professional"],
    type: "office"
  },
  {
    id: 4,
    title: "Beachfront Villa",
    description: "Stunning villa with direct access to the beach",
    price: 350,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    location: "Coastal Area",
    tags: ["Beach", "Luxury"],
    type: "villa"
  },
  {
    id: 5,
    title: "Mountain Cabin",
    description: "Cozy cabin surrounded by beautiful mountain views",
    price: 180,
    image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    location: "Mountain Ridge",
    tags: ["Nature", "Scenic"],
    type: "cabin"
  },
  {
    id: 6,
    title: "Urban Loft",
    description: "Modern loft in the heart of the arts district",
    price: 95,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    location: "Arts District",
    tags: ["Modern", "Urban"],
    type: "apartment"
  }
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  
  // Use react-query to fetch hotels with retry and increased timeout
  const { 
    data: hotels, 
    isLoading, 
    isError, 
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['hotels', locationSearch],
    queryFn: () => searchHotelsByLocation(locationSearch || "New York"),
    enabled: !!locationSearch, // Only fetch when locationSearch has a value
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Retry up to 2 times if the request fails
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff
  });
  
  // Combined data: API hotels (if available) or sample rooms
  const displayData: HotelItem[] = locationSearch && hotels ? hotels : availableRooms;
  
  // Filter the displayed data based on the search term
  const filteredData = displayData.filter(item => {
    const name = 'name' in item ? item.name : item.title;
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  // Handle search submission
  const handleSearch = (term: string) => {
    if (term.trim()) {
      setLocationSearch(term);
      refetch();
    } else {
      toast.error("Please enter a location to search");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Hotels & Rooms</h1>
          <p className="text-gray-600">Find and book your perfect stay from our wide selection</p>
        </div>
        
        <div className="mb-8">
          <SearchBar 
            isLoading={isLoading}
            isFetching={isFetching}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setIsFilterOpen={setIsFilterOpen}
            isFilterOpen={isFilterOpen}
          />
          
          <FilterPanel 
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
        </div>
        
        <LoadingState 
          isLoading={isLoading || isFetching}
          isError={isError}
          onRetry={() => refetch()}
        />
        
        {!isLoading && !isFetching && !isError && (
          <>
            <Tabs defaultValue="grid" className="mb-6" onValueChange={(value) => setViewType(value as "grid" | "list")}>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  {locationSearch ? 
                    `${filteredData.length} hotels found in ${locationSearch}` : 
                    `${filteredData.length} places available`}
                </p>
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </div>
              
              <HotelList 
                filteredData={filteredData}
                viewType={viewType}
              />
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
