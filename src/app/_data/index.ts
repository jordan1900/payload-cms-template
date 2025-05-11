import config from "@payload-config";
import { draftMode } from "next/headers";
import { getPayload } from "payload";

import { console } from "inspector";
import type { Page } from "../../payload-types";

// Used for fetching individual page data for frontend
export const fetchPage = async (incomingSlugSegments: string[]): Promise<null | Page> => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config });
  const slugSegments = incomingSlugSegments || ["home"];
  const slug = slugSegments.at(-1);

  const data = await payload.find({
    collection: "pages",
    depth: 2,
    draft,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft
          ? []
          : [
            {
              _status: {
                equals: "published",
              },
            },
          ]),
      ],
    },
  });

  const pagePath = `/${slugSegments.join("/")}`;

  const page = data.docs.find(({ breadcrumbs }: Page) => {
    if (!breadcrumbs) {
      console.error("No breadcrumbs found for page", data.docs);
      return false;
    }
    const { url } = breadcrumbs[breadcrumbs.length - 1];
    return url === pagePath;
  });

  if (page) {
    return page;
  }

  return null;
};

// Used for querying a page by its slug (single segment, not full path)
export const queryPageBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "pages",
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  return result.docs?.[0] || null;
};

// Used for generating static params
export const fetchPages = async (): Promise<Partial<Page>[]> => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "pages",
    draft: false,
    depth: 0,
    limit: 1000,
    // overrideAccess: false,
    // pagination: false,
    select: {
      breadcrumbs: true,
    },
    where: {
      and: [
        {
          slug: {
            not_equals: "cloud",
          },
        },
        {
          _status: {
            equals: "published",
          },
        },
      ],
    },
  });

  return data.docs;
};
