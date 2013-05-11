'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BootstrapLessGenerator = module.exports = function BootstrapLessGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';

  // for hooks to resolve on mocha by default
  if (!options['test-framework']) {
    options['test-framework'] = 'mocha';
  }
  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', { as: 'app' });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.mainJsFile = '';

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BootstrapLessGenerator, yeoman.generators.NamedBase);

BootstrapLessGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  console.log(welcome);

  var prompts = [{
    name: 'fontawesome',
    message: 'Would you like to use FontAwesome?',
    default: 'Y/n',
    warning: 'Yes: Enabling this will be totally awesome!'
  }, {
    name: 'jsBootstrap',
    message: 'Would you like to use Bootstrap Javascript files?',
    default: 'Y/n',
    warning: 'Yes: Enabling this will be totally awesome!'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.fontawesome = (/y/i).test(props.fontawesome);
    this.jsBootstrap = (/y/i).test(props.jsBootstrap);

    cb();
  }.bind(this));
};

BootstrapLessGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

BootstrapLessGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

BootstrapLessGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

BootstrapLessGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

BootstrapLessGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

BootstrapLessGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

BootstrapLessGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('404.html', 'app/404.html');
  this.copy('robots.txt', 'app/robots.txt');
  this.copy('htaccess', 'app/.htaccess');
};

BootstrapLessGenerator.prototype.mainStylesheet = function mainStylesheet() {
  if (!this.fontawesome) {
    this.write('app/styles/main.less', '@import "../bower_components/bootstrap/less/bootstrap.less";\n@import "../bower_components/bootstrap/less/responsive.less"; // Don\'t forget to comment lines 22 to remove the second import call to **mixin.less**\n\n.hero-unit {\n  margin: 50px auto 0 auto;\n}');
  } else {
    this.write('app/styles/main.less', '@import "../bower_components/bootstrap/less/bootstrap.less";\n@import "../bower_components/bootstrap/less/responsive.less"; // Don\'t forget to comment lines 22 to remove the second import call to **mixin.less**\n@import "../bower_components/font-awesome/less/font-awesome.less";\n\n.hero-unit {\n  margin: 50px auto 0 auto;\n}');
  }
};

BootstrapLessGenerator.prototype.writeIndex = function writeIndex() {
  // prepare default content text
  var defaults = ['HTML5 Boilerplate', 'Twitter Bootstrap'];
  var contentText = [
    '    <div class="container">',
    '      <div class="hero-unit">',
    '        <h1>\'Allo, \'Allo!</h1>',
    '        <p>You now have</p>',
    '        <ul>'
  ];

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
    'bower_components/jquery/jquery.js',
    'scripts/main.js'
  ]);


  if (this.jsBootstrap) {
    // wire Twitter Bootstrap plugins
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor/bootstrap.js', [
      'bower_components/bootstrap/js/bootstrap-affix.js',
      'bower_components/bootstrap/js/bootstrap-alert.js',
      'bower_components/bootstrap/js/bootstrap-dropdown.js',
      'bower_components/bootstrap/js/bootstrap-tooltip.js',
      'bower_components/bootstrap/js/bootstrap-modal.js',
      'bower_components/bootstrap/js/bootstrap-transition.js',
      'bower_components/bootstrap/js/bootstrap-button.js',
      'bower_components/bootstrap/js/bootstrap-popover.js',
      'bower_components/bootstrap/js/bootstrap-typeahead.js',
      'bower_components/bootstrap/js/bootstrap-carousel.js',
      'bower_components/bootstrap/js/bootstrap-scrollspy.js',
      'bower_components/bootstrap/js/bootstrap-collapse.js',
      'bower_components/bootstrap/js/bootstrap-tab.js'
    ]);
  }

  if (this.fontawesome) {
    defaults.push('Font Awesome');
  }

  this.mainJsFile = 'console.log(\'\\\'Allo \\\'Allo!\');';

  // iterate over defaults and create content string
  defaults.forEach(function (el) {
    contentText.push('          <li>' + el  + '</li>');
  });

  contentText = contentText.concat([
    '        </ul>',
    '        <p>installed.</p>',
    '        <h3>Enjoy coding! - Yeoman</h3>',
    '      </div>',
    '    </div>',
    ''
  ]);

  // append the default content
  this.indexFile = this.indexFile.replace('<body>', '<body>\n' + contentText.join('\n'));
};

BootstrapLessGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.write('app/index.html', this.indexFile);
  this.write('app/scripts/main.js', this.mainJsFile);
};
