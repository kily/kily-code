(function( $ ) {
	$.fn.extend({
		imageSlider: function( opts ) {
			var me = $(this),
				slideWrapper = me.find('ul'),
				slideItem = me.find('li'),
				btnWrapper = me.children('div'),
				btns = btnWrapper.find('button'),
				len = slideItem.length,
				width = slideItem.width(),
				height = slideItem.height(),
				opts = $.extend({
					'direction': 'vertical',
					'evtType': 'click',
					'speed': 500
				}, opts);

			function initStyle() {
				if ( opts.direction == 'horizontal' ) {
					slideItem.css({
						'float': 'left'
					});

					width = me.find('li').width();
					slideWrapper.css({
						'width': width*len,
						'height': height
					});	
				}
				me.css({
					'width': width,
					'height': height,
					'overflow': 'hidden',
					'position': 'relative'
				});
				slideWrapper.css({
					'position': 'absolute',
					'top': 0,
					'left': 0
				});
			}
			initStyle();
			

			btnWrapper.delegate('button', opts.evtType, function() {
				var ind = btns.index($(this));
					
				if ( opts.direction == 'horizontal' ) {
					slideWrapper.stop().animate({
						'left': -ind * width
					}, opts.speed);
				}
				if ( opts.direction == 'vertical' ) {
					slideWrapper.stop().animate({
						'top': -ind * height
					}, opts.speed);
				}
			});
			/*
			btns.each(function(index) {
				$(this).bind(opts.evtType, function() {
					
					if ( opts.direction == 'horizontal' ) {
						slideWrapper.stop().animate({
							'left': -index * width
						}, opts.speed);
					}
					if ( opts.direction == 'vertical' ) {
						slideWrapper.stop().animate({
							'top': -index * height
						}, opts.speed);
					}
				});
			});
			*/
			
			//alert(opts.speed);
			return this;
		}
	});

})( jQuery ); 
