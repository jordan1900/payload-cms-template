import type { Metadata } from "next";

import { PayloadRedirects } from "@/components/PayloadRedirects";
import { homeStatic } from "@/endpoints/seed/home-static";
import { fetchPage, fetchPages, queryPageBySlug } from "@data/index";
import { draftMode } from "next/headers";
import React from "react";

import { RenderBlocks } from "@/blocks/RenderBlocks";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { RenderHero } from "@/heros/RenderHero";
import { generateMeta } from "@/utilities/generateMeta";
import PageClient from "./page.client";

export async function generateStaticParams() {
  const pages = await fetchPages();

  return pages.map(({ breadcrumbs }) => ({
    slug: breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, "").split("/"),
  }));
}

type Args = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = ["home"] } = await paramsPromise;
  const url = "/" + (Array.isArray(slug) ? slug.join("/") : slug);

  const page = await fetchPage(Array.isArray(slug) ? slug : [slug]);

  // Remove this code once your website is seeded
  let pageData = page;
  if (!pageData && slug[0] === "home") {
    pageData = homeStatic;
  }

  if (!pageData) {
    return <PayloadRedirects url={url} />;
  }

  const { hero, layout } = pageData;

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = "home" } = await paramsPromise;
  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
}
