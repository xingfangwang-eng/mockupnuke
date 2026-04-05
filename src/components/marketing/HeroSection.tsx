"use client";

import { Upload, ArrowRight, Image as ImageIcon, Check } from 'lucide-react';

interface HeroSectionProps {
  variant?: 'A' | 'B' | 'C';
}

export default function HeroSection({ variant = 'A' }: HeroSectionProps) {
  if (variant === 'A') {
    return <HeroSectionA />;
  } else if (variant === 'B') {
    return <HeroSectionB />;
  } else {
    return <HeroSectionC />;
  }
}

function HeroSectionA() {
  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-black tracking-tighter text-slate-900 mb-6">
          Transform Your Screenshots
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          Professional mockups in seconds. No design skills needed.
        </p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 font-medium hover:bg-red-700 active:scale-95 transition-all"
        >
          <Upload className="w-5 h-5" />
          Upload Screenshot
        </button>
      </div>
    </section>
  );
}

function HeroSectionB() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black tracking-tighter text-slate-900 mb-12 text-center">
          Before & After
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="bg-white border border-slate-200 p-8">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">Original</span>
            </div>
            <div className="aspect-video bg-slate-100 border border-slate-200 flex items-center justify-center">
              <span className="text-slate-400">Your raw screenshot</span>
            </div>
          </article>

          <article className="bg-white border border-slate-200 p-8">
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-slate-600">After MockupNuke</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white">Professional mockup</span>
            </div>
          </article>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => window.location.href = '/'} 
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 font-medium hover:bg-red-700 active:scale-95 transition-all"
          >
            Try It Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}

function HeroSectionC() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
              <div>
                <h3 className="font-bold text-slate-900">Your App</h3>
                <p className="text-sm text-slate-500">@yourapp · 2h</p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-slate-900 mb-4">
              Just launched our new feature! Check out this beautiful screenshot 🚀
            </p>
            
            <div className="aspect-video bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-medium">Your polished screenshot</span>
            </div>
            
            <div className="mt-4 flex items-center gap-6 text-slate-500 text-sm">
              <span>💬 24</span>
              <span>🔄 128</span>
              <span>❤️ 892</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.href = '/'} 
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 font-medium hover:bg-red-700 active:scale-95 transition-all"
          >
            Create Your Mockup
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
