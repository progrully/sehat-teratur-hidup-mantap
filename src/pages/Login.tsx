
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { UserRound, KeyRound } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Login berhasil!");
        navigate("/dashboard");
      } else {
        toast.error("Email atau password salah");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center bg-imo-blue rounded-t-lg py-6">
            <CardTitle className="text-2xl font-bold text-white">Masuk ke IMO MANTAP</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6 pb-8 px-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-imo-darkText">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <UserRound size={18} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-imo-darkText">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <KeyRound size={18} />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-imo-blue hover:bg-blue-700 text-white py-2.5 mt-2"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Masuk"}
              </Button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-center font-medium text-gray-600 mb-2">Demo Akun:</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="p-2 bg-blue-50 rounded-md">
                  <p className="font-semibold">Pasien:</p>
                  <p className="text-gray-600">pasien@example.com</p>
                </div>
                <div className="p-2 bg-green-50 rounded-md">
                  <p className="font-semibold">Perawat:</p>
                  <p className="text-gray-600">perawat@example.com</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-md">
                  <p className="font-semibold">Admin:</p>
                  <p className="text-gray-600">admin@example.com</p>
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">(Password bisa diisi apapun)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
