
import React, { useState } from "react";
import { Clock, Calendar, Pill, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Medication {
  id: number;
  name: string;
  time: string;
  taken: boolean;
}

const MedicationReminder = () => {
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Amlodipine", time: "07:00", taken: false },
    { id: 2, name: "Captopril", time: "19:00", taken: false },
    { id: 3, name: "Hydrochlorothiazide", time: "08:00", taken: true },
  ]);

  const markAsTaken = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
  };

  return (
    <div className="bg-imo-gray py-12" id="fitur">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-imo-darkText mb-4">
            Pengingat Obat
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pantau jadwal minum obat dan dapatkan pengingat agar tidak pernah terlewat untuk minum obat hipertensi Anda.
          </p>
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
                      <Pill className="h-5 w-5 text-imo-blue mr-2" />
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
                <Pill className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Obat</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    placeholder="Masukkan nama obat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Waktu</label>
                  <input 
                    type="time" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dosis</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    placeholder="contoh: 1 tablet"
                  />
                </div>
                <Button className="w-full bg-imo-blue hover:bg-blue-700">
                  Tambah Obat
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-md card-hover">
            <CardHeader className="bg-imo-blue text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <span>Statistik Kepatuhan</span>
                <Chart className="h-5 w-5" />
              </CardTitle>
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

export default MedicationReminder;
