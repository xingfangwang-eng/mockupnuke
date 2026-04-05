import { Metadata } from 'next';
import keywords from '../../../../data/keywords-filled.json';
import { generateConfig } from '../../../lib/shuffler';
import { generateContent } from '../../../lib/contentGenerator';
import { generateJsonLdScript } from '../../../lib/jsonLdGenerator';
import HeroSection from '../../../components/marketing/HeroSection';
import ProblemDeepDive from '../../../components/marketing/ProblemDeepDive';
import FeatureShowcase from '../../../components/marketing/FeatureShowcase';
import CTASection from '../../../components/marketing/CTASection';
import { Star } from 'lucide-react';

interface Keyword {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
  long_intro: string;
  technical_debt_analysis: string;
  design_psychology: string;
  step_by_step_guide: string;
  industry_comparison: string;
  faq_deep_dive: string;
  expert_tips: string;
}

// 评论语料库
const commentCorpus = [
  "This tool saved me so much time! The mockups look professional and polished.",
  "I've tried many mockup tools, but this one is by far the easiest to use.",
  "The results are stunning. My screenshots now look like they were designed by a pro.",
  "Game-changer for my social media posts. Highly recommended!",
  "Fast, simple, and effective. Exactly what I needed for my startup.",
  "The background presets are amazing. My mockups look consistent and on-brand.",
  "I love how easy it is to create professional-looking screenshots in seconds.",
  "This tool has completely transformed how I present my app to potential users.",
  "The quality of the output is exceptional. Worth every penny!",
  "Finally, a tool that doesn't require design skills to create beautiful mockups.",
  "The download quality is incredible. No more blurry screenshots!",
  "I use this tool for all my client projects now. It's that good.",
  "The interface is clean and intuitive. Even my intern can use it.",
  "This has become an essential part of my workflow. Can't imagine working without it.",
  "The social media sharing feature is a nice touch. Makes promotion easy.",
  "I was skeptical at first, but this tool delivered beyond my expectations.",
  "The batch processing feature is a lifesaver for multiple screenshots.",
  "My conversion rates have improved since I started using these professional mockups.",
  "Customer support is responsive and helpful. Great company all around.",
  "This tool is a must-have for any SaaS founder or product manager."
];

// 生成随机日期（近30天内）
function generateRandomDate() {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  const randomDate = new Date(
    thirtyDaysAgo.getTime() + Math.random() * (today.getTime() - thirtyDaysAgo.getTime())
  );
  
  return randomDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 生成随机评分
function generateRandomRating() {
  const rating = Math.random() > 0.5 ? 4.9 : 4.8;
  const count = Math.floor(Math.random() * 401) + 100; // 100-500
  return { rating, count };
}

// 生成随机评论
function generateRandomComments(count: number = 3) {
  const shuffled = [...commentCorpus].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 生成相关搜索
function generateRelatedSearches(keyword: string, count: number = 3) {
  const baseKeywords = [
    "professional mockups",
    "screenshot editor",
    "app mockup generator",
    "social media visuals",
    "product marketing",
    "design automation",
    "time-saving tools",
    "startup growth"
  ];
  
  const shuffled = [...baseKeywords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((kw) => `${keyword} ${kw}`);
}

// 不生成静态参数，使用动态生成
export async function generateStaticParams() {
  return [];
}

// 生成元数据
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const keyword = keywords.find((k: Keyword) => k.slug === slug);
  if (!keyword) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
  
  const generatedContent = generateContent(
    {
      title: keyword.title,
      problem_description: keyword.problem_description,
      how_to_solve: keyword.how_to_solve,
    },
    keyword.slug
  );
  
  return {
    title: generatedContent.title,
    description: generatedContent.meta_description,
  };
}

// 生成随机推荐链接
function generateRandomRecommendations(currentSlug: string, count: number = 4) {
  const filteredKeywords = keywords.filter((k: Keyword) => k.slug !== currentSlug);
  const shuffled = [...filteredKeywords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default async function BeautifyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const keyword = keywords.find((k: Keyword) => k.slug === slug);
  
  if (!keyword) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-8">Page Not Found</h1>
          <p className="text-lg text-slate-600">The requested page could not be found.</p>
        </div>
      </div>
    );
  }
  
  // 生成配置和内容
  const config = generateConfig(slug);
  const generatedContent = generateContent(
    {
      title: keyword.title,
      problem_description: keyword.problem_description,
      how_to_solve: keyword.how_to_solve,
    },
    slug
  );
  
  // 生成推荐链接
  const recommendations = generateRandomRecommendations(slug);
  
  // 渲染组件
  const renderComponent = (componentName: string) => {
    switch (componentName) {
      case 'HeroSection':
        return (
          <HeroSection
            variant={config.componentVariants.HeroSection}
          />
        );
      case 'ProblemDeepDive':
        return (
          <div className="p-8 border border-slate-200 rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <div className="w-4 h-12 bg-indigo-500 mr-4 rounded-sm"></div>
              The Problem
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-600 mb-6">{keyword.long_intro}</p>
              <p className="text-lg text-slate-600 mb-6">{generatedContent.problem_description}</p>
              <h3 className="text-xl font-bold mb-4">Technical Debt Analysis</h3>
              <p className="text-lg text-slate-600 mb-6">{keyword.technical_debt_analysis}</p>
            </div>
          </div>
        );
      case 'FeatureShowcase':
        return (
          <div className="p-8 border border-slate-200 rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <div className="w-4 h-12 bg-indigo-500 mr-4 rounded-sm"></div>
              The Solution
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-600 mb-6">{keyword.how_to_solve}</p>
              <h3 className="text-xl font-bold mb-4">Design Psychology</h3>
              <p className="text-lg text-slate-600 mb-6">{keyword.design_psychology}</p>
              <h3 className="text-xl font-bold mb-4">Step-by-Step Guide</h3>
              <p className="text-lg text-slate-600 mb-6">{keyword.step_by_step_guide}</p>
              <h3 className="text-xl font-bold mb-4">Industry Comparison</h3>
              <p className="text-lg text-slate-600 mb-6">{keyword.industry_comparison}</p>
            </div>
          </div>
        );
      case 'CTASection':
        return (
          <div className="p-8 border border-slate-200 rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <div className="w-4 h-12 bg-indigo-500 mr-4 rounded-sm"></div>
              Expert Insights
            </h2>
            <div className="prose prose-lg max-w-none">
              <h3 className="text-xl font-bold mb-4">FAQ Deep Dive</h3>
              <p className="text-lg text-slate-600 mb-6">{keyword.faq_deep_dive}</p>
              <h3 className="text-xl font-bold mb-4">Expert Tips</h3>
              <p className="text-lg text-slate-600 mb-6">{keyword.expert_tips}</p>
              <div className="mt-8">
                <a 
                  href="/" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-all active:scale-95"
                >
                  Try MockupNuke Now
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  // 生成人工痕迹数据
  const lastUpdated = generateRandomDate();
  const { rating, count } = generateRandomRating();
  const comments = generateRandomComments(Math.floor(Math.random() * 2) + 2); // 2-3条评论
  const relatedSearches = generateRelatedSearches(keyword.keyword);
  
  return (
    <div className={`min-h-screen bg-slate-50 font-${config.fontStyle.toLowerCase()}`}>
      <div dangerouslySetInnerHTML={{ __html: generateJsonLdScript(keyword) }} />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 相关搜索面包屑 */}
        <div className="mb-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <a href="/" className="hover:text-indigo-500">Home</a>
            <span>/</span>
            <a href="/solutions" className="hover:text-indigo-500">Solutions</a>
            <span>/</span>
            <span className="text-slate-700 font-medium">{keyword.title}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {relatedSearches.map((search, index) => (
              <span key={index} className="px-3 py-1 bg-slate-100 rounded-full text-xs">
                {search}
              </span>
            ))}
          </div>
        </div>
        
        {/* 动态渲染组件 */}
        {config.layoutOrder.map((component, index) => (
          <div key={component} className={`my-16 ${index === 0 ? 'mt-0' : ''} ${index === config.layoutOrder.length - 1 ? 'mb-0' : ''}`}>
            {renderComponent(component)}
          </div>
        ))}
        
        {/* 评分和更新日期 */}
        <div className="mt-16 p-8 border border-slate-200 rounded-lg bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 5 ? 'text-yellow-400' : 'text-slate-300'}`}
                    fill={i < 5 ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <div>
                <div className="font-bold text-lg">{rating}</div>
                <div className="text-sm text-slate-500">{count} reviews</div>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              Last updated: {lastUpdated}
            </div>
          </div>
        </div>
        
        {/* 评论区 */}
        <div className="mt-16 p-8 border border-slate-200 rounded-lg bg-white">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <div className="w-4 h-12 bg-indigo-500 mr-4 rounded-sm"></div>
            User Reviews
          </h2>
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <div key={index} className="p-6 border border-slate-100 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`} 
                      alt={`User ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold">User {index + 1}</div>
                    <div className="text-sm text-slate-500">{generateRandomDate()}</div>
                  </div>
                </div>
                <p className="text-slate-600">{comment}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* 推荐链接 */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <div className="w-4 h-12 bg-indigo-500 mr-4 rounded-sm"></div>
            Related Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <a
                key={rec.slug}
                href={`/beautify/${rec.slug}`}
                className="block p-6 border border-slate-200 rounded-lg hover:border-indigo-300 transition-all"
              >
                <h3 className="font-bold text-lg mb-2 text-slate-900">{rec.title}</h3>
                <p className="text-slate-600 text-sm">{rec.problem_description.substring(0, 80) + '...'}</p>
              </a>
            ))}
          </div>
        </div>
        
        {/* 页脚 */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          <p>© 2026 MockupNuke. All rights reserved.</p>
          <p className="mt-2">Support: 457239850@qq.com</p>
        </div>
      </div>
    </div>
  );
}
