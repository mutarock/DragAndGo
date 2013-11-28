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
        "LinkActiveMode" : [0, 1, 0, 0],  // [UP, DOWN,RIGHT, LEFT]
        "TextActiveMode" : [0, 1, 0, 0],
        "ImageActiveMode" : [0, 1, 0, 0],
        "searchEngines" : [0, 0, 0, 0]
    };
}