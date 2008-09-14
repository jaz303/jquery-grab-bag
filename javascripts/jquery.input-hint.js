(function ($) {
	
	/**
	 * Initialise input hints on all matched inputs.
	 *
	 * Usage example:
	 *   $('*[hint]').inputHint();
	 *
	 * Options keys:
	 *   hintClass - CSS class to apply to inputs with active hints
	 */
	$.fn.inputHint = function(options) {
		options = $.extend({hintClass: 'hint'}, options || {});

		function showHint() {
			if ($(this).val() == '') {
				$(this).addClass(options.hintClass).val($(this).attr('hint'));
			}
		}

		function removeHint() {
			if ($(this).hasClass(options.hintClass)) $(this).removeClass(options.hintClass).val('');
		}
		
		this.focus(removeHint).blur(showHint).blur();

        var $form = this.parents('form:eq(0)');
        this.each(function() {
            var self = this;
            $form.submit(function() { removeHint.apply(self); });
        });
	};
	
})(jQuery);