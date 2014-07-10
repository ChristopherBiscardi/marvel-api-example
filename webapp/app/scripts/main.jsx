'use strict'


var CreatorsListView = require('./Creators/creators').CreatorsListView
var ComicsListView = require('./Comics/comics').ComicsListView


var PageView = React.createClass({
  render: function() {
      return (
          <div>
                        <div className='jumbotron'>
                  <h1>The Marvel API Universe</h1>
              </div>
        <div className='container-fluid'>
              <div className='row'>
              <div id='creators' className='col-md-6 marvel-left'></div>
              <div id='comics' className='col-md-6 marvel-right'></div>
              </div>
              <footer>
                  <div className='span12'><a href='http://marvel.com'>Data provided by Marvel. © 2014 MARVEL</a></div>
              </footer>
        </div>
              </div>
      );
  }
});

var page = new Backbone.Model()

var pageView = PageView({
    model:page
    });

// Mount your component directly
React.renderComponent(pageView, document.body);
React.renderComponent(CreatorsListView({collection: new Backbone.Collection()}), document.getElementById('creators'))
React.renderComponent(ComicsListView({collection: new Backbone.Collection()}), document.getElementById('comics'))
