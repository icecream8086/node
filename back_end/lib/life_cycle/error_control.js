async function error_control(err, res, req,console_log=false,log=false,log_path="") {
    if (log) {
        let fs = require('fs');
        let log = fs.createWriteStream
        (log_path, {flags: 'a'});
        log.write(err.message + '\n');
    }
    if (console_log) {
        console.log(err.message);
    }
    if (err.message === 'Token or UID is undefined.') {
        return res.status(400).send(JSON.stringify({ message: err.message}));
    }
    if(err.message === 'Invalid input type. Input must be a meanful value.'){
        return res.status(400).send(JSON.stringify({ message: err.message}));
    }
    if (err.message === "Token does not match UID. Please login again.") {
        return res.status(401).send(JSON.stringify({ message: err.message}));
    }
    if (err.message === "Folder does not exist") {
        return res.status(404).send(JSON.stringify({ message: err.message}));
    }
    return res.status(500).send(JSON.stringify({ message: err.message}));
}
module.exports = {error_control};