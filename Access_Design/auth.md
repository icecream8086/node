# 登录
> /auth
> post {uid,pwd}
```sql
-- 查询用户的 MD5 密码值
SELECT 
    UserID,
    Password
FROM 
    Users
WHERE 
    UserID = ?;

-- 查询咨询师的 MD5 密码值
SELECT 
    CounselorID,
    Password
FROM 
    CounselorLogins
WHERE 
    CounselorID = ?;

```