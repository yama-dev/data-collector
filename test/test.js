const assert = require('assert');

const fs = require('fs-extra')
const dataCollector = require('../dataCollector.js');

let stdout_data = null;

describe('Run "order:DESC"', function() {
  it('set data.', function() {
    try {
      stdout_data = dataCollector({
        data: 'data',
        order: 'DESC',
        orderby: 'date',
      });
    } catch (e) {
      throw e;
    }
  });

  describe('check `all` data', function() {
    it('length', function() {
      assert.strictEqual(3, stdout_data.all.length);
    });
    it('title', function() {
      assert.strictEqual('ウェブサイトを開設しました', stdout_data.all[0].title);
      assert.strictEqual('sample json', stdout_data.all[1].title);
    });
  });

  describe('check `news` data', function() {
    it('length', function() {
      assert.strictEqual(2, stdout_data.news.length);
    });
    it('title', function() {
      assert.strictEqual('ウェブサイトを開設しました', stdout_data.news[0].title);
      assert.strictEqual('sample json', stdout_data.news[1].title);
    });
  });

  after(function(done) {
    // console.log('data \n');
    // console.log(stdout_data);
    done();
  });
});

describe('Run "order:ASC"', function() {
  it('set data.', function() {
    try {
      stdout_data = dataCollector({
        data: 'data',
        order: 'ASC',
        orderby: 'date',
      });
    } catch (e) {
      throw e;
    }
  });

  describe('check `all` data', function() {
    it('length', function() {
      assert.strictEqual(3, stdout_data.all.length);
    });
    it('title', function() {
      assert.strictEqual('sample xml', stdout_data.all[0].title);
      assert.strictEqual('sample json', stdout_data.all[1].title);
    });
  });

  describe('check `news` data', function() {
    it('length', function() {
      assert.strictEqual(2, stdout_data.news.length);
    });
    it('title', function() {
      assert.strictEqual('sample json', stdout_data.news[0].title);
      assert.strictEqual('ウェブサイトを開設しました', stdout_data.news[1].title);
    });
  });

  after(function(done) {
    // console.log('data \n');
    // console.log(stdout_data);
    done();
  });
});
