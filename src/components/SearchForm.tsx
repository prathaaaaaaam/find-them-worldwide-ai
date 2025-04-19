
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Filter, Globe, Search } from "lucide-react";

const SearchForm = ({ onSearch }: { onSearch: () => void }) => {
  const [searchRadius, setSearchRadius] = useState([500]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Missing Person Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="Enter first name" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Enter last name" className="mt-1" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <Label htmlFor="age">Age (Approximate)</Label>
          <Input id="age" type="number" placeholder="e.g. 45" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select>
            <SelectTrigger id="gender" className="mt-1">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="lastSeen">Last Seen Date</Label>
          <div className="flex mt-1">
            <Input id="lastSeen" type="date" className="rounded-r-none" />
            <Button variant="outline" size="icon" className="rounded-l-none border-l-0">
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <Label htmlFor="lastLocation">Last Known Location</Label>
        <div className="flex mt-1">
          <Input id="lastLocation" placeholder="City, Country or Address" />
          <Button variant="outline" size="icon" className="ml-2">
            <Globe className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <Label>Search Radius: {searchRadius} km</Label>
          </div>
          <Slider
            defaultValue={[500]}
            max={5000}
            step={50}
            onValueChange={setSearchRadius}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Local (50km)</span>
            <span>Regional (500km)</span>
            <span>Global (5000km)</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <Label htmlFor="description">Physical Description</Label>
        <Textarea 
          id="description" 
          placeholder="Height, build, hair color, distinguishing features, etc." 
          className="mt-1"
        />
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
        </Button>
        
        <div className="flex items-center space-x-2">
          <Switch id="urgent" />
          <Label htmlFor="urgent" className="text-red-600 font-medium">Mark as Urgent</Label>
        </div>
      </div>
      
      {showAdvanced && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Advanced Search Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Switch id="socialMedia" />
              <Label htmlFor="socialMedia">Social Media Analysis</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="travelRecords" />
              <Label htmlFor="travelRecords">Travel Records (Legal Access)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="publicCameras" />
              <Label htmlFor="publicCameras">Public Camera Networks</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="newsCoverage" />
              <Label htmlFor="newsCoverage">News Coverage Scan</Label>
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="relations">Known Relations</Label>
            <Textarea 
              id="relations" 
              placeholder="Names of family members, friends, or associates who might have information"
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" placeholder="Current or last known job" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="languages">Languages Spoken</Label>
              <Input id="languages" placeholder="e.g. English, Spanish" className="mt-1" />
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-end mt-6">
        <Button 
          type="button" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 flex items-center gap-2"
          onClick={onSearch}
        >
          <Search size={18} />
          Begin Worldwide Search
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
