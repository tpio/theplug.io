CategoriesSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200,
        form : "text",
        showInTable: true
    }
});

Categories = new Meteor.Collection("categories");
Categories.allow({
    ////only allow inserting if the user is not anonymous, and the document
    ////being inserted belongs to the user inserting it.
    //'insert': function(userId, doc) {
    //    return Roles.userIsInRole(Meteor.user(), ['admin', 'author']);
    //},
    //
    ////for each of the records being update, make sure the current user is the owner
    'update': function(userId, docs, fields, modifier) {
        Notifications.insert({
            'message' : 'User has Updated Category ' + docs.title,
            'collection' : 'categories',
            'collection_id' : docs._id,
            'collection_url' : Router.path('collection.edit', { collection : 'categories', _id: docs._id})
        });
        return true;
    }
    //
    ////for each of the records being removed, make sure the user owns them
    //'remove': function(userId, docs) {
    //    return Roles.userIsInRole(Meteor.user(), ['admin', 'author']);
    //}
});


Categories.attachSchema(CategoriesSchema);