import { useState } from 'react';
import { ChevronDown, ChevronUp, Download, ExternalLink, Mail, Phone, MapPin, Briefcase, TrendingUp, Users, BarChart3, Rocket, Check, Code, Megaphone, ShoppingCart, Search, Star, Linkedin, User, Gift, Lightbulb, Target, Award, Calendar, GraduationCap, Zap, DollarSign, Eye, MousePointerClick, Activity, Send, Building2, Gem } from 'lucide-react';
import { NavBar } from './NavBar';
import { ContentRow } from './ContentRow';
import { DetailModal } from './DetailModal';
import { Footer } from './Footer';
import { useNotifications } from './NotificationContext';
import { useBackgroundMusic } from './useBackgroundMusic';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { MarketingApproach } from './MarketingApproach';
import { ProofOfWork } from './ProofOfWork';
import { ecommercePortfolioData } from './ecommercePortfolioData';
import { leadGenPortfolioData } from './leadGenPortfolioData';
import { webDevPortfolioData } from './webDevPortfolioData';
import { seoPortfolioData } from './seoPortfolioData';
import { sendFormEmails } from './emailService';

interface BusinessOwnerProfileProps {
  onBackToProfiles: () => void;
  onSwitchProfile?: (profileId: 'recruiter' | 'fan' | 'marketer' | 'stranger' | 'business') => void;
  profileId?: string;
}

export function BusinessOwnerProfile({ onBackToProfiles, onSwitchProfile, profileId }: BusinessOwnerProfileProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addNotification } = useNotifications();
  
  // Play background music for Business Owner/Prospect profile
  const { isMuted, toggleMute } = useBackgroundMusic('https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/pxl5qk0l/knw/a06/ibc/PROSPECT.MP3', true);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    service: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.contactNumber || !formData.email || !formData.service) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send emails using EmailJS
      const { leadSent, thankYouSent } = await sendFormEmails({
        name: formData.name,
        email: formData.email,
        phone: formData.contactNumber,
        message: formData.note || 'No additional notes provided',
        service: formData.service,
        formType: 'lead',
      });

      if (leadSent && thankYouSent) {
        // Show success toast notification
        toast.success('Thank you! Email sent successfully.', {
          description: `We've received your inquiry and will respond to ${formData.email} within 24 hours.`,
        });
        
        // Add to notification center
        addNotification({
          title: 'Inquiry Received!',
          message: `Thank you ${formData.name}! I'll review your ${formData.service} inquiry and respond within 24 hours.`,
          type: 'general',
        });
      } else {
        toast.error('Failed to send email.', {
          description: 'Please try again or email hello@muneezahmed.com directly.',
        });
      }
      
      // Reset form on success
      if (leadSent) {
        setFormData({
          name: '',
          contactNumber: '',
          email: '',
          service: '',
          note: '',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    
    // Array of fun notification messages for business owners
    const funMessages = [
      { title: 'Smart Investment!', message: `\"${item.title}\" - This is how you grow a business!` },
      { title: 'Growth Unlocked!', message: `\"${item.title}\" loaded! Time to scale your business.` },
      { title: 'Business Booster!', message: `\"${item.title}\" - Your next revenue breakthrough starts here!` },
      { title: 'Gold Mine!', message: `\"${item.title}\" is pure business gold. Check it out!` },
      { title: 'Revenue Driver!', message: `\"${item.title}\" - Where profits meet strategy!` },
      { title: 'Game Changer!', message: `\"${item.title}\" activated! This changes everything.` },
      { title: 'Winner\'s Choice!', message: `\"${item.title}\" - Successful businesses choose this!` },
      { title: 'Power Move!', message: `\"${item.title}\" is your competitive advantage. Let\'s go!` },
      { title: 'Hot Opportunity!', message: `\"${item.title}\" - This is what top performers use!` },
      { title: 'Success Formula!', message: `\"${item.title}\" loaded! The formula for success is here.` },
      { title: 'CEO-Approved!', message: `\"${item.title}\" - The secret weapon you\'ve been looking for!` },
      { title: 'ROI Maximizer!', message: `\"${item.title}\" - Watch your returns multiply!` },
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

  const ecommercePortfolio = ecommercePortfolioData;
  const leadGenPortfolio = leadGenPortfolioData;
  const webDevPortfolio = webDevPortfolioData;
  const seoPortfolio = seoPortfolioData;

  // Key metrics for business owners
  const keyMetrics = [
    {
      value: 'AED 7M+',
      label: 'Revenue Generated',
      icon: DollarSign,
    },
    {
      value: '50K+',
      label: 'Qualified Leads',
      icon: TrendingUp,
    },
    {
      value: '8.5X',
      label: 'Average ROAS',
      icon: TrendingUp,
    },
    {
      value: '300%+',
      label: 'Average ROI',
      icon: Rocket,
    },
  ];

  // Business solutions in grid format
  const businessSolutions = [
    {
      icon: ShoppingCart,
      title: 'E-Commerce Growth',
      description: 'Scale from AED 50K to AED 500K+ monthly revenue with proven strategies',
      highlights: ['900% Growth', '8.5X ROAS', 'Full Funnel'],
    },
    {
      icon: Target,
      title: 'Lead Generation',
      description: 'Generate qualified leads that convert into paying customers',
      highlights: ['18% CVR', '500+ Leads/mo', 'B2B & B2C'],
    },
    {
      icon: Gem,
      title: 'Brand Building',
      description: 'Establish strong brand presence in the competitive Dubai market',
      highlights: ['300% Awareness', 'Premium Positioning', 'Brand Strategy'],
    },
    {
      icon: Zap,
      title: 'Marketing Automation',
      description: 'Streamline marketing with automated systems and workflows',
      highlights: ['CRM Integration', 'Email Automation', '40% Time Saved'],
    },
  ];

  // Process steps
  const processSteps = [
    {
      number: '01',
      title: 'Discovery Call',
      description: 'Understanding your business goals, challenges, and target audience in detail',
      duration: '30-60 min',
    },
    {
      number: '02',
      title: 'Custom Strategy',
      description: 'Developing a tailored marketing roadmap based on your specific objectives',
      duration: '3-5 days',
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Executing campaigns with precision, creativity, and industry best practices',
      duration: 'Ongoing',
    },
    {
      number: '04',
      title: 'Growth & Optimization',
      description: 'Continuous testing, refinement, and scaling for maximum results',
      duration: 'Ongoing',
    },
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
      <div id="home" className="relative min-h-[100vh] md:min-h-[85vh] flex items-center md:items-end pb-8 md:pb-32 pt-32 md:pt-24">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY241M2RqdzdpejE1djVoZWZ2Yzg5bWdxcDl2aWdvcGxvZWU0YXluaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8m1j9XvIiHbjJ31KWg/giphy.gif)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-[1] px-6 md:px-12 w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            {/* Left Side - Hero Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-8 h-8 text-[#E50914]" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
                Ready to Grow Your Business?
              </h1>
              <p className="text-lg text-[#B3B3B3] mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: '100ms' }}>
                As a business owner, you need results, not promises. I specialize in creating data-driven marketing strategies 
                that generate real revenue, qualified leads, and sustainable growth for businesses in Dubai and beyond.
              </p>

              <div className="bg-[#2F2F2F] rounded-lg p-6 mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
                <h3 className="text-white font-bold mb-4">Why Businesses Choose Me</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-[#E50914]" />
                      <span className="text-white font-bold">ROI-Focused</span>
                    </div>
                    <p className="text-sm text-[#B3B3B3]">Every campaign optimized for maximum return</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-[#E50914]" />
                      <span className="text-white font-bold">Proven Track Record</span>
                    </div>
                    <p className="text-sm text-[#B3B3B3]">300%+ average ROI across industries</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Rocket className="w-5 h-5 text-[#E50914]" />
                      <span className="text-white font-bold">Dubai Market Expert</span>
                    </div>
                    <p className="text-sm text-[#B3B3B3]">Deep understanding of UAE business landscape</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
              <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-8 border border-[#444] hover:border-[#E50914] transition-all">
                <h3 className="text-2xl text-white font-bold mb-2">Get Started Today</h3>
                <p className="text-[#B3B3B3] mb-6">Fill out the form and I'll get back to you within 24 hours</p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      placeholder="Your full name"
                      className="bg-[#141414] border-[#444] text-white placeholder:text-[#666] focus:border-[#E50914]"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactNumber" className="text-white mb-2 block">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => handleFormChange('contactNumber', e.target.value)}
                      placeholder="+971 XX XXX XXXX"
                      className="bg-[#141414] border-[#444] text-white placeholder:text-[#666] focus:border-[#E50914]"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="bg-[#141414] border-[#444] text-white placeholder:text-[#666] focus:border-[#E50914]"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-white mb-2 block">Service Looking For *</Label>
                    <Select value={formData.service} onValueChange={(value) => handleFormChange('service', value)}>
                      <SelectTrigger className="bg-[#141414] border-[#444] text-white focus:border-[#E50914]">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2F2F2F] border-[#444]">
                        <SelectItem value="ecommerce" className="text-white hover:bg-[#E50914] focus:bg-[#E50914]">E-Commerce Growth</SelectItem>
                        <SelectItem value="lead-generation" className="text-white hover:bg-[#E50914] focus:bg-[#E50914]">Lead Generation</SelectItem>
                        <SelectItem value="brand-building" className="text-white hover:bg-[#E50914] focus:bg-[#E50914]">Brand Building</SelectItem>
                        <SelectItem value="marketing-automation" className="text-white hover:bg-[#E50914] focus:bg-[#E50914]">Marketing Automation</SelectItem>
                        <SelectItem value="web-development" className="text-white hover:bg-[#E50914] focus:bg-[#E50914]">Web Development</SelectItem>
                        <SelectItem value="consultation" className="text-white hover:bg-[#E50914] focus:bg-[#E50914]">General Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="note" className="text-white mb-2 block">Additional Notes</Label>
                    <Textarea
                      id="note"
                      value={formData.note}
                      onChange={(e) => handleFormChange('note', e.target.value)}
                      placeholder="Tell me about your project, goals, and budget..."
                      className="bg-[#141414] border-[#444] text-white placeholder:text-[#666] focus:border-[#E50914] min-h-[100px]"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#E50914] hover:bg-[#B8070F] text-white py-6 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Booking...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Book Consultation
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div id="contact" className="py-8">
        {/* Key Metrics Section */}
        <div className="px-6 md:px-12 py-16 bg-gradient-to-b from-[#141414] via-[#0a0a0a] to-[#141414]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl text-white mb-4">Numbers That Speak</h2>
              <p className="text-[#B3B3B3] text-lg max-w-2xl mx-auto">
                Real results from real campaigns across multiple industries in Dubai and beyond
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {keyMetrics.map((metric, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-6 border border-[#444] hover:border-[#E50914] transition-all transform hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <metric.icon className="w-8 h-8 text-[#E50914] mb-4" />
                  <div className="text-3xl md:text-4xl text-white font-bold mb-2">{metric.value}</div>
                  <div className="text-[#B3B3B3]">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Business Solutions Grid */}
        <div className="px-6 md:px-12 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl text-white mb-4">How I Help Your Business Grow</h2>
              <p className="text-[#B3B3B3] text-lg max-w-2xl mx-auto">
                Customized solutions designed to drive revenue and sustainable growth
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {businessSolutions.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-8 border border-[#444] hover:border-[#E50914] transition-all group cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-[#E50914] rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl text-white font-bold mb-3">{solution.title}</h3>
                    <p className="text-[#B3B3B3] mb-6 leading-relaxed">{solution.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {solution.highlights.map((highlight, hIndex) => (
                        <span 
                          key={hIndex}
                          className="px-3 py-1 bg-[#E50914]/10 border border-[#E50914]/30 rounded-full text-sm text-[#E50914]"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="px-6 md:px-12 py-16 bg-gradient-to-b from-[#141414] via-[#1a1a1a] to-[#141414]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl text-white mb-4">How We Work Together</h2>
              <p className="text-[#B3B3B3] text-lg max-w-2xl mx-auto">
                A streamlined process focused on delivering results at every stage
              </p>
            </div>

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-8 border border-[#444] hover:border-[#E50914] transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#E50914] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {step.number}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl text-white font-bold mb-2">{step.title}</h3>
                      <p className="text-[#B3B3B3] leading-relaxed">{step.description}</p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className="px-4 py-2 bg-[#E50914]/10 border border-[#E50914]/30 rounded-full text-[#E50914]">
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ContentRow title="E-Commerce Portfolio" items={ecommercePortfolio} onItemClick={handleItemClick} />
        <ContentRow title="Lead Generation Portfolio" items={leadGenPortfolio} onItemClick={handleItemClick} />
        <ContentRow title="SEO Portfolio" items={seoPortfolio} onItemClick={handleItemClick} />
        <ContentRow title="Web Development Portfolio" items={webDevPortfolio} onItemClick={handleItemClick} />
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
    </div>
  );
}