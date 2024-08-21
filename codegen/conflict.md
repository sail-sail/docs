# 生成代码跟手写代码冲突处理

1. 在执行 `npm run codegen` 或者 `nr codegen` 生成代码时, 如果生成的代码跟手写的代码有冲突且无法自动合并, 则需要手动处理冲突

2. 例如:
  发生冲突时, 会自动打开 vscode 的文件对比工具, 对比 `__out__` 目录下的文件和 `src` 目录下的文件
  
![codegen_conflict1](/img/codegen_conflict1.jpg)

3. 然后再手动点击 `git` 的 对比工具, 左右对比生成代码修改了哪些, 自己手动改的代码修改了哪些, 即可合理处理冲突
  
![codegen_conflict2](/img/codegen_conflict2.jpg)