# Yeoman Bootstrap Less

Generator for [Yeoman](http://yeoman.io/) to init a project with the Less version of [Twitter Bootstrap](http://twitter.github.com/bootstrap/)

## Installation

`$ sudo npm install -g yeoman-bootstrap-less`

This will install the generator globally so you will be able to use it everywhere.

*You may need to re-install the generator every time you update Yeoman.*

#### Uninstallation

  Here is how to uninstall the generator

  * `$ cd /usr/local/lib/node_modules/yeoman/node_modules/yeoman-generators/lib/generators`
  * `$ sudo rm -rf bootstrap-less/`

## Usage

### Init

Bootstrap-less need to use [grunt-recess](https://github.com/sindresorhus/grunt-recess) Grunt task to compile less files, so you need to install it in your project folder.

* `$ yeoman init bootstrap-less` - Init your project with the last version of Twitter Bootstrap's less files
* `$ npm install grunt-recess`  - Install `grunt-recess` in your project folder

### Server

`yeoman server` - Launch a preview server which will begin watching for changes

### Build

`yeoman build` - Build an optimized version of your app, ready to deploy

## Author

*Thomas Lebeau*

* [http://thomaslebeau.me](http://thomaslebeau.me)
* [@tomalebeau](http://twitter.com/tomalebeau)
