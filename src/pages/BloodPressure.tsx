
import React, { useState } from "react";
import { Heart, ArrowUp, ArrowDown, Calendar, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface BloodPressureRecord {
  id: number;
  date: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  status: "normal" | "elevated" | "high" | "crisis";
}

const getStatus = (systolic: number, diastolic: number): "normal" | "elevated" | "high" | "crisis" => {
  if (systolic >= 180 || diastolic >= 120) return "crisis";
  if (systolic >= 140 || diastolic >= 90) return "high";
  if (systolic >= 130 || diastolic >= 80) return "elevated";
  return "normal";
};

const getStatusColor = (status: "normal" | "elevated" | "high" | "crisis"): string => {
  switch (status) {
    case "normal": return "text-green-500";
    case "elevated": return "text-yellow-500";
    case "high": return "text-orange-500";
    case "crisis": return "text-red-600";
    default: return "text-gray-600";
  }
};

const getStatusText = (status: "normal" | "elevated" | "high" | "crisis"): string => {
  switch (status) {
    case "normal": return "Normal";
    case "elevated": return "Tinggi";
    case "high": return "Hipertensi";
    case "crisis": return "Krisis";
    default: return "Tidak diketahui";
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const BloodPressure = () => {
  const { user, isAuthenticated } = useAuth();
  const [records, setRecords] = useState<BloodPressureRecord[]>([
    { 
      id: 1, 
      date: "2025-05-18T08:30:00", 
      systolic: 135, 
      diastolic: 85, 
      pulse: 72,
      status: "elevated" 
    },
    { 
      id: 2, 
      date: "2025-05-17T19:45:00", 
      systolic: 142, 
      diastolic: 88, 
      pulse: 78,
      status: "high" 
    },
    { 
      id: 3, 
      date: "2025-05-16T07:15:00", 
      systolic: 128, 
      diastolic: 79, 
      pulse: 68,
      status: "normal" 
    },
  ]);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Ensure user is a patient
  if (user?.role !== "patient") {
    return <Navigate to="/dashboard" />;
  }

  const addBloodPressure = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const systolic = parseInt(formData.get("systolic") as string);
    const diastolic = parseInt(formData.get("diastolic") as string);
    const pulse = parseInt(formData.get("pulse") as string);
    
    if (systolic && diastolic && pulse) {
      const status = getStatus(systolic, diastolic);
      const newRecord: BloodPressureRecord = {
        id: Date.now(),
        date: new Date().toISOString(),
        systolic,
        diastolic,
        pulse,
        status
      };
      
      setRecords([newRecord, ...records]);
      toast.success("Data tekanan darah berhasil disimpan!");
      
      // Reset form
      (event.target as HTMLFormElement).reset();
      
      // Show health advice based on status
      if (status === "high" || status === "crisis") {
        toast.warning("Tekanan darah Anda tinggi. Harap hubungi tenaga kesehatan.", {
          duration: 5000
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-imo-darkText">
              Pemantauan Tekanan Darah <span className="text-imo-green">IMO MANTAP</span>
            </h1>
            <Button 
              onClick={() => window.history.back()}
              variant="outline" 
              className="border-imo-green text-imo-green"
            >
              Kembali
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-md card-hover">
              <CardHeader className="bg-imo-green text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <span>Catat Tekanan Darah</span>
                  <Heart className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-4" onSubmit={addBloodPressure}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Sistol (mmHg)</label>
                      <input 
                        type="number" 
                        name="systolic"
                        className="w-full p-2 border rounded-md"
                        placeholder="contoh: 120"
                        required
                        min="60"
                        max="300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Diastol (mmHg)</label>
                      <input 
                        type="number" 
                        name="diastolic"
                        className="w-full p-2 border rounded-md"
                        placeholder="contoh: 80"
                        required
                        min="30"
                        max="200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Detak Jantung (bpm)</label>
                    <input 
                      type="number" 
                      name="pulse"
                      className="w-full p-2 border rounded-md"
                      placeholder="contoh: 75"
                      required
                      min="30"
                      max="250"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-imo-green hover:bg-green-600">
                    <PlusCircle className="w-4 h-4 mr-2" /> Tambah Data
                  </Button>
                </form>
                
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-medium mb-2">Kategori Tekanan Darah:</h3>
                  <ul className="text-sm space-y-1">
                    <li><span className="text-green-500 font-medium">Normal:</span> &lt;130/80 mmHg</li>
                    <li><span className="text-yellow-500 font-medium">Tinggi:</span> 130-139/80-89 mmHg</li>
                    <li><span className="text-orange-500 font-medium">Hipertensi:</span> 140-179/90-119 mmHg</li>
                    <li><span className="text-red-600 font-medium">Krisis:</span> ≥180/120 mmHg</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md card-hover">
              <CardHeader className="bg-imo-green text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <span>Riwayat Tekanan Darah</span>
                  <Calendar className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {records.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">Belum ada data tekanan darah</p>
                ) : (
                  <div className="space-y-4">
                    {records.map(record => (
                      <div key={record.id} className="border rounded-md p-3 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium">{record.systolic}/{record.diastolic} mmHg</span>
                              <span className={`ml-2 text-sm ${getStatusColor(record.status)}`}>
                                ({getStatusText(record.status)})
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(record.date)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600">Detak Jantung:</span>
                              <span className="ml-1 font-medium">{record.pulse} bpm</span>
                            </div>
                            <div className="mt-1">
                              {record.status === "normal" && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                  Baik
                                </span>
                              )}
                              {record.status === "elevated" && (
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                                  Waspada
                                </span>
                              )}
                              {record.status === "high" && (
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                                  Perhatikan
                                </span>
                              )}
                              {record.status === "crisis" && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                  Darurat
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BloodPressure;
