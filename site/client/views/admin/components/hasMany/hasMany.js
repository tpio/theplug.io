Template.hasMany.helpers({
    /**
     * Finds the related collection and returns its data and selects the correct option
     * @returns {Array}
     */
    'child' : function() {
        console.log(this);

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

            arr.push(option);
        });

        return arr.join(",");
    }
});

Template.hasMany.rendered = function() {
    if(this.data.model)
        this.$('input').selectize({
            delimiter: ',',
            persist: false,
            create: function(input) {
                return {
                    value: input,
                    text: input
                }
            }
        })
};