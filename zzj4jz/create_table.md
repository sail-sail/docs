### 创建数据库表和初始化数据

1. 命令行进入项目根目录, 执行 `nr initdb` 或者 `npm run initdb` 初始化数据库表和数据

  - 它会扫描 `codegen/tables/` 目录下的所有 `.sql` 文件, 并执行这些文件, 并且会扫描所有 `.sql.csv` 文件, 并将数据导入到对应的表中
  
2. 创建文件 `codegen/tables/zzj4jz/zzj4jz.sql`

```sql
------------------------------------------------------------------ 产品类别
drop table if exists `zzj4jz_pt_type`;
CREATE TABLE if not exists `zzj4jz_pt_type` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `img` varchar(22) NOT NULL DEFAULT '' COMMENT '图标',
  `code_seq` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '编号-序列号',
  `code` varchar(45) NOT NULL DEFAULT '' COMMENT '编号',
  `lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '名称',
  `is_home` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '首页显示,dict:yes_no',
  `is_recommend` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '推荐,dict:yes_no',
  `is_locked` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '锁定,dict:is_locked',
  `is_enabled` tinyint unsigned NOT NULL DEFAULT 1 COMMENT '启用,dict:is_enabled',
  `order_by` int unsigned NOT NULL DEFAULT 1 COMMENT '排序',
  `rem` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '删除人',
  `delete_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '删除人',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`tenant_id`, `is_deleted`, `code`),
  INDEX (`tenant_id`, `is_deleted`, `lbl`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs COMMENT='产品类别';

------------------------------------------------------------------ 产品
drop table if exists `zzj4jz_pt`;
CREATE TABLE if not exists `zzj4jz_pt` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `img` varchar(100) NOT NULL DEFAULT '' COMMENT '图片',
  `code_seq` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '编号-序列号',
  `code` varchar(45) NOT NULL DEFAULT '' COMMENT '编号',
  `lbl` varchar(80) NOT NULL DEFAULT '' COMMENT '名称',
  `price` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '价格',
  `original_price` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '原价',
  `is_home` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '首页显示,dict:yes_no',
  `is_new` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '新品,dict:yes_no',
  `introduct` varchar(100) NOT NULL DEFAULT '' COMMENT '简介',
  `detail` varchar(200) NOT NULL DEFAULT '' COMMENT '详情',
  `detail_top_img` varchar(200) NOT NULL DEFAULT '' COMMENT '详情顶部图片',
  `detail_bottom_img` varchar(200) NOT NULL DEFAULT '' COMMENT '详情底部图片',
  `is_locked` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '锁定,dict:is_locked',
  `is_enabled` tinyint unsigned NOT NULL DEFAULT 1 COMMENT '启用,dict:is_enabled',
  `order_by` int unsigned NOT NULL DEFAULT 1 COMMENT '排序',
  `rem` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '删除人',
  `delete_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '删除人',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`tenant_id`, `is_deleted`, `lbl`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs COMMENT='产品';

------------------------------------------------------------------ 产品产品类别
drop table if exists `zzj4jz_pt_pt_type`;
CREATE TABLE if not exists `zzj4jz_pt_pt_type` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `pt_id` varchar(22) NOT NULL DEFAULT '' COMMENT '产品',
  `pt_type_id` varchar(22) NOT NULL DEFAULT '' COMMENT '产品类别',
  `order_by` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '排序',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`tenant_id`, `is_deleted`, `pt_id`, `pt_type_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs COMMENT='产品产品类别';

------------------------------------------------------------------ 用户购物车
drop table if exists `zzj4jz_cart`;
CREATE TABLE if not exists `zzj4jz_cart` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '用户',
  `pt_id` varchar(22) NOT NULL DEFAULT '' COMMENT '产品',
  `num` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '数量',
  `rem` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`tenant_id`, `is_deleted`, `pt_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs COMMENT='用户购物车';

------------------------------------------------------------------ 用户地址
drop table if exists `zzj4jz_address`;
CREATE TABLE if not exists `zzj4jz_address` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '用户',
  `lbl` varchar(200) NOT NULL DEFAULT '' COMMENT '地址',
  `name` varchar(45) NOT NULL DEFAULT '' COMMENT '姓名',
  `phone` varchar(45) NOT NULL DEFAULT '' COMMENT '电话',
  `province_code` varchar(10) NOT NULL DEFAULT '' COMMENT '省份编码',
  `province_lbl` varchar(10) NOT NULL DEFAULT '' COMMENT '省份',
  `city_code` varchar(15) NOT NULL DEFAULT '' COMMENT '城市编码',
  `city_lbl` varchar(15) NOT NULL DEFAULT '' COMMENT '城市',
  `county_code` varchar(20) NOT NULL DEFAULT '' COMMENT '省市区编码',
  `county_lbl` varchar(20) NOT NULL DEFAULT '' COMMENT '省市区',
  `address` varchar(100) NOT NULL DEFAULT '' COMMENT '详细地址',
  `is_default` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '默认,dict:yes_no',
  `rem` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`tenant_id`, `is_deleted`, `lbl`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs COMMENT='用户地址';

------------------------------------------------------------------ 订单
drop table if exists `zzj4jz_order`;
CREATE TABLE if not exists `zzj4jz_order` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `lbl_seq` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '订单号-序列号',
  `lbl_date_seq` date DEFAULT NULL COMMENT '订单号-日期',
  `lbl` varchar(20) NOT NULL DEFAULT '' COMMENT '订单号',
  `status` ENUM('ordered', 'completed', 'canceled') NOT NULL DEFAULT 'ordered' COMMENT '状态,dictbiz:order_status',
  `usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '下单人',
  `name` varchar(45) NOT NULL DEFAULT '' COMMENT '姓名',
  `phone` varchar(45) NOT NULL DEFAULT '' COMMENT '电话',
  `address_id` varchar(22) NOT NULL DEFAULT '' COMMENT '地址',
  `address_id_lbl` varchar(200) NOT NULL DEFAULT '' COMMENT '地址',
  `amt` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '金额',
  `payed_amt` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '已支付金额',
  `province_code` varchar(10) NOT NULL DEFAULT '' COMMENT '省份编码',
  `province_lbl` varchar(10) NOT NULL DEFAULT '' COMMENT '省份',
  `city_code` varchar(15) NOT NULL DEFAULT '' COMMENT '城市编码',
  `city_lbl` varchar(15) NOT NULL DEFAULT '' COMMENT '城市',
  `county_code` varchar(20) NOT NULL DEFAULT '' COMMENT '省市区编码',
  `county_lbl` varchar(20) NOT NULL DEFAULT '' COMMENT '省市区',
  `address` varchar(100) NOT NULL DEFAULT '' COMMENT '详细地址',
  `rem` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`tenant_id`, `is_deleted`, `lbl`, `usr_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs COMMENT='订单';

------------------------------------------------------------------ 订单明细
drop table if exists `zzj4jz_order_detail`;
CREATE TABLE if not exists `zzj4jz_order_detail` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `order_id` varchar(22) NOT NULL DEFAULT '' COMMENT '订单',
  `pt_id` varchar(22) NOT NULL DEFAULT '' COMMENT '产品',
  `num` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '数量',
  `price` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '价格',
  `amt` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '金额',
  `rem` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_usr_id_lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`tenant_id`, `is_deleted`, `order_id`, `pt_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs COMMENT='订单明细';
```

3. 把建表语句复制到 `workbench` 中执行

4. 创建文件 `codegen/tables/zzj4jz/base_dictbiz.zzj4jz.sql.csv` 用于初始化`业务字典`

```csv
id,code,lbl,type,order_by,tenant_id,is_sys,is_add
IuMhUG6HSEy5h7AUYhoCIw,order_status,订单-状态,string,1,ZDbZlC1OT8KaDg6soxMCBQ,1,0
```
  
  - 注: `id` 可在命令行执行 `nr uuid` 或者 `npm run uuid` 生成, 也可 `nr uuid 5` 同时生成 5 个 `id`
  
  - 可用vscode的 `csv` 插件查看和编辑 `.csv` 文件
  
  - `is_sys` 为 1 时代表是系统数据, 不可删除, 且前后端会自动生成枚举代码
  
  - `is_add` 为 1 时代表是否用户可以自己添加业务字典明细
  
  - 显然, 这里的订单状态是系统数据, 用户不可删除, 且前后端会自动生成枚举代码来给业务逻辑操作, 也不允许让用户自行添加新的订单状态

5. 创建文件 `codegen/tables/zzj4jz/base_dictbiz_detail.zzj4jz.sql.csv` 用于初始化`业务字典明细`

```csv
id,dictbiz_id,_dictbiz_lbl,lbl,val,order_by,tenant_id,is_sys
kQgpSJSxRBWQCyytN90WKg,IuMhUG6HSEy5h7AUYhoCIw,订单-状态,已下单,ordered,1,ZDbZlC1OT8KaDg6soxMCBQ,1
8OyihOV4QUCI6O/ZNcJCaQ,IuMhUG6HSEy5h7AUYhoCIw,,已完成,completed,2,ZDbZlC1OT8KaDg6soxMCBQ,1
QDfyMK5GQ9KQkOtucQWNHw,IuMhUG6HSEy5h7AUYhoCIw,,已取消,canceled,3,ZDbZlC1OT8KaDg6soxMCBQ,1
```

5. 在命令行根目录中执行 `nr importCsv zzj4jz/*` 导入 `zzj4jz` 目录下的所有 `.sql.csv` 文件

6. 创建文件 `codegen/tables/zzj4jz/zzj4jz.ts` 用户配置哪些表需要生成代码

```ts
import { defineConfig } from "../../config.ts";

export default defineConfig({
  // 产品类别
  zzj4jz_pt_type: {
    opts: {
      cache: true,
      uniques: [
        [ "lbl" ],
      ],
    },
    columns: [
      {
        COLUMN_NAME: "code_seq",
        onlyCodegenDeno: true,
      },
      {
        COLUMN_NAME: "code",
        align: "center",
        width: 120,
        readonly: true,
        readonlyPlaceholder: "(自动生成)",
        autoCode: {
          prefix: "CPLB",
          seq: "code_seq",
          seqPadStart0: 3,
        },
      },
      {
        COLUMN_NAME: "lbl",
        align: "center",
        fixed: false,
      },
      {
        COLUMN_NAME: "is_home",
        isSwitch: false,
      },
      {
        COLUMN_NAME: "is_recommend",
      },
      {
        COLUMN_NAME: "is_locked",
      },
      {
        COLUMN_NAME: "is_enabled",
      },
      {
        COLUMN_NAME: "order_by",
      },
      {
        COLUMN_NAME: "rem",
      },
      {
        COLUMN_NAME: "create_usr_id",
      },
      {
        COLUMN_NAME: "create_time",
      },
      {
        COLUMN_NAME: "update_usr_id",
      },
      {
        COLUMN_NAME: "update_time",
      },
    ], 
  },
  // 产品
  zzj4jz_pt: {
    opts: {
      uniques: [
        [ "lbl" ],
      ],
    },
    columns: [
      {
        COLUMN_NAME: "img",
      },
      {
        COLUMN_NAME: "code_seq",
        onlyCodegenDeno: true,
      },
      {
        COLUMN_NAME: "code",
        align: "center",
        width: 120,
        readonly: true,
        readonlyPlaceholder: "(自动生成)",
        autoCode: {
          prefix: "CP",
          seq: "code_seq",
          seqPadStart0: 3,
        },
        fixed: "left",
      },
      {
        COLUMN_NAME: "lbl",
        align: "center",
      },
      {
        COLUMN_NAME: "pt_type_ids",
        require: false,
        COLUMN_COMMENT: "产品类别",
        search: true,
        foreignKey: {
          showType: "tag",
        },
      },
      {
        COLUMN_NAME: "price",
      },
      {
        COLUMN_NAME: "original_price",
      },
      {
        COLUMN_NAME: "is_home",
      },
      {
        COLUMN_NAME: "is_new",
      },
      {
        COLUMN_NAME: "introduct",
      },
      {
        COLUMN_NAME: "detail",
      },
      {
        COLUMN_NAME: "detail_top_img",
      },
      {
        COLUMN_NAME: "detail_bottom_img",
      },
      {
        COLUMN_NAME: "is_locked",
      },
      {
        COLUMN_NAME: "is_enabled",
      },
      {
        COLUMN_NAME: "order_by",
      },
      {
        COLUMN_NAME: "rem",
      },
      {
        COLUMN_NAME: "create_usr_id",
      },
      {
        COLUMN_NAME: "create_time",
      },
      {
        COLUMN_NAME: "update_usr_id",
      },
      {
        COLUMN_NAME: "update_time",
      },
    ],
  },
  // 用户购物车
  zzj4jz_cart: {
    opts: {
      uniques: [
        [ "usr_id", "pt_id" ],
      ],
    },
    columns: [
      {
        COLUMN_NAME: "usr_id",
        foreignKey: {
          selectType: "selectInput",
        },
      },
      {
        COLUMN_NAME: "pt_id",
        foreignKey: {
          selectType: "selectInput",
        },
      },
      {
        COLUMN_NAME: "num",
      },
      {
        COLUMN_NAME: "rem",
      },  
      {
        COLUMN_NAME: "create_time",
      },
      {
        COLUMN_NAME: "update_time",
      },
    ],
  },
  // 用户地址
  zzj4jz_address: {
    opts: {
      uniques: [
        [ "usr_id", "name" ],
      ],
    },
    columns: [
      {
        COLUMN_NAME: "usr_id",
        foreignKey: {
          selectType: "selectInput",
        },
      },
      {
        COLUMN_NAME: "lbl",
        fixed: false,
      },
      {
        COLUMN_NAME: "name",
        width: 120,
      },
      {
        COLUMN_NAME: "phone",
        width: 120,
      },
      {
        COLUMN_NAME: "province_code",
      },
      {
        COLUMN_NAME: "province_lbl",
      },
      {
        COLUMN_NAME: "city_code",
      },
      {
        COLUMN_NAME: "city_lbl",
      },
      {
        COLUMN_NAME: "county_code",
      },
      {
        COLUMN_NAME: "county_lbl",
        require: true,
      },
      {
        COLUMN_NAME: "address",
        require: true,
      },
      {
        COLUMN_NAME: "is_default",
      },
      {
        COLUMN_NAME: "rem",
      },
      {
        COLUMN_NAME: "create_usr_id",
      },
      {
        COLUMN_NAME: "create_time",
      },
      {
        COLUMN_NAME: "update_usr_id",
      },
      {
        COLUMN_NAME: "update_time",
      },
    ],
  },
  // 订单
  zzj4jz_order: {
    opts: {
      defaultSort: {
        order: "descending",
        prop: "lbl",
      },
      inlineForeignTabs: [
        {
          mod: "zzj4jz",
          table: "order_detail",
          label: "订单明细",
          column: "order_id",
        },
      ],
    },
    columns: [
      {
        COLUMN_NAME: "lbl_seq",
        onlyCodegenDeno: true,
      },
      {
        COLUMN_NAME: "lbl",
        align: "center",
        width: 120,
        readonly: true,
        readonlyPlaceholder: "(自动生成)",
        autoCode: {
          prefix: "DD",
          seq: "lbl_seq",
          seqPadStart0: 3,
        },
      },
      {
        COLUMN_NAME: "status",
        width: 120,
        search: true,
      },
      {
        COLUMN_NAME: "usr_id",
      },
      {
        COLUMN_NAME: "name",
        width: 120,
      },
      {
        COLUMN_NAME: "phone",
        width: 120,
      },
      {
        COLUMN_NAME: "address_id",
        modelLabel: "address_id_lbl",
        width: 220,
        foreignKey: {
          selectType: "selectInput",
        },
      },
      {
        COLUMN_NAME: "amt",
        prefix: "￥",
      },
      {
        COLUMN_NAME: "payed_amt",
        prefix: "￥",
      },
      {
        COLUMN_NAME: "province_code",
        isProvinceCode: false,
        onlyCodegenDeno: true,
        onlyCodegenDenoButApi: true,
      },
      {
        COLUMN_NAME: "province_lbl",
        isProvinceLbl: false,
        onlyCodegenDeno: true,
        onlyCodegenDenoButApi: true,
      },
      {
        COLUMN_NAME: "city_code",
        isCityCode: false,
        onlyCodegenDeno: true,
        onlyCodegenDenoButApi: true,
      },
      {
        COLUMN_NAME: "city_lbl",
        isCityLbl: false,
        onlyCodegenDeno: true,
        onlyCodegenDenoButApi: true,
      },
      {
        COLUMN_NAME: "county_code",
        isCountyCode: false,
        onlyCodegenDeno: true,
        onlyCodegenDenoButApi: true,
      },
      {
        COLUMN_NAME: "county_lbl",
        isCountyLbl: false,
        onlyCodegenDeno: true,
        onlyCodegenDenoButApi: true,
      },
      {
        COLUMN_NAME: "address",
        isAddress: false,
        onlyCodegenDeno: true,
        onlyCodegenDenoButApi: true,
      },
      {
        COLUMN_NAME: "rem",
      },
      {
        COLUMN_NAME: "create_usr_id",
      },
      {
        COLUMN_NAME: "create_time",
      },
      {
        COLUMN_NAME: "update_usr_id",
      },
      {
        COLUMN_NAME: "update_time",
      },
    ],
  },
  // 订单明细
  zzj4jz_order_detail: {
    opts: {
      uniques: [
        [ "order_id", "pt_id" ],
      ],
    },
    columns: [
      {
        COLUMN_NAME: "order_id",
        foreignKey: {
          selectType: "selectInput",
        },
      },
      {
        COLUMN_NAME: "pt_id",
        foreignKey: {
          selectType: "selectInput",
        },
      },
      {
        COLUMN_NAME: "num",
      },
      {
        COLUMN_NAME: "price",
        prefix: "￥",
      },
      {
        COLUMN_NAME: "amt",
        prefix: "￥",
      },
      {
        COLUMN_NAME: "rem",
      },
    ],
  },
});
```

7. 创建文件 `codegen/tables/zzj4jz/base_menu.zzj4jz.sql.csv` 用于初始化`菜单`

```csv
id,parent_id,lbl,route_path,route_query,is_enabled,is_hidden,order_by
OnRrycHmS1m1/j7xXPgtbA,,家政服务,,,1,0,900
UsilqVpTS1m0BYrddOjRMw,OnRrycHmS1m1/j7xXPgtbA,订单,/zzj4jz/order,,1,0,901
5W0ufNmGSvKNoSW41gNysw,OnRrycHmS1m1/j7xXPgtbA,产品,/zzj4jz/pt,,1,0,902
h9UxoCEJSYyidcqKJNuMBw,OnRrycHmS1m1/j7xXPgtbA,用户地址,/zzj4jz/address,,1,0,903
lqNsR+jeTPyK5kFh9/sxIg,OnRrycHmS1m1/j7xXPgtbA,产品类别,/zzj4jz/pt_type,,1,0,904
```

8. 再次在根目录命令行执行 `nr importCsv zzj4jz/*` 导入 `zzj4jz` 目录下的所有 `.sql.csv` 文件
