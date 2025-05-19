
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MedicationReminder from "@/components/MedicationReminder";
import EducationalContent from "@/components/EducationalContent";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, CalendarCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section id="beranda" className="hero-gradient py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Program IMO MANTAP
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium mb-6">
                Inspirasi Minum Obat, Mantap Tanpa Lupa
              </h2>
              <p className="text-lg mb-8 text-blue-100">
                Solusi terbaik untuk meningkatkan kepatuhan minum obat hipertensi secara teratur demi kesehatan yang optimal.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-imo-blue hover:bg-blue-50" asChild>
                  <Link to="/login">Mulai Sekarang</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <a href="#tentang">Pelajari Lebih Lanjut</a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-imo-lightBlue animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-imo-green animate-pulse-slow"></div>
                <div className="bg-white p-6 rounded-lg shadow-xl card-hover">
                  <div className="flex items-center justify-center w-60 h-60">
                    <PillIcon className="h-40 w-40 text-imo-blue" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="tentang" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-imo-darkText mb-4">
              Mengapa IMO MANTAP?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Program kami dirancang khusus untuk membantu Anda mengelola pengobatan hipertensi dengan mudah dan efektif.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-imo-lightBlue rounded-full">
                <CalendarCheck className="h-8 w-8 text-imo-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pengingat Tepat Waktu</h3>
              <p className="text-gray-600">
                Dapatkan notifikasi pengingat minum obat tepat waktu sesuai jadwal yang telah Anda atur.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-imo-lightGreen rounded-full">
                <Heart className="h-8 w-8 text-imo-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pemantauan Kesehatan</h3>
              <p className="text-gray-600">
                Pantau tekanan darah dan catat riwayat kesehatan Anda untuk membantu dokter mengevaluasi kondisi Anda.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                <PillIcon className="h-8 w-8 text-imo-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Informasi Obat Lengkap</h3>
              <p className="text-gray-600">
                Akses informasi lengkap tentang obat hipertensi Anda, termasuk dosis, efek samping, dan cara penggunaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Medication Reminder Component */}
      <MedicationReminder />

      {/* Educational Content Component */}
      <EducationalContent />

      {/* CTA Section */}
      <section className="bg-imo-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Mulai Hidup Lebih Sehat Hari Ini
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan Program IMO MANTAP dan tingkatkan kualitas hidup Anda dengan pengelolaan hipertensi yang lebih baik.
          </p>
          <Button size="lg" className="bg-white text-imo-blue hover:bg-blue-50" asChild>
            <Link to="/login">Daftar Sekarang</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

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

export default Index;
