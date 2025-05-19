
import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PatientDashboard from "@/components/dashboard/PatientDashboard";
import NurseDashboard from "@/components/dashboard/NurseDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Helper function to get role-specific title
  const getRoleTitle = () => {
    switch (user?.role) {
      case "patient":
        return "Dashboard Pasien";
      case "nurse":
        return "Dashboard Perawat";
      case "admin":
        return "Dashboard Admin";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-imo-darkText">
            {getRoleTitle()} <span className="text-imo-green">IMO MANTAP</span>
          </h1>

          {/* Display different dashboard based on user role */}
          {user?.role === "patient" && <PatientDashboard user={user} />}
          {user?.role === "nurse" && <NurseDashboard user={user} />}
          {user?.role === "admin" && <AdminDashboard user={user} />}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
