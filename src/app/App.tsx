import { useState, useEffect } from 'react';
import { NetflixLoader } from './components/NetflixLoader';
import { ProfileSelection } from './components/ProfileSelection';
import { RecruiterProfile } from './components/RecruiterProfile';
import { FanProfile } from './components/FanProfile';
import { MarketerProfile } from './components/MarketerProfile';
import { StrangerProfile } from './components/StrangerProfile';
import { BusinessOwnerProfile } from './components/BusinessOwnerProfile';
import { Toaster } from './components/ui/sonner';
import { NotificationProvider } from './components/NotificationContext';

type View = 'loader' | 'profiles' | 'profile';
type ProfileId = 'recruiter' | 'fan' | 'marketer' | 'stranger' | 'business';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('loader');
  const [selectedProfile, setSelectedProfile] = useState<ProfileId | null>(null);
  const [bypassLoader, setBypassLoader] = useState(false);

  // Check URL on mount for direct SEO routing
  useEffect(() => {
    const path = window.location.pathname;
    
    // Check for the SEO-friendly direct link
    if (path === '/home/dubai/best-digital-marketing-specialist-in-dubai') {
      setBypassLoader(true);
      setSelectedProfile('recruiter');
      setCurrentView('profile');
    }
  }, []);

  const handleLoadComplete = () => {
    setCurrentView('profiles');
  };

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfile(profileId as ProfileId);
    setCurrentView('profile');
  };

  const handleBackToProfiles = () => {
    setSelectedProfile(null);
    setCurrentView('profiles');
  };

  const handleSwitchProfile = (profileId: ProfileId) => {
    setSelectedProfile(profileId);
    setCurrentView('profile');
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-[#141414]">
        {!bypassLoader && currentView === 'loader' && <NetflixLoader onLoadComplete={handleLoadComplete} />}
        
        {!bypassLoader && currentView === 'profiles' && <ProfileSelection onSelectProfile={handleSelectProfile} />}
        
        {currentView === 'profile' && selectedProfile === 'recruiter' && (
          <RecruiterProfile onBackToProfiles={handleBackToProfiles} onSwitchProfile={handleSwitchProfile} profileId="recruiter" />
        )}
        
        {currentView === 'profile' && selectedProfile === 'fan' && (
          <FanProfile onBackToProfiles={handleBackToProfiles} onSwitchProfile={handleSwitchProfile} profileId="fan" />
        )}
        
        {currentView === 'profile' && selectedProfile === 'marketer' && (
          <MarketerProfile onBackToProfiles={handleBackToProfiles} onSwitchProfile={handleSwitchProfile} profileId="marketer" />
        )}
        
        {currentView === 'profile' && selectedProfile === 'stranger' && (
          <StrangerProfile onBackToProfiles={handleBackToProfiles} onSwitchProfile={handleSwitchProfile} profileId="stranger" />
        )}
        
        {currentView === 'profile' && selectedProfile === 'business' && (
          <BusinessOwnerProfile onBackToProfiles={handleBackToProfiles} onSwitchProfile={handleSwitchProfile} profileId="business" />
        )}
        
        <Toaster />
      </div>
    </NotificationProvider>
  );
}