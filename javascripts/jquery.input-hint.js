/*
 * (c) 2008-9 Jason Frame
 * Auxiliary element code based on work by pjesi (http://wtf.hax.is/)
 */
(function ($) {
	
	/**
	 * Initialise input hints on all matched inputs.
	 *
	 * Usage examples:
	 *
	 * Add hints to all inputs with the 'hint' attribute set:
	 *   $('*[hint]').inputHint();
     *
     * Add hints to all matched elements, grabbing the hint text from each element's
     * adjacent <kbd/> tag:
     *   $('input').inputHint({using: '+ kbd'});
	 *
	 * Options keys:
	 *  using: jQuery selector locating element containing hint text, relative to
	 *         the input currently being considered.
	 *  hintClass - CSS class to apply to inputs with active hints. Default: 'hint'
	 */
	$.fn.inputHint = function(options) {
		
		options = $.extend({hintClass: 'hint'}, options || {});
		
		function hintFor(element) {
			var h;
			if (options.using && (h = $(options.using, element)).length > 0) {
				return h.text();
			} else {
				return $(element).attr('hint') || '';
			}
		}

		function showHint() {
			if ($(this).val() == '') {
				$(this).addClass(options.hintClass).val(hintFor(this));
			}
		}

		function removeHint() {
			if ($(this).hasClass(options.hintClass)) $(this).removeClass(options.hintClass).val('');
		}
		
		this.filter(function() { return !!hintFor(this); })
			.focus(removeHint).blur(showHint).blur();

        var $form = this.parents('form:eq(0)');
        this.each(function() {
            var self = this;
            $form.submit(function() { removeHint.apply(self); });
        });

		return this.end(); // undo filter

	};
	
})(jQuery);