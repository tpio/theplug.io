
Template.adminListModel.helpers({
    /**
     * Generate a tabled based on the collection schemas
     * @returns {string}
     */
    getTableFromSchema: function () {
        var data = Router.current().data();
        var collection = Meteor.Collection.get(data.collection);
        var schema = collection._c2._simpleSchema._schema;
        var $table = $("<table/>", { class : "table"});
        $.each(collection.find({}).fetch(), function(index, model) {
            $.each(schema, function(key, value) {
                $tr = $("<tr/>");
                if(value.showInTable) {
                    $tr.append($('<td/>').html(model[key]));
                    $tr.append($('<td/>').html($('<a/>', { href : '/admin/'+ data.collection + "/" +model._id}).html('edit')));
                    $table.append($tr);
                }
            });
        })
        return $table.get(0).outerHTML;
    }
});

Template.adminCreateModel.helpers({
    /**
     * Alert the user that an action has been completed
     * @param msg
     */
    showAlert: function(msg) {
        //todo: create nice alert that fades in and then out after x time
        alert(msg);
    },
    /**
     * Returns the Active Collections Schema
     * @returns {Array}
     */
    activeSchema : function() {
        var data = this;
        var collection = Meteor.Collection.get(this.collection);
        var schema = collection._c2._simpleSchema._schema;
        var arr = [];
        $.each(schema, function (key, value) {
            arr.push({
                template: value.form.split('|')[0],
                data : {
                    key : key,
                    values : value
                }
            });
        });
        return arr;
    }
});

Template.adminEditModel.helpers({
    /**
     * Returns the Active Collections Schema with data
     * @returns {Array}
     */
    activeSchema : function() {
        var data = Router.current().data();
        var collection = Meteor.Collection.get(data.collection);
        var schema = collection._c2._simpleSchema._schema;
        var model = collection.findOne({_id : data._id});
        var arr = [];
        if(model !== undefined) {
            $.each(schema, function (key, value) {
                arr.push({
                    template: value.form.split('|')[0],
                    data : {
                        model: model,
                        key : key,
                        value : model[key],
                        values : value,
                        collection: value.form.split('|')[1]
                    }
                });
            });
        }
        return arr;
    }
});

Template.adminListModel.events({
    'click #create-new-model' : function() {
        console.log(this);
        Router.go('collection.create', { collection : this.collection });
    }
});

Template.adminEditModel.events({
    /**
     * Submit the generated form and update the current model
     * @returns {boolean}
     */
    'click #update-model' : function() {
        var $form = $('#model-form');
        var rData = Router.current().data();
        var data = {};
        $.each($form.find('input, textarea, select'), function(index, elm) {
            var $elm = $(elm);
            if(elm.name !== '') {
                if ($elm.attr('data-wysiwyg') !== "true")
                    data[elm.name] = elm.value;
                else
                    data[elm.name] = $(elm).code();
            }
        });
        var collection = Meteor.Collection.get(rData.collection);
        collection.update({_id : rData._id}, {$set: data}, function(error, status) {
            if(error) {
                Template.adminCreateModel.__helpers.get('showAlert')('There was an error!');
                console.log(error);
            } else {
                Template.adminCreateModel.__helpers.get('showAlert')('Saved!');
                setTimeout(function() {
                    Router.go('/admin/'+rData.collection);
                }, 1000);
            }
        });
        return false;
    }
});

Template.adminCreateModel.events({
    /**
     * Submit the generated form and update the current model
     * @returns {boolean}
     */
    'click #create-model' : function() {
        var $form = $('#model-form');
        var rData = Router.current().data();
        var data = {};
        $.each($form.find('input, textarea, select'), function(index, elm) {
            var $elm = $(elm);
            if(elm.name !== '') {
                if ($elm.attr('data-wysiwyg') !== "true")
                    data[elm.name] = elm.value;
                else
                    data[elm.name] = $(elm).code();
            }
        });
        var collection = Meteor.Collection.get(rData.collection);
        collection.insert(data, function(error, status) {
            if(error) {
                Template.adminCreateModel.__helpers.get('showAlert')('There was an error!');
                console.log(error);
            } else {
                Template.adminCreateModel.__helpers.get('showAlert')('Saved!');
                setTimeout(function() {
                    Router.go('/admin/'+rData.collection);
                }, 1000);
            }
        });
        return false;
    }
});

Template.lteNav.helpers({
    'notifications' : function() {
        return Notifications.find({});
    }
});