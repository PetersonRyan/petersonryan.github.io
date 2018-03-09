window.map = [];

function initalize(index){
    //for(let index=0; index<30; index++){
    setTimeout(function(){
        var myOptions = {
            zoom: 20,
            center: new google.maps.LatLng(currentTrails[index].latitude, currentTrails[index].longitude),
            mapTypeId: 'terrain'
        }
        //console.log(index)
        //console.log(document.getElementById("map"+index));
        map[index] = new google.maps.Map(document.getElementById("map"+index), myOptions);
        new google.maps.Marker({
            position: new google.maps.LatLng(currentTrails[index].latitude, currentTrails[index].longitude),
            map: map[index]
        });
    }, 500);
    //}
}

setTimeout(function(){initalize();},5000);
