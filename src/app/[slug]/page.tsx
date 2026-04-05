import { Metadata } from 'next';
import keywords from '../../../data/keywords.json';
import SlugPageClient from './page-client';

interface Keyword {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
}

export async function generateStaticParams() {
  return keywords.map((keyword: Keyword) => ({
    slug: keyword.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const keyword = keywords.find((k: Keyword) => k.slug === slug);
  if (!keyword) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
  return {
    title: keyword.title,
    description: keyword.how_to_solve.substring(0, 160),
  };
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const keyword = keywords.find((k: Keyword) => k.slug === slug);
  return <SlugPageClient keyword={keyword} />;
}
