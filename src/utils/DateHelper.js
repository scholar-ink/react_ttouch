export const dayNames = ['周天', '周一', '周二', '周三', '周四', '周五', '周六'];

export default {
  format: (obj, format) => {
    let date;
    if (obj instanceof Date) {
      date = obj;
    } else {
      date = new Date(obj);
    }
    
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S+': date.getMilliseconds(), // 毫秒
      'D+': dayNames[date.getDay()], //星期
    };
    
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    for (const k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
      }
    }
    return format;
  },
};
