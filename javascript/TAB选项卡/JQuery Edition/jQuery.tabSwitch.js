/**
 * jQuery Tab Switch Plugin
 * author: keelii
 * date: 2011-10-22
 * version: 1.0
 * bug report: http://www.keelii.com/guestbook
 */

/**
+---------------------------------------------------------
+ HTML like this - wrapper element's ID attr is necessary
+---------------------------------------------------------
<div id="Tab">
	<ul class="tabs">
		<li><a href="javascript:;">btn1</a></li>
		<li><a href="javascript:;">btn2</a></li>
		<li><a href="javascript:;">btn3</a></li>
	</ul>
	<div class="tabCons">
		<div class="tabCon">con1</div>
		<div class="tabCon">con2</div>
		<div class="tabCon">con3</div>
	</div>
</div>
+---------------------------------------------------------	
+ JavaScript like this
+---------------------------------------------------------	
$(function() {
	$("#Tab").tabSwitch({
		wrapper: "Tab",
		showWhich: 2,
		evtType: "mouseover"
	});
});	
+---------------------------------------------------------	
*/	
(function($) {
	$.fn.tabSwitch = function( settings ) {

		//setting default configs
		var settings = $.extend({
			wrapper: 			"Tab",			//wrapper element's ID 
			evtType: 			"click",		//event type "click" or "mouseover"
			btnSwitchClass: 	"btnCurr",		//current tab button className
			conSwitchClass: 	"conCurr",		//current tab content className
			showWhich: 			1,				//which tab show when initialized
			switchCallBack: 	function() {},	//switch complete callBack function
			autoSwitch: 		false,			//auto switch tab contents
			autoSwitchDelay: 	1000,			//auto switch Interval
			isFadeIn: 			false,
			fadeDelay: 			1000
		}, settings);

		//switch buttons and contents
		var tabThis = this,
			btns = $(tabThis).children("ul").find("a"),
			cons = $(tabThis).children("div").children(),
			autoFlag = settings.showWhich,
			t = null;
		
		function initialize() {
			//show default tab
			changeTo( settings.showWhich-1 );
			
			//bind related event
			btns.bind(settings.evtType, function() {
				var thisIndex = btns.index($(this));
				
				//stop auto change tab contents
				stopAutoChangeTab();
			
				changeTo( thisIndex );
				settings.switchCallBack();
			});

			//bind mouseover
			btns.mouseout(function() {
				var thisIndex = btns.index($(this));
				//btns.stop();
				autoChangeTab( thisIndex );
			});

			//clear dashed border when click tab in IE
			btns.focus(function() {
				$(this).blur();
			});

			//auto Switch
			autoChangeTab( autoFlag );
		}

		//change to tab content
		function changeTo( which ) {
			btns.removeClass(settings.btnSwitchClass).eq(which).addClass(settings.btnSwitchClass);
			if ( settings.isFadeIn ) {
				cons.removeClass(settings.conSwitchClass).hide().eq(which).addClass(settings.conSwitchClass).fadeIn(settings.fadeDelay);
				return false;
			}
			cons.removeClass(settings.conSwitchClass).hide().eq(which).addClass(settings.conSwitchClass).show();
		}

		//auto change Tab Contents
		function autoChangeTab( flag ) {

			if ( settings.autoSwitch ) {
				t = setInterval( function() {
					if ( flag == btns.length ) {
						//alert(1);
						flag = 0;
					}

					changeTo( flag );
					flag++;

				}, settings.autoSwitchDelay );
			}
		}

		//stop auto change tab
		function stopAutoChangeTab() {

			if ( settings.autoSwitch ) {
				clearInterval(t);
			}
		}

		//check if tabSwitch is avaliable
		if ( btns.length !== cons.length ) {
			alert("The #" + $(tabThis).attr('id') + "`s tab buttons and tab contents not matched, please check you HTML code!");
			return false;
		} else {
			initialize();
		}

		return this;
	};
})(jQuery);