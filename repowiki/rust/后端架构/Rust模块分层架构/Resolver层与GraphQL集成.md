# Resolver层与GraphQL集成


**本文档引用的文件**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs)
- [usr_service.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_service.rs)
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_model.rs)
- [schema.rs](https://github.com/sail-sail/nest/blob/main/rust\schema.rs)


## 目录
1. [简介](#简介)
2. [Resolver层架构概述](#resolver层架构概述)
3. [查询与变更操作实现分析](#查询与变更操作实现分析)
4. [参数解包与上下文传递机制](#参数解包与上下文传递机制)
5. [认证与权限验证处理](#认证与权限验证处理)
6. [GraphQL Schema与Rust代码映射关系](#graphql-schema与rust代码映射关系)
7. [实际GraphQL查询示例](#实际graphql查询示例)
8. [结论](#结论)

## 简介
Resolver层作为GraphQL接口的核心组件，负责将GraphQL查询请求转换为对后端Service层的调用。该层实现了查询解析、参数处理、权限验证和响应构建等关键功能，是前后端数据交互的桥梁。

## Resolver层架构概述

```mermaid
graph TD
A[GraphQL客户端] --> B[Resolver层]
B --> C[Service层]
C --> D[DAO层]
D --> E[数据库]
B --> F[权限验证模块]
B --> G[上下文管理]
C --> H[业务逻辑处理]
```

**图示来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L1-L602)
- [usr_service.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_service.rs#L1-L415)

**本节来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L1-L602)

## 查询与变更操作实现分析

### 查询操作实现
`find_all_usr`函数实现了用户列表查询功能，接收搜索条件、分页和排序参数，调用Service层进行数据检索。

```mermaid
sequenceDiagram
participant Client as GraphQL客户端
participant Resolver as Resolver层
participant Service as Service层
participant DAO as DAO层
Client->>Resolver : 发送查询请求
Resolver->>Resolver : 参数验证与处理
Resolver->>Service : 调用find_all_usr
Service->>DAO : 执行数据库查询
DAO-->>Service : 返回查询结果
Service-->>Resolver : 返回处理后的数据
Resolver->>Resolver : 敏感字段处理
Resolver-->>Client : 返回最终响应
```

**图示来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L15-L45)
- [usr_service.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_service.rs#L50-L70)

### 变更操作实现
`creates_usr`函数处理用户创建请求，体现了变更操作的特点：需要权限验证、输入处理和事务管理。

```mermaid
sequenceDiagram
participant Client as GraphQL客户端
participant Resolver as Resolver层
participant Permit as 权限验证
participant Service as Service层
Client->>Resolver : 发送创建请求
Resolver->>Resolver : 请求日志记录
Resolver->>Permit : 执行权限检查
Permit-->>Resolver : 验证结果
Resolver->>Resolver : 输入参数处理
Resolver->>Service : 调用creates_usr
Service-->>Resolver : 返回创建结果
Resolver-->>Client : 返回成功响应
```

**图示来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L250-L280)
- [usr_service.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_service.rs#L200-L220)

**本节来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L15-L300)
- [usr_service.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_service.rs#L50-L250)

## 参数解包与上下文传递机制

### 参数解包流程
Resolver层接收GraphQL查询中的参数，并将其转换为Service层可处理的格式。

```mermaid
flowchart TD
A[GraphQL参数] --> B{参数类型判断}
B --> |搜索条件| C[UsrSearch结构体]
B --> |分页信息| D[PageInput结构体]
B --> |排序信息| E[SortInput结构体]
B --> |输入数据| F[UsrInput结构体]
C --> G[参数验证]
D --> G
E --> G
F --> G
G --> H[调用Service层]
```

**图示来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L20-L50)
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_model.rs#L500-L600)

### 上下文传递
通过Options参数传递请求上下文信息，包括认证信息、租户ID等。

```mermaid
classDiagram
class Options {
+String req_id
+String auth_id
+String tenant_id
+String org_id
}
class UsrResolver {
+find_all_usr(search, page, sort, options)
+creates_usr(inputs, options)
}
class UsrService {
+find_all_usr(search, page, sort, options)
+creates_usr(inputs, options)
}
Options --> UsrResolver : "传递"
Options --> UsrService : "传递"
UsrResolver --> UsrService : "调用"
```

**图示来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L15-L25)
- [usr_service.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_service.rs#L10-L20)
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_model.rs#L1-L50)

**本节来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L15-L100)
- [usr_service.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_service.rs#L10-L50)
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_model.rs#L1-L100)

## 认证与权限验证处理

### 权限验证流程
Resolver层在执行敏感操作前进行权限验证，确保操作的合法性。

```mermaid
flowchart TD
A[接收到请求] --> B{是否为敏感操作?}
B --> |是| C[调用use_permit]
B --> |否| D[直接执行]
C --> E[检查权限配置]
E --> F{是否有权限?}
F --> |是| G[执行操作]
F --> |否| H[抛出异常]
G --> I[返回结果]
H --> I
```

**图示来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L260-L270)
- [usr_service.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_service.rs#L210-L220)

### 认证信息处理
在Resolver层处理认证相关信息，确保操作的安全性。

```mermaid
sequenceDiagram
participant Client as 客户端
participant Resolver as Resolver
participant Context as 上下文
participant Service as Service
Client->>Resolver : 发送带认证的请求
Resolver->>Context : 获取认证ID
Context-->>Resolver : 返回auth_id
Resolver->>Resolver : 验证权限(use_permit)
Resolver->>Service : 调用业务方法
Service->>DAO : 执行数据库操作
DAO-->>Service : 返回结果
Service-->>Resolver : 返回处理结果
Resolver-->>Client : 返回响应
```

**图示来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L250-L280)
- [usr_service.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_service.rs#L200-L230)

**本节来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L250-L300)
- [usr_service.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_service.rs#L200-L250)

## GraphQL Schema与Rust代码映射关系

### 类型定义映射
GraphQL Schema中的类型与Rust结构体之间的对应关系。

```mermaid
classDiagram
class UsrModel {
+id : UsrId
+lbl : String
+username : String
+role_ids : Vec~RoleId~
+is_enabled : u8
}
class UsrSearch {
+id : Option~UsrId~
+username : Option~String~
+is_enabled : Option~Vec~u8~~
}
class UsrInput {
+id : Option~UsrId~
+lbl : Option~String~
+username : Option~String~
}
class Query {
+find_all_usr(search : UsrSearch, page : PageInput, sort : Vec~SortInput~) : Vec~UsrModel~
+find_by_id_usr(id : UsrId) : Option~UsrModel~
}
class Mutation {
+creates_usr(inputs : Vec~UsrInput~) : Vec~UsrId~
+update_by_id_usr(id : UsrId, input : UsrInput) : UsrId
}
Query --> UsrModel : "返回"
Query --> UsrSearch : "接收"
Mutation --> UsrInput : "接收"
Mutation --> UsrModel : "返回"
```

**图示来源**  
- [schema.rs](https://github.com/sail-sail/nest/blob/main/rust\schema.rs#L1-L36)
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_model.rs#L50-L150)
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L15-L30)

### 字段映射规则
GraphQL字段与Rust字段的命名转换规则。

| GraphQL字段名 | Rust字段名 | 转换规则 |
|--------------|-----------|---------|
| img | img | 直接映射 |
| lbl | lbl | 直接映射 |
| username | username | 直接映射 |
| role_ids | role_ids | 直接映射 |
| is_locked | is_locked | 直接映射 |

**本节来源**  
- [schema.rs](https://github.com/sail-sail/nest/blob/main/rust\schema.rs#L1-L36)
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_model.rs#L50-L200)

## 实际GraphQL查询示例

### 查询用户列表
```graphql
query {
  find_all_usr(
    search: {
      username_like: "admin"
      is_enabled: [1]
    }
    page: {
      page: 1
      size: 10
    }
    sort: [
      {
        field: "create_time"
        order: "DESC"
      }
    ]
  ) {
    id
    lbl
    username
    create_time_lbl
    update_time_lbl
  }
}
```

### 创建用户
```graphql
mutation {
  creates_usr(
    inputs: [
      {
        lbl: "新用户"
        username: "newuser"
        password: "password123"
        role_ids: ["1"]
        dept_ids: ["1"]
      }
    ]
  )
}
```

### 更新用户
```graphql
mutation {
  update_by_id_usr(
    id: "1"
    input: {
      lbl: "更新后的名称"
      is_enabled: 1
    }
  )
}
```

**本节来源**  
- [usr_resolver.rs](https://github.com/sail-sail/nest/blob/main/rust\generated\base\usr\usr_resolver.rs#L15-L300)

## 结论
Resolver层作为GraphQL接口的入口，承担着请求解析、权限验证、参数处理和响应构建的重要职责。通过清晰的分层设计和规范的实现模式，确保了系统的安全性和可维护性。开发者在使用时应遵循既定的模式，正确处理参数、权限和上下文信息，以保证系统的稳定运行。