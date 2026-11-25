// Centralized search data for the entire website
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'portfolio' | 'skill' | 'certification' | 'education' | 'service' | 'achievement';
  subcategory?: string;
  tags: string[];
  url?: string;
}

export const searchableContent: SearchResult[] = [
  // Portfolio Projects - E-commerce
  {
    id: 'sushiro',
    title: 'Sushiro Saudi Arabia',
    description: 'Japanese restaurant chain campaign delivering 7.08M SAR revenue with 8.53x ROAS through localized Meta advertising',
    category: 'portfolio',
    subcategory: 'E-commerce',
    tags: ['E-commerce', 'Meta Ads', 'Saudi Arabia', 'Restaurant', 'Japanese Cuisine', 'ROAS', 'Revenue Growth', 'Food Delivery'],
  },
  
  // Portfolio Projects - Lead Generation
  {
    id: 'misk',
    title: 'Misk Schools Saudi Arabia',
    description: 'Premium education campaign generating 5,000+ qualified leads at $7.5 CPL for K-12 enrollment',
    category: 'portfolio',
    subcategory: 'Lead Generation',
    tags: ['Lead Generation', 'Education', 'Saudi Arabia', 'Google Ads', 'Meta Ads', 'K-12', 'Schools', 'CPL'],
  },
  {
    id: 'gems',
    title: 'GEMS Education Dubai',
    description: 'International school network campaign delivering 8,000+ leads at $12 CPL across multiple campuses',
    category: 'portfolio',
    subcategory: 'Lead Generation',
    tags: ['Lead Generation', 'Education', 'Dubai', 'UAE', 'Google Ads', 'Meta Ads', 'International Schools', 'CPL'],
  },
  {
    id: 'damac',
    title: 'DAMAC Properties Dubai',
    description: 'Luxury real estate campaign generating 3,500+ qualified leads at $45 CPL for premium developments',
    category: 'portfolio',
    subcategory: 'Lead Generation',
    tags: ['Lead Generation', 'Real Estate', 'Dubai', 'UAE', 'Luxury', 'Google Ads', 'Meta Ads', 'Property'],
  },
  {
    id: 'emaar',
    title: 'Emaar Properties Dubai',
    description: 'Premium property developer campaign delivering 4,200+ leads at $38 CPL for residential projects',
    category: 'portfolio',
    subcategory: 'Lead Generation',
    tags: ['Lead Generation', 'Real Estate', 'Dubai', 'UAE', 'Google Ads', 'Meta Ads', 'Residential', 'Property'],
  },
  {
    id: 'rak-properties',
    title: 'RAK Properties',
    description: 'Real estate campaign in Ras Al Khaimah generating 2,800+ leads at $25 CPL for affordable housing',
    category: 'portfolio',
    subcategory: 'Lead Generation',
    tags: ['Lead Generation', 'Real Estate', 'RAK', 'UAE', 'Google Ads', 'Meta Ads', 'Affordable Housing'],
  },
  {
    id: 'aldar',
    title: 'Aldar Properties Abu Dhabi',
    description: 'Major developer campaign delivering 3,000+ leads at $42 CPL for mixed-use developments',
    category: 'portfolio',
    subcategory: 'Lead Generation',
    tags: ['Lead Generation', 'Real Estate', 'Abu Dhabi', 'UAE', 'Google Ads', 'Meta Ads', 'Mixed-use'],
  },
  
  // Skills
  {
    id: 'skill-meta-ads',
    title: 'Meta Advertising (Facebook & Instagram)',
    description: 'Expert in campaign setup, audience targeting, creative optimization, and scaling for performance',
    category: 'skill',
    tags: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Social Media Marketing', 'Paid Advertising', 'Campaign Management'],
  },
  {
    id: 'skill-google-ads',
    title: 'Google Ads (Search, Display, Shopping)',
    description: 'Proficient in keyword research, bid management, ad copywriting, and conversion optimization',
    category: 'skill',
    tags: ['Google Ads', 'Search Ads', 'Display Ads', 'Shopping Ads', 'PPC', 'Paid Search', 'SEM'],
  },
  {
    id: 'skill-tiktok',
    title: 'TikTok Ads',
    description: 'Skilled in creating viral ad content, audience targeting, and performance tracking on TikTok',
    category: 'skill',
    tags: ['TikTok Ads', 'TikTok Marketing', 'Video Ads', 'Social Media', 'Short-form Content'],
  },
  {
    id: 'skill-snapchat',
    title: 'Snapchat Ads',
    description: 'Experienced in Snapchat campaign management, AR lenses, and youth audience targeting',
    category: 'skill',
    tags: ['Snapchat Ads', 'Snap Ads', 'AR Marketing', 'Social Media', 'Youth Marketing'],
  },
  {
    id: 'skill-linkedin',
    title: 'LinkedIn Ads',
    description: 'Expert in B2B lead generation, sponsored content, and professional audience targeting',
    category: 'skill',
    tags: ['LinkedIn Ads', 'B2B Marketing', 'Lead Generation', 'Professional Network', 'Sponsored Content'],
  },
  {
    id: 'skill-analytics',
    title: 'Analytics & Data Analysis',
    description: 'Advanced proficiency in Google Analytics, Meta Analytics, and data-driven decision making',
    category: 'skill',
    tags: ['Analytics', 'Google Analytics', 'Data Analysis', 'Reporting', 'Insights', 'Metrics', 'KPI'],
  },
  {
    id: 'skill-seo',
    title: 'SEO (Search Engine Optimization)',
    description: 'Expert in on-page SEO, technical SEO, link building, and organic traffic growth',
    category: 'skill',
    tags: ['SEO', 'Search Engine Optimization', 'Organic Traffic', 'Link Building', 'Technical SEO', 'On-page SEO'],
  },
  {
    id: 'skill-conversion',
    title: 'Conversion Rate Optimization (CRO)',
    description: 'Skilled in A/B testing, landing page optimization, and improving conversion funnels',
    category: 'skill',
    tags: ['CRO', 'Conversion Optimization', 'A/B Testing', 'Landing Pages', 'Funnel Optimization'],
  },
  {
    id: 'skill-ecommerce',
    title: 'E-commerce Marketing',
    description: 'Comprehensive experience in online store optimization, product marketing, and revenue scaling',
    category: 'skill',
    tags: ['E-commerce', 'Online Store', 'Product Marketing', 'Revenue Growth', 'Shopping Campaigns'],
  },
  {
    id: 'skill-email',
    title: 'Email Marketing',
    description: 'Expert in email campaign design, automation, segmentation, and deliverability',
    category: 'skill',
    tags: ['Email Marketing', 'Email Automation', 'Newsletter', 'Campaign Management', 'Segmentation'],
  },
  
  // Certifications
  {
    id: 'cert-meta-buying',
    title: 'Meta Certified Media Buying Professional',
    description: 'Official certification demonstrating expertise in Meta advertising platform and campaign optimization',
    category: 'certification',
    tags: ['Meta Ads', 'Facebook', 'Instagram', 'Certification', 'Media Buying', 'Professional'],
  },
  {
    id: 'cert-google-ads',
    title: 'Google Ads Certification',
    description: 'Certified in Google Ads Search, Display, and Shopping campaigns',
    category: 'certification',
    tags: ['Google Ads', 'Certification', 'Search Ads', 'Display Ads', 'Shopping', 'Google'],
  },
  {
    id: 'cert-analytics',
    title: 'Google Analytics Certification',
    description: 'Certified in Google Analytics implementation, reporting, and data analysis',
    category: 'certification',
    tags: ['Google Analytics', 'Certification', 'Analytics', 'Data Analysis', 'Reporting'],
  },
  {
    id: 'cert-hubspot',
    title: 'HubSpot Inbound Marketing Certification',
    description: 'Certified in inbound methodology, content marketing, and marketing automation',
    category: 'certification',
    tags: ['HubSpot', 'Inbound Marketing', 'Content Marketing', 'Marketing Automation', 'Certification'],
  },
  
  // Education
  {
    id: 'edu-bachelors',
    title: 'Bachelor of Business Administration (BBA)',
    description: 'Major in Marketing from a recognized university with focus on digital marketing strategies',
    category: 'education',
    tags: ['Education', 'BBA', 'Marketing', 'Business Administration', 'University', 'Degree'],
  },
  
  // Services
  {
    id: 'service-paid-ads',
    title: 'Paid Advertising Management',
    description: 'Full-service paid advertising across Meta, Google, TikTok, Snapchat, and LinkedIn platforms',
    category: 'service',
    tags: ['Services', 'Paid Ads', 'Campaign Management', 'Meta Ads', 'Google Ads', 'Social Media'],
  },
  {
    id: 'service-strategy',
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive marketing strategy development, planning, and execution for business growth',
    category: 'service',
    tags: ['Services', 'Strategy', 'Marketing Planning', 'Business Growth', 'Consulting'],
  },
  {
    id: 'service-ecommerce',
    title: 'E-commerce Growth',
    description: 'End-to-end e-commerce marketing solutions for revenue scaling and customer acquisition',
    category: 'service',
    tags: ['Services', 'E-commerce', 'Revenue Growth', 'Customer Acquisition', 'Online Store'],
  },
  {
    id: 'service-lead-gen',
    title: 'Lead Generation Campaigns',
    description: 'High-quality lead generation for education, real estate, B2B, and service industries',
    category: 'service',
    tags: ['Services', 'Lead Generation', 'B2B', 'Real Estate', 'Education', 'Leads'],
  },
  {
    id: 'service-analytics',
    title: 'Analytics & Reporting',
    description: 'Data analysis, performance tracking, and actionable insights for optimization',
    category: 'service',
    tags: ['Services', 'Analytics', 'Reporting', 'Data Analysis', 'Performance Tracking'],
  },
  
  // Achievements
  {
    id: 'achievement-roas',
    title: 'Consistent 6-10x ROAS Achievement',
    description: 'Maintained high return on ad spend across multiple e-commerce clients and industries',
    category: 'achievement',
    tags: ['Achievement', 'ROAS', 'Performance', 'E-commerce', 'Results'],
  },
  {
    id: 'achievement-revenue',
    title: '50M+ AED in Client Revenue Generated',
    description: 'Collectively generated over 50 million AED in revenue for clients across GCC markets',
    category: 'achievement',
    tags: ['Achievement', 'Revenue', 'ROI', 'Results', 'Performance'],
  },
  {
    id: 'achievement-dubai',
    title: '7+ Years Experience in Dubai',
    description: 'Deep expertise in GCC market dynamics, cultural nuances, and regional marketing strategies',
    category: 'achievement',
    tags: ['Achievement', 'Experience', 'Dubai', 'UAE', 'GCC', 'Regional Expertise'],
  },
];

// Search function
export function searchContent(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }
  
  const searchTerms = query.toLowerCase().trim().split(' ').filter(term => term.length > 0);
  
  return searchableContent.filter(item => {
    const searchableText = `
      ${item.title} 
      ${item.description} 
      ${item.category} 
      ${item.subcategory || ''} 
      ${item.tags.join(' ')}
    `.toLowerCase();
    
    // Return true if any search term matches
    return searchTerms.some(term => searchableText.includes(term));
  }).sort((a, b) => {
    // Prioritize title matches
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    const firstTerm = searchTerms[0];
    
    const aTitleMatch = aTitle.includes(firstTerm);
    const bTitleMatch = bTitle.includes(firstTerm);
    
    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    
    return 0;
  });
}