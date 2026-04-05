// JSON-LD 生成器

import React from 'react';

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

function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  randomInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  pick<T>(array: T[]): T {
    return array[this.randomInt(0, array.length - 1)];
  }
}

const CATEGORIES = [
  'Screenshots',
  'Mockups',
  'Design',
  'Marketing',
  'Productivity',
  'Tools',
  'Visuals',
  'Graphics',
  'Content',
  'Branding'
];

export function generateHowToSchema(steps: string): any {
  const stepTexts = steps.split('. ').filter(step => step.trim().length > 0);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Create Professional Mockups',
    'description': 'Step-by-step guide to creating professional-looking mockups',
    'step': stepTexts.map((text, index) => ({
      '@type': 'HowToStep',
      'text': text.trim(),
      'name': `Step ${index + 1}`,
      'url': `#step-${index + 1}`
    }))
  };
}

export function generateFAQSchema(faqText: string): any {
  const faqItems = faqText.split('? ').filter(item => item.trim().length > 0);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map((item, index) => {
      const [question, ...answerParts] = item.split('. ');
      const answer = answerParts.join('. ');
      
      return {
        '@type': 'Question',
        'name': question.trim() + '?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': answer.trim()
        }
      };
    })
  };
}

export function generateSoftwareApplicationSchema(): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'MockupNuke',
    'applicationCategory': 'Productivity',
    'operatingSystem': 'All',
    'url': 'https://mockupnuke.com',
    'description': 'A tool to instantly beautify screenshots and create professional mockups',
    'featureList': [
      'One-click screenshot beautification',
      'Automatic shadow and gradient effects',
      'High-resolution export',
      'Batch processing',
      'Smart background detection',
      'Social media ready formats'
    ],
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '500'
    }
  };
}

export function generateBreadcrumbList(keyword: string, slug: string): any {
  const seed = stringToHash(slug);
  const rng = new SeededRandom(seed);
  
  const category = rng.pick(CATEGORIES);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://mockupnuke.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': category,
        'item': `https://mockupnuke.com/${category.toLowerCase()}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': keyword,
        'item': `https://mockupnuke.com/beautify/${slug}`
      }
    ]
  };
}

export function generateFullJsonLd(keyword: Keyword): string {
  const howToSchema = generateHowToSchema(keyword.step_by_step_guide);
  const faqSchema = generateFAQSchema(keyword.faq_deep_dive);
  const softwareSchema = generateSoftwareApplicationSchema();
  const breadcrumbSchema = generateBreadcrumbList(keyword.keyword, keyword.slug);
  
  const allSchemas = [howToSchema, faqSchema, softwareSchema, breadcrumbSchema];
  
  return allSchemas.map(schema => `
<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>
`).join('');
}

export function generateJsonLdScript(keyword: Keyword): string {
  return generateFullJsonLd(keyword);
}

export default generateFullJsonLd;
