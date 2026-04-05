import { injectLSIKeywords, generateLSICombination, getCategoryKeywords } from './lsiInjector';

describe('LSI Injector Tests', () => {
  test('should inject LSI keywords into text', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.repeat(10);
    
    const keyword = 'how to make app screenshots look professional for twitter';
    const result = injectLSIKeywords(text, keyword);
    
    expect(result.length).toBeGreaterThan(text.length);
    console.log('Original length:', text.length);
    console.log('Result length:', result.length);
  });

  test('should generate unique LSI combinations for different keywords', () => {
    const keyword1 = 'how to make app screenshots look professional for twitter';
    const keyword2 = 'canva takes too long to make a simple mockup';
    
    const combination1 = generateLSICombination(keyword1);
    const combination2 = generateLSICombination(keyword2);
    
    expect(combination1.length).toBeGreaterThanOrEqual(5);
    expect(combination1.length).toBeLessThanOrEqual(8);
    expect(combination2.length).toBeGreaterThanOrEqual(5);
    expect(combination2.length).toBeLessThanOrEqual(8);
    
    console.log('Combination 1:', combination1);
    console.log('Combination 2:', combination2);
  });

  test('should return category keywords', () => {
    const saasKeywords = getCategoryKeywords('saas');
    const designKeywords = getCategoryKeywords('design');
    
    expect(saasKeywords.length).toBeGreaterThan(0);
    expect(designKeywords.length).toBeGreaterThan(0);
    
    console.log('SaaS keywords:', saasKeywords);
    console.log('Design keywords:', designKeywords);
  });

  test('should handle short text gracefully', () => {
    const shortText = 'Short text';
    const keyword = 'test keyword';
    const result = injectLSIKeywords(shortText, keyword);
    
    expect(result).toBe(shortText);
  });
});
