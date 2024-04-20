import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "介绍",
      icon: "star",
      prefix: "intro/",
      link: "intro/"
    },
    {
      text: "使用指南",
      icon: "laptop-code",
      prefix: "getStart/",
      children: "structure",
    },
    {
      text: "模块",
      icon: "microchip",
      prefix: "modules/",
      children: "structure",
    }
  ],
});
