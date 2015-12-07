/**
* ==  background.js ==
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
            'name' : "google",
            'url' : "http://www.google.com/search?hl=en&q=%s"
        }, {
            'name' : "yahoo",
            'url' : "http://search.yahoo.com/search?fr=crmas&p=%s"
        }, {
            'name' : "wiki",
            'url' : "http://en.wikipedia.org/w/index.php?search=%s"
        }];


var folderPath = "DragAndGo"

// background.js startup
window.onload = function() {
    initailize();
    console.log("DragAndGo onload");
};

// initailize
function initailize() {
    //console.log("initailize");
    for(var i in g_default_value) {
        if(localStorage[i] == undefined) {
            localStorage[i] = g_default_value[i];
        }
    }
}

// handle selected data from content script
function handleSelectedData(tabData) {

    //console.log(tabData);

    chrome.tabs.query({'currentWindow': true}, function(tabs){
        //console.log(tabs.length);
        var newIndex = tabs.length;
        var activeMode = activeOrNot(tabData);

        //console.log("ActiveMode: " + activeMode);
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

        } else if (activeMode == 4) {
            saveImageToFolder(tabData);

        }else {
            // Impossible.......
            alert("Impossible.......");

        }

    });
}


function openTab(tabData) {
    if (!tabData.isUrl) {
        setSearchUrl(tabData);
    }

    // open tab
    chrome.tabs.create({
            url : tabData.url,
            active : tabData.isActive,
            index : tabData.newIndex
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

    //  var string = String(tabData.url);
    //  console.log(string);
    //  var found = window.find(string, false, false, false, true, false, false);
    //  if (!found) {
    //      alert ("The following text was not found:\n" + string);
    //  }
    // }

    //console.log("$(document.body).highlight('"+tabData.url+"')");
    var string = String(tabData.url);
    //console.log("$(document.body).unhighlight().highlight('" + string + "')");

    chrome.tabs.query({'currentWindow': true, 'active': true}, function(tabs) {

        // unhighlight previous word then highlight current search word
        chrome.tabs.executeScript(null, {
            code: "$(document.body).unhighlight().highlight('" + string + "')"
        });


        // send message back to tab
        chrome.tabs.sendMessage(tabs[0].id, {'message': "HighLightSuccess", 'keyword': string}, function(response) {
            //console.log(response.farewell);
        });


    });
}

function highLightWord(str) {

    chrome.tabs.query({'currentWindow': true, 'active': true}, function(tabs) {

        // unhighlight previous word then highlight current search word
        if(str != "") {
            chrome.tabs.executeScript(null, {
                code: "$(document.body).unhighlight().highlight('" + str + "')"
            });

        } else {
            chrome.tabs.executeScript(null, {
                code: "$(document.body).unhighlight()"
            });
        }

    });
}

function saveimage(tabData) {
    // Save image to download location if set, otherwise will ask where to
    var anchor = document.createElement('a');

    // image url
    anchor.href = tabData.url;

    // image file name
    anchor.download = '';
    anchor.click();
}


function saveImageToFolder(tabData) {
    var fileName = getSavePath(tabData.url, tabData.domain);

    var downloadInfo = {
        url : tabData.url,
        filename : fileName,
        conflictAction: 'uniquify'
    };

    chrome.downloads.download(downloadInfo, function(id) {});

}


function getSavePath(fileUrl, urlDomain) {
    var fileName = 'test.png'

    //fileName = fileUrl.replace(/^.*(\\|\/|\:)/, '');
    fileName = fileUrl.split('\\').pop().split('/').pop();

    var url_regex_alter = /(1)[^\s]*\.(jpg|jpeg|png|gif)/;
    var matches = fileName.match(url_regex_alter);
    if (matches) {
        fileName = matches[0];
    }

    console.log(fileName);
    var savePath = "";
    if(urlDomain == null) {
        savePath = folderPath + "/" + fileName;
    }else {
        console.log(urlDomain)
        savePath = folderPath + "/" + urlDomain + "/" + fileName;
    }

    return savePath;
}


/****************************/
/*            UP            */
/*     \      |      /      */
/*      \  3  |  5  /     R */
/* L   1 \    |    / 7    I */
/* E -------------------- G */
/* F   2 /    |    \ 8    H */
/* T    /  4  |  6  \     T */
/*     /      |      \      */
/*           DOWN           */
/****************************/
function activeOrNot(tabData) {

    var prefix;

    if (!tabData.isUrl) {  // text
        prefix = "text";

    } else {  // link or image

        if (tabData.message == "link") {
            prefix = "link";

        } else if (tabData.message == "img") {
            prefix = 'image';
        }
    }

    //console.log(prefix);

    var mode = localStorage[prefix + '_gesture_mode'];
    //console.log("Mode: " + mode);
    if(mode == 1) {  // Two way
        if(tabData.dirID % 2 == 0) {
            return localStorage[prefix+'_down'];
        } else {
            return localStorage[prefix+'_up'];
        }

    } else if(mode == 0) {  // Four way
        switch(tabData.dirID) {
            case 3:
            case 5:
                return localStorage[prefix+'_up'];

            case 4:
            case 6:
                return localStorage[prefix+'_down'];

            case 7:
            case 8:
                return localStorage[prefix+'_right'];

            case 1:
            case 2:
                return localStorage[prefix+'_left'];

        }

    } else {
        return 99;
    }

}

function setSearchUrl(tabData) {
    var enginesIndex;

    var mode = localStorage['text_gesture_mode'];

    // console.log("Mode: " + mode);
    // console.log("Dir: " + tabData.dirID);

    if(mode == 1) {  // Two way
        if(tabData.dirID % 2 == 0) {
            enginesIndex = localStorage['text_down_engine'];
        } else {
            enginesIndex = localStorage['text_up_engine'];
        }

    } else if(mode == 0) {  // Four way
        switch(tabData.dirID) {
            case 3:
            case 5:
                enginesIndex = localStorage['text_up_engine'];
                break;

            case 4:
            case 6:
                enginesIndex = localStorage['text_down_engine'];
                break;

            case 7:
            case 8:
                enginesIndex = localStorage['text_right_engine'];
                break;

            case 1:
            case 2:
                enginesIndex = localStorage['text_left_engine'];
                break;

        }

    } else {
        // Impossible.......
        alert("Impossible.......");
    }


    // console.log(enginesIndex);
    // console.log(g_build_in_seach_engines[enginesIndex]);

    tabData.url = g_build_in_seach_engines[enginesIndex].url.replace(
                "%s", tabData.url);

    // console.log(tabData.url);
}


// add message listener
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");

        if (request.greeting == "handleSelectedData") {
            handleSelectedData(request.data);
            sendResponse({farewell: "handleSelected"});

        } else if (request.greeting == "highlightKeyWord") {
            highLightWord(request.data);
            sendResponse({farewell: "highlight"});

        }
});
