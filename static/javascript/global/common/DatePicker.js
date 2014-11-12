/**
 * add auto hide when mouse moveout
 * 
 * @version 1.0.1 
 * @date 2010-11-23
 * @author coraldane@gmail.com
*/

/**   
 * Date Picker
 * @param   inputObj  The input object want to contain date.
 * @param   dateFormatStyle  Default Date Formatter is "yyyy-MM-dd", you could use your own defined format.
 * @param   beginDate Default value is 1990-01-01
 * @param   endDate   Default value is 2020-01-01
 * @param   lang      0(English)|1(Chinese)  Default Language is 0(English).
 */
function setday(inputObj,dateFormatStyle,beginDate,endDate,lang){
	if(null == inputObj){return null;}
	var cl = new Calendar({
		dateControl:inputObj,
		dateFormat: dateFormatStyle,
		beginDate:beginDate,
		endDate:endDate,
		lang:lang,
		type:"d"
	});
	cl.show();
	return cl;
}

/**   
 * Datetime Picker
 * @param   inputObj  The input object want to contain date.
 * @param   dateFormatStyle  Default Date Formatter is "yyyy-MM-dd", you could use your own defined format.
 * @param   beginDate Default value is 1990-01-01
 * @param   endDate   Default value is 2020-01-01
 * @param   lang      0(English)|1(Chinese)  Default Language is 0(English).
 */
function setdatetime(inputObj,dateFormatStyle,beginDate,endDate,lang){
	if(null == inputObj){return null;}
	var cl = new Calendar({
		dateControl:inputObj,
		dateFormat: dateFormatStyle,
		beginDate:beginDate,
		endDate:endDate,
		lang:lang,
		type:"t"
	});
	cl.show();
	return cl;
}

/**   
 * Month Picker
 * @param   inputObj  The input object want to contain date.
 * @param   dateFormatStyle  Default Date Formatter is "yyyy-MM", you could use your own defined format.
 * @param   beginDate Default value is 1990-01
 * @param   endDate   Default value is 2020-01
 * @param   lang      0(English)|1(Chinese)  Default Language is 0(English).
 */
function setmonth(inputObj,dateFormatStyle,beginDate,endDate,lang){
	if(null == inputObj){return null;}
	 var cl = new Calendar({
		dateControl:inputObj,
		dateFormat: dateFormatStyle,
		beginDate:beginDate,
		endDate:endDate,
		lang:lang,
		type:"m"
	});
	cl.show();
	return cl;
}

/**
Calendar Style
*/
Calendar.prototype.style = function(){
	var strStyle = "<style type='text/css'>";
	strStyle += ".calendar {font-size:12px;font-family:Tahoma;margin:0;padding:0px;border:1px solid #397EAE;}";
	strStyle += ".calendar ul {list-style-type:none; margin:0; padding:0;vertical-align:middle;}";
	strStyle += ".calendar li {float:left;}.calendar b{font-weight:bold;}";
	strStyle += ".calendar .day li {height:20px;}";
	strStyle += ".calendar .day li,.calendar .date li{float:left;width:14.13%;height:20px;line-height:20px;text-align:center;}";
	strStyle += ".calendar .day li{font-weight:bold;} .calendar .date li{}";
	strStyle += ".calendar .month li{float:left;width:24.8%;height:20px;line-height:20px;text-align:center;}";
	strStyle += ".calendar a{ text-decoration:none;font-family:Tahoma;font-size:11px;color:#333}";
	strStyle += ".calendar li:hover {cursor:pointer;color:#f30; text-decoration:none;}";
	strStyle += ".calendar .date li:hover, .calendar .month li:hover{cursor:pointer;color:#f30; text-decoration:none;background-color:#DBE7F2;}";
	strStyle += ".calendarlihover {color:#f30;text-decoration:none;background-color:#E8F2FE;}";
	strStyle += ".calendar li a.hasArticle {font-weight:bold; color:#f60 !important}";
	strStyle += ".lastMonthDate, .nextMonthDate {color:#bbb;font-size:11px}";
	strStyle += ".selectThisYear, .selectThisMonth{text-decoration:none; margin:0px; color:#000; font-weight:bold}";
	strStyle += ".calendar .LastMonth, .calendar .NextMonth{text-decoration:none; color:#000; font-size:18px; font-weight:bold; line-height:16px;}";
	strStyle += ".calendarTitle{background:#EDF3F9;text-align:center;height:20px;line-height:20px;clear:both;width:100%;}";
	strStyle += ".calendarTitle .mark{text-decoration:none;color:#000;font-family:Tahoma;font-size:18px;font-weight:normal;}";
	strStyle += ".today{ background-color:#ffffaa;border:1px solid #f60;padding:0 1px;}";
	strStyle += ".today a { color:#f30; }";
	strStyle += ".calendarTime {width:100%;background:#E3EFFE;text-align:center;}";
	strStyle += ".calendarTime SPAN{cursor:pointer;}";
	strStyle += ".Calendar_Overlay{position:absolute;z-index:99;top:40px;left:0px;background:#222;}";
	strStyle += ".calendar_selector{border:1px solid #1c1c1c;background:#FFFFFF;position:absolute;visibility:hidden;z-index:9999;width:127px;}";
	strStyle += ".calendar_selector_table li{float:left;width:21px;text-align:center;}";
	strStyle += ".calendarBottom {text-align:center;height:20px;line-height:20px;clear:both;width:100%;border-top:1px solid #ddd;}";
	strStyle += ".calendarBottom li{float:left;height:20px;line-height:20px;font-weight:bold;text-align:center;}";
	strStyle += "</style>";
	return strStyle;
}

function getFrameDocument(frame){
	if ( frame.contentDocument ) { // DOM
        var doc = frame.contentDocument;
    } else if (frame.contentWindow) { // IE win
        var doc = frame.contentWindow.document;
    }
    return doc;
}

/**   
 * Parse Date value from String   
 * @param format the pattern of date   
 */   
String.prototype.toDate = function(format){
	if(null == format) format="yyyy-MM-dd";
	var pattern = format.replace("yyyy", "(\\~1{4})").replace("yy", "(\\~1{2})")
		.replace("MM", "(\\~1{2})").replace("M", "(\\~1{1,2})")
		.replace("dd", "(\\~1{2})").replace("d", "(\\~1{1,2})")
		.replace("hh", "(\\~1{2})").replace("h", "(\\~1{1,2})")
		.replace("mm", "(\\~1{2})").replace("m", "(\\~1{1,2})")
		.replace("ss", "(\\~1{2})").replace("s", "(\\~1{1,2})")
		.replace(/~1/g, "d");
	var returnDate;
	if (new RegExp(pattern).test(this)) {
	    var yPos = format.indexOf("yyyy");
	    var mPos = format.indexOf("MM");
	    var dPos = format.indexOf("dd");
	    var hPos = format.indexOf("hh");
	    var miPos = format.indexOf("mm");
	    var sPos = format.indexOf("ss");
	    if (mPos == -1) mPos = format.indexOf("M");
	    if (yPos == -1) yPos = format.indexOf("yy");
	    if (dPos == -1) dPos = format.indexOf("d");
	    if(hPos == -1) hPos = format.indexOf("h");
	    var pos = new Array(yPos + "y", mPos + "M", dPos + "d", hPos+"h", miPos+"m", sPos+"s");
	    var data = {y: 0, M: 0, d: 1, h:0, m:0, s:0};
	    var m = this.match(pattern);
	    for (var i = 1; i < m.length; i++) {
	        if (i == 0) return;
	        var flag = pos[i - 1].charAt(pos[i-1].length-1);
	        data[flag] = m[i];
	        //alert(pos[i-1] + ",flag:"+flag + ",i:" + i + "," + data[flag]);
	    };
		
	    if (data.y.toString().length == 2) {
	        data.y = parseInt("20" + data.y);
	    }
	    data.M = data.M - 1;
	    returnDate = new Date(data.y, data.M, data.d, data.h, data.m, data.s);
	}
	if (returnDate == null || isNaN(returnDate)) returnDate = new Date();
	return returnDate;
};

/**   
 * Date Format 
 * @param style date format like 'yyyyMMdd'
 */   
Date.prototype.format = function(style) {
  var o = {   
    "M+" : this.getMonth() + 1, //month   
    "d+" : this.getDate(),      //day   
    "h+" : this.getHours(),     //hour   
    "m+" : this.getMinutes(),   //minute   
    "s+" : this.getSeconds(),   //second   
    "w+" : "日一二三四五六".charAt(this.getDay()),   //week   
    "q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter   
    "S"  : this.getMilliseconds() //millisecond   
  }   
  if(/(y+)/.test(style)) {   
	style = style.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));   
  }
  for(var k in o){
    if(new RegExp("("+ k +")").test(style)){   
      style = style.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));   
    }
  } 
  return style;
};

/**
Date add by interval
@param interval y  Year,m  Month,d  Day,w  Week
@param number
*/
Date.prototype.dateAdd = function(interval, number) {
	switch (interval) {
	  case "y":
		return new Date(this.getFullYear() + number, this.getMonth(), this.getDate(), 
			this.getHours(), this.getMinutes(), this.getSeconds());
		break;
	  case "m":
		return new Date(this.getFullYear(), this.getMonth() + number, 
			checkDate(this.getFullYear(), this.getMonth() + number, this.getDate()),
			this.getHours(), this.getMinutes(), this.getSeconds());
		break;
	  case "d":
		return new Date(this.getFullYear(), this.getMonth(), this.getDate() + number,
			this.getHours(), this.getMinutes(), this.getSeconds());
		break;
	  case "w":
		return new Date(this.getFullYear(), this.getMonth(), 7 * number + this.getDate(),
			this.getHours(), this.getMinutes(), this.getSeconds());
		break;
	}
}

function checkDate(year, month, date){
	var enddate = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
	var returnDate = "";
	if (year % 4 == 0) {
		enddate[1] = "29";
	}
	if (date > enddate[month]) {
		returnDate = enddate[month];
	} else {
		returnDate = date;
	}
	return returnDate;
}

/**
Calendar language pack
default support english and chinese,if you want to add some other language, please extend it.
*/
Calendar.language = {
	"title":[["",""],["年","月"]],
	"months":[["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
			["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
        	],
	"weeks":[["S","M","T","W","T","F","S"],
  			["日","一","二","三","四","五","六"]
			],
	weekday:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
	"clear":[["Clear"], ["清空"]],
	"today":[["Today","Current","Now"], ["今天","当月","当前时间"]],
	"close":[["Close"], ["关闭"]],
	control:[["Last","Next"],["上一页","下一页"]]
};

/**   
 * Calendar class 
 * @param   dateControl  
 * @param   dateFormatStyle  "yyyy-MM-dd";
 * @param   beginDate 1990-01-01
 * @param   endDate   2020-01-01
 * @param   lang      0(English)|1(Chinese)
 * @param   type  d Date Picker/m Month Picker/t Datetime Picker
 * @version 2010-08-20
 * @author  coraldane@gmail.com
 * @update 2011-12-06 add Datetime picker
 */   
function Calendar(options) {   
  this.lang = options.lang?options.lang:1; //default language is Chinese.
  this.type = options.type?options.type:"t";
  
  if("m" == this.type){
    this.dateFormatStyle = "yyyy-MM";
  }else if("d" == this.type){
  	this.dateFormatStyle = "yyyy-MM-dd";
  }else{
  	this.dateFormatStyle = "yyyy-MM-dd hh:mm:ss";
  }
  this.dateFormatStyle = options.dateFormat?options.dateFormat:this.dateFormatStyle;
  this.currentDate = new Date();
  var selectedDate = options.dateControl.value.toDate(this.dateFormatStyle);
  
  this.date = selectedDate? selectedDate :currentDate;
  this.beginDate = options.beginDate?options.beginDate.toDate(this.dateFormatStyle):"1900-01-01".toDate();
  this.endDate = options.endDate?options.endDate.toDate(this.dateFormatStyle):"2020-01-01".toDate();
  
  this.dateControl = options.dateControl;
  this.panel = document.getElementById("calendarPanel");
  this.iframe = document.getElementById("calendarIframe");
  this.isFocus = false;
  
  this.draw();
}

Calendar.prototype.draw = function() {
  if(this.date < this.beginDate){
  	this.date.setTime(this.beginDate.getTime());
  }
  
  if(this.date > this.endDate){
  	this.date.setTime(this.endDate.getTime());
  }
  
  this.year = this.date.getFullYear();
  this.month = this.date.getMonth();
  var head  = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN">' +
	'<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
  this.style() + '</head><body style="padding:0px;margin:0px;">';   
  var thisMonthFirstDate = this.date.dateAdd("d",1-this.date.getDate());
  var lastMonthEndDate = thisMonthFirstDate.dateAdd("d",-1);
  var lastMonthDate =  thisMonthFirstDate.getDay();
  lastMonthEndDate = lastMonthEndDate.getDate();
  var thisMonthLastDate = thisMonthFirstDate.dateAdd("m",1).dateAdd("d",-1);
  var thisMonthEndDate = thisMonthLastDate.getDate();
  var thisMonthEndDay = thisMonthLastDate.getDay();
  
  var lis = "<div id='calendar' class='calendar' style='width:";
  if("m" == this.type){
  	lis += "120";
  }else{
  	lis += "150";
  }
  lis += "px;'>";
  lis += "<div class='calendarTitle'><ul>";
  lis += "<li id='PrevYear' class='mark' style='width:12%;' title='Previous Year'>&laquo;</li>";
  if("m" == this.type){
  	lis += "<li style='width:74%;'><span id='selectThisYear' class='selectThisYear'>" + this.date.getFullYear() + Calendar.language["title"][this.lang][0] + "</span></li>";
  	lis += "<li id='NextYear' class='mark' style='width:12%;' title='Next Year'>&raquo;</li></ul></div>";
  	lis += "<div class='calendarBody'>";
  	lis += "</ul><ul class='month' id='thisMonth'>";
  	for(var i=1; i<=12; i++){
  		var currentDate = (this.year + "-" + (i>9?i:"0"+i)).toDate("yyyy-MM");
  		if(currentDate < this.beginDate || currentDate > this.endDate){
  			lis += "<li class='lastMonthDate'>" + i + "</li>";
  			continue;
  		}
  		lis += "<li class='thisMonth' title='" + this.year + "-" + (i>9?i:"0"+i) + "-01'><a href='javascript:void(0);'";
  		if((this.year+"-"+(i>9?i:"0"+i)) == (this.date).format("yyyy-MM")){
  			lis += " class='today' ";
  		}
  		lis += ">" + i + "</a></li>";
  	}
  	lis += "</ul>"
  	
  	lis += "</div>";//close calendarBody
	lis += "<div class='calendarBottom'><ul>";
	lis += "<li id='emptyCalendar' style='width:27%;' title='Clear'>" + Calendar.language.clear[this.lang] +"</li>";
	lis += "<li id='selectCurrent' style='width:45%;' title='Current Month'>" + Calendar.language.today[this.lang][1] +"</li>";
  }else{
    lis += "<li id='PrevMonth' class='mark' style='width:12%;' title='Previous Month'>&lsaquo;</li>";
    lis += "<li style='width:30%;'><span id='selectThisYear' class='selectThisYear'>" + this.date.getFullYear() + Calendar.language["title"][this.lang][0] + "</span></li>";
  	lis += "<li style='width:20%;'><span id='selectThisMonth' class='selectThisMonth'>" + (this.date.getMonth() +1) + Calendar.language["title"][this.lang][1] + "</span></li>";
  	lis += "<li id='NextMonth' class='mark' style='width:12%;' title='Next Month'>&rsaquo;</li>";
  	lis += "<li id='NextYear' class='mark' style='width:12%;' title='Next Year'>&raquo;</li></ul></div>";
	lis += "<div class='calendarBody'>";
  	lis += "<ul class='day'>";
  	for(var i=0;i<Calendar.language.weeks[this.lang].length;i++){
  		lis += "<li title='" + Calendar.language.weekday[i] + "'>" + Calendar.language.weeks[this.lang][i] + "</li>";
  	}
  	lis += "</ul><ul class='date' id='thisMonthDate'>";
  	var lastMonthLis = "";
  	for (var i = 0; i < lastMonthDate; i++) { // Last Month's Date
		lastMonthLis = "<li class='lastMonthDate'>" + lastMonthEndDate + "</li>" + lastMonthLis;
		lastMonthEndDate--;
	}
	lis += lastMonthLis;
	for (i = 1; i <= thisMonthEndDate; i++) { // Current Month's Date
		var currentDate = thisMonthFirstDate.dateAdd("d",(i-1));
		if(currentDate < this.beginDate || currentDate > this.endDate){
			lis += "<li class='lastMonthDate'>" + i + "</li>";
  			continue;
		}
		lis += "<li class='thisMonth' title='" + currentDate.format("yyyy-MM-dd") + "'><a href='javascript:void(0);' ";
		if(currentDate.format("yyyy-MM-dd") == (this.date).format("yyyy-MM-dd")){
			lis += "class='today' ";
		}
		lis += ">" + i + "</a></li>";
	}
	var j = 1;
	for (i = thisMonthEndDay; i < 6; i++) { // Next Month's Date
		lis += "<li class='nextMonthDate'>" + j + "</li>";
		j++;
	}
  	lis += "</ul>"
  	lis += "</div>";//close calendarBody
  	if("t" == this.type){  //show time
  		var curHour = this.date.getHours();
  		var curMinute = this.date.getMinutes();
  		var curSecond = this.date.getSeconds();
  		lis += "<ul class='calendarTime' id='calendarTime'>";
  		lis += "<span id='thisHour'>" + (curHour<10?"0"+curHour:curHour) + "</span>&nbsp;:&nbsp;"+
  		"<span id='thisMinute'>" + (curMinute<10?"0"+curMinute:curMinute) + "</span>&nbsp;:&nbsp;"+
  		"<span id='thisSecond'>" + (curSecond<10?"0"+curSecond:curSecond) + "</span>"+
  		"</ul>";
  	}
	lis += "<div class='calendarBottom'><ul>";
	lis += "<li id='emptyCalendar' style='width:27%;' title='Clear'>" + Calendar.language.clear[this.lang] +"</li>";
	lis += "<li id='selectCurrent' style='width:45%;' title='"+Calendar.language.today[0][this.type=="d"?0:2]+"'>" + 
	Calendar.language.today[this.lang][this.type=="d"?0:2] +"</li>";
  }
  
  lis += "<li id='closeCalendar' style='width:27%;' title='Close'>" + Calendar.language.close[this.lang] +"</li>";
  lis += "</ul></div>";//close calendarBottom
  lis += "<div class='calendar_selector' id='calendar_selector'><ul class='calendar_selector_table'></ul></div>";
  lis += "<div id='Calendar_Overlay' class='Calendar_Overlay'></div></div>";//close calendar
  lis += "</body></html>";
  var doc = getFrameDocument(this.iframe);
  doc.writeln(head);
  doc.writeln(lis);
  doc.close();
  this.document = doc;
    
  this.bingEvent();
}

Calendar.prototype.showOverlay = function(){
	var overlay = this.document.getElementById("Calendar_Overlay");
	var opacity = 0.2;
  	overlay.style.width = this.document.documentElement.offsetWidth + "px";
  	overlay.style.height = (this.document.documentElement.offsetHeight - 61) + "px";
	overlay.style.opacity = opacity;
	overlay.style.filter = 'alpha(opacity=' + (opacity*100) + ')';
  	overlay.style.display = "";
}

Calendar.prototype.hideOverlay = function(){
	var overlay = this.document.getElementById("Calendar_Overlay");
	overlay.style.display = 'none';
}

/**
* Bind Click Event into Calendar
*/
Calendar.prototype.bingEvent = function(){
  var calendar = this;
  this.setAutoHeight();
  
  this.panel.onmouseover = function(){calendar.isFocus = true;}
  this.panel.onmouseout = function(){calendar.isFocus = false;}
  
  this.dateControl.onblur = function(){
  	if(!calendar.isFocus){
  		calendar.hide();
  	}
  }
  
  this.getElementById("selectCurrent").onclick = function(){
  	calendar.date = new Date();
  	calendar.valueSelected(calendar.date);
  	calendar.hide();
  }
  this.getElementById("emptyCalendar").onclick = function(){calendar.dateControl.value = "";calendar.hide();}
  this.getElementById("closeCalendar").onclick = function(){calendar.hide();}
  
  this.getElementById("PrevYear").onclick = function(){
  	calendar.date = calendar.date.dateAdd("y",-1);
  	calendar.draw();
  }
  
  if(this.getElementById("PrevMonth")){
	  this.getElementById("PrevMonth").onclick = function(){
	  	calendar.date = calendar.date.dateAdd("m",-1);
	  	calendar.draw();
	  }
	  this.getElementById("NextMonth").onclick = function(){
	  	calendar.date = calendar.date.dateAdd("m",1);
	  	calendar.draw();
	  }
  }
  
  this.getElementById("NextYear").onclick = function(){
  	calendar.date = calendar.date.dateAdd("y",1);
  	calendar.draw();
  }
  
  var elements = getElementsByClassName(this.document, "li", "thisMonth");
  for(var i=0; i<elements.length; i++){
	elements[i].onclick = function(){
		var selectedDate = this.title.toDate();
	  	calendar.valueSelected(selectedDate);
	  	calendar.hide();
	}
  }
  
  if("m" != this.type){
  	this.getElementById("selectThisYear").onclick = function(){calendar.selectThisYear(this);}
	this.getElementById("selectThisMonth").onclick = function(){calendar.selectThisMonth(this);}
	if("t" == this.type){
	 this.getElementById("thisHour").onclick = function(){calendar.selectThisHour(this);};
	 this.getElementById("thisMinute").onclick = function(){calendar.selectThisMinute(this);};
	 this.getElementById("thisSecond").onclick = function(){calendar.selectThisSecond(this);};
	}
  }
}

Calendar.prototype.selectThisYear = function(){
	var calendar = this;
  	var curYear = calendar.date.getFullYear();
  	var beginYear = calendar.beginDate.getFullYear();
	var endYear = calendar.endDate.getFullYear();
  	calendar.showOverlay();
  	var selectorObj = calendar.document.getElementById("calendar_selector");
  	selectorObj.style.left = "0px";
  	selectorObj.style.top = "21px";
  	var strHtml = "";
  	if(beginYear < curYear - 15){
  		beginYear = curYear - 15;
  	}
  	if(endYear > curYear+16){
  		endYear = curYear+16;
  	}
  	for(var i=beginYear; i<=endYear; i++){
  		strHtml += "<li style='width:31.5px;";
  		if(i == curYear){strHtml += "color:red;";}
  		strHtml += "'>"+i +"</li>";
  	}
  	var selectorTable = selectorObj.children[0];
  	selectorTable.innerHTML = strHtml;
  	selectorObj.style.visibility = "visible";
  	var elements = selectorTable.children;
  	for(var i=0; i<elements.length; i++){
		elements[i].onclick = function(){
			calendar.date.setFullYear(this.innerHTML);
		  	calendar.draw();
		}
	}
}

Calendar.prototype.selectThisMonth = function(){
	var calendar = this;
  	var curMonth = calendar.date.getMonth()+1;
  	var curYear = calendar.date.getFullYear();
  	var startMonth = 1;
	var endMonth = 12;
	if(curYear == calendar.endDate.getFullYear()){
		endMonth = calendar.endDate.getMonth() + 1;
	}
	if(curYear == calendar.beginDate.getFullYear()){
		startMonth = calendar.beginDate.getMonth() +1;
	}
  	calendar.showOverlay();
  	var selectorObj = calendar.document.getElementById("calendar_selector");
  	selectorObj.style.left = "22px";
  	selectorObj.style.top = "21px";
  	var strHtml = "";
  	for(var i=startMonth; i<=endMonth; i++){
  		strHtml += "<li";
  		if(i == curMonth){strHtml += " style='color:red;'";}
  		strHtml += ">"+i +"</li>";
  	}
  	var selectorTable = selectorObj.children[0];
  	selectorTable.innerHTML = strHtml;
  	selectorObj.style.visibility = "visible";
  	var elements = selectorTable.children;
  	for(var i=0; i<elements.length; i++){
		elements[i].onclick = function(){
			var selectMonth = this.innerHTML;
			calendar.date.setMonth(parseInt(selectMonth)-1);
		  	calendar.draw();
		}
	}
}

Calendar.prototype.selectThisHour = function(thisHourObj){
	var calendar = this;
  	var curHour = calendar.date.getHours();
  	calendar.showOverlay();
  	var selectorObj = calendar.document.getElementById("calendar_selector");
  	selectorObj.style.left = "0px";
  	var dcHeight = calendar.document.documentElement.offsetHeight;
  	selectorObj.style.top = (dcHeight-39 - 14*4) +"px";
  	var strHtml = "";
  	for(var i=0; i<24; i++){
  		strHtml += "<li";
  		if(i == curHour){strHtml += " style='color:red;'";}
  		strHtml += ">"+(i<10?"0"+i:i) +"</li>";
  	}
  	var selectorTable = selectorObj.children[0];
  	selectorTable.innerHTML = strHtml;
  	selectorObj.style.visibility = "visible";
  	var elements = selectorTable.children;
  	for(var i=0; i<elements.length; i++){
		elements[i].onclick = function(){
			calendar.date.setHours(this.innerHTML);
		  	calendar.hideOverlay();
		  	selectorObj.style.visibility = "hidden";
		  	thisHourObj.innerHTML = this.innerHTML;
		}
	}
}

Calendar.prototype.selectThisMinute = function(thisMinuteObj){
	var calendar = this;
  	calendar.showOverlay();
  	var selectorObj = calendar.document.getElementById("calendar_selector");
  	
  	this.showSelector(selectorObj, 0, 30, function(value){
  		calendar.date.setMinutes(value);
  		thisMinuteObj.innerHTML = value;
  	});
}

Calendar.prototype.showSelector = function(selectorObj, start,end,fn){
	var calendar = this;
	selectorObj.style.left = "22px";
	var dcHeight = calendar.document.documentElement.offsetHeight;
  	selectorObj.style.top = (dcHeight-39 - 14*6) +"px";
  	var strHtml = "";
  	for(var i=start; i<end; i+=1){
  		strHtml += "<li>"+(i<10?"0"+i:i) +"</li>";
  	}
  	var selectorTable = selectorObj.children[0];
  	selectorTable.innerHTML = strHtml;
  	var nextObj;
  	if(selectorObj.children.length == 1){
	  	nextObj = calendar.document.createElement("DIV");
	  	nextObj.style.margin = "2 0 0 0";
	  	nextObj.style.textAlign = "center";
	  	nextObj.innerHTML = "<a href='javascript:void(0);'>"+Calendar.language.control[this.lang][start==0?1:0]+"</a>";
	  	selectorObj.appendChild(nextObj);
  	}else{
  		nextObj = selectorObj.children[1];
  	}
  	selectorObj.style.visibility = "visible";
  	
  	nextObj.children[0].onclick = function(){
  		var nextSpanObj = this;
  		this.innerHTML = Calendar.language.control[calendar.lang][start==0?0:1];
  		calendar.showSelector(selectorObj, (start==0?end:0), (start==0?end*2:start), fn);
  	}
  	
  	var elements = selectorTable.children;
  	for(var i=0; i<elements.length; i++){
		elements[i].onclick = function(){
		  	calendar.hideOverlay();
		  	selectorObj.removeChild(selectorObj.children[1]);
		  	selectorObj.style.visibility = "hidden";
		  	if(fn){
		  		fn(this.innerHTML);
		  	}
		}
	}
}

Calendar.prototype.selectThisSecond = function(thisSecondObj){
	var calendar = this;
  	calendar.showOverlay();
  	var selectorObj = calendar.document.getElementById("calendar_selector");
  	this.showSelector(selectorObj, 0, 30, function(value){
  		calendar.date.setSeconds(value);
  		thisSecondObj.innerHTML = value;
  	});
}

Calendar.prototype.valueSelected = function(selectedDate){
	var _this = this;
	_this.date.setFullYear(selectedDate.getFullYear());
	_this.date.setMonth(selectedDate.getMonth());
	_this.date.setDate(selectedDate.getDate());
	this.dateControl.value = _this.date.format(this.dateFormatStyle);
}

/**
* Set Auto Height for Calendar Panel Div
*/
Calendar.prototype.setAutoHeight = function(){
	var height = this.document.body.scrollHeight + "px";
	var width = this.getElementById("calendar").style.width;
	width = (parseInt(width.substr(0,width.length-1)) + 2) + "px";
	this.iframe.style.height = height;
	this.panel.style.height = height;
	this.panel.style.width = width;
}

//Extend document.getElementById(id)
Calendar.prototype.getElementById = function(id){
  if (typeof(id) != "string" || id == "") return null;
  if(null == this.document) return null;
  if (this.document.getElementById) return this.document.getElementById(id);   
  if (this.document.all) return this.document.all(id);   
  try {return eval(id);} catch(e){ return null;}   
}
  
//Extend object.getElementsByTagName(tagName)   
Calendar.prototype.getElementsByTagName = function(tagName){
  if(null == this.document) return null;
  if (this.document.getElementsByTagName) return this.document.getElementsByTagName(tagName);   
  if (this.document.all) return this.document.all.tags(tagName);   
}   

/**
* Find a HTML Object by TagName and className
* @param oElm  parentNode Object
* @param strTagName tag name want to find
* @param strClassName class name
*/
function getElementsByClassName(oElm, strTagName, strClassName){  
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all:oElm.getElementsByTagName(strTagName);  
    var arrReturnElements = new Array();  
    strClassName = strClassName.replace(/\-/g, "\\-");  
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");  
    var oElement;  
    for(var i=0; i < arrElements.length; i++){  
        oElement = arrElements[i];  
        if(oRegExp.test(oElement.className)){  
            arrReturnElements.push(oElement);  
        }  
    }  
    return (arrReturnElements)  
} 


//find the absolute position
Calendar.prototype.getAbsPoint = function (e){   
  var x = e.offsetLeft;   
  var y = e.offsetTop;   
  while(e = e.offsetParent){   
    x += e.offsetLeft;   
    y += e.offsetTop;   
  }   
  return {"x": x, "y": y};   
}

//显示日历   
Calendar.prototype.show = function () {
  var xy = this.getAbsPoint(this.dateControl);
  this.panel.style.left = xy.x + "px";
  this.panel.style.top = (xy.y + this.dateControl.offsetHeight) + "px";
  this.setDisplayStyle("select", "hidden");
  this.panel.style.visibility = "visible";
}

//Hide Calendar   
Calendar.prototype.hide = function() {
  this.setDisplayStyle("select", "visible");
  this.panel.style.visibility = "hidden";
  this.isFocus = false;
}
  
//Set Calendar Picker visible or invisible
Calendar.prototype.setDisplayStyle = function(tagName, style) {   
  var tags = this.getElementsByTagName(tagName)   
  for(var i = 0; i < tags.length; i++) {   
    if (tagName.toLowerCase() == "select" && 
       (tags[i].name == "calendarYear" ||   
      tags[i].name == "calendarMonth")){   
      continue;
    }
    tags[i].style.visibility = style;   
  }
}

document.write('<div id="calendarPanel" style="position:absolute;visibility:hidden;z-index:9999;background-color:#FFFFFF;font-size:12px;width:20px;">');
document.write("<iframe id='calendarIframe' scrolling='no' frameborder='0' width='100%' height='100'></iframe></div>");