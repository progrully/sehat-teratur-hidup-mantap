
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, UserCog, Shield } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import UserManagementModal from "@/components/UserManagementModal";

// Custom Analytics icon component
const AnalyticsIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 21H4a2 2 0 0 1-2-2V3" />
    <path d="M9 8l3 3 3-3" />
    <path d="M9 16l3-3 3 3" />
  </svg>
);

const AdminDashboard = ({ user }: { user: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleViewAnalytics = () => {
    toast.success("Data analitik program ditampilkan!");
  };
  
  const handleSystemSettings = () => {
    toast.success("Pengaturan sistem dibuka!");
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-purple-400 shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100 text-imo-darkText">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Selamat Datang, {user?.name || "Admin"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">
            Selamat datang di Dashboard Admin IMO MANTAP. Di sini Anda dapat mengelola pengguna, 
            memantau sistem, dan mengakses data analitik program.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-hover shadow-md border-purple-400">
          <CardHeader className="bg-purple-600 text-white pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCog className="h-5 w-5" /> 
              Manajemen Pengguna
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Kelola pasien, perawat, dan admin dalam sistem.
            </p>
            <Button 
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => setIsModalOpen(true)}
            >
              Kelola Pengguna
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover shadow-md border-imo-green">
          <CardHeader className="bg-imo-green text-white pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AnalyticsIcon className="h-5 w-5" />
              Analitik Program
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Lihat statistik dan analitik kepatuhan program.
            </p>
            <Link to="/analytics">
              <Button 
                className="w-full bg-imo-green text-white hover:bg-green-700"
                onClick={handleViewAnalytics}
              >
                Lihat Analitik
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="card-hover shadow-md border-purple-400">
          <CardHeader className="bg-purple-600 text-white pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Pengaturan Sistem
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Konfigurasi pengaturan program IMO MANTAP.
            </p>
            <Link to="/settings">
              <Button 
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
                onClick={handleSystemSettings}
              >
                Pengaturan
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <UserManagementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AdminDashboard;
