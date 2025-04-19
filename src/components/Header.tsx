
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold">FindThem</h1>
          <span className="text-xs bg-blue-500 px-2 py-1 rounded-full ml-2">Worldwide AI</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#" className="hover:text-blue-200 transition">Dashboard</a>
          <a href="#" className="hover:text-blue-200 transition">Search Tools</a>
          <a href="#" className="hover:text-blue-200 transition">Resources</a>
          <a href="#" className="hover:text-blue-200 transition">Legal Guidelines</a>
          <a href="#" className="hover:text-blue-200 transition">Support</a>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
            <Bell size={18} />
          </Button>
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-blue-700">
            Contact Authorities
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
