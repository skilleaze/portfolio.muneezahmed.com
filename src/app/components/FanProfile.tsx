import { useState, useEffect, useRef } from 'react';
import { ContentRow } from './ContentRow';
import { DetailModal } from './DetailModal';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { useNotifications } from './NotificationContext';
import { useBackgroundMusic } from './useBackgroundMusic';
import { Sparkles, TrendingUp, Star, Heart, Play, X, Mail, Coffee, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { ecommercePortfolioData } from './ecommercePortfolioData';
import { leadGenPortfolioData } from './leadGenPortfolioData';
import { webDevPortfolioData } from './webDevPortfolioData';
import { seoPortfolioData } from './seoPortfolioData';
import { sendFormEmails } from './emailService';

interface FanProfileProps {
  onBackToProfiles: () => void;
  onSwitchProfile?: (profileId: 'recruiter' | 'fan' | 'marketer' | 'stranger' | 'business') => void;
  profileId?: string;
}

export function FanProfile({ onBackToProfiles, onSwitchProfile, profileId }: FanProfileProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllStories, setShowAllStories] = useState(false);
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportEmail, setSupportEmail] = useState('');
  const [hasSupported, setHasSupported] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [supporterCount, setSupporterCount] = useState(247);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addNotification } = useNotifications();
  
  // Play background music for Fan/Supporter profile
  const { isMuted, toggleMute } = useBackgroundMusic('https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/pxl5qk0l/fn6/1ir/3j0/SUPPORTER.MP3', true);
  
  // Ref for the Success Stories section to observe scroll
  const successStoriesRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to auto-expand when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the success stories section is 30% visible, expand it
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
  }, []);

  // Fun Facts Carousel - Unique to Supporter Profile
  const funFacts = [
    { icon: <Sparkles className="w-5 h-5" />, text: "First campaign? A Facebook ad that got 3 clicks. Now? Managing 6-figure budgets." },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Served clients across UAE, USA and India. Real estate, e-commerce, financial services and more." },
    { icon: <Star className="w-5 h-5" />, text: "Generated over AED 7M+ in revenue across all e-commerce campaigns combined." },
    { icon: <Heart className="w-5 h-5" />, text: "50K+ qualified leads generated for B2B and B2C clients worldwide." },
    { icon: <Play className="w-5 h-5" />, text: "Highest ROAS achieved: 13x. Average across campaigns: 8-10x return on investment." },
    { icon: <Sparkles className="w-5 h-5" />, text: "92K+ message conversions through direct social sales messaging funnels." },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Worked with 10+ industries: E-commerce, Fashion, FMCG, SaaS, Real Estate, Health, and more." },
    { icon: <Star className="w-5 h-5" />, text: "Coffee consumed during campaign launches: Probably too much to count." },
    { icon: <Heart className="w-5 h-5" />, text: "Mastered 8+ platforms: Meta, Google, LinkedIn, TikTok, Snapchat, X, and counting." },
    { icon: <Play className="w-5 h-5" />, text: "Most campaigns running simultaneously? 8 across different platforms." },
    { icon: <Sparkles className="w-5 h-5" />, text: "20+ successful campaigns ranging from quick 3-week sprints to year-long partnerships." },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Best moment? Seeing a client's first sale notification at 2 AM." },
    { icon: <Heart className="w-5 h-5" />, text: "Favorite tool? Google Analytics. Nothing beats understanding user behavior." },
    { icon: <Star className="w-5 h-5" />, text: "Secret weapon? A/B testing everything. Seriously, everything." },
  ];

  // Auto-rotate fun facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Confetti animation
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const colors = ['#E50914', '#FFFFFF', '#FFD700', '#FF69B4', '#00FF00'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 5 - 2.5,
      });
    }

    let animationFrame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.y += particle.speed;
        particle.x += Math.sin(particle.angle) * 2;
        particle.rotation += particle.rotationSpeed;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.radius, -particle.radius, particle.radius * 2, particle.radius * 2);
        ctx.restore();

        if (particle.y > canvas.height) {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        canvas.style.display = 'none';
      }
    };

    canvas.style.display = 'block';
    animate();

    setTimeout(() => {
      cancelAnimationFrame(animationFrame);
      canvas.style.display = 'none';
    }, 4000);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    
    // Array of fun notification messages for enthusiast
    const funMessages = [
      { title: 'Epic Discovery!', message: `\"${item.title}\" - This is legendary content!` },
      { title: 'Crushing It!', message: `\"${item.title}\" activated! You're on fire.` },
      { title: 'Fan Favorite!', message: `\"${item.title}\" is exactly what you need to see!` },
      { title: 'Bullseye!', message: `Direct hit with \"${item.title}\"! This is the good stuff.` },
      { title: 'Lightning Speed!', message: `\"${item.title}\" loaded faster than you can say ROI!` },
      { title: 'To the Moon!', message: `\"${item.title}\" is taking off! Buckle up, this is exciting.` },
      { title: 'Fire Content!', message: `\"${item.title}\" is absolutely on fire! Don't miss this.` },
      { title: 'Perfect Score!', message: `\"${item.title}\" gets a 10/10 from me. Enjoy!` },
      { title: 'Showtime!', message: `\"${item.title}\" is now playing. Grab your popcorn!` },
      { title: 'Winner Winner!', message: `\"${item.title}\" just won the jackpot! Check it out.` },
      { title: 'Five Stars!', message: `\"${item.title}\" - Rated excellent by everyone!` },
      { title: 'Main Event!', message: `\"${item.title}\" is the main attraction tonight!` },
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

  const handleSupportSubmit = async () => {
    if (!supportEmail || !supportEmail.includes('@')) {
      toast.error('Invalid Email', {
        description: 'Please enter a valid email address to show your support!',
      });
      return;
    }

    try {
      // Send emails using EmailJS
      const { leadSent, thankYouSent } = await sendFormEmails({
        name: 'Supporter',
        email: supportEmail,
        message: 'Showing support and interest in following the journey',
        formType: 'support',
      });

      if (leadSent && thankYouSent) {
        // Toast notification at bottom
        toast.success('Submitted Successfully', {
          description: `Thanks for your support! We'll stay in touch at ${supportEmail}`,
        });
        
        // Also add to notification center
        addNotification({
          title: 'Submitted Successfully',
          message: `Thanks for your support! We'll stay in touch at ${supportEmail}`,
          type: 'download',
        });
        
        setSupportEmail('');
        setIsSupportOpen(false);
        setHasSupported(true);
        triggerConfetti();
        setSupporterCount(prev => prev + 1);
      } else {
        toast.error('Failed to submit. Please try again or email hello@muneezahmed.com');
      }
    } catch (error) {
      console.error('Support form error:', error);
      toast.error('Failed to submit. Please try again.');
    }
  };

  const achievements = [
    {
      id: '1',
      title: '50K+ Leads Generated',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjExNjc3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Across multiple campaigns for B2B and B2C clients',
      tags: ['Lead Gen', 'B2B', 'B2C'],
    },
    {
      id: '2',
      title: '300%+ Average ROI',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBhZHMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYxMjIwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Consistently delivering exceptional returns on ad spend',
      tags: ['ROI', 'Performance', 'Results'],
    },
    {
      id: '3',
      title: 'AED 5M+ Revenue Generated',
      image: 'https://images.unsplash.com/photo-1617012811506-344ff32b7055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MTIyMDY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Direct revenue attributed to marketing campaigns',
      tags: ['Revenue', 'Growth', 'Scale'],
    },
    {
      id: '4',
      title: '15+ Successful Campaigns',
      image: 'https://images.unsplash.com/photo-1676287567295-135ce512839a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwc3RyYXRlZ3klMjBwbGFubmluZ3xlbnwxfHx8fDE3NjEyMDIzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Launch campaigns that exceeded targets',
      tags: ['Campaigns', 'Success', 'Launch'],
    },
  ];

  const testimonials = [
    {
      id: '1',
      title: 'Client Testimonials',
      image: 'https://images.unsplash.com/photo-1617012811506-344ff32b7055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MTIyMDY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: '"Muneez transformed our digital presence and doubled our revenue in 6 months" - CEO, E-commerce Brand',
      tags: ['5-Star', 'Testimonial'],
    },
    {
      id: '2',
      title: 'Award Recognition',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjExNjc3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Recognized for excellence in digital marketing innovation',
      tags: ['Award', 'Recognition'],
    },
  ];

  const caseStudies = [
    {
      id: '1',
      title: 'E-Commerce Scale: 0 to AED 500K/month',
      image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NjExNDkxOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Scaled fashion brand through optimized Meta & Google Ads campaigns',
      tags: ['E-Commerce', '900% Growth', 'Meta Ads'],
    },
    {
      id: '2',
      title: 'B2B SaaS: 500+ Qualified Leads',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBhZHMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYxMjIwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Multi-channel lead generation with 18% conversion rate',
      tags: ['B2B', 'Lead Gen', 'LinkedIn'],
    },
    {
      id: '3',
      title: 'Social Media: 0 to 50K Followers',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjExNjc3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Viral content strategy with 2M+ impressions in 6 months',
      tags: ['Social Media', 'Viral', '15% Engagement'],
    },
  ];

  // Combine all portfolio items into one comprehensive "Success Stories" section
  // Add unique prefixes to avoid duplicate keys
  const allSuccessStories = [
    ...ecommercePortfolioData.map(item => ({ ...item, id: `ecom-${item.id}` })),
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
            backgroundImage: 'url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHR0YzJ4bXRoYWRnZGw0YmN0djE1amxwa3FxcW10aHgzbWxscmdzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ryMH0VcZVZg9a/giphy.gif)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 md:px-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-[#E50914] fill-[#E50914]" />
            <Star className="w-6 h-6 text-[#E50914] fill-[#E50914]" />
            <Star className="w-6 h-6 text-[#E50914] fill-[#E50914]" />
            <Star className="w-6 h-6 text-[#E50914] fill-[#E50914]" />
            <Star className="w-6 h-6 text-[#E50914] fill-[#E50914]" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
            Welcome, Supporter!
          </h1>
          <p className="text-lg text-[#B3B3B3] mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: '100ms' }}>
            Thanks for being here! Explore my journey, achievements, and the impact I've made in the digital marketing world. 
            Every campaign tells a story of growth, innovation, and results. Let's celebrate the wins together!
          </p>

          <div className="flex gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <button 
              onClick={() => setIsAboutMeOpen(true)}
              className="flex items-center gap-2 bg-[#E50914] text-white px-8 py-3 rounded hover:bg-[#B8070F] transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5" />
              <span>Watch Success Stories</span>
            </button>
            <button 
              onClick={() => setIsSupportOpen(true)}
              className={`flex items-center gap-2 bg-[#2F2F2F] text-white px-8 py-3 rounded hover:bg-[#3F3F3F] transition-all ${hasSupported ? 'transform hover:scale-105' : ''}`}
            >
              <Heart className={`w-5 h-5 transition-colors ${hasSupported ? 'text-[#E50914] fill-[#E50914]' : ''}`} />
              <span>Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="py-8">
        {/* Fun Facts Carousel - UNIQUE TO SUPPORTER PROFILE */}
        <div className="px-6 md:px-12 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-white flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#E50914]" />
              Did You Know?
            </h2>
            <div className="flex items-center gap-2 bg-[#2F2F2F] px-4 py-2 rounded">
              <Heart className="w-4 h-4 text-[#E50914] fill-[#E50914]" />
              <span className="text-white">{supporterCount} Supporters</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#E50914]/10 to-[#1a1a1a] border border-[#E50914]/20 rounded-lg p-6 transition-all duration-500">
            <div key={currentFactIndex} className="flex items-start gap-4 animate-fade-up">
              <div className="text-[#E50914] mt-1">
                {funFacts[currentFactIndex].icon}
              </div>
              <p className="text-white text-lg flex-1">
                {funFacts[currentFactIndex].text}
              </p>
            </div>
          </div>
        </div>

        <div ref={successStoriesRef}>
          <ContentRow title="Success Stories" items={allSuccessStories} onItemClick={handleItemClick} disableViewAll={true} />
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

      <Footer />

      {/* Detail Modal */}
      {isModalOpen && selectedItem && (
        <DetailModal
          isOpen={isModalOpen}
          item={selectedItem}
          onClose={handleCloseModal}
        />
      )}

      {/* Support Modal - Email Input */}
      <Dialog open={isSupportOpen} onOpenChange={setIsSupportOpen}>
        <DialogContent className="max-w-md bg-gradient-to-b from-[#1a1a1a] to-[#141414] border-[#333]">
          <DialogTitle className="sr-only">Support Muneez</DialogTitle>
          <DialogDescription className="sr-only">
            Enter your email to show your support
          </DialogDescription>
          
          <div className="p-6">
            <div className="text-center mb-8">
              <Heart className="w-16 h-16 text-[#E50914] mx-auto mb-4" />
              <h2 className="text-white text-3xl mb-3">Thanks for Your Support!</h2>
              <p className="text-[#B3B3B3]">
                Show your support by sharing your email below
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="support-email" className="text-white text-sm block mb-2">
                  Your Email Address
                </label>
                <Input
                  id="support-email"
                  type="email"
                  placeholder="your@email.com"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="bg-[#2F2F2F] border-[#444] text-white placeholder:text-[#666]"
                  onKeyDown={(e) => e.key === 'Enter' && handleSupportSubmit()}
                />
              </div>

              <button
                onClick={handleSupportSubmit}
                className="w-full flex items-center justify-center gap-2 bg-[#E50914] text-white px-6 py-3 rounded hover:bg-[#B8070F] transition-all"
              >
                <Mail className="w-5 h-5" />
                <span>Show Support</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* About Me Modal for Supporters */}
      <Dialog open={isAboutMeOpen} onOpenChange={setIsAboutMeOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#1a1a1a] to-[#141414] border-[#333]">
          <DialogTitle className="sr-only">Success Stories Journey</DialogTitle>
          <DialogDescription className="sr-only">
            Behind the scenes of my digital marketing success stories
          </DialogDescription>
          
          <div className="relative p-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-2 mb-4">
                <Star className="w-8 h-8 text-[#E50914] fill-[#E50914]" />
                <Star className="w-8 h-8 text-[#E50914] fill-[#E50914]" />
                <Star className="w-8 h-8 text-[#E50914] fill-[#E50914]" />
              </div>
              <h2 className="text-white text-4xl mb-3">The Story Behind The Success</h2>
              <p className="text-[#E50914] text-xl">Every Campaign Has a Story Worth Telling</p>
            </div>

            {/* Main Story */}
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* The Why */}
              <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-8 border-l-4 border-[#E50914]">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-[#E50914]" />
                  <h3 className="text-white text-2xl">Why I Do What I Do</h3>
                </div>
                <p className="text-[#B3B3B3] leading-relaxed text-lg">
                  I believe every business has a story worth sharing, and digital marketing is the bridge that connects that story to the world. 
                  For me, it's not just about numbers. It's about helping real businesses grow, seeing entrepreneurs achieve their dreams, and 
                  knowing that my work made a tangible difference in someone's success. That's what drives me every single day.
                </p>
              </div>

              {/* The Journey */}
              <div className="bg-[#2F2F2F] rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Play className="w-6 h-6 text-[#E50914]" />
                  <h3 className="text-white text-2xl">The Journey So Far</h3>
                </div>
                <p className="text-[#B3B3B3] leading-relaxed text-lg mb-4">
                  From my first campaign in 2020 to managing multi-million dirham budgets across the Middle East, it's been an incredible ride. 
                  I've worked with startups finding their first customers, e-commerce brands scaling to seven figures, and enterprises optimizing 
                  every dollar of their ad spend.
                </p>
                <p className="text-[#B3B3B3] leading-relaxed text-lg">
                  What I love most? Every project is different. Every challenge requires creativity, data, and determination. And every win feels 
                  just as exciting as the first one.
                </p>
              </div>

              {/* The Philosophy */}
              <div className="bg-gradient-to-br from-[#E50914]/10 to-[#2F2F2F] rounded-xl p-8 border border-[#E50914]/20">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-[#E50914] fill-[#E50914]" />
                  <h3 className="text-white text-2xl">My Philosophy</h3>
                </div>
                <div className="space-y-3 text-[#B3B3B3] text-lg">
                  <p>1. Data drives decisions, but creativity drives results.</p>
                  <p>2. Every campaign is an opportunity to learn something new.</p>
                  <p>3. Success is measured in client growth, not just campaign metrics.</p>
                  <p>4. Automation is powerful, but human insight is irreplaceable.</p>
                  <p>5. Never stop testing, never stop optimizing.</p>
                </div>
              </div>

              {/* What's Next */}
              <div className="bg-[#2F2F2F] rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <ChevronDown className="w-6 h-6 text-[#E50914]" />
                  <h3 className="text-white text-2xl">What's Next</h3>
                </div>
                <p className="text-[#B3B3B3] leading-relaxed text-lg">
                  The future is exciting. I'm constantly exploring new platforms, testing emerging ad technologies, and finding innovative ways to 
                  deliver better results for clients. Whether it's AI-powered campaign optimization, advanced attribution modeling, or the next big 
                  social platform, I'm always ready to adapt and evolve.
                </p>
                <p className="text-[#E50914] text-lg mt-4">
                  Thanks for being part of this journey. Your support makes all of this possible!
                </p>
              </div>

            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confetti Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>
    </div>
  );
}