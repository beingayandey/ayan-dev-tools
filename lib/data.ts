import { toolCategories } from "./tools";
import { IconName } from "./icon-map";

export interface SearchItem {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  href: string;
  category?: string;
  keywords?: string[];
}

export const navigationItems: SearchItem[] = [
  {
    id: "home",
    name: "Workspace Hub",
    description: "Launch your operations from a centralized dashboard.",
    icon: "home",
    href: "/",
    keywords: ["home", "dashboard", "main", "workspace"],
  },
];

// Flatten all tools into a searchable format
export const searchableTools: SearchItem[] = toolCategories.flatMap((category) =>
  category.tools.map((tool) => ({
    id: tool.id,
    name: tool.name,
    description: tool.description,
    icon: tool.icon,
    href: tool.href,
    category: category.name,
    keywords: [tool.name.toLowerCase(), category.name.toLowerCase(), tool.id],
  }))
);

export const allSearchItems: SearchItem[] = [...navigationItems, ...searchableTools];

export const categories = toolCategories;
