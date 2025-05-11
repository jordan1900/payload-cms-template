import type { CollectionConfig } from "payload";

import { slugField } from "@/fields/slug";
import { hero } from "@/heros/config";
import { createBreadcrumbsField, createParentField } from "@payloadcms/plugin-nested-docs";
import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { Archive } from "../../blocks/ArchiveBlock/config";
import { CallToAction } from "../../blocks/CallToAction/config";
import { Content } from "../../blocks/Content/config";
import { FormBlock } from "../../blocks/Form/config";
import { MediaBlock } from "../../blocks/MediaBlock/config";
import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { generatePreviewByID } from "../../utilities/generatePreviewByID";
// import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewByID({
          doc: data,
          collection: "pages",
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewByID({
        doc: data,
        collection: "pages",
        req,
      }),
    useAsTitle: "title",
    // livePreview: {
    //   url: ({ data, req }) => {
    //     const path = generatePreviewPath({
    //       slug: typeof data?.slug === "string" ? data.slug : "",
    //       collection: "pages",
    //       req,
    //     });

    //     return path;
    //   },
    // },
    // preview: (data, { req }) =>
    //   generatePreviewPath({
    //     slug: typeof data?.slug === "string" ? data.slug : "",
    //     collection: "pages",
    //     req,
    //   }),
    // useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    createBreadcrumbsField("pages", {
      admin: {
        disabled: true,
      },
    }),
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    createParentField("pages", {
      admin: {
        position: "sidebar",
        description: "Select a parent page to create a hierarchical structure",
      },
    }),
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
