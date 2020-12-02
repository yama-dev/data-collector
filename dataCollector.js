const fs = require('fs');
const path = require('path');
const glob = require('glob');
const jsyaml = require('js-yaml');

const dataCollector = options => {
  let data = {
    all: []
  };

  const _options = {
    data: 'data',
    order: 'DESC',
    orderby: 'date',
    ignore: ['**/node_modules/**/*']
  };

  options = {
    ..._options,
    ...options
  };

  // glob('yaml/**/*', {ignore: ['**/node_modules/**/*']}, function (er, files) {
  //   for (var i = 0, len = files.length; i < len; i++) {
  //     let file = fs.readFileSync(files[i], { encoding: 'utf-8' });
  //     let _data = jsyaml.load(file);
  //   }
  // });

  let files = glob.sync(`${options.data}/**/*`, {ignore: options.ignore});

  for (var i = 0, len = files.length; i < len; i++) {
    let filename = files[i];
    let filedata = fs.readFileSync(filename, { encoding: 'utf-8' });

    let _data = null;
    _data = jsyaml.load(filedata);

    if(_data.title){
      data.all.push(_data);
    }

    if(_data.data_type){
      if(!data[_data.data_type]) data[_data.data_type] = [];
      data[_data.data_type].push(_data);
    }
  }

  // Sort
  if(options.order == 'ASC'){
    data.all.sort(function(a,b){
      if(a[options.orderby] < b[options.orderby]) return -1;
      if(a[options.orderby] > b[options.orderby]) return 1;
      return 0;
    });
  } else if(options.order == 'DESC'){
    data.all.sort(function(a,b){
      if(a[options.orderby] < b[options.orderby]) return 1;
      if(a[options.orderby] > b[options.orderby]) return -1;
      return 0;
    });
  }

  return data;
};

module.exports = dataCollector;
