window.favorites = [];

$(document).ready(function(){
    $('body').on('click', '.card-image', function(){
        closeFocusCard();
        $(this).parent().addClass('focus-card').addClass('z-depth-5').find('.card-image').addClass('z-depth-1');
        $('body').css('overflow', 'hidden');
        initalize(parseInt($('.focus-card').find('.mapStyle').prop('id').replace('map','')));
        setFocusCardContentHeight();
    });

    $(document).on('click', '.exit-card', function(){
        closeFocusCard();
    });

    $(document).keyup(function(event) {
        if (event.keyCode === 27) {
            closeFocusCard();
        }
    });

    $('body').click(function (event) {
        if(!$(event.target).closest('.focus-card').length ) {
            closeFocusCard();
        }
    });

    // $('.focus-card').on('click', function(e) {
    //     e.stopPropagation();
    // });
    //
    // $(document).on('click', function(){
    //     $("div .card").removeClass('focus-card').removeClass('z-depth-5').find('.card-image').removeClass('z-depth-1');
    //     $('body').css('overflow', 'scroll');
    // });


    window.onresize = setFocusCardContentHeight;

});

function openPopUp(item){
    closeFocusCard();
    $(item).addClass('focus-card').addClass('z-depth-5').find('.card-image').addClass('z-depth-1');
    $('body').css('overflow', 'hidden');
    initalize(parseInt($('.focus-card').find('.mapStyle').prop('id').replace('map','')));
    setFocusCardContentHeight();
}

function closeFocusCard(){
    $("div .card").removeClass('focus-card').removeClass('z-depth-5').find('.card-image').removeClass('z-depth-1');
    $('body').css('overflow', 'scroll');
    $('.card .card-content').css('height',  'initial');
}

function setFocusCardContentHeight(){
    if ($('.focus-card').length <= 0){
        $('.card .card-content').css('height', 'initial');
        return;
    }
    var totalHeight = $('.focus-card').css('height').replace('px','');
    var imageHeight = $('.focus-card .card-image').css('height').replace('px','');
    var buttonHeight = $('.focus-card .card-action').css('height').replace('px','');
    totalHeight -= imageHeight;
    totalHeight -= buttonHeight;
    console.log()
    $('.card .card-content').css('height', totalHeight + 'px');
}

window.mapIndex = 0;
function drawCards(cards){
    mapIndex = 0;
    $('#trail-card-row').html('');
    currentTrails = [];
    $.each(cards, function(k,v){
        setTimeout(function(){
            addCard(v, k);
            currentTrails[k] = v;
        }, 10);

    });
}

function addFavorite(item){

    $(item).toggleClass('fillStar');
    let str = $(item).attr('id');
    str = str.substring(3);
    console.log(str);
    favorites.push(trails[str]);
    // Store
    localStorage.setItem("favorites", favorites);
}

var currentTrails = [];

function addCard(content, k){
    //content = trails[0];
    var index = k;
    window.mapIndex++;
    if (!content.distance) console.log(content)
    content = $.extend(test_trail[0], content);

    $.each(content.weather.daily, function(k,v){
        content.weather.daily[k].iconName = icons[v.icon.replace(/-/g, '_')];
    });

    var cardTemplate = "<div class='col m6 s12'>\n" +
        "            <div class='card' onclick='openPopUp(this)'>\n" +
        "                <div class='card-image' style='background-image: url(" + content.imgLink + ")'>\n" +
        "                    <div class='stupid-card display-big'>\n" +
        "                        <span class='fa-layers fa-fw exit-card fa-2x'>\n" +
        "                            <i class='fas fa-circle' style='color:lightgrey'></i>\n" +
        "                            <i class='fa-inverse fas fa-times' data-fa-transform='shrink-6'></i>\n" +
        "                        </span>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "\n" +
        //"                <div class='full-card-content'>\n" +
        "                <div class='card-content'>\n" +
        "                    <span class='card-title black-text bold'>" + content.name + "</span>\n" +
        "                    <p class='display-big' id='contentSchedule'>" + content.schedule + "</p>\n" +
        "                    <div class='display-small secondary-info'>\n" +
        "                        <ul class='horizontal-bullet-list trail-properties'>\n" +
        "                            <li>" + content.difficulty + "</li>\n" +
        "                            <li>" + content.region + "</li>\n" +
        "                            <li>" + content.time + "</li>\n" +
        "                        </ul>\n" +
        "                        <ul class='horizontal-spaced-list trail-conditions'>\n" +
        "                            <li><svg aria-hidden='true' data-prefix='fas' data-icon='repeat' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='svg-inline--fa fa-repeat fa-w-16 fa-3x'><path fill='currentColor' d='M512 256c0 88.224-71.775 160-160 160H170.067l34.512 32.419c9.875 9.276 10.119 24.883.539 34.464l-10.775 10.775c-9.373 9.372-24.568 9.372-33.941 0l-92.686-92.686c-9.373-9.373-9.373-24.568 0-33.941l92.686-92.686c9.373-9.373 24.568-9.373 33.941 0l10.775 10.775c9.581 9.581 9.337 25.187-.539 34.464L170.067 352H352c52.935 0 96-43.065 96-96 0-13.958-2.996-27.228-8.376-39.204-4.061-9.039-2.284-19.626 4.723-26.633l12.183-12.183c11.499-11.499 30.965-8.526 38.312 5.982C505.814 205.624 512 230.103 512 256zM72.376 295.204C66.996 283.228 64 269.958 64 256c0-52.935 43.065-96 96-96h181.933l-34.512 32.419c-9.875 9.276-10.119 24.883-.539 34.464l10.775 10.775c9.373 9.372 24.568 9.372 33.941 0l92.686-92.686c9.373-9.373 9.373-24.568 0-33.941l-92.686-92.686c-9.373-9.373-24.568-9.373-33.941 0L306.882 29.12c-9.581 9.581-9.337 25.187.539 34.464L341.933 96H160C71.775 96 0 167.776 0 256c0 25.897 6.186 50.376 17.157 72.039 7.347 14.508 26.813 17.481 38.312 5.982l12.183-12.183c7.008-7.008 8.786-17.595 4.724-26.634z' class=''></path></svg>" + content.distance.toString().replace('km',' km') + "</li>\n" +
        "                            <li><i class='fas fa-long-arrow-alt-up' data-fa-transform='rotate-45'></i> " + content.elevation.toString().replace('meters','m').replace('kilometers','km') + "</li>\n" +
        "                            <li><i class='wi wi-wu-clear'></i>" + Math.round(content.currentTemperature) + "&deg;F</li>\n" +
        "                            <li id='fav" +index +"' onclick='addFavorite(this)'><i class='far fa-star'></i></li>"+
        "                        </ul>\n" +
        "                    </div>\n" +
        "\n" +
        "                    <div class='display-big'>\n" +
        "                        <div class='row'>\n" +
        "                            <p>DESCRIPTION</p>\n" +
        "                            <p class='description'>" + content.description + "</p>\n" +
        "                        </div>\n" +
        "                        <div class='mapStyle' id='map"+ index+ "' style='width:100%, height: 100%'>map</div>"  +
        "                        <div class='row weather'>\n" +
        "                            <div class='row'><p>WEATHER</p></div>\n" +
        "                            <div class='row center-align'>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi " + icons[content.dailyForecast[0].icon.replace(/-/g, "_")] + "'></i>\n" +
        "                                    <p class='condition'>" + laymans[icons[content.dailyForecast[0].icon.replace(/-/g, "_")].replace(/-/g, "_")] + " " + Math.round(content.dailyForecast[0].temperatureHigh) + "&deg;F</p>\n" +
        "                                    <p class='weather-date'>" + moment(content.dailyForecast[0].time * 1000).format("MMM DD") + "</p>\n" +
        "                                </div>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi " + icons[content.dailyForecast[1].icon.replace(/-/g, "_")] + "'></i>\n" +
        "                                    <p class='condition'>" + laymans[icons[content.dailyForecast[1].icon.replace(/-/g, "_")].replace(/-/g, "_")] + " " + Math.round(content.dailyForecast[1].temperatureHigh) + "&deg;F</p>\n" +
        "                                    <p class='weather-date'>" + moment(content.dailyForecast[1].time * 1000).format("MMM DD") + "</p>\n" +
        "                                </div>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi " + icons[content.dailyForecast[2].icon.replace(/-/g, "_")] + "'></i>\n" +
        "                                    <p class='condition'>" + laymans[icons[content.dailyForecast[2].icon.replace(/-/g, "_")].replace(/-/g, "_")] + " " + Math.round(content.dailyForecast[2].temperatureHigh) + "&deg;F</p>\n" +
        "                                    <p class='weather-date'>" + moment(content.dailyForecast[2].time * 1000).format("MMM DD") + "</p>\n" +
        "                                </div>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi " + icons[content.dailyForecast[3].icon.replace(/-/g, "_")] + "'></i>\n" +
        "                                    <p class='condition'>" + laymans[icons[content.dailyForecast[3].icon.replace(/-/g, "_")].replace(/-/g, "_")] + " " + Math.round(content.dailyForecast[3].temperatureHigh) + "&deg;F</p>\n" +
        "                                    <p class='weather-date'>" + moment(content.dailyForecast[3].time * 1000).format("MMM DD") + "</p>\n" +
        "                                </div>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi " + icons[content.dailyForecast[4].icon.replace(/-/g, "_")] + "'></i>\n" +
        "                                    <p class='condition'>" + laymans[icons[content.dailyForecast[4].icon.replace(/-/g, "_")].replace(/-/g, "_")] + " " + Math.round(content.dailyForecast[4].temperatureHigh) + "&deg;F</p>\n" +
        "                                    <p class='weather-date'>" + moment(content.dailyForecast[4].time * 1000).format("MMM DD") + "</p>\n" +
        "                                </div>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi " + icons[content.dailyForecast[5].icon.replace(/-/g, "_")]+ "'></i>\n" +
        "                                    <p class='condition'>" + laymans[icons[content.dailyForecast[5].icon.replace(/-/g, "_")].replace(/-/g, "_")] + " " + Math.round(content.dailyForecast[5].temperatureHigh) + "&deg;F</p>\n" +
        "                                    <p class='weather-date'>" + moment(content.dailyForecast[5].time * 1000).format("MMM DD") + "</p>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class='card-action display-big center-align'>\n" +
        "                    <a href='" + content.link + "'>More Information</a>\n" +
        "                </div>\n" +
        //"                </div>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>";
    $("#trail-card-row").append(cardTemplate);

}
