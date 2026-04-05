// lib/contentGenerator.ts

interface ContentData {
  title: string;
  problem_description: string;
  how_to_solve: string;
}

interface GeneratedContent {
  title: string;
  problem_description: string;
  meta_description: string;
}

// 前置词库
const prefixes = [
  "Finally, ",
  "Looking for ",
  "The best way to ",
  "Stop wasting time: ",
  "Discover how to ",
  "Tired of ",
  "Need a better way to ",
  "Want to ",
  "Learn how to ",
  "Looking to "
];

// 后置词库
const suffixes = [
  " in 2026.",
  " for busy founders.",
  " instantly.",
  " without design skills.",
  " for your startup.",
  " in minutes.",
  " like a pro.",
  " without Photoshop.",
  " for social media.",
  " for your portfolio."
];

// LSI 关键词库
const lsiKeywords = [
  "SaaS visuals",
  "Twitter growth",
  "UI design",
  "product marketing",
  "social media engagement",
  "professional screenshots",
  "mockup generator",
  "design automation",
  "time-saving tools",
  "developer productivity",
  "startup growth",
  "branding consistency",
  "visual content",
  "online presence",
  "digital marketing"
];

// 基于 seed 的伪随机数生成器
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

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.randomInt(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

// 生成随机 seed
function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// 渲染富文本，插入 LSI 关键词
function renderRichText(text: string, seed: number): string {
  const rng = new SeededRandom(seed);
  const keywordCount = rng.randomInt(2, 3);
  const selectedKeywords = rng.shuffle(lsiKeywords).slice(0, keywordCount);
  
  let result = text;
  
  // 随机插入关键词
  selectedKeywords.forEach(keyword => {
    const words = result.split(' ');
    const insertionPoint = rng.randomInt(1, words.length - 1);
    words.splice(insertionPoint, 0, keyword);
    result = words.join(' ');
  });
  
  return result;
}

// 生成内容
export function generateContent(data: ContentData, slug: string): GeneratedContent {
  const seed = stringToHash(slug);
  const rng = new SeededRandom(seed);
  
  // 生成标题
  const titlePrefix = rng.pick(prefixes);
  const titleSuffix = rng.pick(suffixes);
  const title = titlePrefix + data.title + titleSuffix;
  
  // 生成问题描述
  const problemPrefix = rng.pick(prefixes);
  const problemSuffix = rng.pick(suffixes);
  const problem_description = renderRichText(
    problemPrefix + data.problem_description + problemSuffix,
    seed
  );
  
  // 生成 meta description
  let meta_description = data.how_to_solve.substring(0, 150);
  
  // 确保长度在 140-160 之间
  const targetLength = rng.randomInt(140, 160);
  if (meta_description.length < targetLength) {
    // 添加一些额外的描述
    const extraText = " Our tool makes it easy and fast.";
    while (meta_description.length + extraText.length < targetLength) {
      meta_description += extraText;
    }
    meta_description = meta_description.substring(0, targetLength);
  } else if (meta_description.length > targetLength) {
    meta_description = meta_description.substring(0, targetLength);
  }
  
  // 确保以句号结尾
  if (!meta_description.endsWith('.')) {
    meta_description += '.';
  }
  
  return {
    title,
    problem_description,
    meta_description
  };
}

export default generateContent;
