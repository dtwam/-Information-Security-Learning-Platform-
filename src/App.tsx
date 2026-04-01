import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Zer0Assistant from "@/components/Zer0Assistant";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";
import CyberIntro from "@/components/CyberIntro";
import { useAuth } from "@/hooks/useAuth";
import HomePage from "@/pages/HomePage";
import CoursesPage from "@/pages/CoursesPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import UnitDetailPage from "@/pages/UnitDetailPage";
import LabPage from "@/pages/LabPage";
import ToolsPage from "@/pages/ToolsPage";
import SearchPage from "@/pages/SearchPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { user, login, signup, logout, showAuthModal, setShowAuthModal } = useAuth();

  return (
    <>
      <CyberIntro />
      <BrowserRouter>
        <CyberBackground />
        <Navbar user={user} onLogout={logout} onLoginClick={() => setShowAuthModal(true)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/courses/:courseId/:unitId" element={<UnitDetailPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Zer0Assistant />
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={login} onSignup={signup} />
      </BrowserRouter>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
