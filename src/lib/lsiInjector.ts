// LSI 关键词注入器

const LSI_KEYWORDS = {
  saas: [
    'SaaS marketing',
    'Indie hacker tools',
    'UI/UX consistency',
    'High-fidelity export',
    'Product showcase',
    'Branding consistency',
    'Conversion optimization',
    'User engagement',
    'Marketing assets',
    'Visual storytelling',
    'Brand identity',
    'Product visualization',
    'Digital presence',
    'Design system',
    'User experience'
  ],
  design: [
    'Design psychology',
    'Visual hierarchy',
    'Color theory',
    'Typography system',
    'Layout composition',
    'Visual balance',
    'Design principles',
    'Aesthetic appeal',
    'Creative direction',
    'Visual consistency',
    'Design thinking',
    'User interface',
    'Visual elements',
    'Design language',
    'Brand guidelines'
  ],
  productivity: [
    'Time-saving tools',
    'Workflow optimization',
    'Design automation',
    'Batch processing',
    'Efficiency boost',
    'Productivity tools',
    'Workflow enhancement',
    'Time management',
    'Streamlined process',
    'Automation tools',
    'Work efficiency',
    'Process optimization',
    'Time-saving solutions',
    'Workflow automation',
    'Productivity hacks'
  ],
  social: [
    'Social media marketing',
    'Engagement metrics',
    'Viral content',
    'Social sharing',
    'Brand awareness',
    'Community building',
    'Social presence',
    'Content distribution',
    'Audience engagement',
    'Social media strategy',
    'Brand visibility',
    'Content marketing',
    'Social media growth',
    'Audience building',
    'Content engagement'
  ]
};

function categorizeKeyword(keyword: string): keyof typeof LSI_KEYWORDS {
  const lowerKeyword = keyword.toLowerCase();
  
  if (lowerKeyword.includes('social') || lowerKeyword.includes('twitter') || lowerKeyword.includes('share')) {
    return 'social';
  }
  if (lowerKeyword.includes('design') || lowerKeyword.includes('psychology') || lowerKeyword.includes('visual')) {
    return 'design';
  }
  if (lowerKeyword.includes('time') || lowerKeyword.includes('efficiency') || lowerKeyword.includes('automation')) {
    return 'productivity';
  }
  return 'saas';
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

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.randomInt(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  pickMultiple<T>(array: T[], count: number): T[] {
    const shuffled = this.shuffle(array);
    return shuffled.slice(0, Math.min(count, array.length));
  }
}

function splitTextIntoWords(text: string): string[] {
  return text.split(/\s+/);
}

function joinWords(words: string[]): string {
  return words.join(' ');
}

export function injectLSIKeywords(text: string, keyword: string): string {
  const category = categorizeKeyword(keyword);
  const seed = stringToHash(`${keyword}_${Date.now()}`);
  const rng = new SeededRandom(seed);
  
  const availableKeywords = LSI_KEYWORDS[category];
  const words = splitTextIntoWords(text);
  const totalWords = words.length;
  
  if (totalWords < 10) {
    return text;
  }
  
  const lsiCount = rng.randomInt(5, 8);
  const selectedLSI = rng.pickMultiple(availableKeywords, lsiCount);
  
  const insertionPoints = new Set<number>();
  while (insertionPoints.size < lsiCount) {
    const point = rng.randomInt(3, totalWords - 3);
    insertionPoints.add(point);
  }
  
  const sortedPoints = Array.from(insertionPoints).sort((a, b) => a - b);
  
  let result = [...words];
  let offset = 0;
  
  sortedPoints.forEach((point, index) => {
    const lsiKeyword = selectedLSI[index];
    const lsiWords = lsiKeyword.split(' ');
    result.splice(point + offset, 0, ...lsiWords);
    offset += lsiWords.length;
  });
  
  return joinWords(result);
}

export function generateLSICombination(keyword: string): string[] {
  const category = categorizeKeyword(keyword);
  const seed = stringToHash(keyword);
  const rng = new SeededRandom(seed);
  
  const availableKeywords = LSI_KEYWORDS[category];
  const count = rng.randomInt(5, 8);
  
  return rng.pickMultiple(availableKeywords, count);
}

export function getCategoryKeywords(category: keyof typeof LSI_KEYWORDS): string[] {
  return LSI_KEYWORDS[category];
}

export default injectLSIKeywords;
