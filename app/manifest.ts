import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gay Men's Field Guide",
    short_name: "GMFG",
    description:
      "Vibecoding meets culture: Creative coding tutorials, tech insights, and developer lifestyle.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#d946ef",
    icons: [
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
