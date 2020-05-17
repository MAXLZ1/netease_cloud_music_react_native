// 脚本文件 node ./iconfont2json.js
const json = require('./iconfont.json');
const fs = require('fs');

const res = json.glyphs.reduce((res, curr) => {
  res[curr.font_class] = curr.unicode_decimal;
  return res;
}, {});

fs.writeFile('./iconfonts.json', JSON.stringify(res), err => {
  if (err) console.log('iconfonts.json文件写入失败！');
  else console.log('iconfonts.json文件已生成');
});

const iconStr = `
enum IconType {
  ${Object.keys(res).map(item => {
    let key = item.replace('-', '_');
    if (!isNaN(Number(item[0]))) key = `n${key}`
    return `${key} = "${item}"`;
  }).join(',\n  ')}
}

export default IconType;
`

fs.writeFile('icon.ts', iconStr, err => {
  if (err) console.log('icon.ts文件写入失败');
  else console.log('icon.ts文件已生成');
})
