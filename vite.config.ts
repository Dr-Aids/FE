import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://draids.site",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
        // ★ 핵심: 백엔드로 전달될 때 Origin 헤더 제거(또는 타겟으로 변경)
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.removeHeader?.("origin"); // 제거
            // 또는 다음 한 줄로 교체도 가능:
            // proxyReq.setHeader?.("origin", "https://draids.site");
          });
        },
      },
    },
  },
});
