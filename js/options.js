/**
* ==  options.js ==
*
*   @Author: 
*       mutarock, mutarock@gmail.com
**/

var TH = new THK.TmplHelper({ url: '/js/tmpl/' });

tmpl.helper += ",log=function(){console.log.apply(console, arguments)}" +
    ",st='',stream=function(cb){var l=st.length;st=_s;cb( _s.slice(l));}";

$(document).ready(function(e) {
    
    // 分頁
    $( "#tabs" ).tabs(function(){ console.log(1); });
    
    // legend text in each tab
    $('#tabs-1' +' > fieldset > legend').text("Gesture for draging Link");
    $('#tabs-2' +' > fieldset > legend').text("Gesture for draging Text");
    $('#tabs-3' +' > fieldset > legend').text("Gesture for draging Image");
    $('#tabs-4' +' > fieldset > legend').text("About the extension");

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
            {value: '4', title: '儲存圖片'},
            {value: '99', title: '無動作'}
        ];
        
        var engine_option = [
            {value: '0', title: 'Google'},
            {value: '1', title: 'Yahoo'},
            {value: '2', title: 'Wiki'}
        ];
        
        // namespace
        var ns = [
            {},
            {
                prefix: 'link',
                option: link_option
            },
            {
                prefix: 'text',
                option: text_option,
                engine_title: 'Engine:',
                engine_option: engine_option
            },
            {
                prefix: 'image',
                option: image_option
            }
        ];
        for(var i=1; i<=3; i++) {
            // normal opts
            var opts = {
                prefix: ns[i].prefix,
                header: 'Setting each gesture action :',
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
            $('#tabs-'+i +' > fieldset > div:eq(1)').html(content);
            //$('#tabs-'+i).html(content);
        }
        // options html finished
        
        // restore settings
        restoreSettings();
        
        // binging on change events
        bindEvents();
    });
    

    TH.import_tmpl(['radio_option'], function(r) { 
        var radio_option = [
            {value: '0', title: '上下左右'},
            {value: '1', title: '上下'},
            {value: '2', title: '無動作'},
        ]

        var ns = [
            {},
            {
                prefix: 'link',
                option: radio_option
            },
            {
                prefix: 'text',
                option: radio_option
            },
            {
                prefix: 'image',
                option: radio_option
            }
        ];
        for(var j=1; j<=3; j++) {
            // normal opts
            var opts = {
                prefix: ns[j].prefix,
                header: ' Setting gesture direction mode :',
                fourDir: { title: 'FOUR WAY: ', option: [] },
                twoDir: { title: 'TWO WAY: ', option: [] },
                noDir: { title: 'NO WAY: ', option: [] },
            };

            $.each(['fourDir', 'twoDir', 'noDir'], function(k, v) {
                opts[v].option = ns[j].option;
            });

            var content = tmpl('template-radio_option', opts);
            $('#tabs-'+j +' > fieldset > div:eq(0)').html(content);
            //$('#tabs-'+i).html(content);
        }
        // radio html finished
        
        // restore settings
        restoreRadioMode();
        
        // binging on change events
        bindRadioEvents();
    });
    
    loadAboutMe();

});

function restoreSettings() {
    //console.log(localStorage);
    
    for(var key in localStorage) {
        $('#'+key).val(localStorage[key]);
        //console.log('#'+key);
    }
}

function bindEvents() {
    $('#link_up, #link_down, #link_right, #link_left,'+
      '#text_up, #text_down, #text_right, #text_left,'+
      '#image_up, #image_down, #image_right, #image_left,' + 
      '#text_up_engine, #text_down_engine, #text_right_engine, #text_left_engine'
      ).on('change', function(e) {
        //console.log(this);
        var $id = this.id;
        
        localStorage[$id] = $(this).val();
    });
}

function restoreRadioMode() {
    //console.log(localStorage);

    var mode = localStorage['link_gesture_mode'];
    //console.log(mode);
    $('input[name=link_gesture_mode]').get(mode).checked = true;
    if(mode != 0) {
        $('#link_right, #link_left').attr('disabled', true);
        
        if(mode == 2)
            $('#link_up, #link_down').attr('disabled', true);
    }


    mode = localStorage['text_gesture_mode'];
    //console.log(mode);
    $('input[name=text_gesture_mode]').get(mode).checked = true;
    if(mode != 0) {
        $('#text_right, #text_left').attr('disabled', 'disabled');
        $('#text_right_engine, #text_left_engine').attr('disabled', true);
        
        if(mode == 2) {
            $('#text_up, #text_down').attr('disabled', 'disabled');
            $('#text_up_engine, #text_down_engine').attr('disabled', true);
        }
    }


    mode = localStorage['image_gesture_mode'];
    //console.log(mode);
    $('input[name=image_gesture_mode]').get(mode).checked = true;
    if(mode != 0) {
        $('#image_right, #image_left').attr('disabled', true);
        
        if(mode == 2)
            $('#image_up, #image_down').attr('disabled', true);
    }

}

function bindRadioEvents() {

    $('input[name=link_gesture_mode],' + 
      'input[name=text_gesture_mode],' +
      'input[name=image_gesture_mode]'
      ).on('change', function(e) {

        // console.log(this);
        // console.log(this.id.substr(0, 4));
        // console.log($(this).val());

        //var $id = this.id;
        var $name = this.name;
        localStorage[$name] = $(this).val();

        // change select status to enable or disable
        changeSelectStatus(this.id.substr(0, 4), $(this).val());

    });
}

function changeSelectStatus(selectName, selectStatus) {

    var prefix;
    if (selectName == "link") {
        prefix = "link";
    } else if(selectName == "text") {
        prefix = "text";
    } else {
        prefix = "image";
    }


    if(selectStatus == 0) {
        $('#' + prefix + '_right').attr('disabled', false);
        $('#' + prefix + '_left').attr('disabled', false);

        $('#' + prefix + '_up').attr('disabled', false);
        $('#' + prefix + '_down').attr('disabled', false);

    } else if(selectStatus == 1) {
        $('#' + prefix + '_right').attr('disabled', true);
        $('#' + prefix + '_left').attr('disabled', true);

        $('#' + prefix + '_up').attr('disabled', false);
        $('#' + prefix + '_down').attr('disabled', false);

    } else {
        $('#' + prefix + '_right').attr('disabled', true);
        $('#' + prefix + '_left').attr('disabled', true);

        $('#' + prefix + '_up').attr('disabled', true);
        $('#' + prefix + '_down').attr('disabled', true);

    }

}

function loadAboutMe() {

    /* Load About.md into HTML */
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var src = xhr.responseText;
            
            var converter = new Showdown.converter();
            var cvt = converter.makeHtml(src);
            $('#tabs-4 > fieldset > div:eq(0)').append(cvt);
            $('#tabs-4 > fieldset > div:eq(0) a').each(function(i,v){
                $(v).attr('target', '_blank');
            });
        }
    }
    xhr.open("GET", "/README.md", false);
    xhr.send();
}