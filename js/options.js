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
            {value: '0', title: 'Google'},
            {value: '1', title: 'Yahoo'},
            {value: '2', title: 'Wiki'}
        ];
        
        // namespace
        var ns = [
            {},
            {
                legend: 'Gesture for draging Link',
                option: link_option
            },
            {
                legend: 'Gesture for draging Text',
                option: text_option,
                engine_title: 'Engine:',
                engine_option: engine_option
            },
            {
                legend: 'Gesture for draging Image',
                option: image_option
            }
        ];
        for(var i=1; i<=3; i++) {
            // normal opts
            var opts = {
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
            // .on('change', function(e) {
            //     //console.log( "change Link_selected_mode_1");
            //     console.log(e.target.value);
            //     save_Image_selected_mode(1, e.target.value);
            // });
        }
    });
    
    
    // localSettings, if not exist, it will return default value
    var localSettings = getLocal();
    restoreOption(localSettings);
    
});


function restoreOption(settings) {
    set_Link_selected_mode(localSettings);
    set_Text_selected_mode(localSettings);
    set_Image_selected_mode(localSettings);
}

function set_Link_selected_mode(settings) {
    var link_mode = settings.LinkActiveMode;
    //$().val = link_mode[];
}

function save_Link_selected_mode(index, value) {
    var settings = getLocal();
    settings.LinkActiveMode[index] = value;
    save_settings(settings);
}

function set_Text_selected_mode(settings) {
    var text_mode = settings.TextActiveMode;
    //$().val = text_mode[];
}

function save_Text_selected_mode(index, value) {
    var settings = getLocal();
    settings.TextActiveMode[index] = value;
    save_settings(settings);
}

function set_Image_selected_mode(settings) {
    var image_mode = settings.ImageActiveMode;
    //$().val = image_mode[];
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