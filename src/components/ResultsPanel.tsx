
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  Star, 
  ExternalLink, 
  Copy, 
  Mail, 
  Phone, 
  Share2,
  Clock,
  Camera,
  Globe,
  MessageSquare
} from "lucide-react";

interface ResultsPanelProps {
  visible: boolean;
}

const ResultsPanel = ({ visible }: ResultsPanelProps) => {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  
  if (!visible) return null;
  
  // Sample data for demonstration
  const potentialMatches = [
    {
      id: 1,
      location: "Portland, Oregon, USA",
      date: "2 days ago",
      confidence: 0.87,
      source: "Social Media Post",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop",
      details: "Individual with similar features spotted in local farmer's market. Post mentioned recent arrival to the area."
    },
    {
      id: 2,
      location: "Vancouver, BC, Canada",
      date: "5 days ago",
      confidence: 0.72,
      source: "Public Transport Camera",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&h=100&auto=format&fit=crop",
      details: "Person with matching characteristics captured on subway security footage. Destination unknown."
    },
    {
      id: 3,
      location: "Seattle, Washington, USA",
      date: "1 week ago",
      confidence: 0.65,
      source: "Hotel Registry",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=100&h=100&auto=format&fit=crop",
      details: "Individual with similar name checked into downtown hotel. Stay duration was approximately 3 days."
    }
  ];
  
  // Automatically select first match if none selected
  if (selectedMatch === null && potentialMatches.length > 0) {
    setSelectedMatch(potentialMatches[0].id);
  }
  
  const selectedData = potentialMatches.find(match => match.id === selectedMatch);
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.6) return "text-amber-600";
    return "text-red-600";
  };
  
  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800 border-green-200";
    if (confidence >= 0.6) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-red-100 text-red-800 border-red-200";
  };
  
  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return "High";
    if (confidence >= 0.6) return "Medium";
    return "Low";
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden border border-blue-200">
      <div className="bg-blue-50 p-4 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue-900">Potential Matches Found</h2>
          <Badge variant="outline" className="bg-blue-100 border-blue-200 text-blue-800">
            {potentialMatches.length} Results
          </Badge>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          These results are potential leads that require verification. Always consult with local authorities.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Left sidebar - matches list */}
        <div className="md:w-1/3 border-r border-gray-200">
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-700 flex items-center justify-between">
              <span>Potential Matches</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Filter
              </Button>
            </div>
          </div>
          
          <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
            {potentialMatches.map(match => (
              <div 
                key={match.id}
                className={`p-4 border-b border-gray-100 flex cursor-pointer hover:bg-gray-50 transition ${
                  selectedMatch === match.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => setSelectedMatch(match.id)}
              >
                <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 mr-3">
                  <img 
                    src={match.image} 
                    alt="Person" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-gray-900 truncate">
                      {match.location}
                    </div>
                    <Badge variant="outline" className={getConfidenceBadge(match.confidence)}>
                      {getConfidenceLabel(match.confidence)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    <Calendar size={12} className="mr-1" />
                    {match.date}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 truncate">
                    {match.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side - match details */}
        <div className="md:w-2/3 p-6">
          {selectedData ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Match Details</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Reported {selectedData.date} via {selectedData.source}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`text-lg font-bold ${getConfidenceColor(selectedData.confidence)}`}>
                    {Math.round(selectedData.confidence * 100)}% Match
                  </div>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star}
                        size={14}
                        className={star <= Math.round(selectedData.confidence * 5) 
                          ? "text-amber-400 fill-amber-400" 
                          : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex mb-6">
                <div className="h-32 w-32 rounded-lg overflow-hidden flex-shrink-0 mr-4 border border-gray-200">
                  <img 
                    src={selectedData.image} 
                    alt="Person" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center text-gray-700 mb-3">
                    <MapPin size={16} className="mr-2 text-blue-500" />
                    <span className="font-medium">{selectedData.location}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {selectedData.details}
                  </p>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-800 flex items-start">
                    <AlertTriangle size={16} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      This information should be verified through official channels. Contact local law enforcement with this lead.
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <Tabs defaultValue="actions">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="actions">Next Steps</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="actions" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                      <Phone size={16} className="mr-2" />
                      Contact Local Authorities
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Mail size={16} className="mr-2" />
                      Email Report Details
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Copy size={16} className="mr-2" />
                      Copy Case Reference
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Share2 size={16} className="mr-2" />
                      Share with Trusted Contact
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">Local Resources</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Portland Police Department</span>
                        <a href="#" className="text-blue-600 hover:underline flex items-center">
                          View Contact <ExternalLink size={12} className="ml-1" />
                        </a>
                      </li>
                      <li className="flex justify-between">
                        <span>Oregon Missing Persons Unit</span>
                        <a href="#" className="text-blue-600 hover:underline flex items-center">
                          View Contact <ExternalLink size={12} className="ml-1" />
                        </a>
                      </li>
                      <li className="flex justify-between">
                        <span>Local FBI Field Office</span>
                        <a href="#" className="text-blue-600 hover:underline flex items-center">
                          View Contact <ExternalLink size={12} className="ml-1" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="evidence" className="mt-4">
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                        <span className="font-medium text-gray-700">Social Media Activity</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">Primary Source</Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start space-x-3 mb-3">
                          <MessageSquare size={16} className="text-gray-500 mt-1" />
                          <div>
                            <div className="text-sm">
                              Comment posted on local community page mentioning new arrival to Portland area.
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <Clock size={12} className="mr-1" />
                              Posted: June 12, 2024
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs h-7 flex items-center">
                          <ExternalLink size={12} className="mr-1" />
                          View Source (Restricted)
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                        <span className="font-medium text-gray-700">Visual Evidence</span>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">Unverified</Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start space-x-3 mb-3">
                          <Camera size={16} className="text-gray-500 mt-1" />
                          <div>
                            <div className="text-sm">
                              Low resolution image from public space showing individual with similar appearance.
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <Clock size={12} className="mr-1" />
                              Captured: June 14, 2024
                            </div>
                          </div>
                        </div>
                        <div className="h-24 w-24 bg-gray-200 rounded overflow-hidden mb-3">
                          {/* Blurred/pixelated image would go here */}
                          <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs text-gray-600">
                            Low Res Image
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Image quality insufficient for positive identification.
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="mt-4">
                  <div className="relative border-l-2 border-gray-200 pl-4 ml-2 space-y-6 py-2">
                    <div className="relative">
                      <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-blue-500"></div>
                      <div className="flex justify-between">
                        <h4 className="font-medium">Initial Sighting</h4>
                        <span className="text-sm text-gray-500">June 12, 2024</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        First mention in social media comment on local community page.
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-blue-500"></div>
                      <div className="flex justify-between">
                        <h4 className="font-medium">Visual Confirmation</h4>
                        <span className="text-sm text-gray-500">June 14, 2024</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Low resolution camera footage from farmer's market.
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-gray-300"></div>
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-500">Transportation Record</h4>
                        <span className="text-sm text-gray-500">Pending</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Awaiting verification of local transportation usage.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Match Selected</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Select a potential match from the list to view detailed information and take action.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
