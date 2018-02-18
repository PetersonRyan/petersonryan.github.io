var fuse;
$(document).ready(function(){

    var options = {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "difficulty"
        ]
    };
    fuse = new Fuse(trails, options);
});

function filterDifficulty(difficulty){
    console.log("Data: "+ difficulty);
    
    var results = fuse.search(difficulty);
    if (results.length > 0) drawCards(results);
    return results;
    
};