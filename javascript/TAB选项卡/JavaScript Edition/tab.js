/**
 * 网页Tab选项卡效果OOP实现
 * Author: keelii
 * Date: 2011-10-29
 * --------------------
 * HTML Like this
 * --------------------
	<div id="yourTab">
		<ul>
			<li><a href="javascript:;">tab1</a></li>
			<li><a href="javascript:;">tab2</a></li>
			<li><a href="javascript:;">tab3</a></li>
		</ul>	
		<div>
			<div>con1</div>
			<div>con2</div>
			<div>con3</div>
		</div>
	</div>
 * --------------------
 * javascript Like this
 * --------------------
	<script type="text/javascript">
		new Tab({
			wrapper: "yourTab",
			tbCurrClass: "curr",
			showWhich: 3,
			evtType : "mouseover"
		}).init();
	</script>
 */

var Tab = function(obj) {
	var settings = {
		wrapper			: obj.wrapper || "Tab",				//外层DIV的ID。默认为"Tab"
		evtType			: obj.evtType || "click",
		tbCurrClass		: obj.tbCurrClass || "btnCurr",
		showWhich		: obj.showWhich-1 || 0
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
	 * 工具函数：添加DOM元素事件绑定函数
	 */
	function addEvent (obj, evtType, fn) {
		if (obj.addEventListener) {
			obj.addEventListener(evtType, fn, false);
		} else if (obj.attachEvent) {
			obj.attachEvent("on"+evtType, fn);
		}
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
	/**
	 * 切换方法：切换到哪个（flag）选项卡
	 */
	function switchTo (flag) {
		for (var i = 0; i < con.length; i++) {
			con[i].style.display = "none";
			removeClass(btn[i], settings.tbCurrClass);
		}
		con[flag].style.display = "block";
		addClass(btn[flag], settings.tbCurrClass);
	}
	/*初始化*/
	var div = document.getElementById(settings.wrapper),
		btn = children(div)[0].getElementsByTagName("a"),
		con = children(children(div)[1]);

	this.init = function() {
		if (btn.length !== con.length) {
			alert("选项卡#"+ settings.wrapper + "的按钮与切换内容不匹配！");
		} else {
			switchTo(settings.showWhich);
		}
		for (var i = 0; i < btn.length; i++) {
			(function(k) {
				addEvent(btn[k], settings.evtType, function() {
					switchTo(k);
				});
				addEvent(btn[k], "focus", function() {
					btn[k].blur();
				});
			})(i); 
		}
	}
}

