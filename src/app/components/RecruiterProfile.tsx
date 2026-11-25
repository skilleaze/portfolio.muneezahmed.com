import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Mail, Phone, MapPin, Briefcase, Calendar, GraduationCap, Award, Target, TrendingUp, Users, BarChart3, Rocket, Check, Code, Megaphone, ShoppingCart, Search, Star, Linkedin, User, Gift, Lightbulb, Download } from 'lucide-react';
import { NavBar } from './NavBar';
import { ContentRow } from './ContentRow';
import { DetailModal } from './DetailModal';
import { Footer } from './Footer';
import { useNotifications } from './NotificationContext';
import { useBackgroundMusic } from './useBackgroundMusic';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { ecommercePortfolioData } from './ecommercePortfolioData';
import { leadGenPortfolioData } from './leadGenPortfolioData';
import { webDevPortfolioData } from './webDevPortfolioData';
import { seoPortfolioData } from './seoPortfolioData';

interface RecruiterProfileProps {
  onBackToProfiles: () => void;
  onSwitchProfile?: (profileId: 'recruiter' | 'fan' | 'marketer' | 'stranger' | 'business') => void;
  profileId?: string;
}

export function RecruiterProfile({ onBackToProfiles, onSwitchProfile, profileId }: RecruiterProfileProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const { addNotification } = useNotifications();
  
  // Play background music for Recruiter profile
  const { isMuted, toggleMute } = useBackgroundMusic('https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/pxl5qk0l/p2g/89q/dhn/RECRUITER%20A.MP3', true);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    
    // Array of fun notification messages
    const funMessages = [
      { title: 'Hot Pick!', message: `\"${item.title}\" is trending right now! Good choice.` },
      { title: 'Nice Find!', message: `You discovered \"${item.title}\"! There's more where that came from.` },
      { title: 'Power Move!', message: `Checking out \"${item.title}\"? Smart! This one's a winner.` },
      { title: 'Direct Hit!', message: `\"${item.title}\" loaded! You've got great taste.` },
      { title: 'Hidden Gem!', message: `\"${item.title}\" unlocked! This is the good stuff.` },
      { title: 'Blast Off!', message: `\"${item.title}\" is now playing. Buckle up!` },
      { title: 'Scene Loaded!', message: `\"${item.title}\" is ready for your review. Action!` },
      { title: 'Premium Content!', message: `\"${item.title}\" - One of my favorites! Enjoy the show.` },
      { title: 'Main Attraction!', message: `\"${item.title}\" is stealing the spotlight! Take a look.` },
      { title: 'Star Quality!', message: `\"${item.title}\" is now streaming. This one's special!` },
      { title: 'Boom!', message: `\"${item.title}\" just dropped! You're going to love this.` },
      { title: 'Masterpiece Alert!', message: `\"${item.title}\" is a work of art. Dive in!` },
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

  const handleLinkedInClick = () => {
    addNotification({
      title: 'Opening LinkedIn',
      message: 'Thanks for checking out my LinkedIn profile. Let\'s connect!',
      type: 'linkedin',
    });
  };

  const workExperience = [
    {
      id: '1',
      title: 'Performance Marketing Manager',
      company: 'Stratt Signature Real Estate',
      image: 'https://www.muneezahmed.com/_assets/v11/79875908ca577de1dafcf4d0e1198a2a131ff37b.png',
      description: 'Nov 2025 – Present | Dubai, UAE | Qualified lead generation for off-plan and secondary properties. Meta, Google, TikTok. AI-powered automation. GEO.',
      tags: ['Real Estate', 'Dubai', 'Performance Marketing'],
      detailedInfo: {
        duration: 'Nov 2025 – Present',
        location: 'Dubai, UAE',
        overview: 'Driving qualified lead generation for off-plan and secondary properties across Meta, Google and TikTok.',
        responsibilities: [
          'Drive qualified lead generation on Meta, Google and TikTok, increasing qualified leads by 45%',
          'Build AI-powered WhatsApp and email automation connected to Bitrix24 CRM, cutting lead response time by 50%',
          'Develop landing pages, agent websites and campaign microsites, improving enquiry rates by 20% through A/B testing',
          'Implement GEO to increase brand visibility in AI search tools such as ChatGPT and Google AI Overviews',
          'Implement Meta Conversions API and Google server-side tagging, sending CRM lead quality back to ad platforms'
        ],
        achievements: [
          'Increased qualified leads by 45%',
          'Cut lead response time by 50% via AI automation',
          'Improved enquiry rates by 20% through A/B testing',
          'Lowered cost per lead via server-side tracking'
        ],
        technologies: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'Bitrix24', 'Meta Conversions API', 'Google sGTM', 'WhatsApp API']
      }
    },
    {
      id: '2',
      title: 'Digital Marketing Manager',
      company: 'Signature Collection Realty',
      image: 'https://www.muneezahmed.com/_assets/v11/79875908ca577de1dafcf4d0e1198a2a131ff37b.png',
      description: 'Jun 2024 – Oct 2025 | Dubai, UAE | Promoted to Manager within 6 months. Luxury off-plan and secondary property lead generation. 3x growth in qualified leads.',
      tags: ['Real Estate', 'Dubai', 'Lead Generation'],
      detailedInfo: {
        duration: 'Jan 2024 – Oct 2025 (Promoted to Manager Jun 2024)',
        location: 'Dubai, UAE',
        overview: 'Ran lead generation for luxury off-plan and secondary properties. Promoted from Performance Marketing Specialist to Digital Marketing Manager within 6 months.',
        responsibilities: [
          'Ran lead generation for luxury off-plan and secondary properties, achieving 3x growth in qualified leads',
          'Reduced CPL and improved lead quality on high-budget Meta and Google Ads using Conversions API and offline conversion tracking',
          'Automated lead capture and email and WhatsApp nurture in PropSpace CRM',
          'Built landing pages for each project launch, connected to CRM and conversion tracking',
          'A/B tested ad creatives and landing pages, increasing CTR by 15%'
        ],
        achievements: [
          '3x growth in qualified leads',
          'Reduced cost per lead on high-budget campaigns',
          'Increased CTR by 15% through A/B testing',
          'Promoted to Manager within 6 months'
        ],
        technologies: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'PropSpace CRM', 'Meta Conversions API', 'WordPress', 'Tilda']
      }
    },
    {
      id: '3',
      title: 'Digital Marketing Specialist',
      company: 'Kaye & Co. Real Estate',
      image: 'https://www.muneezahmed.com/_assets/v11/79875908ca577de1dafcf4d0e1198a2a131ff37b.png',
      description: 'Jan 2023 – Jan 2024 | Dubai, UAE | Generated 1,000+ qualified leads per month for off-plan and secondary real estate projects.',
      tags: ['Real Estate', 'Dubai', 'Lead Generation'],
      detailedInfo: {
        duration: 'Jan 2023 – Jan 2024',
        location: 'Dubai, UAE',
        overview: 'Generated qualified leads for off-plan and secondary real estate projects across Google, Microsoft and Meta platforms.',
        responsibilities: [
          'Generated 1,000+ qualified leads per month for off-plan and secondary real estate projects',
          'Automated lead capture and routing into CRM with WhatsApp API and Zapier, improving sales agent efficiency by 40%',
          'Designed and built high-converting landing pages in WordPress and Tilda, including GTM and conversion tracking setup',
          'Managed Google Ads and Microsoft (Bing) Ads search campaigns with smart bidding to improve ROAS'
        ],
        achievements: [
          '1,000+ qualified leads per month',
          'Improved sales agent efficiency by 40% via CRM automation',
          'High-converting landing pages with full tracking setup',
          'Improved ROAS through smart bidding strategies'
        ],
        technologies: ['Google Ads', 'Microsoft Bing Ads', 'Meta Ads', 'WhatsApp API', 'Zapier', 'WordPress', 'Tilda', 'GTM']
      }
    },
    {
      id: '4',
      title: 'Performance Marketing Lead',
      company: 'BB Leads (Digital Marketing Agency)',
      image: 'https://www.muneezahmed.com/_assets/v11/79875908ca577de1dafcf4d0e1198a2a131ff37b.png',
      description: 'May 2020 – Dec 2022 | Mangaluru, India | Led performance marketing for e-commerce and lead gen clients across India, UAE and USA. Managed 10-person team.',
      tags: ['Agency', 'E-commerce', 'Team Leadership'],
      detailedInfo: {
        duration: 'May 2020 – Dec 2022',
        location: 'Mangaluru, India',
        overview: 'Led performance marketing for e-commerce and lead generation clients in India, the UAE and the USA, managing a 10-person team.',
        responsibilities: [
          'Led performance marketing for e-commerce and lead generation clients across India, the UAE and the USA',
          'Managed a 10-person team',
          'Grew e-commerce sales by an average of 30% using Google Shopping, Meta catalogue ads and retargeting',
          'Built lead generation funnels for real estate, financial services and service businesses with automated CRM follow-up',
          'Delivered SEO, SEM and paid social campaigns against clear ROAS and cost-per-lead targets'
        ],
        achievements: [
          'Grew e-commerce sales by average of 30%',
          'Managed 10-person marketing team',
          'Built lead gen funnels across multiple verticals',
          'Delivered campaigns across India, UAE and USA'
        ],
        technologies: ['Google Ads', 'Meta Ads', 'Google Shopping', 'SEO', 'SEM', 'CRM', 'Email Marketing']
      }
    },
  ];

  const skills = [
    {
      id: '1',
      title: 'Search Engine Optimization (SEO)',
      image: 'https://pressbooks.bccampus.ca/foundationsindigitalmarketing/wp-content/uploads/sites/1453/2021/07/SEO.png',
      description: 'On-Page, Off-Page & Technical SEO for organic growth',
      tags: ['SEO', 'Organic Growth', 'Technical SEO'],
      detailedInfo: {
        overview: 'Expert in SEO optimization for improved rankings & traffic.',
        responsibilities: [
          'On-Page: Keywords, meta tags, content optimization',
          'Off-Page: Backlinks, guest posting, outreach',
          'Technical: Speed, mobile, crawling, schema markup'
        ],
        technologies: ['Google Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog']
      }
    },
    {
      id: '2',
      title: 'Search Engine Marketing (SEM)',
      image: 'https://moz.com/images/learn/Search-Ads.jpg?w=877&h=517&auto=compress%2Cformat&fit=crop&dm=1682694047&s=7114aad8b0cdd2d08058ddf0fdabefa5',
      description: 'High-performing Google & Bing Ads campaigns',
      tags: ['Google Ads', 'Bing Ads', 'PPC'],
      detailedInfo: {
        overview: 'Managing high-budget PPC campaigns for maximum ROAS.',
        responsibilities: [
          'Google Ads (Search, Display, Shopping)',
          'Retargeting & remarketing campaigns',
          'Keyword research & bid management',
          'A/B testing & optimization'
        ],
        technologies: ['Google Ads', 'Bing Ads', 'Google Analytics', 'GTM']
      }
    },
    {
      id: '3',
      title: 'Social Media Marketing (SMM)',
      image: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXcHklUKjz3P7GfroDCGULKiypFN0vwyo_wHBjoOU87JcDkKp4w2Fb5bpyY3aRfr6MKt3AuwHyv6RZGTGBhkcihofad3KpmNIRW_hseZCybrKtjXvsSMYgiYlSDMqAJ5P8xaTX6lZE_xYl9W4p3mAKOLH_E?key=eAbzQ22WOOMLNKWwF6gjmA',
      description: 'Multi-platform social media management & paid campaigns',
      tags: ['Social Media', 'Content Creation', 'Community Management'],
      detailedInfo: {
        overview: 'Building engaged communities across all major platforms.',
        responsibilities: [
          'Instagram, Facebook, LinkedIn, TikTok, YouTube, X',
          'Content creation & community management',
          'Paid social campaigns & advertising',
          'Analytics & performance tracking'
        ],
        technologies: ['Meta Business Suite', 'Hootsuite', 'Canva', 'TikTok Ads']
      }
    },
    {
      id: '4',
      title: 'Content Marketing',
      image: 'https://www.ecommercetimes.com/wp-content/uploads/sites/5/2021/12/xl-2017-content-marketing-1.jpg',
      description: 'Blog posts, videos, creative campaigns & long-form content',
      tags: ['Content Creation', 'Copywriting', 'Video Marketing'],
      detailedInfo: {
        overview: 'Creating engaging content that drives traffic & leads.',
        responsibilities: [
          'SEO-optimized blog content & copywriting',
          'Video creation & editing for engagement',
          'Graphics, infographics & creative campaigns',
          'E-books, whitepapers & case studies'
        ],
        technologies: ['WordPress', 'Adobe Premiere Pro', 'Canva', 'Figma']
      }
    },
    {
      id: '5',
      title: 'Email & WhatsApp Marketing',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG1hcmtldGluZyUyMGNhbXBhaWdufGVufDF8fHx8MTc2MTEzNzg1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Automation, segmentation & personalized campaigns',
      tags: ['Email Marketing', 'WhatsApp', 'Automation'],
      detailedInfo: {
        overview: 'Building automated workflows for lead nurturing & engagement.',
        responsibilities: [
          'Email campaign design & deployment',
          'Automated drip campaigns & workflows',
          'WhatsApp broadcasts & engagement',
          'Segmentation & A/B testing'
        ],
        technologies: ['Mailchimp', 'HubSpot', 'WhatsApp Business API', 'Klaviyo']
      }
    },
    {
      id: '6',
      title: 'Display & Programmatic Advertising',
      image: 'https://www.groundtruth.com/wp-content/uploads/2020/12/Display-Ads.jpg',
      description: 'Display ads & programmatic media buying with retargeting',
      tags: ['Display Ads', 'Programmatic', 'Retargeting'],
      detailedInfo: {
        overview: 'Expert in display advertising & programmatic strategies.',
        responsibilities: [
          'Banner ads, video ads & interactive units',
          'Google Display Network campaigns',
          'Programmatic advertising via DSPs',
          'Retargeting & audience segmentation'
        ],
        technologies: ['Google Display Network', 'Programmatic Platforms', 'Ad Servers']
      }
    },
    {
      id: '7',
      title: 'AI & Marketing Automation',
      image: 'https://www.techfunnel.com/wp-content/uploads/2021/07/marketing-automation-platform.png',
      description: 'AI lead qualification, WhatsApp AI agents & workflow automation',
      tags: ['AI Automation', 'WhatsApp AI', 'CRM Integration'],
      detailedInfo: {
        overview: 'Building AI-powered marketing automation systems for lead qualification and nurturing at scale.',
        responsibilities: [
          'AI-powered WhatsApp agents for instant lead qualification',
          'Email and WhatsApp automation workflows in Bitrix24 and PropSpace CRM',
          'Zapier, Make and n8n workflow automation',
          'CRM integration, lead routing and pipeline tracking',
          'WhatsApp Business API for broadcast and nurture sequences'
        ],
        technologies: ['ChatGPT', 'Claude', 'Zapier', 'Make', 'n8n', 'WhatsApp Business API', 'Bitrix24', 'HubSpot']
      }
    },
    {
      id: '11',
      title: 'GEO — Generative Engine Optimisation',
      image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHNlYXJjaHxlbnwxfHx8fDE3NjEyMjA2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Optimising brand visibility in ChatGPT, Google AI Overviews & AI search tools',
      tags: ['GEO', 'AI Search', 'Brand Visibility'],
      detailedInfo: {
        overview: 'Implementing GEO strategies to increase brand visibility across AI-powered search tools.',
        responsibilities: [
          'Schema markup for AI search and structured data',
          'Optimising content for ChatGPT and Google AI Overviews',
          'Perplexity and AI-powered search visibility strategies',
          'Technical SEO aligned with generative AI ranking signals'
        ],
        technologies: ['ChatGPT', 'Google AI Overviews', 'Perplexity', 'Schema Markup', 'Technical SEO']
      }
    },
    {
      id: '8',
      title: 'Landing Pages & Conversion Optimization',
      image: 'https://storage.googleapis.com/website-production/uploads/2023/04/What-is-conversion-rate-optimization_.webp',
      description: 'High-converting landing pages with strategic CTAs',
      tags: ['Landing Pages', 'CRO', 'UX Design'],
      detailedInfo: {
        overview: 'Creating conversion-focused landing pages through testing & optimization.',
        responsibilities: [
          'Landing page design & layout',
          'CTA optimization & placement',
          'A/B testing & heatmap analysis',
          'Form optimization & mobile UX'
        ],
        technologies: ['Unbounce', 'Instapage', 'WordPress', 'Hotjar', 'VWO']
      }
    },
    {
      id: '9',
      title: 'Website Design & Development',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzYxMjIwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Full-stack website design on WordPress, Shopify & Wix',
      tags: ['Web Design', 'WordPress', 'Shopify'],
      detailedInfo: {
        overview: 'Creating high-performing websites across multiple platforms.',
        responsibilities: [
          'UX/UI design & responsive development',
          'WordPress, Shopify, Wix implementation',
          'E-commerce setup & optimization',
          'Performance optimization & SEO'
        ],
        technologies: ['WordPress', 'Shopify', 'Wix', 'HTML/CSS', 'Elementor']
      }
    },
    {
      id: '10',
      title: 'Analytics, Tracking & Server-Side Tagging',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzYxMjIwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'GA4, GTM, server-side tagging (sGTM) & Meta Conversions API',
      tags: ['GA4', 'Server-Side Tagging', 'Meta Conversions API'],
      detailedInfo: {
        overview: 'End-to-end tracking and attribution using server-side infrastructure and first-party data.',
        responsibilities: [
          'Google Analytics 4 setup & reporting',
          'Google Tag Manager and server-side tagging (sGTM)',
          'Meta Conversions API — sending CRM lead quality back to ad platforms',
          'Looker Studio dashboard creation & ROI tracking',
          'SEMrush for keyword research and competitive analysis'
        ],
        technologies: ['Google Analytics 4', 'GTM', 'sGTM', 'Meta Conversions API', 'Looker Studio', 'SEMrush']
      }
    },
  ];

  const education = [
    {
      id: '1',
      title: 'Bachelor of Engineering in Computer Science',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
      description: 'Visvesvaraya Technological University | 2019 - 2022',
      tags: ['Computer Science', 'Engineering', 'VTU'],
      icon: GraduationCap,
    },
    {
      id: '2',
      title: 'Diploma in Computer Science',
      image: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXflr6wsEbICCBpzYGCqsOSGWKpsLD2im1jrkRe0hhfwUDPEpNzA6AVB357B4PpGp8nUcwxQhEDJKuMKfh7kUUva3EodyL4zhD8GrBDY7Q84JY1KMcJRSZIaKYToHCgjUSIW2E-pQ7TM4GF1FusLaCI?key=q5ltjijpb-DiPnb2JRVr6E1V',
      description: 'Nitte University | 2016 - 2019',
      tags: ['Computer Science', 'Diploma', 'Nitte'],
    },
  ];

  const certifications = [
    {
      id: '2',
      title: 'Facebook Blueprint Certification',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
      description: 'Meta certified in Facebook & Instagram advertising',
      tags: ['Meta Ads', 'Facebook', 'Instagram'],
      certificateUrl: 'https://drive.google.com/file/d/1g8Bt6W3WmHLMG01f1pwDO8EixRVW-J9_/view?usp=sharing',
      detailedInfo: {
        overview: 'Official Meta Blueprint certification for Facebook & Instagram ads.',
        responsibilities: [
          'Facebook & Instagram campaigns',
          'Custom & lookalike audiences',
          'Pixel implementation & tracking',
          'A/B testing & optimization'
        ],
        technologies: ['Meta Ads Manager', 'Instagram Ads', 'Facebook Pixel', 'Business Manager']
      }
    },
    {
      id: '6',
      title: 'Google Ads Display Certification',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
      description: 'Certified in Google Display Network & programmatic advertising',
      tags: ['Google Ads', 'Display Ads', 'GDN'],
      certificateUrl: 'https://drive.google.com/file/d/1b_gj-7zUh_ATD-85obXLtRvg08t1WZcH/view?usp=sharing',
      detailedInfo: {
        overview: 'Official Google Ads Display certification demonstrating expertise in display advertising.',
        responsibilities: [
          'Google Display Network campaigns',
          'Display targeting & optimization',
          'Remarketing & audience building',
          'Creative best practices for display'
        ],
        technologies: ['Google Display Network', 'Google Ads', 'Display & Video 360', 'Google Analytics']
      }
    },
    {
      id: '3',
      title: 'HubSpot Inbound Certification',
      image: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
      description: 'Certified in inbound marketing, content strategy & automation',
      tags: ['Inbound Marketing', 'HubSpot', 'Automation'],
      certificateUrl: 'https://drive.google.com/file/d/1-Rip8rYoyB6kLYyco2RYH1o26TC9bzJK/view?usp=sharing',
      detailedInfo: {
        overview: 'Official HubSpot certification in inbound marketing methodology.',
        responsibilities: [
          'Inbound marketing strategy',
          'Content marketing & SEO',
          'Email marketing & automation',
          'Lead nurturing & CRM'
        ],
        technologies: ['HubSpot CRM', 'Marketing Hub', 'Email Marketing', 'Analytics']
      }
    },
    {
      id: '4',
      title: 'W3Schools HTML5 Certification',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
      description: 'Certified in HTML5 & modern web development',
      tags: ['HTML5', 'Web Development', 'Certified'],
      certificateUrl: 'https://drive.google.com/file/d/1p9D_qnPFgxVqQKQRcSdGy0uDQViBNGqB/view?usp=sharing',
      detailedInfo: {
        overview: 'Official W3Schools certification in HTML5 and modern web development.',
        responsibilities: [
          'HTML5 semantic markup',
          'Responsive web design',
          'CSS3 styling & animations',
          'JavaScript fundamentals'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design']
      }
    },
    {
      id: '5',
      title: 'Google Analytics Individual Qualification',
      image: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg',
      description: 'Certified in Google Analytics implementation & analysis',
      tags: ['Google Analytics', 'Data Analysis', 'Certified'],
      certificateUrl: 'https://drive.google.com/file/d/1hsW4SERpa-AEPEbX_QZNl_aL-s49agsY/view?usp=sharing',
      detailedInfo: {
        overview: 'Official Google Analytics Individual Qualification (GAIQ).',
        responsibilities: [
          'GA4 setup & configuration',
          'Tracking & event implementation',
          'Custom reports & dashboards',
          'Conversion tracking & analysis'
        ],
        technologies: ['Google Analytics 4', 'GTM', 'Data Studio', 'Google Ads']
      }
    },
  ];

  const ecommercePortfolio = ecommercePortfolioData;

  const leadGenPortfolio = leadGenPortfolioData;

  const webDevPortfolio = webDevPortfolioData;

  const seoPortfolio = seoPortfolioData;

  return (
    <div className="min-h-screen bg-[#141414]">
      <NavBar 
        onBackToProfiles={onBackToProfiles} 
        onSwitchProfile={onSwitchProfile} 
        profileId={profileId}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Hero Section */}
      <div id="home" className="relative min-h-[100vh] md:h-[85vh] flex items-center md:items-end pb-8 md:pb-32 pt-24 md:pt-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZ5eWwwbjRpdWM1amxyd3VueHhteTVzajVjeGZtZGJ1dDc4MXMyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/16u7Ifl2T4zYfQ932F/giphy.gif)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 px-4 md:px-12 max-w-4xl w-full">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-6 animate-fade-up">
            Muneez Ahmed
          </h1>
          <h2 className="text-xl md:text-3xl text-white mb-3 md:mb-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Performance Marketing Manager
          </h2>

          {/* Brief Description */}
          <p className="text-sm md:text-lg text-[#B3B3B3] leading-relaxed mb-4 md:mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
            Dubai-based performance marketing manager with 5+ years generating high-quality leads and scaling e-commerce revenue across the UAE, India and the US. Specialist in qualified lead generation for real estate, delivering 3x growth in qualified leads while lowering cost per lead through Meta Conversions API and Google server-side tagging.
          </p>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-x-6 md:gap-y-2 mb-4 md:mb-6 text-[#B3B3B3] text-xs md:text-sm animate-fade-up" style={{ animationDelay: '250ms' }}>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#E50914]" />
              <span>Dubai, United Arab Emirates</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 md:w-4 md:h-4 text-[#E50914]" />
              <a href="tel:+971586388362" className="hover:text-white transition-colors">+971 58 638 8362</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 md:w-4 md:h-4 text-[#E50914]" />
              <a href="mailto:hire@muneezahmed.com" className="hover:text-white transition-colors">hire@muneezahmed.com</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <a
              href="https://www.linkedin.com/in/mrmnz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded hover:bg-white/90 transition-all transform hover:scale-105 text-sm md:text-base"
              onClick={handleLinkedInClick}
            >
              <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              <span>LinkedIn Profile</span>
            </a>
            <a
              href="https://drive.google.com/uc?export=download&id=1dnfDP90MEgtKyAADgAeelAR6rO84RTQL"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#E50914] text-white px-6 md:px-8 py-2.5 md:py-3 rounded hover:bg-[#d40c15] transition-all text-sm md:text-base"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span>Download CV</span>
            </a>
            <button
              onClick={() => setIsAboutMeOpen(true)}
              className="flex items-center justify-center gap-2 bg-[#2F2F2F] text-white px-6 md:px-8 py-2.5 md:py-3 rounded hover:bg-[#3F3F3F] transition-all text-sm md:text-base"
            >
              <User className="w-4 h-4 md:w-5 md:h-5" />
              <span>About Me</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div id="ecommerce" className="py-8">
        <ContentRow title="E-commerce Portfolio" items={ecommercePortfolio} onItemClick={handleItemClick} />
      </div>

      <div id="leadgen" className="py-8">
        <ContentRow title="Lead Generation Portfolio" items={leadGenPortfolio} onItemClick={handleItemClick} />
      </div>

      <div id="seo" className="py-8">
        <ContentRow title="SEO Portfolio" items={seoPortfolio} onItemClick={handleItemClick} />
      </div>

      <div id="webdev" className="py-8">
        <ContentRow title="Web Development Portfolio" items={webDevPortfolio} onItemClick={handleItemClick} />
      </div>

      <div id="skills" className="py-8">
        <ContentRow title="Core Skills & Expertise" items={skills} onItemClick={handleItemClick} />
      </div>

      <div id="education" className="py-8">
        <ContentRow title="Education" items={education} onItemClick={handleItemClick} />
      </div>

      <div id="certifications" className="py-8">
        <ContentRow title="Certifications" items={certifications} onItemClick={handleItemClick} />
      </div>

      <Footer />

      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />

      {/* About Me Modal */}
      <Dialog open={isAboutMeOpen} onOpenChange={setIsAboutMeOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#1a1a1a] to-[#141414] border-[#333]">
          <DialogTitle className="sr-only">About Muneez Ahmed</DialogTitle>
          <DialogDescription className="sr-only">
            The story of passion for digital marketing and technology
          </DialogDescription>
          
          <div className="relative p-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <img 
                src="https://www.muneezahmed.com/_assets/v11/79875908ca577de1dafcf4d0e1198a2a131ff37b.png"
                alt="Muneez Ahmed" 
                className="w-24 h-24 rounded-full object-cover border-4 border-[#E50914] shadow-xl mb-6 mx-auto"
              />
              <h2 className="text-white text-4xl mb-3">My Story</h2>
              <p className="text-[#E50914] text-xl">Where Passion Meets Performance</p>
            </div>

            {/* Main Story */}
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Introduction */}
              <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-8 border-l-4 border-[#E50914]">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-[#E50914]" />
                  <h3 className="text-white text-2xl">The Spark</h3>
                </div>
                <p className="text-[#B3B3B3] leading-relaxed text-lg">
                  My journey into digital marketing wasn't planned, it was discovered. While studying Computer Science, 
                  I realized that technology alone wasn't enough. I wanted to understand how it connects with people, 
                  how it drives decisions, and how data can tell stories. That curiosity became my passion, and digital 
                  marketing became my craft.
                </p>
              </div>

              {/* Education & Foundation */}
              <div className="bg-[#2F2F2F] rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-6 h-6 text-[#E50914]" />
                  <h3 className="text-white text-2xl">Building the Foundation</h3>
                </div>
                <p className="text-[#B3B3B3] leading-relaxed text-lg mb-4">
                  I earned my Bachelor of Engineering in Computer Science from Visvesvaraya Technological University
                  and a Diploma from Nitte University. This technical background gave me something most marketers
                  don't have: the ability to build, automate, and optimize not just campaigns, but entire systems.
                </p>
                <p className="text-[#B3B3B3] leading-relaxed text-lg">
                  A Computer Science engineer combining marketing with hands-on web development. The real learning
                  happened when I started applying technology to marketing challenges.
                </p>
              </div>

              {/* Career Journey */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E50914] to-[#ff9999] rounded-full"></div>

                <div className="pl-8 space-y-8">
                  {/* BB Leads */}
                  <div className="bg-[#2F2F2F] rounded-xl p-6 hover:bg-[#3F3F3F] transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="w-5 h-5 text-[#E50914]" />
                      <span className="text-[#E50914]">May 2020 – Dec 2022 | Mangaluru, India</span>
                    </div>
                    <h4 className="text-white text-xl mb-3">Where I Led My First Team</h4>
                    <p className="text-[#B3B3B3] leading-relaxed">
                      At <span className="text-white font-semibold">BB Leads Digital Marketing Agency</span>, I didn't just learn marketing.
                      I learned leadership. Managing a 10-person team delivering campaigns for clients in India, the UAE and the USA
                      taught me that great campaigns require great systems. I built performance marketing funnels for e-commerce,
                      real estate, financial services and grew e-commerce sales by an average of 30%. This is where my passion
                      for data-driven, multi-channel strategies was born.
                    </p>
                  </div>

                  {/* Kaye & Co */}
                  <div className="bg-[#2F2F2F] rounded-xl p-6 hover:bg-[#3F3F3F] transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-[#E50914]" />
                      <span className="text-[#E50914]">Jan 2023 – Jan 2024 | Dubai, UAE</span>
                    </div>
                    <h4 className="text-white text-xl mb-3">Going International — Real Estate Lead Generation</h4>
                    <p className="text-[#B3B3B3] leading-relaxed">
                      Moving to Dubai was a turning point. At <span className="text-white font-semibold">Kaye & Co. Real Estate</span>,
                      I generated 1,000+ qualified leads per month for off-plan and secondary real estate projects. I combined
                      Google Ads, Microsoft Bing Ads, CRM automation via WhatsApp API and Zapier, and high-converting landing
                      pages built in WordPress and Tilda. Dubai taught me that marketing isn't about volume; it's about qualified value.
                    </p>
                  </div>

                  {/* Signature Collection Realty */}
                  <div className="bg-[#2F2F2F] rounded-xl p-6 hover:bg-[#3F3F3F] transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-[#E50914]" />
                      <span className="text-[#E50914]">Jan 2024 – Oct 2025 | Dubai, UAE</span>
                    </div>
                    <h4 className="text-white text-xl mb-3">Luxury Real Estate & Rapid Promotion</h4>
                    <p className="text-[#B3B3B3] leading-relaxed">
                      At <span className="text-white font-semibold">Signature Collection Realty</span>, I ran lead generation for
                      luxury off-plan and secondary properties, achieving 3x growth in qualified leads. Promoted from Performance
                      Marketing Specialist to Digital Marketing Manager within just 6 months. I reduced cost per lead on
                      high-budget Meta and Google Ads using Conversions API and offline conversion tracking, and automated
                      lead nurture in PropSpace CRM to convert leads into property viewings faster.
                    </p>
                  </div>

                  {/* Current Role */}
                  <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-6 border-2 border-[#E50914]">
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="w-5 h-5 text-[#E50914]" />
                      <span className="text-[#E50914]">Nov 2025 – Present | Dubai, UAE</span>
                    </div>
                    <h4 className="text-white text-xl mb-3">Performance Marketing Manager — Stratt Signature Real Estate</h4>
                    <p className="text-[#B3B3B3] leading-relaxed">
                      Currently driving qualified lead generation for off-plan and secondary properties at{' '}
                      <span className="text-white font-semibold">Stratt Signature Real Estate</span>, increasing qualified
                      leads by 45%. Building AI-powered WhatsApp and email automation connected to Bitrix24 CRM, cutting
                      lead response time by 50%. Implementing GEO (Generative Engine Optimisation) for brand visibility in
                      ChatGPT and Google AI Overviews, alongside Meta Conversions API and Google server-side tagging to send
                      CRM lead quality signals back to ad platforms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Philosophy */}
              <div className="bg-gradient-to-br from-[#E50914]/10 to-transparent rounded-xl p-8 border border-[#E50914]/30">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-[#E50914]" />
                  <h3 className="text-white text-2xl">What Drives Me</h3>
                </div>
                <p className="text-[#B3B3B3] leading-relaxed text-lg mb-4">
                  I'm not just a marketer who knows technology. I'm a technologist who loves marketing. That combination 
                  is my superpower. While others see platforms and tools, I see possibilities. While others chase metrics, 
                  I chase meaning.
                </p>
                <p className="text-white leading-relaxed text-lg italic">
                  "Every campaign is a story waiting to be told. Every click is a person making a choice. And every conversion 
                  is proof that when you combine passion with precision, magic happens."
                </p>
              </div>

              {/* Expertise Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#2F2F2F] rounded-lg p-4 text-center border border-[#444] hover:border-[#E50914] transition-all">
                  <div className="text-[#E50914] text-2xl mb-1">5+</div>
                  <div className="text-white text-xs mb-0.5">Years</div>
                  <div className="text-[#808080] text-xs">of Expertise</div>
                </div>
                <div className="bg-[#2F2F2F] rounded-lg p-4 text-center border border-[#444] hover:border-[#E50914] transition-all">
                  <div className="text-[#E50914] text-2xl mb-1">3+</div>
                  <div className="text-white text-xs mb-0.5">Markets</div>
                  <div className="text-[#808080] text-xs">UAE, India, USA</div>
                </div>
                <div className="bg-[#2F2F2F] rounded-lg p-4 text-center border border-[#444] hover:border-[#E50914] transition-all">
                  <div className="text-[#E50914] text-2xl mb-1">10+</div>
                  <div className="text-white text-xs mb-0.5">Skills</div>
                  <div className="text-[#808080] text-xs">Mastered</div>
                </div>
                <div className="bg-[#2F2F2F] rounded-lg p-4 text-center border border-[#444] hover:border-[#E50914] transition-all">
                  <div className="text-[#E50914] text-2xl mb-1">100%</div>
                  <div className="text-white text-xs mb-0.5">Passion</div>
                  <div className="text-[#808080] text-xs">Driven</div>
                </div>
              </div>

              {/* Certifications Badges */}
              <div className="bg-[#2F2F2F] rounded-xl p-6">
                <h3 className="text-white text-xl mb-4 text-center">Certified Expertise</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="px-4 py-2 bg-[#141414] rounded-full border border-[#444] text-[#B3B3B3] text-sm hover:border-[#E50914] transition-all">
                    Meta Certified Digital Marketing Associate
                  </div>
                  <div className="px-4 py-2 bg-[#141414] rounded-full border border-[#444] text-[#B3B3B3] text-sm hover:border-[#E50914] transition-all">
                    Facebook Blueprint Certified
                  </div>
                  <div className="px-4 py-2 bg-[#141414] rounded-full border border-[#444] text-[#B3B3B3] text-sm hover:border-[#E50914] transition-all">
                    HubSpot Inbound Certified
                  </div>
                  <div className="px-4 py-2 bg-[#141414] rounded-full border border-[#444] text-[#B3B3B3] text-sm hover:border-[#E50914] transition-all">
                    Google Analytics Qualified
                  </div>
                  <div className="px-4 py-2 bg-[#141414] rounded-full border border-[#444] text-[#B3B3B3] text-sm hover:border-[#E50914] transition-all">
                    W3Schools HTML5 Certified
                  </div>
                </div>
              </div>

            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}