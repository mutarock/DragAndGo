function getLocal() {
    var settings = localStorage.getItem("myDragSettings");
    if (!settings)
        return getDefault();
    return JSON.parse(settings);
}

/************************************/
/* activeMode:                      */
/* 0 : background  1 : frontground  */
/************************************/
function getDefault() {
    return {
        "activeMode" : 1,
        "LinkActiveMode" : [0, 1, 0, 0],
        "TextActiveMode" : [0, 1, 0, 0],
        "ImageActiveMode" : [0, 1, 0, 0],
        "searchEngines" : [0, 0, 0, 0]
    };
}

var _build_in_seach_engines = [{
            "name" : "google",
            //"favicon" : "./favicon/google.ico",
            "url" : "http://www.google.com/search?hl=en&q=%s"
        }, {
            "name" : "yahoo",
            //"favicon" : "./favicon/yahoo.ico",
            "url" : "http://search.yahoo.com/search?fr=crmas&p=%s"
        }];