
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Bed, 
  WifiIcon, 
  CircleDollarSign, 
  CreditCard, 
  Utensils, 
  AirVent, 
  Sun, 
  CloudSun
} from "lucide-react";
import { useState } from "react";

interface FilterPanelProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

const FilterPanel = ({ isFilterOpen, setIsFilterOpen }: FilterPanelProps) => {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  return (
    <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <CollapsibleContent>
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <Label className="mb-2 flex items-center gap-2 font-medium">
                  <CircleDollarSign className="h-4 w-4" />
                  Price Range
                </Label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span>-</span>
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Room Type */}
              <div>
                <Label className="mb-2 flex items-center gap-2 font-medium">
                  <Bed className="h-4 w-4" />
                  Room Type
                </Label>
                <div className="space-y-2">
                  {["Hotel", "Apartment", "Villa", "Office", "Cabin"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={`type-${type}`} />
                      <label
                        htmlFor={`type-${type}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Basic Amenities */}
              <div>
                <Label className="mb-2 flex items-center gap-2 font-medium">
                  <WifiIcon className="h-4 w-4" />
                  Basic Amenities
                </Label>
                <div className="space-y-2">
                  {[
                    { name: "WiFi", icon: <WifiIcon className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "Kitchen", icon: <Utensils className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "Air Conditioning", icon: <AirVent className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "Pool", icon: <CloudSun className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "Parking", icon: <CreditCard className="h-3.5 w-3.5 text-gray-500" /> }
                  ].map((amenity) => (
                    <div key={amenity.name} className="flex items-center space-x-2">
                      <Checkbox id={`amenity-${amenity.name}`} />
                      <label
                        htmlFor={`amenity-${amenity.name}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1.5"
                      >
                        {amenity.icon}
                        {amenity.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Climate Control */}
              <div>
                <Label className="mb-2 flex items-center gap-2 font-medium">
                  <AirVent className="h-4 w-4" />
                  Climate Control
                </Label>
                <RadioGroup defaultValue="both">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ac" id="ac" />
                    <label htmlFor="ac" className="text-sm font-medium leading-none flex items-center gap-1.5">
                      <AirVent className="h-3.5 w-3.5 text-gray-500" />
                      Air Conditioned
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nonac" id="nonac" />
                    <label htmlFor="nonac" className="text-sm font-medium leading-none">Non-AC</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="bothac" />
                    <label htmlFor="bothac" className="text-sm font-medium leading-none">Both</label>
                  </div>
                </RadioGroup>
              </div>

              {/* View Type */}
              <div>
                <Label className="mb-2 flex items-center gap-2 font-medium">
                  <Sun className="h-4 w-4" />
                  View Type
                </Label>
                <div className="space-y-2">
                  {[
                    { name: "Sea View", icon: <CloudSun className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "Mountain View", icon: <Sun className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "City View", icon: <Sun className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "Garden View", icon: <Sun className="h-3.5 w-3.5 text-gray-500" /> }
                  ].map((view) => (
                    <div key={view.name} className="flex items-center space-x-2">
                      <Checkbox id={`view-${view.name}`} />
                      <label
                        htmlFor={`view-${view.name}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1.5"
                      >
                        {view.icon}
                        {view.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meal Options */}
              <div>
                <Label className="mb-2 flex items-center gap-2 font-medium">
                  <Utensils className="h-4 w-4" />
                  Meal Options
                </Label>
                <div className="space-y-2">
                  {[
                    { name: "Breakfast Included", icon: <Utensils className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "All Meals", icon: <Utensils className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "Room Service", icon: <Utensils className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "Restaurant on Site", icon: <Utensils className="h-3.5 w-3.5 text-gray-500" /> }
                  ].map((meal) => (
                    <div key={meal.name} className="flex items-center space-x-2">
                      <Checkbox id={`meal-${meal.name}`} />
                      <label
                        htmlFor={`meal-${meal.name}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1.5"
                      >
                        {meal.icon}
                        {meal.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Options */}
              <div>
                <Label className="mb-2 flex items-center gap-2 font-medium">
                  <CreditCard className="h-4 w-4" />
                  Payment Options
                </Label>
                <div className="space-y-2">
                  {[
                    { name: "Pay at Hotel", icon: <CircleDollarSign className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "Pay Now", icon: <CreditCard className="h-3.5 w-3.5 text-gray-500" /> },
                    { name: "Free Cancellation", icon: <CreditCard className="h-3.5 w-3.5 text-gray-500" /> }
                  ].map((payment) => (
                    <div key={payment.name} className="flex items-center space-x-2">
                      <Checkbox id={`payment-${payment.name}`} />
                      <label
                        htmlFor={`payment-${payment.name}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1.5"
                      >
                        {payment.icon}
                        {payment.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                }}
              >
                Reset
              </Button>
              <Button>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterPanel;
