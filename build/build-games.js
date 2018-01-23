/* eslint-disable */

var chalk = require('chalk')
var path = require('path');
var spawn = require('child_process').spawn;
var fs = require('fs');
var appDir, buildQueue;

function main() {
  initAppDir();
  initBuildQueue();
  build();
}

function initAppDir() {
  var topModule = module;
  while(topModule.parent)
    topModule = topModule.parent;
  appDir = path.dirname(topModule.filename);
}

function initBuildQueue() {
  buildQueue = getDirectories(`${appDir}/../../2dkit/`);
}


function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}

function build() {
  if(buildQueue.length > 0) {
    var e = buildQueue.pop();
    console.log(`Building ${chalk.cyan(e)}`);
    var ps = spawn(`2dk`, [`--config`, `${appDir}/../../2dkit/${e}/2DKit.yaml`, `build`]);

    ps.stdout.on('data', (data) => {
      console.log(`${chalk.green('stdout: ')} ${data}`.trim());
      if(data.toString().toLowerCase().indexOf('the project was built') >= 0) {
        ps.kill();
      }
    });

    ps.stderr.on('data', (data) => {
      console.log(`${chalk.red('stderr: ')} ${data}`.trim());
    });

    ps.on('close', (code) => {
      console.log(``);
      build();
    });
  } else {
    console.log(`Completed.`);
    console.log(``);
  }
}

main();