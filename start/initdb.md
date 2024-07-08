# 初始化数据

1. 所有的初始化数据都在 `codegen/tables/` 目录下
2. `[模块名]/[模块名].sql` 为模块的表结构, `[模块名]/[模块名].ts` 为表的配置文件, 系统将根据数据库里面的表结构和配置文件生成代码
3. 每个表对应一个文件，文件名为表名，如 `base_menu` 表对应的文件为 `base/menu.sql.csv`
4. 创建文件 `codegen/tables/eams/base_menu.eams.sql.csv`，内容如下：
  
    ```csv
    id,parent_id,lbl,route_path,route_query,is_enabled,order_by
    AEK9E7ZTTV+ZTXNpx73AOg,,电子档案,,,1,9001
    RbDAFq7CTzuAaxQP12fSCQ,AEK9E7ZTTV+ZTXNpx73AOg,单位,/eams/company,,1,9002
    KbZS6RW5TaK4rZGVBUXMfQ,AEK9E7ZTTV+ZTXNpx73AOg,全宗设置,/eams/archive,,1,9003
    ```
  
  - 其中: `id` 号为 `22` 位长度的, 区分大小写的 `uuid`, 执行 `npm run uuid` 或者 `nr uuid` 可以生成一个 `uuid`
  
5. 执行 `npm run initdb` 或者 `nr initdb` 生成数据表, 这个命令会根据 `codegen/tables/` 目录下的 `.sql` 文件跟 `.sql.csv` 文件生成数据表导入初始化数据

6. 执行 `npm run importCsv -- base/*` 或者 `nr importCsv base/*` 导入菜单数据
    - 此时会自动生成 `base_role_menu.eams.sql.csv` 文件跟 `base_tenant_menu.eams.sql.csv` 文件, 这 2 个文件需要提交到代码仓库
    - 同时导入这个模块的 `.sql.csv` 文件到数据库, 已经存在的数据不会修改, 不存在的数据会自动插入

7. 创建数据库表的规则可参考 `codegen/tables/base/base.sql` 文件

8. 在 `codegen/tables/tables.ts` 文件中增加 `eams` 模块
    ```ts
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
9. 如需给表的某个字段配置 `业务字段` 或者 `系统字典`, 参考 [配置系统字段](./dict)
9. 执行 `npm run codegen` 或者 `nr codegen` 生成代码
