import { useState } from 'react';
import { Target, TrendingUp, Zap, Brain, Users, BarChart3, Lightbulb, ChevronRight } from 'lucide-react';

export function MarketingApproach() {
  const [activeTab, setActiveTab] = useState<'process' | 'comparison' | 'framework'>('process');

  return (
    <div className="px-6 md:px-12 py-16 bg-gradient-to-b from-[#141414] via-[#1a1a1a] to-[#141414]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl text-white mb-4">The System Behind The Results</h2>
          <p className="text-[#B3B3B3] text-lg max-w-3xl mx-auto">
            Most marketers chase tactics. I build systems. Here's exactly how I approach every campaign, 
            and why it works when cookie-cutter strategies fail.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab('process')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'process'
                ? 'bg-[#E50914] text-white'
                : 'bg-[#2F2F2F] text-[#B3B3B3] hover:bg-[#3F3F3F]'
            }`}
          >
            My Process
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'comparison'
                ? 'bg-[#E50914] text-white'
                : 'bg-[#2F2F2F] text-[#B3B3B3] hover:bg-[#3F3F3F]'
            }`}
          >
            Traditional vs. My Way
          </button>
          <button
            onClick={() => setActiveTab('framework')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'framework'
                ? 'bg-[#E50914] text-white'
                : 'bg-[#2F2F2F] text-[#B3B3B3] hover:bg-[#3F3F3F]'
            }`}
          >
            The Framework
          </button>
        </div>

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="space-y-6 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phase 1 */}
              <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-6 border-l-4 border-[#E50914] hover:scale-105 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#E50914] rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-[#E50914] text-sm">Phase 1</span>
                    <h3 className="text-white text-xl">Deep Research</h3>
                  </div>
                </div>
                <ul className="space-y-2 text-[#B3B3B3]">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Audience psychology mapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Competitor creative analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Platform-specific behavior study</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Customer journey documentation</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-[#444]">
                  <p className="text-[#808080] text-sm italic">
                    Why: You cannot sell to people you don't understand. Every great campaign starts with research, not ads.
                  </p>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-6 border-l-4 border-[#E50914] hover:scale-105 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#E50914] rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-[#E50914] text-sm">Phase 2</span>
                    <h3 className="text-white text-xl">Custom Creative</h3>
                  </div>
                </div>
                <ul className="space-y-2 text-[#B3B3B3]">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Pattern interruption hooks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Multi-variant creative testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Landing page funnel design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Copy-creative alignment</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-[#444]">
                  <p className="text-[#808080] text-sm italic">
                    Why: Generic templates blend in. Custom creative stands out. Attention is the first conversion.
                  </p>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-gradient-to-br from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-6 border-l-4 border-[#E50914] hover:scale-105 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#E50914] rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-[#E50914] text-sm">Phase 3</span>
                    <h3 className="text-white text-xl">Test & Scale</h3>
                  </div>
                </div>
                <ul className="space-y-2 text-[#B3B3B3]">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Controlled budget testing phase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Data-driven optimization loops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Winner identification & scaling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#E50914] mt-1 flex-shrink-0" />
                    <span>Attribution tracking & reporting</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-[#444]">
                  <p className="text-[#808080] text-sm italic">
                    Why: Testing kills assumptions. Data reveals truth. Scale what works, kill what doesn't.
                  </p>
                </div>
              </div>
            </div>

            {/* Process Flow Visual */}
            <div className="bg-[#1F1F1F] rounded-xl p-8 mt-8">
              <h3 className="text-white text-2xl mb-6 text-center">The Complete Flow</h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-[#E50914] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-2xl">1</span>
                  </div>
                  <p className="text-white mb-1">Research</p>
                  <p className="text-[#808080] text-sm">Know the audience</p>
                </div>
                <ChevronRight className="w-8 h-8 text-[#E50914] hidden md:block" />
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-[#E50914] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-2xl">2</span>
                  </div>
                  <p className="text-white mb-1">Create</p>
                  <p className="text-[#808080] text-sm">Build custom assets</p>
                </div>
                <ChevronRight className="w-8 h-8 text-[#E50914] hidden md:block" />
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-[#E50914] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-2xl">3</span>
                  </div>
                  <p className="text-white mb-1">Test</p>
                  <p className="text-[#808080] text-sm">Find winners</p>
                </div>
                <ChevronRight className="w-8 h-8 text-[#E50914] hidden md:block" />
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-[#E50914] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-2xl">4</span>
                  </div>
                  <p className="text-white mb-1">Scale</p>
                  <p className="text-[#808080] text-sm">Maximize ROI</p>
                </div>
                <ChevronRight className="w-8 h-8 text-[#E50914] hidden md:block" />
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-[#E50914] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-2xl">∞</span>
                  </div>
                  <p className="text-white mb-1">Repeat</p>
                  <p className="text-[#808080] text-sm">Continuous optimization</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="animate-fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traditional Approach */}
              <div className="bg-[#2F2F2F] rounded-xl p-8 opacity-60">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-[#444] rounded-full mb-4">
                    <span className="text-white">Traditional Marketer</span>
                  </div>
                  <p className="text-[#808080] text-sm">The typical approach most marketers take</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#444] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Uses template campaigns</p>
                      <p className="text-[#808080] text-sm">Same structure everyone else uses</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#444] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Launch first, research later</p>
                      <p className="text-[#808080] text-sm">Hope and pray strategy</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#444] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Generic stock creatives</p>
                      <p className="text-[#808080] text-sm">Blends in with every other ad</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#444] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Platform best practices only</p>
                      <p className="text-[#808080] text-sm">Follows what everyone else does</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#444] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Vanity metrics focus</p>
                      <p className="text-[#808080] text-sm">Impressions and clicks over revenue</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#444] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Reactive optimization</p>
                      <p className="text-[#808080] text-sm">Wait for problems to appear</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#1F1F1F] rounded-lg text-center">
                  <p className="text-[#808080]">Result: Mediocre performance</p>
                  <p className="text-[#E50914] text-3xl mt-2">150% ROI</p>
                </div>
              </div>

              {/* My Approach */}
              <div className="bg-gradient-to-br from-[#E50914] to-[#B8070F] rounded-xl p-8 shadow-2xl shadow-[#E50914]/20">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-white/20 rounded-full mb-4">
                    <span className="text-white">My Approach</span>
                  </div>
                  <p className="text-white/80 text-sm">Systems over tactics, always</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#E50914] text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Custom campaigns from scratch</p>
                      <p className="text-white/70 text-sm">Unique strategy for every brand</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#E50914] text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Research before spending</p>
                      <p className="text-white/70 text-sm">Data-driven decision making</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#E50914] text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Pattern-interrupting creative</p>
                      <p className="text-white/70 text-sm">Stops the scroll every time</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#E50914] text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Best practices + innovation</p>
                      <p className="text-white/70 text-sm">Follow rules, then break them strategically</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#E50914] text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Revenue-first mentality</p>
                      <p className="text-white/70 text-sm">ROAS, CPA, LTV - numbers that matter</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#E50914] text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white mb-1">Proactive optimization</p>
                      <p className="text-white/70 text-sm">Daily monitoring and adjustment</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/10 rounded-lg text-center">
                  <p className="text-white/80">Result: Exceptional performance</p>
                  <p className="text-white text-3xl mt-2">300%+ ROI</p>
                </div>
              </div>
            </div>

            {/* Key Difference Callout */}
            <div className="mt-8 bg-gradient-to-r from-[#2F2F2F] to-[#1a1a1a] rounded-xl p-8 border-l-4 border-[#E50914]">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-8 h-8 text-[#E50914] flex-shrink-0" />
                <div>
                  <h3 className="text-white text-xl mb-2">The Real Difference</h3>
                  <p className="text-[#B3B3B3] leading-relaxed">
                    Traditional marketers optimize for metrics. I optimize for systems. Metrics change. Platforms update. 
                    Algorithms shift. But a solid system adapts to anything. That's why my campaigns consistently outperform 
                    industry benchmarks, even when platforms change the rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Framework Tab */}
        {activeTab === 'framework' && (
          <div className="animate-fade-up">
            <div className="bg-[#1F1F1F] rounded-xl p-8">
              <h3 className="text-white text-2xl mb-6 text-center">The 5-Layer Marketing Framework</h3>
              <p className="text-[#B3B3B3] text-center mb-8 max-w-2xl mx-auto">
                Every campaign I run follows this 5-layer framework. Miss one layer, the whole thing falls apart. 
                Nail all five, you print money.
              </p>

              <div className="space-y-4">
                {/* Layer 1 */}
                <div className="relative bg-gradient-to-r from-[#E50914] to-[#B8070F] rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-[#E50914]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white text-xl">Layer 1: Audience Intelligence</h4>
                        <span className="text-white/60 text-sm">Foundation</span>
                      </div>
                      <p className="text-white/80 mb-3">
                        Who are they? What do they want? What keeps them up at night? Where do they hang out online? 
                        What language do they speak? Deep audience research is non-negotiable.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">Demographics</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">Psychographics</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">Pain Points</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">Desires</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 2 */}
                <div className="relative bg-[#2F2F2F] rounded-xl p-6 ml-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#E50914] rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white text-xl">Layer 2: Creative Strategy</h4>
                        <span className="text-[#808080] text-sm">Attention</span>
                      </div>
                      <p className="text-[#B3B3B3] mb-3">
                        Stop the scroll. Break the pattern. Custom creative that speaks directly to the audience from Layer 1. 
                        Hook, hold, convert. Every frame matters.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#3F3F3F] rounded-full text-[#B3B3B3] text-sm">Pattern Interruption</span>
                        <span className="px-3 py-1 bg-[#3F3F3F] rounded-full text-[#B3B3B3] text-sm">Value Proposition</span>
                        <span className="px-3 py-1 bg-[#3F3F3F] rounded-full text-[#B3B3B3] text-sm">CTA Design</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 3 */}
                <div className="relative bg-[#2F2F2F] rounded-xl p-6 ml-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#E50914] rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white text-xl">Layer 3: Funnel Engineering</h4>
                        <span className="text-[#808080] text-sm">Conversion</span>
                      </div>
                      <p className="text-[#B3B3B3] mb-3">
                        The ad is just the beginning. Landing pages, checkout flows, email sequences - every touchpoint 
                        optimized to push users forward, not sideways.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#3F3F3F] rounded-full text-[#B3B3B3] text-sm">Landing Pages</span>
                        <span className="px-3 py-1 bg-[#3F3F3F] rounded-full text-[#B3B3B3] text-sm">CRO</span>
                        <span className="px-3 py-1 bg-[#3F3F3F] rounded-full text-[#B3B3B3] text-sm">Retargeting</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 4 */}
                <div className="relative bg-[#2F2F2F] rounded-xl p-6 ml-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#E50914] rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white text-xl">Layer 4: Data Infrastructure</h4>
                        <span className="text-[#808080] text-sm">Attribution</span>
                      </div>
                      <p className="text-[#B3B3B3] mb-3">
                        Track everything. GA4, GTM, custom events, conversion pixels, attribution models. 
                        You can't optimize what you can't measure. Data is the truth.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#3F3F3F] rounded-full text-[#B3B3B3] text-sm">Analytics</span>
                        <span className="px-3 py-1 bg-[#3F3F3F] rounded-full text-[#B3B3B3] text-sm">Attribution</span>
                        <span className="px-3 py-1 bg-[#3F3F3F] rounded-full text-[#B3B3B3] text-sm">Dashboards</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 5 */}
                <div className="relative bg-gradient-to-r from-[#E50914] to-[#B8070F] rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-[#E50914]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white text-xl">Layer 5: Optimization Loops</h4>
                        <span className="text-white/60 text-sm">Scale</span>
                      </div>
                      <p className="text-white/80 mb-3">
                        Continuous testing. Daily monitoring. Weekly reports. Monthly strategy reviews. Marketing isn't 
                        set-it-and-forget-it. Winners get scaled. Losers get killed. Always be optimizing.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">A/B Testing</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">Scaling</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">Iteration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Framework Summary */}
              <div className="mt-8 bg-[#2F2F2F] rounded-xl p-6 text-center">
                <p className="text-[#B3B3B3] mb-4">
                  All 5 layers working together = campaigns that scale profitably
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-white">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#E50914] rounded-full"></span>
                    Audience
                  </span>
                  <span className="text-[#E50914]">→</span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#E50914] rounded-full"></span>
                    Creative
                  </span>
                  <span className="text-[#E50914]">→</span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#E50914] rounded-full"></span>
                    Funnel
                  </span>
                  <span className="text-[#E50914]">→</span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#E50914] rounded-full"></span>
                    Data
                  </span>
                  <span className="text-[#E50914]">→</span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#E50914] rounded-full"></span>
                    Optimize
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
