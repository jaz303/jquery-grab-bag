(function($) {
    
    $.fn.autosize = function(options) {
        
        options = $.extend({threshold: 5}, options || {});
        
        var lineHeight = $(this).css('lineHeight'),
            fontSize = $(this).css('fontSize');
        
        // if (lineHeight.match(/^\d+(\.\d+)?px$/)) {
        //     lineHeight = parseInt(lineHeight);
        // } else if (lineHeight.match(/^\d+(\.\d+)?$/)) {
        //     
        // }
        // 
        // var fontSize = parseInt(),
        //     lineHeight = ;
        //     
        // if (lineHeight.match(//))
        // 
        // 
        // var lineHeight = 
        // var fontSize = 

        lineHeight = parseInt(lineHeight);

        function resize(evt) {
            if (evt.keyCode == 13) {
                // if ((this.offsetHeight + lineHeight) >= this.scrollHeight) {
                //     this.rows++;
                // }
            } else {
                if (this.scrollHeight > this.offsetHeight) {
                    var start = this.scrollHeight;
                    while (start - this.offsetHeight > -options.threshold) this.rows++;
                }
            }
        }
        
        this.filter('textarea')
            .css('overflow', 'hidden')
            .keydown(resize)
            .keyup(function(evt) { if (evt.keyCode == 13) resize.call(this, evt); })
            .each(resize);
        
        return this;
        
    }
    
})(jQuery);