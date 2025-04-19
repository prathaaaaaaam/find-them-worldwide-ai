
import { AlertTriangle, Check, AlertCircle, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EthicalGuidelines = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full mx-auto border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <Shield className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Legal & Ethical Guidelines</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Our AI-powered search system operates within strict ethical boundaries and legal frameworks.
        Please review these important constraints and considerations.
      </p>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800">Important Notice</h3>
            <p className="text-sm text-amber-700 mt-1">
              This system is designed to assist in locating missing persons through legal and ethical means.
              It does NOT have access to private cameras, protected databases, or information that would violate
              privacy laws. Results should be used as leads for proper authorities to investigate further.
            </p>
          </div>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">What This System Can Do:</h3>
          <ul className="space-y-2">
            {[
              "Search publicly available social media posts and profiles",
              "Analyze public missing persons databases and registries",
              "Process legally accessible travel records (with proper authorization)",
              "Scan news articles and public reports",
              "Search public-facing cameras in public spaces",
              "Cross-reference information from multiple open sources"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">What This System Cannot Do:</h3>
          <ul className="space-y-2">
            {[
              "Access private security cameras without authorization",
              "Hack into private accounts or secured databases",
              "Bypass security measures or encryption",
              "Access protected health information (PHI)",
              "Violate regional privacy laws or data protection regulations",
              "Provide unauthorized access to government or law enforcement databases"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-red-600 font-bold text-xs">✕</span>
                </div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <h3 className="text-lg font-medium text-gray-800 mb-4">Regulatory Compliance</h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="gdpr">
          <AccordionTrigger className="text-left font-medium">
            GDPR (General Data Protection Regulation)
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            <p>All searches within EU jurisdictions comply with GDPR requirements. This means:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Only publicly available data is accessed</li>
              <li>Data minimization principles are followed</li>
              <li>Search results are temporary and not stored permanently</li>
              <li>No processing of special category data without proper legal basis</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="ccpa">
          <AccordionTrigger className="text-left font-medium">
            CCPA (California Consumer Privacy Act)
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            <p>Searches within California jurisdiction adhere to CCPA guidelines, ensuring:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Transparency in data collection and processing</li>
              <li>Limited retention of personal information</li>
              <li>Opt-out mechanisms for California residents</li>
              <li>Compliance with "Do Not Sell My Personal Information" provisions</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="international">
          <AccordionTrigger className="text-left font-medium">
            International Data Protection Laws
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            <p>Our system adapts to various international privacy frameworks, including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>PIPEDA (Canada)</li>
              <li>LGPD (Brazil)</li>
              <li>POPI Act (South Africa)</li>
              <li>Privacy Act (Australia)</li>
              <li>And other applicable regional regulations</li>
            </ul>
            <p className="mt-2 text-sm">
              Search coverage may be limited in certain jurisdictions due to specific privacy restrictions.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-800">Best Practices</h3>
            <p className="text-sm text-blue-700 mt-1">
              Always work with local authorities when searching for missing persons. This tool is designed
              to supplement official investigations, not replace them. Verify all leads through proper channels
              and respect the privacy of all individuals involved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicalGuidelines;
