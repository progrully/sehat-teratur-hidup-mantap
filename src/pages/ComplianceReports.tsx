
import React from "react";
import { FileText, Users, Calendar, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const complianceData = [
  { name: 'Minggu 1', kepatuhan: 85 },
  { name: 'Minggu 2', kepatuhan: 75 },
  { name: 'Minggu 3', kepatuhan: 90 },
  { name: 'Minggu 4', kepatuhan: 80 },
];

const patientComplianceData = [
  { id: '1', name: 'Budi Santoso', compliance: 90, status: 'Baik', medications: 2, lastWeekChange: '+5%' },
  { id: '4', name: 'Siti Aminah', compliance: 70, status: 'Sedang', medications: 1, lastWeekChange: '-10%' },
  { id: '5', name: 'Agus Prasetyo', compliance: 95, status: 'Baik', medications: 3, lastWeekChange: '+2%' },
  { id: '6', name: 'Dewi Sartika', compliance: 60, status: 'Rendah', medications: 2, lastWeekChange: '-5%' },
  { id: '7', name: 'Ahmad Yani', compliance: 85, status: 'Baik', medications: 1, lastWeekChange: '0%' },
];

const weeklyData = [
  { 
    name: 'Minggu 1', 
    'Amlodipine': 80, 
    'Captopril': 75, 
    'Hydrochlorothiazide': 90 
  },
  { 
    name: 'Minggu 2', 
    'Amlodipine': 85, 
    'Captopril': 70, 
    'Hydrochlorothiazide': 95 
  },
  { 
    name: 'Minggu 3', 
    'Amlodipine': 90, 
    'Captopril': 85, 
    'Hydrochlorothiazide': 85 
  },
  { 
    name: 'Minggu 4', 
    'Amlodipine': 75, 
    'Captopril': 80, 
    'Hydrochlorothiazide': 90 
  },
];

const getComplianceStatusColor = (compliance: number) => {
  if (compliance >= 85) return "text-green-600";
  if (compliance >= 70) return "text-yellow-600";
  return "text-red-600";
};

const getChangeStyle = (change: string) => {
  if (change.startsWith('+')) return "text-green-600";
  if (change.startsWith('-')) return "text-red-600";
  return "text-gray-600";
};

const ComplianceReports = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Ensure user is a nurse or admin
  if (user?.role !== "nurse" && user?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-imo-darkText">
              Laporan Kepatuhan <span className="text-imo-blue">IMO MANTAP</span>
            </h1>
            <Button 
              onClick={() => window.history.back()}
              variant="outline" 
              className="border-imo-blue text-imo-blue"
            >
              Kembali
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-l-4 border-imo-blue">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Pasien</p>
                    <h3 className="text-2xl font-bold text-imo-darkText">5</h3>
                  </div>
                  <Users className="h-10 w-10 text-imo-blue opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-white border-l-4 border-green-500">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Rata-rata Kepatuhan</p>
                    <h3 className="text-2xl font-bold text-imo-darkText">80%</h3>
                  </div>
                  <BarChart className="h-10 w-10 text-green-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-50 to-white border-l-4 border-yellow-500">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Perlu Perhatian</p>
                    <h3 className="text-2xl font-bold text-imo-darkText">1</h3>
                  </div>
                  <FileText className="h-10 w-10 text-yellow-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-white border-l-4 border-purple-500">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Pengingat</p>
                    <h3 className="text-2xl font-bold text-imo-darkText">12</h3>
                  </div>
                  <Calendar className="h-10 w-10 text-purple-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-md mb-6">
            <CardHeader className="bg-imo-blue text-white pb-4">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" /> 
                Laporan Kepatuhan Minum Obat
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
                  <TabsTrigger value="patients">Per Pasien</TabsTrigger>
                  <TabsTrigger value="medications">Per Obat</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div className="h-80">
                      <h3 className="text-lg font-medium mb-2">Tren Kepatuhan Bulanan</h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart
                          data={complianceData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip formatter={(value) => [`${value}%`, 'Kepatuhan']} />
                          <Legend />
                          <Bar dataKey="kepatuhan" fill="#3B82F6" name="Tingkat Kepatuhan (%)" />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h3 className="text-lg font-medium mb-2">Ringkasan</h3>
                      <p className="text-sm mb-2">
                        Laporan kepatuhan bulan ini menunjukkan tingkat rata-rata sebesar <span className="font-medium">80%</span>, 
                        yang meningkat <span className="text-green-600">5%</span> dari bulan sebelumnya.
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Tingkat kepatuhan tertinggi dicapai pada Minggu 3 (90%)</li>
                        <li>Tingkat kepatuhan terendah tercatat pada Minggu 2 (75%)</li>
                        <li>1 pasien membutuhkan perhatian khusus karena tingkat kepatuhan di bawah 65%</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="patients">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-100 text-gray-600 text-left text-sm">
                          <th className="py-3 px-4 font-medium">Nama Pasien</th>
                          <th className="py-3 px-4 font-medium">Kepatuhan</th>
                          <th className="py-3 px-4 font-medium">Status</th>
                          <th className="py-3 px-4 font-medium">Jml Obat</th>
                          <th className="py-3 px-4 font-medium">Perubahan</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm">
                        {patientComplianceData.map(patient => (
                          <tr key={patient.id} className="border-t hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{patient.name}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                  <div 
                                    className={`h-2.5 rounded-full ${
                                      patient.compliance >= 85 ? 'bg-green-500' : 
                                      patient.compliance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${patient.compliance}%` }}
                                  ></div>
                                </div>
                                <span>{patient.compliance}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                patient.status === 'Baik' 
                                  ? 'bg-green-100 text-green-700' 
                                  : patient.status === 'Sedang'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {patient.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">{patient.medications}</td>
                            <td className={`py-3 px-4 ${getChangeStyle(patient.lastWeekChange)}`}>
                              {patient.lastWeekChange}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="medications">
                  <div className="h-80 mb-6">
                    <h3 className="text-lg font-medium mb-2">Kepatuhan Per Jenis Obat</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart
                        data={weeklyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Kepatuhan']} />
                        <Legend />
                        <Bar dataKey="Amlodipine" fill="#3B82F6" />
                        <Bar dataKey="Captopril" fill="#10B981" />
                        <Bar dataKey="Hydrochlorothiazide" fill="#8B5CF6" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Analisis Obat</h3>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      <li>
                        <span className="font-medium text-imo-blue">Amlodipine</span>: 
                        Rata-rata kepatuhan <span className="font-medium">82.5%</span>. 
                        Kepatuhan meningkat di minggu ke-3 dan menurun di minggu ke-4.
                      </li>
                      <li>
                        <span className="font-medium text-green-600">Captopril</span>: 
                        Rata-rata kepatuhan <span className="font-medium">77.5%</span>. 
                        Menunjukkan peningkatan konsisten dari minggu ke-1 hingga minggu ke-3.
                      </li>
                      <li>
                        <span className="font-medium text-purple-600">Hydrochlorothiazide</span>: 
                        Rata-rata kepatuhan <span className="font-medium">90%</span>. 
                        Memiliki tingkat kepatuhan tertinggi di antara semua obat.
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComplianceReports;
