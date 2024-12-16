import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "David Riches personal website",
    short_name: "davidrich.es",
    description: "David Riches personal website",
    start_url: "/",
    background_color: "#ffffff",
    theme_color: "#F40088",
    display: "minimal-ui",
    icons: [
      {
        src: "/images/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
