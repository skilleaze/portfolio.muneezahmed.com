import { Award, TrendingUp, Globe, Sparkles, CheckCircle } from 'lucide-react';
import seoImage1 from 'figma:asset/b90a53b335e1b1281117fe23ba3c3ac67d05e37c.png';
import seoImage2 from 'figma:asset/773fecadef67af76d443357173e4db5457ed892b.png';
import seoImage3 from 'figma:asset/ad7df53dfc83e89093cad4f041dd265078f361a5.png';

export function ProofOfWork() {
  const seoRankings = [
    {
      keyword: 'Best Performance Marketing Specialist',
      image: seoImage1,
      rank: '#1',
      location: 'Dubai',
    },
    {
      keyword: 'Best Digital Marketing Specialist in Dubai',
      image: seoImage2,
      rank: '#1',
      location: 'Dubai',
    },
    {
      keyword: 'Best Real Estate Marketing Specialist',
      image: seoImage3,
      rank: 'Featured',
      location: 'Dubai',
    },
  ];

  return (
    <div className="px-6 md:px-12 py-16 bg-gradient-to-b from-[#141414] via-[#0a0a0a] to-[#141414]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E50914]/10 border border-[#E50914]/30 rounded-full mb-6">
            <Award className="w-5 h-5 text-[#E50914]" />
            <span className="text-[#E50914]">Practice What I Preach</span>
          </div>
          <h2 className="text-3xl md:text-5xl text-white mb-4">Marketing Myself: The Ultimate Proof</h2>
          <p className="text-[#B3B3B3] text-lg max-w-3xl mx-auto">
            If I can't market myself effectively in a crowded market, how can I market your brand? 
            Here's the proof that the strategies I use for clients work just as well for my own brand.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left: Creative Differentiation */}
          <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-8 border border-[#444] hover:border-[#E50914] transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#E50914] rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white text-2xl">Creative Differentiation</h3>
                <p className="text-[#808080] text-sm">Stand out or blend in</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-[#E50914]">
                <h4 className="text-white mb-2">The Challenge</h4>
                <p className="text-[#B3B3B3] text-sm leading-relaxed">
                  Every marketer has a portfolio. Same templates. Same layouts. Same boring approach. 
                  How do you get noticed when everyone looks identical?
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-[#E50914]">
                <h4 className="text-white mb-2">The Solution</h4>
                <p className="text-[#B3B3B3] text-sm leading-relaxed">
                  Built this Netflix-themed portfolio. Complete with loader animation, profile selection screen, 
                  horizontal scrolling carousels, and the iconic Netflix aesthetic. Not a template. Not generic. 
                  100% custom built to be unforgettable.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#E50914]/20 to-transparent rounded-lg p-4 border border-[#E50914]/30">
                <h4 className="text-white mb-2">The Result</h4>
                <p className="text-white text-sm leading-relaxed mb-3">
                  You're still here, aren't you? That's the power of differentiation.
                </p>
                <div className="flex items-center gap-2 text-[#E50914] text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Attention captured. Message delivered. Proof demonstrated.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Conversion Optimization */}
          <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-8 border border-[#444] hover:border-[#E50914] transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#E50914] rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white text-2xl">Conversion Optimization</h3>
                <p className="text-[#808080] text-sm">Built to convert</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-[#E50914]">
                <h4 className="text-white mb-2">Sales-Driven Design</h4>
                <p className="text-[#B3B3B3] text-sm leading-relaxed">
                  My main website (muneezahmed.com) isn't just pretty. It's a conversion machine. 
                  Clear value propositions. Strategic CTAs. Friction-free contact forms. Every element 
                  optimized to turn visitors into leads.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-[#E50914]">
                <h4 className="text-white mb-2">User Journey Engineering</h4>
                <p className="text-[#B3B3B3] text-sm leading-relaxed">
                  Studied heatmaps. Analyzed scroll depth. Tested headlines. Optimized mobile experience. 
                  Applied the same CRO principles I use for client landing pages on my own site.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#E50914]/20 to-transparent rounded-lg p-4 border border-[#E50914]/30">
                <h4 className="text-white mb-2">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
                    <div className="text-[#E50914] text-xl mb-1">Fast</div>
                    <div className="text-[#808080] text-xs">Load Speed</div>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
                    <div className="text-[#E50914] text-xl mb-1">High</div>
                    <div className="text-[#808080] text-xs">Engagement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rankings Section */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl p-8 border border-[#444]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#E50914] rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl">SEO Mastery: Ranked on Google</h3>
              <p className="text-[#808080] text-sm">Competing and winning in highly competitive markets</p>
            </div>
          </div>

          {/* Strategy Overview */}
          <div className="bg-[#2F2F2F] rounded-lg p-6 mb-8">
            <p className="text-[#B3B3B3] leading-relaxed mb-4">
              Ranking on Google for competitive keywords isn't luck. It's strategy. Technical SEO, content optimization, 
              backlink building, and consistent execution. Here's the proof that organic search is still one of the most 
              powerful marketing channels when done right.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-[#1a1a1a] border border-[#E50914]/30 rounded-full text-[#E50914] text-sm">
                On-Page SEO
              </span>
              <span className="px-3 py-1 bg-[#1a1a1a] border border-[#E50914]/30 rounded-full text-[#E50914] text-sm">
                Technical Optimization
              </span>
              <span className="px-3 py-1 bg-[#1a1a1a] border border-[#E50914]/30 rounded-full text-[#E50914] text-sm">
                Content Strategy
              </span>
              <span className="px-3 py-1 bg-[#1a1a1a] border border-[#E50914]/30 rounded-full text-[#E50914] text-sm">
                Local SEO
              </span>
              <span className="px-3 py-1 bg-[#1a1a1a] border border-[#E50914]/30 rounded-full text-[#E50914] text-sm">
                Schema Markup
              </span>
            </div>
          </div>

          {/* Rankings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {seoRankings.map((ranking, index) => (
              <div 
                key={index}
                className="bg-[#2F2F2F] rounded-xl overflow-hidden border border-[#444] hover:border-[#E50914] transition-all hover:scale-105"
              >
                {/* Rank Badge */}
                <div className="bg-gradient-to-r from-[#E50914] to-[#B8070F] px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-white text-sm opacity-90">Google Ranking</div>
                    <div className="text-white text-2xl">{ranking.rank}</div>
                  </div>
                  <Award className="w-8 h-8 text-white/80" />
                </div>

                {/* Screenshot */}
                <div className="relative aspect-video bg-[#1a1a1a] overflow-hidden">
                  <img 
                    src={ranking.image} 
                    alt={`SEO ranking for ${ranking.keyword}`}
                    className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="p-4">
                  <h4 className="text-white mb-2 leading-tight">{ranking.keyword}</h4>
                  <div className="flex items-center gap-2 text-[#808080] text-sm">
                    <Globe className="w-4 h-4" />
                    <span>{ranking.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 bg-gradient-to-r from-[#E50914]/10 to-transparent rounded-lg p-6 border border-[#E50914]/30">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-[#E50914] flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white text-lg mb-2">Why This Matters</h4>
                <p className="text-[#B3B3B3] leading-relaxed">
                  These aren't vanity rankings. These are competitive, high-intent keywords in Dubai's market. 
                  Businesses searching for these terms are actively looking for specialists. That's qualified traffic. 
                  That's lead generation. That's the power of SEO done right. Plus, I rank for a lot of other keywords too.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Proof Statement */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-transparent via-[#E50914]/20 to-transparent rounded-xl p-8 border-y border-[#E50914]/30">
            <p className="text-white text-xl md:text-2xl leading-relaxed">
              I don't just talk about marketing strategies. I execute them on myself first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}