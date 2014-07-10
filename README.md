## Developing

* Get an API key from [Marvel](http://developer.marvel.com/)
* Add `marvel.dev` to your Marvel [request domains](https://developer.marvel.com/account)
* Put `127.0.0.1  marvel.dev` in your hosts file

API Keys are currently hardcoded! Should be at least moved into a separate "keys.js" file. The application should work whether or not you actually replace the keys.

We need [bower][bower], [gulp][gulp] and [browserify][browserify]

```
npm install -g bower gulp browserify
```

then npm install the local dependencies:

```
npm install
```

and run gulp.

```
gulp watch
```

gulp watch will run gulp tasks when files change. There is currently an issue that starts like this:

```
Error: module "base64-js" not found from...
```

which could be related to [gulp-browserify][gulp-browserify]. We should switch to just normal [browserify][browserify].

It can be worked around for now by simply running `gulp watch` until it succeeds, at which point there is no issue.

`gulp watch` will run `livereload` to automatically update the browser with changes.

### Gulp

[Gulp][gulp] is a streaming build system. All of the relevant tasks are in `gulpfile.js`.

#### Example Gulp Task:

An example gulp task for running jshint on our code:

```javascript
gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});
```

We could run this task by running:

```
gulp scripts
```

### bower

[bower][bower] is used to manage vendor dependencies such as backbone. All dependencies are installed into `./app/bower_components`

#### Saving New Dependencies

```
bower install --save react.backbone
```

### Image Optimization

```
gulp images
```

We are using [gulp-imagemin][gulp-imagemin] to optimize images.

### Browserify

```
gulp browserify
````

We are using [browserify][browserify] to modularize our code with CommonJS. The way this works is fairly simple.

say we have two files in the same directory. `main.js` can require `user.js` using familiar syntax:

```javascript
// main.js
var user = require('./user');

console.log(user.name);
```

```javascript
// user.js
module.exports.name = 'Chris';
```

We would then run [browserify][browserify] on main.js. The dependencies will be traced through `require` statements and compiled into a single bundle.

Vendor libs (Backbone, React, etc) are currently globals in dev and bundled in their own file for `dist/`. This will give us two files, `vendor.js` and `main.js` for third party (which changes less often) and application code (changes frequently) respectively. Other options include using external CDNs for 3rd party code.

### Less

We are using [bootstrap][bootstrap] with [less][less]. Styles are located in `app/styles/main.less`. Bootstrap is included in `main.less` rather than individually included in `index.html`.

### React

[React][react] .jsx files are compiled to .js and then sent through [browserify][browserify] so we can `require` other .jsx files. Any .jsx files included in `*.html` should be included as `.js` files. However, browserify builds a single file for us, so any files in the dependency tree of `main.jsx` should be wrapped up nicely for us.

### Backbone

We are using [Backbone][backbone] with [React][react]. Generally speaking, Backbone is responsible for routing and models, React is responsible for rendering.

## Productionizing

```
gulp build
```

Will build all files for production and put them into `dist/`. (Mostly works, not tested well)

## JavaScript Structure & Future

We are using [react.backbone][react.backbone] for easier backbone/react integration.

### TODO

- Backbone Router
  * has not been implemented yet
  * Is "Overhead Control" of distinct urls
  * Should never be called directly, only through event aggregator
- Event Aggregator
   * `vent = _.extend({}, Backbone.Events);`
   * Router is never manually triggered, Instead we use the `vent` object to trigger inter-component events.
- Design
  * Loosely, the front page should have a "Creators" column and a "Comics" column
    - Each column has a dynamic search filter on top
    - We can easily re-render with React and have some nice transitions
  * Front page lists should be clickable "cards" that send a user to a specific instance of creator/comic
  * Given enough time, should have been wireframed, mocked and a style guide should have been created.
    - Bootstrap has a decent example of a style guide on it's page already.
- React
  * the application should be built of composable React components.
  * Currently the components are not composed (mostly because there is no Router controlling navigation)
- Backbone.History
  * Basically useless until Router is introduced.

  
[bower]: http://bower.io/
[gulp]: http://gulpjs.com/
[browserify]: http://browserify.org/
[gulp-browserify]: https://www.npmjs.org/package/gulp-browserify
[gulp-imagemin]: https://www.npmjs.org/package/gulp-imagemin
[bootstrap]: http://getbootstrap.com/
[less]: http://lesscss.org/
[react]: http://facebook.github.io/react/
[backbone]: http://backbonejs.org/
[react.backbone]: https://github.com/usepropeller/react.backbone