# data-collector

Extract data from yaml, json, xml files.

## Install

``` bash
npm install --save-dev @yama-dev/data-collector
```

## Use

make data file.

``` bash
ls
# /project-root/
#   └─ data
#     ├── 20200101.yaml # yaml
#     ├── 20200201.json # json
#     └── 20200301.xml  # xml
```

``` javascript
import dataCollector from '@yama-dev/data-collector';

let options = {
  data: 'data', // Directory where data is stored.
  order: 'DESC', // Sort. DESC or ASC
  orderby: 'date', // Sort. property-name.
};

dataCollector(options);
```

## Licence

[MIT](https://mit-license.org/)

<br>

## Author

[yama-dev](https://github.com/yama-dev)

