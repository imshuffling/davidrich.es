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
      // {
      //   src: "/favicon.ico",
      //   sizes: "any",
      //   type: "image/x-icon",
      // },
      {
        src: "/images/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
