# 安装 MySQL 数据库

1. 准备好 `ubuntu 20` 或者以上的系统
    - 假设外网 IP 为 `39.104.15.113`
2. 安装好 `docker` 和 `docker-compose`
    - [Ubuntu 安装 Docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)
3. 创建 `/data/software/mysql` 目录
4. 在 `/data/software/mysql` 目录下创建 `docker-compose.yml` 文件

    - 假设数据库对外端口为 `33891`，假设数据库 `root`账户的密码为 `5WZuNyFHahIwlizJ`
    - 密码可以到 [https://suijimimashengcheng.bmcx.com](https://suijimimashengcheng.bmcx.com/) 随机生成一个密码
    
    - `/data/software/mysql/docker-compose.yml` 文件内容如下：
```yaml
version: '3'
services:
  mysql:
    image: mysql:8.1
    container_name: mysql
    ports:
      - "33891:3306"
    volumes:
      - ./conf:/etc/mysql/conf.d
      - ./data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=5WZuNyFHahIwlizJ
    security_opt:
      - seccomp:unconfined
```
  - 在 `/data/software/mysql/conf` 目录下创建配置文件 `my.cnf`
  - 设置 `my.cnf` 文件的权限为 `644`: `chmod 644 my.cnf`
  - 在 `my.cnf` 文件中添加如下内容：
```ini
[mysqld]
innodb_buffer_pool_size = 1G
sql_mode = ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
max_connections = 1000
```
5. 如果 `ubuntu` 操作系统是购买的云服务器，需要在云服务器的安全组中开放 `33891` 端口
6. 在 `/data/software/mysql` 目录下执行 `docker-compose up -d` 启动数据库
7. 在 `/data/software/mysql` 目录下执行 `docker-compose down` 停止数据库
8. 在 `/data/software/mysql` 目录下执行 `docker-compose down -v` 删除数据库
9. 在 `/data/software/mysql` 目录下执行 `docker-compose logs -f` 查看数据库启动日志
10. 在 `/data/software/mysql` 目录下执行 `docker-compose exec mysql bash` 进入数据库容器
11. 假设项目名称为 `eams` ，在 `mysqlworkbench` 中连接数据库，创建 `测试库` ，sql 如下:
```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS eams4test CHARSET utf8mb4 COLLATE utf8mb4_0900_ai_ci;;
-- 创建用户
create user 'eams4test'@'%' identified by '5WZuNyFHahIwlizJ';
-- 设置用户密码不过期
ALTER USER 'eams4test'@'%' IDENTIFIED BY '5WZuNyFHahIwlizJ' PASSWORD EXPIRE NEVER;
-- 修改密码策略
ALTER USER 'eams4test'@'%' IDENTIFIED WITH mysql_native_password BY '5WZuNyFHahIwlizJ';
-- 给用户授权
grant drop,index,select,insert,update,delete,execute,alter,create,references,lock tables on eams4test.* to 'eams4test'@'%';
-- 刷新权限
flush privileges;
```
12. 在 `mysqlworkbench` 中连接数据库，创建 `正式库` ，sql 如下:
```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS eams4prod CHARSET utf8mb4 COLLATE utf8mb4_0900_ai_ci;;
-- 创建用户
create user 'eams4prod'@'%' identified by '5WZuNyFHahIwlizJ';
-- 设置用户密码不过期
ALTER USER 'eams4prod'@'%' IDENTIFIED BY '5WZuNyFHahIwlizJ' PASSWORD EXPIRE NEVER;
-- 修改密码策略
ALTER USER 'eams4prod'@'%' IDENTIFIED WITH mysql_native_password BY '5WZuNyFHahIwlizJ';
-- 给用户授权
grant drop,index,select,insert,update,delete,execute,alter,create,references,lock tables on eams4prod.* to 'eams4prod'@'%';
-- 刷新权限
flush privileges;
```