import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, CreditCard, BanknoteIcon, Cpu, Wifi, UtensilsCrossed, Sunrise, Bed, Bitcoin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format, addDays, differenceInDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { bookHotel } from "@/services/contractService";

interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string | number;
    title?: string;
    name?: string;
    price: number;
    location: string;
  };
}

const BookNowModal = ({ isOpen, onClose, item }: BookNowModalProps) => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [numNights, setNumNights] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [amenities, setAmenities] = useState({
    ac: false,
    wifi: false,
    breakfast: false,
    seaView: false,
    extraBed: false,
  });
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [ethPrice, setEthPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  
  const ETH_USD_RATE = 3500;

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nights = Math.max(1, differenceInDays(checkOutDate, checkInDate));
      setNumNights(nights);
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    const totalInUSD = calculateTotal();
    setEthPrice(totalInUSD / ETH_USD_RATE);
  }, [numNights, amenities]);

  const handleAmenityChange = (amenity: keyof typeof amenities) => {
    setAmenities(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  const calculateTotal = () => {
    const baseCost = typeof item.price === 'number' ? item.price * numNights : 0;
    let additionalCost = 0;
    
    if (amenities.ac) additionalCost += 10 * numNights;
    if (amenities.wifi) additionalCost += 5 * numNights;
    if (amenities.breakfast) additionalCost += 15 * numNights;
    if (amenities.seaView) additionalCost += 20 * numNights;
    if (amenities.extraBed) additionalCost += 25 * numNights;
    
    return baseCost + additionalCost;
  };

  const resetForm = () => {
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setNumNights(1);
    setPaymentMethod("credit-card");
    setAmenities({
      ac: false,
      wifi: false,
      breakfast: false,
      seaView: false,
      extraBed: false,
    });
    setIsBookingComplete(false);
  };

  const handleSubmit = async () => {
    if (!checkInDate) {
      toast.error("Please select a check-in date");
      return;
    }
    
    if (!checkOutDate) {
      toast.error("Please select a check-out date");
      return;
    }
    
    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    try {
      if (paymentMethod === "ethereum") {
        setIsSubmitting(true);
        const newBookingId = await bookHotel({
          hotelId: item.id.toString(),
          checkInDate,
          checkOutDate,
          price: ethPrice,
          amenities
        });
        
        setBookingId(newBookingId);
        setIsSubmitting(false);
        setIsBookingComplete(true);
        toast.success("Your room has been booked successfully on the blockchain!");
      } else {
        setIsBookingComplete(true);
        toast.success("Your room has been booked successfully!");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setIsSubmitting(false);
      toast.error("There was an error processing your booking. Please try again.");
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCheckOutDateSelect = (date: Date | undefined) => {
    if (date && checkInDate && date <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    setCheckOutDate(date);
  };
  
  const handleCheckInDateSelect = (date: Date | undefined) => {
    setCheckInDate(date);
    if (date && checkOutDate && date >= checkOutDate) {
      setCheckOutDate(undefined);
    }
  };

  const itemName = item.name || item.title || "Room";

  if (isBookingComplete) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Booking Confirmed!</DialogTitle>
            <DialogDescription>
              Your reservation has been successfully processed
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-medium text-green-800 mb-2">Booking Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Room:</span> {itemName}</p>
                <p><span className="font-medium">Location:</span> {item.location}</p>
                <p><span className="font-medium">Check-in Date:</span> {checkInDate ? format(checkInDate, "PPP") : ""}</p>
                <p><span className="font-medium">Check-out Date:</span> {checkOutDate ? format(checkOutDate, "PPP") : ""}</p>
                <p><span className="font-medium">Duration:</span> {numNights} night{numNights > 1 ? 's' : ''}</p>
                <p><span className="font-medium">Total Cost:</span> ${calculateTotal().toFixed(2)} {paymentMethod === "ethereum" && `(${ethPrice.toFixed(4)} ETH)`}</p>
                <p><span className="font-medium">Payment Method:</span> {
                  paymentMethod === "credit-card" ? "Credit Card" : 
                  paymentMethod === "cash" ? "Pay at Property" : 
                  "Ethereum"
                }</p>
                {paymentMethod === "ethereum" && bookingId && (
                  <p><span className="font-medium">Booking ID on Blockchain:</span> {bookingId}</p>
                )}
              </div>
            </div>
            
            <div className="text-center text-muted-foreground">
              A confirmation email with all details has been sent to your registered email address.
              {paymentMethod === "ethereum" && (
                <p className="mt-2 text-green-700">
                  Your booking is secured on the blockchain and cannot be altered without your permission.
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book {itemName}</DialogTitle>
          <DialogDescription>
            Complete your booking details for {item.location}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="check-in">Check-in Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="check-in"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkInDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={handleCheckInDateSelect}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="check-out">Check-out Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="check-out"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkOutDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={handleCheckOutDateSelect}
                    initialFocus
                    disabled={(date) => date < (checkInDate ? addDays(checkInDate, 1) : new Date())}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Select Amenities</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ac" 
                  checked={amenities.ac} 
                  onCheckedChange={() => handleAmenityChange('ac')}
                />
                <Label htmlFor="ac" className="flex items-center gap-1">
                  <Cpu className="h-4 w-4" /> AC (+$10/night)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="wifi" 
                  checked={amenities.wifi} 
                  onCheckedChange={() => handleAmenityChange('wifi')}
                />
                <Label htmlFor="wifi" className="flex items-center gap-1">
                  <Wifi className="h-4 w-4" /> WiFi (+$5/night)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="breakfast" 
                  checked={amenities.breakfast} 
                  onCheckedChange={() => handleAmenityChange('breakfast')}
                />
                <Label htmlFor="breakfast" className="flex items-center gap-1">
                  <UtensilsCrossed className="h-4 w-4" /> Breakfast (+$15/night)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sea-view" 
                  checked={amenities.seaView} 
                  onCheckedChange={() => handleAmenityChange('seaView')}
                />
                <Label htmlFor="sea-view" className="flex items-center gap-1">
                  <Sunrise className="h-4 w-4" /> Sea View (+$20/night)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="extra-bed" 
                  checked={amenities.extraBed} 
                  onCheckedChange={() => handleAmenityChange('extraBed')}
                />
                <Label htmlFor="extra-bed" className="flex items-center gap-1">
                  <Bed className="h-4 w-4" /> Extra Bed (+$25/night)
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" /> Credit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-1">
                  <BanknoteIcon className="h-4 w-4" /> Pay at Property
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ethereum" id="ethereum" />
                <Label htmlFor="ethereum" className="flex items-center gap-1">
                  <Bitcoin className="h-4 w-4" /> Ethereum (Blockchain Secured)
                </Label>
              </div>
            </RadioGroup>
            
            {paymentMethod === "ethereum" && (
              <div className="text-sm text-indigo-700 bg-indigo-50 p-3 rounded-md">
                <p>Your booking will be secured on the blockchain with an Ethereum smart contract, providing:</p>
                <ul className="list-disc ml-4 mt-1">
                  <li>Immutable booking proof</li>
                  <li>Guaranteed refund policies</li>
                  <li>No intermediary control</li>
                </ul>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-semibold">
              <span>Total Cost:</span>
              <span>
                ${calculateTotal().toFixed(2)}
                {paymentMethod === "ethereum" && (
                  <span className="ml-2 text-sm text-blue-600">
                    ({ethPrice.toFixed(4)} ETH)
                  </span>
                )}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Base price: ${item.price}/night × {numNights} night{numNights > 1 ? 's' : ''}
            </div>
            {Object.entries(amenities).some(([_, value]) => value) && (
              <div className="text-sm text-muted-foreground">
                + Selected amenities
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm Booking'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookNowModal;
