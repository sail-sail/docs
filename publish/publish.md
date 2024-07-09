# 编译, 发布系统到服务器

1. 在源代码中创建文件 `deno/lib/script/publish_cnf.js`
    
    ```javascript
    
    // 测试库
    exports.eams4test = {
      host: "39.104.15.113",
      username: "root",
      password: "[操作系统密码]",
      publishBase: "/data/",
    };
    
    // 正式库
    exports.eams4prod = {
      host: "39.104.15.113",
      username: "root",
      password: "[操作系统密码]",
      publishBase: "/data/",
    };
    
    ```

2. 进入系统目录 (`deno` 目录的上一层), 执行发布命令
    
    ```bash
    
    # 发布到测试库
    npm run build-test
    # 或者
    nr build-test
    
    # 发布到正式库
    npm run build-prod
    # 或者
    nr build-prod
    
    ```
    
    - 第一次编译, 会自动下载 `deno` 的二进制文件, 可进行科学上网处理
    - 若报错 `raw.githubusercontent.com` 无法连接网络, 可修改 `hosts` 文件, 添加 `185.199.108.133 raw.githubusercontent.com`
