
// Follow Supabase Edge Function format
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY');
    if (!RAPIDAPI_KEY) {
      console.error('RAPIDAPI_KEY is not set');
      return new Response(
        JSON.stringify({ 
          error: 'API key not configured', 
          message: 'Showing sample data as API key is not configured.',
          hotels: generateMockHotels("Sample Location") 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const API_HOST = "booking-com.p.rapidapi.com";
    const body = await req.json();
    const { location } = body;

    if (!location) {
      return new Response(
        JSON.stringify({ error: 'Location is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Searching hotels for location: ${location}`);

    try {
      // First get the destination ID for the location
      const destinationResponse = await fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${encodeURIComponent(location)}&locale=en-us`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': API_HOST
          }
        }
      );
      
      if (!destinationResponse.ok) {
        console.error(`API error: ${destinationResponse.status} ${destinationResponse.statusText}`);
        return new Response(
          JSON.stringify({ 
            message: `API temporarily unavailable. Showing sample hotels for "${location}"`,
            hotels: generateMockHotels(location)
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const destinations = await destinationResponse.json();
      
      if (!destinations || destinations.length === 0) {
        return new Response(
          JSON.stringify({ 
            message: `No destinations found for "${location}"`, 
            hotels: generateMockHotels(location) 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Get the first matching destination
      const destination = destinations[0];
      
      // Helper function to get formatted date for checkin/checkout
      const getFormattedDate = (daysFromNow) => {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0];
      };
      
      // Now fetch hotels for this destination
      const checkinDate = getFormattedDate(1);
      const checkoutDate = getFormattedDate(3);
      
      console.log(`Fetching hotels for destination ${destination.dest_id} (${destination.name}) with checkin: ${checkinDate}, checkout: ${checkoutDate}`);
      
      const hotelsResponse = await fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id=${destination.dest_id}&dest_type=${destination.dest_type}&room_number=1&adults_number=2&checkin_date=${checkinDate}&checkout_date=${checkoutDate}&filter_by_currency=USD&locale=en-us&units=metric&order_by=popularity`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': API_HOST
          }
        }
      );
      
      if (!hotelsResponse.ok) {
        console.error(`API error: ${hotelsResponse.status} ${hotelsResponse.statusText}`);
        return new Response(
          JSON.stringify({ 
            message: `API temporarily unavailable. Showing sample hotels for "${location}"`,
            hotels: generateMockHotels(location)
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const hotelsData = await hotelsResponse.json();
      
      if (!hotelsData || !hotelsData.result || hotelsData.result.length === 0) {
        return new Response(
          JSON.stringify({ 
            message: `No hotels found in "${location}"`, 
            hotels: generateMockHotels(location) 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Map the API response to our Hotel interface
      const hotels = hotelsData.result.map((hotel) => ({
        id: hotel.hotel_id,
        name: hotel.hotel_name,
        location: `${hotel.address || ''}, ${hotel.city || ''}`.trim(),
        description: hotel.unit_configuration_label || hotel.hotel_name_trans || `${hotel.city_name_en} accommodation`,
        price: parseFloat(hotel.min_total_price) || parseFloat(hotel.price_breakdown?.gross_price) || 100,
        image: hotel.max_photo_url || hotel.main_photo_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&h=500&q=80",
        rating: parseFloat(hotel.review_score) / 2 || 4.0, // Convert from 10 scale to 5 scale
        tags: [hotel.accommodation_type_name, hotel.city_name_en, hotel.review_score_word].filter(Boolean)
      }));
      
      console.log(`Found ${hotels.length} hotels for "${location}"`);
      
      return new Response(
        JSON.stringify({ hotels }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (apiError) {
      console.error("API call error:", apiError);
      // Return mock data instead of throwing an error
      return new Response(
        JSON.stringify({ 
          message: `Error fetching data from API. Showing sample hotels for "${location}"`,
          hotels: generateMockHotels(location)
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error("Error searching hotels:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        message: "Failed to fetch hotels. Showing sample data instead.",
        hotels: generateMockHotels("Sample Location") 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper function to generate mock hotel data based on location
const generateMockHotels = (location: string) => {
  const locationLower = location.toLowerCase();
  
  // Base hotel data with customization based on location
  const baseHotels = [
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
