var express = require('express');
var router = express.Router();
const query = require('../lib/datasource/mysql_connection_promise');  // Database connection
const { verifyToken, generateToken, get_uid } = require('../lib/encrypt/token');
const { error_control } = require('../lib/life_cycle/error_control');

// @ts-ignore
router.get('/', async function (req, res, next) {
  const result = await query({
    sql: `select * from Users;`,
  });
  let results = JSON.parse(JSON.stringify(result));

  res.send(results);
  console.log(results);
});

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

// @ts-ignore
router.post('/register', async (req, res, next) => {
  try {
    let { name, gender, birthdate, Phone, password, Email } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: 'Name and password are required.' });
    }

    // 插入新用户到 Users 表中
    birthdate = new Date(birthdate);
    birthdate = null;
    const result = await query({
      sql: `INSERT INTO Users (Name, Gender, Birthdate, Phone, Password, Email)
            VALUES (?, ?, ?, ?, ?, ?);`,
      values: [name, gender, birthdate, Phone, password, Email],
    });

    console.log(result);

    return res.status(200).json({ message: 'User registered successfully.' });

  } catch (error) {
    console.log(error);

    error_control(error, res, req, true);
  }
});


// @ts-ignore
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


    let { name, gender, birthdate, Phone, Email } = req.body;


    // @ts-ignore
    let userID = get_uid(token);



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
    if (Phone) {
      updateFields.push("Phone = ?");
      values.push(Phone);
    }
    if (Email) {
      updateFields.push("Email = ?");
      values.push(Email);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update.' });
    }

    values.push(userID);

    const sql = `UPDATE Users SET ${updateFields.join(", ")} WHERE UserID = ?`;

    await query({ sql, values });

    return res.status(200).json({ message: 'User information updated successfully.' });

  } catch (error) {
    error_control(error, res, req);
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
    let _get_uid = get_uid(token);
    let { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required.' });
    }

    await query({
      sql: `UPDATE Users SET Password = ? WHERE UserID = ?;`,
      // @ts-ignore
      values: [newPassword, _get_uid],
    });
    return res.status(200).json({ message: 'Password updated successfully.' });

  } catch (error) {
    error_control(error, res, req);
  }
});
// getinfo

router.post('/getinfo', async (req, res) => {
  try {
    let token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: 'Token is required.' });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    // Checking for UserID or CounselorID and calling respective function

    // @ts-ignore
    if (decoded.UserID) {
      // @ts-ignore
      const userID = get_uid(decoded.UserID);
      return res.status(200).json({ message: 'User ID retrieved successfully.', decoded });
      // @ts-ignore
    } else if (decoded.CounselorID) {
      // @ts-ignore
      const counselorID = get_counselorID(decoded.CounselorID);
      return res.status(200).json({ message: 'Counselor ID retrieved successfully.', decoded });
    } else {
      return res.status(400).json({ message: 'UserID or CounselorID not found in token.' });
    }
  } catch (error) {
    error_control(error, res, req);
  }
});

router.post('/getinfos', async (req, res) => {
  try {
    let token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: 'Token is required.' });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    // Checking for UserID or CounselorID and calling respective function

    // @ts-ignore
    if (decoded.UserID) {
      // @ts-ignore

      var userID = decoded.UserID;
      let user = await query({
        sql: `SELECT UserID, Name, Gender, Birthdate, Phone, Email FROM Users WHERE UserID = ?`,
        values: [userID],
      });
      return res.status(200).json({ message: 'User ID retrieved successfully.', user });
      // @ts-ignore
    } else if (decoded.CounselorID) {
      // @ts-ignore
      const counselorID = decoded.CounselorID;
      let counselor = await query({
        sql: `SELECT CounselorID, Name, Gender, Birthdate, ContactInfo, CertificationNumber, SpecialtyArea, Department FROM Counselors WHERE CounselorID = ?`,
        values: [counselorID],
      });
      return res.status(200).json({ message: 'Counselor ID retrieved successfully.', counselor });
    } else {
      return res.status(400).json({ message: 'UserID or CounselorID not found in token.' });
    }
  } catch (error) {
    error_control(error, res, req);
  }
});
module.exports = router;
