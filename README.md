## Vue-Koa-JWT 示例

### 前端

- vue-cli 3 初始化项目
- vue-router 控制页面路由
- vuex 和 localforage 存储用户认证信息
- axios 与服务端交互

### 后端

- Koa2 提供服务接口
- JWT 提供用户认证
- MySQL 作为数据存储介质

> 首先必须在本地启动 MySQL 服务，创建一个名为 `jwt` 的数据库，新增一个 `users` 表，其中包含三个字段：`id`, `name`, `password`，并且在 `server/db/db.js` 中修改自己的数据库配置，否则将无法正常运行。

### 运行

```bash
cd vue-koa-jwt
npm install

# 开发环境
npm run dev

# 生产环境
npm run build
npm start
```