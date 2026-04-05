"use client";

import { useState } from 'react';
import { Zap, Shield, Download, Palette, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface FeatureShowcaseProps {
  variant?: 'A' | 'B' | 'C';
}

export default function FeatureShowcase({ variant = 'A' }: FeatureShowcaseProps) {
  if (variant === 'A') {
    return <FeatureShowcaseA />;
  } else if (variant === 'B') {
    return <FeatureShowcaseB />;
  } else {
    return <FeatureShowcaseC />;
  }
}

function FeatureShowcaseA() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Transform screenshots in under 2 seconds with our optimized processing pipeline.',
    },
    {
      icon: Palette,
      title: 'Smart Color Matching',
      description: 'AI analyzes your image and automatically selects the perfect gradient background.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'All processing happens in your browser. Your screenshots never leave your device.',
    },
    {
      icon: Download,
      title: '3x Resolution Export',
      description: 'Download crystal-clear images optimized for any display or platform.',
    },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-12 text-center">
          Powerful Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <article key={index} className="bg-slate-50 border border-slate-200 p-6 hover:border-red-300 transition-colors">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureShowcaseB() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: 'Instant Paste',
      description: 'Press Ctrl+V and watch your screenshot transform instantly. No upload buttons, no waiting.',
      image: 'Paste your screenshot',
    },
    {
      title: 'Auto Enhancement',
      description: 'Our AI analyzes your image and applies the perfect gradient, shadows, and framing automatically.',
      image: 'AI enhancement in progress',
    },
    {
      title: 'One-Click Export',
      description: 'Download your polished mockup in 3x resolution, ready for Twitter, LinkedIn, or your website.',
      image: 'Download your creation',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-4xl font-black tracking-tighter text-slate-900 mb-12 text-center">
          How It Works
        </h3>
        
        <div className="relative">
          <div className="bg-white border border-slate-200 p-8 mb-6">
            <div className="aspect-video bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white text-lg font-medium">{slides[currentSlide].image}</span>
            </div>
            
            <h4 className="text-2xl font-bold text-slate-900 mb-4">
              {slides[currentSlide].title}
            </h4>
            <p className="text-lg text-slate-600 leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={prevSlide}
              className="p-3 bg-white border border-slate-200 hover:border-red-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? 'bg-red-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-3 bg-white border border-slate-200 hover:border-red-300 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureShowcaseC() {
  const specs = [
    { label: 'Processing Speed', value: '< 2 seconds' },
    { label: 'Export Resolution', value: '3x (up to 4K)' },
    { label: 'Supported Formats', value: 'PNG, JPG, WebP' },
    { label: 'Max File Size', value: '10MB' },
    { label: 'Browser Support', value: 'Chrome, Firefox, Safari, Edge' },
    { label: 'Privacy', value: '100% Client-side' },
    { label: 'Gradient Presets', value: '5 options' },
    { label: 'Frame Styles', value: 'macOS window' },
  ];

  return (
    <article className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-12 text-center">
          Technical Specifications
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center justify-between bg-slate-50 border border-slate-200 p-4">
              <span className="font-medium text-slate-700">{spec.label}</span>
              <span className="text-slate-900 font-bold">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-slate-50 border border-slate-200">
          <h4 className="text-xl font-bold text-slate-900 mb-4">Browser Requirements</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-slate-600">
              <Check className="w-4 h-4 text-green-600" />
              Modern browser with Canvas API support
            </li>
            <li className="flex items-center gap-2 text-slate-600">
              <Check className="w-4 h-4 text-green-600" />
              JavaScript enabled
            </li>
            <li className="flex items-center gap-2 text-slate-600">
              <Check className="w-4 h-4 text-green-600" />
              Clipboard API access (for paste functionality)
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
