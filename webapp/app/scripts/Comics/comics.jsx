'use strict';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports.ComicsListView = React.createBackboneClass({
    componentWillMount: function() {
        $.ajax({
            url: "//gateway.marvel.com:80/v1/public/comics?orderBy=onsaleDate&limit=20&apikey=0e3f5d7c2e9a7d527bd626e2b5107aaf",
            dataType: 'json',
            success: function(data) {
                // This ignores offset, limit, etc. Should fix that.
                console.log(data)
                this.getCollection().reset(data.data.results);
                //--
                var self = this;
                console.log('done1');
                setTimeout(function(){
                    $.ajax({

                        url: "//gateway.marvel.com:80/v1/public/comics?orderBy=onsaleDate&limit=20&apikey=0e3f5d7c2e9a7d527bd626e2b5107aaf",
                        dataType: 'json',
                        success: function(data) {
                            // This ignores offset, limit, etc. Should fix that.
                            self.getCollection().reset(data.data.results);
                            console.log('done2');
                        }.bind(self),
                        error: function(xhr, status, err) {
                        }.bind(self)
                    });
                }, 10000)
                //--
            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });
    },
    render: function() {
        var creatorsList = this.getCollection().map(function(user){
            var imgsrc = user.get('thumbnail').path + "." + user.get('thumbnail').extension;
return   <ReactCSSTransitionGroup transitionName="example">
  <li key={user.get('id')} className=''>
    <div className="col-md-4">
      <a className="" href="#">
        <img className="media-object col-md-6" src={imgsrc} alt=""/>
      </a>
      <div className="media-body">
        <h4 className="media-heading">{user.get('title')}</h4>
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
