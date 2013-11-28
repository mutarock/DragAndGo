/**
* ==  background ==
*
*   @Author: 
*       mutarock, mutarock@gmail.com
**/

// default option value
var g_default_value = {
    'link_up': 0,
    'link_down': 0,
    'link_right': 0,
    'link_left': 0,
    'text_up': 0,
    'text_down': 0,
    'text_right': 0,
    'text_left': 0,
    'image_up': 0,
    'image_down': 0,
    'image_right': 0,
    'image_left': 0
};

// background.js startup
window.onload = function() {
    initailize();
};

// 初始化
function initailize() {
    for(var i in g_default_value) {
        if(localStorage[i] == undefined) {
            localStorage[i] = g_default_value[i];
        }
    }
}

function openNewTab(tabData) {
	//console.log("Background.js");

	chrome.tabs.query({'currentWindow': true}, function(tabs){
		console.log(tabs.length);
		var newIndex = tabs.length;
		var isActive = activeOrNot(tabData);

		if (!tabData.isUrl)
			setSearchUrl(tabData);

		// open tab
		chrome.tabs.create({
							"url" : tabData.url,
							"active" : isActive,
							"index" : newIndex
		});

	});
}

function activeOrNot(tabData) {
	var _isActive = getLocal().activeMode;
	if (_isActive == 0) {
		return false;
	} else {
		return true;
	}
}

function setSearchUrl(tabData) {
	var engines = getLocal().searchEngines;

	tabData.url = _build_in_seach_engines[engines[tabData.dirID]].url.replace(
				"%s", tabData.url);
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
					"from a content script:" + sender.tab.url :
					"from the extension");

		if (request.greeting == "openNewTab") {
			openNewTab(request.data);
			sendResponse({farewell: "goodbye"});
		}
});