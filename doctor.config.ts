import { defineConfig } from "react-doctor/api";

export default defineConfig({
  ignore: {
    files: ["components/ui/**"],
    overrides: [
      {
        files: ["lib/utils.ts"],
        rules: ["deslop/unused-file"],
      },
    ],
  },
});
