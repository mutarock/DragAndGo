function getLocal() {
    var settings = localStorage.getItem("myDragSettings");
    if (!settings)
        return getDefault();
    return JSON.parse(settings);
}



function getDefault() {
    return {
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
}