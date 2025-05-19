
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CalendarCheck, UserCheck } from "lucide-react";

const NurseDashboard = ({ user }: { user: any }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-imo-lightGreen text-imo-darkText">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Selamat Datang, {user.name || "Perawat"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">
            Selamat datang di Dashboard Perawat IMO MANTAP. Di sini Anda dapat memantau pasien, 
            mengelola jadwal pengobatan, dan memberikan dukungan untuk kepatuhan minum obat.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardHeader className="bg-imo-blue pb-2 text-white">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" /> 
              Daftar Pasien
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Kelola dan pantau daftar pasien hipertensi Anda.
            </p>
            <Button className="w-full bg-imo-blue text-white">
              Lihat Pasien
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="bg-imo-green pb-2 text-white">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" />
              Pengingat Obat
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Atur dan pantau jadwal pengobatan untuk pasien.
            </p>
            <Button className="w-full bg-imo-green text-white">
              Kelola Pengingat
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="bg-imo-blue pb-2 text-white">
            <CardTitle className="text-lg flex items-center gap-2">
              <MedicalReportIcon className="h-5 w-5" />
              Laporan Kepatuhan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Lihat laporan kepatuhan minum obat pasien.
            </p>
            <Button className="w-full bg-imo-blue text-white">
              Lihat Laporan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Custom Medical Report icon component
const MedicalReportIcon = ({ className }: { className?: string }) => (
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
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </svg>
);

export default NurseDashboard;
