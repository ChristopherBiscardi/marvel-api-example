'use strict';
var UserView = React.createBackboneClass({
    changeOptions: 'change:name', // DEFAULT is 'change',
    render: function() {
        return (
          <div>
              <h1>{this.getModel().get('name')}</h1>
          </div>
        );
    }
});

var user = new Backbone.Model();
user.set({'name':'Tony'});
var userView = UserView({model: user});

// Mount your component directly
React.renderComponent(userView, document.getElementById('element'));

// Render as a subview
var ProfileView = React.createClass({
  render: function() {
      return (
        <div>
          <UserView model={this.props.user} />
        </div>
      );
  }
});
