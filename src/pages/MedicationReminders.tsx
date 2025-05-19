
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

const MedicationReminders = () => {
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
        name,
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-imo-darkText">
              Pengingat Obat
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Pantau jadwal minum obat dan dapatkan pengingat agar tidak pernah terlewat untuk 
              minum obat hipertensi Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-md card-hover">
              <CardHeader className="bg-imo-blue text-white rounded-t-lg flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <span>Jadwal Hari Ini</span>
                </CardTitle>
                <Calendar className="h-5 w-5" />
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {medications.map((med) => (
                    <li key={med.id} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <div className="text-imo-blue">
                          <PlusCircle className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
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
              <CardHeader className="bg-imo-blue text-white rounded-t-lg flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <span>Tambah Obat</span>
                </CardTitle>
                <PlusCircle className="h-5 w-5" />
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
              <CardHeader className="bg-imo-blue text-white rounded-t-lg flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <span>Statistik Kepatuhan</span>
                </CardTitle>
                <Chart className="h-5 w-5" />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-imo-lightGreen text-imo-green text-2xl font-bold border-4 border-imo-green">
                    85%
                  </div>
                  <p className="mt-2 font-medium">Kepatuhan Bulan Ini</p>
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Minggu ini</span>
                    <span className="font-medium">90%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Minggu lalu</span>
                    <span className="font-medium">80%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>2 minggu lalu</span>
                    <span className="font-medium">75%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Add Chart component that was referenced but not imported
const Chart = ({ className }: { className?: string }) => (
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
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

export default MedicationReminders;
