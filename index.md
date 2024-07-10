---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "低代码开发框架"
  tagline: 基于编译时的自动生成代码框架
  actions:
    - theme: brand
      text: 开发手册
      link: /readme

features:
  - title: 自动生代码
    details: npm run codegen 即可根据表结构和 config.ts 的配合自动生成前后端代码
  - title: 智能系统字典和业务字典
    details: 建表时指定业务字典活系统字典, 生成代码的时候自动生成相关代码, 下拉框等
  - title: 量身定制的ORM框架
    details: 创建外键关联配置, 生成代码之后, 会给每个表生成 dao层, 方便业务层调用
---
