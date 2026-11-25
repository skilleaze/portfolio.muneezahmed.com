import { useState, useEffect } from 'react';
import { Bell, Search, ChevronDown, Menu, X, Edit, Users, User, HelpCircle, LogOut, Mail, Phone, Volume2, VolumeX } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import logoImage from 'figma:asset/888272e7dbcaca274271687ecaf61e5fe576f84e.png';
import notificationAvatar from 'figma:asset/b6e82979502e4bb7b82a0870615f02f3ed1ef7c3.png';
import recruiterImage from 'figma:asset/a5779d4c9f02714b8efcda9c85572d52cba3a910.png';
import enthusiastImage from 'figma:asset/552085965b4d966b10bd07cdaa14f764ff91d11d.png';
import marketerImage from 'figma:asset/d58639c0381c24e78dff1230902bd5692fca170e.png';
import strangerImage from 'figma:asset/c7096f99635983ea1558fa9736b9c9c05f4e3165.png';
import prospectImage from 'figma:asset/ce87ad8d1a4d312a6ce684e06b4caf2deba9f33f.png';
import { useNotifications } from './NotificationContext';
import { sendFormEmails } from './emailService';
import { searchContent, type SearchResult } from './searchData';

type ProfileId = 'recruiter' | 'fan' | 'marketer' | 'stranger' | 'business';

interface NavBarProps {
  profileId?: string;
  onBackToProfiles?: () => void;
  onSwitchProfile?: (profileId: ProfileId) => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export function NavBar({ profileId = 'recruiter', onBackToProfiles, onSwitchProfile, isMuted = false, onToggleMute }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  // Dialog states
  const [isManageProfilesOpen, setIsManageProfilesOpen] = useState(false);
  const [isTransferProfileOpen, setIsTransferProfileOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isHelpCentreOpen, setIsHelpCentreOpen] = useState(false);
  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isDeleteProfileOpen, setIsDeleteProfileOpen] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [transferEmail, setTransferEmail] = useState('');
  const [transferPhone, setTransferPhone] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [accountPhone, setAccountPhone] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileType, setNewProfileType] = useState('');
  const [editProfileName, setEditProfileName] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  
  // Validation helpers
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Accepts formats like: +971586388362, 971586388362, 0586388362, 586388362
    const phoneRegex = /^[\+]?[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  // Handle form submissions
  const handleTransferProfile = async () => {
    if (!transferEmail || !transferPhone) {
      toast.error('All fields are required!', {
        description: 'Please fill in both email and phone number.',
      });
      return;
    }

    if (!validateEmail(transferEmail)) {
      toast.error('Invalid Email Format!', {
        description: 'Please enter a valid email address (e.g., user@example.com)',
      });
      return;
    }

    if (!validatePhone(transferPhone)) {
      toast.error('Invalid Phone Format!', {
        description: 'Please enter a valid phone number (10-15 digits, e.g., +971586388362)',
      });
      return;
    }

    try {
      // Send emails using EmailJS
      const { leadSent, thankYouSent } = await sendFormEmails({
        name: 'Profile Transfer',
        email: transferEmail,
        phone: transferPhone,
        message: 'Requesting profile transfer',
        formType: 'transfer',
      });

      if (leadSent && thankYouSent) {
        toast.success('Thank you! Request sent successfully.', {
          description: `Transfer request has been sent to ${transferEmail}.`,
        });
        
        addNotification({
          title: 'Profile Transfer Initiated!',
          message: `Transfer request sent to ${transferEmail}. They'll receive instructions shortly.`,
          type: 'general',
        });
        setTransferEmail('');
        setTransferPhone('');
        setIsTransferProfileOpen(false);
      } else {
        toast.error('Failed to send. Please try again or email hello@muneezahmed.com');
      }
    } catch (error) {
      console.error('Transfer form error:', error);
      toast.error('Failed to send transfer request. Please try again.');
    }
  };

  const handleUpdateAccount = async () => {
    if (!accountEmail || !accountPhone) {
      toast.error('All fields are required!', {
        description: 'Please fill in both email and phone number.',
      });
      return;
    }

    if (!validateEmail(accountEmail)) {
      toast.error('Invalid Email Format!', {
        description: 'Please enter a valid email address (e.g., user@example.com)',
      });
      return;
    }

    if (!validatePhone(accountPhone)) {
      toast.error('Invalid Phone Format!', {
        description: 'Please enter a valid phone number (10-15 digits, e.g., +971586388362)',
      });
      return;
    }

    try {
      // Send emails using EmailJS
      const { leadSent, thankYouSent } = await sendFormEmails({
        name: 'Account Update',
        email: accountEmail,
        phone: accountPhone,
        message: 'Requesting account settings update',
        formType: 'account',
      });

      if (leadSent && thankYouSent) {
        toast.success('Thank you! Account updated successfully.', {
          description: `Your account has been updated with email: ${accountEmail}`,
        });
        
        addNotification({
          title: 'Account Updated!',
          message: `Your account has been updated with email: ${accountEmail}`,
          type: 'general',
        });
        setAccountEmail('');
        setAccountPhone('');
        setIsAccountOpen(false);
      } else {
        toast.error('Failed to update. Please try again or email hello@muneezahmed.com');
      }
    } catch (error) {
      console.error('Account update error:', error);
      toast.error('Failed to update account. Please try again.');
    }
  };

  const handleAddNewProfile = () => {
    setIsManageProfilesOpen(false);
    setIsAddProfileOpen(true);
  };

  const handleEditProfile = () => {
    setIsManageProfilesOpen(false);
    setIsEditProfileOpen(true);
  };

  const handleDeleteProfile = () => {
    setIsManageProfilesOpen(false);
    setIsDeleteProfileOpen(true);
  };

  const handleAddProfileSubmit = () => {
    if (!newProfileName || !newProfileType) {
      toast.error('All fields are required!', {
        description: 'Please fill in both profile name and type.',
      });
      return;
    }

    addNotification({
      title: 'Profile Created!',
      message: `New profile \"${newProfileName}\" has been added successfully!`,
      type: 'general',
    });
    setNewProfileName('');
    setNewProfileType('');
    setIsAddProfileOpen(false);
  };

  const handleEditProfileSubmit = () => {
    if (!editProfileName || !verificationEmail) {
      toast.error('All fields are required!', {
        description: 'Please fill in both fields to verify and update.',
      });
      return;
    }

    if (!validateEmail(verificationEmail)) {
      toast.error('Invalid Email Format!', {
        description: 'Please enter a valid email address to verify your identity.',
      });
      return;
    }

    addNotification({
      title: 'Profile Updated! ✅',
      message: `Profile name changed to "${editProfileName}" successfully!`,
      type: 'general',
    });
    setEditProfileName('');
    setVerificationEmail('');
    setIsEditProfileOpen(false);
  };

  const handleDeleteProfileConfirm = () => {
    if (!verificationEmail) {
      toast.error('Email verification required!', {
        description: 'Please enter your email to confirm profile deletion.',
      });
      return;
    }

    if (!validateEmail(verificationEmail)) {
      toast.error('Invalid Email Format!', {
        description: 'Please enter a valid email address to verify your identity.',
      });
      return;
    }

    addNotification({
      title: 'Verification Email Sent! 📧',
      message: `Please check ${verificationEmail} and click the verification link to permanently delete your profile.`,
      type: 'general',
    });
    setVerificationEmail('');
    setIsDeleteProfileOpen(false);
  };

  const handleContactSubmit = async () => {
    if (!contactName || !contactEmail || !contactMessage) {
      toast.error('All fields are required!', {
        description: 'Please fill in all fields to submit your request.',
      });
      return;
    }

    if (!validateEmail(contactEmail)) {
      toast.error('Invalid Email Format!', {
        description: 'Please enter a valid email address.',
      });
      return;
    }

    try {
      const { leadSent, thankYouSent } = await sendFormEmails({
        name: contactName,
        email: contactEmail,
        message: contactMessage,
        formType: 'support',
      });

      if (leadSent && thankYouSent) {
        toast.success('Thank you! Email sent successfully.', {
          description: `Your message has been delivered to ${contactEmail}. We'll respond shortly.`,
        });
        
        addNotification({
          title: 'Message Sent!',
          message: `Thank you ${contactName}! We received your message and will respond to ${contactEmail} shortly.`,
          type: 'general',
        });
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      } else {
        toast.error('Failed to send message. Please try emailing hello@muneezahmed.com directly.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  // Get profile image based on profileId
  const getProfileImage = () => {
    switch (profileId) {
      case 'recruiter':
        return recruiterImage;
      case 'fan':
        return enthusiastImage;
      case 'marketer':
        return marketerImage;
      case 'stranger':
        return strangerImage;
      case 'business':
        return prospectImage;
      default:
        return recruiterImage;
    }
  };

  const profileImage = getProfileImage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.notifications-dropdown') && !target.closest('.notifications-button')) {
        setIsNotificationsOpen(false);
      }
      if (!target.closest('.profile-dropdown') && !target.closest('.profile-button')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Close search modal with ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Live search effect
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = searchContent(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the live search effect above
  };

  const handleSearchResultClick = (result: SearchResult) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    
    // Show toast notification with result info
    toast.success(`Found: ${result.title}`, {
      description: result.description,
    });
  };

  const { notifications, markAsRead, markAllAsRead, addNotification } = useNotifications();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-3 md:py-4 transition-all duration-300 ${
          isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-[#141414] to-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <button 
              onClick={onBackToProfiles}
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={logoImage}
                alt="Muneez Ahmed"
                className="h-5 md:h-8 w-auto"
              />
            </button>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:block text-white hover:text-[#B3B3B3] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Mute Button - Desktop */}
            {onToggleMute && (
              <button
                onClick={onToggleMute}
                className={`hidden md:block transition-colors ${
                  isMuted ? 'text-[#E50914]' : 'text-white hover:text-[#B3B3B3]'
                }`}
                aria-label={isMuted ? "Unmute background music" : "Mute background music"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            )}
            
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="notifications-button hidden md:block text-white hover:text-[#B3B3B3] transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E50914] rounded-full"></span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 top-10 z-50 notifications-dropdown">
                  <div className="bg-[#141414] border border-[#444] rounded shadow-lg w-80">
                    <div className="p-4 border-b border-[#444]">
                      <h3 className="text-white font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-[#333] hover:bg-[#282828] transition-colors cursor-pointer ${
                            notification.unread ? 'bg-[#1a1a1a]' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded bg-white flex items-center justify-center flex-shrink-0">
                              <img 
                                src={notificationAvatar}
                                alt="Notification Avatar" 
                                className="w-6 h-6"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-semibold mb-1">{notification.title}</p>
                              <p className="text-[#B3B3B3] text-xs mb-1">{notification.message}</p>
                              <p className="text-[#808080] text-xs">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-[#E50914] rounded-full mt-2 flex-shrink-0"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-[#444] text-center">
                      <button className="text-[#E50914] text-sm hover:underline">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Controls - Mute Button & Menu Button grouped together */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mute Button - Mobile */}
              {onToggleMute && (
                <button
                  onClick={onToggleMute}
                  className={`transition-colors ${
                    isMuted ? 'text-[#E50914]' : 'text-white hover:text-[#B3B3B3]'
                  }`}
                  aria-label={isMuted ? "Unmute background music" : "Mute background music"}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
              )}
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[#B3B3B3] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Profile */}
            <div className="relative hidden md:block profile-button">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 text-white hover:text-[#B3B3B3] transition-colors"
              >
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-8 h-8 rounded object-cover"
                />
                <ChevronDown className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-12 w-56 bg-black/95 border border-[#444] rounded overflow-hidden shadow-xl profile-dropdown">
                  {/* Other Profiles */}
                  <div className="py-2">
                    {profileId !== 'recruiter' && (
                      <button 
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onSwitchProfile?.('recruiter');
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
                      >
                        <img src={recruiterImage} alt="Recruiter" className="w-10 h-10 rounded object-cover" />
                        <span className="text-white">Recruiter</span>
                      </button>
                    )}
                    {profileId !== 'fan' && (
                      <button 
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onSwitchProfile?.('fan');
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
                      >
                        <img src={enthusiastImage} alt="Enthusiast" className="w-10 h-10 rounded object-cover" />
                        <span className="text-white">Enthusiast</span>
                      </button>
                    )}
                    {profileId !== 'marketer' && (
                      <button 
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onSwitchProfile?.('marketer');
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
                      >
                        <img src={marketerImage} alt="Marketer" className="w-10 h-10 rounded object-cover" />
                        <span className="text-white">Marketer</span>
                      </button>
                    )}
                    {profileId !== 'stranger' && (
                      <button 
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onSwitchProfile?.('stranger');
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
                      >
                        <img src={strangerImage} alt="Stranger" className="w-10 h-10 rounded object-cover" />
                        <span className="text-white">Stranger</span>
                      </button>
                    )}
                    {profileId !== 'business' && (
                      <button 
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onSwitchProfile?.('business');
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
                      >
                        <img src={prospectImage} alt="Prospect" className="w-10 h-10 rounded object-cover" />
                        <span className="text-white">Prospect</span>
                      </button>
                    )}
                  </div>

                  {/* Menu Options */}
                  <div className="border-t border-[#444] py-2">
                    <button 
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setIsManageProfilesOpen(true);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
                    >
                      <Edit className="w-5 h-5 text-white" />
                      <span className="text-white">Manage Profiles</span>
                    </button>
                    <button 
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setIsTransferProfileOpen(true);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
                    >
                      <Users className="w-5 h-5 text-white" />
                      <span className="text-white">Transfer Profile</span>
                    </button>
                    <button 
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setIsAccountOpen(true);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
                    >
                      <User className="w-5 h-5 text-white" />
                      <span className="text-white">Account</span>
                    </button>
                    <button 
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setIsHelpCentreOpen(true);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
                    >
                      <HelpCircle className="w-5 h-5 text-white" />
                      <span className="text-white">Help Centre</span>
                    </button>
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-[#444]">
                    <button 
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onBackToProfiles?.();
                      }}
                      className="w-full px-4 py-3 text-white hover:bg-[#2F2F2F] transition-colors text-center"
                    >
                      Sign out of Muneez Ahmed
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Profile Icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-7 h-7 rounded object-cover"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Profile Switcher */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#141414] pt-16 md:hidden overflow-y-auto">
          <div className="flex flex-col p-6">
            <h2 className="text-white text-xl mb-6">Switch Profile</h2>
            
            {/* Profile Options */}
            <div className="space-y-3 mb-8">
              {profileId !== 'recruiter' && (
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onSwitchProfile?.('recruiter');
                  }}
                  className="w-full p-4 flex items-center gap-4 hover:bg-[#2F2F2F] transition-colors rounded"
                >
                  <img src={recruiterImage} alt="Recruiter" className="w-16 h-16 rounded object-cover" />
                  <span className="text-white text-lg">Recruiter</span>
                </button>
              )}
              {profileId !== 'fan' && (
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onSwitchProfile?.('fan');
                  }}
                  className="w-full p-4 flex items-center gap-4 hover:bg-[#2F2F2F] transition-colors rounded"
                >
                  <img src={enthusiastImage} alt="Enthusiast" className="w-16 h-16 rounded object-cover" />
                  <span className="text-white text-lg">Enthusiast</span>
                </button>
              )}
              {profileId !== 'marketer' && (
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onSwitchProfile?.('marketer');
                  }}
                  className="w-full p-4 flex items-center gap-4 hover:bg-[#2F2F2F] transition-colors rounded"
                >
                  <img src={marketerImage} alt="Marketer" className="w-16 h-16 rounded object-cover" />
                  <span className="text-white text-lg">Marketer</span>
                </button>
              )}
              {profileId !== 'stranger' && (
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onSwitchProfile?.('stranger');
                  }}
                  className="w-full p-4 flex items-center gap-4 hover:bg-[#2F2F2F] transition-colors rounded"
                >
                  <img src={strangerImage} alt="Stranger" className="w-16 h-16 rounded object-cover" />
                  <span className="text-white text-lg">Stranger</span>
                </button>
              )}
              {profileId !== 'business' && (
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onSwitchProfile?.('business');
                  }}
                  className="w-full p-4 flex items-center gap-4 hover:bg-[#2F2F2F] transition-colors rounded"
                >
                  <img src={prospectImage} alt="Prospect" className="w-16 h-16 rounded object-cover" />
                  <span className="text-white text-lg">Prospect</span>
                </button>
              )}
            </div>

            {/* Menu Options */}
            <div className="border-t border-[#444] pt-6 space-y-3">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsManageProfilesOpen(true);
                }}
                className="w-full p-4 flex items-center gap-4 hover:bg-[#2F2F2F] transition-colors rounded"
              >
                <Edit className="w-6 h-6 text-white" />
                <span className="text-white text-lg">Manage Profiles</span>
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsTransferProfileOpen(true);
                }}
                className="w-full p-4 flex items-center gap-4 hover:bg-[#2F2F2F] transition-colors rounded"
              >
                <Users className="w-6 h-6 text-white" />
                <span className="text-white text-lg">Transfer Profile</span>
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="w-full p-4 flex items-center gap-4 hover:bg-[#2F2F2F] transition-colors rounded"
              >
                <User className="w-6 h-6 text-white" />
                <span className="text-white text-lg">Account</span>
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsHelpCentreOpen(true);
                }}
                className="w-full p-4 flex items-center gap-4 hover:bg-[#2F2F2F] transition-colors rounded"
              >
                <HelpCircle className="w-6 h-6 text-white" />
                <span className="text-white text-lg">Help Centre</span>
              </button>
            </div>

            {/* Sign Out */}
            <div className="border-t border-[#444] mt-6 pt-6">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBackToProfiles?.();
                }}
                className="w-full p-4 text-white text-center hover:bg-[#2F2F2F] transition-colors rounded text-lg"
              >
                Sign out of Muneez Ahmed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm">
          <div className="flex items-start justify-center pt-32 px-4">
            <div className="w-full max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for portfolio, skills, certifications, services..."
                  autoFocus
                  className="w-full px-6 py-4 bg-[#282828] text-white text-lg border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors"
                />
                <button 
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3] hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </form>
              
              {/* Search Results */}
              {searchResults.length > 0 ? (
                <div className="mt-6 bg-[#141414] border border-[#444] rounded overflow-hidden max-h-[500px] overflow-y-auto">
                  <div className="p-4 border-b border-[#444] sticky top-0 bg-[#141414] z-10">
                    <h3 className="text-white text-sm font-semibold">
                      {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} Found
                    </h3>
                  </div>
                  <div className="divide-y divide-[#333]">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleSearchResultClick(result)}
                        className="w-full text-left p-4 hover:bg-[#282828] transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[#E50914] rounded flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Search className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-semibold group-hover:text-[#E50914] transition-colors">
                                {result.title}
                              </h4>
                              <span className="px-2 py-0.5 bg-[#333] text-[#B3B3B3] text-xs rounded">
                                {result.category}
                              </span>
                              {result.subcategory && (
                                <span className="px-2 py-0.5 bg-[#444] text-[#999] text-xs rounded">
                                  {result.subcategory}
                                </span>
                              )}
                            </div>
                            <p className="text-[#B3B3B3] text-sm mb-2 line-clamp-2">
                              {result.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {result.tags.slice(0, 4).map((tag, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-0.5 bg-[#1a1a1a] text-[#808080] text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {result.tags.length > 4 && (
                                <span className="px-2 py-0.5 text-[#666] text-xs">
                                  +{result.tags.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchQuery.trim().length > 0 ? (
                <div className="mt-6 bg-[#141414] border border-[#444] rounded p-8 text-center">
                  <Search className="w-12 h-12 text-[#666] mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">No Results Found</h3>
                  <p className="text-[#B3B3B3] text-sm">
                    Try searching for portfolio projects, skills, certifications, or services
                  </p>
                </div>
              ) : (
                <div className="mt-6 bg-[#141414] border border-[#444] rounded overflow-hidden">
                  <div className="p-4 border-b border-[#444]">
                    <h3 className="text-white text-sm font-semibold">Popular Searches</h3>
                  </div>
                  <div className="divide-y divide-[#333]">
                    <button 
                      onClick={() => setSearchQuery('Meta Ads')}
                      className="w-full text-left block p-4 text-[#B3B3B3] hover:bg-[#282828] hover:text-white transition-colors"
                    >
                      <Search className="w-4 h-4 inline mr-3" />
                      Meta Ads & Facebook Advertising
                    </button>
                    <button 
                      onClick={() => setSearchQuery('E-commerce')}
                      className="w-full text-left block p-4 text-[#B3B3B3] hover:bg-[#282828] hover:text-white transition-colors"
                    >
                      <Search className="w-4 h-4 inline mr-3" />
                      E-commerce Success Stories
                    </button>
                    <button 
                      onClick={() => setSearchQuery('Lead Generation')}
                      className="w-full text-left block p-4 text-[#B3B3B3] hover:bg-[#282828] hover:text-white transition-colors"
                    >
                      <Search className="w-4 h-4 inline mr-3" />
                      Lead Generation Campaigns
                    </button>
                    <button 
                      onClick={() => setSearchQuery('Dubai')}
                      className="w-full text-left block p-4 text-[#B3B3B3] hover:bg-[#282828] hover:text-white transition-colors"
                    >
                      <Search className="w-4 h-4 inline mr-3" />
                      Dubai & GCC Experience
                    </button>
                    <button 
                      onClick={() => setSearchQuery('ROAS')}
                      className="w-full text-left block p-4 text-[#B3B3B3] hover:bg-[#282828] hover:text-white transition-colors"
                    >
                      <Search className="w-4 h-4 inline mr-3" />
                      High ROAS Results
                    </button>
                  </div>
                </div>
              )}
              
              <p className="text-[#808080] text-sm mt-4 text-center">
                Press ESC to close
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Menu Overlay */}
      {isProfileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#141414] pt-16 md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
            <a 
              href="#home" 
              onClick={handleNavClick}
              className="text-white text-2xl hover:text-[#E50914] transition-colors"
            >
              Home
            </a>
            <a 
              href="#work" 
              onClick={handleNavClick}
              className="text-white text-2xl hover:text-[#E50914] transition-colors"
            >
              Work
            </a>
            <a 
              href="#skills" 
              onClick={handleNavClick}
              className="text-white text-2xl hover:text-[#E50914] transition-colors"
            >
              Skills
            </a>
            <a 
              href="#education" 
              onClick={handleNavClick}
              className="text-white text-2xl hover:text-[#E50914] transition-colors"
            >
              Education
            </a>
            <a 
              href="#certifications" 
              onClick={handleNavClick}
              className="text-white text-2xl hover:text-[#E50914] transition-colors"
            >
              Certifications
            </a>
            
            {/* Profile Menu Actions */}
            <div className="flex gap-6 mt-8">
              <button className="text-white hover:text-[#E50914] transition-colors">
                <Edit className="w-7 h-7" />
              </button>
              <button className="text-white hover:text-[#E50914] transition-colors">
                <Users className="w-7 h-7" />
              </button>
              <button className="text-white hover:text-[#E50914] transition-colors">
                <User className="w-7 h-7" />
              </button>
              <button className="text-white hover:text-[#E50914] transition-colors">
                <HelpCircle className="w-7 h-7" />
              </button>
              <button className="text-white hover:text-[#E50914] transition-colors">
                <LogOut className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Profiles Dialog */}
      <Dialog open={isManageProfilesOpen} onOpenChange={setIsManageProfilesOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Profiles</DialogTitle>
            <DialogDescription>
              Add, edit, or delete your profiles.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleAddNewProfile}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
            >
              <Edit className="w-5 h-5 text-white" />
              <span className="text-white">Add New Profile</span>
            </button>
            <button 
              onClick={handleEditProfile}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
            >
              <Edit className="w-5 h-5 text-white" />
              <span className="text-white">Edit Profile</span>
            </button>
            <button 
              onClick={handleDeleteProfile}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2F2F2F] transition-colors"
            >
              <Edit className="w-5 h-5 text-white" />
              <span className="text-white">Delete Profile</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transfer Profile Dialog */}
      <Dialog open={isTransferProfileOpen} onOpenChange={setIsTransferProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transfer Profile</DialogTitle>
            <DialogDescription>
              Transfer your profile to another account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              type="email"
              value={transferEmail}
              onChange={(e) => setTransferEmail(e.target.value)}
              placeholder="Enter recipient's email"
              className="w-full px-4 py-3 bg-[#282828] text-white text-lg border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors"
            />
            <Input
              type="tel"
              value={transferPhone}
              onChange={(e) => setTransferPhone(e.target.value)}
              placeholder="Enter recipient's phone number"
              className="w-full px-4 py-3 bg-[#282828] text-white text-lg border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors"
            />
            <Button
              onClick={handleTransferProfile}
              className="w-full px-4 py-3 bg-[#E50914] text-white text-lg rounded hover:bg-[#d40c15] transition-colors"
            >
              Transfer Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Account Dialog */}
      <Dialog open={isAccountOpen} onOpenChange={setIsAccountOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Account Settings</DialogTitle>
            <DialogDescription>
              Update your account information.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              type="email"
              value={accountEmail}
              onChange={(e) => setAccountEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-[#282828] text-white text-lg border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors"
            />
            <Input
              type="tel"
              value={accountPhone}
              onChange={(e) => setAccountPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 bg-[#282828] text-white text-lg border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors"
            />
            <Button
              onClick={handleUpdateAccount}
              className="w-full px-4 py-3 bg-[#E50914] text-white text-lg rounded hover:bg-[#d40c15] transition-colors"
            >
              Update Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Centre Dialog */}
      <Dialog open={isHelpCentreOpen} onOpenChange={setIsHelpCentreOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Help Centre</DialogTitle>
            <DialogDescription>
              Get support and answers to your questions.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Can Muneez really turn my business into the next Netflix of marketing?</AccordionTrigger>
                  <AccordionContent>
                    Well, he can't promise you'll binge-watch your own success story, but with 7+ years of digital marketing magic in Dubai, he's turned clicks into conversions and campaigns into cash. Warning: Results may cause excessive celebration.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Does Muneez actually respond to emails or is he too busy being a marketing genius?</AccordionTrigger>
                  <AccordionContent>
                    Unlike your unread LinkedIn messages, Muneez replies within 24 hours! Based in Dubai, he's powered by strong coffee and stronger Wi-Fi. Reach him at his actual email or LinkedIn - he won't ghost you like that influencer who promised to collaborate.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Why does this portfolio look like Netflix? Is Muneez secretly Reed Hastings?</AccordionTrigger>
                  <AccordionContent>
                    Plot twist: He's not! But if you can steal Netflix's UI/UX success, why not? Just like how great marketers "borrow" ideas that work, this design proves Muneez understands what keeps users engaged. Spoiler alert: It's working on you right now.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What's the difference between the 5 profiles? Are they all just Muneez flexing?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely yes, but strategically! Recruiter sees hiring potential, Enthusiast gets the deep marketing geek stuff, Marketer views campaign strategies, Stranger gets the elevator pitch, and Prospect sees ROI. It's like having 5 resumes but way cooler and less boring.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Is Muneez's LinkedIn as impressive as this website suggests?</AccordionTrigger>
                  <AccordionContent>
                    Short answer: Yes. Long answer: Yessssss! With expertise in SEO, SEM, Social Media, Analytics, and probably knows more Google Ads shortcuts than Google employees, his LinkedIn is basically a masterclass. Connect if you dare to feel under-qualified (just kidding, he's actually super nice).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Can I download Muneez's brain for my marketing problems?</AccordionTrigger>
                  <AccordionContent>
                    While brain downloads aren't available yet (Apple's working on it), you can download case studies, portfolios, and contact him for actual marketing solutions. Think of it as "Muneez-as-a-Service" but without the recurring subscription fee... yet.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            <TabsContent value="support" className="mt-4">
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-[#1a1a1a] rounded border border-[#444]">
                  <h3 className="text-white mb-2">Email Support</h3>
                  <p className="text-[#B3B3B3] text-sm mb-2">Get help via email</p>
                  <a href="mailto:hello@muneezahmed.com" className="text-[#E50914] text-sm hover:underline">
                    hello@muneezahmed.com
                  </a>
                </div>
                
                <div className="p-4 bg-[#1a1a1a] rounded border border-[#444]">
                  <h3 className="text-white mb-2">Phone Support</h3>
                  <p className="text-[#B3B3B3] text-sm mb-2">Call us directly</p>
                  <a href="tel:+971586388362" className="text-[#E50914] text-sm hover:underline">
                    +971 58 638 8362
                  </a>
                </div>
                
                <div className="p-4 bg-[#1a1a1a] rounded border border-[#444]">
                  <h3 className="text-white mb-2">LinkedIn</h3>
                  <p className="text-[#B3B3B3] text-sm mb-2">Connect on LinkedIn</p>
                  <a href="https://www.linkedin.com/in/mrmnz/" target="_blank" rel="noopener noreferrer" className="text-[#E50914] text-sm hover:underline">
                    linkedin.com/in/mrmnz
                  </a>
                </div>
                
                <div className="p-4 bg-[#1a1a1a] rounded border border-[#444]">
                  <h3 className="text-white mb-2">Support Hours</h3>
                  <p className="text-[#B3B3B3] text-sm">
                    24*7<br />
                    Response time: Within 3 hours
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="mt-4">
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="contact-name" className="text-white">Name</Label>
                  <Input
                    id="contact-name"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-[#282828] text-white border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact-email" className="text-white">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-[#282828] text-white border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact-message" className="text-white">Message</Label>
                  <Textarea
                    id="contact-message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Enter your message"
                    rows={5}
                    className="w-full px-4 py-3 bg-[#282828] text-white border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors mt-2 resize-none"
                  />
                </div>
                
                <Button
                  onClick={handleContactSubmit}
                  className="w-full px-4 py-3 bg-[#E50914] text-white rounded hover:bg-[#d40c15] transition-colors"
                >
                  Send Message
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Add Profile Dialog */}
      <Dialog open={isAddProfileOpen} onOpenChange={setIsAddProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Profile</DialogTitle>
            <DialogDescription>
              Create a new profile with a unique name and type.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              placeholder="Enter profile name"
              className="w-full px-4 py-3 bg-[#282828] text-white text-lg border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors"
            />
            <Input
              type="text"
              value={newProfileType}
              onChange={(e) => setNewProfileType(e.target.value)}
              placeholder="Enter profile type"
              className="w-full px-4 py-3 bg-[#282828] text-white text-lg border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors"
            />
            <Button
              onClick={handleAddProfileSubmit}
              className="w-full px-4 py-3 bg-[#E50914] text-white text-lg rounded hover:bg-[#d40c15] transition-colors"
            >
              Add Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile name and verify your identity.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              value={editProfileName}
              onChange={(e) => setEditProfileName(e.target.value)}
              placeholder="Enter new profile name"
              className="w-full px-4 py-3 bg-[#282828] text-white text-lg border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors"
            />
            <Input
              type="email"
              value={verificationEmail}
              onChange={(e) => setVerificationEmail(e.target.value)}
              placeholder="Enter your email to verify"
              className="w-full px-4 py-3 bg-[#282828] text-white text-lg border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors"
            />
            <Button
              onClick={handleEditProfileSubmit}
              className="w-full px-4 py-3 bg-[#E50914] text-white text-lg rounded hover:bg-[#d40c15] transition-colors"
            >
              Update Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Profile Dialog */}
      <Dialog open={isDeleteProfileOpen} onOpenChange={setIsDeleteProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Profile</DialogTitle>
            <DialogDescription>
              Confirm profile deletion by verifying your identity.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              type="email"
              value={verificationEmail}
              onChange={(e) => setVerificationEmail(e.target.value)}
              placeholder="Enter your email to verify"
              className="w-full px-4 py-3 bg-[#282828] text-white text-lg border-2 border-[#444] rounded focus:outline-none focus:border-[#E50914] transition-colors"
            />
            <Button
              onClick={handleDeleteProfileConfirm}
              className="w-full px-4 py-3 bg-[#E50914] text-white text-lg rounded hover:bg-[#d40c15] transition-colors"
            >
              Delete Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}