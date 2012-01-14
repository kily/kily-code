(function( $ ) {
	$.fn.slideMenu = function( settings ) {
		var settings = $.extend({
			currMenu:			"currMenu",
			effect:				"",
			effectSpeed:		500
		}, settings);
		var that = $(this),
			holder = that.find("li"),
			t = [];

		
		function init ( effect ) {
			if ( settings.effect == '' ) {
				holder.hover(function() {
					$(this).children("ul").show();
				}, function() {
					$(this).find("ul").hide();
				});				
			}
			if ( settings.effect == 'fade' ) {
				holder.each(function( index ) {
					$(this).hover(function() {
						var that = this;
						clearTimeout(t[index]);
						t[index] = setTimeout(function() {
							$(that).find("ul").eq(0).fadeIn(settings.effectSpeed);
						}, 200);
					}, function() {
						var that = this;
						clearTimeout(t[index]);
						t[index] = setTimeout(function() {
							$(that).find("ul").eq(0).fadeOut(settings.effectSpeed);
						}, 200);
					});					
				});		
			}
			if ( settings.effect == 'slide' ) {
				holder.each(function( index ) {
					$(this).hover(function() {
						var that = this;
						clearTimeout(t[index]);
						t[index] = setTimeout(function() {
							$(that).find("ul").eq(0).slideDown(settings.effectSpeed);
						}, 200);
					}, function() {
						var that = this;
						clearTimeout(t[index]);
						t[index] = setTimeout(function() {
							$(that).find("ul").eq(0).slideUp(settings.effectSpeed);
						}, 200);
					});					
				});
			}
		}
		init();

		return this;
	}
})( jQuery ); 
