# 安装 Redis 服务

1. 更新软件包列表：`sudo apt update`

2. 安装 Redis 服务：`sudo apt install redis-server`

3. 启动 Redis 服务：`sudo systemctl start redis`

4. 设置 Redis 服务开机自启：`sudo systemctl enable redis`

5. 查看 Redis 服务状态：`sudo systemctl status redis`

6. 查看 Redis 服务端口：`sudo netstat -tulnp | grep redis`, 默认端口为 `6379`
