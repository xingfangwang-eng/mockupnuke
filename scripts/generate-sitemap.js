const fs = require('fs');
const path = require('path');

// 导入关键词数据
const keywordsData = require('../data/keywords.json');

// 网站基础 URL
const baseUrl = 'https://mockupnuke.wangdadi.xyz';

// 生成 XML 站点地图
function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // 添加首页
  sitemap += `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // 添加解决方案聚合页
  sitemap += `  <url>
    <loc>${baseUrl}/solutions</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // 添加 100 个解决方案页面
  keywordsData.slice(0, 100).forEach((keyword) => {
    sitemap += `  <url>
    <loc>${baseUrl}/solutions/${keyword.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  // 写入 sitemap.xml 文件
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);

  console.log('Sitemap generated successfully!');
  console.log(`Sitemap saved to: ${sitemapPath}`);
  console.log(`Total URLs: ${1 + 1 + Math.min(keywordsData.length, 100)}`);
}

// 运行生成脚本
generateSitemap();
