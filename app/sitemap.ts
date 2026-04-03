import { MetadataRoute } from 'next';

export const dynamic = "force-static";
import { allTools, toolCategories } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ayan-dev-tools.vercel.app';

  // 🏛️ 1. Home Page
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // 🏠 2. Category Hub Pages
  const categoryPages = toolCategories.map((category) => ({
    url: `${baseUrl}/tools/category/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 🛠️ 3. All Tool Pages
  const toolPages = allTools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}
