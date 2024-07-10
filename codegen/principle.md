# 自动生成代码原理

1. 在最外层目录上执行 `npm run codegen` 或者 `nr codegen` 命令时，会调用 `codegen/src/codegen.ts`

2. `codegen` 工程即为自动生成代码的工程，它会根据 `codegen/src/template/` 目录中的模板文件
  - `deno/.env.dev` 里面配置的数据链接去查询表的元数据
  ```sql
  select
    t.*
  from information_schema.COLUMNS t
  where
    t.table_schema = (select database())
  order by t.ORDINAL_POSITION
  ```
  - 再结合 `codegen/tables/[模块名]/[模块名].ts` 文件中的配置信息, (可参考 `基础模块` `codegen/tables/base/base.ts`)
  - 生成对应的代码文件到 `codegen/__out__/` 目录下

3. 随后, 自动执行 `git diff ` 命令生成 `__test__.diff` 临时文件, 如果生成的时候模板报错, 则会把编译后的js源码写入文件 `error.js` 临时文件中

4. 自动执行 `git apply __test__.diff` 命令，将 `__test__.diff` 文件中的内容应用到当前工程的各个目录下

5. 最后, 自动执行 `npm run gqlGen` 命令, 将根据所有 `graphql` 文件生成对应的 `graphql` 类型文件 `type.ts` 到后端, 前端的类型
    - 注意所有的外键关联 `id` 都不再是 `String` 类型, 而是对应的ID类型, 例如 `UsrId`, `RoleId` 等等
