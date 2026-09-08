import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChallengeProvider, useChallenges } from './context/ChallengeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ReportProblemForm } from './pages/portals/CitizenPortal/ReportProblemForm';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ExploreChallengesPage } from './pages/ExploreChallengesPage';
import { ChallengeDetailPage } from './pages/ChallengeDetailPage';
import { HowItWorksView, SolutionsView, ImpactView, AboutView } from './pages/StaticViews';

// 8 Dedicated Role Portals
import { CitizenDashboard } from './pages/portals/CitizenPortal/CitizenDashboard';
import { GovernmentDashboard } from './pages/portals/GovernmentPortal/GovernmentDashboard';
import { UniversityDashboard } from './pages/portals/UniversityPortal/UniversityDashboard';
import { FacultyDashboard } from './pages/portals/FacultyPortal/FacultyDashboard';
import { StudentDashboard } from './pages/portals/StudentPortal/StudentDashboard';
import { IndustryDashboard } from './pages/portals/IndustryPortal/IndustryDashboard';
import { CSRDashboard } from './pages/portals/CSRPortal/CSRDashboard';
import { AdminDashboard } from './pages/portals/AdminPortal/AdminDashboard';

const MainAppContent = () => {
  const { currentRole, switchRole } = useAuth();
  const { selectedChallengeId, setSelectedChallengeId } = useChallenges();
  const [currentView, setCurrentView] = useState('portal'); // Default to 'portal' so user directly sees the Citizen Dashboard
  const [selectedLoginRole, setSelectedLoginRole] = useState('citizen');
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChallenge = (challengeId) => {
    setSelectedChallengeId(challengeId);
    setCurrentView('challenge-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open specific role login from hamburger ☰ menu
  const handleOpenRoleLogin = (roleId) => {
    setSelectedLoginRole(roleId);
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Dedicated Portal based on currentRole
  const renderRolePortal = () => {
    switch (currentRole) {
      case 'citizen':
        return (
          <CitizenDashboard 
            onSelectChallenge={handleSelectChallenge} 
            onSelectRole={handleOpenRoleLogin}
          />
        );
      case 'government':
        return <GovernmentDashboard onSelectChallenge={handleSelectChallenge} />;
      case 'hei_admin':
        return <UniversityDashboard onSelectChallenge={handleSelectChallenge} />;
      case 'faculty':
        return <FacultyDashboard onSelectChallenge={handleSelectChallenge} />;
      case 'student':
        return <StudentDashboard onSelectChallenge={handleSelectChallenge} />;
      case 'industry':
        return <IndustryDashboard onSelectChallenge={handleSelectChallenge} />;
      case 'csr':
        return <CSRDashboard onSelectChallenge={handleSelectChallenge} />;
      case 'admin':
        return <AdminDashboard onSelectChallenge={handleSelectChallenge} />;
      default:
        return (
          <CitizenDashboard 
            onSelectChallenge={handleSelectChallenge} 
            onSelectRole={handleOpenRoleLogin}
          />
        );
    }
  };

  const isCitizenPortal = currentView === 'portal' && currentRole === 'citizen';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      
      {/* Official Header Navigation (shown on public views or non-citizen portals) */}
      {!isCitizenPortal && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          onSelectRole={handleOpenRoleLogin}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            onSelectChallenge={handleSelectChallenge}
          />
        )}

        {currentView === 'challenges' && (
          <ExploreChallengesPage
            onSelectChallenge={handleSelectChallenge}
          />
        )}

        {currentView === 'challenge-detail' && (
          <ChallengeDetailPage
            challengeId={selectedChallengeId}
            onBack={() => handleNavigate(isCitizenPortal ? 'portal' : 'challenges')}
            onSelectChallenge={handleSelectChallenge}
          />
        )}

        {currentView === 'login' && (
          <LoginPage
            initialRole={selectedLoginRole}
            onNavigate={handleNavigate}
            onLoginSuccess={(roleId) => {
              handleNavigate('portal');
            }}
          />
        )}

        {currentView === 'portal' && (
          <div className={isCitizenPortal ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"}>
            {renderRolePortal()}
          </div>
        )}

        {currentView === 'how-it-works' && (
          <HowItWorksView
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'solutions' && (
          <SolutionsView
            onNavigate={handleNavigate}
            onSelectChallenge={handleSelectChallenge}
          />
        )}

        {currentView === 'impact' && (
          <ImpactView />
        )}

        {currentView === 'about' && (
          <AboutView />
        )}
      </main>

      {/* Global Problem Report Modal (Controlled) */}
      <ReportProblemForm
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSuccess={(newCh) => {
          setSelectedChallengeId(newCh.id);
          setCurrentView('portal');
        }}
      />

      {/* Footer (shown on public views) */}
      {!isCitizenPortal && (
        <Footer
          onNavigate={handleNavigate}
          onSelectRole={handleOpenRoleLogin}
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <ChallengeProvider>
        <MainAppContent />
      </ChallengeProvider>
    </AuthProvider>
  );
}

export default App;
