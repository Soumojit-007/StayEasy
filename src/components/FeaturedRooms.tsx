
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BookNowModal from "@/components/BookNowModal";

// Sample room data
const featuredRooms = [
  {
    id: 1,
    title: "Luxury Suite",
    description: "Spacious suite with premium amenities and city views",
    price: 120,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    location: "Downtown",
    tags: ["Luxury", "City View"]
  },
  {
    id: 2,
    title: "Cozy Studio",
    description: "Perfect for solo travelers or couples looking for comfort",
    price: 75,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    location: "Midtown",
    tags: ["Cozy", "Studio"]
  },
  {
    id: 3,
    title: "Conference Room",
    description: "Professional setup for meetings and presentations",
    price: 200,
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    location: "Business District",
    tags: ["Business", "Professional"]
  }
];

const FeaturedRooms = () => {
  const [bookingRoom, setBookingRoom] = useState<typeof featuredRooms[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={room.image} 
                alt={room.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{room.title}</CardTitle>
                <Badge variant="outline" className="bg-primary/10">${room.price}/night</Badge>
              </div>
              <div className="text-sm text-muted-foreground">{room.location}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{room.description}</p>
              <div className="flex gap-2 mt-3">
                {room.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setBookingRoom(room)}>Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {bookingRoom && (
        <BookNowModal 
          isOpen={!!bookingRoom} 
          onClose={() => setBookingRoom(null)} 
          item={bookingRoom} 
        />
      )}
    </>
  );
};

export default FeaturedRooms;
