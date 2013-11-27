$(document).ready(function(e) {
    // 分頁
    $( "#tabs" ).tabs(function(){ console.log(1); });
    
    // $('#my_form input[type="submit"]').click( function(e) {
    //     e.preventDefault();
        
    //     $('#result').html( $('#my_form input[type="text"]').val() );
    // });

    /* Set Link select listener */
    $("#Link_selected_mode_0").on('change', function(e) {
        //console.log("change Link_selected_mode_0");
        console.log(e.target.value);
        save_Link_selected_mode(0, e.target.value);
    });


    $("#Link_selected_mode_1").on('change', function(e) {
        //console.log( "change Link_selected_mode_1");
        console.log(e.target.value);
        save_Link_selected_mode(1, e.target.value);
    });

    /* Set Text select listener */
    $("#Text_selected_mode_0").on('change', function(e) {
        //console.log("change Link_selected_mode_0");
        console.log(e.target.value);
        save_Text_selected_mode(0, e.target.value);
    });


    $("#Text_selected_mode_1").on('change', function(e) {
        //console.log( "change Link_selected_mode_1");
        console.log(e.target.value);
        save_Text_selected_mode(1, e.target.value);
    });

    /* Set Image select listener */
    $("#Image_selected_mode_0").on('change', function(e) {
        //console.log("change Link_selected_mode_0");
        console.log(e.target.value);
        save_Image_selected_mode(0, e.target.value);
    });


    $("#Image_selected_mode_1").on('change', function(e) {
        //console.log( "change Link_selected_mode_1");
        console.log(e.target.value);
        save_Image_selected_mode(1, e.target.value);
    });

    var localSettings = getLocal();
    set_Link_selected_mode(localSettings);
    set_Text_selected_mode(localSettings);
    set_Image_selected_mode(localSettings);
});



function set_Link_selected_mode(settings) {
    $("#Link_selected_mode_0")
    .append('<option value="0">前景</option>')
    .append('<option value="1">背景</option>')
    .append('<option value="2">無動作</option>')
    .val(settings.LinkActiveMode[0]);

    $("#Link_selected_mode_1")
    .append('<option value="0">前景</option>')
    .append('<option value="1">背景</option>')
    .append('<option value="2">無動作</option>')
    .val(settings.LinkActiveMode[1]);
}

function save_Link_selected_mode(index, value) {
    var settings = getLocal();
    settings.LinkActiveMode[index] = value;
    save_settings(settings);
}

function set_Text_selected_mode(settings) {
    $("#Text_selected_mode_0")
    .append('<option value="0">前景</option>')
    .append('<option value="1">背景</option>')
    .append('<option value="2">無動作</option>')
    .val(settings.TextActiveMode[0]);

    $("#Text_selected_mode_1")
    .append('<option value="0">前景</option>')
    .append('<option value="1">背景</option>')
    .append('<option value="2">無動作</option>')
    .val(settings.TextActiveMode[1]);
}

function save_Text_selected_mode(index, value) {
    var settings = getLocal();
    settings.TextActiveMode[index] = value;
    save_settings(settings);
}

function set_Image_selected_mode(settings) {
   $("#Image_selected_mode_0")
    .append('<option value="0">前景</option>')
    .append('<option value="1">背景</option>')
    .append('<option value="2">無動作</option>')
    .val(settings.ImageActiveMode[0]);

    $("#Image_selected_mode_1")
    .append('<option value="0">前景</option>')
    .append('<option value="1">背景</option>')
    .append('<option value="2">無動作</option>')
    .val(settings.ImageActiveMode[1]);
}

function save_Image_selected_mode(index, value) {
    var settings = getLocal();
    settings.ImageActiveMode[index] = value;
    save_settings(settings);
}



function save_settings(settings) {
    localStorage.setItem("myDragSettings", JSON.stringify(settings));
}

function load_default_settings() {

}

function load_settings() {

}