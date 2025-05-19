
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const NurseDashboard = ({ user }: { user: any }) => {
  const handleViewPatients = () => {
    toast.success("Daftar pasien ditampilkan!");
  };
  
  const handleManageReminders = () => {
    toast.success("Pengingat obat berhasil dibuka!");
  };
  
  const handleViewReports = () => {
    toast.success("Laporan kepatuhan pasien ditampilkan!");
  };

  return (
    <div className="space-y-6">
      <Card className="border-imo-green shadow-md">
        <CardHeader className="bg-gradient-to-r from-green-100 to-imo-lightGreen text-imo-darkText">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-imo-green" />
            Selamat Datang, {user?.name || "Perawat"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">
            Selamat datang di Dashboard Perawat IMO MANTAP. Di sini Anda dapat memantau pasien, 
            mengelola jadwal pengobatan, dan memberikan dukungan untuk kepatuhan minum obat.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-hover shadow-md border-imo-blue">
          <CardHeader className="bg-imo-blue text-white pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" /> 
              Daftar Pasien
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Kelola dan pantau daftar pasien hipertensi Anda.
            </p>
            <Link to="/patient-list">
              <Button 
                className="w-full bg-imo-blue text-white hover:bg-blue-700"
                onClick={handleViewPatients}
              >
                Lihat Pasien
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="card-hover shadow-md border-imo-green">
          <CardHeader className="bg-imo-green text-white pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Pengingat Obat
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Atur dan pantau jadwal pengobatan untuk pasien.
            </p>
            <Link to="/medication-reminders">
              <Button 
                className="w-full bg-imo-green text-white hover:bg-green-700"
                onClick={handleManageReminders}
              >
                Kelola Pengingat
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="card-hover shadow-md border-imo-blue">
          <CardHeader className="bg-imo-blue text-white pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Laporan Kepatuhan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Lihat laporan kepatuhan minum obat pasien.
            </p>
            <Link to="/compliance-reports">
              <Button 
                className="w-full bg-imo-blue text-white hover:bg-blue-700"
                onClick={handleViewReports}
              >
                Lihat Laporan
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NurseDashboard;
