var TH = new THK.TmplHelper({ url: '/js/tmpl/' });

tmpl.helper += ",log=function(){console.log.apply(console, arguments)}" +
    ",st='',stream=function(cb){var l=st.length;st=_s;cb( _s.slice(l));}";

$(document).ready(function(e) {
    // 分頁
    $( "#tabs" ).tabs(function(){ console.log(1); });
    
    // load tmpl files
    TH.import_tmpl(['simple_option'], function(r) { 
        var text_option = [
            {value: '0', title: '在前景新分頁中搜尋'},
            {value: '1', title: '在背景新分頁中搜尋'},
            {value: '2', title: '在目前分頁中搜尋'},
            {value: '3', title: '在當前頁面找尋文字並Highlight'},
            {value: '99', title: '無動作'}
        ];
        
        var link_option = [
            {value: '0', title: '在前景新分頁中打開連結'},
            {value: '1', title: '在背景新分頁中打開連結'},
            {value: '2', title: '在目前分頁中打開連結'},
            {value: '99', title: '無動作'}
        ];
        
        var image_option = [
            {value: '0', title: '在前景新分頁中打開連結'},
            {value: '1', title: '在背景新分頁中打開連結'},
            {value: '2', title: '在目前分頁中打開連結'},
            {value: '99', title: '無動作'}
        ];
        
        var engine_option = [
            {value: '0', title: 'Google'}
        ];
        
        // namespace
        var ns = [
            {},
            {
                prefix: 'link',
                legend: 'Gesture for draging Link',
                option: link_option
            },
            {
                prefix: 'text',
                legend: 'Gesture for draging Text',
                option: text_option,
                engine_title: 'Engine:',
                engine_option: engine_option
            },
            {
                prefix: 'image',
                legend: 'Gesture for draging Image',
                option: image_option
            }
        ];
        for(var i=1; i<=3; i++) {
            // normal opts
            var opts = {
                prefix: ns[i].prefix,
                legend: ns[i].legend,
                up: { title: 'UP: ', option: [] },
                down: { title: 'DOWN: ', option: [] },
                right: { title: 'RIGHT: ', option: [] },
                left: { title: 'LEFT: ', option: [] }
            };
            
            $.each(['up', 'down', 'right', 'left'], function(k, v) {
                opts[v].option = ns[i].option;
                
                if(ns[i].engine_title) {
                    opts[v]['engine_title'] = ns[i].engine_title;
                }
                
                if(ns[i].engine_option) {
                    opts[v]['engine_option'] = ns[i].engine_option;
                }
            });

            var content = tmpl('template-simple_option', opts);
            $('#tabs-'+i).html(content);
        }
        // options html finished
        
        // restore settings
        restoreSettings();
        
        // binging on change events
        bindEvents();
    });
    
    
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

function restoreSettings() {
    //console.log(localStorage);
    
    for(var key in localStorage) {
        $('#'+key).val(localStorage[key]);
    }
}

function bindEvents() {
    $('#link_up, #link_down, #link_right, #link_left'+
      '#text_up, #text_down, #text_right, #text_left'+
      '#image_up, #image_down, #image_right, #image_left'
      ).on('change', function(e) {
        //console.log(this);
        var $id = this.id;
        
        localStorage[$id] = $(this).val();
    });
}

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