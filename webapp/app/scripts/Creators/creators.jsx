'use strict';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports.CreatorsListView = React.createBackboneClass({
    componentWillMount: function() {
        $.ajax({
            url: "//gateway.marvel.com:80/v1/public/creators?orderBy=lastName&limit=20&apikey=0e3f5d7c2e9a7d527bd626e2b5107aaf",
            dataType: 'json',
            success: function(data) {
                // This ignores offset, limit, etc. Should fix that.
                console.log(data)
                this.getCollection().reset(data.data.results);
                //--
                var self = this;
                console.log('done1');
                setTimeout(function(){
                    self.getCollection().comparator = function(obj){
                        return obj.get('firstName');
                    }
                    self.getCollection().sort()
                }, 10000)
                //--
            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });
    },
    render: function() {
        var creatorsList = this.getCollection().map(function(user){
            var fullName = user.get('firstName') + user.get('lastName');
            var imgsrc = user.get('thumbnail').path + "." + user.get('thumbnail').extension;
return   <ReactCSSTransitionGroup transitionName="example">
  <li key={user.get('id')} className=''>
    <div className="col-md-4">
      <a className="" href="#">
        <img className="media-object col-md-6" src={imgsrc} alt=""/>
      </a>
      <div className="media-body">
        <h4 className="media-heading">{fullName}</h4>
        stuff
      </div>
    </div>
</li>
</ReactCSSTransitionGroup>
        })
        return (
<div>
    <ul  className='creatorsList list-unstyled row'>
      {creatorsList}
    </ul>
</div>
        );
    }
});
