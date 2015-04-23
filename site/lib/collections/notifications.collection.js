NotificationSchema = new SimpleSchema({
    message: {
        type: String,
        label: "Message",
        max: 200,
        form : "text",
        showInTable: true
    },
    //user_id: {
    //    type: String,
    //    label: "User",
    //    max: 200,
    //    form : "text",
    //    showInTable: true
    //},
    collection: {
        type: String,
        label: "Collection",
        max: 200,
        form : "text",
        showInTable: true
    },
    collection_id: {
        type: String,
        label: "Collection",
        max: 200,
        form : "text",
        showInTable: true
    },
    collection_url: {
        type: String,
        label: "Collection",
        max: 200,
        form : "text",
        showInTable: true
    }
});

Notifications = new Meteor.Collection("notifications");
Notifications.allow({
    ////only allow inserting if the user is not anonymous, and the document
    ////being inserted belongs to the user inserting it.
    //'insert': function(userId, doc) {
    //    return Roles.userIsInRole(Meteor.user(), ['admin', 'author']);
    //},
    //
    ////for each of the records being update, make sure the current user is the owner
    //'update': function(userId, docs, fields, modifier) {
    //    if(fields.social.email || fields.social.facebook || fields.social.tumblr || fields.social.twitter || fields.social.reddit || fields.social.google)
    //        return true;
    //    return Roles.userIsInRole(Meteor.user(), ['admin', 'author']);
    //},
    //
    ////for each of the records being removed, make sure the user owns them
    //'remove': function(userId, docs) {
    //    return Roles.userIsInRole(Meteor.user(), ['admin', 'author']);
    //}
});


Notifications.attachSchema(NotificationSchema);