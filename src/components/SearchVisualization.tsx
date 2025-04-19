
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Database, Globe, Shield, AlertTriangle } from "lucide-react";
import WorldMap from "./WorldMap";

interface SearchVisualizationProps {
  isSearching: boolean;
  onSearchComplete: () => void;
}

const SearchVisualization = ({ isSearching, onSearchComplete }: SearchVisualizationProps) => {
  const [progress, setProgress] = useState(0);
  const [searchStats, setSearchStats] = useState({
    socialMediaPlatforms: 0,
    publicDatabases: 0,
    cameraNetworks: 0,
    newsSources: 0,
    travelSystems: 0
  });
  const [currentStatus, setCurrentStatus] = useState("Initializing search parameters...");
  const [searchTime, setSearchTime] = useState(0); // in seconds
  const [logs, setLogs] = useState<{message: string, type: string, time: string}[]>([]);
  
  // Search progress simulation
  useEffect(() => {
    if (!isSearching) return;
    
    let interval: number;
    let statusInterval: number;
    let startTime = Date.now();
    
    // Progress bar update
    interval = window.setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 2;
        const newProgress = prev + (prev < 30 ? increment : increment / (prev / 20));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          clearInterval(statusInterval);
          setProgress(100);
          setTimeout(() => onSearchComplete(), 1000);
          return 100;
        }
        
        return newProgress;
      });
      
      // Update search time
      setSearchTime(Math.floor((Date.now() - startTime) / 1000));
      
      // Generate random stat updates
      setSearchStats(prev => ({
        socialMediaPlatforms: Math.min(35, prev.socialMediaPlatforms + (Math.random() > 0.7 ? 1 : 0)),
        publicDatabases: Math.min(128, prev.publicDatabases + (Math.random() > 0.6 ? 1 : 0)),
        cameraNetworks: Math.min(57, prev.cameraNetworks + (Math.random() > 0.8 ? 1 : 0)),
        newsSources: Math.min(312, prev.newsSources + (Math.random() > 0.5 ? 2 : 0)),
        travelSystems: Math.min(43, prev.travelSystems + (Math.random() > 0.85 ? 1 : 0))
      }));
    }, 250);
    
    // Status message updates
    const statusMessages = [
      "Initializing search parameters...",
      "Accessing social media APIs within legal guidelines...",
      "Scanning public missing persons databases...",
      "Processing facial recognition parameters...",
      "Analyzing last known location data...",
      "Checking recent travel records via authorized channels...",
      "Scanning news archives for relevant information...",
      "Cross-referencing data from multiple sources...",
      "Expanding search radius based on initial findings...",
      "Applying temporal analysis to historical data...",
      "Detecting potential patterns in collected information...",
      "Prioritizing matches based on confidence scores...",
      "Preparing results summary and potential leads..."
    ];
    
    // Status update
    statusInterval = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * statusMessages.length);
      const newStatus = statusMessages[randomIndex];
      setCurrentStatus(newStatus);
      
      // Add to log with timestamp
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      const logType = Math.random() > 0.9 ? "warning" : "info";
      
      setLogs(prev => [
        { 
          message: logType === "warning" 
            ? `Access to certain data limited by privacy regulations in some regions` 
            : newStatus, 
          type: logType,
          time: timeString
        },
        ...prev
      ].slice(0, 50));
      
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [isSearching, onSearchComplete]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg w-full mx-auto overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            AI Search Analysis
            {isSearching && <span className="ml-2 text-sm text-blue-600 animate-pulse">Active</span>}
          </h2>
          <div className="flex items-center text-gray-500">
            <Clock size={16} className="mr-1" />
            <span className="text-sm font-medium">{formatTime(searchTime)}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm font-medium">Search Progress</span>
              <p className="text-xs text-gray-500">{currentStatus}</p>
            </div>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <div className="text-xs text-gray-500 mb-1">Social Media</div>
            <div className="text-xl font-semibold text-blue-700">{searchStats.socialMediaPlatforms}</div>
            <div className="text-xs">platforms</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
            <div className="text-xs text-gray-500 mb-1">Databases</div>
            <div className="text-xl font-semibold text-purple-700">{searchStats.publicDatabases}</div>
            <div className="text-xs">records</div>
          </div>
          <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
            <div className="text-xs text-gray-500 mb-1">Camera Networks</div>
            <div className="text-xl font-semibold text-amber-700">{searchStats.cameraNetworks}</div>
            <div className="text-xs">sources</div>
          </div>
          <div className="bg-emerald-50 p-3 rounded-md border border-emerald-100">
            <div className="text-xs text-gray-500 mb-1">News Sources</div>
            <div className="text-xl font-semibold text-emerald-700">{searchStats.newsSources}</div>
            <div className="text-xs">articles</div>
          </div>
          <div className="bg-indigo-50 p-3 rounded-md border border-indigo-100">
            <div className="text-xs text-gray-500 mb-1">Travel Systems</div>
            <div className="text-xl font-semibold text-indigo-700">{searchStats.travelSystems}</div>
            <div className="text-xs">checked</div>
          </div>
        </div>
        
        <Tabs defaultValue="visualization">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visualization">Global Map</TabsTrigger>
            <TabsTrigger value="compliance">Legal Compliance</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visualization" className="mt-4">
            <WorldMap 
              isSearching={isSearching} 
              completionPercentage={Math.round(progress)} 
            />
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-4">
                <Shield className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800">Legal Compliance Status</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    All search operations comply with relevant data protection and privacy laws.
                    This system only accesses publicly available information and legal databases.
                  </p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">GDPR Compliance</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">CCPA Compliance</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">HIPAA Restrictions</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">International Data Transfer</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Limited</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Private CCTV Access</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Restricted</Badge>
                </div>
              </div>
              
              <div className="mt-4 bg-amber-50 p-3 rounded border border-amber-200 flex items-start">
                <AlertTriangle className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <p className="text-sm text-amber-800">
                  Some data sources may be limited by regional privacy laws. Results will prioritize
                  legally accessible information only.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 border-b px-4 py-2 text-sm font-medium text-gray-700 flex justify-between items-center">
                <span>System Activity Logs</span>
                <span className="text-xs text-gray-500">{logs.length} entries</span>
              </div>
              <div className="h-64 overflow-y-auto p-2">
                {logs.map((log, index) => (
                  <div 
                    key={index} 
                    className={`text-xs p-2 rounded mb-1 flex items-start ${
                      log.type === 'warning' ? 'bg-amber-50 text-amber-800' : 'bg-gray-50 text-gray-800'
                    }`}
                  >
                    <span className="text-gray-500 mr-2 font-mono">{log.time}</span>
                    {log.type === 'warning' && <AlertTriangle size={12} className="text-amber-500 mr-1 mt-0.5 flex-shrink-0" />}
                    <span>{log.message}</span>
                  </div>
                ))}
                {logs.length === 0 && (
                  <div className="text-center text-gray-500 py-4">No activity logs yet</div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchVisualization;
