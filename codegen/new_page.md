# 创建数据库表, 生成新页面

1. 创建数据库
  
  ```sql
  
  -- 测试库
  create database if not exists `eams4test`
  default character set utf8mb4 collate utf8mb4_bin;
  
  -- 正式库
  create database if not exists `eams4prod`
  default character set utf8mb4 collate utf8mb4_bin;
  
  ```

1. 创建或修改文件 `codegen/src/tables/[模块名]/[模块名].sql`
    
    - 例如: `codegen/src/tables/eams/eams.sql`

2. 编写数据库表结构, 并在数据库中执行创建表的sql语句, 例如:
  
  ```sql
  ------------------------------------------------------------------------ 单位
  drop table if exists `eams_company`;
  CREATE TABLE `eams_company` (
    `id` varchar(22) NOT NULL COMMENT 'ID',
    `code` varchar(22) NOT NULL DEFAULT '' COMMENT '编号',
    `lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '名称',
    `is_locked` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '锁定,dict:is_locked',
    `is_enabled` tinyint unsigned NOT NULL DEFAULT 1 COMMENT '启用,dict:is_enabled',
    `order_by` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '排序',
    `rem` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
    `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
    `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
    `create_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '创建人',
    `create_time` datetime DEFAULT NULL COMMENT '创建时间',
    `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
    `update_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '更新人',
    `update_time` datetime DEFAULT NULL COMMENT '更新时间',
    `is_deleted` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
    `delete_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '删除人',
    `delete_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '删除人',
    `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
    INDEX (`code`, `tenant_id`),
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='单位';
  ```
  - `表名` 规范为 `[模块名]_[表名]`, `表名` 为小写, 用 `_` 分隔
  - [数据库建表规范](./create_table)

3. 创建或修改文件 `codegen/src/tables/[模块名]/[模块名].ts`
      
      - 例如: `codegen/src/tables/eams/eams.ts`
      
```typescript
import { defineConfig } from "../../config";

export default defineConfig({
  // 单位
  eams_company: {
    opts: {
      cache: true,
      uniques: [
        [ "code" ],
        [ "lbl" ],
      ],
    },
    columns: [
      {
        COLUMN_NAME: "code",
        width: 140,
        fixed: "left",
      },
      {
        COLUMN_NAME: "lbl",
      },
      {
        COLUMN_NAME: "is_locked",
      },
      {
        COLUMN_NAME: "is_enabled",
      },
      {
        COLUMN_NAME: "order_by",
      },
      {
        COLUMN_NAME: "rem",
      },
      {
        COLUMN_NAME: "create_usr_id",
      },
      {
        COLUMN_NAME: "create_time",
      },
      {
        COLUMN_NAME: "update_usr_id",
      },
      {
        COLUMN_NAME: "update_time",
      },
    ],
  },
});
```
  - 查看配置项 [config.ts](./config)

4. 修改文件 `codegen/src/tables/tables.ts` 增加模块 `eams`

```typescript
import { defineConfig } from "../config";
 
import base from "./base/base";
 
// 电子档案
import eams from "./eams/eams";
 
export default defineConfig({
  
  // 基础模块
  ...base,
  
  // 电子档案
  ...eams,
  
});
```

5. 配置菜单路由, 创建文件 `codegen/tables/eams/base_menu.eams.sql.csv`

```csv
id,parent_id,lbl,route_path,route_query,is_enabled,order_by
AEK9E7ZTTV+ZTXNpx73AOg,,电子档案,,,1,9001
RbDAFq7CTzuAaxQP12fSCQ,AEK9E7ZTTV+ZTXNpx73AOg,单位,/eams/company,,1,9002
KbZS6RW5TaK4rZGVBUXMfQ,AEK9E7ZTTV+ZTXNpx73AOg,全宗设置,/eams/archive,,1,9003
```
  - 其中: `id` 号为 `22` 位长度的, 区分大小写的 `uuid`, 执行 `npm run uuid` 或者 `nr uuid` 可以生成一个 `uuid`

6. 执行命令 `npm run importCsv -- eams/*` 或者 `nr importCsv eams/*` 导入菜单数据

    - 此时会自动生成 `base_role_menu.eams.sql.csv` 文件跟 `base_tenant_menu.eams.sql.csv` 文件, 这 2 个文件需要提交到代码仓库
    - 同时导入这个模块的 `.sql.csv` 文件到数据库, 已经存在的数据不会修改, 不存在的数据会自动插入

7. 如需给表的某个字段配置 `业务字段` 或者 `系统字典`, 参考 [配置系统字段](/start/dict)

8. 执行命令 `npm run codegen` 或者 `nr codegen` 生成代码

9. 查看生成的页面
  
- 浏览器打开 `http://localhost:4000/eams/company`

![new_page1](/img/new_page1.jpg)
