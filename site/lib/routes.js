Router.map(function() {
    Router.route('/', {
        name: 'home',
        controller: 'FrontEndController',
        template: 'home'
    });
    Router.route('/a/:slug', {
        name: 'article',
        controller: 'ArticleController',
        template: 'article'
    });
    Router.route('/admin/:collection', {
        controller: 'AdminListController',
        template: 'adminListModel',
        name:'collection.list'
    });
    Router.route('/admin/:collection/new', {
        controller: 'AdminCreateController',
        template: 'adminCreateModel',
        name:'collection.create'
    });
    Router.route('/admin/:collection/:_id', {
        controller: 'AdminEditController',
        template: 'adminEditModel',
        name:'collection.edit'
    });
});