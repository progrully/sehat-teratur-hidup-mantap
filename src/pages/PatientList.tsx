
import React, { useState, useEffect } from "react";
import { Users, Search, UserPlus, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import UserManagementModal from "@/components/UserManagementModal";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status?: string;
  lastCheckup?: string;
}

const PatientList = () => {
  const { user, isAuthenticated, users } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Ensure user is a nurse or admin
  if (user?.role !== "nurse" && user?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  
  // Filter out patients from the users list
  useEffect(() => {
    const patientUsers = users
      .filter(u => u.role === "patient")
      .map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: `+62${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        status: Math.random() > 0.5 ? "Aktif" : "Tidak Aktif",
        lastCheckup: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
          .toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
      }));
    
    setPatients(patientUsers);
  }, [users]);
  
  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewPatient = (patientId: string) => {
    toast.success(`Detail pasien dengan ID ${patientId} akan ditampilkan!`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-imo-darkText">
              Daftar Pasien <span className="text-imo-blue">IMO MANTAP</span>
            </h1>
            <Button 
              onClick={() => window.history.back()}
              variant="outline" 
              className="border-imo-blue text-imo-blue"
            >
              Kembali
            </Button>
          </div>

          <Card className="shadow-md mb-6">
            <CardHeader className="bg-imo-blue text-white pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" /> 
                  <span>Daftar Pasien</span>
                </div>
                <Button 
                  className="bg-white text-imo-blue hover:bg-gray-100"
                  onClick={() => setIsModalOpen(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Tambah Pasien
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Cari pasien berdasarkan nama atau email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-left text-sm">
                      <th className="py-3 px-4 font-medium">Nama</th>
                      <th className="py-3 px-4 font-medium">Kontak</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium">Pemeriksaan Terakhir</th>
                      <th className="py-3 px-4 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {filteredPatients.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                          {searchQuery ? "Tidak ada pasien yang sesuai dengan pencarian" : "Belum ada data pasien"}
                        </td>
                      </tr>
                    ) : (
                      filteredPatients.map(patient => (
                        <tr key={patient.id} className="border-t hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-xs text-gray-500">{patient.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center text-xs mb-1">
                              <Mail className="h-3 w-3 mr-1" />
                              {patient.email}
                            </div>
                            {patient.phone && (
                              <div className="flex items-center text-xs">
                                <Phone className="h-3 w-3 mr-1" />
                                {patient.phone}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              patient.status === "Aktif" 
                                ? "bg-green-100 text-green-700" 
                                : "bg-red-100 text-red-700"
                            }`}>
                              {patient.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs">
                            {patient.lastCheckup || "Belum pernah"}
                          </td>
                          <td className="py-3 px-4">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-imo-blue text-imo-blue text-xs"
                              onClick={() => handleViewPatient(patient.id)}
                            >
                              Detail
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <UserManagementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PatientList;
