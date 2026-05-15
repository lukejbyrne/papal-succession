import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Papal Succession — every pope from Peter to Leo XIV";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Papal Succession"
        title="Every pope from Peter to Leo XIV"
        subtitle="A sourced timeline, local context, and directory of the bishops of Rome."
        meta="popes-io.netlify.app · AD 30 – present"
      />
    ),
    { ...size }
  );
}
