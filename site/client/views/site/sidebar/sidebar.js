Template.sidebar.helpers({
    'articles' : function() {

        var type = Session.get('action-type');
        var data = Meteor.Collection.get(type).find({}).fetch();
        Session.set('articles', data);
        return Session.get('articles');
    },
    'checkType' : function(type) {
        return Session.get('action-type') == type;
    },
    'getIcon' : function() {
        var category = Categories.findOne({_id : this.category_id});
        return category ? category.icon : "";
    }
});

Template.sidebar.events({
    'click .sidebar-nav li' : function(event) {
        var _this = $(event.currentTarget);
        _this.parent().find('li').removeClass('active');
        _this.addClass('active');

        var type = _this.attr('data-action');
        Session.set('action-type', type);
    },
    'click .content-container li' : function(event) {
        var _this = $(event.currentTarget);
        if(_this.hasClass('category')) {
            Session.set('currentCategory', this._id);
        }

        $('.sidebar-nav li').removeClass('active');
        $('.sidebar-nav li:eq(0)').addClass('active');
        Session.set('action-type', "articles");
    }
});

Template.sidebar.rendered = function() {
    this.find('ul')._uihooks = {
        insertElement: function(node, next) {
            $(node).velocity("transition.slideLeftBigIn", { stagger: 100, drag: true}).insertBefore(next);
        },
        removeElement: function(node) {
            //$(node).fadeOut(function() {
            //    this.remove();
            //});
            $(node).remove();
        }
    };

    Deps.autorun(function() {
        Session.set('articles', Articles.find({}).fetch());
        Session.set('action-type', "articles");
    });
};