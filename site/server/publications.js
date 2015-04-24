/**
 * Publishes all articles in the collection with out there content
 */
Meteor.publish('articles', function(category_id) {
    var sub = this;
    var options = {
        sort: {created_on: -1},
        limit: 50
        //fields: {topic:1, content: 1}
    };

    var find = {};

    if(category_id) {
        find.category_id = category_id;
    }
    // creates the cursor
    var cursor = Articles.find(find, options);

    cursor.observeChanges({
        added: function (id, doc) {
            sub.added('articles', id, doc);
        },
        changed: function (id, doc) {
            sub.changed('articles', id, doc);
        },
        removed: function (id) {
            sub.removed(id);
        }
    });

    // making sure to mark subscription as ready
    sub.ready();
});

Meteor.publish('view-article', function(slug) {
    return Articles.find({slug : slug});
});

//Notifications.remove({});

Meteor.publish('notifications', function() {
    var sub = this;
    var options = {
        sort: {created_on: -1}
        //limit: 10
        //fields: {topic:1, content: 1}
    };

    var cursor = Notifications.find({}, options);

    cursor.observeChanges({
        added: function (id, doc) {
            doc.created_on = new Date().getTime();
            sub.added('notifications', id, doc);
        },
        changed: function (id, doc) {
            console.log(doc);
            sub.changed('notifications', id, doc);
        },
        removed: function (id) {
            sub.removed(id);
        }
    });

    // making sure to mark subscription as ready
    sub.ready();
    //return Articles.find({}, { fields: {'content': 0},  sort: { created_on: -1 }});
});

Meteor.publish('categories', function() {
    var sub = this;
    var options = {
        sort: {created_on: -1},
        limit: 10
        //fields: {topic:1, content: 1}
    };

    var cursor = Categories.find({}, options);

    cursor.observeChanges({
        added: function (id, doc) {
            sub.added('categories', id, doc);
        },
        changed: function (id, doc) {
            sub.changed('categories', id, doc);
        },
        removed: function (id) {
            sub.removed(id);
        }
    });


    // making sure to mark subscription as ready
    sub.ready();
    //return Articles.find({}, { fields: {'content': 0},  sort: { created_on: -1 }});
});