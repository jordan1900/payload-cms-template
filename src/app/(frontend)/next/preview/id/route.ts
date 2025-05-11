import type { CollectionSlug, PayloadRequest } from "payload";
import { getPayload } from "payload";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import configPromise from "@payload-config";

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string;
      };
    };
  } & Request,
): Promise<Response> {
  const payload = await getPayload({ config: configPromise });

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const collection = searchParams.get("collection") as CollectionSlug;
  const secret = searchParams.get("secret");

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  if (!id || !collection) {
    return new Response("Insufficient search params", { status: 404 });
  }

  let user;

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });
  } catch (error) {
    payload.logger.error({ err: error }, "Error verifying token for live preview");
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  const draft = await draftMode();

  if (!user) {
    draft.disable();
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  // Enable draft mode
  draft.enable();

  // Find the document by ID with draft content
  const doc = await payload.findByID({
    collection,
    id,
    draft: true,
    depth: 2, // Increase depth to ensure we get all nested relationships
  });

  if (!doc) {
    return new Response("Document not found", { status: 404 });
  }

  // Determine the redirect path based on the document type and structure
  let redirectPath = "/";

  // Handle different collection types with type safety
  switch (collection) {
    case "pages":
      // For pages collection, use the breadcrumbs if available
      if (
        "breadcrumbs" in doc
        && Array.isArray(doc.breadcrumbs)
        && doc.breadcrumbs.length > 0
      ) {
        const lastBreadcrumb = doc.breadcrumbs[doc.breadcrumbs.length - 1];
        if (lastBreadcrumb && typeof lastBreadcrumb.url === "string") {
          redirectPath = lastBreadcrumb.url;
        }
      } else if ("slug" in doc && typeof doc.slug === "string") {
        // Fallback to slug if breadcrumbs aren't available
        redirectPath = `/${doc.slug}`;
      }
      break;

    case "posts":
      // For posts collection, use the slug if available
      if ("slug" in doc && typeof doc.slug === "string") {
        redirectPath = `/posts/${doc.slug}`;
      } else {
        redirectPath = `/posts/${id}`;
      }
      break;

    default:
      // For other collections, use the collection and id
      redirectPath = `/${collection}/${id}`;
  }

  // Redirect to the page
  redirect(redirectPath);
}
