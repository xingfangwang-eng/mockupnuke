const fs = require('fs');
const path = require('path');

const MIN_WORD_COUNT = 800;
const MIN_KEYWORD_DENSITY = 0.01;
const MAX_KEYWORD_DENSITY = 0.03;
const MAX_SIMILARITY = 0.8;

const KEYWORDS_PATH = path.join(__dirname, '../data/keywords-filled.json');

function countWords(text) {
  if (!text) return 0;
  const words = text.trim().split(/\s+/);
  return words.filter(word => word.length > 0).length;
}

function calculateKeywordDensity(text, keyword) {
  const wordCount = countWords(text);
  if (wordCount === 0) return 0;
  
  const keywordRegex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const keywordCount = (text.match(keywordRegex) || []).length;
  
  return keywordCount / wordCount;
}

function jaccardSimilarity(text1, text2) {
  const words1 = new Set(text1.toLowerCase().split(/\s+/).filter(word => word.length > 0));
  const words2 = new Set(text2.toLowerCase().split(/\s+/).filter(word => word.length > 0));
  
  let intersection = 0;
  words1.forEach(word => {
    if (words2.has(word)) {
      intersection++;
    }
  });
  
  const union = words1.size + words2.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function extractPageContent(keyword) {
  const parts = [
    keyword.title,
    keyword.problem_description,
    keyword.how_to_solve,
    keyword.long_intro,
    keyword.technical_debt_analysis,
    keyword.design_psychology,
    keyword.step_by_step_guide,
    keyword.industry_comparison,
    keyword.faq_deep_dive,
    keyword.expert_tips
  ];
  
  return parts.filter(part => part).join(' ');
}

async function main() {
  console.log('🔍 Starting SEO verification...\n');
  
  if (!fs.existsSync(KEYWORDS_PATH)) {
    console.error('❌ Keywords file not found.');
    process.exit(1);
  }
  
  const keywords = JSON.parse(fs.readFileSync(KEYWORDS_PATH, 'utf8'));
  console.log(`📁 Found ${keywords.length} keywords\n`);
  
  const pageData = [];
  const issues = [];
  
  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];
    const text = extractPageContent(keyword);
    const wordCount = countWords(text);
    
    console.log(`📄 [${i + 1}/${keywords.length}] ${keyword.slug}`);
    
    const pageInfo = {
      keyword: keyword.keyword,
      slug: keyword.slug,
      text,
      wordCount,
      keywordDensity: calculateKeywordDensity(text, keyword.keyword)
    };
    
    pageData.push(pageInfo);
    
    if (wordCount < MIN_WORD_COUNT) {
      issues.push({
        type: 'WORD_COUNT',
        severity: 'ERROR',
        slug: keyword.slug,
        message: `Word count too low: ${wordCount} words (min: ${MIN_WORD_COUNT})`
      });
    }
    
    if (pageInfo.keywordDensity < MIN_KEYWORD_DENSITY || pageInfo.keywordDensity > MAX_KEYWORD_DENSITY) {
      issues.push({
        type: 'KEYWORD_DENSITY',
        severity: 'WARNING',
        slug: keyword.slug,
        message: `Keyword density: ${(pageInfo.keywordDensity * 100).toFixed(2)}% (target: ${MIN_KEYWORD_DENSITY * 100}-${MAX_KEYWORD_DENSITY * 100}%)`
      });
    }
  }
  
  console.log('\n🔍 Checking page similarity...');
  
  const similarPairs = [];
  for (let i = 0; i < pageData.length; i++) {
    for (let j = i + 1; j < pageData.length; j++) {
      const similarity = jaccardSimilarity(pageData[i].text, pageData[j].text);
      
      if (similarity > MAX_SIMILARITY) {
        similarPairs.push({
          page1: pageData[i].slug,
          page2: pageData[j].slug,
          similarity: (similarity * 100).toFixed(2)
        });
      }
    }
  }
  
  console.log('\n📊 Summary Report');
  console.log('='.repeat(60));
  
  const totalPages = pageData.length;
  const lowWordCount = issues.filter(i => i.type === 'WORD_COUNT').length;
  const keywordDensityIssues = issues.filter(i => i.type === 'KEYWORD_DENSITY').length;
  const similarPagePairs = similarPairs.length;
  
  console.log(`\nTotal pages: ${totalPages}`);
  console.log(`Pages with low word count: ${lowWordCount}`);
  console.log(`Keyword density issues: ${keywordDensityIssues}`);
  console.log(`Similar page pairs: ${similarPagePairs}`);
  
  if (issues.length > 0) {
    console.log('\n⚠️  Issues Found');
    console.log('='.repeat(60));
    
    issues.forEach(issue => {
      const icon = issue.severity === 'ERROR' ? '❌' : '⚠️';
      console.log(`\n${icon} [${issue.severity}] ${issue.slug}`);
      console.log(`   ${issue.message}`);
    });
  }
  
  if (similarPairs.length > 0) {
    console.log('\n🚨 Similar Pages Found');
    console.log('='.repeat(60));
    
    similarPairs.forEach(pair => {
      console.log(`\n${pair.page1} ↔ ${pair.page2}`);
      console.log(`   Similarity: ${pair.similarity}% (max: ${MAX_SIMILARITY * 100}%)`);
    });
  }
  
  if (issues.length === 0 && similarPairs.length === 0) {
    console.log('\n✅ All pages pass SEO verification!');
  } else {
    console.log('\n❌ Some issues found. Please review above.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
