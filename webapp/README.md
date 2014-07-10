
# Future Work

* Dynamic Search Filter over Creators and Comics lists.

# Getting it up and running

* Get an API key from [Marvel](http://developer.marvel.com/)
* Add `marvel.dev` to your Marvel [request domains](https://developer.marvel.com/account)
* Put `127.0.0.1  marvel.dev` in your hosts file


# Issues
* gulp-browserify
  - gulp-browserify has some issues. Switch it out for normal browserify.
* History
  - Implement Backbone.History
* Bower
  - bower-components is not included in browserify. It should be.
* Error: module "base64-js"
  - Debug this. Likely a gulp-browserify issue.
  - Workaround: just run `gulp watch` again.