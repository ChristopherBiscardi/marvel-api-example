'use strict';

module.exports.NavView = React.createBackboneClass({
    changeOptions: 'change', // DEFAULT is 'change',
    render: function() {
        return (
          <div>
              <h1>{this.getModel().get('name')}</h1>
          </div>
        );
    }
});

var nav = new Backbone.Collection({
  name:'Home',
  'url':'/',
  'active':true
  });

