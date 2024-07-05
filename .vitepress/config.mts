import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "低代码平台架构",
  description: "低代码平台架构开发手册",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: false,
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    nav: [
      { text: "首页", link: "/" }
    ],
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索",
          },
          modal: {
            displayDetails: "显示详情",
            resetButtonTitle: "重置",
            backButtonTitle: "返回",
            noResultsText: "没有找到结果",
            footer: {
              selectText: "选择",
              selectKeyAriaLabel: "选择",
              navigateText: "导航",
              navigateUpKeyAriaLabel: "向上导航",
              navigateDownKeyAriaLabel: "向下导航",
              closeText: "关闭",
              closeKeyAriaLabel: "关闭",
            },
          },
        },
      },
    },

    sidebar: [
      {
        text: "开发手册",
        items: [
          { text: "简介", link: "/introduce" },
          { text: "快速开始", link: "/install" },
          { text: "安装 MySQL 数据库", link: "/install_mysql" },
          { text: "配置系统字典", link: "/dict" },
        ]
      }
    ],

    // socialLinks: [
    //   { icon: "github", link: "https://github.com/vuejs/vitepress" }
    // ],
  }
})
