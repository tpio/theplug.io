Template.hasOne.helpers({
    /**
     * Finds the related collection and returns its data and selects the correct option
     * @returns {Array}
     */
    'child' : function() {

        var configOptions = this.values.form.split('|');
        var collection = Meteor.Collection.get(configOptions[1]);
        var relatedModel;
        if(this.model)
            relatedModel = collection.findOne({_id: this.model[this.key]});

        var arr = [];
        $.each(collection.find({}).fetch(), function (index, val) {

            var option = {
                cvalue: val._id,
                text: val[configOptions[2]],
                selected: false
            };

            if (relatedModel) {
                if (val._id === relatedModel._id)
                    option.selected = true;
            }

            arr.push(option);
        });

        return arr;
    }
});

Template.hasOne.rendered = function() {
    if(this.data) {
        Meteor.subscribe(this.data.collection);
    }
    //if(this.data.model && this.data.collection)
    //    this.$('select').selectize({
    //        create: false,
    //        sortField: 'text'
    //    })
};