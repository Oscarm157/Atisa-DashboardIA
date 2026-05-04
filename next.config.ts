import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/reporte",
        destination: "/reporte_diagnostico_ia_atisa_2026.html",
      },
    ];
  },
};

export default nextConfig;
