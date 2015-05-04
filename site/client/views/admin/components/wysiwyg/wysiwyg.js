Template.wysiwyg.rendered = function() {
    this.$('[data-wysiwyg]').summernote({
        height: 300,
        codemirror: {
            theme: 'monokai'
        },
        toolbar: [
            ['style', ['style']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert', ['picture', 'link', 'video', 'hr']],
            ['table', ['table']],
            ['undo', ['undo']],
            ['redo', ['redo']],
            ['codeview', ['codeview']],
            ['help', ['help']]
        ],
        onpaste: function(e) {

            function CleanPastedHTML(input) {
                // 1. remove line breaks / Mso classes
                var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
                var output = input.replace(stringStripper, ' ');
                // 2. strip Word generated HTML comments
                var commentSripper = new RegExp('<!--(.*?)-->','g');
                var output = output.replace(commentSripper, '');
                var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');
                // 3. remove tags leave content if any
                output = output.replace(tagStripper, '');
                // 4. Remove everything in between and including tags '<style(.)style(.)>'
                var badTags = ['style', 'script','applet','embed','noframes','noscript'];

                for (var i=0; i< badTags.length; i++) {
                    tagStripper = new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>', 'gi');
                    output = output.replace(tagStripper, '');
                }
                // 5. remove attributes ' style="..."'
                var badAttributes = ['style', 'start', 'class'];
                for (var i=0; i< badAttributes.length; i++) {
                    var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"','gi');
                    output = output.replace(attributeStripper, '');
                }
                return output;
            }
            var thisNote = $(this);
            var updatePastedText = function(someNote){
                var original = someNote.code();
                var cleaned = CleanPastedHTML(original); //this is where to call whatever clean function you want. I have mine in a different file, called CleanPastedHTML.
                someNote.code('').html(cleaned); //this sets the displayed content editor to the cleaned pasted code.
            };
            setTimeout(function () {
                //this kinda sucks, but if you don't do a setTimeout,
                //the function is called before the text is really pasted.
                updatePastedText(thisNote);
            }, 10);
        }
    });
};