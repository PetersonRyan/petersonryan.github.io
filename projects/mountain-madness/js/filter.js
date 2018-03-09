window.nearBy = [];
window.elevationBy = [];
window.timeBy = [];
window.lengthBy = [];

function filterDistance(minDistance, maxDistance){
    var results=[];
    $.each (trails, function(index, object){
        if (parseFloat(object.distance.replace("km","").replace('up to ',''))>=minDistance && parseFloat(object.distance.replace("km","").replace('up to ',''))<=maxDistance){
            results.push(object);
        }
    });
    drawCards(results);
}

function filterNearBy(range, arr){
    for (let i=0; i<arr.length ; i++){
        let checkPoint = { 'lat': arr[i].latitude, 'long': arr[i].longitude};
        if (arePointsNear(checkPoint, window.pos, range)){
            nearBy.push(arr[i]);
        }
    }
    drawCards(nearBy);
}

function filterByElevation(level, arr){
    for (let i=0; i<arr.length ; i++){
        let meters = arr[i].elevation;
        meters = meters.replace( /[^\d.]/g, '' );
        if (meters != ''){
            if (meters < level) elevationBy.push(arr[i]);
        }else{
            elevationBy.push(arr[i]);
        }
    }
    drawCards(elevationBy);
}

function filterByTime(timeLevel, arr){
    for (let i=0; i<arr.length ; i++){
        let time = arr[i].time;
        time = time.replace( /[^\d.]/g, '' );
        if (time < timeLevel) { 
            timeBy.push(arr[i]);
        }
    }
    drawCards(timeBy);
}

function filterByLength(lenghtLevel, arr){
    for (let i=0; i<arr.length ; i++){
        let length = arr[i].distance;
        length = length.replace( /[^\d.]/g, '' );
        if (length < lenghtLevel) { 
            lengthBy.push(arr[i]);
        }
    }
    drawCards(lengthBy);
}

function getMaxMinDistance(trailss){
    if (!trailss) trailss = trails;
    $.each(trailss, function(k,v){
        var distance = parseFloat(v.distance.replace('km','').replace('up to ',''));
        if (distance > parseFloat(distanceMax)) distanceMax = distance;
        if (distance < parseFloat(distanceMin)) distanceMin = distance;
        console.log(distance + " " + distanceMax)
    });
    return { min: distanceMin, max: distanceMax };
}

//helper functions
function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.long - checkPoint.long) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}

var distanceMin = 9000;
var distanceMax = 0;