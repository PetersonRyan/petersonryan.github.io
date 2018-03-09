$(document).ready(function(){
    
    if ("geolocation" in navigator) {
        console.log("Available");

        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
            window.pos = { 'lat' :  position.coords.latitude, 'long' :  position.coords.longitude};
        });

    } else {
        /* geolocation IS NOT available */
        console.log("Its not available!");
    }
});
