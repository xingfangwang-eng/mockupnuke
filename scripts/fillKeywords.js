// scripts/fillKeywords.js

const fs = require('fs');
const path = require('path');

const WORD_POOLS = {
  nouns: ['design', 'quality', 'professional', 'visual', 'product', 'marketing', 'success', 'engagement', 'presentation', 'style', 'appearance', 'aesthetic', 'polish', 'finish', 'look', 'impact', 'value', 'impression', 'experience', 'growth', 'revenue', 'traffic', 'conversion'],
  verbs: ['create', 'enhance', 'improve', 'transform', 'elevate', 'beautify', 'style', 'design', 'build', 'make', 'craft', 'develop', 'produce', 'generate', 'invent', 'innovate', 'elevate', 'perfect', 'master'],
  adjectives: ['stunning', 'beautiful', 'professional', 'elegant', 'modern', 'clean', 'sleek', 'polished', 'refined', 'high-quality', 'premium', 'excellent', 'superb', 'outstanding', 'magnificent', 'brilliant', 'exceptional', 'remarkable', 'impressive', 'fantastic'],
  adverbs: ['instantly', 'quickly', 'easily', 'effortlessly', 'beautifully', 'professionally', 'elegantly', 'sleekly', 'cleanly', 'simply', 'rapidly', 'swiftly', 'immediately', 'promptly', 'readily'],
  phrases: [
    'stand out from the crowd',
    'make a lasting impression',
    'capture attention immediately',
    'elevate your brand',
    'boost engagement dramatically',
    'create visual interest',
    'build trust instantly',
    'enhance user experience',
    'drive conversions effectively',
    'showcase your product beautifully',
    'differentiate from competitors',
    'establish credibility',
    'increase visibility',
    'improve perception',
    'generate excitement',
    'spark curiosity',
    'inspire action',
    'create desire',
    'build loyalty',
    'achieve results'
  ]
};

function getSeed(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pickFromArray(arr, seed) {
  const index = Math.floor(seededRandom(seed) * arr.length);
  return arr[index];
}

function generateUniqueWord(seed, type) {
  const pool = WORD_POOLS[type];
  const index = Math.floor(seededRandom(seed) * pool.length);
  return pool[index];
}

function generateUniqueParagraph(keywordStr, seed, version) {
  const r = (offset) => seededRandom(seed + offset + version * 1000);
  
  const templates = [
    () => {
      const noun1 = generateUniqueWord(seed + 1, 'nouns');
      const adj1 = generateUniqueWord(seed + 2, 'adjectives');
      const verb1 = generateUniqueWord(seed + 3, 'verbs');
      const phrase1 = pickFromArray(WORD_POOLS.phrases, seed + 4);
      return `When it comes to ${noun1}, ${adj1} presentation matters more than ever in our increasingly visual digital landscape. ${phrase1} with every single image you share across all platforms and channels. ${verb1} compelling visuals that truly represent your brand's quality, attention to detail, and commitment to excellence. ${keywordStr} is absolutely essential for modern digital success and should never be underestimated.`;
    },
    () => {
      const adv1 = generateUniqueWord(seed + 5, 'adverbs');
      const noun2 = generateUniqueWord(seed + 6, 'nouns');
      const adj2 = generateUniqueWord(seed + 7, 'adjectives');
      const verb2 = generateUniqueWord(seed + 8, 'verbs');
      return `In today's highly competitive digital landscape, ${adv1} creating ${adj2} ${noun2} can truly set you apart from the crowd of competitors. ${verb2} exceptional content that speaks volumes about your professionalism, dedication, and brand values. ${keywordStr} isn't just about superficial looks—it's about building genuine credibility and lasting trust with your audience, customers, and stakeholders.`;
    },
    () => {
      const phrase2 = pickFromArray(WORD_POOLS.phrases, seed + 9);
      const verb3 = generateUniqueWord(seed + 10, 'verbs');
      const adj3 = generateUniqueWord(seed + 11, 'adjectives');
      const noun3 = generateUniqueWord(seed + 12, 'nouns');
      return `${phrase2} through thoughtful and intentional ${noun3} choices that align perfectly with your brand identity. ${verb3} ${adj3} experiences for absolutely everyone who views your work, interacts with your product, or engages with your brand. ${keywordStr} clearly demonstrates that you care deeply about the details that matter most to your users, customers, and overall business success.`;
    },
    () => {
      const adv2 = generateUniqueWord(seed + 13, 'adverbs');
      const phrase3 = pickFromArray(WORD_POOLS.phrases, seed + 14);
      const noun4 = generateUniqueWord(seed + 15, 'nouns');
      const adj4 = generateUniqueWord(seed + 16, 'adjectives');
      return `Great ${noun4} happens ${adv2} when you prioritize ${adj4} presentation and visual excellence in everything you create and share. ${phrase3} and watch your audience respond positively, engage more deeply, and convert at higher rates. ${keywordStr} is a powerful investment in how the entire world perceives your product, your brand, and your overall business reputation.`;
    },
    () => {
      const verb4 = generateUniqueWord(seed + 17, 'verbs');
      const noun5 = generateUniqueWord(seed + 18, 'nouns');
      const adj5 = generateUniqueWord(seed + 19, 'adjectives');
      const phrase4 = pickFromArray(WORD_POOLS.phrases, seed + 20);
      return `${verb4} ${adj5} ${noun5} that ${phrase4} and leave a lasting positive impression on everyone who sees them. Every single visual you share tells an important story about your commitment to excellence, attention to detail, and dedication to quality. ${keywordStr} ensures that story is always one of exceptional quality, unwavering professionalism, and meticulous attention to even the smallest details.`;
    },
    () => {
      const noun6 = generateUniqueWord(seed + 21, 'nouns');
      const adj6 = generateUniqueWord(seed + 22, 'adjectives');
      const verb5 = generateUniqueWord(seed + 23, 'verbs');
      const phrase5 = pickFromArray(WORD_POOLS.phrases, seed + 24);
      return `The ${adj6} ${noun6} you present directly reflects your brand's values, your team's work ethic, and your company's overall commitment to excellence. ${verb5} content that ${phrase5} and creates meaningful connections with your target audience. ${keywordStr} is one of the most powerful ways to communicate your brand's quality and dedication without saying a single word.`;
    },
    () => {
      const adv3 = generateUniqueWord(seed + 25, 'adverbs');
      const noun7 = generateUniqueWord(seed + 26, 'nouns');
      const adj7 = generateUniqueWord(seed + 27, 'adjectives');
      const verb6 = generateUniqueWord(seed + 28, 'verbs');
      const phrase6 = pickFromArray(WORD_POOLS.phrases, seed + 29);
      return `${adv3} creating ${adj7} ${noun7} should be a top priority for any serious business or ambitious entrepreneur. ${verb6} materials that ${phrase6} and help you achieve your business goals faster. ${keywordStr} is an investment that pays dividends through increased engagement, higher conversions, and stronger brand recognition across all channels.`;
    },
    () => {
      const noun8 = generateUniqueWord(seed + 30, 'nouns');
      const adj8 = generateUniqueWord(seed + 31, 'adjectives');
      const verb7 = generateUniqueWord(seed + 32, 'verbs');
      const phrase7 = pickFromArray(WORD_POOLS.phrases, seed + 33);
      return `Your ${adj8} ${noun8} are often the first point of contact potential customers have with your brand, product, or service. ${verb7} content that ${phrase7} and makes people want to learn more about what you offer. ${keywordStr} ensures that first impression is not just good—it's absolutely unforgettable and compels people to take action immediately.`;
    }
  ];
  
  const templateIndex = Math.floor(r(50) * templates.length);
  return templates[templateIndex]();
}

function generateExtraContent(keywordStr, seed) {
  const extraSentences = [
    `Remember that ${keywordStr} directly and profoundly impacts how users, customers, and investors perceive your product's true value and overall quality in the marketplace.`,
    `The significant difference between simply good and truly great often lies in carefully crafted details like ${keywordStr} that most people overlook but everyone notices subconsciously.`,
    `Investing just a little extra time and effort in ${keywordStr} pays off tremendously through better engagement, higher conversions, and stronger customer loyalty over the long term.`,
    `Don't underestimate the incredible power of ${keywordStr} in building a strong, recognizable brand identity that resonates deeply with your target audience and stands the test of time.`,
    `${keywordStr} is consistently one of the simplest yet most effective ways to dramatically improve your visual communication and create lasting positive impressions.`,
    `When you prioritize ${keywordStr}, you're sending a clear message that you care about quality, you respect your audience, and you're committed to delivering the best possible experience.`,
    `The benefits of ${keywordStr} extend far beyond simple aesthetics—it builds trust, establishes credibility, and positions you as a leader in your industry or niche market.`,
    `Every time you share content that demonstrates excellent ${keywordStr}, you're reinforcing your brand's reputation for quality, professionalism, and attention to detail.`
  ];
  
  const r = (offset) => seededRandom(seed + offset);
  const count = Math.floor(r(100) * 3) + 2;
  let result = '';
  for (let i = 0; i < count; i++) {
    result += pickFromArray(extraSentences, seed + i * 50) + ' ';
  }
  return result.trim();
}

function generateFieldContent(keywordStr, field, globalSeed, keywordIndex) {
  const seed = getSeed(keywordStr + field + globalSeed + keywordIndex);
  
  switch(field) {
    case 'long_intro':
      return generateUniqueParagraph(keywordStr, seed, 0) + ' ' + 
             generateUniqueParagraph(keywordStr, seed + 100, 1) + ' ' + 
             generateExtraContent(keywordStr, seed + 200);
    
    case 'technical_debt_analysis':
      const techTemplates = [
        `Traditional design workflows for ${keywordStr} involve far too many steps and consume way too much valuable time that could be better spent on core business activities. Users consistently find themselves opening complex professional software, navigating confusing and overwhelming interfaces, and adjusting countless settings just to achieve a basic, satisfactory result. This creates significant and accumulating technical debt in the form of wasted productive hours, inconsistent visual output, and growing team frustration that can impact morale and efficiency.`,
        `When addressing ${keywordStr} in today's fast-paced environment, conventional tools often become part of the frustrating problem rather than the elegant solution everyone hopes for. The steep learning curve discourages widespread adoption, the entire process is unnecessarily repetitive and time-consuming, and maintaining perfect visual consistency across multiple marketing assets becomes a major organizational challenge that drains valuable creative and financial resources.`,
        `The technical debt directly associated with ${keywordStr} using traditional methods accumulates surprisingly quickly and can become a significant burden on any team. Each new project essentially requires starting completely from scratch, brand guidelines are extremely difficult to enforce consistently, and scaling production becomes nearly impossible without hiring dedicated design resources that many startups and small businesses simply cannot afford.`
      ];
      return pickFromArray(techTemplates, seed) + ' ' + 
             generateUniqueParagraph(keywordStr, seed + 500, 2) + ' ' +
             generateExtraContent(keywordStr, seed + 600);
    
    case 'design_psychology':
      const psychTemplates = [
        `From a fascinating psychological perspective, ${keywordStr} taps into deep-seated universal visual preferences that humans have developed over thousands of years of evolution. Gently rounded corners feel much more approachable and friendly, soft shadows naturally create a sense of depth and dimension, and carefully chosen colors evoke specific powerful emotional responses that immediately build trust and credibility with your audience.`,
        `The amazing human brain responds instinctively and automatically to visual cues related to ${keywordStr} without us even realizing it's happening. When we see polished, professional, well-crafted visuals, we subconsciously immediately associate that high quality with the product or brand behind them, creating instantaneous and lasting positive impressions that are difficult to shake.`,
        `Truly understanding the psychology behind ${keywordStr} reveals exactly why certain thoughtful design choices work so incredibly well in practice. Carefully crafted visual hierarchy naturally guides attention to what matters most, consistent branding builds immediate recognition and trust, and thoughtful aesthetics create deep emotional connections that genuinely drive engagement and build lasting customer loyalty.`
      ];
      return pickFromArray(psychTemplates, seed) + ' ' + 
             generateUniqueParagraph(keywordStr, seed + 1000, 3) + ' ' +
             generateExtraContent(keywordStr, seed + 1100);
    
    case 'step_by_step_guide':
      const stepTemplates = [
        `1. Carefully capture exactly what you want to beautifully showcase in your perfect screenshot with attention to detail. 2. Open MockupNuke in absolutely any modern web browser—no downloads, no installations, no accounts required at all. 3. Paste or upload your image quickly and easily with a single simple click or convenient keyboard shortcut. 4. Watch in amazement as professional styling is automatically applied perfectly in milliseconds. 5. Download your absolutely perfect, ready-to-share image in stunning high resolution that will impress everyone.`,
        `Step One: Thoughtfully prepare your amazing content and capture the absolute perfect screenshot that highlights your best features. Step Two: Simply navigate to MockupNuke for lightning-fast instant processing. Step Three: Upload your image quickly and easily with no complications whatsoever. Step Four: Carefully review the automatically enhanced, professional result that looks incredible. Step Five: Export in your preferred format and share with complete confidence everywhere.`,
        `First, capture your screen exactly as you want it beautifully displayed for maximum impact. Second, visit MockupNuke for immediate, hassle-free processing. Third, simply drop your image into the clearly designated area. Fourth, enjoy the instant professional transformation that makes your content shine. Fifth, save your beautiful new visual and use it anywhere you want with pride and confidence.`
      ];
      return pickFromArray(stepTemplates, seed) + ' ' + 
             generateExtraContent(keywordStr, seed + 1500);
    
    case 'industry_comparison':
      const compTemplates = [
        `Raw screenshots are extremely quick to capture but look completely unprofessional and consistently fail to impress discerning viewers. Traditional editing tools like Canva offer tremendous creative flexibility but require significant time investment and specialized design skills to use effectively for professional results. MockupNuke strikes the perfect balance—consistently delivering professional, stunning results instantly, with absolutely no learning curve required whatsoever.`,
        `When comparing different approaches to ${keywordStr}, the striking differences become immediately clear and obvious. Raw images are fast but unfortunately ugly and completely unpolished. Canva and Figma can produce beautiful professional results but take far too long for simple, routine tasks. MockupNuke brilliantly gives you the absolute best of both worlds: lightning-fast incredible speed combined with premium, professional quality that never disappoints.`,
        `Let's carefully and honestly examine the available alternatives for ${keywordStr} in today's market. Raw screenshots: 5 seconds to capture, 1/10 in overall quality. Canva: 5 minutes of tedious editing, 8/10 in quality when done right. MockupNuke: 1 second total from start to finish, 10/10 perfect, stunning quality every single time without fail. The choice becomes completely obvious when you value both your precious time and your professional results equally.`
      ];
      return pickFromArray(compTemplates, seed) + ' ' + 
             generateExtraContent(keywordStr, seed + 2000);
    
    case 'faq_deep_dive':
      const faqTemplates = [
        `Q: How long does it actually take to use MockupNuke from start to finish? A: Just seconds! Upload your beautiful image and download the perfect result immediately. Q: Do I absolutely need any prior design experience whatsoever? A: Absolutely not required at all. The entire tool is completely automated and intuitively designed for everyone. Q: What specific file formats are fully supported? A: All major image formats work perfectly with our advanced system. Q: Is there any limit whatsoever on how much I can use it? A: Use it absolutely as much as you need, completely free of charge forever. Q: Can I definitely use it on mobile devices? A: Yes! Works flawlessly on absolutely any device with a modern web browser.`,
        `Q: Is MockupNuke really and truly completely free to use with no strings attached? A: Yes, completely free with absolutely no hidden costs or subscription fees ever. Q: How exactly does it compare to something like Canva or similar tools? A: Much faster and far simpler for this specific, common use case. Q: Will my uploaded images stay completely private and secure? A: All processing happens securely and entirely in your browser, never leaving your device. Q: What about maintaining perfect brand consistency? A: Perfectly consistent, professional results every single time without fail. Q: Can businesses definitely use it for professional client work? A: Absolutely—ideal for startups, agencies, and enterprises of all sizes.`,
        `Q: Do I need to create an account or provide any personal information to use it? A: No account required whatsoever—just visit and start using immediately. Q: What resolutions are supported for export and sharing? A: Up to 4K and beyond for absolutely crisp, beautiful, professional results. Q: How exactly does the automatic styling work behind the scenes? A: Advanced algorithms carefully analyze and perfectly enhance your images automatically. Q: Can I customize the results at all to match my preferences? A: Multiple beautiful preset options are available to choose from. Q: Is there any watermark whatsoever on the final images? A: No watermarks ever—your beautiful images, your rules completely.`
      ];
      return pickFromArray(faqTemplates, seed) + ' ' + 
             generateExtraContent(keywordStr, seed + 2500);
    
    case 'expert_tips':
      const tipsTemplates = [
        `1. Perfect consistency is absolutely key—use the same styling approach across absolutely all your visual content to build strong, lasting brand recognition and trust with your growing audience. 2. Strategic timing matters significantly—share your beautifully styled screenshots when your specific target audience is most active and engaged on social media platforms. 3. Carefully A/B test different beautiful visual styles to see which specific approach resonates best with your particular audience and industry niche.`,
        `Pro Tip 1: Always use the absolute highest-resolution source images possible for the very best final professional results. Pro Tip 2: Thoughtfully match your visual styling to your established brand colors for maximum impact and instant recognition. Pro Tip 3: Use MockupNuke consistently across all platforms and communication channels for perfectly cohesive, beautiful visual communication that strengthens your brand identity.`,
        `Expert Advice 1: Quality visuals can increase engagement dramatically by up to 40%—it's definitely worth investing those few extra seconds of your time. Expert Advice 2: Professional, polished styling builds immediate, lasting trust with potential customers and important investors alike. Expert Advice 3: Batch process your beautiful screenshots whenever possible to maintain perfect consistency while saving valuable time and effort.`
      ];
      return pickFromArray(tipsTemplates, seed) + ' ' + 
             generateExtraContent(keywordStr, seed + 3000);
    
    default:
      return generateUniqueParagraph(keywordStr, seed, 4) + ' ' + 
             generateExtraContent(keywordStr, seed + 3500);
  }
}

function main() {
  try {
    const keywordsPath = path.join(__dirname, '../data/keywords.json');
    const keywordsData = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));
    
    console.log(`Processing ${keywordsData.length} keywords...`);
    
    const globalSeed = Date.now();
    const filledKeywords = [];
    
    for (let i = 0; i < keywordsData.length; i++) {
      const keyword = keywordsData[i];
      console.log(`[${i + 1}/${keywordsData.length}] ${keyword.keyword}`);
      
      const filledKeyword = { ...keyword };
      
      const fields = ['long_intro', 'technical_debt_analysis', 'design_psychology', 'step_by_step_guide', 'industry_comparison', 'faq_deep_dive', 'expert_tips'];
      
      for (const field of fields) {
        const content = generateFieldContent(keyword.keyword, field, globalSeed, i);
        filledKeyword[field] = content;
      }
      
      filledKeywords.push(filledKeyword);
    }
    
    const outputPath = path.join(__dirname, '../data/keywords-filled.json');
    fs.writeFileSync(outputPath, JSON.stringify(filledKeywords, null, 2));
    
    console.log(`\nSuccessfully filled ${filledKeywords.length} keywords`);
    console.log(`Output saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
