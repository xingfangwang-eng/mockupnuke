import { Metadata } from 'next';
import keywordsData from '../../../../data/keywords.json';
import SolutionPageClient from './page-client';

interface Keyword {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve?: string;
  benefit?: string;
  tools_needed?: string;
  step_by_step?: string;
  example_usage?: string;
  common_mistakes?: string;
  tips?: string;
  conclusion?: string;
  faq?: {
    question: string;
    answer: string;
  }[];
  long_intro?: string;
  short_intro?: string;
  final_thoughts?: string;
}

export async function generateStaticParams() {
  return keywordsData.map((keyword: Keyword) => ({
    slug: keyword.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const keyword = keywordsData.find((k: Keyword) => k.slug === slug);
  if (!keyword) {
    return {
      title: 'Solution Not Found',
      description: 'The requested solution could not be found.',
    };
  }
  return {
    title: keyword.title,
    description: keyword.problem_description.substring(0, 160),
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const keyword = keywordsData.find((k: Keyword) => k.slug === slug);
  return <SolutionPageClient keyword={keyword} />;
}