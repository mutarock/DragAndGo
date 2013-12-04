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
    'image_left': 0,
    'text_up_engine': 0,
    'text_down_engine': 0,
    'text_right_engine': 0,
    'text_left_engine': 0,
    'link_gesture_mode': 0,
    'text_gesture_mode': 0,
    'image_gesture_mode': 0
};

// build in search engine
var g_build_in_seach_engines = [{
            "name" : "google",
            "url" : "http://www.google.com/search?hl=en&q=%s"
        }, {
            "name" : "yahoo",
            "url" : "http://search.yahoo.com/search?fr=crmas&p=%s"
        }, {
            "name" : "wiki",
            "url" : "http://en.wikipedia.org/w/index.php?search=%s"
        }];


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
		//console.log(tabs.length);
		var newIndex = tabs.length;
		var activeMode = activeOrNot(tabData);

		console.log(activeMode);
		if (activeMode == 99) {
			return;

		} else if (activeMode == 0) {
			tabData.isActive = true;
			tabData.newIndex = newIndex;
			openTab(tabData);

		} else if (activeMode == 1) {
			tabData.isActive = false;
			tabData.newIndex = newIndex;
			openTab(tabData);

		} else if (activeMode == 2) {
			updateCurrTab(tabData);

		} else if (activeMode == 3) {
			highLightCurrTab(tabData);

		} else {
			// Impossible.......

		}

		// if (!tabData.isUrl)
		// 	setSearchUrl(tabData);

		// // open tab
		// chrome.tabs.create({
		// 					"url" : tabData.url,
		// 					"active" : isActive,
		// 					"index" : newIndex
		// });

	});
}


function openTab(tabData) {
	if (!tabData.isUrl)
		setSearchUrl(tabData);

	// open tab
	chrome.tabs.create({
					"url" : tabData.url,
					"active" : tabData.isActive,
					"index" : tabData.newIndex
	});

}

function updateCurrTab(tabData) {
	if (!tabData.isUrl)
		setSearchUrl(tabData);

	chrome.tabs.getSelected(null, function (tab) {
		chrome.tabs.update(tab.id, {url: tabData.url});
	});

}

function highLightCurrTab(tabData) {
	// if (window.find) {

	// 	var string = String(tabData.url);
	// 	console.log(string);
	// 	var found = window.find(string, false, false, false, true, false, false);
	// 	if (!found) {
	// 		alert ("The following text was not found:\n" + string);
	// 	}
	// }
}



/****************************/
/*  0 : UP        1 : DOWN  */
/*  2 : RIGHT     3 : LEFT  */
/****************************/
function activeOrNot(tabData) {
	
	if (!tabData.isUrl) {  // text
		switch(tabData.dirID) {
			case 0:
				return localStorage['text_up'];
				
			case 1:
				return localStorage['text_down'];
				
			case 2:
				return localStorage['text_right'];
				
			case 3:
				return localStorage['text_left'];

		}
	}else {  // url or image
		switch(tabData.dirID) {
			case 0:
				return localStorage['link_up'];
				
			case 1:
				return localStorage['link_down'];
				
			case 2:
				return localStorage['link_right'];
				
			case 3:
				return localStorage['link_left'];

		}
	}

}

function setSearchUrl(tabData) {
	var enginesIndex;

	switch(tabData.dirID) {
		case 0:
			enginesIndex = localStorage['text_up_engine'];
			break;
				
		case 1:
			enginesIndex = localStorage['text_down_engine'];
			break;
				
		case 2:
			enginesIndex = localStorage['text_right_engine'];
			break;
				
		case 3:
			enginesIndex = localStorage['text_left_engine'];
			break;
	}

	tabData.url = g_build_in_seach_engines[enginesIndex].url.replace(
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