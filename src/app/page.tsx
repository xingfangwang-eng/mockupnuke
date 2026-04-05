"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Upload } from 'lucide-react';

const backgroundPresets = [
  {
    name: 'Sunset',
    gradient: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    colors: [[99, 102, 241], [168, 85, 247], [236, 72, 153]],
  },
  {
    name: 'Ocean',
    gradient: 'bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500',
    colors: [[6, 182, 212], [59, 130, 246], [99, 102, 241]],
  },
  {
    name: 'Forest',
    gradient: 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500',
    colors: [[34, 197, 94], [16, 185, 129], [20, 184, 166]],
  },
  {
    name: 'Sunrise',
    gradient: 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-500',
    colors: [[249, 115, 22], [239, 68, 68], [236, 72, 153]],
  },
  {
    name: 'Midnight',
    gradient: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black',
    colors: [[30, 41, 59], [15, 23, 42], [0, 0, 0]],
  },
];

function colorDistance(c1: number[], c2: number[]): number {
  return Math.sqrt(
    Math.pow(c1[0] - c2[0], 2) +
    Math.pow(c1[1] - c2[1], 2) +
    Math.pow(c1[2] - c2[2], 2)
  );
}

function analyzeImageColor(imageUrl: string): Promise<number[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve([128, 128, 128]);
        return;
      }
      
      canvas.width = 1;
      canvas.height = 1;
      ctx.drawImage(img, 0, 0, 1, 1);
      
      const pixel = ctx.getImageData(0, 0, 1, 1).data;
      resolve([pixel[0], pixel[1], pixel[2]]);
    };
    img.onerror = () => resolve([128, 128, 128]);
    img.src = imageUrl;
  });
}

function findClosestPreset(color: number[]): number {
  let minDistance = Infinity;
  let closestIndex = 0;
  
  backgroundPresets.forEach((preset, index) => {
    const avgColor = preset.colors[0];
    const distance = colorDistance(color, avgColor);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });
  
  return closestIndex;
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [currentBg, setCurrentBg] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageLoad = useCallback(async (imageUrl: string) => {
    setImage(imageUrl);
    const dominantColor = await analyzeImageColor(imageUrl);
    const closestPreset = findClosestPreset(dominantColor);
    setCurrentBg(closestPreset);
  }, []);

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') === 0) {
          const blob = items[i].getAsFile();
          if (blob) {
            const url = URL.createObjectURL(blob);
            handleImageLoad(url);
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleImageLoad]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      handleImageLoad(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      handleImageLoad(url);
    }
  };

  const handleDownload = async () => {
    if (!exportRef.current) return;

    setIsFlashing(true);

    setTimeout(async () => {
      try {
        const dataUrl = await toPng(exportRef.current!, {
          pixelRatio: 3,
          quality: 1,
        });

        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `MockupNuke_${timestamp}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Export failed:', error);
      } finally {
        setIsFlashing(false);
      }
    }, 200);
  };

  const handleShareToTwitter = () => {
    const text = "Just created a beautiful mockup with MockupNuke! 🎨✨";
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-8">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Logo */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">MockupNuke</h1>
          <p className="mt-2 text-sm text-slate-500">We provide perfection by default. No adjustments needed.</p>
        </div>

        {/* Canvas Area */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div 
            ref={exportRef}
            id="export-container" 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !image && fileInputRef.current?.click()}
            className={`relative w-full max-w-4xl aspect-video ${backgroundPresets[currentBg].gradient} rounded-lg border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden cursor-pointer transition-all ${
              isDragging ? 'ring-4 ring-indigo-400 ring-opacity-50' : ''
            }`}
          >
            <AnimatePresence>
              {isFlashing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0 bg-white z-50"
                />
              )}
            </AnimatePresence>
            {image ? (
              <div className="relative max-w-[85%] max-h-[85%]">
                {/* Mac Window Controls */}
                <div className="absolute top-3 left-3 flex gap-2 z-10">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <img 
                  src={image} 
                  alt="Pasted screenshot" 
                  className="max-w-full max-h-full object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI0MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMTIwIDgwQzE1Ni4yNSA4MCAxODAgNTYuMjUgMTgwIDIwQzE4MCA4My43NSAxNTYuMjUgMTEwIDEyMCAxMTBDODMuNzUgMTEwIDYwIDgzLjc1IDYwIDIwQzYwIDU2LjI1IDgzLjc1IDgwIDEyMCA4MHoiIHN0cm9rZT0iI2YzZjNmMyIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+';
                  }}
                />
              </div>
            ) : (
              <div className="text-center text-white p-8">
                <Upload className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <p className="text-lg sm:text-xl font-medium mb-2">Paste or Drag screenshot here</p>
                <p className="text-sm opacity-80">or tap to upload</p>
              </div>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Controls */}
        <div className="space-y-4">
          {/* Background Preset Buttons */}
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            {backgroundPresets.map((preset, index) => (
              <button
                key={preset.name}
                onClick={() => setCurrentBg(index)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  currentBg === index
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          {image && (
            <div className="flex justify-center items-center gap-3 flex-wrap">
              <button
                onClick={handleDownload}
                disabled={isFlashing}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-indigo-500 text-white rounded-lg font-medium shadow-md hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={18} />
                Download
              </button>
              
              <button
                onClick={handleShareToTwitter}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-black text-white rounded-lg font-medium shadow-md hover:bg-gray-800 transition-all"
              >
                <X size={18} />
                Share to X
              </button>
            </div>
          )}

          {/* Additional Buttons */}
          <div className="flex justify-center items-center gap-3 flex-wrap mt-4">
            <a
              href="/solutions"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium shadow-sm hover:border-blue-500 hover:shadow-md transition-all"
            >
              <span>Explore Solutions</span>
            </a>
            
            <a
              href="https://paypal.me/xingfangwang?country.x=CN&locale.x=en_US"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-yellow-500 text-white rounded-lg font-medium shadow-md hover:bg-yellow-600 transition-all"
            >
              <span>Buy Me a Coffee</span>
            </a>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h2 className="text-sm font-medium text-slate-500 mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <a href="/solutions/make-app-screenshots-pro-twitter" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Professional Twitter Screenshots</a>
            <a href="/solutions/canva-too-slow-for-mockups" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Fast Mockups</a>
            <a href="/solutions/add-mac-browser-frame-online" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Mac Browser Frames</a>
            <a href="/solutions/fix-blurry-linkedin-screenshots" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">LinkedIn Optimization</a>
            <a href="/solutions/fastest-screenshot-beautifier-product-hunt" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Product Hunt Ready</a>
            <a href="/solutions/screenshot-to-mockup-one-click" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">One-Click Mockups</a>
            <a href="/solutions/cleanshot-alternative-for-windows" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Windows Alternative</a>
            <a href="/solutions/website-screenshot-apple-style" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Apple Style</a>
            <a href="/solutions/one-second-screenshot-wrapper-devs" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Developer Friendly</a>
            <a href="/solutions/high-res-mockup-no-login" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">No Login Required</a>
            <a href="/solutions/convert-screen-capture-to-marketing-asset" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Marketing Assets</a>
            <a href="/solutions/best-screenshot-tool-saas-landing-page" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">SaaS Landing Pages</a>
            <a href="/solutions/wrap-screenshot-aesthetic-frame" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Aesthetic Frames</a>
            <a href="/solutions/screenshot-4k-gradient-background" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">4K Gradients</a>
            <a href="/solutions/add-pro-shadow-to-screenshot" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">Professional Shadows</a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-400">
          <p>Made with ❤️ for beautiful screenshots</p>
          <p className="mt-2">Support: 457239850@qq.com</p>
        </div>
      </div>
    </div>
  );
}
