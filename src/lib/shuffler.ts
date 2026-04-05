interface ShufflerConfig {
  layoutOrder: string[];
  themeColor: string;
  componentVariants: {
    HeroSection: 'A' | 'B' | 'C';
    ProblemDeepDive: 'A' | 'B' | 'C';
    FeatureShowcase: 'A' | 'B' | 'C';
    CTASection: 'A' | 'B' | 'C';
    RichTextArticle: 'A' | 'B' | 'C';
    TechnicalComparisonTable: 'A' | 'B' | 'C';
    DesignTheorySection: 'A' | 'B' | 'C';
    StepGuideCard: 'A' | 'B' | 'C';
    ExpertOpinionBox: 'A' | 'B' | 'C';
  };
  fontStyle: 'Sans' | 'Serif' | 'Mono';
  narrativePath: 'A' | 'B' | 'C';
  mockupPosition: 2 | 4;
  headingDowngrades: string[];
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

  pick<T>(array: T[]): T {
    return array[this.randomInt(0, array.length - 1)];
  }

  pickMultiple<T>(array: T[], count: number): T[] {
    const shuffled = this.shuffle(array);
    return shuffled.slice(0, Math.min(count, array.length));
  }
}

const NARRATIVE_PATHS = {
  A: ['RichTextArticle', 'StepGuideCard', 'TechnicalComparisonTable', 'ExpertOpinionBox'],
  B: ['DesignTheorySection', 'RichTextArticle', 'TechnicalComparisonTable', 'ExpertOpinionBox'],
  C: ['TechnicalComparisonTable', 'DesignTheorySection', 'StepGuideCard', 'ExpertOpinionBox']
};

const PATH_LABELS: Record<'A' | 'B' | 'C', string> = {
  A: 'Educational',
  B: 'Psychological',
  C: 'Tool-focused'
};

export function generateConfig(slug: string): ShufflerConfig {
  const seed = stringToHash(slug);
  const rng = new SeededRandom(seed);

  const baseComponents = ['HeroSection', 'ProblemDeepDive', 'FeatureShowcase', 'CTASection'];
  const layoutOrder = rng.shuffle(baseComponents);

  const themeColors = [
    'from-indigo-500 via-purple-500 to-pink-500',
    'from-cyan-500 via-blue-500 to-indigo-500',
    'from-green-500 via-emerald-500 to-teal-500',
    'from-orange-500 via-red-500 to-pink-500',
    'from-slate-800 via-slate-900 to-black'
  ];
  const themeColor = rng.pick(themeColors);

  const variants: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
  const componentVariants = {
    HeroSection: rng.pick(variants),
    ProblemDeepDive: rng.pick(variants),
    FeatureShowcase: rng.pick(variants),
    CTASection: rng.pick(variants),
    RichTextArticle: rng.pick(variants),
    TechnicalComparisonTable: rng.pick(variants),
    DesignTheorySection: rng.pick(variants),
    StepGuideCard: rng.pick(variants),
    ExpertOpinionBox: rng.pick(variants)
  };

  const fontStyles: ('Sans' | 'Serif' | 'Mono')[] = ['Sans', 'Serif', 'Mono'];
  const fontStyle = rng.pick(fontStyles);

  const narrativePaths: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
  const narrativePath = rng.pick(narrativePaths);

  const mockupPosition = rng.next() < 0.5 ? 2 : 4;

  const allHeadings = ['ProblemDeepDive', 'FeatureShowcase', 'CTASection', 'RichTextArticle', 'TechnicalComparisonTable'];
  const headingDowngrades = rng.pickMultiple(allHeadings, rng.randomInt(1, 3));

  return {
    layoutOrder,
    themeColor,
    componentVariants,
    fontStyle,
    narrativePath,
    mockupPosition,
    headingDowngrades
  };
}

export function getNarrativeModules(path: 'A' | 'B' | 'C'): string[] {
  return NARRATIVE_PATHS[path];
}

export function getPathLabel(path: 'A' | 'B' | 'C'): string {
  return PATH_LABELS[path];
}

export function shouldDowngradeHeading(componentName: string, headingDowngrades: string[]): boolean {
  return headingDowngrades.includes(componentName);
}

export default generateConfig;
