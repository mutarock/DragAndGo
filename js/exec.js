/**
* ==  content script ==
*
*   @Author: 
*       mutarock, mutarock@gmail.com
**/

var _start_x = 0;
var _start_y = 0;
var _dirID = 0;
var _dnd_Data;

$(document).ready(function(e) {

    $(document)
        .on( "dragstart", function( event, ui ) {
            //e.preventDefault();
            _start_x = window.event.x;
            _start_y = window.event.y;

            _dnd_Data = getDnDSelection(event);
            //return false;
        } )

        .on( "drag", function( event, ui ) {
            var new_Dir = getDirID();
            if(new_Dir != _dirID) {
                _dirID = new_Dir;
            }
        } )

        .on( "dragend", function( event, ui ) {
            //e.preventDefault();
            //console.log(_dirID);
            handleSelection(event);
            //return false;
        } )

        .on( "dragover", function( event, ui ) {
            if (event.preventDefault) {
                event.preventDefault();
            }

            event.dataTransfer.effectAllowed = "copy";
            event.dataTransfer.dropEffect = "copy";
            //return false;
        } )

        .on( "drop", function( event, ui ) {

        } )

});

jQuery.event.props.push('dataTransfer');

function getDirID() {

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

    var now_x = window.event.x;
    var now_y = window.event.y;
    var diff_x = Math.abs(now_x - _start_x); 
    var diff_y = Math.abs(now_y - _start_y);

    if (now_x > _start_x && now_y > _start_y) { // DOWN-RIGHT
        if(diff_x > diff_y)
            return 8;
        return 6;

    } else if (now_x < _start_x && now_y > _start_y) {  // DOWN-LEFT
        if(diff_x > diff_y)
            return 2;
        return 4;

    } else if (now_x > _start_x && now_y < _start_y) {  // UP-RIGHT
        if(diff_x > diff_y)
            return 7;
        return 5;

    } else {  // UP-LEFT
        if(diff_x > diff_y)
            return 1;
        return 3;
    }
}

function getDnDSelection(event) {
    var data;
    var dataType = "text";
    var node = event.target;
    var nodeName = node.nodeName;
    var selection = window.getSelection();

    while (node && node.nodeName != "A") {
        node = node.parentNode;
    }

    console.log(nodeName);
    console.log(event);

    if(node) {
        if(node.href.substr(0, 11) != "javascript:") {
            //console.log("Link");
            dataType = "link";
            data = node.href;
        } 

    }else if(nodeName == "IMG") {
            //console.log("Image");
            dataType = "img";
            //data = event.originalEvent.srcElement.src;
            data = event.target.src;
            console.log(event.target.src);

    }else {
        //console.log("Text");
        data = event.dataTransfer.getData('Text');
        if(!data) {
            data = selection.toString();
        }

    }

    return {
        "dataType" : dataType,
        "data" : data
    }
}

function handleSelection(event) {
    // var now_x = window.event.x;
    // var now_y = window.event.y;

    if (event.dataTransfer.dropEffect == "copy") {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (_dnd_Data) {
            var newTab = generateTab(_dnd_Data);

            // console.log("----------");
            // console.log(_dirID);
            // console.log(newTab);
            // console.log("----------");

            chrome.runtime.sendMessage({greeting: "handleSelectedData", data: newTab}, function(response) {
                console.log(response.farewell);
            });
            // return false;
        }
    }
}

function generateTab(dndData) {
    var tabData = new Object();
    
    tabData.message = "tab";
    tabData.dirID = _dirID;
    
    getUrlFromData(tabData, dndData);

    //console.log(tabData);
    return tabData;
}

function getUrlFromData(tabData, dndData) {
    //var url_regex = /[a-zA-Z]+:\/\/[^\s]*/;
    var url_regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var url_regex_alter = /[^\s]*\.(com|net|org|gov|edu|biz|name|info|asia|uk|hk|cn|hk|au|ca|de|fr|jp|kr|tw|ru|us)/;

    //console.log(dndData.data);
    var matches = dndData.data.match(url_regex);
    if (matches) {
        //console.log(matches[0]);
        tabData.url = matches[0];
        tabData.isUrl = true;
    } else {
        // if original url did not contain protocol
        matches = dndData.data.match(url_regex_alter);
        if (matches) {
            tabData.url = "http://" + matches[0];
            tabData.isUrl = true;
        } else {
            tabData.url = dndData.data;
            tabData.isUrl = false;
        }
    }
}