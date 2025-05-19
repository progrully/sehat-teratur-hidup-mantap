
import React, { useState } from "react";
import { Calendar, Clock, Check, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface Medication {
  id: number;
  name: string;
  time: string;
  taken: boolean;
}

const MedicationSchedule = () => {
  const { user, isAuthenticated } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Amlodipine", time: "07:00", taken: false },
    { id: 2, name: "Captopril", time: "19:00", taken: false },
    { id: 3, name: "Hydrochlorothiazide", time: "08:00", taken: true },
  ]);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Ensure user is a patient
  if (user?.role !== "patient") {
    return <Navigate to="/dashboard" />;
  }

  const markAsTaken = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
    toast.success("Obat ditandai sebagai sudah diminum!");
  };
  
  const addMedication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const time = formData.get("time") as string;
    const dosis = formData.get("dosis") as string;
    
    if (name && time) {
      const newMed: Medication = {
        id: Date.now(),
        name: `${name} (${dosis})`,
        time,
        taken: false
      };
      
      setMedications([...medications, newMed]);
      toast.success("Obat baru berhasil ditambahkan!");
      
      // Reset form
      (event.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-imo-darkText">
              Jadwal Pengobatan <span className="text-imo-blue">IMO MANTAP</span>
            </h1>
            <Button 
              onClick={() => window.history.back()}
              variant="outline" 
              className="border-imo-blue text-imo-blue"
            >
              Kembali
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-md card-hover">
              <CardHeader className="bg-imo-blue text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <span>Jadwal Hari Ini</span>
                  <Calendar className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {medications.map((med) => (
                    <li key={med.id} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {med.time}
                          </p>
                        </div>
                      </div>
                      {med.taken ? (
                        <span className="text-imo-green flex items-center">
                          <Check className="h-5 w-5 mr-1" /> Sudah
                        </span>
                      ) : (
                        <Button 
                          size="sm" 
                          className="bg-imo-green hover:bg-green-600"
                          onClick={() => markAsTaken(med.id)}
                        >
                          Tandai
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md card-hover">
              <CardHeader className="bg-imo-blue text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <span>Tambah Obat</span>
                  <PlusCircle className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-4" onSubmit={addMedication}>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nama Obat</label>
                    <input 
                      type="text" 
                      name="name"
                      className="w-full p-2 border rounded-md"
                      placeholder="Masukkan nama obat"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Waktu</label>
                    <input 
                      type="time" 
                      name="time"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Dosis</label>
                    <input 
                      type="text" 
                      name="dosis"
                      className="w-full p-2 border rounded-md"
                      placeholder="contoh: 1 tablet"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-imo-blue hover:bg-blue-700">
                    Tambah Obat
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="shadow-md card-hover">
              <CardHeader className="bg-imo-blue text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <span>Kepatuhan Minum Obat</span>
                  <Check className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-imo-lightGreen text-imo-green text-2xl font-bold border-4 border-imo-green">
                    67%
                  </div>
                  <p className="mt-2 font-medium">Kepatuhan Minggu Ini</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Senin</span>
                    <span className="font-medium text-imo-green">✓ Patuh</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Selasa</span>
                    <span className="font-medium text-imo-green">✓ Patuh</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rabu</span>
                    <span className="font-medium text-red-500">✗ Terlewat</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Kamis</span>
                    <span className="font-medium text-imo-green">✓ Patuh</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MedicationSchedule;
