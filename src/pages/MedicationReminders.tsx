
import React, { useState } from "react";
import { Calendar, Clock, Check, Bell, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface PatientReminder {
  id: number;
  patientName: string;
  patientId: string;
  medicationName: string;
  time: string;
  frequency: string;
  dosis: string;
  active: boolean;
}

const MedicationReminders = () => {
  const { user, isAuthenticated, users } = useAuth();
  const [reminders, setReminders] = useState<PatientReminder[]>([
    { 
      id: 1, 
      patientName: "Budi Santoso", 
      patientId: "1",
      medicationName: "Amlodipine", 
      time: "07:00", 
      frequency: "Setiap hari",
      dosis: "1 tablet (5mg)",
      active: true
    },
    { 
      id: 2, 
      patientName: "Siti Aminah", 
      patientId: "4",
      medicationName: "Captopril", 
      time: "08:00,20:00", 
      frequency: "2x sehari",
      dosis: "1 tablet (25mg)",
      active: true
    },
    { 
      id: 3, 
      patientName: "Agus Prasetyo", 
      patientId: "5",
      medicationName: "Hydrochlorothiazide", 
      time: "07:30", 
      frequency: "Setiap hari",
      dosis: "1 tablet (12.5mg)",
      active: false
    }
  ]);
  
  const [patients, setPatients] = useState(
    users.filter(u => u.role === "patient").map(u => ({ id: u.id, name: u.name }))
  );
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Ensure user is a nurse
  if (user?.role !== "nurse") {
    return <Navigate to="/dashboard" />;
  }
  
  const toggleReminderStatus = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
    ));
    
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      const newStatus = !reminder.active;
      toast.success(`Pengingat ${reminder.medicationName} untuk ${reminder.patientName} telah ${newStatus ? 'diaktifkan' : 'dinonaktifkan'}`);
    }
  };
  
  const addReminder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const patientId = formData.get("patient") as string;
    const medicationName = formData.get("medication") as string;
    const time = formData.get("time") as string;
    const frequency = formData.get("frequency") as string;
    const dosis = formData.get("dosis") as string;
    
    if (patientId && medicationName && time && frequency && dosis) {
      const selectedPatient = patients.find(p => p.id === patientId);
      
      if (selectedPatient) {
        const newReminder: PatientReminder = {
          id: Date.now(),
          patientName: selectedPatient.name,
          patientId,
          medicationName,
          time,
          frequency,
          dosis,
          active: true
        };
        
        setReminders([...reminders, newReminder]);
        toast.success(`Pengingat ${medicationName} untuk ${selectedPatient.name} berhasil ditambahkan!`);
        
        // Reset form
        (event.target as HTMLFormElement).reset();
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
              Pengingat Obat <span className="text-imo-green">IMO MANTAP</span>
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
                  <span>Tambah Pengingat Obat</span>
                  <Bell className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-4" onSubmit={addReminder}>
                  <div>
                    <label className="block text-sm font-medium mb-1">Pasien</label>
                    <select 
                      name="patient"
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Pilih pasien</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>{patient.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Obat</label>
                    <select 
                      name="medication"
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Pilih obat</option>
                      <option value="Amlodipine">Amlodipine</option>
                      <option value="Captopril">Captopril</option>
                      <option value="Hydrochlorothiazide">Hydrochlorothiazide</option>
                      <option value="Losartan">Losartan</option>
                      <option value="Valsartan">Valsartan</option>
                    </select>
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
                    <label className="block text-sm font-medium mb-1">Frekuensi</label>
                    <select 
                      name="frequency"
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="Setiap hari">Setiap hari</option>
                      <option value="2x sehari">2x sehari</option>
                      <option value="3x sehari">3x sehari</option>
                      <option value="Setiap 2 hari">Setiap 2 hari</option>
                      <option value="Mingguan">Mingguan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Dosis</label>
                    <input 
                      type="text" 
                      name="dosis"
                      className="w-full p-2 border rounded-md"
                      placeholder="contoh: 1 tablet (5mg)"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-imo-green hover:bg-green-600">
                    Tambah Pengingat
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-md card-hover">
              <CardHeader className="bg-imo-green text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <span>Daftar Pengingat</span>
                  <Users className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {reminders.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">Belum ada pengingat obat</p>
                ) : (
                  <div className="space-y-4">
                    {reminders.map(reminder => (
                      <div key={reminder.id} className={`border rounded-md p-3 shadow-sm ${reminder.active ? 'border-imo-green' : 'border-gray-200 opacity-75'}`}>
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">{reminder.patientName}</div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-3 w-3 mr-1" />
                              {reminder.time} - {reminder.frequency}
                            </div>
                            <div className="mt-1 flex items-center">
                              <span className="text-imo-blue font-medium">{reminder.medicationName}</span>
                              <span className="text-xs text-gray-500 ml-2">{reminder.dosis}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className={`text-xs ${reminder.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} px-2 py-0.5 rounded mb-2`}>
                              {reminder.active ? 'Aktif' : 'Tidak aktif'}
                            </div>
                            <Button 
                              size="sm" 
                              variant={reminder.active ? "outline" : "default"}
                              className={reminder.active ? "border-red-500 text-red-500 hover:bg-red-50" : "bg-imo-green hover:bg-green-600"}
                              onClick={() => toggleReminderStatus(reminder.id)}
                            >
                              {reminder.active ? 'Nonaktifkan' : 'Aktifkan'}
                            </Button>
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

export default MedicationReminders;
