
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import MedicationSchedule from "./pages/MedicationSchedule";
import BloodPressure from "./pages/BloodPressure";
import MedicationInfo from "./pages/MedicationInfo";
import PatientList from "./pages/PatientList";
import MedicationReminders from "./pages/MedicationReminders";
import ComplianceReports from "./pages/ComplianceReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/medication-schedule" element={<MedicationSchedule />} />
            <Route path="/blood-pressure" element={<BloodPressure />} />
            <Route path="/medication-info" element={<MedicationInfo />} />
            <Route path="/patient-list" element={<PatientList />} />
            <Route path="/medication-reminders" element={<MedicationReminders />} />
            <Route path="/compliance-reports" element={<ComplianceReports />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
