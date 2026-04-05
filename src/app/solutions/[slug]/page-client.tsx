"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, X, Check, Coffee, Star, ArrowRight, Share2, Heart, MessageSquare } from 'lucide-react';

interface Keyword {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve?: string;
  benefit?: string;
  tools_needed?: string;
  step_by_step?: string;
  example_usage?: string;
  common_mistakes?: string;
  tips?: string;
  conclusion?: string;
  faq?: {
    question: string;
    answer: string;
  }[];
  long_intro?: string;
  short_intro?: string;
  final_thoughts?: string;
}

interface SolutionPageClientProps {
  keyword: Keyword | undefined;
}

// 生成唯一ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// 导入关键词数据
import keywordsData from '../../../../data/keywords.json';

const SolutionPageClient: React.FC<SolutionPageClientProps> = ({ keyword }) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!keyword) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Solution Not Found</h2>
          <p className="text-slate-600 mb-8">The solution you're looking for doesn't exist.</p>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium shadow-md hover:bg-indigo-600 transition-all"
          >
            <ArrowLeft size={18} />
            Back to Solutions
          </Link>
        </div>
      </div>
    );
  }

  const { title, problem_description, how_to_solve, benefit, tools_needed, step_by_step, example_usage, common_mistakes, tips, conclusion, faq, long_intro, short_intro, final_thoughts } = keyword;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqItems = faq || [
    {
      question: "How long does it take to implement this solution?",
      answer: "Implementation time varies depending on your experience, but most users can complete it within 15-30 minutes."
    },
    {
      question: "Do I need any special tools?",
      answer: "The basic implementation requires no special tools, but some advanced features may require specific software."
    }
  ];

  const userReviews = [
    {
      id: generateId(),
      name: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      content: "This solution completely transformed how we create visual content for our social media. The results are stunning!"
    },
    {
      id: generateId(),
      name: "Michael Chen",
      role: "Product Designer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      content: "Great tool with lots of customization options. The interface is intuitive and easy to use."
    },
    {
      id: generateId(),
      name: "Emily Rodriguez",
      role: "Content Creator",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      content: "This has saved me so much time! The quality of the outputs is professional and consistent."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold text-slate-900">MockupNuke</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-indigo-500 font-medium">Home</Link>
            <Link href="/solutions" className="text-indigo-500 font-medium">Solutions</Link>
            <Link href="/demo" className="text-slate-600 hover:text-indigo-500 font-medium">Demo</Link>
          </nav>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">
              Log in
            </button>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600">
              Sign up
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
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
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              {/* Navigation Tabs */}
              <div className="bg-white border border-slate-200 rounded-md mb-6">
                <nav className="flex flex-col">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 text-left font-medium transition-all ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('implementation')}
                    className={`px-4 py-3 text-left font-medium transition-all ${activeTab === 'implementation' ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    Implementation
                  </button>
                  <button
                    onClick={() => setActiveTab('examples')}
                    className={`px-4 py-3 text-left font-medium transition-all ${activeTab === 'examples' ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    Examples
                  </button>
                  <button
                    onClick={() => setActiveTab('faq')}
                    className={`px-4 py-3 text-left font-medium transition-all ${activeTab === 'faq' ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    FAQ
                  </button>
                </nav>
              </div>

              {/* Share & Save */}
              <div className="bg-white border border-slate-200 rounded-md p-4">
                <h3 className="text-sm font-medium text-slate-900 mb-3">Share this solution</h3>
                <div className="flex gap-2 mb-4">
                  <button className="flex items-center justify-center w-8 h-8 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50">
                    <X size={16} />
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50">
                    <Share2 size={16} />
                  </button>
                  <button 
                    onClick={handleCopyUrl}
                    className="flex items-center justify-center w-8 h-8 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
                  </button>
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50 font-medium">
                  <Heart size={16} />
                  Save for later
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-8 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-indigo-100 mb-6">{short_intro || problem_description}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium shadow-md hover:bg-indigo-50 transition-all"
                >
                  <Download size={18} />
                  Try Now
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all"
                >
                  <Coffee size={18} />
                  See Demo
                </Link>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Problem</h3>
                      <p className="text-slate-600 leading-relaxed">{problem_description}</p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Solution</h3>
                      <p className="text-slate-600 leading-relaxed">{how_to_solve || 'This solution provides a step-by-step approach to solve the problem effectively.'}</p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Benefits</h3>
                      <p className="text-slate-600 leading-relaxed">{benefit || 'Implementing this solution will help you achieve better results, save time, and improve the quality of your work.'}</p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Tools Needed</h3>
                      <p className="text-slate-600 leading-relaxed">{tools_needed || 'No special tools are required to implement this solution.'}</p>
                    </section>
                  </div>
                </div>
              )}

              {activeTab === 'implementation' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementation</h2>
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Step-by-Step Guide</h3>
                      <p className="text-slate-600 leading-relaxed">{step_by_step || 'Follow these steps to implement the solution:'}</p>
                      <ol className="list-decimal list-inside space-y-2 mt-3 text-slate-600">
                        <li>Prepare your materials</li>
                        <li>Follow the instructions carefully</li>
                        <li>Test the results</li>
                        <li>Make adjustments as needed</li>
                      </ol>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Common Mistakes</h3>
                      <p className="text-slate-600 leading-relaxed">{common_mistakes || 'Avoid these common mistakes when implementing the solution:'}</p>
                      <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600">
                        <li>Rushing through the process</li>
                        <li>Not following instructions carefully</li>
                        <li>Ignoring best practices</li>
                      </ul>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Tips</h3>
                      <p className="text-slate-600 leading-relaxed">{tips || 'Here are some tips to help you get the most out of this solution:'}</p>
                      <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600">
                        <li>Take your time and be thorough</li>
                        <li>Test with different scenarios</li>
                        <li>Ask for help if needed</li>
                      </ul>
                    </section>
                  </div>
                </div>
              )}

              {activeTab === 'examples' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Examples</h2>
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Example Usage</h3>
                      <p className="text-slate-600 leading-relaxed">{example_usage || 'Here are some examples of how this solution can be used:'}</p>
                      <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <p className="text-slate-700 italic">"This solution has been used by thousands of professionals to create stunning visual content for their marketing campaigns, presentations, and social media posts."</p>
                      </div>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Conclusion</h3>
                      <p className="text-slate-600 leading-relaxed">{conclusion || final_thoughts || 'This solution provides a powerful way to create professional-looking visuals without the need for expensive software or design skills.'}</p>
                    </section>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-slate-200 pb-4">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.question}</h3>
                        <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Reviews */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">User Reviews</h2>
              <div className="space-y-6">
                {userReviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        console.error(`Image failed to load: ${review.avatar}`, e);
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNNiA0aDIgMjYtMiAyek02IDl2MjptMCA1aDJ2LTJoLTJ6IiBzdHJva2U9IiNmNGY0ZjQiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==';
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{review.name}</h3>
                        <span className="text-sm text-slate-500">{review.role}</span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                          />
                        ))}
                      </div>
                      <p className="text-slate-600 leading-relaxed">{review.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full py-2 text-center text-indigo-500 font-medium hover:bg-indigo-50 rounded-md transition-all">
                Read more reviews
              </button>
            </div>

            {/* Related Solutions */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Solutions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keywordsData
                  .filter((item: Keyword) => item.slug !== keyword.slug)
                  .slice(0, 4)
                  .map((item: Keyword) => (
                    <Link key={item.slug} href={`/solutions/${item.slug}`} className="block p-4 border border-slate-200 rounded-md hover:border-indigo-500 hover:shadow-sm transition-all">
                      <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{item.problem_description}</p>
                      <div className="mt-3 flex items-center text-indigo-500 text-sm font-medium">
                        <span>Learn more</span>
                        <ArrowRight size={14} className="ml-1" />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-slate-400 text-sm">
            <p>© 2026 MockupNuke. All rights reserved.</p>
            <p className="mt-2">Support: 457239850@qq.com</p>
            <div className="mt-4 flex justify-center gap-4">
              <Link href="/" className="hover:text-slate-600">Home</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SolutionPageClient;