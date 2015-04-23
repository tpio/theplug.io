
    FrontEndController = RouteController.extend({
        layoutTemplate: 'siteTemplate',
        //yieldRegions: {
        //    'rightSideBar': {to: 'rightSide'}
        //},
        waitOn: function () {
            return Meteor.subscribe('articles') && Meteor.subscribe('categories');
        },
        title: 'ThePlug',
        description: 'theplug',
        onBeforeAction: function () {
            if (this.ready()) {
                this.next();
            }
        },
        onAfterAction: function () {
            if (Meteor.isClient) {
                //    todo: Add SEO
            }
        },

        action: function () {
            this.render();
        },
        data: {

        }
    });

    ArticleController = FrontEndController.extend({
        loadingTemplate: 'article-loading',
        waitOn: function () {
            return Meteor.subscribe('view-article', this.params.slug);
        },
        data: function() {
            var article = Articles.findOne({slug: this.params.slug});
            return {

                article: article

            };
        }
    });

    AdminController = FrontEndController.extend({
        layoutTemplate: 'adminTemplate',
        waitOn: function () {
            return Meteor.subscribe(this.params.collection) && Meteor.subscribe('notifications');
        }
    });

    AdminCreateController = AdminController.extend({
        data : function() {
            return {
                collection: this.params.collection
            };
        }
    });

    AdminEditController = AdminController.extend({
        data : function() {
            return {
                collection: this.params.collection,
                _id: this.params._id
            };
        }
    });

    AdminListController = AdminController.extend({
        data : function() {
            return {
                collection: this.params.collection
            };
        }
    });