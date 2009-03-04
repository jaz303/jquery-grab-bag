/**
 * Simple DOM Builder
 * (c) 2008, 2009 Jason Frame (jason@onehackoranother.com)
 *
 * Usage:
 *
 * $$('table#foo',
 *   $$('tr', $$('th.col-1', 'ID'), $$('th.col-2', 'Username'), $$('th.col-3', 'Email')),
 *   $$('tr', $$('td', 1), $$('td', 'jaz303'), $$('td', 'jason@magiclamp.co.uk')),
 *   {style: "margin:10px"}
 * );
 *
 * Returns a jQuery object.
 *
 * @todo handle array parameters
 */
function $$(tagName) {
    
    var max = arguments.length - 1, options = {}, $ele = null, match = null;
    if (typeof arguments[max] == 'object' && !(arguments[max].html)) {
        options = arguments[max--];
    }
    
    if (match = /^([\w-]+)(#([\w-]+))?((\.[\w-]+)*)$/.exec(tagName)) {
        
        var $ele = jQuery(document.createElement(match[1]));
        
        if (match[3]) $ele[0].id = match[3];
        if (match[4]) $ele[0].className = match[4].replace(/\./g, ' ');
        
        for (var k in options) {
            if (k == 'hover' && options[k] instanceof Array) {
                $ele.hover(options[k][0], options[k][1]);
            } else if (jQuery.isFunction(options[k])) {
                $ele.bind(k, options[k]);
            } else {
                $ele.attr(k, options[k])
            }
        }

        for (var i = 1; i <= max; i++) $ele.append(arguments[i]);
    
    }
    
    return $ele;

};

$$.make = function(tagName) {
	return function() {
		var args = jQuery.makeArray(arguments);
		args.unshift(tagName);
		return $$.apply(this, args);
	};
};

(function(scope) {
	// thank you, http://www.htmldog.com/reference/htmltags/
	var tags = ["a", "abbr", "acronym", "address", "area", "b", "base", "bdo",
	            "big", "blockquote", "body", "br", "button", "caption", "cite",
	            "code", "col", "colgroup", "dd", "del", "dfn", "div", "dl",
	            "dt", "em", "fieldset", "form", "h1", "h2", "h3", "h4", "h5",
	            "h6", "head", "html", "hr", "i", "img", "input", "ins", "kbd",
	            "label", "legend", "li", "link", "map", "meta", "noscript",
	            "object", "ol", "optgroup", "option", "p", "param", "pre", "q",
	            "samp", "script", "select", "small", "span", "strong", "style",
	            "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th",
	            "thead", "title", "tr", "tt", "ul", "var"];
	for (var i = 0; i < tags.length; i++)
		scope[tags[i].toUpperCase()] = $$.make(tags[i]);
})(this);
