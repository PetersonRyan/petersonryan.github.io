$(document).ready(function(){
    $("#distance-dropdown").click(function(){$("#distance-dropdown").css("display","block")});

    $('body').click(function (event) {
        if(!$(event.target).closest('#distance-dropdown').length && !$(event.target).closest('#distance-dropdown-button').length) {
            $("#distance-dropdown").css("display","none")
        }
    });
});
