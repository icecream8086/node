var express = require('express');
var router = express.Router();
const query = require('../lib/datasource/mysql_connection_promise');  // Database connection
const { verifyToken,authMiddleware, generateToken } = require('../lib/encrypt/token');
const {error_control}=require('../lib/life_cycle/error_control');
router.get('/', async function (req, res, next) {
  const result = await query({
    sql: `select * from Users;`,
  });
  let results = JSON.parse(JSON.stringify(result));

  res.send(results);
  console.log(results);
});

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
    console.log(results_cheuqe);

  } catch (error) {
    error_control(error);
  }

});

router.post('/register', async (req, res, next) => {
  try {
    let { name, gender, birthdate, contactInfo, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: 'Name and password are required.' });
    }

    // 插入新用户到 Users 表中
    const result = await query({
      sql: `INSERT INTO Users (Name, Gender, Birthdate, ContactInfo, Password)
            VALUES (?, ?, ?, ?, ?)`,
      values: [name, gender, birthdate, contactInfo, password],
    });

    return res.status(201).json({ message: 'User registered successfully.' });

  } catch (error) {
    error_control(error);
  }
});

router.patch('/updateUser', async (req, res, next) => {
  try {
    let token = req.headers.token;
    let { userID, name, gender, birthdate, contactInfo, password } = req.body;
    if (!userID) {
      return res.status(400).json({ message: 'User ID is required.' });
    }
    verifyToken
    // 构建动态更新的SQL语句
    let updateFields = [];
    let values = [];

    if (name) {
      updateFields.push("Name = ?");
      values.push(name);
    }
    if (gender) {
      updateFields.push("Gender = ?");
      values.push(gender);
    }
    if (birthdate) {
      updateFields.push("Birthdate = ?");
      values.push(birthdate);
    }
    if (contactInfo) {
      updateFields.push("ContactInfo = ?");
      values.push(contactInfo);
    }
    if (password) {
      updateFields.push("Password = ?");
      values.push(password);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update.' });
    }

    values.push(userID);

    const sql = `UPDATE Users SET ${updateFields.join(", ")} WHERE UserID = ?`;

    await query({ sql, values });

    return res.status(200).json({ message: 'User information updated successfully.' });

  } catch (error) {
    error_control(error);
  }
});


router.post('/updateUser', async (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: 'Token is required.' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    let { userID, name, gender, birthdate, contactInfo, password } = req.body;
    if (!userID) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // 构建动态更新的SQL语句
    let updateFields = [];
    let values = [];

    if (name) {
      updateFields.push("Name = ?");
      values.push(name);
    }
    if (gender) {
      updateFields.push("Gender = ?");
      values.push(gender);
    }
    if (birthdate) {
      updateFields.push("Birthdate = ?");
      values.push(birthdate);
    }
    if (contactInfo) {
      updateFields.push("ContactInfo = ?");
      values.push(contactInfo);
    }
    if (password) {
      updateFields.push("Password = ?");
      values.push(password);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update.' });
    }

    values.push(userID);

    const sql = `UPDATE Users SET ${updateFields.join(", ")} WHERE UserID = ?`;

    await query({ sql, values });

    return res.status(200).json({ message: 'User information updated successfully.' });

  } catch (error) {
    error_control(error);
  }
});

router.post('/updatePassword', async (req, res) => {
    try {
      let token = req.headers.token;
      if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        let { newPassword } = req.body;
        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required.' });
        }

        await query({
            sql: `UPDATE Users SET Password = ? WHERE UserID = ?;`,
            // @ts-ignore
            values: [newPassword, decoded.UserID],
        });

        return res.status(200).json({ message: 'Password updated successfully.' });

    } catch (error) {
        error_control(error);
    }
});


module.exports = router;
