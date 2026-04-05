"use client";

import { Quote, List, CheckCircle2 } from 'lucide-react';

interface RichTextArticleProps {
  title: string;
  content: string;
  pullQuote?: string;
  listItems?: string[];
  variant?: 'A' | 'B' | 'C';
}

export default function RichTextArticle({ 
  title, 
  content, 
  pullQuote, 
  listItems,
  variant = 'A' 
}: RichTextArticleProps) {
  if (variant === 'A') {
    return <RichTextArticleA title={title} content={content} pullQuote={pullQuote} listItems={listItems} />;
  } else if (variant === 'B') {
    return <RichTextArticleB title={title} content={content} pullQuote={pullQuote} listItems={listItems} />;
  } else {
    return <RichTextArticleC title={title} content={content} pullQuote={pullQuote} listItems={listItems} />;
  }
}

function DropCapText({ text }: { text: string }) {
  if (!text || text.length === 0) return null;
  
  const firstLetter = text.charAt(0);
  const restOfText = text.slice(1);
  
  return (
    <p className="text-lg text-slate-600 leading-relaxed mb-6">
      <span className="float-left text-7xl font-bold text-indigo-600 mr-3 mt-1 leading-none">
        {firstLetter}
      </span>
      {restOfText}
    </p>
  );
}

function RichTextArticleA({ title, content, pullQuote, listItems }: Omit<RichTextArticleProps, 'variant'>) {
  return (
    <article className="min-h-[600px] p-8 border border-slate-200 rounded-lg bg-white">
      <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8 flex items-center">
        <div className="w-4 h-12 bg-indigo-500 mr-4 rounded-sm"></div>
        {title}
      </h2>
      
      <div className="prose prose-lg max-w-none">
        <DropCapText text={content} />
        
        {pullQuote && (
          <div className="my-12 py-8 px-6 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-indigo-400 flex-shrink-0 mt-1" />
              <blockquote className="text-xl text-indigo-900 font-medium italic leading-relaxed">
                {pullQuote}
              </blockquote>
            </div>
          </div>
        )}
        
        {listItems && listItems.length > 0 && (
          <div className="my-10">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <List className="w-5 h-5 text-indigo-500" />
              Key Takeaways
            </h3>
            <ul className="space-y-4">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

function RichTextArticleB({ title, content, pullQuote, listItems }: Omit<RichTextArticleProps, 'variant'>) {
  return (
    <article className="min-h-[600px] p-8 border border-slate-200 rounded-lg bg-gradient-to-br from-white to-slate-50">
      <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8 text-center">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="prose prose-lg max-w-none">
            <DropCapText text={content} />
            
            {listItems && listItems.length > 0 && (
              <div className="my-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Important Points</h3>
                <ol className="list-decimal list-inside space-y-3 text-slate-600">
                  {listItems.map((item, index) => (
                    <li key={index} className="leading-relaxed pl-2">{item}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {pullQuote && (
            <div className="sticky top-8 p-6 bg-indigo-600 text-white rounded-lg shadow-lg">
              <Quote className="w-10 h-10 mb-4 opacity-50" />
              <blockquote className="text-lg font-medium leading-relaxed italic">
                {pullQuote}
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function RichTextArticleC({ title, content, pullQuote, listItems }: Omit<RichTextArticleProps, 'variant'>) {
  return (
    <article className="min-h-[600px] p-8 border-2 border-slate-900 rounded-lg bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8 uppercase">
        {title}
      </h2>
      
      <div className="prose prose-lg max-w-none">
        <DropCapText text={content} />
        
        {pullQuote && (
          <div className="my-10 p-6 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Quote className="w-6 h-6 text-yellow-600" />
              <span className="font-bold text-yellow-800 uppercase text-sm tracking-wide">Featured Quote</span>
            </div>
            <blockquote className="text-lg text-yellow-900 font-medium leading-relaxed">
              {pullQuote}
            </blockquote>
          </div>
        )}
        
        {listItems && listItems.length > 0 && (
          <div className="my-10 p-6 bg-slate-100 rounded-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-wide">
              Summary Points
            </h3>
            <ul className="space-y-3">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700">
                  <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
