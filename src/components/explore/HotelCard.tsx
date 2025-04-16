
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel } from "@/services/hotelApi";
import { MapPin, Star } from "lucide-react";
import BookNowModal from "@/components/BookNowModal";

// Define a union type for our data items
export type HotelItem = Hotel | {
  id: number | string;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
  tags: string[];
  type?: string;
};

interface HotelCardProps {
  item: HotelItem;
  viewType: "grid" | "list";
}

const HotelCard = ({ item, viewType }: HotelCardProps) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Helper function to handle accessing properties safely with our union type
  const getName = (item: HotelItem): string => {
    return 'name' in item ? item.name : item.title;
  };

  const getImageUrl = (item: HotelItem): string => {
    return item.image;
  };

  return (
    <>
      {viewType === "grid" ? (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={getImageUrl(item)} 
              alt={getName(item)} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&h=500&q=80";
              }}
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{getName(item)}</CardTitle>
              <Badge variant="outline" className="bg-primary/10">
                ${typeof item.price === 'number' ? item.price.toFixed(0) : item.price}/night
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={14} className="mr-1" /> {item.location}
              {'rating' in item && (
                <div className="flex items-center ml-2">
                  <Star size={14} className="text-yellow-500 mr-1 fill-yellow-500" />
                  {typeof item.rating === 'number' ? item.rating.toFixed(1) : item.rating}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{item.description}</p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {item.tags && item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => setIsBookingModalOpen(true)}>Book Now</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
              <img 
                src={getImageUrl(item)} 
                alt={getName(item)} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&h=500&q=80";
                }}
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{getName(item)}</h3>
                <Badge variant="outline" className="bg-primary/10">
                  ${typeof item.price === 'number' ? item.price.toFixed(0) : item.price}/night
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin size={14} className="mr-1" /> {item.location}
                {'rating' in item && (
                  <div className="flex items-center ml-2">
                    <Star size={14} className="text-yellow-500 mr-1 fill-yellow-500" />
                    {typeof item.rating === 'number' ? item.rating.toFixed(1) : item.rating}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {item.tags && item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <Button onClick={() => setIsBookingModalOpen(true)}>Book Now</Button>
            </div>
          </div>
        </Card>
      )}

      <BookNowModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        item={item} 
      />
    </>
  );
};

export default HotelCard;
