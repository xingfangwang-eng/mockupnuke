"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface Keyword {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve?: string;
}

// 导入关键词数据
import keywordsData from '../../../data/keywords.json';

const keywords: Keyword[] = keywordsData;

// 智能分类逻辑
function categorizeKeywords(keywords: Keyword[]): Record<string, Keyword[]> {
  const categories: Record<string, Keyword[]> = {
    'Social Media & Marketing': [],
    'Design & Presentation': [],
    'Developer Tools': [],
    'Product Development': [],
    'General Solutions': []
  };

  keywords.forEach(keyword => {
    const lowerKeyword = keyword.keyword.toLowerCase();
    const lowerTitle = keyword.title.toLowerCase();
    const combinedText = `${lowerKeyword} ${lowerTitle}`;

    if (combinedText.includes('twitter') || combinedText.includes('social') || combinedText.includes('marketing') || combinedText.includes('post') || combinedText.includes('share')) {
      categories['Social Media & Marketing'].push(keyword);
    } else if (combinedText.includes('design') || combinedText.includes('presentation') || combinedText.includes('powerpoint') || combinedText.includes('slide') || combinedText.includes('pitch')) {
      categories['Design & Presentation'].push(keyword);
    } else if (combinedText.includes('dev') || combinedText.includes('code') || combinedText.includes('github') || combinedText.includes('vscode') || combinedText.includes('developer')) {
      categories['Developer Tools'].push(keyword);
    } else if (combinedText.includes('product') || combinedText.includes('app') || combinedText.includes('software') || combinedText.includes('saas') || combinedText.includes('feature')) {
      categories['Product Development'].push(keyword);
    } else {
      categories['General Solutions'].push(keyword);
    }
  });

  return categories;
}

// 生成 JSON-LD 结构化数据
function generateJsonLd() {
  const items = keywords.map((keyword, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: keyword.title,
    item: `https://mockupnuke.com/solutions/${keyword.slug}`
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MockupNuke Solutions',
    description: 'A collection of 100 solutions for screenshot beautification and mockup creation',
    itemListElement: items
  };
}

export default function SolutionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Record<string, Keyword[]>>(categorizeKeywords(keywords));
  const [filteredKeywords, setFilteredKeywords] = useState<Keyword[]>(keywords);

  // 处理搜索
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredKeywords(keywords);
      setCategories(categorizeKeywords(keywords));
    } else {
      const filtered = keywords.filter(keyword => 
        keyword.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        keyword.problem_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredKeywords(filtered);
      setCategories(categorizeKeywords(filtered));
    }
  }, [searchTerm]);

  // 切换分类展开/收起
  const toggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  // 生成 JSON-LD 脚本
  const jsonLd = generateJsonLd();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 页面内容 */}
      <div className="max-w-7xl mx-auto px-6 my-12">
        {/* 面包屑导航 */}
        <div className="mb-8 text-sm text-slate-500">
          <nav className="flex gap-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Solutions</span>
          </nav>
        </div>

        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6">
            MockupNuke Solutions
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Discover 100+ ways to transform your screenshots into professional, high-converting visuals instantly.
          </p>
        </div>

        {/* 吸顶搜索栏 */}
        <div className="sticky top-0 z-50 bg-white border border-slate-200 rounded-md p-4 mb-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-none focus:outline-none text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-slate-400 hover:text-slate-600"
              >
                <Filter className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* 分类导航 */}
        <nav className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {Object.keys(categories).map((category) => (
              <Link
                key={category}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="p-4 border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors text-center font-medium"
              >
                {category}
              </Link>
            ))}
          </div>
        </nav>

        {/* 分类内容 */}
        <div className="space-y-8">
          {Object.entries(categories).map(([category, items]) => {
            if (items.length === 0) return null;

            return (
              <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
                {/* 分类标题 */}
                <div
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between p-4 border border-slate-200 bg-white mb-4 cursor-pointer"
                >
                  <h2 className="text-2xl font-bold flex items-center">
                    <div className="w-1 h-8 bg-indigo-500 mr-4"></div>
                    {category} ({items.length})
                  </h2>
                  {activeCategory === category ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                {/* 分类内容 */}
                {(activeCategory === category || activeCategory === null) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <article
                        key={item.slug}
                        className="p-8 border border-slate-200 bg-white hover:border-blue-500 transition-colors"
                      >
                        <Link href={`/solutions/${item.slug}`} className="block">
                          <h3 className="text-lg font-bold text-slate-900 mb-4 hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-slate-600 mb-6 line-clamp-3">
                            {item.problem_description}
                          </p>
                          <div className="text-blue-600 font-medium flex items-center gap-1">
                            Learn more
                            <ChevronDown className="w-4 h-4 transform rotate-[-90deg]" />
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
