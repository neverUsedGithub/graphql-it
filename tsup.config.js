import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src"],
    format: ["cjs", "esm"],
    minify: true,
    clean: true,
    dts: true,
});
