"use client";

import { ChevronRight, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import keywords from '../../../data/keywords.json';

interface Keyword {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
}

interface SlugPageClientProps {
  keyword: Keyword | undefined;
}

const SlugPageClient: React.FC<SlugPageClientProps> = ({ keyword }) => {
  if (!keyword) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-8">Page Not Found</h1>
          <p className="text-lg text-slate-600">The requested page could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 面包屑导航 */}
        <div className="mb-8 text-sm text-slate-500">
          <nav className="flex gap-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/solutions" className="hover:text-blue-600">Solutions</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium truncate max-w-xs">{keyword.title}</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7">
            {/* Title */}
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-8">
              {keyword.title}
            </h1>

            {/* Problem Section */}
            <div className="bg-white border border-slate-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pl-4 border-l-4 border-red-600">
                The Problem
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                {keyword.problem_description}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                This is a common pain point for developers, designers, and content creators who need to present their work professionally. Without the right tools, creating polished visuals can be time-consuming and frustrating, leading to missed opportunities and lower engagement.
              </p>
            </div>

            {/* The Tool */}
            <div className="bg-white border border-slate-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pl-4 border-l-4 border-red-600">
                The Solution
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {keyword.how_to_solve}
              </p>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-medium hover:bg-red-700 active:scale-95 transition-all"
              >
                Try MockupNuke Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* The Guide */}
            <div className="bg-white border border-slate-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pl-4 border-l-4 border-red-600">
                How It Works
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                MockupNuke is designed to be the fastest way to create professional-looking screenshots. Our tool automatically applies beautiful gradients, macOS-style window frames, and perfect spacing to your images in just one click.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900">Step 1: Paste Your Screenshot</h3>
                    <p className="text-slate-600">Simply press Ctrl+V or drag and drop your screenshot onto the canvas.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900">Step 2: Auto-Enhancement</h3>
                    <p className="text-slate-600">Our AI analyzes your image and applies the perfect gradient background automatically.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900">Step 3: Choose a Style</h3>
                    <p className="text-slate-600">Select from 5 beautiful gradient presets or let our smart matching choose for you.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900">Step 4: Download & Share</h3>
                    <p className="text-slate-600">Download your polished screenshot in 3x resolution, ready for Twitter, LinkedIn, or your website.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why MockupNuke */}
            <div className="bg-white border border-slate-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pl-4 border-l-4 border-red-600">
                Why Choose MockupNuke?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Lightning Fast</h3>
                    <p className="text-slate-600 text-sm">Create professional mockups in under 2 seconds, not 5 minutes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">No Design Skills Needed</h3>
                    <p className="text-slate-600 text-sm">Perfect output every time, even if you have zero design experience.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">100% Free</h3>
                    <p className="text-slate-600 text-sm">No signup, no credit card, no watermarks. Just pure utility.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">3x Resolution Export</h3>
                    <p className="text-slate-600 text-sm">Crystal-clear images that look perfect on any display.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3">
            <div className="sticky top-8 space-y-8">
              {/* Tool Card */}
              <div className="bg-white border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">MockupNuke</h3>
                <p className="text-slate-600 mb-6">
                  Transform your screenshots into professional visuals in seconds.
                </p>
                <a 
                  href="/" 
                  className="block w-full bg-red-600 text-white px-6 py-3 font-medium hover:bg-red-700 active:scale-95 transition-all text-center mb-4"
                >
                  Try Now - It's Free
                </a>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>No signup required</span>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Key Features</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-600">Instant paste & transform</span>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-600">5 beautiful gradient presets</span>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-600">macOS window frame</span>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-600">Smart color matching</span>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-600">3x high-res export</span>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-600">Mobile-friendly</span>
                  </div>
                </div>
              </div>

              {/* Related Topics */}
              <div className="bg-white border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Related Topics</h3>
                <div className="space-y-3">
                  {keywords
                    .filter((k) => k.slug !== keyword.slug)
                    .slice(0, 5)
                    .map((related) => (
                      <a
                        key={related.slug}
                        href={`/${related.slug}`}
                        className="block text-slate-600 hover:text-slate-900 flex items-center gap-1 text-sm p-2 hover:bg-slate-50 rounded-md"
                      >
                        <ChevronRight className="w-4 h-4" />
                        {related.title}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          <p>© 2026 MockupNuke. All rights reserved.</p>
          <p className="mt-2">Support: 457239850@qq.com</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="/" className="hover:text-slate-600">Home</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlugPageClient;
