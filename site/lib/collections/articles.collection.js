SimpleSchema.extendOptions({
    form: Match.Optional(Match.OneOf(String)),
    showInTable: Match.Optional(Match.OneOf(Boolean))
});

ArticleSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200,
        form : "text",
        showInTable: true
    },
    category_id: {
        type: String,
        label: "Category",
        form: 'hasOne|categories|title'
    },
    slug: {
        type: String,
        label: "Slug",
        form: "text"
    },
    source_url: {
        type: String,
        label: "Site Source",
        form: "text"
    },
    content: {
        type: String,
        label: "Brief summary",
        form: "wysiwyg"
    }
});

//var total = Articles.find({
//    title: doc.title
//}).fetch().length;
//doc.slug = (total + 1) + '-' + doc.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

Articles = new Meteor.Collection("articles");
Articles.allow({
    ////only allow inserting if the user is not anonymous, and the document
    ////being inserted belongs to the user inserting it.
    'insert': function(userId, doc) {

        return true;
    },
    //
    ////for each of the records being update, make sure the current user is the owner
    'update': function(userId, docs, fields, modifier) {

        Notifications.insert({
            'message' : 'User has Updated Article ' + docs.title,
            'collection' : 'articles',
            'collection_id' : docs._id,
            'collection_url' : Router.path('collection.edit', { collection : 'articles', _id: docs._id})
        });
        return true;
    }
    //
    ////for each of the records being removed, make sure the user owns them
    //'remove': function(userId, docs) {
    //    return Roles.userIsInRole(Meteor.user(), ['admin', 'author']);
    //}
});

Articles.helpers({
    category: function() {
        return Categories.findOne(this.category_id);
    }
});


Articles.attachSchema(ArticleSchema);