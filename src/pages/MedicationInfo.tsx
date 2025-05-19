
import React from "react";
import { FileText, Clock, AlertTriangle, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

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

interface Medication {
  id: number;
  name: string;
  genericName: string;
  category: string;
  frequency: string;
  description: string;
  sideEffects: string[];
  interactions: string[];
  recommendations: string[];
}

const medications: Medication[] = [
  {
    id: 1,
    name: "Amlodipine",
    genericName: "Amlodipine",
    category: "Calcium Channel Blocker",
    frequency: "1x sehari",
    description: "Amlodipine bekerja dengan melemaskan pembuluh darah sehingga darah dapat mengalir lebih mudah. Ini membantu menurunkan tekanan darah tinggi.",
    sideEffects: ["Sakit kepala", "Pusing", "Pembengkakan pada kaki atau pergelangan kaki", "Kemerahan pada wajah"],
    interactions: ["Grapefruit juice dapat meningkatkan efek obat", "Simvastatin", "Cyclosporine"],
    recommendations: ["Minum pada waktu yang sama setiap hari", "Makan makanan rendah garam", "Hindari alkohol", "Lakukan olahraga secara teratur"]
  },
  {
    id: 2,
    name: "Captopril",
    genericName: "Captopril",
    category: "ACE Inhibitor",
    frequency: "2-3x sehari",
    description: "Captopril menghambat produksi enzim pengubah angiotensin, yang membantu melebarkan pembuluh darah dan menurunkan tekanan darah.",
    sideEffects: ["Batuk kering", "Pusing", "Ruam kulit", "Gangguan rasa"],
    interactions: ["Suplemen potasium", "NSAID seperti ibuprofen", "Lithium"],
    recommendations: ["Minum 1 jam sebelum makan", "Hindari penggunaan garam pengganti", "Pantau tekanan darah secara teratur"]
  },
  {
    id: 3,
    name: "Hydrochlorothiazide",
    genericName: "Hydrochlorothiazide",
    category: "Diuretik",
    frequency: "1x sehari (pagi)",
    description: "Hydrochlorothiazide adalah diuretik yang membantu tubuh membuang kelebihan garam dan air. Ini mengurangi volume darah dan menurunkan tekanan darah.",
    sideEffects: ["Sering buang air kecil", "Dehidrasi", "Pusing", "Kadar kalium rendah"],
    interactions: ["Digoxin", "Lithium", "Obat diabetes"],
    recommendations: ["Minum di pagi hari untuk menghindari sering buang air kecil di malam hari", "Pastikan minum cukup air", "Pantau kadar elektrolit"]
  }
];

const MedicationInfo = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-imo-darkText">
              Informasi Obat <span className="text-imo-blue">IMO MANTAP</span>
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
            <CardHeader className="bg-imo-blue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <PillIcon className="h-5 w-5" />
                Informasi Obat Hipertensi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue={medications[0].name.toLowerCase()}>
                <TabsList className="mb-4 w-full grid grid-cols-3">
                  {medications.map(med => (
                    <TabsTrigger key={med.id} value={med.name.toLowerCase()}>
                      {med.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {medications.map(med => (
                  <TabsContent key={med.id} value={med.name.toLowerCase()} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h2 className="text-lg font-medium text-imo-blue mb-2">{med.name} ({med.genericName})</h2>
                        <p className="text-sm text-gray-600 mb-4">{med.description}</p>
                        
                        <div className="bg-blue-50 p-4 rounded-md mb-4">
                          <h3 className="flex items-center text-imo-blue font-medium mb-2">
                            <FileText className="h-4 w-4 mr-2" />
                            Informasi Umum
                          </h3>
                          <ul className="text-sm space-y-2">
                            <li><span className="font-medium">Kategori:</span> {med.category}</li>
                            <li><span className="font-medium">Frekuensi:</span> {med.frequency}</li>
                          </ul>
                        </div>
                        
                        <div className="bg-yellow-50 p-4 rounded-md">
                          <h3 className="flex items-center text-yellow-700 font-medium mb-2">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Efek Samping
                          </h3>
                          <ul className="text-sm list-disc pl-5 space-y-1">
                            {med.sideEffects.map((effect, idx) => (
                              <li key={idx}>{effect}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-red-50 p-4 rounded-md mb-4">
                          <h3 className="flex items-center text-red-700 font-medium mb-2">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Interaksi Obat
                          </h3>
                          <p className="text-sm mb-2">Beri tahu dokter jika Anda menggunakan obat-obatan berikut:</p>
                          <ul className="text-sm list-disc pl-5 space-y-1">
                            {med.interactions.map((interaction, idx) => (
                              <li key={idx}>{interaction}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-md">
                          <h3 className="flex items-center text-green-700 font-medium mb-2">
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Rekomendasi Penggunaan
                          </h3>
                          <ul className="text-sm list-disc pl-5 space-y-1">
                            {med.recommendations.map((rec, idx) => (
                              <li key={idx}>{rec}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-imo-lightBlue p-4 rounded-md mt-4">
                          <h3 className="flex items-center text-imo-blue font-medium mb-2">
                            <Clock className="h-4 w-4 mr-2" />
                            Waktu Minum
                          </h3>
                          <p className="text-sm">
                            Penting untuk minum obat ini pada waktu yang sama setiap hari untuk 
                            memastikan kadar obat yang konsisten dalam tubuh Anda. Jangan 
                            berhenti minum obat tanpa berkonsultasi dengan dokter Anda.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MedicationInfo;
