# 修改相关配置文件

1. `deno/.env.dev` 文件, 为开发环境配置文件:
    
    - `server_port`: 服务端口
    
    - `server_tokentimeout`: token 过期时间, 单位秒, 可任意时间长度
    
    - `server_title`: `eams4dev` 服务标题固定为 `[项目名]4dev`
    
    - `server_i18n_enable`: 是否启用国际化, `true` 启用, `false` 不启用, 需同时配置前端国际化 `pc/.env` 等文件的 `VITE_SERVER_I18N_ENABLE`
    
    - `database_*`: 数据库相关配置, 其中 `database_crypto_key_path` 为数据库加密密钥文件路径, 当指定某些表的某些字段需要脱敏时, 会使用该密钥进行加密和解密, 服务器中的密钥文件也需要手动上传到服务器中, 里面的内容为 `16` 位随机字符串
    
    - `database_dw_*`(可选): 数据仓库相关配置, 用于制作报表等聚合查询业务时使用, 在 `service` 层中使用 `query_dw` 方法传入 `sql` 语句进行查询
    
    - `cache_*`: `redis` 缓存相关配置, 默认本地不启用缓存, `生产环境` 开启缓存, 开启缓存后, 只有 `admin` 管理员才能手动清除缓存, 若没有手动执行过 `sql` 语句, 则一般不需要手动清除缓存
    
    - `cache_x_request_id = "x_request_id"`: 请求头中的 `x_request_id` 字段名, 用于记录请求日志, 如果需要 `多实例` 启动, 则需要在 `生产环境` 中放开这个配置的注释
    
    - `tmpfile_*`: 临时文件相关配置, 用于存放临时文件, 如图片服务器切割图片后的临时图片等

2. `deno/.env.test` 文件, 为 `测试环境` 配置文件
    - 其中 `tmpfile_bucket` 固定为 `tmpfile4[项目名]4[环境名]`, 例如: `tmpfile4eams4test`, `tmpfile4eams4prod`
    
2. `deno/.env.prod` 文件, 为 `生产环境` 配置文件