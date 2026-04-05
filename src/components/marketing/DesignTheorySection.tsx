"use client";

import { Lightbulb, Eye, Palette, Layers } from 'lucide-react';

interface DesignTheorySectionProps {
  title: string;
  content: string;
  variant?: 'A' | 'B' | 'C';
}

export default function DesignTheorySection({ 
  title, 
  content, 
  variant = 'A' 
}: DesignTheorySectionProps) {
  if (variant === 'A') {
    return <DesignTheoryA title={title} content={content} />;
  } else if (variant === 'B') {
    return <DesignTheoryB title={title} content={content} />;
  } else {
    return <DesignTheoryC title={title} content={content} />;
  }
}

function ShadowDemo() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
        <div className="text-xs font-mono text-slate-400 mb-2">shadow-sm</div>
        <div className="text-sm text-slate-600">Subtle depth for clean interfaces</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100">
        <div className="text-xs font-mono text-slate-400 mb-2">shadow-md</div>
        <div className="text-sm text-slate-600">Balanced elevation for cards</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-100">
        <div className="text-xs font-mono text-slate-400 mb-2">shadow-lg</div>
        <div className="text-sm text-slate-600">Strong presence for modals</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-xl border border-slate-100">
        <div className="text-xs font-mono text-slate-400 mb-2">shadow-xl</div>
        <div className="text-sm text-slate-600">Maximum depth for focus</div>
      </div>
    </div>
  );
}

function GradientDemo() {
  return (
    <div className="space-y-4">
      <div className="h-20 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
        <span className="text-white font-medium text-sm">Linear Gradient</span>
      </div>
      <div className="h-20 rounded-lg bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
        <span className="text-white font-medium text-sm">Multi-stop Gradient</span>
      </div>
      <div className="h-20 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
        <span className="text-white font-medium text-sm">Cool Tones</span>
      </div>
      <div className="h-20 rounded-lg bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center">
        <span className="text-white font-medium text-sm">Natural Feel</span>
      </div>
    </div>
  );
}

function DesignTheoryA({ title, content }: Omit<DesignTheorySectionProps, 'variant'>) {
  return (
    <section className="min-h-[650px] p-8 border border-slate-200 rounded-lg bg-white">
      <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8 flex items-center">
        <div className="w-4 h-12 bg-indigo-500 mr-4 rounded-sm"></div>
        {title}
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">The Psychology of Depth</h3>
              <p className="text-slate-600 leading-relaxed">{content}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Visual Hierarchy</h3>
              <p className="text-slate-600 leading-relaxed">
                Shadows create a natural sense of depth and hierarchy. Elements with stronger shadows appear closer to the viewer, drawing attention and creating a clear visual flow.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Palette className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Color Theory</h3>
              <p className="text-slate-600 leading-relaxed">
                Gradients add visual interest and can convey emotion. Warm gradients suggest energy and passion, while cool gradients evoke trust and professionalism.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Layers className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Layered Design</h3>
              <p className="text-slate-600 leading-relaxed">
                Combining shadows with gradients creates a sophisticated layered effect that mimics real-world physics and enhances the user experience.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-slate-800 mb-4">Shadow Examples</h3>
            <ShadowDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

function DesignTheoryB({ title, content }: Omit<DesignTheorySectionProps, 'variant'>) {
  return (
    <section className="min-h-[650px] p-8 border border-slate-200 rounded-lg bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-4">{title}</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">{content}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            Shadow Depth Levels
          </h3>
          <ShadowDemo />
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-500" />
            Gradient Examples
          </h3>
          <GradientDemo />
        </div>
      </div>
    </section>
  );
}

function DesignTheoryC({ title, content }: Omit<DesignTheorySectionProps, 'variant'>) {
  return (
    <section className="min-h-[650px] p-8 border-2 border-slate-900 rounded-lg bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8 uppercase">{title}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="border-2 border-slate-900 rounded-lg p-6 bg-yellow-50">
            <h3 className="font-bold text-slate-900 uppercase tracking-wide mb-3">The Theory</h3>
            <p className="text-slate-700 leading-relaxed">{content}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-slate-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4" />
                <span className="font-bold text-sm uppercase">Depth</span>
              </div>
              <p className="text-sm text-slate-600">Creates visual hierarchy</p>
            </div>
            <div className="border-2 border-slate-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4" />
                <span className="font-bold text-sm uppercase">Focus</span>
              </div>
              <p className="text-sm text-slate-600">Directs user attention</p>
            </div>
            <div className="border-2 border-slate-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4" />
                <span className="font-bold text-sm uppercase">Emotion</span>
              </div>
              <p className="text-sm text-slate-600">Conveys brand feeling</p>
            </div>
            <div className="border-2 border-slate-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4" />
                <span className="font-bold text-sm uppercase">Layers</span>
              </div>
              <p className="text-sm text-slate-600">Adds sophistication</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="border-2 border-slate-900 rounded-lg p-4 bg-slate-50">
            <h3 className="font-bold text-slate-900 uppercase tracking-wide mb-4 text-center">Live Demo</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded shadow-sm border border-slate-200">
                <span className="text-xs font-mono text-slate-400">shadow-sm</span>
              </div>
              <div className="bg-white p-4 rounded shadow-lg border border-slate-200">
                <span className="text-xs font-mono text-slate-400">shadow-lg</span>
              </div>
              <div className="h-16 rounded bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">GRADIENT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
