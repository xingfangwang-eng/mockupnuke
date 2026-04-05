"use client";

import { X, MessageCircle, AlertCircle } from 'lucide-react';

interface ProblemDeepDiveProps {
  variant?: 'A' | 'B' | 'C';
}

export default function ProblemDeepDive({ variant = 'A' }: ProblemDeepDiveProps) {
  if (variant === 'A') {
    return <ProblemDeepDiveA />;
  } else if (variant === 'B') {
    return <ProblemDeepDiveB />;
  } else {
    return <ProblemDeepDiveC />;
  }
}

function ProblemDeepDiveA() {
  const problems = [
    'Spending hours in Photoshop for simple mockups',
    'Inconsistent branding across social media posts',
    'No design skills but need professional visuals',
    'Expensive design tools with steep learning curves',
    'Wasting time on repetitive formatting tasks',
  ];

  return (
    <section className="bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-12 text-center">
          Common Pain Points
        </h2>
        
        <ul className="space-y-4">
          {problems.map((problem, index) => (
            <li key={index} className="flex items-start gap-4 bg-white border border-slate-200 p-6">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <span className="text-lg text-slate-700">{problem}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProblemDeepDiveB() {
  return (
    <article className="bg-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-4xl font-black tracking-tighter text-slate-900 mb-8">
          The Story Behind MockupNuke
        </h3>
        
        <div className="prose prose-lg text-slate-600 leading-relaxed space-y-6">
          <p>
            Last month, I spent 4 hours creating mockups for a product launch. Four hours of opening Photoshop, 
            adjusting layers, exporting images, and repeating the same steps over and over. By the time I finished, 
            I realized I had wasted an entire afternoon on something that should have taken minutes.
          </p>
          
          <p>
            I looked at my Twitter feed and saw developers posting beautiful screenshots with perfect gradients, 
            elegant shadows, and professional framing. How were they doing this so quickly? The answer: they 
            weren't. They were spending hours just like me, or worse, hiring designers for simple tasks.
          </p>
          
          <p>
            That's when I decided to build MockupNuke. A tool that takes your raw screenshot and transforms 
            it into a professional mockup in under 2 seconds. No design skills required. No expensive software. 
            Just paste, transform, and share.
          </p>
        </div>
      </div>
    </article>
  );
}

function ProblemDeepDiveC() {
  const complaints = [
    {
      platform: 'X',
      username: '@frustrated_dev',
      content: "Why does creating a simple screenshot mockup take 30 minutes? I just want to show my app, not become a Photoshop expert 😤",
      time: '2h',
    },
    {
      platform: 'Reddit',
      username: 'u/design_hater',
      content: "Spent $50/month on Canva Pro just to make my screenshots look decent. There has to be a better way...",
      time: '5h',
    },
    {
      platform: 'X',
      username: '@startup_founder',
      content: "Hired a designer on Fiverr for mockups. Took 3 days and cost $100. For. A. Screenshot. 🤦‍♂️",
      time: '8h',
    },
  ];

  return (
    <div className="bg-slate-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h4 className="text-4xl font-black tracking-tighter text-slate-900 mb-12 text-center">
          What Developers Are Saying
        </h4>
        
        <div className="space-y-6">
          {complaints.map((complaint, index) => (
            <div key={index} className="bg-white border border-slate-200 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  {complaint.platform === 'X' ? (
                    <X className="w-5 h-5 text-slate-600" />
                  ) : (
                    <MessageCircle className="w-5 h-5 text-slate-600" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{complaint.username}</p>
                  <p className="text-sm text-slate-500">{complaint.time}</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">{complaint.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
