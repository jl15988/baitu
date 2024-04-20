import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/baitu/",

  lang: "zh-CN",
  title: "Baitu 文档",
  description: "Baitu 文档",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
