import { useState, useEffect, useRef } from 'react';
import { ContentRow } from './ContentRow';
import { DetailModal } from './DetailModal';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { useNotifications } from './NotificationContext';
import { useBackgroundMusic } from './useBackgroundMusic';
import { Target, Zap, TrendingUp, Award, Lock, Mail, X, ChevronDown, ChevronUp, Lightbulb, Rocket, Gift, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MarketingApproach } from './MarketingApproach';
import { ProofOfWork } from './ProofOfWork';
import { leadGenPortfolioData } from './leadGenPortfolioData';
import { webDevPortfolioData } from './webDevPortfolioData';
import { seoPortfolioData } from './seoPortfolioData';
import { sendFormEmails } from './emailService';

interface MarketerProfileProps {
  onBackToProfiles: () => void;
  onSwitchProfile?: (profileId: 'recruiter' | 'fan' | 'marketer' | 'stranger' | 'business') => void;
  profileId?: string;
}

export function MarketerProfile({ onBackToProfiles, onSwitchProfile, profileId }: MarketerProfileProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllStories, setShowAllStories] = useState(false);
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false);
  const [isSecretDialogOpen, setIsSecretDialogOpen] = useState(false);
  const [secretEmail, setSecretEmail] = useState('');
  const { addNotification } = useNotifications();

  // Play background music for Marketer profile
  const { isMuted, toggleMute } = useBackgroundMusic('https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/pxl5qk0l/z3b/hra/3p8/MARKETER.MP3', true);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    
    // Array of fun notification messages for marketer
    const funMessages = [
      { title: 'Data Gold!', message: `\"${item.title}\" is pure marketing intelligence. Nice pick!` },
      { title: 'Genius Move!', message: `\"${item.title}\" - That's what I call strategy!` },
      { title: 'Conversion King!', message: `\"${item.title}\" is the secret sauce you've been looking for.` },
      { title: 'Growth Hacker!', message: `\"${item.title}\" unlocked! Time to scale this baby.` },
      { title: 'ROI on Fire!', message: `\"${item.title}\" is about to blow your mind with results.` },
      { title: 'Performance Beast!', message: `\"${item.title}\" loaded! This is how pros do it.` },
      { title: 'Money Maker!', message: `\"${item.title}\" - Where the magic happens. Let's go!` },
      { title: 'Launch Mode!', message: `\"${item.title}\" activated! Prepare for liftoff.` },
      { title: 'Campaign Ready!', message: `\"${item.title}\" is your next winning campaign!` },
      { title: 'Premium Strategy!', message: `\"${item.title}\" - This is the playbook you need.` },
      { title: 'Marketing Marvel!', message: `\"${item.title}\" is marketing excellence in action!` },
      { title: 'Industry Secret!', message: `\"${item.title}\" - Now you know what the top 1% do!` },
    ];
    
    // Pick a random message
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

  const handleSecretSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretEmail) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(secretEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      // Send emails using EmailJS
      const { leadSent, thankYouSent } = await sendFormEmails({
        name: 'Marketer',
        email: secretEmail,
        message: 'Requesting exclusive marketing insights and secrets',
        formType: 'secret',
      });

      if (leadSent && thankYouSent) {
        // Show success toast
        toast.success('Secret unlocked! Check your email for exclusive marketing insights.');
        
        // Add notification
        addNotification({
          title: 'Secret Unlocked!',
          message: `Marketing insights sent to ${secretEmail}. Check your inbox!`,
          type: 'general',
        });
        
        // Close dialog and reset email
        setIsSecretDialogOpen(false);
        setSecretEmail('');
      } else {
        toast.error('Failed to send. Please try again or email hello@muneezahmed.com');
      }
    } catch (error) {
      console.error('Secret form error:', error);
      toast.error('Failed to send. Please try again.');
    }
  };

  const strategies = [
    {
      id: '1',
      title: 'Meta Ads Mastery',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjExNjc3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Advanced targeting, creative testing, and scaling strategies for Meta platforms',
      tags: ['Facebook', 'Instagram', 'ROAS 8.5X'],
    },
    {
      id: '2',
      title: 'Google Ads Performance',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBhZHMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYxMjIwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Search, Display, Shopping campaigns optimized for maximum conversions',
      tags: ['Search', 'Display', 'Shopping'],
    },
    {
      id: '3',
      title: 'Conversion Rate Optimization',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBhZHMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYxMjIwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Landing page optimization and funnel engineering for higher conversions',
      tags: ['CRO', 'A/B Testing', 'Funnels'],
    },
    {
      id: '4',
      title: 'Email Marketing Automation',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG1hcmtldGluZyUyMGNhbXBhaWdufGVufDF8fHx8MTc2MTEzNzg1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Sophisticated drip campaigns and behavioral email sequences',
      tags: ['Email', 'Automation', 'Nurture'],
    },
  ];

  const tools = [
    {
      id: '1',
      title: 'Meta Business Suite',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjExNjc3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Complete mastery of Ads Manager, Business Manager, and analytics',
      tags: ['Meta', 'Facebook', 'Instagram'],
    },
    {
      id: '2',
      title: 'Google Marketing Platform',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBhZHMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYxMjIwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Google Ads, Analytics 4, Tag Manager, and Search Console expertise',
      tags: ['Google', 'GA4', 'GTM'],
    },
    {
      id: '3',
      title: 'Bitrix24 CRM',
      image: 'https://images.unsplash.com/photo-1617012811506-344ff32b7055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MTIyMDY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Advanced CRM setup, automation workflows, and sales pipeline management',
      tags: ['CRM', 'Automation', 'Sales'],
    },
    {
      id: '4',
      title: 'Marketing Analytics Stack',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBhZHMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYxMjIwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Data Studio, Looker, Hotjar, and custom analytics dashboards',
      tags: ['Analytics', 'Data', 'Dashboards'],
    },
  ];

  const insights = [
    {
      id: '1',
      title: 'UAE Market Insights',
      image: 'https://images.unsplash.com/photo-1617012811506-344ff32b7055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MTIyMDY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Deep understanding of Dubai & UAE digital marketing landscape',
      tags: ['Dubai', 'UAE', 'MENA'],
    },
    {
      id: '2',
      title: 'Industry Trends 2025',
      image: 'https://images.unsplash.com/photo-1676287567295-135ce512839a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwc3RyYXRlZ3klMjBwbGFubmluZ3xlbnwxfHx8fDE3NjEyMDIzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Latest trends in AI-powered marketing, automation, and personalization',
      tags: ['AI', 'Trends', 'Innovation'],
    },
  ];

  const metaMarketing = [
    {
      id: '1',
      title: 'This Netflix Portfolio',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXRmbGl4JTIwbG9nb3xlbnwxfHx8fDE3NjEyMjA2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Built this entire Netflix-themed portfolio to stand out from boring CVs and prove one simple thing: if I can market myself creatively, I can market anything',
      tags: ['Creative Strategy', 'Differentiation', 'Proof of Concept'],
      details: {
        challenge: 'Every marketer has the same portfolio. Same layout. Same case studies. Same boring approach. How do you stand out in a sea of identical LinkedIn profiles?',
        solution: 'Create an unforgettable experience. Netflix is synonymous with binge-worthy content. So I built a portfolio that lets you binge my work. Complete with profile selection, horizontal scrolling, hover effects, and the signature red-black aesthetic.',
        results: 'This IS the marketing. The portfolio itself proves the point. Attention grabbed. Engagement increased. Memorable impression created. Mission accomplished.',
        learnings: 'Marketing yourself is the ultimate test. No budget. No team. Just strategy, creativity, and execution. If you can market yourself in a crowded space, you can market anything in any market.',
      },
    },
    {
      id: '2',
      title: 'The Anti-Template Approach',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0cmF0ZWd5fGVufDF8fHx8MTc2MTIyMDY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Why I never use cookie-cutter templates for campaigns. Custom creative, custom funnels, custom everything because one-size-fits-all is one-size-fits-none',
      tags: ['Custom Creative', 'Differentiation', 'Brand Strategy'],
      details: {
        challenge: 'Clients come with generic briefs wanting generic results. But generic doesn\'t cut through noise.',
        solution: 'Every campaign starts from scratch. Custom audience research. Custom creative strategy. Custom funnel design. Templates are for amateurs.',
        results: 'Higher CTRs. Lower CPAs. Better brand recall. When you look different, you perform different.',
        learnings: 'The extra work upfront pays massive dividends. Custom beats template every single time.',
      },
    },
    {
      id: '3',
      title: 'Pattern Interruption Mastery',
      image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGFkcyUyMGNyZWF0aXZlfGVufDF8fHx8MTc2MTIyMDY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'How to stop the scroll. Creative frameworks for breaking through ad blindness and capturing attention in crowded feeds',
      tags: ['Creative Strategy', 'Attention Economics', 'Hook Frameworks'],
      details: {
        challenge: 'Users scroll past 99% of ads without even registering them. How do you make them stop?',
        solution: 'Pattern interruption. Unexpected visuals. Contrarian hooks. Scroll-stopping first frames. Make them do a double-take.',
        results: 'Hook rate is the new CTR. The first 3 seconds determine everything. Get the stop, get the click, get the conversion.',
        learnings: 'Attention is the scarcest resource in marketing. You earn it or you lose. There\'s no middle ground.',
      },
    },
    {
      id: '4',
      title: 'Marketing Yourself = Marketing Mastery',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMGJyYW5kaW5nfGVufDF8fHx8MTc2MTIyMDY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'The philosophy: If you cannot market yourself effectively in a competitive space, how can you confidently market products and services for clients?',
      tags: ['Personal Branding', 'Marketing Philosophy', 'Proof of Work'],
      details: {
        challenge: 'Every marketer claims they\'re great. But where\'s the proof? Your own brand IS the proof.',
        solution: 'Treat yourself like a client. Build a brand. Create content. Design experiences. Execute campaigns. Show, don\'t tell.',
        results: 'Your personal brand becomes your ultimate portfolio piece. It demonstrates strategic thinking, creative execution, and marketing effectiveness.',
        learnings: 'Marketing yourself is harder than marketing a product because YOU are the product, the marketer, and the critic. Master that, master marketing.',
      },
    },
  ];

  const leadGenPortfolio = leadGenPortfolioData;

  const webDevPortfolio = webDevPortfolioData;

  const seoPortfolio = seoPortfolioData;

  // Combine all portfolio items into one comprehensive "Success Stories" section
  // Add unique prefixes to avoid duplicate keys
  const allSuccessStories = [
    ...leadGenPortfolioData.map(item => ({ ...item, id: `leadgen-${item.id}` })),
    ...webDevPortfolioData.map(item => ({ ...item, id: `webdev-${item.id}` })),
    ...seoPortfolioData.map(item => ({ ...item, id: `seo-${item.id}` })),
  ];

  return (
    <div className="min-h-screen bg-[#141414]">
      <NavBar 
        profileId={profileId} 
        onBackToProfiles={onBackToProfiles} 
        onSwitchProfile={onSwitchProfile}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Hero Section */}
      <div id="home" className="relative min-h-[100vh] md:h-[85vh] flex items-center md:items-end pb-8 md:pb-32 pt-24 md:pt-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWx6N3o0eGtrZ2F3Mm5oMTdrNWE2anpiZmJyb2F5a3Bjb3pmbjhheiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8zjUHaJ9fjAVG/giphy.gif)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 md:px-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-8 h-8 text-[#E50914]" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
            Marketer to Marketer
          </h1>
          <p className="text-lg text-[#B3B3B3] mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: '100ms' }}>
            You know the grind. The late nights optimizing campaigns. The thrill of a winning creative. The pain of wasted ad spend.
            I've been there. Whether you're here for inspiration, fresh ideas, or just curious what's working in performance marketing
            right now, grab a coffee and dive in. No fluff. Just strategies, numbers, and stories from someone who lives and breathes
            qualified lead generation and e-commerce growth.
          </p>

          <div className="flex gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <button 
              onClick={() => setIsPlaybookOpen(true)}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-white/90 transition-all transform hover:scale-105"
            >
              <Rocket className="w-5 h-5" />
              <span>Behind The Numbers</span>
            </button>
            <button 
              onClick={() => setIsSecretDialogOpen(true)}
              className="flex items-center gap-2 bg-[#E50914] text-white px-8 py-3 rounded hover:bg-[#B8070F] transition-all transform hover:scale-105"
            >
              <Gift className="w-5 h-5" />
              <span>Get a Secret</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="py-8">
        <div id="success-stories">
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
        
        {/* Marketing Approach - Unique Visual Section */}
        <div id="marketing-approach">
          <MarketingApproach />
        </div>
        
        {/* Proof of Work - SEO Rankings & Personal Branding */}
        <div id="proof-of-work">
          <ProofOfWork />
        </div>
      </div>

      <Footer />

      {/* Detail Modal */}
      {isModalOpen && selectedItem && (
        <DetailModal
          isOpen={isModalOpen}
          item={selectedItem}
          onClose={handleCloseModal}
        />
      )}

      {/* Playbook Dialog */}
      <Dialog open={isPlaybookOpen} onOpenChange={setIsPlaybookOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#1a1a1a] to-[#141414] border-[#333]">
          <DialogTitle className="sr-only">Marketing Journey</DialogTitle>
          <DialogDescription className="sr-only">
            The story of a marketer's journey from curiosity to mastery
          </DialogDescription>
          
          <div className="relative p-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <img 
                src="https://www.muneezahmed.com/_assets/v11/79875908ca577de1dafcf4d0e1198a2a131ff37b.png"
                alt="Muneez Ahmed" 
                className="w-24 h-24 rounded-full object-cover border-4 border-[#E50914] shadow-xl mb-6 mx-auto"
              />
              <h2 className="text-white text-4xl mb-3">The Marketing Journey</h2>
              <p className="text-[#E50914] text-xl">From First Campaign to 8.5X ROAS</p>
            </div>

            {/* Main Story */}
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Introduction */}
              <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-8 border-l-4 border-[#E50914]">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-[#E50914]" />
                  <h3 className="text-white text-2xl">The First Click</h3>
                </div>
                <p className="text-[#B3B3B3] leading-relaxed text-lg">
                  Remember your first campaign? Mine was terrifying. A Computer Science grad diving into paid ads 
                  with no idea what CPC, CTR, or ROAS even meant. But that first campaign taught me everything: 
                  testing is mandatory, data doesn't lie, and every dollar spent is a lesson learned. I lost money. 
                  I made mistakes. But I learned the language of performance marketing the hard way.
                </p>
              </div>

              {/* The Learning Curve */}
              <div className="bg-[#2F2F2F] rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-[#E50914]" />
                  <h3 className="text-white text-2xl">Scaling The Hard Way</h3>
                </div>
                <p className="text-[#B3B3B3] leading-relaxed text-lg mb-4">
                  Managing a 10-person team across India, the UAE and the USA while still early in my career?
                  That's trial by fire. At BB Leads Digital Marketing Agency, I discovered what separates average
                  marketers from great ones: systems. Not tactics. Not hacks. Systems that scale.
                </p>
                <p className="text-[#B3B3B3] leading-relaxed text-lg">
                  I built automation workflows, perfected multi-channel attribution, and learned that great campaigns
                  aren't built in dashboards. They're built in spreadsheets, docs, and late-night strategy sessions.
                </p>
              </div>

              {/* Career Milestones */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E50914] to-[#ff9999] rounded-full"></div>

                <div className="pl-8 space-y-8">
                  {/* Kaye & Co */}
                  <div className="bg-[#2F2F2F] rounded-xl p-6 hover:bg-[#3F3F3F] transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="w-5 h-5 text-[#E50914]" />
                      <span className="text-[#E50914]">2023 – 2024 | Kaye & Co. Real Estate, Dubai</span>
                    </div>
                    <h4 className="text-white text-xl mb-3">When Real Estate Met Performance Marketing</h4>
                    <p className="text-[#B3B3B3] leading-relaxed">
                      Kaye & Co. Real Estate taught me precision. Generating 1,000+ qualified leads per month means
                      you can't afford wasted spend. I mastered Google Ads and Microsoft Bing Ads at a granular level,
                      built high-converting landing pages in WordPress and Tilda, and automated lead routing with
                      WhatsApp API and Zapier. High-ticket real estate marketing is a different game: lower tolerance
                      for waste, higher intent, perfect execution.
                    </p>
                  </div>

                  {/* Signature Collection Realty */}
                  <div className="bg-[#2F2F2F] rounded-xl p-6 hover:bg-[#3F3F3F] transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-5 h-5 text-[#E50914]" />
                      <span className="text-[#E50914]">2024 – 2025 | Signature Collection Realty, Dubai</span>
                    </div>
                    <h4 className="text-white text-xl mb-3">Luxury Lead Gen at Scale — and a Promotion</h4>
                    <p className="text-[#B3B3B3] leading-relaxed">
                      At Signature Collection Realty I ran lead generation for luxury off-plan and secondary properties,
                      achieving 3x growth in qualified leads. I was promoted from Performance Marketing Specialist to
                      Digital Marketing Manager within 6 months. Meta and Google Ads backed by Conversions API and
                      offline conversion tracking, PropSpace CRM automation, and project-specific landing pages all
                      worked together to convert leads into property viewings faster.
                    </p>
                  </div>

                  {/* The Results */}
                  <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-6 border-2 border-[#E50914]">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-[#E50914]" />
                      <span className="text-[#E50914]">The Numbers Don't Lie</span>
                    </div>
                    <h4 className="text-white text-xl mb-3">What 5+ Years Taught Me</h4>
                    <p className="text-[#B3B3B3] leading-relaxed mb-4">
                      1,000+ qualified leads per month. 3x lead growth. 45% increase in qualified leads at current role.
                      30% average e-commerce sales growth. But the real wins weren't the numbers. It was the systems
                      I built, the frameworks I created, and the processes that turned chaotic campaigns into predictable
                      growth engines.
                    </p>
                    <p className="text-[#B3B3B3] leading-relaxed">
                      Real estate, e-commerce, financial services, B2B — I've run performance campaigns across every
                      vertical in the UAE, India and the USA. Each one taught me something new about audiences,
                      psychology, and what makes people act.
                    </p>
                  </div>
                </div>
              </div>

              {/* Marketing Philosophy */}
              <div className="bg-gradient-to-br from-[#E50914]/10 to-transparent rounded-xl p-8 border border-[#E50914]/30">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-[#E50914]" />
                  <h3 className="text-white text-2xl">What I Believe</h3>
                </div>
                <p className="text-[#B3B3B3] leading-relaxed text-lg mb-4">
                  Most marketers chase tactics. I chase systems. Tactics expire. TikTok ads won't work forever. 
                  iOS updates will keep breaking attribution. Platforms will change. But systems? Systems scale. 
                  Systems adapt. Systems compound.
                </p>
                <p className="text-white leading-relaxed text-lg italic">
                  "Marketing isn't about running ads. It's about building machines that turn spend into revenue, 
                  traffic into customers, and data into decisions. That's the game. And I'm really good at it."
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <div className="bg-[#2F2F2F] rounded-lg p-2.5 md:p-4 text-center border border-[#444] hover:border-[#E50914] transition-all flex flex-col items-center justify-center">
                  <div className="text-[#E50914] text-lg md:text-2xl mb-0.5 md:mb-1">8.5X</div>
                  <div className="text-white text-[9px] md:text-xs mb-0.5 leading-tight">Best ROAS</div>
                  <div className="text-[#808080] text-[8px] md:text-xs leading-tight">Meta Campaigns</div>
                </div>
                <div className="bg-[#2F2F2F] rounded-lg p-2.5 md:p-4 text-center border border-[#444] hover:border-[#E50914] transition-all flex flex-col items-center justify-center">
                  <div className="text-[#E50914] text-lg md:text-2xl mb-0.5 md:mb-1">50K+</div>
                  <div className="text-white text-[9px] md:text-xs mb-0.5 leading-tight">Leads</div>
                  <div className="text-[#808080] text-[8px] md:text-xs leading-tight">Generated</div>
                </div>
                <div className="bg-[#2F2F2F] rounded-lg p-2.5 md:p-4 text-center border border-[#444] hover:border-[#E50914] transition-all flex flex-col items-center justify-center">
                  <div className="text-[#E50914] text-lg md:text-2xl mb-0.5 md:mb-1">7M+</div>
                  <div className="text-white text-[9px] md:text-xs mb-0.5 leading-tight">Revenue</div>
                  <div className="text-[#808080] text-[8px] md:text-xs leading-tight">AED</div>
                </div>
                <div className="bg-[#2F2F2F] rounded-lg p-2.5 md:p-4 text-center border border-[#444] hover:border-[#E50914] transition-all flex flex-col items-center justify-center">
                  <div className="text-[#E50914] text-lg md:text-2xl mb-0.5 md:mb-1">300%+</div>
                  <div className="text-white text-[9px] md:text-xs mb-0.5 leading-tight">Avg ROI</div>
                  <div className="text-[#808080] text-[8px] md:text-xs leading-tight">Campaigns</div>
                </div>
              </div>

              {/* Tools & Stack */}
              <div className="bg-[#2F2F2F] rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-[#E50914]" />
                  <h3 className="text-white text-2xl">The Arsenal</h3>
                </div>
                <p className="text-[#B3B3B3] leading-relaxed text-lg mb-4">
                  Ad platforms: Google Ads, Meta Ads, TikTok Ads, Snapchat Ads, YouTube Ads, LinkedIn Ads, Microsoft
                  (Bing) Ads, Property Finder, Bayut. GA4 + GTM + server-side tagging (sGTM) for tracking and
                  attribution. Meta Conversions API for closing the loop between CRM lead quality and ad platforms.
                  Looker Studio for custom dashboards and reporting.
                </p>
                <p className="text-[#B3B3B3] leading-relaxed text-lg mb-4">
                  CRM: Bitrix24, PropSpace, HubSpot, Salesforce, Zoho CRM. Automation: Zapier, Make, n8n, WhatsApp
                  Business API, Klaviyo. WordPress and Tilda for landing page builds. SEMrush for SEO research.
                  Shopify and Google Shopping for e-commerce.
                </p>
                <p className="text-[#B3B3B3] leading-relaxed text-lg">
                  AI tools: ChatGPT, Claude, Google Gemini, Microsoft Copilot, Perplexity, Midjourney, Canva AI,
                  Adobe Firefly, Runway, HeyGen, ElevenLabs. But tools are just tools. What matters is knowing which
                  tool for which job, and how to connect them into a system that works while you sleep.
                </p>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-[#E50914] to-[#B8070F] rounded-xl p-8 text-center">
                <h3 className="text-white text-2xl mb-3">Let's Talk Shop</h3>
                <p className="text-white/90 leading-relaxed text-lg mb-4">
                  Want to geek out over campaign structures? Debate the best way to scale creatives? 
                  Talk attribution models and marketing automation? I'm always down to talk marketing with people 
                  who love it as much as I do.
                </p>
                <p className="text-white/80 text-sm">
                  hire@muneezahmed.com | +971 586388362 | Dubai, UAE
                </p>
              </div>

            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Secret Dialog */}
      <Dialog open={isSecretDialogOpen} onOpenChange={setIsSecretDialogOpen}>
        <DialogContent className="max-w-md bg-gradient-to-b from-[#1a1a1a] to-[#141414] border-[#333]">
          <DialogTitle className="sr-only">Get a Secret</DialogTitle>
          <DialogDescription className="sr-only">
            Enter your email to unlock exclusive marketing secrets
          </DialogDescription>
          
          <div className="relative p-6">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#E50914] rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-white text-3xl mb-2">Unlock a Secret</h2>
              <p className="text-[#B3B3B3]">Get exclusive marketing insights delivered to your inbox</p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSecretSubmit} className="space-y-6">
              <div>
                <label htmlFor="secret-email" className="text-white text-sm mb-2 block">Email Address</label>
                <Input
                  id="secret-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={secretEmail}
                  onChange={(e) => setSecretEmail(e.target.value)}
                  className="w-full bg-[#2F2F2F] border-[#444] text-white placeholder:text-[#808080] focus:border-[#E50914]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#E50914] text-white hover:bg-[#B8070F] py-6"
              >
                <Gift className="w-5 h-5 mr-2" />
                Unlock Secret
              </Button>
            </form>

            {/* Footer Note */}
            <p className="text-[#808080] text-xs text-center mt-6">
              No spam. Just valuable marketing insights you can use today.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}