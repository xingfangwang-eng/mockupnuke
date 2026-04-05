// lib/shuffler.test.ts

import { generateConfig } from './shuffler.ts';

// 测试固定 seed 生成
function testFixedSeed() {
  console.log('Testing fixed seed generation...');
  
  const config1 = generateConfig('test-slug');
  const config2 = generateConfig('test-slug');
  
  console.log('Config 1:', config1);
  console.log('Config 2:', config2);
  
  // 验证相同的 slug 生成相同的配置
  console.log('Same config for same slug:', 
    JSON.stringify(config1) === JSON.stringify(config2)
  );
}

// 测试不同 slug 生成不同配置
function testDifferentSlugs() {
  console.log('\nTesting different slugs...');
  
  const config1 = generateConfig('slug-1');
  const config2 = generateConfig('slug-2');
  
  console.log('Config for slug-1:', config1.layoutOrder);
  console.log('Config for slug-2:', config2.layoutOrder);
  
  // 验证不同的 slug 生成不同的配置
  console.log('Different config for different slugs:', 
    JSON.stringify(config1) !== JSON.stringify(config2)
  );
}

// 运行测试
testFixedSeed();
testDifferentSlugs();

console.log('\nAll tests completed!');
