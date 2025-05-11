import { CollectionSlug, PayloadRequest } from "payload";

type Props = {
  collection: CollectionSlug;
  req?: PayloadRequest;
  doc?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const generatePreviewByID = ({ collection, doc }: Props): string => {
  if (!doc || !doc.id) {
    console.error("Missing document ID for preview path generation");
    return "";
  }

  return `${process.env.NEXT_PUBLIC_SITE_URL || ""}/next/preview/id?id=${doc.id}&collection=${collection}&secret=${
    process.env.PREVIEW_SECRET || ""
  }`;
};

export const formatPreviewURL = (
  collection: string,
  doc: any, // eslint-disable-line @typescript-eslint/no-explicit-any
): string => {
  return `${process.env.NEXT_PUBLIC_SITE_URL || ""}/next/preview/id?id=${doc.id}&collection=${collection}&secret=${
    process.env.PREVIEW_SECRET || ""
  }`;
};
