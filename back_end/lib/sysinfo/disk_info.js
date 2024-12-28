const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

async function disk_Info(logable = false) {
    return new Promise((resolve, reject) => {
        // 获取磁盘列表
        const diskList = fs.readdirSync('/').filter(disk => fs.statSync('/' + disk).isDirectory());
        // 获取程序所在磁盘
        const programPath = process.cwd().split('/')[1];

        // 遍历每个磁盘
        for (const diskName of diskList) {
            // 获取磁盘的挂载目录
            const mountPoint = '/' + diskName;

            // 如果挂载目录不是特定路径，跳过该磁盘
            if (mountPoint !== '/' + programPath) {
                continue;
            }

            // 获取磁盘使用情况
            const diskUsage = execSync('df -BG ' + mountPoint).toString().trim().split('\n')[1].split(/\s+/);
            const totalSize = parseInt(diskUsage[1]);
            const usedSize = parseInt(diskUsage[2]);
            const freeSize = parseInt(diskUsage[3]);

            // 获取文件系统类型
            const fstype = execSync('mount | grep "' + mountPoint + ' "').toString().trim().split(/\s+/)[4];

            if (logable) {
                // 输出结果
                console.log("—————— DEBUG LOG ——————");
                console.log('               ');
                console.log("module :", module.exports.name);
                /*area */

                console.log("磁盘名称：", diskName);
                console.log("挂载目录：", mountPoint);
                console.log("文件系统：", fstype);
                console.log("大小：", totalSize, "GB");
                console.log("可用大小：", freeSize, "GB");
                console.log("已使用大小：", usedSize, "GB");
                console.log(programPath);
                /*area */

                console.log('               ');
                console.log("———————————————");
                console.log('               ');

            }

            resolve({
                diskName: diskName,
                mountPoint: mountPoint,
                fstype: fstype,
                totalSize: totalSize,
                freeSize: freeSize,
                usedSize: usedSize
            });
        }

        reject(new Error('Could not find the disk information.'));
    });
}

module.exports = disk_Info;