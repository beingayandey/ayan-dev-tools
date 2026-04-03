import { MetadataRoute } from 'next';

export const dynamic = "force-static";
import { allTools, toolCategories } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://beingayandey.me/tools'; // Replace with your actual domain

  // 🏛️ 1. Main Pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // 🏠 2. Category Hub Pages (High Authority Pillars)
  const categoryPages = toolCategories.map((category) => ({
    url: `${baseUrl}/tools/category/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 🛠️ 3. All Tool Pages (Including SEO Aliases/Multi-Landing Pages)
  const toolPages = allTools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}
