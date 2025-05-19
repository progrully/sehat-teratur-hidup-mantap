
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, PlusCircle, Bell } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Custom Pill icon component
const PillIcon = ({ className }: { className?: string }) => (
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
    <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h7l-3.5 17z"></path>
    <path d="M20 8h-7l3.5 17h3.5a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"></path>
  </svg>
);

const PatientDashboard = ({ user }: { user: any }) => {
  const handleViewSchedule = () => {
    toast.success("Jadwal pengobatan Anda ditampilkan!");
  };
  
  const handleRecordBloodPressure = () => {
    toast.success("Pencatatan tekanan darah berhasil dibuka!");
  };
  
  const handleViewMedInfo = () => {
    toast.success("Informasi obat ditampilkan!");
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-imo-blue shadow-md">
        <CardHeader className="bg-gradient-to-r from-imo-lightBlue to-blue-100 text-imo-darkText">
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-imo-blue" />
            Selamat Datang, {user?.name || "Pasien"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">
            Selamat datang di Dashboard Pasien IMO MANTAP. Di sini Anda dapat memantau jadwal
            pengobatan, melacak tekanan darah, dan mengakses informasi kesehatan penting.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="card-hover shadow-md border-imo-blue">
          <CardHeader className="bg-imo-blue text-white pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" /> 
              Jadwal Pengobatan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Lihat dan kelola jadwal minum obat hipertensi Anda.
            </p>
            <Link to="/medication-schedule">
              <Button 
                className="w-full bg-imo-blue text-white hover:bg-blue-700"
                onClick={handleViewSchedule}
              >
                Lihat Jadwal
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="card-hover shadow-md border-imo-green">
          <CardHeader className="bg-imo-green text-white pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Pemantauan Tekanan Darah
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Catat dan pantau riwayat tekanan darah Anda.
            </p>
            <Link to="/blood-pressure">
              <Button 
                className="w-full bg-imo-green text-white hover:bg-green-700"
                onClick={handleRecordBloodPressure}
              >
                Catat Tekanan Darah
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="card-hover shadow-md border-imo-blue">
          <CardHeader className="bg-imo-blue text-white pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PillIcon className="h-5 w-5" />
              Informasi Obat
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Akses informasi tentang obat hipertensi Anda.
            </p>
            <Link to="/medication-info">
              <Button 
                className="w-full bg-imo-blue text-white hover:bg-blue-700"
                onClick={handleViewMedInfo}
              >
                Lihat Informasi
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="card-hover shadow-md border-imo-green">
          <CardHeader className="bg-imo-green text-white pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Pengingat Obat
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Atur dan kelola pengingat minum obat Anda.
            </p>
            <Link to="/medication-reminders">
              <Button 
                className="w-full bg-imo-green text-white hover:bg-green-700"
              >
                Pengingat Obat
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
