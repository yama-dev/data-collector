const fs = require('fs');
const path = require('path');
const glob = require('glob');
const jsyaml = require('js-yaml');
const jsxml = require('fast-xml-parser');

function reviveDate(key, value) {
  if (value == null ||
    value.constructor !== String ||
    value.search(/^\d{4}-\d{2}-\d{2}/g) === -1)
    return value;
  return new Date(value);
}

const dataCollector = options => {
  let data = {
    all: []
  };

  const _options = {
    data: 'data', // Directory where data is stored.
    order: 'DESC', // Sort. DESC or ASC
    orderby: 'date', // Sort. property-name.
    ignore: ['**/node_modules/**/*']
  };

  options = {
    ..._options,
    ...options
  };

  let files = glob.sync(`${options.data}/**/*`, {
    ignore: options.ignore,
    nodir: true
  });

  for (var i = 0, len = files.length; i < len; i++) {
    let filename = files[i];
    let filedata = fs.readFileSync(filename, { encoding: 'utf-8' });

    let _data = {};
    if(path.extname(filename) === '.yaml'){
      // yaml
      _data = jsyaml.load(filedata);
    } else if(path.extname(filename) === '.json'){
      // json
      _data = JSON.parse(filedata, reviveDate);
    } else if(path.extname(filename) === '.xml'){
      // xml
      let _xml = jsxml.parse(filedata);
      if(_xml.root){
        _data = JSON.parse(JSON.stringify(_xml.root), reviveDate);
      } else {
        _data = JSON.parse(JSON.stringify(_xml), reviveDate);
      }
    }

    // Only data that meets the conditions.
    if(_data.title || _data.slug || _data.id){
      data.all.push(_data);
    }

    if(_data.data_type){
      if(!data[_data.data_type]) data[_data.data_type] = [];
      data[_data.data_type].push(_data);
    }
  }

  // Sort
  for (let key in data) {

    // set order property-name.
    let _orderby = data[key][0][options.orderby] ? options.orderby : data[key][0]['date'] ? 'date' : null;

    if(_orderby){
    if(options.order == 'ASC'){
      data[key].sort(function(a,b){
          if(a[_orderby] < b[_orderby]) return -1;
          if(a[_orderby] > b[_orderby]) return 1;
        return 0;
      });
    } else if(options.order == 'DESC'){
      data[key].sort(function(a,b){
          if(a[_orderby] < b[_orderby]) return 1;
          if(a[_orderby] > b[_orderby]) return -1;
        return 0;
      });
    }
  }
  }

  return data;
};

module.exports = dataCollector;
