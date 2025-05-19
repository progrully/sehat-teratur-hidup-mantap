
import React from "react";
import { Heart, Calendar, Language } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EducationalContent = () => {
  return (
    <div className="py-12" id="edukasi">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-imo-darkText mb-4">
            Edukasi Hipertensi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pelajari lebih lanjut tentang hipertensi dan cara mengelola kesehatan Anda dengan informasi terpercaya.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-md overflow-hidden card-hover">
            <div className="h-40 bg-imo-blue p-6 flex items-center justify-center">
              <Heart className="h-16 w-16 text-white" />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Mengenal Hipertensi</h3>
              <p className="text-gray-600 mb-4">
                Hipertensi atau tekanan darah tinggi adalah kondisi ketika tekanan darah terhadap dinding arteri terlalu tinggi.
              </p>
              <a href="#" className="text-imo-blue font-medium hover:underline">
                Baca selengkapnya
              </a>
            </CardContent>
          </Card>

          <Card className="shadow-md overflow-hidden card-hover">
            <div className="h-40 bg-imo-green p-6 flex items-center justify-center">
              <Medicine className="h-16 w-16 text-white" />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Pentingnya Kepatuhan Minum Obat</h3>
              <p className="text-gray-600 mb-4">
                Konsumsi obat secara teratur sesuai anjuran dokter sangat penting untuk mengendalikan tekanan darah dan mencegah komplikasi.
              </p>
              <a href="#" className="text-imo-blue font-medium hover:underline">
                Baca selengkapnya
              </a>
            </CardContent>
          </Card>

          <Card className="shadow-md overflow-hidden card-hover">
            <div className="h-40 bg-imo-lightBlue p-6 flex items-center justify-center">
              <Calendar className="h-16 w-16 text-white" />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Tips Gaya Hidup Sehat</h3>
              <p className="text-gray-600 mb-4">
                Modifikasi gaya hidup yang tepat dapat membantu mengendalikan tekanan darah dan meningkatkan kesehatan secara keseluruhan.
              </p>
              <a href="#" className="text-imo-blue font-medium hover:underline">
                Baca selengkapnya
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="bg-imo-gray p-6 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Tanya Jawab Seputar Hipertensi</h3>
              <div className="space-y-4">
                <details className="bg-white p-4 rounded-md shadow-sm">
                  <summary className="font-medium cursor-pointer">
                    Apa itu tekanan darah tinggi atau hipertensi?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Hipertensi atau tekanan darah tinggi adalah kondisi medis kronis di mana tekanan darah pada dinding arteri meningkat. Tekanan darah normal adalah sekitar 120/80 mmHg, dan dianggap hipertensi bila tekanan darah konsisten di atas 130/80 mmHg.
                  </p>
                </details>

                <details className="bg-white p-4 rounded-md shadow-sm">
                  <summary className="font-medium cursor-pointer">
                    Mengapa saya harus minum obat hipertensi secara teratur?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Minum obat hipertensi secara teratur membantu menjaga tekanan darah tetap stabil dan mencegah komplikasi serius seperti stroke, serangan jantung, dan gagal ginjal. Obat hipertensi bekerja optimal jika diminum secara konsisten.
                  </p>
                </details>

                <details className="bg-white p-4 rounded-md shadow-sm">
                  <summary className="font-medium cursor-pointer">
                    Berapa lama saya harus minum obat hipertensi?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Hipertensi umumnya merupakan kondisi jangka panjang yang mungkin memerlukan pengobatan seumur hidup. Namun, beberapa orang dapat mengurangi atau menghentikan obat dengan perubahan gaya hidup yang signifikan. Keputusan ini harus selalu dibuat bersama dokter Anda.
                  </p>
                </details>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-4">
                <Language className="h-24 w-24 text-imo-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Konsultasi dengan Dokter</h3>
              <p className="text-gray-600 mb-4">
                Punya pertanyaan lebih lanjut? Hubungi dokter Anda untuk mendapatkan informasi yang sesuai dengan kondisi kesehatan pribadi Anda.
              </p>
              <button className="btn-primary">
                Jadwalkan Konsultasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Medicine component (pill icon)
const Medicine = ({ className }: { className?: string }) => (
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

export default EducationalContent;
