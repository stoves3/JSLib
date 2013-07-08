/**
 core.js
*/

/*
┌───────────────────────────────────────
│ XMLHttpRequest Wrapper Object
└───────────────────────────────────────
*/
function xhr(){
    this.myXhr = GetNewXMLHttpRequest();
    this.GetString = "";
    this.whatToDoWithXMLResult = function(xmlResponse){alert(format("No action defined to handle result: {0}", xmlResponse));};
}
xhr.prototype.go = function go(){ GetAndProcessResult(this.myXhr, this.GetString, this.whatToDoWithXMLResult); }

var isIE8 = window.XDomainRequest ? true : false;
function GetNewXMLHttpRequest(){
    var xmlhttp = null;

    if (isIE8) {
        xmlhttp = new window.XDomainRequest();
    } else {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlhttp;
}

function GetAndProcessResult(xhr, getString, whatToDoWithXMLResult){
    var processResult = function () {
        var responseXML = null;
        if (isIE8) {
            var responseXML = new ActiveXObject("Microsoft.XMLDOM");
            responseXML.async = false;
            responseXML.loadXML(xhr.responseText);
        } else {
            responseXML = xhr.responseXML;
        }
        whatToDoWithXMLResult(responseXML);
    }
    var responseHandler = function () {
        if (xhr.readyState == 4) {
            processResult();
        }
    }

    if (isIE8) xhr.onload = processResult;
    xhr.open("GET", getString, true);
    if (!isIE8) xhr.onreadystatechange = responseHandler;
    xhr.send(null);
}

/*
┌───────────────────────────────────────
│ XMLResponse Processing
└───────────────────────────────────────
*/
function ParseXMLSearchForFirst(xmlText, nodeName){
    var returnText = getNodeText(xmlText.getElementsByTagName(nodeName)[0].childNodes[0]);
    return returnText;
}

function ParseXMLSearchForFirstGrandChildNodeValueByGrandChildNodeSearchValue(xmlText, parentNode, childNode, grandChildNodeTagName, grandChildNodeSearchNode, grandChildNodeSearchValue){
    var childNodes = xmlText.getElementsByTagName(parentNode)[0].getElementsByTagName(childNode);
    var returnValue = null;
    toArray(childNodes).forEach(function (nextChildNode) {
        if (returnValue != null) return;
        var searchNodeValue = getNodeText(nextChildNode.getElementsByTagName(grandChildNodeSearchNode)[0]);
        if (searchNodeValue == null) searchNodeValue = nextChildNode.getElementsByTagName(grandChildNodeSearchNode)[0].firstChild.nodeValue;
        if (searchNodeValue.toLowerCase() == grandChildNodeSearchValue.toLowerCase()) {
            returnValue = getNodeText(nextChildNode.getElementsByTagName(grandChildNodeTagName)[0]);
            if (returnValue == null) searchNodeValue = nextChildNode.getElementsByTagName(grandChildNodeTagName)[0].firstChild.nodeValue;
        }
    });
    return returnValue;
}

function ParseXMLSearchForFirstGrandChildValue(xmlText, parentNode, childNode){
    var returnText = getNodeText(xmlText.getElementsByTagName(parentNode)[0].getElementsByTagName(childNode)[0]);
    return returnText;    
}

function ParseXMLSearchForFirstGrandChildValueByGrandChildSearchTag(xmlText, parentNode, childNode, grandChildNodeSearchTag){
    var childElements = xmlText.getElementsByTagName(parentNode)[0].getElementsByTagName(childNode)[0];
    var returnText = getNodeText(childElements.getElementsByTagName(grandChildNodeSearchTag)[0]);
    return returnText;
}

function ParseXMLAllChildPropertyFromParentNode(xmlText, parentNode, childNode, childProperty){
    var selectedParentNodes = xmlText.getElementsByTagName(parentNode);
    var childPropertyValues = [];
    toArray(selectedParentNodes).forEach(function(nextParentNode){
        var selectedChildNodes = nextParentNode.getElementsByTagName(childNode);
        toArray(selectedChildNodes).forEach(function(nextChildNode){
            childPropertyValues.push(nextChildNode.attributes.getNamedItem(childProperty).value);
        });
    });
    return childPropertyValues;
}

function ParseXMLAllGrandChildNodesWithValuesFromParentNode(xmlText, parentNode, childNode){
    var selectedParentNodes = xmlText.getElementsByTagName(parentNode);
    var childNodeSetValues = [];
    toArray(selectedParentNodes).forEach(function (nextParentNode) {
        var selectedChildNodes = nextParentNode.getElementsByTagName(childNode);
        toArray(selectedChildNodes).forEach(function (nextChildNode) {
            var childNodeSet = nextChildNode.childNodes;
            var nextchildNodeSetValueList = [];
            toArray(childNodeSet).forEach(function (nextNode) {
                var text = getNodeText(nextNode);
                nextchildNodeSetValueList[nextNode.nodeName] = text;
            });
            childNodeSetValues.push(nextchildNodeSetValueList);
        });
    });
    return childNodeSetValues;
}

function ParseXMLAllGrandChildNodeValuesFromParentNodes(xmlText, parentNode, childNode, grandChildNode){
    var selectedParentNodes = xmlText.getElementsByTagName(parentNode);
    var grandChildNodeValues = [];
    toArray(selectedParentNodes).forEach(function (nextParentNode) {
        var selectedChildNodes = nextParentNode.getElementsByTagName(childNode);
        toArray(selectedChildNodes).forEach(function (nextChildNode) {
            var grandChildNodeSet = nextChildNode.getElementsByTagName(grandChildNode);
            toArray(grandChildNodeSet).forEach(function (nextNode) {
                var text = getNodeText(nextNode);
                grandChildNodeValues.push(text);
            });
        });
    });
    return grandChildNodeValues;
}

function ParseXMLAllGrandChildNodeValuesFromParentNodesOptionalValueCheck(xmlText, parentNode, childNode, grandChildNode, valueNodeCheckValuesArray){
    var selectedParentNodes = xmlText.getElementsByTagName(parentNode);
    var grandChildNodeValues = [];
    toArray(selectedParentNodes).forEach(function(nextParentNode){
        var selectedChildNodes = nextParentNode.getElementsByTagName(childNode);
        toArray(selectedChildNodes).forEach(function(nextChildNode){
            var grandChildNodeSet = nextChildNode.getElementsByTagName(grandChildNode);
            toArray(grandChildNodeSet).forEach(function(nextNode){
                var valueNode = getNodeText(nextNode);
                
                var add = true;
                valueNodeCheckValuesArray.forEach(function(nextValueNodePair){
                    if (!add) return;
                    var nodeToCheck = nextValueNodePair[0];
                    var nodeValue = nextValueNodePair[1];
                                        
                    var compareNode = getNodeText(nextChildNode.getElementsByTagName(nodeToCheck)[0]);
                    if (compareNode == null || compareNode != nodeValue) add = false;
                });
                if (add) grandChildNodeValues.push(valueNode);
            });
        });
    });
    return grandChildNodeValues;
}

function ParseXMLAllGrandChildNodeValuePairsFromParentNodesOptionalValueCheck(xmlText, parentNode, childNode, grandChildNodeKeyValuePair, valueNodeCheckValuesArray){
    var selectedParentNodes = xmlText.getElementsByTagName(parentNode);
    var grandChildNodeValues = [];
    toArray(selectedParentNodes).forEach(function (nextParentNode) {
        var selectedChildNodes = nextParentNode.getElementsByTagName(childNode);
        toArray(selectedChildNodes).forEach(function (nextChildNode) {
            var grandChildNodeKey = grandChildNodeKeyValuePair[0];
            var grandChildNodeValue = grandChildNodeKeyValuePair[1];

            var key = getNodeText(nextChildNode.getElementsByTagName(grandChildNodeKey)[0]);
            var value = getNodeText(nextChildNode.getElementsByTagName(grandChildNodeValue)[0]);
            var grandChildNodePair = [key, value];

            var add = true;
            valueNodeCheckValuesArray.forEach(function (nextCheckValueNodePair) {
                if (!add) return;
                var nodeToCheck = nextCheckValueNodePair[0];
                var nodeValue = nextCheckValueNodePair[1];

                var compareNode = getNodeText(nextChildNode.getElementsByTagName(nodeToCheck)[0]);

                if (compareNode == null || compareNode != nodeValue) add = false;
            });
            if (add) grandChildNodeValues.push(grandChildNodePair);
        });
    });
    return grandChildNodeValues;
}

function ParseXMLUniqueGrandChildNodeValuesFromParentNodesIgnoringEmptyValueNodeOptionalValueCheck(xmlText, parentNode, childNode, grandChildValueNode, grandChildEmptyNode, valueNodeToCheck, valueNodeValue){
    var selectedParentNodes = xmlText.getElementsByTagName(parentNode);
    var grandChildValueList = [];
    toArray(selectedParentNodes).forEach(function(nextParentNode) {
        var selectedChildNodes = nextParentNode.getElementsByTagName(childNode);
        toArray(selectedChildNodes).forEach(function(nextChildNode) {           
            var valueNode = getNodeText(nextChildNode.getElementsByTagName(grandChildValueNode)[0]);
            var emptyNode = getNodeText(nextChildNode.getElementsByTagName(grandChildEmptyNode)[0]);
            var compareNode = null;
            if (valueNodeToCheck != null && valueNodeToCheck != "") {
                compareNode = getNodeText(nextChildNode.getElementsByTagName(valueNodeToCheck)[0]);
            }
            if(emptyNode != null && emptyNode != "") {
                if (compareNode == null || compareNode == valueNodeValue) grandChildValueList.push(valueNode);
            }
        });
    });
    return grandChildValueList.distinct();
}

function ParseXMLFirstGrandChildNodeValueFromParentNodeWithEmptyValueNode(xmlText, parentNode, childNode, grandChildValueNode, grandChildEmptyNode){
    var selectedParentNodes = xmlText.getElementsByTagName(parentNode);
    var returnValue = null;
    toArray(selectedParentNodes).forEach(function (nextParentNode) {
        var selectedChildNodes = nextParentNode.getElementsByTagName(childNode);
        toArray(selectedChildNodes).forEach(function (nextChildNode) {
            if (returnValue != null) return;
            var valueNode = getNodeText(nextChildNode.getElementsByTagName(grandChildValueNode)[0]);
            var emptyNode = getNodeText(nextChildNode.getElementsByTagName(grandChildEmptyNode)[0]);

            if (emptyNode == null || emptyNode == "") returnValue = valueNode;
        });
    });
    return returnValue;
}

/*
┌───────────────────────────────────────
│ Chart Utilities
└───────────────────────────────────────
*/
function ChartVector(x, y){
    this.X = x;
    this.Y = y;
}

function GetChartPlotPointsFromVectors(startX, startY, chartVectorSeries, invertXProgression, invertYProgression){
    var plotPoints = [];

    var curX = startX;
    var curY = startY;
    plotPoints.push([curX, curY]);

    chartVectorSeries.forEach(function(nextVector) {
        var Xmovement = 1 - (2 * invertXProgression);
        curX = curX + (nextVector.X * Xmovement);
        var Ymovement = 1 - (2 * invertYProgression);
        curY = curY + (nextVector.Y * Ymovement);

        plotPoints.push([curX, curY]);
    });

    return plotPoints;
}

/*
┌───────────────────────────────────────
│ Node Utilities
└───────────────────────────────────────
*/
function getNodeText(node){
    var text = node.textContent;    
    if (text == null) text = node.nodeValue;
    if (text == null) text = node.text;
    return text;
}

/*
┌───────────────────────────────────────
│ String Utilities
└───────────────────────────────────────
*/
function format(str){
    for(i = 1; i < arguments.length; i++)
    {
        str = str.replace('{' + (i - 1) + '}', arguments[i]);
    }
    return str;
}

function toDelimitedString(list, delimiter){
    if(delimiter == null) delimiter = ",";
    var listString = "";
    toArray(list).forEach(function(nextEntry){
        listString = format("{0}{1}{2}", listString, delimiter, nextEntry);
    });
    return listString.substr(1);
}

/*
┌───────────────────────────────────────
│ Date Extensions
└───────────────────────────────────────
*/
var MillisecondsPerDay = 86400000
if ( !Date.prototype.DaysBetweenThisAnd ) {
    Date.prototype.DaysBetweenThisAnd = function (date2) {
        var millisecs = Math.abs(this - date2);
        return millisecs / MillisecondsPerDay;
    }
}

/*
┌───────────────────────────────────────
│ Array Extensions
└───────────────────────────────────────
*/
if ( !Array.prototype.forEach ) {
    Array.prototype.forEach = function(fn, scope){
        for(var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope || this, this[i], i, this);
        }
    }
}

if ( !Array.prototype.sum ) {
    Array.prototype.sum = function() {
        for(var i = 0, sum = new Number(0); i < this.length; i++) {
            var nextNum = new Number(this[i]);
            sum += nextNum;
        };
        return sum;
    }
}

if ( !Array.prototype.max ) {
    Array.prototype.max = function(){
        return Math.max.apply({},this)
    }
}

if ( !Array.prototype.min ) {
    Array.prototype.min = function(){
        return Math.min.apply({},this)
    }
}

if ( !Array.prototype.distinct ) {
    Array.prototype.distinct = function() {
        var newArray = [];
        if(this.length == 0) return newArray;
        
        for(var i = 0; i < this.length; i += 1) {
            if(!newArray.contains(this[i])) {
                newArray.push(this[i])
            }
        }
        return newArray;
    }
}

if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === obj) {
                return i;
            }
        }
        return -1;
    };
}

if(!Array.prototype.contains) {
    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }
}

if(!Array.prototype.sortByProperty){
    Array.prototype.sortByProperty = function (propertyName, desc) {
        return (desc) ? this.sort(dynamicSortDesc(propertyName)) : this.sort(dynamicSort(propertyName));
    }
}

function dynamicSort(propertyName) {
    return function (a, b) {
        return (a[propertyName] < b[propertyName]) ? -1 : (a[propertyName] > b[propertyName]) ? 1 : 0;
    }
}

function dynamicSortDesc(propertyName) {
    return function (b, a) {
        return (a[propertyName] < b[propertyName]) ? -1 : (a[propertyName] > b[propertyName]) ? 1 : 0;
    }
}

if(!Array.prototype.sortByIndex){
    Array.prototype.sortByIndex = function (i, desc) {
        return (desc) ? this.sort(dynamicSortDesc(i)) : this.sort(dynamicSort(i));
    }
}

function dynamicIndexSort(i) {
    return function (a, b) {
        return (a[i] < b[i]) ? -1 : (a[i] > b[i]) ? 1 : 0;
    }
}

function dynamicIndexSortDesc(i) {
    return function (b, a) {
        return (a[i] < b[i]) ? -1 : (a[i] > b[i]) ? 1 : 0;
    }
}

if(!Array.prototype.filterByPropertyValue){
    Array.prototype.filterByPropertyValue = function (propertyName, propertyValue, filterIsInclusive) {
        var newArray = [];
        
        this.forEach(function(nextElement){
            var elementHasPropertyValue = nextElement[propertyName] == propertyValue;
            if (elementHasPropertyValue == filterIsInclusive) newArray.push(nextElement);
        });

        return newArray;
    }
}

if(!Array.prototype.findFirstElementWithPropertyValue){
    Array.prototype.findFirstElementWithPropertyValue = function (propertyName, propertyValue) {
        var firstMatch = null;

        this.forEach(function (nextElement) {
            if (firstMatch != null) return;

            var elementHasPropertyValue = nextElement[propertyName] == propertyValue;
            if (elementHasPropertyValue == filterIsInclusive) return nextElement;
        });

        return firstMatch;
    }
}

if(!Array.prototype.toPropertyArray){
    Array.prototype.toPropertyArray = function(propertyName) {
        var propertyList = [];
        this.forEach(function(nextObj){ propertyList.push(nextObj[propertyName]); });
        return propertyList;
    }
}

if(!Array.prototype.toArrayByIndex){
    Array.prototype.toArrayByIndex = function(i) {
        var propertyList = [];
        this.forEach(function(nextObj){ propertyList.push(nextObj[i]); });
        return propertyList;
    }
}

if(!Array.prototype.getValueByKey){
    Array.prototype.getValueByKey = function (key) {
        var value = null;
        this.forEach(function (nextObj) {
            if (value != null) return;
            if (nextObj[0] == key) value = nextObj[1];
        });
        return value;
    }
}

if(!Array.prototype.getLastValueFromUnchangedAdjacentKeys){
    Array.prototype.getLastValueFromUnchangedAdjacentKeys = function (optionalIgnoreList) {
        if (this.length == 0) return null;
        if (this.length == 1) return this[0][1];

        var value = null;
        var previousValue = null;
        var key = null;
        var previousKey = null;
        this.forEach(function (nextObj) {
            if (value != null) return;
            if (optionalIgnoreList != null && toArray(optionalIgnoreList).contains(nextObj[0])) return;

            if (key != previousKey && previousKey != null) {
                value = previousValue;
                return;
            }

            previousKey = key;
            key = nextObj[0];
            previousValue = nextObj[1];
        });
        return (value == null) ? previousValue : value;
    }
}

if(!Array.prototype.sumChildProperty){
    Array.prototype.sumChildProperty = function(propertyName) {
        var propertyList = [];
        this.forEach(function(nextObj){ propertyList.push(nextObj[propertyName]); });
        return propertyList.sum();
    }
}

if(!Array.prototype.maxChildProperty){
    Array.prototype.maxChildProperty = function (propertyName) {
        var maxProperty = null;
        if (this.length == 0) return maxProperty;
        this.forEach(function (nextObj) {
            if (maxProperty == null || maxProperty < nextObj[propertyName]) maxProperty = nextObj[propertyName];
        });
        return maxProperty;
    }
}

if(!Array.prototype.minChildProperty){
    Array.prototype.minChildProperty = function (propertyName) {
        var minProperty = null;
        if (this.length == 0) return minProperty;
        this.forEach(function (nextObj) {
            if (minProperty == null || nextObj[propertyName] < minProperty) minProperty = nextObj[propertyName];
        });
        return minProperty;
    }
}

if(!Array.prototype.pushRepeatedValue) {
    Array.prototype.pushRepeatedValue = function (value, number) {
        for (var i = 0; i < number; i++) {
            this.push(value);
        }
    };
}

if(!Array.prototype.appendTo) {
    Array.prototype.appendTo = function (toArray) {
        this.forEach(function(nextObj){ toArray.push(nextObj); });
    };
}

if(!Array.prototype.getEntriesByConditionalProperty) {
    Array.prototype.getEntriesByConditionalProperty = function (propertyName, condition) {
        var newArray = [];
        this.forEach(function (nextObj) { if (condition(nextObj[propertyName])) newArray.push(nextObj); });
        return newArray;
    };
}

function toArray(obj){
    var array = [];
    // iterate backwards ensuring that length is an UInt32
    for(var i = obj.length >>> 0; i--; ) {
        array[i] = obj[i];
    }
    return array;
}

/*
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com
*/
function getElementsByClassName(oElm, strTagName, oClassNames){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var arrRegExpClassNames = new Array();
	if(typeof oClassNames == "object"){
		for(var i=0; i<oClassNames.length; i++){
			arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)"));
		}
	}
	else{
		arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)"));
	}
	var oElement;
	var bMatchesAll;
	for(var j=0; j<arrElements.length; j++){
		oElement = arrElements[j];
		bMatchesAll = true;
		for(var k=0; k<arrRegExpClassNames.length; k++){
			if(!arrRegExpClassNames[k].test(oElement.className)){
				bMatchesAll = false;
				break;
			}
		}
		if(bMatchesAll){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}

if(typeof Array.prototype.push != "function"){
	Array.prototype.push = ArrayPush;
	function ArrayPush(value){
		this[this.length] = value;
	}
}


/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * http://blog.stevenlevithan.com/archives/date-time-format
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};