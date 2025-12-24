import { getPlaiceholder } from "plaiceholder";

export async function getBlurDataURL(imageUrl: string): Promise<string> {
  try {
    const buffer = await fetch(imageUrl).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer, { size: 10 });

    return base64;
  } catch (error) {
    console.error("Error generating blur data URL:", error);
    // Return a fallback transparent pixel if generation fails
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  }
}
