
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-imo-blue font-bold text-xl flex items-center">
            <span className="text-imo-green">IMO</span>
            <span className="text-imo-blue ml-1">MANTAP</span>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#beranda" className="text-imo-darkText hover:text-imo-blue font-medium">
            Beranda
          </a>
          <a href="#tentang" className="text-imo-darkText hover:text-imo-blue font-medium">
            Tentang Program
          </a>
          <a href="#fitur" className="text-imo-darkText hover:text-imo-blue font-medium">
            Fitur
          </a>
          <a href="#edukasi" className="text-imo-darkText hover:text-imo-blue font-medium">
            Edukasi
          </a>
          <Button className="bg-imo-blue hover:bg-blue-700">
            Masuk
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-imo-darkText"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <a 
              href="#beranda" 
              className="text-imo-darkText hover:text-imo-blue py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </a>
            <a 
              href="#tentang" 
              className="text-imo-darkText hover:text-imo-blue py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang Program
            </a>
            <a 
              href="#fitur" 
              className="text-imo-darkText hover:text-imo-blue py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Fitur
            </a>
            <a 
              href="#edukasi" 
              className="text-imo-darkText hover:text-imo-blue py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Edukasi
            </a>
            <Button className="bg-imo-blue hover:bg-blue-700 w-full">
              Masuk
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
