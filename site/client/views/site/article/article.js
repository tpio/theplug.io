Template.article.rendered = function() {
    this.firstNode.parentNode._uihooks = {
        insertElement: function(node, next) {
            $(node).velocity("transition.slideUpIn").insertBefore(next);
        },
        removeElement: function(node) {
            $(node).fadeOut(function() {
                this.remove();
            });
        }
    };
};


Template.article.events({
   'click img' : function(event) {
       Strip.show({
           url: event.currentTarget.src,
           caption: event.currentTarget.alt
       });
   }
});