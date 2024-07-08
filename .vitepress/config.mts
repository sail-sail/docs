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
        text: "简介",
        link: "/introduce",
      },
      {
        text: "快速开始",
        collapsed: false,
        items: [
          { text: "安装开发环境", link: "/start/install" },
          { text: "安装 MySQL", link: "/start/install_mysql" },
          { text: "安装 MinIO", link: "/start/install_minio" },
          { text: "安装 Redis", link: "/start/install_redis" },
          { text: "修改配置文件", link: "/start/init_env" },
          { text: "初始化数据", link: "/start/initdb" },
          { text: "配置系统字典", link: "/start/dict" },
          { text: "本地启动", link: "/start/start" },
        ],
      },
      {
        text: "系统部署",
        collapsed: false,
        items: [
          { text: "安装 Nginx", link: "/publish/install_nginx" },
        ],
      },
    ],

    // socialLinks: [
    //   { icon: "github", link: "https://github.com/vuejs/vitepress" }
    // ],
  }
})
