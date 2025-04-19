
import { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import PhotoUpload from "@/components/PhotoUpload";
import SearchVisualization from "@/components/SearchVisualization";
import ResultsPanel from "@/components/ResultsPanel";
import EthicalGuidelines from "@/components/EthicalGuidelines";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ChevronDown, Info } from "lucide-react";

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [photosUploaded, setPhotosUploaded] = useState(0);
  const [showEthicalGuidelines, setShowEthicalGuidelines] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setShowResults(false);
  };

  const handleSearchComplete = () => {
    setIsSearching(false);
    setShowResults(true);
  };

  const handlePhotosUploaded = (count: number) => {
    setPhotosUploaded(count);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Missing Loved Ones with Guardian Angel</h1>
          <p className="text-gray-600">
            Our AI-powered Guardian Angel system uses ethical and legal methods to help locate missing individuals
            through open-source intelligence and public data.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 flex items-start">
            <Info className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-medium text-blue-800">Personal Information Notice</h3>
              <p className="text-sm text-blue-700 mt-1">
                All searches respect privacy laws and ethical guidelines. We only access publicly available 
                information and legal databases. Results are provided as potential leads for verification.
              </p>
              <Button 
                variant="link" 
                className="text-blue-600 p-0 h-auto text-sm mt-1"
                onClick={() => setShowEthicalGuidelines(!showEthicalGuidelines)}
              >
                <span>{showEthicalGuidelines ? "Hide" : "View"} Legal & Ethical Guidelines</span>
                <ChevronDown 
                  size={14} 
                  className={`ml-1 transition-transform ${showEthicalGuidelines ? "rotate-180" : ""}`} 
                />
              </Button>
            </div>
          </div>
        </div>
        
        {showEthicalGuidelines && (
          <div className="mb-8">
            <EthicalGuidelines />
          </div>
        )}
        
        <div className="space-y-8">
          <SearchForm onSearch={handleSearch} />
          
          <PhotoUpload onPhotosUploaded={handlePhotosUploaded} />
          
          {(isSearching || showResults) && (
            <>
              <div className="my-8">
                <Separator />
              </div>
              
              <SearchVisualization 
                isSearching={isSearching} 
                onSearchComplete={handleSearchComplete} 
              />
              
              <ResultsPanel visible={showResults} />
            </>
          )}
          
          {!isSearching && !showResults && photosUploaded > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Ready to Begin Search</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                You've provided information and uploaded {photosUploaded} photo{photosUploaded !== 1 ? 's' : ''}. 
                Our AI system is ready to begin searching across public databases, social media, and other 
                legal sources to help locate your missing person.
              </p>
              <Button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
              >
                Start Worldwide Search
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  </div>
                  <h2 className="text-lg font-bold text-white">Guardian Angel</h2>
                </div>
                <p className="text-sm text-gray-400 max-w-xs">
                  Helping locate missing persons through ethical AI technology and open-source intelligence.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-gray-200 font-medium mb-3">Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition">Missing Persons Database</a></li>
                    <li><a href="#" className="hover:text-white transition">Legal Guidelines</a></li>
                    <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-gray-200 font-medium mb-3">Support</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition">Contact Authorities</a></li>
                    <li><a href="#" className="hover:text-white transition">24/7 Helpline</a></li>
                    <li><a href="#" className="hover:text-white transition">Report a Sighting</a></li>
                    <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-gray-200 font-medium mb-3">Legal</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition">Data Protection</a></li>
                    <li><a href="#" className="hover:text-white transition">GDPR Compliance</a></li>
                    <li><a href="#" className="hover:text-white transition">Ethics Framework</a></li>
                    <li><a href="#" className="hover:text-white transition">Regulatory Info</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Separator className="bg-gray-700 my-6" />
            
            <div className="text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
              <div>
                &copy; 2024 Guardian Angel Worldwide AI. All rights reserved.
              </div>
              <div className="mt-4 md:mt-0">
                This system operates within legal and ethical boundaries.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
