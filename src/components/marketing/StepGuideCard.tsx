"use client";

import { CheckCircle, Circle, ArrowRight, Clock, Zap, Target, Sparkles, Rocket } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  duration?: string;
}

interface StepGuideCardProps {
  title: string;
  subtitle?: string;
  steps: Step[];
  variant?: 'A' | 'B' | 'C';
}

const stepIcons = [Zap, Target, Sparkles, Rocket, CheckCircle];

export default function StepGuideCard({ 
  title, 
  subtitle,
  steps, 
  variant = 'A' 
}: StepGuideCardProps) {
  if (variant === 'A') {
    return <StepGuideA title={title} subtitle={subtitle} steps={steps} />;
  } else if (variant === 'B') {
    return <StepGuideB title={title} subtitle={subtitle} steps={steps} />;
  } else {
    return <StepGuideC title={title} subtitle={subtitle} steps={steps} />;
  }
}

function StepGuideA({ title, subtitle, steps }: Omit<StepGuideCardProps, 'variant'>) {
  return (
    <section className="min-h-[700px] p-8 border border-slate-200 rounded-lg bg-white">
      <div className="mb-10">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2 flex items-center">
          <div className="w-4 h-12 bg-indigo-500 mr-4 rounded-sm"></div>
          {title}
        </h2>
        {subtitle && <p className="text-lg text-slate-600 mt-4 ml-16">{subtitle}</p>}
      </div>
      
      <div className="relative ml-8">
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <div key={index} className="relative flex gap-6">
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-slate-800 text-lg">{step.title}</h3>
                        {step.duration && (
                          <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            <Clock className="w-3 h-3" />
                            {step.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StepGuideB({ title, subtitle, steps }: Omit<StepGuideCardProps, 'variant'>) {
  return (
    <section className="min-h-[700px] p-8 border border-slate-200 rounded-lg bg-gradient-to-br from-indigo-50 to-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-3">{title}</h2>
        {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <div 
                key={index} 
                className={`relative p-6 bg-white rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition-shadow ${
                  index === steps.length - 1 && steps.length % 2 !== 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-indigo-500" />
                      <h3 className="font-bold text-slate-800">{step.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                    {step.duration && (
                      <div className="mt-3 flex items-center gap-1 text-xs text-indigo-600 font-medium">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </div>
                    )}
                  </div>
                </div>
                
                {index < steps.length - 1 && index % 2 === 0 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StepGuideC({ title, subtitle, steps }: Omit<StepGuideCardProps, 'variant'>) {
  return (
    <section className="min-h-[700px] p-8 border-2 border-slate-900 rounded-lg bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
      <div className="mb-10">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">{title}</h2>
        {subtitle && <p className="text-lg text-slate-600 mt-3">{subtitle}</p>}
      </div>
      
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = stepIcons[index % stepIcons.length];
          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-2 border-slate-900 rounded-full flex items-center justify-center bg-yellow-100">
                  <span className="font-bold text-slate-900">{index + 1}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-slate-900 my-2"></div>
                )}
              </div>
              
              <div className="flex-1 pb-6">
                <div className="border-2 border-slate-900 rounded-lg p-5 bg-slate-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-slate-900" />
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide">{step.title}</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-3">{step.description}</p>
                  {step.duration && (
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 bg-yellow-200 px-2 py-1 rounded border border-slate-900">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
