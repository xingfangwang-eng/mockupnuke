// lib/contentGenerator.test.ts

import { generateContent } from './contentGenerator.ts';

// 测试数据
const testData = {
  title: "Create Professional Mockups",
  problem_description: "Creating professional mockups takes too long and requires design skills.",
  how_to_solve: "Our tool allows you to create professional mockups in seconds without any design skills. Simply paste your screenshot and we'll handle the rest."
};

// 测试固定 seed 生成
function testFixedSeed() {
  console.log('Testing fixed seed generation...');
  
  const result1 = generateContent(testData, 'test-slug');
  const result2 = generateContent(testData, 'test-slug');
  
  console.log('Result 1:', result1);
  console.log('Result 2:', result2);
  
  // 验证相同的 slug 生成相同的结果
  console.log('Same result for same slug:', 
    JSON.stringify(result1) === JSON.stringify(result2)
  );
}

// 测试不同 slug 生成不同结果
function testDifferentSlugs() {
  console.log('\nTesting different slugs...');
  
  const result1 = generateContent(testData, 'slug-1');
  const result2 = generateContent(testData, 'slug-2');
  
  console.log('Result for slug-1 title:', result1.title);
  console.log('Result for slug-2 title:', result2.title);
  
  // 验证不同的 slug 生成不同的结果
  console.log('Different result for different slugs:', 
    JSON.stringify(result1) !== JSON.stringify(result2)
  );
}

// 测试 meta description 长度
function testMetaDescriptionLength() {
  console.log('\nTesting meta description length...');
  
  for (let i = 0; i < 10; i++) {
    const result = generateContent(testData, `test-slug-${i}`);
    const length = result.meta_description.length;
    console.log(`Meta description ${i} length: ${length}`);
    console.log(`Length between 140-160: ${length >= 140 && length <= 160}`);
  }
}

// 运行测试
testFixedSeed();
testDifferentSlugs();
testMetaDescriptionLength();

console.log('\nAll tests completed!');
