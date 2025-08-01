import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoreData, getTemplate } from "@/lib/subdomains";
import { protocol, rootDomain } from "@/lib/utils";
import { sampleTemplates, renderTemplate } from "@/lib/templates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const storeData = await getStoreData(subdomain);

  if (!storeData) {
    return {
      title: rootDomain,
    };
  }

  return {
    title: `${storeData.title} - ${subdomain}.${rootDomain}`,
    description: `Store page for ${storeData.title}`,
  };
}

export default async function SubdomainPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const storeData = await getStoreData(subdomain);

  if (!storeData) {
    notFound();
  }

  // Get template data
  let template = await getTemplate(storeData.template_id);

  // Fallback to sample templates if not found in database
  if (!template) {
    const fallbackTemplate =
      sampleTemplates.find((t) => t.id === storeData.template_id) ||
      sampleTemplates[0];
    template = {
      ...fallbackTemplate,
      created_at: new Date().toISOString(),
    };
  }

  // Render the template with store data
  const renderedHtml = renderTemplate(template!, storeData.title);

  return (
    <div className="relative">
      {/* Back to main site link */}
      <div className="absolute top-4 right-4 z-10">
        <Link
          href={`${protocol}://${rootDomain}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors bg-white/80 backdrop-blur-sm px-3 py-1 rounded"
        >
          {rootDomain}
        </Link>
      </div>

      {/* Render the template */}
      <div
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
        className="template-content"
      />

      {/* Inject template CSS */}
      <style dangerouslySetInnerHTML={{ __html: template!.css_content }} />
    </div>
  );
}
