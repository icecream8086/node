// @ts-nocheck
const os = require('os');
const si = require('systeminformation');

async function cpu_statu_info(logable = false) {
  const cpuInfo = await si.cpu();
  const memInfo = await si.mem();
  const cpuTemp = await si.cpuTemperature();

  const cpuPercent = await si.currentLoad().then(data => data.currentload);
  const memoryPercent = memInfo.used / memInfo.total * 100;
  const coresPercent = await si.currentLoad().then(data => data.cpus.map(cpu => cpu.load));
  const cpuFreq = cpuInfo.speed;

  if (logable==true) {
    console.log("—————— DEBUG LOG ——————");
    console.log('               ');
    console.log("module :",module.exports.name);
    /*area */
    console.log(`CPU使用率: ${cpuPercent ? cpuPercent.toFixed(2) : 'N/A'}%`);
    console.log(`内存使用率: ${memoryPercent.toFixed(2)}%`);
    console.log(`核心使用率: ${coresPercent.map(percent => percent.toFixed(2)).join(', ')}`);
    console.log(`CPU频率: ${cpuFreq}MHz`);
    console.log(`CPU温度: ${cpuTemp.main ? cpuTemp.main.toFixed(2) : 'N/A'}°C`);
    /*area */
    console.log('               ');
    console.log("———————————————");
    console.log('               ');

  }

  return {
    cpuPercent: cpuPercent ? cpuPercent.toFixed(2) : 'N/A',
    memoryPercent: memoryPercent.toFixed(2),
    coresPercent: coresPercent.map(percent => percent.toFixed(2)).join(', '),
    cpuFreq: cpuFreq,
    cpuTemp: cpuTemp.main ? cpuTemp.main.toFixed(2) : 'N/A'
  };
}

module.exports = cpu_statu_info;