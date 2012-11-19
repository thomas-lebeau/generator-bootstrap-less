
var util = require('util'),
  yeoman = require('yeoman');


module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.main = function main() {
  this.write('app/css/style.css', "/* Will be compiled down to a single stylesheet with your less files */");
  this.directory('.', '.');
};

Generator.prototype.fetchBootstrap = function fetchBootstrap() {
  var cb = this.async();

  this.remote('twitter', 'bootstrap', 'master', function(err, remote) {
    if(err) { return cb(err); }

    remote.directory('less', 'app/less/bootstrap');
    remote.directory('img', 'app/img');
    remote.directory('js', 'app/js/vendor/bootstrap');

    cb();
  });
};
