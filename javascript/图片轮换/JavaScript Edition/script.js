var imgScroll = function( obj ) {
	var settings = {
		wrapper			: obj.wrapper || "imgscroll",
		speed			: obj.speed || 3000,
		anSpeed			: obj.anSpeed || 60,
		navCurr			: obj.navCurr || "navCurr"
	};

	/**
	 * 工具函数:查找DOM子节点
	 */
	function children (node) {
		var childs = node.childNodes,
			res = [];
		for (var i = 0; i < childs.length; i++) {
			if ( childs[i].nodeType == 1 ) {
				res.push(childs[i]);
			}
		}
		return res;
	}
	/**
	 * 工具函数：元素是否具有class
	 */	
	function hasClass (node, desClass) {
		var classArr = node.className.split(/\s+/);
		for (var i = 0; i < classArr.length; i++) {
			if (classArr[i] == desClass) {
				return true;
			}
		}
		return false;
	}
	/**
	 * 工具函数：为元素添加class
	 */
	function addClass (node, desClass) {
		if ( hasClass(node, desClass) ) {
			return false; 
		}
		node.className += (" " + desClass);
	}
	/**
	 * 工具函数：删除指定元素的class
	 */
	function removeClass (node, desClass) {
		if ( !hasClass(node, desClass) ) {
			return false;
		}
		var re = new RegExp(desClass, "g");
		node.className = node.className.replace(re, "");
	}
	/*初始化变量*/
	var div = document.getElementById(settings.wrapper),
		btns = children(children(div)[1]),
		cons = children(div)[0].getElementsByTagName('img'),
		t = null,
		flag = 0;
	
	function setOpacity ( node, deg ) {
		if ( node.filters ) {
			node.style.display = "block";
			node.style.filter = "Alpha(opacity=" + deg + ")";
		} else {
			node.style.display = "block";
			node.style.opacity = deg / 100;
		}
	}
	function fadeIn ( node, speed ) {
		var deg = 0;
		setOpacity( node, 0 );
	
		setInterval(function() {
			if ( deg == 100 ) {
				return false;
			}
			setOpacity( node, deg );
			deg+=5;
		}, speed)
	}
	function switchTo ( which ) {
		for ( var i = 0; i < cons.length; i++ ) {
			cons[i].style.display = "none";
			removeClass( btns[i], settings.navCurr );
		}
		fadeIn( cons[which], settings.anSpeed );
		addClass( btns[which], settings.navCurr );
	}
	function bindEvent () {
		for ( var i = 0; i < btns.length; i++ ) {
			(function(k) {
				btns[k].onmouseover = function() {
					clearInterval(t);
					switchTo(k);
				};
				btns[k].onmouseout = function() {
					autoScroll(k+1);
				};
			})(i); 	 

		}		
	}
	function autoScroll ( start ) {
		flag = start || flag;
		t = setInterval(function() {
			if ( flag == cons.length ) {
				flag = 0;
			} 
			switchTo( flag );
			flag++;
		}, settings.speed);		
	}

	this.init = function() {
		if ( btns.length !== cons.length ) {
			alert("#" + settings.wrapper + "的图片与切换按钮数量不一致。");
		} else {
			switchTo(0);
			autoScroll(1);
			bindEvent();
		}
	}
}
