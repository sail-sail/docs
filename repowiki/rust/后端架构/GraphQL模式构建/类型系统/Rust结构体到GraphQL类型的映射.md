# Rust结构体到GraphQL类型的映射


**本文档引用的文件**  
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/base/usr/usr_model.rs)
- [usr_graphql.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/base/usr/usr_graphql.rs)
- [id.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/common/id.rs)
- [context.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/common/context.rs)


## 目录
1. [简介](#简介)
2. [Rust结构体与GraphQL类型映射机制](#rust结构体与graphql类型映射机制)
3. [字段类型转换规则](#字段类型转换规则)
4. [serde与async-graphql派生宏的使用](#serde与async-graphql派生宏的使用)
5. [对象类型与输入类型的注册过程](#对象类型与输入类型的注册过程)
6. [模型层与GraphQL模式的绑定机制](#模型层与graphql模式的绑定机制)
7. [字段映射代码示例](#字段映射代码示例)
8. [编译时类型检查工作原理](#编译时类型检查工作原理)

## 简介
本文档详细解释了Rust结构体如何映射到GraphQL类型，以`usr_model.rs`中的`User`结构体为例，说明字段类型转换规则、serde和async-graphql派生宏的使用方式，以及模型层与GraphQL模式的绑定机制。

## Rust结构体与GraphQL类型映射机制
Rust结构体通过使用`async-graphql`库中的派生宏（如`#[SimpleObject]`、`#[InputObject]`）来映射到GraphQL类型。这些宏在编译时生成必要的代码，将Rust结构体转换为GraphQL对象类型或输入类型。

**Section sources**
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/base/usr/usr_model.rs#L100-L143)

## 字段类型转换规则
Rust类型与GraphQL类型的转换遵循以下规则：
- `String` → `String`
- `i64` → `Int`
- `u32` → `Int`
- `bool` → `Boolean`
- `Option<T>` → 可为空的GraphQL类型
- 自定义类型（如`UsrId`）通过实现`ScalarType` trait映射为GraphQL标量类型

**Section sources**
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/base/usr/usr_model.rs#L100-L143)
- [id.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/common/id.rs#L52-L96)

## serde与async-graphql派生宏的使用
`serde`和`async-graphql`派生宏用于自动生成序列化和反序列化代码。`serde`宏处理JSON序列化，而`async-graphql`宏处理GraphQL类型的生成。

```rust
#[derive(SimpleObject, Default, Serialize, Deserialize, Clone, Debug)]
#[graphql(rename_fields = "snake_case", name = "UsrModel")]
pub struct UsrModel {
    pub id: UsrId,
    pub username: String,
    // 其他字段...
}
```

**Section sources**
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/base/usr/usr_model.rs#L100-L143)

## 对象类型与输入类型的注册过程
通过`#[Object]`和`#[InputObject]`属性，Rust结构体被注册为GraphQL对象类型和输入类型。`#[Object]`用于查询和突变，`#[InputObject]`用于输入参数。

```rust
#[derive(InputObject, Default)]
#[graphql(rename_fields = "snake_case", name = "UsrInput")]
pub struct UsrInput {
    pub id: Option<UsrId>,
    pub username: Option<String>,
    // 其他字段...
}
```

**Section sources**
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/base/usr/usr_model.rs#L759-L818)

## 模型层与GraphQL模式的绑定机制
模型层通过`usr_graphql.rs`中的查询和突变实现与GraphQL模式绑定。查询和突变函数使用`async-graphql`的`Context`来访问数据库和业务逻辑。

```rust
#[Object(rename_args = "snake_case")]
impl UsrGenQuery {
    #[graphql(name = "findAllUsr")]
    async fn find_all_usr(
        &self,
        ctx: &Context<'_>,
        search: Option<UsrSearch>,
        page: Option<PageInput>,
        sort: Option<Vec<SortInput>>,
    ) -> Result<Vec<UsrModel>> {
        // 实现...
    }
}
```

**Section sources**
- [usr_graphql.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/base/usr/usr_graphql.rs#L30-L60)

## 字段映射代码示例
以下示例展示了`UsrModel`结构体中的字段如何映射到GraphQL类型：

```rust
#[derive(SimpleObject, Default, Serialize, Deserialize, Clone, Debug)]
#[graphql(rename_fields = "snake_case", name = "UsrModel")]
pub struct UsrModel {
    #[graphql(name = "id")]
    pub id: UsrId,
    #[graphql(name = "username")]
    pub username: String,
    #[graphql(name = "is_enabled")]
    pub is_enabled: u8,
    // 其他字段...
}
```

**Section sources**
- [usr_model.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/base/usr/usr_model.rs#L100-L143)

## 编译时类型检查工作原理
编译时类型检查通过Rust的类型系统和`async-graphql`的宏实现。宏在编译时生成类型安全的代码，确保GraphQL模式与Rust结构体一致。如果类型不匹配，编译将失败。

**Section sources**
- [id.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/common/id.rs#L184-L235)
- [context.rs](https://github.com/sail-sail/nest/blob/main/rust/generated/common/context.rs#L1408-L1430)