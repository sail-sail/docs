# 在服务器中安装 nodejs 跟 pm2

1. `ubuntu` 系统中命令行执行以下命令
    
    ```bash
    cd /data/software/

    # 下载 nodejs
    wget https://nodejs.org/dist/v20.17.0/node-v20.17.0-linux-x64.tar.xz

    # 解压
    sudo tar -xvf node-v20.17.0-linux-x64.tar.xz

    # 链接到 /usr/local/bin
    sudo ln -s /data/software/node-v20.17.0-linux-x64/bin/node /usr/local/bin/node
    sudo ln -s /data/software/node-v20.17.0-linux-x64/bin/npm /usr/local/bin/npm
    sudo ln -s /data/software/node-v20.17.0-linux-x64/bin/npx /usr/local/bin/npx

    # 安装 pm2
    sudo npm install -g pm2

    # 链接到 /usr/local/bin
    sudo ln -s /data/software/node-v20.17.0-linux-x64/lib/node_modules/pm2/pm2 /usr/local/bin/pm2
    ```

2. 修改文件 `/data/software/node-v20.17.0-linux-x64/lib/node_modules/pm2/pm2` 内容为:
    
    ```bash
    #!/bin/bash
    
    DIR="$(dirname "$(readlink -f "$0")")"
    $DIR/../../../bin/node $DIR/bin/pm2 $@
    ```

3. `pm2` 设置开机自启动
    
    ```bash
    # 查看是否安装成功
    node -v
    pm2 -v

    # pm2 设置开机自启动
    sudo pm2 startup
    pm2 save
    ```