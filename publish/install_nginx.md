# 服务器安装 Nginx


1. 更新软件包列表
    ```bash
    sudo apt update
    ```
  
2. 安装 Nginx
    ```bash
    sudo apt install nginx
    ```

3. 启动 Nginx
    ```bash
    sudo systemctl start nginx
    ```

4. 查看 Nginx 状态
    ```bash
    sudo systemctl status nginx
    ```

5. 设置 Nginx 开机自启
    ```bash
    sudo systemctl enable nginx
    ```
  
6.  创建配置文件 `/etc/nginx/conf.d/eams4test.conf`
    
```txt
server {
  listen 7601;
  server_name 39.104.15.113;
  location  /     {
    root       /data/eams4test/pc;
    index      index.html;
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 16 64k;
    gzip_http_version 1.1;
    gzip_comp_level 6;
    gzip_types text/plain application/x-javascript text/css application/xml application/javascript;
    gzip_vary on;
  }
  location  /uni     {
    alias       /data/eams4test/uni;
    index      index.html;
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 16 64k;
    gzip_http_version 1.1;
    gzip_comp_level 6;
    gzip_types text/plain application/x-javascript text/css application/xml application/javascript;
    gzip_vary on;
  }
  location  /api     {
    proxy_pass http://localhost:6601/api;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_intercept_errors on;
    client_max_body_size 50M;
  }
  location  /api/websocket/upgrade     {
    proxy_pass http://localhost:6601/api/websocket/upgrade;
	proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_intercept_errors on;
    client_max_body_size 50M;
  }
  location  /graphql     {
    proxy_pass http://localhost:6601/graphql;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_intercept_errors on;
    client_max_body_size 50M;
  }
}
```
  
  - 执行 `sudo nginx -s reload` 重新加载 `Nginx` 配置文件
  - 其中, 假设 `.env.test` 中的 `server_port` 为 `6601`, 对外提供的端口为 `7601`

