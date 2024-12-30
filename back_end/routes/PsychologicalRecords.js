var express = require('express');
var router = express.Router();
const query = require('../lib/datasource/mysql_connection_promise');  // Database connection
const { verifyToken, generateToken,get_uid } = require('../lib/encrypt/token');
const {error_control}=require('../lib/life_cycle/error_control');

router.post('/add_PsychologicalRecords', async (req, res, next) => {
    try {
        let token = req.headers.token;
        let { UpdateDate, PsychologicalStatus } = req.body;

        if (!token) {
              return res.status(401).json({ message: 'Token is required.' });
          }
  
          const decoded = verifyToken(token);
          if (!decoded) {
              return res.status(401).json({ message: 'Invalid or expired token.' });
          }
        let _get_uid=get_uid(token);        

        // 当前时间作为 CreateDate
        const CreateDate = new Date();
        UpdateDate = UpdateDate ? new Date(UpdateDate).toISOString().slice(0, 19).replace('T', ' ') : null;
        
        const result = await query({
            sql: `INSERT INTO PsychologicalRecords (UserID, CreateDate, UpdateDate, PsychologicalStatus)
                  VALUES (?, ?, ?, ?);`,
            values: [_get_uid, CreateDate, UpdateDate, PsychologicalStatus],
        });
        return res.status(200).json({ message: 'Record added successfully.' });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});

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

router.post('/get_PsychologicalRecord', async (req, res, next) => {
    try {
        let token = req.headers.token;
        let { RecordID } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        
        if (!RecordID) {
            return res.status(400).json({ message: 'RecordID is required.' });
        }

        const result = await query({
            sql: `SELECT * FROM PsychologicalRecords WHERE RecordID = ?`,
            values: [RecordID],
        });

        if (result.length === 0) {
            return res.status(404).json({ message: 'Record not found.' });
        }

        return res.status(200).json({ record: result[0] });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});

router.get('/get_all_PsychologicalRecords', async (req, res, next) => {
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

        const result = await query({
            sql: `SELECT * FROM PsychologicalRecords WHERE UserID = ?`,
            values: [_get_uid],
        });
        console.log(result);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No records found for the user.' });
        }
        
        return res.status(200).json({ records: result });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});

  
module.exports = router;