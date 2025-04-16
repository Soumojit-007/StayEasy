
import { TabsContent } from "@/components/ui/tabs";
import { HotelItem } from "./HotelCard";
import HotelCard from "./HotelCard";

interface HotelListProps {
  filteredData: HotelItem[];
  viewType: "grid" | "list";
}

const HotelList = ({ filteredData, viewType }: HotelListProps) => {
  if (filteredData.length === 0) {
    return (
      <div className={`text-center py-12 ${viewType === "grid" ? "col-span-3" : ""}`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No hotels found</h3>
        <p className="text-gray-600">Try searching for a different location</p>
      </div>
    );
  }

  if (viewType === "grid") {
    return (
      <TabsContent value="grid" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <HotelCard key={item.id} item={item} viewType="grid" />
          ))}
        </div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="list" className="mt-6">
      <div className="space-y-4">
        {filteredData.map((item) => (
          <HotelCard key={item.id} item={item} viewType="list" />
        ))}
      </div>
    </TabsContent>
  );
};

export default HotelList;
