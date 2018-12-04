# Calligraphy
A free webapp to generate a calligraphy copybook with any text and some free typefaces.
See a demo: [Calligraphy Demo]

### Version
1.0.0

### Maintained by
[Bruno Monteiro][b'uno], also known as [b'uno]. ([linkedin] - [twitter] - [facebook])

### Tech

Calligraphy uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Gulp] - the streaming build system
* [MaterializeCSS] - a CSS Framework based on Material Design
* [jQuery] - duh

And of course Calligraphy itself is open source with a [public repository][GitHub].

### Installation

You need Gulp installed globally:

```sh
$ npm i -g gulp
```

...and Bower:
```sh
$ npm install -g bower
```
then:

```sh
$ git clone https://github.com/bunomonteiro/Calligraphy.git calligraphy
$ cd calligraphy
$ npm install
$ bower install
$ gulp
```

### Development

Want to contribute? Great!

Calligraphy uses Gulp + Browsersync for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these command.

```sh
$ gulp clean
$ gulp serve
```

License
----

The **Calligraphy** source code is issued under MIT license, a permissive free license, which means you can modify it as you please, and incorporate it into your own commercial or non-commercial software.

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does it's job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [GitHub]: <https://github.com/bunomonteiro/Calligraphy>
   [b'uno]: <http://buno.com.br>
   [linkedin]: <http://linkedin.com/in/bunomonteiro>
   [twitter]: <http://twitter.com/bunomonteiro>
   [facebook]: <http://fb.com/bunomonteiro>
   [marked]: <https://github.com/chjj/marked>
   [node.js]: <http://nodejs.org>
   [jQuery]: <http://jquery.com>
   [Gulp]: <http://gulpjs.com>
   [MaterializeCSS]: <https://github.com/Dogfalo/materialize>
   [Calligraphy Demo]: <http://bunomonteiro.github.io/Calligraphy/>
