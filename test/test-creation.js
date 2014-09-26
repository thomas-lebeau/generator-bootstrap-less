/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var assert  = require('assert');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;


describe('bootstrap-less generator', function () {

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  describe('run test', function () {

    var expectedContent = [
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      ['app/styles/main.less', /bootstrap.less/],
    ];
    var expected = [
      '.editorconfig',
      '.gitignore',
      '.gitattributes',
      'package.json',
      'bower.json',
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      'app/index.html',
      'app/styles/main.less',
      'app/scripts/main.js'
    ];
    var fontawesomeExpectedContent = [
      ['Gruntfile.js', /font-awesome/],
      ['bower.json', /font-awesome/],
      ['app/styles/main.less', /font-awesome.less/],
      ['app/index.html', /Font Awesome/]
    ];
    var jsBootstrapExpectedContent = [
      ['app/index.html', /bootstrap.js/]
    ];

    var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    }

    var runGen;

    beforeEach(function () {
      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
    });

    it('creates expected files', function (done) {

      runGen.withOptions(options).on('end', function () {

        assert.file([].concat(
          expected,
          'app/scripts/hello.coffee'
        ));
        assert.fileContent(expectedContent);

        assert.noFileContent([].concat(fontawesomeExpectedContent, jsBootstrapExpectedContent));
        done();
      });
    });

    it('creates expected fontawesome components', function (done) {
      runGen.withOptions(options).withPrompt({features: ['fontawesome']})
      .on('end', function () {
        assert.fileContent(fontawesomeExpectedContent);

        done();
      });
    });

    it('creates expected Bootstrap javascript components', function (done) {
      runGen.withOptions(options).withPrompt({features: ['jsBootstrap']})
      .on('end', function () {
        assert.fileContent(jsBootstrapExpectedContent);

        done();
      });
    });

    it('creates expected Bootstrap javascript components', function (done) {
      runGen.withOptions(options).withPrompt({features: ['respondjs']})
      .on('end', function () {
        assert.fileContent([
          ['Gruntfile.js', /respond.min.js/],
          ['bower.json', /respond/],
          ['app/index.html', /respond.min.js/]
        ]);

        done();
      });
    });

  });
});
