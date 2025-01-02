# 系统设计

描述本系统的系统架构设计、功能模块设计、数据库设计、业务流程设计、算法设计、界面设计、接口设计等。

## 系统架构设计

### 前端架构

1. **公共文件**：
   - `.gitignore`：配置文件，告诉Git哪些文件不需要纳入版本控制。
   - `config.js`、`package.json`、`vite.config.js`：项目配置和依赖项。
   - `index.html`：主HTML文件。
   - `favicon.ico`、`public/`：网站图标和公共资源。

2. **源码文件夹 (`src/`)**：
   - **主文件**：
     - `App.vue`：Vue 应用的主组件，充当整体的框架。
     - `main.js`：Vue 应用的入口文件，初始化和挂载 Vue 实例。
     - `index.js`：可能是路由或状态管理的入口文件。

   - **资源 (`assets/`)**：
     - `base.css`、`main.css`：基本的CSS样式。
     - `logo.svg`：应用的标志文件。
     - `background/`、`fonts/`、`ttf/`：特定背景、字体和样式文件。

   - **组件 (`components/`)**：
     - `add_PsychologicalRecords.vue`、`table_get_Counselor.vue`：（添加和获取心理记录、顾问的相关组件）。
     - `reservation/` 和 `tech/` 文件夹：相对的功能模块，包括心理预约、技术管理等。

   - **路由配置 (`router/`)**：
     - `index.js`：定义应用程序的路由，管理页面导航。

   - **状态管理 (`stores/`)**：
     - `counter.js`、`user.js`：Vuex状态管理文件，管理不同的状态树。

   - **视图 (`views/`)**：
     - `dashboard.vue`、`login.vue`、`Personal_info.vue`：主界面视图。

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

## 数据库模块设计

### 模块设计概要

1. **用户信息模块 (Users)**
   - **表**: `Users`
   - **功能**: 存储用户的基本信息，包括用户ID、姓名、性别、生日、联系方式、密码（加密）。
   - **关键属性**: `UserID`（主键）

2. **心理健康档案模块 (PsychologicalRecords)**
   - **表**: `PsychologicalRecords`
   - **功能**: 存储用户的心理健康记录，包括记录ID、相关联用户ID、创建日期、更新日期、心理状态。
   - **关键属性**: `RecordID`（主键），`UserID`（外键，引用`Users`表）

3. **预约记录模块 (Appointments)**
   - **表**: `Appointments`
   - **功能**: 存储用户的预约信息，包括预约ID、用户ID、咨询师ID、预约日期、预约时间、预约状态。
   - **关键属性**: `AppointmentID`（主键），`UserID`（外键，引用`Users`表），`CounselorID`（外键，引用`Counselors`表）

4. **咨询记录模块 (CounselingRecords)**
   - **表**: `CounselingRecords`
   - **功能**: 存储对话内容，包括记录ID、相关联预约ID、开始时间、结束时间、内容、咨询师反馈。
   - **关键属性**: `RecordID`（主键），`AppointmentID`（外键，引用`Appointments`表）

5. **心理咨询师模块 (Counselors)**
   - **表**: `Counselors`
   - **功能**: 存储咨询师的基本信息，包括咨询师ID、姓名、性别、生日、联系方式、认证编号、专业领域、所属部门。
   - **关键属性**: `CounselorID`（主键）

6. **咨询师登录模块 (CounselorLogins)**
   - **表**: `CounselorLogins`
   - **功能**: 存储咨询师的登录信息，包括登录ID、相关联咨询师ID、用户名、密码（加密）、上次登录时间、是否管理员。
   - **关键属性**: `LoginID`（主键），`CounselorID`（外键，引用`Counselors`表）

### 模块关系

- **用户 (Users)** 和 **心理健康档案 (PsychologicalRecords)** 之间是一对多的关系：每个用户可以拥有多个心理健康记录 (`Users` 1-* `PsychologicalRecords`)
- **用户 (Users)** 和 **预约记录 (Appointments)** 之间是一对多的关系：每个用户可以预约多次 (`Users` 1-* `Appointments`)
- **心理咨询师 (Counselors)** 和 **预约记录 (Appointments)** 之间是一对多的关系：每个咨询师可以处理多次预约 (`Counselors` 1-* `Appointments`)
- **预约记录 (Appointments)** 和 **咨询记录 (CounselingRecords)** 之间是一对一的关系：每次预约具备一个咨询记录 (`Appointments` 1-1 `CounselingRecords`)
- **心理咨询师 (Counselors)** 和 **咨询师登录 (CounselorLogins)** 之间是一对一的关系：每个咨询师有一个登录账户 (`Counselors` 1-1 `CounselorLogins`)

## 算法设计

### 状态机状态迁移逻辑

1. 用户状态迁移：

    - **创建用户**：新建 -> 已注册

    ```sql
    STATUS('新建') -> STATUS('已注册');
    ```

    时间复杂度：\(O(1)\)

    - **删除用户**：已注册 -> 已删除

    ```sql
    STATUS('已注册') -> STATUS('已删除');
    ```

    时间复杂度：\(O(1)\)

2. 心理健康档案状态迁移：

    - **添加记录**：新建 -> 已记录

    ```sql
    STATUS('新建') -> STATUS('已记录');
    ```

    时间复杂度：\(O(1)\)

    - **删除记录**：已记录 -> 已删除

    ```sql
    STATUS('已记录') -> STATUS('已删除');
    ```

    时间复杂度：\(O(1)\)

3. 预约记录状态迁移：

    - **添加预约**：新建 -> 已预约

    ```sql
    STATUS('新建') -> STATUS('已预约');
    ```

    时间复杂度：\(O(1)\)

    - **取消预约**：已预约 -> 已取消

    ```sql
    STATUS('已预约') -> STATUS('已取消');
    ```

    时间复杂度：\(O(1)\)

4. 咨询记录状态迁移：

    - **添加记录**：新建 -> 已记录

    ```sql
    STATUS('新建') -> STATUS('已记录');
    ```

    时间复杂度：\(O(1)\)

    - **更新记录**：已记录 -> 已更新

    ```sql
    STATUS('已记录') -> STATUS('已更新');
    ```

    时间复杂度：\(O(1)\)

5. 咨询师登录状态迁移：

    - **创建账户**：新建 -> 已创建

    ```sql
    STATUS('新建') -> STATUS('已创建');
    ```

    时间复杂度：\(O(1)\)

    - **更新账户**：已创建 -> 已更新

    ```sql
    STATUS('已创建') -> STATUS('已更新');
    ```

    时间复杂度：\(O(1)\)

#### 算法设计概要

```text
心理健康管理系统通过定义用户、心理健康档案、预约记录和心理咨询师之间的关系，能够高效地管理用户的预约和咨询过程。各实体之间的关系明确，通过SQL执行增删改查操作及其状态机迁移保证了系统的高效性和可扩展性。每个状态迁移和操作都具有低时间复杂度，为系统带来灵活性和便捷性。
```

## 界面设计

### 组件概述

1. **SegClock 组件**：
    - 用于显示分段时钟，放置在 `dashboard` 组件的顶部或侧边栏，提供时间信息和视觉美化。

2. **table_get_PsychologicalRecord 组件**：
    - 显示心理健康记录的表格，用于用户查看所有记录。

3. **table_get_Counselor 组件**：
    - 显示咨询师信息表格，用户可以通过界面上的选项卡切换查看。

4. **welcome 组件**：
    - 欢迎界面组件，用户首次进入 `dashboard` 界面时显示。

5. **add_PsychologicalRecords 组件**：
    - 用于添加心理健康记录，通过按钮显示，用户提交新记录的数据。

6. **预约相关组件**：
    - 管理预约记录的组件，包括 `add_Psychologicalreservation.vue`（添加预约）、`update_note.vue`（更新备注）、`update_Psychologicalreservation.vue`（更新预约）和 `watch_Psychologicalreservation.vue`（查看预约）。

#### 界面设计风格

- **大 UI 配合小组件显示、消失**：
- 在 `dashboard` 组件中引入了各种小组件，通过条件渲染（如 `v-if` 指令）实现小组件的显示和隐藏。
- 每个小组件负责特定功能，提升用户界面的互动性和操作便捷性,不必频繁跳转路由。

## 接口设计

### Users

Base URLs:

#### Authentication

#### users

#### #### POST /users/auth

POST /users/auth

> Body 请求参数

```yaml
usernameOrEmail: echo
password: 08A4415E9D594FF960030B921D42B91E

```

> 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» usernameOrEmail|body|string| 是 |none|
|» password|body|string| 是 |none|

> 返回示例
> 200 Response

```json
{}
```

> 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#### section-6.3.1)|none|Inline|

> 返回数据结构

#### #### POST /users/register

POST /users/register

> Body 请求参数

```yaml
name: abs
gender: ""
birthdate: ""
Phone: ""
password: 08A4415E9D594FF960030B921D42B91E

```

> 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» name|body|string| 是 |none|
|» gender|body|string| 是 |none|
|» birthdate|body|string| 是 |none|
|» Phone|body|string| 是 |none|
|» password|body|string| 是 |none|

> 返回示例
> 200 Response

```json
{}
```

> 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#### section-6.3.1)|none|Inline|

> 返回数据结构

#### #### POST /users/updateUser

POST /users/updateUser

> Body 请求参数

```yaml
name: abs
gender: ""
birthdate: ""

```

> 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» name|body|string| 是 |none|
|» gender|body|string| 是 |none|
|» birthdate|body|string| 是 |none|

> 返回示例
> 200 Response

```json
{}
```

> 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#### section-6.3.1)|none|Inline|

> 返回数据结构

#### #### POST /users/getinfo

POST /users/getinfo

> Body 请求参数

```yaml
name: abs
gender: ""
birthdate: ""

```

> 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» name|body|string| 是 |none|
|» gender|body|string| 是 |none|
|» birthdate|body|string| 是 |none|

> 返回示例
> 200 Response

```json
{}
```

> 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#### section-6.3.1)|none|Inline|

> 返回数据结构

#### #### POST /users/getinfos

POST /users/getinfos

> Body 请求参数

```yaml
name: abs
gender: ""
birthdate: ""

```

> 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» name|body|string| 是 |none|
|» gender|body|string| 是 |none|
|» birthdate|body|string| 是 |none|

> 返回示例
> 200 Response

```json
{}
```

> 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#### section-6.3.1)|none|Inline|

> 返回数据结构

#### Counselor

#### #### POST /Counselor/login

POST /Counselor/login

> Body 请求参数

```yaml
usernameOrEmail: echo
password: 08A4415E9D594FF960030B921D42B91E

```

> 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» usernameOrEmail|body|string| 是 |none|
|» password|body|string| 是 |none|

> 返回示例
> 200 Response

```json
{}
```

> 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#### section-6.3.1)|none|Inline|

> 返回数据结构

#### #### POST /Counselor/register

POST /Counselor/register

> Body 请求参数

```yaml
username: echo
password: 08A4415E9D594FF960030B921D42B91E

```

> 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|array| 是 |none|
|» password|body|string| 是 |none|

> 返回示例
> 200 Response

```json
{}
```

> 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#### section-6.3.1)|none|Inline|

> 返回数据结构

#### #### POST /Counselor/get_all

POST /Counselor/get_all

> Body 请求参数

```yaml
username: echo
password: 08A4415E9D594FF960030B921D42B91E

```

> 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|array| 是 |none|
|» password|body|string| 是 |none|

> 返回示例
> 200 Response

```json
{}
```

> 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#### section-6.3.1)|none|Inline|

> 返回数据结构



### 控制

Base URLs:

### Authentication

### PsychologicalRecords

##### POST /PsychologicalRecords/add_PsychologicalRecords

POST /PsychologicalRecords/add_PsychologicalRecords

> Body 请求参数

```yaml
PsychologicalStatus: abs

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» PsychologicalStatus|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### POST /PsychologicalRecords/update_PsychologicalRecords

POST /PsychologicalRecords/update_PsychologicalRecords

> Body 请求参数

```yaml
PsychologicalStatus: abs
RecordID: "4"

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» PsychologicalStatus|body|string| 是 |none|
|» RecordID|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### POST /PsychologicalRecords/get_PsychologicalRecord

POST /PsychologicalRecords/get_PsychologicalRecord

> Body 请求参数

```yaml
PsychologicalStatus: abs
RecordID: "4"

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» PsychologicalStatus|body|string| 是 |none|
|» RecordID|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### POST /PsychologicalRecords/get_PsychologicalRecord Copy

POST /PsychologicalRecords/get_all_PsychologicalRecord

> Body 请求参数

```yaml
PsychologicalStatus: abs
RecordID: "4"

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» PsychologicalStatus|body|string| 是 |none|
|» RecordID|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### POST /PsychologicalRecords/get_all_PsychologicalRecords

POST /PsychologicalRecords/get_all_PsychologicalRecords

> Body 请求参数

```yaml
PsychologicalStatus: abs
RecordID: "4"

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» PsychologicalStatus|body|string| 是 |none|
|» RecordID|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

### reservation

##### POST /reservation/add_Psychologicalreservation

POST /reservation/add_Psychologicalreservation

> Body 请求参数

```yaml
PsychologicalStatus: abs
AppointmentDate: 2024-12-30
AppointmentTime: 14:00:00
CounselorID: "1"

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» PsychologicalStatus|body|string| 是 |none|
|» AppointmentDate|body|string| 是 |none|
|» AppointmentTime|body|string| 是 |none|
|» CounselorID|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### POST /reservation/update_Psychologicalreservation

POST /reservation/update_Psychologicalreservation

> Body 请求参数

```yaml
AppointmentStatus: abs
AppointmentDate: 2024-12-30
AppointmentTime: 14:00:00
AppointmentID: "1"

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» AppointmentStatus|body|string| 是 |none|
|» AppointmentDate|body|string| 是 |none|
|» AppointmentTime|body|string| 是 |none|
|» AppointmentID|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### POST /reservation/delete_Psychologicalreservation

POST /reservation/delete_Psychologicalreservation

> Body 请求参数

```yaml
PsychologicalStatus: abs
AppointmentDate: 2024-12-30
AppointmentTime: 14:00:00
AppointmentID: "1"

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» PsychologicalStatus|body|string| 是 |none|
|» AppointmentDate|body|string| 是 |none|
|» AppointmentTime|body|string| 是 |none|
|» AppointmentID|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### GET /reservation/get_Psychologicalreservation

GET /reservation/get_Psychologicalreservation

> Body 请求参数

```yaml
PsychologicalStatus: abs
AppointmentDate: 2024-12-30
AppointmentTime: 14:00:00
AppointmentID: "1"

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» PsychologicalStatus|body|string| 是 |none|
|» AppointmentDate|body|string| 是 |none|
|» AppointmentTime|body|string| 是 |none|
|» AppointmentID|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### GET /reservation/get_Psychologicalreservation Copy

GET /reservation/get_latest_Psychologicalreservation

> Body 请求参数

```yaml
PsychologicalStatus: abs
AppointmentDate: 2024-12-30
AppointmentTime: 14:00:00
AppointmentID: "1"

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» PsychologicalStatus|body|string| 是 |none|
|» AppointmentDate|body|string| 是 |none|
|» AppointmentTime|body|string| 是 |none|
|» AppointmentID|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

### CounselingRecords

##### POST /reservation/add_PsychologicalRecords Copy

POST /CounselingRecords/add_CounselingRecords

> Body 请求参数

```yaml
AppointmentID: abs
AppointmentDate: 2024-12-30
AppointmentTime: 14:00:00
Content: "1"
CounselorFeedback: w

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» AppointmentID|body|string| 是 |none|
|» AppointmentDate|body|string| 是 |none|
|» AppointmentTime|body|string| 是 |none|
|» Content|body|string| 是 |none|
|» CounselorFeedback|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### POST /CounselingRecords/update_CounselingRecords

POST /CounselingRecords/update_CounselingRecords

> Body 请求参数

```yaml
AppointmentID: abs
StartTime: 2024-12-30
EndTime: 14:00:00
Content: "1"
CounselorFeedback: w

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» AppointmentID|body|string| 是 |none|
|» StartTime|body|string| 是 |none|
|» EndTime|body|string| 是 |none|
|» Content|body|string| 是 |none|
|» CounselorFeedback|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### POST /CounselingRecords/delete_CounselingRecords

POST /CounselingRecords/delete_CounselingRecords

> Body 请求参数

```yaml
AppointmentID: abs
StartTime: 2024-12-30
EndTime: 14:00:00
Content: "1"
CounselorFeedback: w

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» AppointmentID|body|string| 是 |none|
|» StartTime|body|string| 是 |none|
|» EndTime|body|string| 是 |none|
|» Content|body|string| 是 |none|
|» CounselorFeedback|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构

##### POST /CounselingRecords/delete_CounselingRecords Copy

POST /CounselingRecords/get_CounselingRecord

> Body 请求参数

```yaml
AppointmentID: abs
StartTime: 2024-12-30
EndTime: 14:00:00
Content: "1"
CounselorFeedback: w

```

>请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|token|header|string| 是 |none|
|body|body|object| 否 |none|
|» AppointmentID|body|string| 是 |none|
|» StartTime|body|string| 是 |none|
|» EndTime|body|string| 是 |none|
|» Content|body|string| 是 |none|
|» CounselorFeedback|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

>返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231##section-6.3.1)|none|Inline|

>返回数据结构
