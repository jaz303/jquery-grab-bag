
(function($) {

    /*
     * Auto-growing textareas; technique ripped from Facebook
     */
    $.fn.autogrow = function(options) {
        
        this.filter('textarea').each(function() {
            var $this       = $(this),
                minHeight   = -1,
                lineHeight  = '';
            
            var shadow = undefined;

            var update = function() {
                //only set the shadow if it has not been set already and this is
                //the first time that update has been called with $this having a 
                //height of > 0
                if(shadow === undefined && $this.height() !== 0){
                    minHeight   = $this.height(),
                    lineHeight  = $this.css('lineHeight');
                    shadow = $('<div></div>').css({
                        position:   'absolute',
                        top:        -10000,
                        left:       -10000,
                        width:      $(this).width() - parseInt($this.css('paddingLeft')) - parseInt($this.css('paddingRight')),
                        fontSize:   $this.css('fontSize'),
                        fontFamily: $this.css('fontFamily'),
                        lineHeight: $this.css('lineHeight'),
                        resize:     'none'
                    }).appendTo(document.body);
                }
                //If we do not have a shadow yet, it is because $this does not have
                //a height or width. Do nothing.
                if(shadow === undefined){
                    return;
                }
                var times = function(string, number) {
                    for (var i = 0, r = ''; i < number; i ++) r += string;
                    return r;
                };
                
                var val = this.value.replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/&/g, '&amp;')
                                    .replace(/\n$/, '<br/>&nbsp;')
                                    .replace(/\n/g, '<br/>')
                                    .replace(/ {2,}/g, function(space) { return times('&nbsp;', space.length -1) + ' ' });
                
                shadow.html(val);
                $(this).css('height', Math.max(shadow.height() + 20, minHeight));
            
            }
            $(this).change(update).keyup(update).keydown(update);
            update.apply(this);
        });
        
        return this;
        
    }
    
})(jQuery);
