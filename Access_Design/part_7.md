# 系统测试

## 用户认证接口测试文档

### 接口名称

> 用户认证接口

### 源码

```javascript

// @ts-ignore
router.post('/auth', async (req, res, next) => {
  try {
    let { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail) {
      return res.status(400).json({ message: 'Username or email is required.' });
    }
    const cheuqe = await query({
      sql: `select Password from Users WHERE Email=? OR Name= ? ;`,
      values: [usernameOrEmail, usernameOrEmail],
    });

    let results_cheuqe = JSON.parse(JSON.stringify(cheuqe));

    const get_info = await query({
      sql: `select UserID,Name from Users WHERE Email=? OR Name= ? ;`,
      values: [usernameOrEmail, usernameOrEmail],
    });
    let results_uid = JSON.parse(JSON.stringify(get_info));

    if (results_cheuqe[0].Password === password) {
      var payload = results_uid[0];
      const token = generateToken(payload);
      return res.status(200).json({ token: token });

    } else {
      return res.status(401).json({ message: 'Username or password error.' });
    }

  } catch (error) {
    error_control(error, res, req);
  }

});

```

### 接口路径

> `/auth`

### 请求方法

> POST

### 请求格式

```json
{
  "usernameOrEmail": "string",
  "password": "string"
}
```

### 请求示例

```json
{
  "usernameOrEmail": "example@example.com",
  "password": "e10adc3949ba59abbe56e057f20f883e" // 原始密码: "123456"，MD5哈希值: "e10adc3949ba59abbe56e057f20f883e"
}
```

### 响应格式

#### 成功时

```json
{
  "token": "string"
}
```

#### 失败时

```json
{
  "message": "string"
}
```

### 接口测试用例

| 编号 | 用例描述                     | 输入                                                                          | 预期输出                                                                                        |
|:----:|------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| TC01 | 输入有效的用户名和密码       | `{"usernameOrEmail": "example@example.com", "password": "e10adc3949ba59abbe56e057f20f883e"}`             | 状态码 `200`，返回 `token` 字段                                                                  |
| TC02 | 输入有效的邮箱和密码         | `{"usernameOrEmail": "user@domain.com", "password": "202cb962ac59075b964b07152d234b70"}`            | 状态码 `200`，返回 `token` 字段                                                                  |
| TC03 | 输入不存在的用户名或邮箱     | `{"usernameOrEmail": "nonexistent", "password": "irrelevant"}`                 | 状态码 `401`，返回 `{"message": "Username or password error."}`                                  |
| TC04 | 输入错误的密码               | `{"usernameOrEmail": "example@example.com", "password": "wrongpassword"}`       | 状态码 `401`，返回 `{"message": "Username or password error."}`                                  |
| TC05 | 重复输入错误的密码           | `{"usernameOrEmail": "example@example.com", "password": "wrongpassword"}`       | 状态码 `401`，返回 `{"message": "Username or password error."}`                                  |
| TC06 | 用户名或邮箱为空             | `{"usernameOrEmail": "", "password": "202cb962ac59075b964b07152d234b70"}`                            | 状态码 `400`，返回 `{"message": "Username or email is required."}`                               |
| TC07 | 密码为空                     | `{"usernameOrEmail": "example@example.com", "password": ""}`                    | 状态码 `401`，返回 `{"message": "Username or password error."}`                                  |
| TC08 | 用户名或邮箱和密码都为空     | `{"usernameOrEmail": "", "password": ""}`                                      | 状态码 `400`，返回 `{"message": "Username or email is required."}`                               |

### 测试步骤

1. 使用POST方法访问`/auth`接口。
2. 发送不同的测试输入数据。
3. 检查返回的HTTP状态码和响应内容，确保与预期输出匹配。
4. 记录测试结果。

## 用户预约更新接口测试文档

### 接口名称

> 用户预约更新接口

### 接口源码

```javascript
router.post('/update_Psychologicalreservation', async (req, res, next) => {
    try {
        let token = req.headers.token;
        let { AppointmentID, AppointmentDate, AppointmentTime, AppointmentStatus } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        let UserID = get_uid(token);  // 从 token 获取 user_id

        if (!AppointmentID) {
            return res.status(400).json({ message: 'AppointmentID is required.' });
        }

        // 更新操作
        const result = await query({
            sql: `UPDATE Appointments
                  SET UserID = ?, AppointmentDate = ?, AppointmentTime = ?, AppointmentStatus = ?
                  WHERE AppointmentID = ?;`,
            values: [UserID, AppointmentDate, AppointmentTime, AppointmentStatus, AppointmentID],
        });        
        return res.status(200).json({ message: 'Psychological record updated successfully.' });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});
```

### 接口路径

> `/update_Psychologicalreservation`

### 请求方法

> POST

### 请求格式

```json
{
  "AppointmentID": "int",
  "AppointmentDate": "date",
  "AppointmentTime": "time",
  "AppointmentStatus": "string"
}
```

### 请求示例

```json
{
  "AppointmentID": 1,
  "AppointmentDate": "2025-01-10",
  "AppointmentTime": "14:00:00",
  "AppointmentStatus": "confirmed"
}
```

### 响应格式

#### 成功时

```json
{
  "message": "Psychological record updated successfully."
}
```

#### 失败时

```json
{
  "message": "string"
}
```

### 接口测试用例

| 编号 | 用例描述                     | 输入                                                                                                  | 预期输出                                                                                          |
|:----:|------------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| TC01 | 有效的更新请求               | `{"AppointmentID": 1, "AppointmentDate": "2025-01-10", "AppointmentTime": "14:00:00", "AppointmentStatus": "confirmed"}`                         | 状态码 `200`，返回 `{"message": "Psychological record updated successfully."}`                      |
| TC02 | 缺少Token                    | `无token`, `{"AppointmentID": 1, "AppointmentDate": "2025-01-10", "AppointmentTime": "14:00:00", "AppointmentStatus": "confirmed"}`             | 状态码 `401`，返回 `{"message": "Token is required."}`                                             |
| TC03 | 无效的Token                  | `无效Token`, `{"AppointmentID": 1, "AppointmentDate": "2025-01-10", "AppointmentTime": "14:00:00", "AppointmentStatus": "confirmed"}`         | 状态码 `401`，返回 `{"message": "Invalid or expired token."}`                                       |
| TC04 | 缺少AppointmentID            | `Token`, `{"AppointmentDate": "2025-01-10", "AppointmentTime": "14:00:00", "AppointmentStatus": "confirmed"}`                                   | 状态码 `400`，返回 `{"message": "AppointmentID is required."}`                                      |
| TC05 | 缺少AppointmentDate          | `Token`, `{"AppointmentID": 1, "AppointmentTime": "14:00:00", "AppointmentStatus": "confirmed"}`                                              | 不变化或相关错误消息                                                                              |
| TC06 | 缺少AppointmentTime          | `Token`, `{"AppointmentID": 1, "AppointmentDate": "2025-01-10", "AppointmentStatus": "confirmed"}`                                             | 不变化或相关错误消息                                                                              |
| TC07 | 缺少AppointmentStatus        | `Token`, `{"AppointmentID": 1, "AppointmentDate": "2025-01-10", "AppointmentTime": "14:00:00"}`                                                 | 不变化或相关错误消息                                                                              |
| TC08 | 全部数据为空                 | `Token`, `{"AppointmentID": "", "AppointmentDate": "", "AppointmentTime": "", "AppointmentStatus": ""}`                                        | 状态码 `400`，返回 `{"message": "AppointmentID is required."}`                                      |

### 测试步骤

1. 使用POST方法访问`/update_Psychologicalreservation`接口。
2. 在请求头中添加有效token。
3. 发送不同的测试输入数据。
4. 检查返回的HTTP状态码和响应内容，确保与预期输出匹配。
5. 记录测试结果。

## 心理档案更新接口测试文档

### 接口名称

> 心理档案更新接口

### 接口源码

```javascript
router.post('/update_PsychologicalRecords', async (req, res, next) => {
    try {
        let token = req.headers.token;
        let { RecordID, PsychologicalStatus } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        
        let _get_uid = get_uid(token);        

        if (!RecordID) {
            return res.status(400).json({ message: 'RecordID is required.' });
        }

        // 当前时间作为 UpdateDate
        const UpdateDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const result = await query({
            sql: `UPDATE PsychologicalRecords
                  SET UserID = ?, UpdateDate = ?, PsychologicalStatus = ?
                  WHERE RecordID = ?;`,
            values: [_get_uid, UpdateDate, PsychologicalStatus, RecordID],
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found.' });
        }

        return res.status(200).json({ message: 'Record updated successfully.' });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});
```

### 接口路径

> `/update_PsychologicalRecords`

### 请求方法

> POST

### 请求格式

```json
{
  "RecordID": "int",
  "PsychologicalStatus": "string"
}
```

### 请求示例

```json
{
  "RecordID": 1,
  "PsychologicalStatus": "The patient shows significant improvement."
}
```

### 响应格式

#### 成功时

```json
{
  "message": "Record updated successfully."
}
```

#### 失败时

```json
{
  "message": "string"
}
```

### 接口测试用例

| 编号 | 用例描述                     | 输入                                                                                                            | 预期输出                                                                                        |
|:----:|------------------------------|---------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| TC01 | 有效的更新请求               | `{"RecordID": 1, "PsychologicalStatus": "The patient shows significant improvement."}`                         | 状态码 `200`，返回 `{"message": "Record updated successfully."}`                                |
| TC02 | 缺少Token                    | `无token`, `{"RecordID": 1, "PsychologicalStatus": "The patient shows significant improvement."}`               | 状态码 `401`，返回 `{"message": "Token is required."}`                                         |
| TC03 | 无效的Token                  | `无效Token`, `{"RecordID": 1, "PsychologicalStatus": "The patient shows significant improvement."}`            | 状态码 `401`，返回 `{"message": "Invalid or expired token."}`                                  |
| TC04 | 缺少RecordID                 | `Token`, `{"PsychologicalStatus": "The patient shows significant improvement."}`                               | 状态码 `400`，返回 `{"message": "RecordID is required."}`                                      |
| TC05 | RecordID不存在               | `Token`, `{"RecordID": 9999, "PsychologicalStatus": "Status update."}`                                         | 状态码 `404`，返回 `{"message": "Record not found."}`                                          |
| TC06 | 缺少PsychologicalStatus      | `Token`, `{"RecordID": 1}`                                                                                    | 不变化或相关错误消息                                                                            |
| TC07 | 全部数据为空                 | `Token`, `{"RecordID": "", "PsychologicalStatus": ""}`                                                        | 状态码 `400`，返回 `{"message": "RecordID is required."}`                                      |

### 测试步骤

1. 使用POST方法访问`/update_PsychologicalRecords`接口。
2. 在请求头中添加有效token。
3. 发送不同的测试输入数据。
4. 检查返回的HTTP状态码和响应内容，确保与预期输出匹配。
5. 记录测试结果。

## cve漏洞报告

```text
得益于nodeJS的强大生态系统，我们的系统在开发过程中使用了大量的第三方模块，这些模块为我们提供了丰富的功能和便捷的开发体验。然而，第三方模块的使用也带来了一定的安全风险，但是只需要依赖自动化工具针对 package.json 进行分析即可。我们使用了 npm audit 来检查项目中的依赖项是否存在已知的漏洞，以及如何解决这些漏洞。通过定期运行 npm audit，我们可以及时发现并解决潜在的安全问题，确保系统的安全性。
一般情况下，使用Redhat Dependabot等工具可以自动检测项目中的依赖项是否存在已知的漏洞，以及如何解决这些漏洞。通过定期运行这些工具，我们可以及时发现并解决潜在的安全问题，确保系统的安全性。
```

[注:图片的b开头后缀代表后端,f代表前端,这句话删掉]