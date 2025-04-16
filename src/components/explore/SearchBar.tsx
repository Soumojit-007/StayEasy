
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { toast } from "sonner";

interface SearchBarProps {
  isLoading: boolean;
  isFetching: boolean;
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setIsFilterOpen: (isOpen: boolean) => void;
  isFilterOpen: boolean;
}

const SearchBar = ({
  isLoading,
  isFetching,
  onSearch,
  searchTerm,
  setSearchTerm,
  setIsFilterOpen,
  isFilterOpen
}: SearchBarProps) => {
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    } else {
      toast.error("Please enter a location to search");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Search by city, country, or hotel name" 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button 
        type="submit"
        className="md:w-auto"
        disabled={isLoading || isFetching}
      >
        {isLoading || isFetching ? 'Searching...' : 'Search Hotels'}
      </Button>
      <Button 
        variant="outline" 
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="md:w-auto w-full flex items-center gap-2"
        type="button"
      >
        <Filter size={18} /> Filters
      </Button>
    </form>
  );
};

export default SearchBar;
