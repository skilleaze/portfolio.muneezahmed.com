import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Download, ExternalLink, Mail, Phone, MapPin, Briefcase, TrendingUp, Users, BarChart3, Rocket, Check, Code, Megaphone, ShoppingCart, Search, Star, Linkedin, User, Gift, Lightbulb, Target, Award, Calendar, GraduationCap, Zap, DollarSign, Eye, MousePointerClick, Activity, UserPlus, Sparkles } from 'lucide-react';
import { NavBar } from './NavBar';
import { ContentRow } from './ContentRow';
import { DetailModal } from './DetailModal';
import { Footer } from './Footer';
import { useNotifications } from './NotificationContext';
import { useBackgroundMusic } from './useBackgroundMusic';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { MarketingApproach } from './MarketingApproach';
import { ProofOfWork } from './ProofOfWork';
import { ecommercePortfolioData } from './ecommercePortfolioData';
import { leadGenPortfolioData } from './leadGenPortfolioData';
import { webDevPortfolioData } from './webDevPortfolioData';
import { seoPortfolioData } from './seoPortfolioData';

interface StrangerProfileProps {
  onBackToProfiles: () => void;
  onSwitchProfile?: (profileId: 'recruiter' | 'fan' | 'marketer' | 'stranger' | 'business') => void;
  profileId?: string;
}

export function StrangerProfile({ onBackToProfiles, onSwitchProfile, profileId }: StrangerProfileProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllStories, setShowAllStories] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const { addNotification } = useNotifications();
  
  // Play background music for Stranger profile
  const { isMuted, toggleMute } = useBackgroundMusic('https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/pxl5qk0l/k23/mm9/rzo/STRANGER.MP3', true);
  
  // Ref for the Success Stories section to observe scroll
  const successStoriesRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to auto-expand when scrolling
  useEffect(() => {
    if (!hasIntroduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the success stories section is 50% visible, expand it
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setShowAllStories(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -100px 0px', // Slight offset from bottom
      }
    );

    if (successStoriesRef.current) {
      observer.observe(successStoriesRef.current);
    }

    return () => {
      if (successStoriesRef.current) {
        observer.unobserve(successStoriesRef.current);
      }
    };
  }, [hasIntroduced]);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    
    const funMessages = [
      { title: 'Welcome Aboard!', message: `\"${item.title}\" is a great place to start exploring!` },
      { title: 'Great Choice!', message: `\"${item.title}\" - You've got good instincts!` },
      { title: 'Interesting Pick!', message: `\"${item.title}\" is one of my highlights. Take a look!` },
      { title: 'On Target!', message: `\"${item.title}\" - Perfect choice for getting to know me!` },
      { title: 'Nice Discovery!', message: `\"${item.title}\" unlocked! There's so much more to explore.` },
    ];
    
    const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)];
    
    addNotification({
      title: randomMessage.title,
      message: randomMessage.message,
      type: 'general',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const allSuccessStories = [
    ...ecommercePortfolioData.map(item => ({ ...item, id: `ecom-${item.id}` })),
    ...leadGenPortfolioData.map(item => ({ ...item, id: `leadgen-${item.id}` })),
    ...webDevPortfolioData.map(item => ({ ...item, id: `webdev-${item.id}` })),
    ...seoPortfolioData.map(item => ({ ...item, id: `seo-${item.id}` })),
  ];

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = nameInput.trim();
    
    if (!trimmedName) {
      toast.error('Please enter your name.');
      return;
    }
    
    // Validation: Check if name seems real
    const isValidName = validateName(trimmedName);
    
    if (!isValidName) {
      toast.error("Don't try to fool me. Use your real name.");
      return;
    }
    
    setVisitorName(trimmedName);
    setHasIntroduced(true);
    toast.success(`Welcome, ${trimmedName}! Enjoy exploring my portfolio.`);
  };

  // Name validation function
  const validateName = (name: string): boolean => {
    // Must be at least 4 characters
    if (name.length < 4) {
      return false;
    }
    
    // Convert to lowercase for checking
    const lowerName = name.toLowerCase();
    
    // No numbers allowed in name
    const hasNumbers = /[0-9]/.test(name);
    if (hasNumbers) {
      return false;
    }
    
    // Common fake/test names to reject
    const fakeNames = [
      'cat', 'dog', 'test', 'asdf', 'qwerty', 'abcd', 'wxyz', 
      'aaaa', 'bbbb', 'cccc', 'dddd', 'eeee', 'ffff', 'gggg', 'hhhh',
      'iiii', 'jjjj', 'kkkk', 'llll', 'mmmm', 'nnnn', 'oooo', 'pppp',
      'qqqq', 'rrrr', 'ssss', 'tttt', 'uuuu', 'vvvv', 'wwww', 'xxxx',
      'yyyy', 'zzzz', 'hello', 'hiii', 'heyyy', 'okay', 'nope',
      'yeah', 'loll', 'haha', 'bruh', 'dude', 'mate', 'bros',
      'stranger', 'anonymous', 'anon', 'user', 'guest', 'admin',
      'name', 'your', 'real', 'fake'
    ];
    
    if (fakeNames.includes(lowerName)) {
      return false;
    }
    
    // Check for keyboard mashing patterns (repeated characters or sequential keys)
    // Reject if more than 60% of characters are the same
    const charCounts: { [key: string]: number } = {};
    for (const char of lowerName) {
      charCounts[char] = (charCounts[char] || 0) + 1;
    }
    const maxRepeat = Math.max(...Object.values(charCounts));
    if (maxRepeat / name.length > 0.6) {
      return false;
    }
    
    // Check if it contains at least some letters
    const hasLetters = /[a-zA-Z]/.test(name);
    if (!hasLetters) {
      return false;
    }
    
    // Check for random keyboard mashing (like "asdfgh", "qwerty", etc)
    const keyboardPatterns = ['asdf', 'qwer', 'zxcv', 'hjkl', 'yuiop', 'fghj', 'sdfg', 'tyui', 'ghjk', 'vbnm'];
    for (const pattern of keyboardPatterns) {
      if (lowerName.includes(pattern)) {
        return false;
      }
    }
    
    // If name has 4 chars and all are the same letter, reject
    if (name.length === 4) {
      const allSame = name.split('').every(char => char.toLowerCase() === name[0].toLowerCase());
      if (allSame) {
        return false;
      }
    }
    
    return true;
  };

  return (
    <div className="min-h-screen bg-[#141414]">
      <NavBar 
        profileId={profileId} 
        onBackToProfiles={onBackToProfiles} 
        onSwitchProfile={onSwitchProfile}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Hero Section - Before Introduction */}
      {!hasIntroduced && (
        <div id="home" className="relative min-h-[90vh] flex items-center justify-center pt-16 md:pt-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNtcnJwZGVyc2MxdWNkdXUwcjE5ZDg4YTZvb3JhNDU5bGlpZ2x2biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2SpNiRdym9KvG1AA/giphy.gif)',
            }}
          >
            <div className="absolute inset-0 bg-[#141414]/80"></div>
          </div>

          <div className="relative z-10 px-6 md:px-12 max-w-2xl text-center">
            <div className="flex justify-center mb-6">
              <Eye className="w-16 h-16 text-[#E50914] animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-up">
              Hello, Stranger!
            </h1>
            
            <p className="text-xl text-[#B3B3B3] mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: '100ms' }}>
              I'm Muneez Ahmed, a Digital Marketing Specialist.
            </p>

            <div className="bg-[#2F2F2F] border-2 border-[#E50914]/30 rounded-lg p-8 mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <UserPlus className="w-6 h-6 text-[#E50914]" />
                <h3 className="text-white text-xl">Before we continue...</h3>
              </div>
              <p className="text-[#B3B3B3] mb-6">
                I don't expose myself to strangers. May I know your name first?
              </p>
              
              <form onSubmit={handleNameSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="flex-1 bg-[#1F1F1F] border-[#3F3F3F] text-white placeholder:text-[#666666] px-4 py-6"
                />
                <Button
                  type="submit"
                  className="bg-[#E50914] text-white px-8 py-6 rounded hover:bg-[#B8070F] transition-all transform hover:scale-105"
                >
                  Continue
                </Button>
              </form>
            </div>

            <p className="text-sm text-[#666666] animate-fade-up" style={{ animationDelay: '300ms' }}>
              Don't worry, your privacy matters. This stays between us.
            </p>
          </div>
        </div>
      )}

      {/* Hero Section - After Introduction */}
      {hasIntroduced && (
        <>
          <div id="home" className="relative min-h-[70vh] md:min-h-[85vh] flex items-end pb-20 md:pb-32 pt-24 md:pt-16">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNtcnJwZGVyc2MxdWNkdXUwcjE5ZDg4YTZvb3JhNDU5bGlpZ2x2biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2SpNiRdym9KvG1AA/giphy.gif)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 px-6 md:px-12 max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-[#E50914]" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
                Hello, {visitorName}!
              </h1>
              
              <p className="text-xl text-[#B3B3B3] mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: '100ms' }}>
                Great to meet you! Now that we're acquainted, let me show you what I do and how I help businesses grow through strategic digital marketing.
              </p>

              <div className="bg-[#2F2F2F] rounded-lg p-6 mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
                <h3 className="text-white font-bold mb-4">About Me</h3>
                <ul className="space-y-3 text-[#B3B3B3]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E50914]">•</span>
                    <span>Digital Marketing Specialist based in Dubai, UAE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E50914]">•</span>
                    <span>5+ years of experience driving growth for e-commerce, SaaS, and B2B brands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E50914]">•</span>
                    <span>Specialized in Meta Ads, Google Ads, LinkedIn Ads, and Marketing Automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E50914]">•</span>
                    <span>Generated AED 7M+ in revenue and 50K+ qualified leads for clients worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E50914]">•</span>
                    <span>Average ROAS: 8-10x across campaigns with highest recorded at 13x</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-[#E50914]/20 to-transparent border border-[#E50914]/30 rounded-lg p-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
                <h3 className="text-white font-bold mb-3">What I Do</h3>
                <p className="text-[#B3B3B3] leading-relaxed">
                  I help businesses achieve measurable growth through data-driven digital marketing strategies. 
                  From scaling e-commerce stores to generating high-quality B2B leads, I create campaigns that deliver real ROI. 
                  Explore my success stories below to see the impact.
                </p>
              </div>
            </div>
          </div>

          {/* Content Rows - Success Stories */}
          <div className="py-8">
            <div ref={successStoriesRef}>
              <ContentRow title="Success Stories" items={allSuccessStories} onItemClick={handleItemClick} />
            </div>
            
            {/* Expand Arrow Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAllStories(!showAllStories)}
                className="text-[#B3B3B3] hover:text-white transition-all group"
                aria-label={showAllStories ? 'Hide all stories' : 'Show all stories'}
              >
                {showAllStories ? (
                  <ChevronUp className="w-8 h-8 transition-transform group-hover:-translate-y-1" />
                ) : (
                  <ChevronDown className="w-8 h-8 transition-transform group-hover:translate-y-1" />
                )}
              </button>
            </div>

            {/* Expandable Grid View - Full View of All Success Stories */}
            {showAllStories && (
              <div className="px-6 md:px-12 mt-8 animate-fade-up">
                <h2 className="text-2xl text-white mb-6">All Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {allSuccessStories.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="group cursor-pointer relative overflow-hidden rounded-lg bg-[#1F1F1F] hover:scale-105 transition-all duration-300"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-[#B3B3B3] mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags?.slice(0, 3).map((tag: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-[#2F2F2F] text-[#B3B3B3] rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <Footer />

      {/* Detail Modal */}
      {isModalOpen && selectedItem && (
        <DetailModal
          isOpen={isModalOpen}
          item={selectedItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}