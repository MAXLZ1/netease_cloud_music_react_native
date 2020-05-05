// 脚本文件 node ./iconfont2json.js
const json = require('./iconfont.json');
const fs = require('fs');

const res = json.glyphs.reduce((res, curr) => {
  res[curr.font_class] = curr.unicode_decimal;
  return res;
}, {});

fs.writeFile('./iconfont-res.json', JSON.stringify(res), err => {
  if (err) console.log('文件写入失败！');
  else console.log('文件已生成');
});
