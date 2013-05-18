# Generator Bootstrap Less [![Build Status](https://travis-ci.org/Thomas-Lebeau/generator-bootstrap-less.png?branch=master)](https://travis-ci.org/Thomas-Lebeau/generator-bootstrap-less)
A Generator for Yeoman to work with the Less version of Twitter Bootstrap


## About
This generator has been redev from scratch to work with Yeoman 1.0
The improvments are:
- Much easier installation process. No needs to install dependencies manually anymore
- Better respect of Yeoman's workflow
- Possibility to include [Font Awesome](https://github.com/FortAwesome/Font-Awesome)


## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install generator-bootstrap-less`
- Run: `yo bootstrap-less` to scaffold your project
- Run `grunt` for building and `grunt server` for preview

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.


## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)


## Author
*Thomas Lebeau*

* [http://lebeau.io](http://lebeau.io)
* [@tomalebeau](http://twitter.com/tomalebeau)
