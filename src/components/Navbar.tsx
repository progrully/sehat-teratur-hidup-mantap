
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-imo-blue font-bold text-xl flex items-center">
            <span className="text-imo-green">IMO</span>
            <span className="text-imo-blue ml-1">MANTAP</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-imo-darkText hover:text-imo-blue font-medium">
            Beranda
          </Link>
          <a href="/#tentang" className="text-imo-darkText hover:text-imo-blue font-medium">
            Tentang Program
          </a>
          <a href="/#fitur" className="text-imo-darkText hover:text-imo-blue font-medium">
            Fitur
          </a>
          <a href="/#edukasi" className="text-imo-darkText hover:text-imo-blue font-medium">
            Edukasi
          </a>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button className="bg-imo-green hover:bg-green-700 flex items-center gap-2">
                  <User size={16} />
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-imo-blue text-imo-blue hover:bg-imo-blue hover:text-white flex items-center gap-2"
              >
                <LogOut size={16} />
                Keluar
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button className="bg-imo-blue hover:bg-blue-700">
                Masuk
              </Button>
            </Link>
          )}
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
            <Link 
              to="/"
              className="text-imo-darkText hover:text-imo-blue py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <a 
              href="/#tentang" 
              className="text-imo-darkText hover:text-imo-blue py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang Program
            </a>
            <a 
              href="/#fitur" 
              className="text-imo-darkText hover:text-imo-blue py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Fitur
            </a>
            <a 
              href="/#edukasi" 
              className="text-imo-darkText hover:text-imo-blue py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Edukasi
            </a>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-2 text-imo-darkText hover:text-imo-blue py-2 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={16} />
                  Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full border-imo-blue text-imo-blue hover:bg-imo-blue hover:text-white flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Keluar
                </Button>
              </>
            ) : (
              <Link 
                to="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="bg-imo-blue hover:bg-blue-700 w-full">
                  Masuk
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
