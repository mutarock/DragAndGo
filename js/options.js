$(document).ready(function(e) {
    // 分頁
    $( "#tabs" ).tabs(function(){ console.log(1); });
    
    // $('#my_form input[type="submit"]').click( function(e) {
    //     e.preventDefault();
        
    //     $('#result').html( $('#my_form input[type="text"]').val() );
    // });

});



function save_settings(settings) {
    localStorage.setItem("myDragSettings", JSON.stringify(settings));
}

function load_default_settings() {

}

function load_settings() {

}