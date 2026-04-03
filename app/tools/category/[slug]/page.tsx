import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryById, getCategorySEO, toolCategories, allTools } from "@/lib/tools";
import { MoveRight, Zap, ShieldCheck, Layers, Star } from "lucide-react";
import { iconMap } from "@/lib/icon-map";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return toolCategories.map((category) => ({
    slug: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) return { title: "Category Not Found" };

  const seo = getCategorySEO(category);

  return {
    title: seo.title,
    description: seo.metaDesc,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.metaDesc,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) notFound();

  const seo = getCategorySEO(category);

  return (
    <article className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
      {/* 🏛️ Authority Header */}
      <header className="mb-16 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-tight border border-primary/20">
          <Layers className="size-4" />
          Tool Collection
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6 text-foreground leading-[1.1]">
          {category.name} <span className="text-primary tracking-tighter">Core Hub</span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-4xl opacity-90">
          {seo.intro}
        </p>
      </header>

      {/* 🚀 Tools Grid: The Meat of the Hub */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-24">
        {category.tools.map((tool) => {
          const Icon = iconMap[tool.icon] || Star;
          return (
            <Link 
              key={tool.id} 
              href={tool.href}
              className="group relative p-6 rounded-2xl border border-border/50 bg-card hover:bg-muted/30 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/5 text-primary group-hover:scale-110 transition-transform">
                  <Icon className="size-6" />
                </div>
                <MoveRight className="size-5 text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{tool.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {tool.description}
              </p>
              {tool.new && (
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-xl shadow-primary/20">
                  New
                </span>
              )}
            </Link>
          );
        })}
      </section>

      {/* 🧠 Deep Authority Layer: Use Cases & Comparison */}
      <div className="grid gap-16 lg:grid-cols-12 items-start mb-24">
        <div className="lg:col-span-7 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-8 text-foreground tracking-tight">Professional Workflows</h2>
            <div className="space-y-6">
              {seo.useCases.map((useCase, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-muted/20 border border-border/50">
                  <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-none">
                    {i + 1}
                  </div>
                  <p className="text-muted-foreground text-lg italic leading-snug">"{useCase}"</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 rounded-3xl bg-primary/5 border border-primary/20 relative overflow-hidden">
            <Zap className="absolute -right-4 -bottom-4 size-32 text-primary/5 -rotate-12" />
            <h2 className="text-2xl font-black mb-4 text-foreground">The Local Advantage</h2>
            <p className="text-lg text-muted-foreground leading-relaxed relative z-10">
              {seo.comparison}
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm font-bold text-primary">
                <ShieldCheck className="size-5" /> 100% Privacy
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-primary">
                <Zap className="size-5" /> Zero Server Lag
              </div>
            </div>
          </section>
        </div>

        {/* ❓ Sidebar Authority: Broad FAQ */}
        <aside className="lg:col-span-5 bg-card border border-border/50 rounded-3xl p-8 sm:p-10 sticky top-24">
          <h2 className="text-2xl font-black mb-8 text-foreground pb-4 border-b border-border/50">Broad FAQ</h2>
          <dl className="space-y-8">
            {seo.faqs.map((faq, i) => (
              <div key={i}>
                <dt className="text-lg font-bold text-foreground mb-3 leading-tight leading-snug">{faq.question}</dt>
                <dd className="text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-5">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
          
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Total Capacity</p>
            <p className="text-3xl font-black text-foreground">+{allTools.length} Tools Ready</p>
            <p className="text-sm text-muted-foreground mt-1">Free, Private & Production-Grade.</p>
          </div>
        </aside>
      </div>

      {/* 📌 Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.structuredData) }} 
      />
    </article>
  );
}
