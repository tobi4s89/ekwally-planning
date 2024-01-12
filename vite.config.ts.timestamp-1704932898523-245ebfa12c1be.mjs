// vite.config.ts
import { resolve } from "node:path";
import react from "file:///Users/tobiasvanegten/Sites/ekwally/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@4.5.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
import vike from "file:///Users/tobiasvanegten/Sites/ekwally/node_modules/.pnpm/vike@0.4.154_vite@4.5.1/node_modules/vike/dist/esm/node/plugin/index.js";
var __vite_injected_original_dirname = "/Users/tobiasvanegten/Sites/ekwally";
var vite_config_default = {
  resolve: {
    alias: {
      "_shared": resolve(__vite_injected_original_dirname, "./app/shared")
    }
  },
  optimizeDeps: { include: ["cross-fetch", "react/jsx-runtime"] },
  plugins: [react(), vike()]
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdG9iaWFzdmFuZWd0ZW4vU2l0ZXMvZWt3YWxseVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3RvYmlhc3ZhbmVndGVuL1NpdGVzL2Vrd2FsbHkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3RvYmlhc3ZhbmVndGVuL1NpdGVzL2Vrd2FsbHkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHZpa2UgZnJvbSAndmlrZS9wbHVnaW4nXG5pbXBvcnQgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICByZXNvbHZlOiB7XG5cdFx0YWxpYXM6IHtcbiAgICAgICdfc2hhcmVkJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL2FwcC9zaGFyZWQnKSxcblx0XHR9XG5cdH0sXG4gIG9wdGltaXplRGVwczogeyBpbmNsdWRlOiBbJ2Nyb3NzLWZldGNoJywgJ3JlYWN0L2pzeC1ydW50aW1lJ10gfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIHZpa2UoKV0sXG59IHNhdGlzZmllcyBVc2VyQ29uZmlnIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLGVBQWU7QUFDblQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRO0FBQUEsRUFDYixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsTUFDSCxXQUFXLFFBQVEsa0NBQVcsY0FBYztBQUFBLElBQ2hEO0FBQUEsRUFDRDtBQUFBLEVBQ0MsY0FBYyxFQUFFLFNBQVMsQ0FBQyxlQUFlLG1CQUFtQixFQUFFO0FBQUEsRUFDOUQsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0I7IiwKICAibmFtZXMiOiBbXQp9Cg==