
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Heart, User } from "lucide-react";

const PatientDashboard = ({ user }: { user: any }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-imo-lightBlue text-imo-darkText">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Selamat Datang, {user.name || "Pasien"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">
            Selamat datang di Dashboard Pasien IMO MANTAP. Di sini Anda dapat memantau jadwal
            pengobatan, melacak tekanan darah, dan mengakses informasi kesehatan penting.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardHeader className="bg-imo-blue pb-2 text-white">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" /> 
              Jadwal Pengobatan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Lihat dan kelola jadwal minum obat hipertensi Anda.
            </p>
            <Button className="w-full bg-imo-blue text-white">
              Lihat Jadwal
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="bg-imo-green pb-2 text-white">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Pemantauan Tekanan Darah
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Catat dan pantau riwayat tekanan darah Anda.
            </p>
            <Button className="w-full bg-imo-green text-white">
              Catat Tekanan Darah
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="bg-imo-blue pb-2 text-white">
            <CardTitle className="text-lg flex items-center gap-2">
              <PillIcon className="h-5 w-5" />
              Informasi Obat
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Akses informasi tentang obat hipertensi Anda.
            </p>
            <Button className="w-full bg-imo-blue text-white">
              Lihat Informasi
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

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

export default PatientDashboard;
