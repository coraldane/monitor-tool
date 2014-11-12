/**
 * CoralDialog is an Simple popup dialog like Thickbox(http://jquery.com/demo/thickbox/), GreyBox(http://orangoo.com/labs/GreyBox/),
 * but it's more simple and basic.
 * Open a new dialog on the center of your page and auto set its position, and default size is width-500, height-400.
 * You can both put html code and href into it.
 * also it support modelable and dragable. 
 * @version 1.0
 * @date 2011-01-16
 * @author coraldane@gmail.com
 * @update: 1. repair the close handler doesn't work after refresh page. 2011-12-01
*/

function ShowDialog(args){return new CoralDialog(args);}

/** This Method should be used in the Opened Dialog window to close itself; */
function GB_hide(){
	if(document.dialog){
		document.dialog.hide();
	}else if(parent.document.dialog){
		parent.document.dialog.hide();
	}
}

/**   
 * CoralDialog class
 * @param   title dialog title
 * @param   source   html source wanted to show in dialog
 * @param   href   src url in dialog window
 * @param   width  the width dialog will show, default is 500px.
 * @param   height  the height dialog will show, default is 400px.
 * @param   modelable  decide whether this dialog is show modelable or modeless. default is true.
 * @param   draggable  decide whether this dialog can draggable or not, default is false, and this doesn't work in Firefox.
 */  
function CoralDialog(options){
	this.settings = $.extend({
		title: '',
		href: '',
		source : null,
		width : 500,
		height: 400,
		left: -1,
		top: -1,
		modelable: true,
		draggable: false,
		closable: true,
		isPanel: false,
		CSS_PATHS: ["static/css/global/styles.css"]
	}, options);
	
	this.init = function(){
		this.panel = document.getElementById("dialogPanel");
		this.iframe = document.getElementById("dialogIframe");
		this.basePath = this.getJsPath();
	};
	
	this.draw = function(){
		var _this = this;
		if(_this.settings.modelable){
			var overlay = document.getElementById("dialogOverlay");
			var demision = {width: $(document.body).width(), height: $(document).height()-5};
			overlay.style.width = demision.width;
			overlay.style.height = demision.height;
			overlay.style.left = 0;
			overlay.style.top = 0;
			overlay.style.backgroundColor = "#aaa";
			overlay.style.position = "absolute";
			overlay.style.zIndex = 100;
			overlay.style.opacity = 0.2;
			overlay.style.filter = 'alpha(opacity=' + (0.2*100) + ')';
			overlay.style.display = "";
		}
		var strArray = new Array();
		strArray.push('<!DOCTYPE><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />');
		var basePath = $("BASE").attr("href");
		if(null != basePath){
			strArray.push('<base href="'+basePath+'"/>');
		}
		strArray.push('<link rel="stylesheet" type="text/css" href="' + _this.basePath + 'cd_styles.css"/>');
		for(var i=0; i< _this.settings.CSS_PATHS.length; i+=1){
			strArray.push('<link rel="stylesheet" type="text/css" href="' + _this.settings.CSS_PATHS[i] + '"/>');
		}
		strArray.push('</head><body style="padding:0px;margin:0px;'+(_this.settings.isPanel?'background-color:#f0ffe5;':'') + '">');
		strArray.push("<div id='dialog' class='dialog' style='width:");
		strArray.push(_this.settings.width +"px;height:"+_this.settings.height+"px;"+(_this.settings.isPanel?"border-color:#b2d1ff;":"")+"'>");
		strArray.push("<table id='dialogTable' class='dialogTable' style='width:"+_this.settings.width+ ";'><tr");
		strArray.push(_this.settings.isPanel?" style='height:25px;'>":" class='dialogTitle'>");
		strArray.push("<th id='dialogTitle' valign='middle' style='padding-left:8px;'>"+_this.settings.title+"</th>");
		strArray.push("<td style='text-align:right;' class='dialogClose'>");
		if(_this.settings.closable){
			strArray.push("<a href='javascript:void(0);' id='dialogClose'>");
			strArray.push("<img border='0' alt='Close' width='19' height='19' src='"+_this.basePath+"blank.gif' /></a>");
		}
		strArray.push("</td></tr></table>");
		if(null != _this.settings.source){
			strArray.push(_this.settings.source);
		}else{
			strArray.push("<iframe id='dialogContentFrame' frameborder='0' marginwidth='0' width='100%' height='");
			strArray.push((_this.settings.height-25) +"' src='"+_this.settings.href+"'></iframe>");
		}
		strArray.push('</div></body></html>');
		
		var doc = getFrameDocument(_this.iframe);
		doc.writeln(strArray.join(''));
		doc.close();
		_this.document = doc;
		document.dialog = _this;
		_this.show();
		
		if(this.settings.draggable){_this.bindEvent("mousedown", this.Down);}
	};
	
	this.getJsPath = function(){
		var script = document.getElementById("CoralDialog");
		if(null != script){
			var scriptPath = script.getAttribute("src");
			return scriptPath.substr(0, scriptPath.lastIndexOf("/")+1);
		}
		return "";
	};
	
	this.bindEvent = function(type, fn){
		$("#dialogTitle", this.document).bind(type, fn);
	};
	
	this.show = function(){
		var _this = this;
		this.panel.style.width = (_this.settings.width+2) + "px";
		this.panel.style.height = (_this.settings.height+2) + "px";
		this.iframe.style.height = (_this.settings.height+2) + "px";
		if(_this.settings.left > -1){
			this.panel.style.left = _this.settings.left + "px";
		}else{
			this.panel.style.left = ($(document).width() <_this.settings.width?0:$(document).width()-_this.settings.width)/2 + "px";
		}
		if(this.top > -1){
			this.panel.style.top = this.top + "px";
		}else{
			this.panel.style.top = ($(document).height()<_this.settings.height?0:$(window).scrollTop()+($(window).height()-_this.settings.height)/2) + "px";
		}
		$(this.panel).show();
		$("#dialogClose", this.document).bind("click", function(){
			parent.GB_hide();
		});
	};
	
	this.hide = function(){
		var _this = this;
		$("#dialogOverlay").hide();
		$(this.panel).hide();
		var fn = _this.settings.close;
		if(null != fn){fn.call();}
	};
	
	this.setTitle = function(text){
		$("#dialogTitle", this.document).html(text);
	};
	
	this.getElementById = function(id){
		if (typeof(id) != "string" || id == "") return null;
		if(null == this.document) return null;
		if (this.document.getElementById) return this.document.getElementById(id);
		if (this.document.all) return this.document.all(id);   
		try {return eval(id);} catch(e){ return null;}
	}
	
	this.init();
	this.draw();
}
function getFrameDocument(frame){
	if (frame.contentDocument) { // DOM
        var doc = frame.contentDocument;
    } else if (frame.contentWindow) { // IE win
        var doc = frame.contentWindow.document;
    }
    return doc;
};
CoralDialog.prototype.Up = function(event){
	var dialog = document.dialog;
	$(dialog.getElementById("dialogTitle")).unbind("mousemove");
}
CoralDialog.prototype.Down = function(event){
	var dialog = document.dialog;
	dialog.tHeight = event.clientY;
	dialog.lWidth  = event.clientX;
	dialog.bindEvent("mousemove", dialog.Move);
	dialog.bindEvent("mouseup", dialog.Up);
	dialog.bindEvent("mouseout", dialog.Up);
}
CoralDialog.prototype.Move = function(event){
	var dialog = document.dialog;
	var top = parseInt(dialog.panel.style.top.replace(/px/,""))+ event.clientY - dialog.tHeight;
	var left = parseInt(dialog.panel.style.left.replace(/px/,""))+ event.clientX - dialog.lWidth;
	top = top < 0 ? 0 : top;
	top = top > document.body.clientHeight - dialog.height? document.body.clientHeight-dialog.height: top;
	left = left < 0 ? 0 : left;
	left = left > document.body.clientWidth-dialog.width? document.body.clientWidth-dialog.width: left;
	dialog.panel.style.top  = top + "px";
	dialog.panel.style.left = left + "px";
}

document.write('<div id="dialogOverlay"></div>');
document.write('<div id="dialogPanel" style="position:absolute;display:none;z-index:999;background-color:#fff;font-size:12px;width:20px;">');
document.write("<iframe id='dialogIframe' scrolling='no' frameborder='0' width='100%' height='100'></iframe></div>");