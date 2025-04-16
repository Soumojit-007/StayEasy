
// import { toast } from "sonner";
// import { supabase } from "@/integrations/supabase/client";
// const HOTELBEDS_API_KEY = import.meta.env.VITE_HOTELBEDS_API_KEY;

// // Define types for hotel data
// export interface Hotel {
//   id: string;
//   name: string;
//   location: string;
//   description: string;
//   price: number;
//   image: string;
//   rating: number;
//   tags: string[];
// }

// // Function to search hotels by location
// export const searchHotelsByLocation = async (location: string): Promise<Hotel[]> => {
//   try {
//     toast.info(`Searching for hotels in ${location}...`);
    
//     // Call our Supabase edge function
//     const { data, error } = await supabase.functions.invoke('search-hotels', {
//       body: { location }
//     });
    
//     if (error) {
//       console.error("Error calling search-hotels function:", error);
//       toast.error("Failed to fetch hotels. Showing sample data instead.");
//       return generateMockHotels(location);
//     }
    
//     if (data.message) {
//       // Show any messages from the API
//       toast.info(data.message);
//     }
    
//     if (!data.hotels || data.hotels.length === 0) {
//       toast.warning(`No hotels found for "${location}"`);
//       return generateMockHotels(location);
//     }
    
//     toast.success(`Found ${data.hotels.length} hotels in ${location}`);
//     return data.hotels;
//   } catch (error) {
//     console.error("Error searching hotels:", error);
//     toast.error("Failed to fetch hotels. Showing sample data instead.");
    
//     // Return fallback mock data in case the API fails
//     return generateMockHotels(location);
//   }
// };

// // Fallback: Helper function to generate mock hotel data based on location
// const generateMockHotels = (location: string): Hotel[] => {
//   const locationLower = location.toLowerCase();
  
//   // Base hotel data with customization based on location
//   const baseHotels: Hotel[] = [
//     {
//       id: `${locationLower}-1`,
//       name: `${location} Grand Hotel`,
//       location: `Downtown ${location}`,
//       description: `Luxury hotel in the heart of ${location} with excellent amenities.`,
//       price: 120 + Math.floor(Math.random() * 80),
//       image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//       rating: 4.5,
//       tags: ["Luxury", "Pool", "Spa"]
//     },
//     {
//       id: `${locationLower}-2`,
//       name: `${location} Plaza Inn`,
//       location: `Central ${location}`,
//       description: `Comfortable and affordable accommodations in ${location}.`,
//       price: 80 + Math.floor(Math.random() * 50),
//       image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//       rating: 4.0,
//       tags: ["Business", "WiFi", "Breakfast"]
//     },
//     {
//       id: `${locationLower}-3`,
//       name: `Seaside ${location} Resort`,
//       location: `${location} Beach Area`,
//       description: `Beautiful beachfront resort with stunning views in ${location}.`,
//       price: 150 + Math.floor(Math.random() * 100),
//       image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//       rating: 4.8,
//       tags: ["Beach", "Luxury", "Pool"]
//     },
//     {
//       id: `${locationLower}-4`,
//       name: `${location} Budget Stay`,
//       location: `North ${location}`,
//       description: `Affordable lodging for budget travelers in ${location}.`,
//       price: 60 + Math.floor(Math.random() * 30),
//       image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//       rating: 3.5,
//       tags: ["Budget", "Parking", "WiFi"]
//     },
//     {
//       id: `${locationLower}-5`,
//       name: `${location} Boutique Hotel`,
//       location: `Historic District, ${location}`,
//       description: `Charming boutique hotel in the historic part of ${location}.`,
//       price: 110 + Math.floor(Math.random() * 60),
//       image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//       rating: 4.6,
//       tags: ["Boutique", "Historic", "Restaurant"]
//     },
//     {
//       id: `${locationLower}-6`,
//       name: `Modern ${location} Suites`,
//       location: `Business District, ${location}`,
//       description: `Contemporary all-suite hotel ideal for extended stays in ${location}.`,
//       price: 130 + Math.floor(Math.random() * 70),
//       image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//       rating: 4.3,
//       tags: ["Suites", "Modern", "Kitchen"]
//     }
//   ];
  
//   return baseHotels;
// };

// // Helper function to get formatted date for checkin/checkout - kept for reference
// const getFormattedDate = (daysFromNow: number): string => {
//   const date = new Date();
//   date.setDate(date.getDate() + daysFromNow);
//   return date.toISOString().split('T')[0];
// };

















import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Inject the API key from the .env.local file
const HOTELBEDS_API_KEY = import.meta.env.VITE_HOTELBEDS_API_KEY;

// Define types for hotel data
export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  tags: string[];
}

// Function to search hotels by location
export const searchHotelsByLocation = async (location: string): Promise<Hotel[]> => {
  try {
    toast.info(`Searching for hotels in ${location}...`);

    // Example: Optional direct Hotelbeds API call (uncomment if replacing Supabase)
    /*
    const response = await fetch(`https://api.test.hotelbeds.com/some-endpoint?location=${location}`, {
      method: 'GET',
      headers: {
        'Api-Key': HOTELBEDS_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const hotelbedsData = await response.json();
    console.log("Hotelbeds response:", hotelbedsData);
    // Transform hotelbedsData to match Hotel[] format if needed
    */

    // Default: Use Supabase Edge Function (still working as intended)
    const { data, error } = await supabase.functions.invoke('search-hotels', {
      body: { location }
    });

    if (error) {
      console.error("Error calling search-hotels function:", error);
      toast.error("Failed to fetch hotels. Showing sample data instead.");
      return generateMockHotels(location);
    }

    if (data.message) {
      toast.info(data.message);
    }

    if (!data.hotels || data.hotels.length === 0) {
      toast.warning(`No hotels found for "${location}"`);
      return generateMockHotels(location);
    }

    toast.success(`Found ${data.hotels.length} hotels in ${location}`);
    return data.hotels;
  } catch (error) {
    console.error("Error searching hotels:", error);
    toast.error("Failed to fetch hotels. Showing sample data instead.");
    return generateMockHotels(location);
  }
};

// Fallback: Helper function to generate mock hotel data based on location
const generateMockHotels = (location: string): Hotel[] => {
  const locationLower = location.toLowerCase();

  const baseHotels: Hotel[] = [
    {
      id: `${locationLower}-1`,
      name: `${location} Grand Hotel`,
      location: `Downtown ${location}`,
      description: `Luxury hotel in the heart of ${location} with excellent amenities.`,
      price: 120 + Math.floor(Math.random() * 80),
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.5,
      tags: ["Luxury", "Pool", "Spa"]
    },
    {
      id: `${locationLower}-2`,
      name: `${location} Plaza Inn`,
      location: `Central ${location}`,
      description: `Comfortable and affordable accommodations in ${location}.`,
      price: 80 + Math.floor(Math.random() * 50),
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.0,
      tags: ["Business", "WiFi", "Breakfast"]
    },
    {
      id: `${locationLower}-3`,
      name: `Seaside ${location} Resort`,
      location: `${location} Beach Area`,
      description: `Beautiful beachfront resort with stunning views in ${location}.`,
      price: 150 + Math.floor(Math.random() * 100),
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.8,
      tags: ["Beach", "Luxury", "Pool"]
    },
    {
      id: `${locationLower}-4`,
      name: `${location} Budget Stay`,
      location: `North ${location}`,
      description: `Affordable lodging for budget travelers in ${location}.`,
      price: 60 + Math.floor(Math.random() * 30),
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 3.5,
      tags: ["Budget", "Parking", "WiFi"]
    },
    {
      id: `${locationLower}-5`,
      name: `${location} Boutique Hotel`,
      location: `Historic District, ${location}`,
      description: `Charming boutique hotel in the historic part of ${location}.`,
      price: 110 + Math.floor(Math.random() * 60),
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.6,
      tags: ["Boutique", "Historic", "Restaurant"]
    },
    {
      id: `${locationLower}-6`,
      name: `Modern ${location} Suites`,
      location: `Business District, ${location}`,
      description: `Contemporary all-suite hotel ideal for extended stays in ${location}.`,
      price: 130 + Math.floor(Math.random() * 70),
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.3,
      tags: ["Suites", "Modern", "Kitchen"]
    }
  ];

  return baseHotels;
};








