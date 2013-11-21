/**
* ==  background ==
*
*   @Author: 
*       mutarock, mutarock@gmail.com
**/

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