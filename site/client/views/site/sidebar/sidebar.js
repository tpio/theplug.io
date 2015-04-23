Template.sidebar.helpers({
   'articles' : function() {
       return Articles.find({}).fetch();
   }
});