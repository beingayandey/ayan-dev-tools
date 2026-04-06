import { notFound } from "next/navigation";
import { allTools, getToolById, getToolSEO } from "@/lib/tools";
import ToolPageClient from "@/components/workspace/tool-page-client";

interface ToolPageProps {
  params: Promise<{
    toolId: string;
  }>;
}

export async function generateStaticParams() {
  return allTools.map((tool) => ({
    toolId: tool.id,
  }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { toolId } = await params;
  const tool = getToolById(toolId);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  const seo = getToolSEO(tool);

  return {
    title: seo.seo.title,
    description: seo.seo.metaDesc,
    keywords: seo.seo.keywords,
    openGraph: {
      title: seo.seo.title,
      description: seo.seo.metaDesc,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.seo.title,
      description: seo.seo.metaDesc,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { toolId } = await params;

  return <ToolPageClient toolId={toolId} />;
}
