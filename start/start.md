# 系统启动

1. 启动后端服务: `cmd` 进入 `deno` 目录, 执行
    
    ```bash
    npm run start
    ```
    
    或者
    
    ```bash
    nr start
    ```

2. 启动 `电脑端前端` 服务: `cmd` 进入 `pc` 目录, 执行
    
    ```bash
    npm run start
    ```
    
    或者
    
    ```bash
    nr start
    ```

3. 启动 `移动端前端` 服务: `cmd` 进入 `uni` 目录, 执行
    
    ```bash
    npm run dev:h5
    ```
    
    或者
    
    ```bash
    nr start
    ```
    
4. 如果需要启动 `微信小程序` 的调试服务: `cmd` 进入 `uni` 目录, 执行
    
    ```bash
    npm run start
    ```
    
    或者
    
    ```bash
    nr start
    ```
    
    - 然后在微信开发者工具中打开 `uni/dist/dev/mp-weixin` 目录
    - 注意: 如果需要 `微信模块`, 则需要 git 合并微信模块分支: `git merge deno4wx`
    - 然后到数据库执行 `codegen/src/tables/wx/wx.sql` 文件, 生成微信模块的数据表
    - 再执行 `nr importCsv wx/*` 导入微信模块的初始数据