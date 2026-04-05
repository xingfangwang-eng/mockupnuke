"use client";

import { Check, X, Minus, ArrowUpDown } from 'lucide-react';

interface ComparisonItem {
  feature: string;
  description: string;
  rawScreenshots: string;
  traditionalTools: string;
  mockupNuke: string;
}

interface TechnicalComparisonTableProps {
  title: string;
  subtitle?: string;
  items: ComparisonItem[];
  variant?: 'A' | 'B' | 'C';
}

export default function TechnicalComparisonTable({ 
  title, 
  subtitle,
  items, 
  variant = 'A' 
}: TechnicalComparisonTableProps) {
  if (variant === 'A') {
    return <ComparisonTableA title={title} subtitle={subtitle} items={items} />;
  } else if (variant === 'B') {
    return <ComparisonTableB title={title} subtitle={subtitle} items={items} />;
  } else {
    return <ComparisonTableC title={title} subtitle={subtitle} items={items} />;
  }
}

function ComparisonTableA({ title, subtitle, items }: Omit<TechnicalComparisonTableProps, 'variant'>) {
  return (
    <section className="min-h-[700px] p-8 border border-slate-200 rounded-lg bg-white overflow-x-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2 flex items-center">
          <div className="w-4 h-12 bg-indigo-500 mr-4 rounded-sm"></div>
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-slate-600 mt-4 ml-16">{subtitle}</p>
        )}
      </div>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="text-left py-4 px-4 font-bold text-slate-700 w-1/4">Feature</th>
            <th className="text-left py-4 px-4 font-bold text-slate-500 w-1/4 bg-slate-50">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                Raw Screenshots
              </div>
            </th>
            <th className="text-left py-4 px-4 font-bold text-slate-500 w-1/4 bg-slate-50">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                Traditional Tools
              </div>
            </th>
            <th className="text-left py-4 px-4 font-bold text-white w-1/4 bg-indigo-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                MockupNuke
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-5 px-4">
                <div className="font-semibold text-slate-800 mb-1">{item.feature}</div>
                <div className="text-sm text-slate-500">{item.description}</div>
              </td>
              <td className="py-5 px-4 bg-slate-50/50 text-slate-600 text-sm leading-relaxed">
                {item.rawScreenshots}
              </td>
              <td className="py-5 px-4 bg-slate-50/50 text-slate-600 text-sm leading-relaxed">
                {item.traditionalTools}
              </td>
              <td className="py-5 px-4 bg-indigo-50 text-indigo-900 font-medium text-sm leading-relaxed">
                {item.mockupNuke}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function ComparisonTableB({ title, subtitle, items }: Omit<TechnicalComparisonTableProps, 'variant'>) {
  return (
    <section className="min-h-[700px] p-8 border border-slate-200 rounded-lg bg-gradient-to-br from-slate-50 to-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-3">{title}</h2>
        {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-100 rounded-lg p-6">
          <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
            <X className="w-5 h-5 text-red-500" />
            Raw Screenshots
          </h3>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="pb-4 border-b border-slate-200 last:border-0">
                <div className="font-semibold text-slate-700 text-sm mb-1">{item.feature}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.rawScreenshots}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
            <Minus className="w-5 h-5 text-yellow-500" />
            Traditional Tools
          </h3>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="pb-4 border-b border-slate-100 last:border-0">
                <div className="font-semibold text-slate-700 text-sm mb-1">{item.feature}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.traditionalTools}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-indigo-600 text-white rounded-lg p-6 shadow-lg">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Check className="w-5 h-5" />
            MockupNuke
          </h3>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="pb-4 border-b border-indigo-500 last:border-0">
                <div className="font-semibold text-sm mb-1">{item.feature}</div>
                <p className="text-indigo-100 text-sm leading-relaxed">{item.mockupNuke}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTableC({ title, subtitle, items }: Omit<TechnicalComparisonTableProps, 'variant'>) {
  return (
    <section className="min-h-[700px] p-8 border-2 border-slate-900 rounded-lg bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">{title}</h2>
        {subtitle && <p className="text-lg text-slate-600 mt-3">{subtitle}</p>}
      </div>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="border-2 border-slate-900 rounded-lg overflow-hidden">
            <div className="bg-slate-900 text-white px-6 py-3">
              <span className="font-bold uppercase tracking-wide">{item.feature}</span>
            </div>
            <div className="p-6">
              <p className="text-slate-500 text-sm mb-4">{item.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <X className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-red-700 text-sm">Raw</span>
                  </div>
                  <p className="text-red-900 text-sm">{item.rawScreenshots}</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Minus className="w-4 h-4 text-yellow-600" />
                    <span className="font-bold text-yellow-700 text-sm">Traditional</span>
                  </div>
                  <p className="text-yellow-900 text-sm">{item.traditionalTools}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-green-700 text-sm">MockupNuke</span>
                  </div>
                  <p className="text-green-900 text-sm">{item.mockupNuke}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
