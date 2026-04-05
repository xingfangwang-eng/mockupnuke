"use client";

import { ArrowRight, Sparkles, Zap } from 'lucide-react';

interface CTASectionProps {
  variant?: 'A' | 'B' | 'C';
}

export default function CTASection({ variant = 'A' }: CTASectionProps) {
  if (variant === 'A') {
    return <CTASectionA />;
  } else if (variant === 'B') {
    return <CTASectionB />;
  } else {
    return <CTASectionC />;
  }
}

function CTASectionA() {
  return (
    <section className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-black tracking-tighter text-white mb-6">
          Ready to Transform Your Screenshots?
        </h2>
        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          Join thousands of developers who save hours every week with MockupNuke.
        </p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 font-bold hover:bg-slate-100 active:scale-95 transition-all"
        >
          Get Started Free
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

function CTASectionB() {
  return (
    <div className="bg-slate-900 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-4xl font-black tracking-tighter text-white mb-4">
              Stop Wasting Time on Mockups
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              What used to take 30 minutes now takes 2 seconds. No design skills required.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.location.href = '/'} 
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-medium hover:bg-red-700 active:scale-95 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Try Now
              </button>
              <button 
                onClick={() => window.location.href = '/'} 
                className="inline-flex items-center gap-2 bg-transparent border border-slate-600 text-white px-6 py-3 font-medium hover:border-slate-400 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-slate-300">Quick Stats</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Time saved per mockup</span>
                <span className="text-white font-bold">28 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Users worldwide</span>
                <span className="text-white font-bold">12,000+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mockups created</span>
                <span className="text-white font-bold">500,000+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CTASectionC() {
  return (
    <article className="bg-white py-16 px-6 border-t border-slate-200">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          100% Free Forever
        </div>
        
        <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-6">
          Your Next Great Screenshot Starts Here
        </h2>
        
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          No signup. No credit card. No watermarks. Just paste your screenshot and get a professional mockup in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/'} 
            className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 font-medium hover:bg-red-700 active:scale-95 transition-all"
          >
            Paste Your Screenshot
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => window.location.href = '/'} 
            className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-900 px-8 py-4 font-medium hover:bg-slate-200 transition-all"
          >
            See Examples
          </button>
        </div>
        
        <p className="mt-6 text-sm text-slate-500">
          Works in Chrome, Firefox, Safari, and Edge
        </p>
      </div>
    </article>
  );
}
