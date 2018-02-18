$(document).ready(function(){
    
    $("#trail-search").keyup(function(event) {
        if (event.keyCode === 13) {
            search($(this).val());
        }
    });

    $('#search-button').click(function(){
        console.log($('#trail-search').val())
        search($('#trail-search').val());
    });
});


var options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "name",
        "region"
    ]
};


function search(string){
    var fuse = new Fuse(trails, options);
    var results = fuse.search(string);
    if (!string || string == "" || string == " "){
        results = trails;
    }

    if (string == "favorites" || string=="Favorites"){
        drawCards(window.favorites);
    }
    drawCards(results);
    return results;
}