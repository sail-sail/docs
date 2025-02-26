### 开发环境准备

1. [安装开发环境](/start/install.md)

2. 创建数据库 `测试库`, 打开 `mysqlworkbench` 连接数据库，创建数据库 `zzj4jz4test` ，sql 如下:
  
  ```sql
  -- 创建数据库
  CREATE DATABASE IF NOT EXISTS zzj4jz4test CHARSET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
  -- 创建用户
  create user 'zzj4jz4test'@'%' identified by '[密码]';
  -- 设置用户密码不过期
  ALTER USER 'zzj4jz4test'@'%' IDENTIFIED BY '[密码]' PASSWORD EXPIRE NEVER;
  -- 给用户授权
  grant drop,index,select,insert,update,delete,execute,alter,create,references,lock tables on zzj4jz4test.* to 'zzj4jz4test'@'%';
  -- 刷新权限
  flush privileges;
  ```
  
  注: `[密码]` 可以到 [https://suijimimashengcheng.bmcx.com](https://suijimimashengcheng.bmcx.com/) 随机生成一个密码

3. 从 `github` 上下载项目代码，地址为 [https://github.com/sail-sail/nest/tree/rust](https://github.com/sail-sail/nest/tree/rust)
  
  注: 这次我们使用的是 `rust` 语言来开发项目, 请确保你的电脑上已经安装了 `rust` 环境, 如果没有安装, 请参考 [https://rust.p2hp.com](https://rust.p2hp.com) 安装 `rust` 环境
  
  `main` 分支的 `deno` 则是另外一个后端语言 `Typescript` 选择
  
4. 从 `rust` 分支上创建一个新的分支，分支名为 `zzj4jz` ，并切换到 `zzj4jz` 分支

5. 配置项目名跟数据库相关配置

  - 打开项目根目录下的 `.env` 文件，修改数据库相关配置
  
  ```env
  RUST_LOG="zzj4jz=info"
  
  server_title = "zzj4jz4dev"
  database_type = "mysql"
  database_hostname = "[数据库IP地址]"
  database_port = [数据库端口]
  database_username = "zzj4jz4test"
  database_password = "[密码]"
  database_name = "zzj4jz4test"
  
  # 附件 用于存储图片、文件等
  oss_type = "minio"
  oss_endpoint = "[minio服务IP地址加端口]"
  oss_accesskey = "[minio服务accesskey]"
  oss_secret = "[minio服务secret]"
  oss_bucket = "zzj4jz4test"
  
  # 缓存, 可不配置, 默认不启用缓存
  cache_enable = false
  cache_type = "redis"
  cache_hostname = "127.0.0.1"
  cache_username = ""
  cache_password = ""
  cache_port = 6379
  cache_db = 0
  
  # 临时文件
  oss_type = "minio"
  oss_endpoint = "[minio服务IP地址加端口]"
  oss_accesskey = "[minio服务accesskey]"
  oss_secret = "[minio服务secret]"
  oss_bucket = "tmpfile4zzj4jz4test"
  ```
  
  - 同理, 配置 `.env.test` 文件
  
  - 配置 `Cargo.toml` 文件
  
  ```toml
  [package]
  name = "zzj4jz"
  version = "0.1.0"
  edition = "2024"
  default-run = "zzj4jz"
  
  [[bin]]
  name = "zzj4jz"
  path = "src/main.rs"
  ```
  
  - 配置 `ecosystem.config.js` 文件
  
  ```js
  module.exports = {
    apps: [{
      name: "zzj4jz4{env}",
      script: "./zzj4jz",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
      },
      env_production: {
      },
    }],
  };
  ```

6. 安装依赖
  - 进入`pc` `rust` `codegen` `uni` 目录下分别执行： `pnpm i`

7. [创建数据库表和初始化数据](/zzj4jz/create_table.md)
  
8. 命令行进入 `rust` 目录，执行 `cargo run` 启动后端服务, 进入 `pc` 目录，执行 `nr start` 或者 `npm run start` 启动前端服务

9. 打开浏览器，输入 `http://localhost:4000` 访问项目