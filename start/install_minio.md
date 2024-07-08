# 安装 MinIO
1. MinIO 是一个高性能的对象存储服务器，可以存储大量的数据，支持 S3 协议。本文介绍如何在 Linux 系统上安装 MinIO
    - 官网: [https://min.io/](https://min.io/)

2. 检查需要用到的端口 `9000` `50000` 是否被占用
    ```bash
    netstat -tulnp | grep 9000
    netstat -tulnp | grep 50000
    ```

2. 创建一个目录用于存放 MinIO 数据的文件夹
    ```bash
    mkdir -p /data/software/minio
    ```

3. 在 `/data/software/minio` 目录下创建 `docker-compose.yml` 文件
    ```yaml
    version: '3'
    services:
      minio:
        image: minio/minio
        container_name: minio_container
        command: server /data --console-address ":50000" --address=":9000"
        environment:
          MINIO_ROOT_USER: [MinIO登录账号]
          MINIO_ROOT_PASSWORD: [MinIO登录密码]
          MINIO_REGION_NAME: us-east-1
        volumes:
          - ./data:/data
          - ./config:/root/.minio
        ports:
          - "9000:9000"
          - "50000:50000"
    ```
    - `MINIO_ROOT_USER` 和 `MINIO_ROOT_PASSWORD` 是 MinIO 的登录账号和密码，可以自行修改
    - `MinIO登录账号` 和 `MinIO登录密码` 可以到 [https://suijimimashengcheng.bmcx.com](https://suijimimashengcheng.bmcx.com/) 随机生成账号和密码

4. 如果 `ubuntu` 操作系统是购买的云服务器，需要在云服务器的安全组中开放 `9000` `50000` 端口

5. 启动 MinIO
    ```bash
    cd /data/software/minio
    docker-compose up -d
    ```

6. 访问 `http://39.104.15.113:50000`，使用 `MINIO_ROOT_USER` 和 `MINIO_ROOT_PASSWORD` 登录 MinIO
    - `http://39.104.15.113:9000` 是 MinIO 的 S3 协议访问地址
    - `http://39.104.15.113:50000` 是 MinIO 的控制台访问地址
    - 登录之后, 访问 `http://39.104.15.113:50000/access-keys` 点击 `Create Access Key` 添加一个新的 Access Key
    ```
    Access Key: WfLyt5Fkdgpr4YCV
    Secret Key: kluANLzo0ajGutyH
    ```