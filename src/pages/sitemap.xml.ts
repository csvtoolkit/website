import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  
  const staticPages = [
    '',
    '/projects'
  ];
  
  const docPages = docs.map(doc => {
    const [project, ...slugParts] = doc.id.split('/');
    const slug = slugParts.join('/').replace('.md', '');
    
    if (slug === 'overview') {
      return `/docs/${project}`;
    }
    return `/docs/${project}/${slug}`;
  });
  
  const allPages = [...staticPages, ...docPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>https://csvtoolkit.org${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/docs') ? '0.8' : '0.9'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}; 