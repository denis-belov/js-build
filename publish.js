/*
eslint-disable
linebreak-style,
id-length,
no-console,
no-sync,
id-blacklist,
max-len,
no-process-env
*/

const projectProperties = {
  'external-data-loader': 'E:/reps/denis-belov/external-data-loader',
  'xgk-js-webpack-cpp-loader': 'E:/reps/xgk/xgk-js-webpack-cpp-loader',
};

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const pkg = require(path.join(projectProperties[process.env.PROJECT], 'package.json'));
const args = process.argv;

const CURR_VERSION = pkg.version;
const NEXT_VERSION = args[2] || `${ CURR_VERSION.split('.').map((elm, ind, arr) => parseInt(ind === arr.length - 1 ? ++elm : elm, 10)).join('.') }`;

console.log(`${ CURR_VERSION } -> ${ NEXT_VERSION }`);

pkg.version = NEXT_VERSION;
fs.writeFileSync(path.join(projectProperties[process.env.PROJECT], 'package.json'), JSON.stringify(pkg));

exec(`cd ${ projectProperties[process.env.PROJECT] } && git add . && git commit -m release/v${ NEXT_VERSION } && git push origin master && npm publish --access=public`, (err, stdout, stderr) => {
  if (err) {
    console.log(err);
  }

  console.log(stdout);
  console.log(stderr);
});
