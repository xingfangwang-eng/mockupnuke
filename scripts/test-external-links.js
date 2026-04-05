const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 要测试的外部链接
const urls = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://paypal.me/xingfangwang?country.x=CN&locale.x=en_US'
];

// 测试函数
async function testUrls() {
  console.log('Testing external URLs...');
  console.log('=' .repeat(60));
  
  for (const url of urls) {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        validateStatus: (status) => status >= 200 && status < 400
      });
      console.log(`✅ ${url} - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }
  
  console.log('=' .repeat(60));
  console.log('Testing completed.');
}

// 运行测试
testUrls().catch(console.error);