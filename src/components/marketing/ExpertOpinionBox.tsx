"use client";

import { Award, Star, Quote, ExternalLink, CheckCircle2 } from 'lucide-react';

interface ExpertOpinionBoxProps {
  title: string;
  content: string;
  expertName?: string;
  expertTitle?: string;
  tips?: string[];
  variant?: 'A' | 'B' | 'C';
}

export default function ExpertOpinionBox({ 
  title, 
  content, 
  expertName = "Industry Expert",
  expertTitle = "Senior Product Designer",
  tips,
  variant = 'A' 
}: ExpertOpinionBoxProps) {
  if (variant === 'A') {
    return <ExpertOpinionA title={title} content={content} expertName={expertName} expertTitle={expertTitle} tips={tips} />;
  } else if (variant === 'B') {
    return <ExpertOpinionB title={title} content={content} expertName={expertName} expertTitle={expertTitle} tips={tips} />;
  } else {
    return <ExpertOpinionC title={title} content={content} expertName={expertName} expertTitle={expertTitle} tips={tips} />;
  }
}

function ExpertOpinionA({ title, content, expertName = "Industry Expert", expertTitle = "Senior Product Designer", tips }: Omit<ExpertOpinionBoxProps, 'variant'>) {
  return (
    <section className="min-h-[500px] p-8 border border-slate-200 rounded-lg bg-gradient-to-br from-indigo-50 to-white">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">{title}</h2>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <Quote className="w-6 h-6 text-indigo-300 flex-shrink-0" />
              <p className="text-slate-700 leading-relaxed text-lg">{content}</p>
            </div>
          </div>
          
          {tips && tips.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Pro Tips
              </h3>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt={expertName} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load: https://randomuser.me/api/portraits/men/32.jpg', e);
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNNiA0aDIgMjYtMiAyek02IDl2MjptMCA1aDJ2LTJoLTJ6IiBzdHJva2U9IiNmNGY0ZjQiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==';
                }}
              />
            </div>
            <div>
              <div className="font-semibold text-slate-800">{expertName}</div>
              <div className="text-sm text-slate-500">{expertTitle}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpertOpinionB({ title, content, expertName = "Industry Expert", expertTitle = "Senior Product Designer", tips }: Omit<ExpertOpinionBoxProps, 'variant'>) {
  return (
    <section className="min-h-[500px] border border-slate-200 rounded-lg bg-white overflow-hidden">
      <div className="bg-indigo-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Award className="w-8 h-8 text-white" />
            <h2 className="text-2xl font-black tracking-tight text-white">{title}</h2>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-slate-700 leading-relaxed">{content}</p>
        </div>
        
        {tips && tips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {tips.map((tip, index) => (
              <div key={index} className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-indigo-900">Tip {index + 1}</span>
                </div>
                <p className="text-sm text-indigo-800 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="font-bold text-white">{expertName.charAt(0)}</span>
            </div>
            <div>
              <div className="font-bold text-slate-800">{expertName}</div>
              <div className="text-sm text-slate-500">{expertTitle}</div>
            </div>
          </div>
          <a href="#" className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
            View Profile
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ExpertOpinionC({ title, content, expertName = "Industry Expert", expertTitle = "Senior Product Designer", tips }: Omit<ExpertOpinionBoxProps, 'variant'>) {
  return (
    <section className="min-h-[500px] border-2 border-slate-900 rounded-lg bg-yellow-50 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 border-2 border-slate-900 bg-yellow-200 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">{title}</h2>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
              <span className="text-sm text-slate-600 ml-2">Expert Verified</span>
            </div>
          </div>
        </div>
        
        <div className="border-2 border-slate-900 rounded-lg p-6 bg-white mb-6">
          <p className="text-slate-700 leading-relaxed text-lg">{content}</p>
        </div>
        
        {tips && tips.length > 0 && (
          <div className="space-y-4 mb-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border-2 border-slate-900 rounded-lg bg-white">
                <span className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <p className="text-slate-700 leading-relaxed pt-1">{tip}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-4 pt-4 border-t-2 border-slate-900">
          <div className="w-10 h-10 border-2 border-slate-900 rounded-full overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt={expertName} 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image failed to load: https://randomuser.me/api/portraits/women/44.jpg', e);
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNNiA0aDIgMjYtMiAyek02IDl2MjptMCA1aDJ2LTJoLTJ6IiBzdHJva2U9IiNmNGY0ZjQiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==';
              }}
            />
          </div>
          <div>
            <div className="font-bold text-slate-900">{expertName}</div>
            <div className="text-sm text-slate-600">{expertTitle}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
