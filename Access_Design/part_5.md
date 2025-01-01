# 系统设计

描述本系统的系统架构设计、功能模块设计、数据库设计、业务流程设计、算法设计、界面设计、接口设计等。

## 系统架构设计

### 前端架构

### 后端架构
<!-- 
> 文件结构

```text
PS C:\Users\zzbsn\source\repos\VsCode\node_back\back_end> tree /f
Folder PATH listing for volume OS
Volume serial number is 5EFD-21B2
C:.
│   .gitignore
│   app.js
│   config.js
│   Dockerfile
│   package-lock.json
│   package.json
│   start.sh
│   start_server.ps1
│
├───bin
│       www
│
├───doc
│       main.md
│
├───lib
│   ├───datasource
│   │       mysql_connection.js
│   │       mysql_connection_promise.js
│   │
│   ├───encrypt
│   │       permission.js
│   │       token.js
│   │
│   ├───life_cycle
│   │       error_control.js
│   │
│   └───sysinfo
│           cpu_info.js
│           disk_info.js
│           sys_info.js
│
├───public
│   ├───images
│   ├───javascripts
│   └───stylesheets
│           style.css
│
├───routes
│       archive.js
│       Counselor.js
│       index.js
│       PsychologicalRecords.js
│       reservation.js
│       users.js
│
└───views
        error.jade
        index.jade
        layout.jade

PS C:\Users\zzbsn\source\repos\VsCode\node_back\back_end> 
``` -->

#### 2. 核心模块设计

##### 2.1 数据库模块 (`lib/datasource`)

- `mysql_connection.js` 和 `mysql_connection_promise.js`：管理与数据库的连接，提供同步和异步连接选项。

##### 2.2 加密模块 (`lib/encrypt`)

- `permission.js`：管理用户权限，包括身份验证和授权。
- `token.js`：处理令牌生成与验证，用于安全的用户会话管理。

##### 2.3 生命周期控制模块 (`lib/life_cycle`)

- `error_control.js`：处理应用中的错误，包括记录和报告。

##### 2.4 系统信息模块 (`lib/sysinfo`)

- `cpu_info.js`，`disk_info.js`，`sys_info.js`：收集和报告系统状态和性能指标。

#### 3. 路由模块设计 (`routes`)

- `archive.js`：处理档案相关的请求。
- `counselor.js`：管理咨询师信息和操作。
- `index.js`：主页和公共路由。
- `psychologicalRecords.js`：管理心理记录相关的请求。
- `reservation.js`：管理预约相关的请求。
- `users.js`：管理用户信息和操作。

#### 4. 公共文件夹 (`public`)

- `images`，`javascripts`，`stylesheets`：存放静态文件、脚本和样式表。

#### 5. 视图层 (`views`)

- 使用 Jade 模板引擎创建应用的前端视图，包括错误页面、主页布局等。

#### 6. 启动脚本和配置 (`app.js`，`config.js`，`start.sh`，`start_server.ps1`)

- 配置文件和启动脚本帮助在不同环境下成功启动和运行应用。

#### 7. 容器化 (`Dockerfile`)

- 使用 Dockerfile 构建容器化应用，方便部署和管理。
