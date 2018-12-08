/***************************************** 
                getEvents.js
                Bootcamp Project 2
***************************************** */
var ajaxData;
var userGeoHash = "";//= "c23nb62qp";


/* Get geoHash for API Query*******/
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    //console.log(position.coords.latitude, position.coords.longitude);
    //console.log(position.coords);
    console.log(encodePosition(position.coords.latitude, position.coords.longitude, 9));
}

function encodePosition(lat, long, precision) {
    userGeoHash = encodeGeohash(lat, long, precision);
    return userGeoHash;
}

function buildQueryURL() {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events?"
    //apikey=KQyQzmlwAhs9fPRYw9SrkkLBYHhQQcH8
    //&latlong=47.5951668,-122.3317337
    //&radius=1
    //&unit=km
    //&startDateTime=2018-12-02T00:01:00Z
    //&endDateTime=2018-12-02T23:59:00Z
    //&countryCode=US
    //&classificationName=music
    //&geoPoint=c23nb62qp-->
    //var queryURL = "https://www.googleapis.com/youtube/v3/search?";
    var queryParams = {
        "apikey": "KQyQzmlwAhs9fPRYw9SrkkLBYHhQQcH8"//,
       // "classificationName": "music"
    };
    var currentDate = new Date();

    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();

    var dateString = year + "-" + (month + 1) + "-" + date;
    var a = new Date();
    var startTime = a.toJSON().replace(/\..+/, '');
    var timezero = ("T00:00:00Z")
    var timemax = ("T23:59:59Z")
    var indexT = startTime.indexOf("T")
    var eventTime = startTime.substring(0, indexT).concat(timezero);
    var eventEnd = startTime.substring(0, indexT).concat(timemax);

    //console.log(startTime); //2018-12-07T18:58:33
    //console.log(eventTime);
    //console.log(eventEnd);
    //console.log(dateString); //2018-12-7
    //console.log(userGeoHash);

    queryParams.geoPoint = userGeoHash; //"c23nb62qp";
    queryParams.startDateTime = eventTime// ("2018-12-07T00:01:00Z")
    queryParams.endDateTime = eventEnd//("2018-12-07T23:59:00Z")
    queryParams.radius = "4"
    queryParams.unit = "km"
    // Search string queryParams.q = $("#query").val().trim();

    // Logging the URL so we have access to it for troubleshooting
    //console.log("---------------\nURL: " + queryURL + "\n---------------");
    //console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
}

/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} TMData - object containing TicketMaster API data
 */

// TODO: Show Object Results
function getEvent(TMData) {
    ajaxData = TMData
    // Log the TMData to console, where it will show up as an object
    //console.log(TMData);
    //console.log("------------------------------------");

    //var numvideos = TMData.pageInfo.resultsPerPage;
    $.each(TMData._embedded.events, function (i, item) {
        //console.log(item);
        eventDisplay(item.id, item.name, item._embedded.venues[0].name, i);
    })


}


/***************************************** 
                GEOHASH
***************************************** */
getLocation();

/***************************************** 
                API
***************************************** */
// Build the query URL for the ajax request to the TicketMaster API
// Setting a wait for the location code to run before API get
$(function() {
setTimeout(apiWait, 100);

function apiWait(){
var queryURL = buildQueryURL();
//}
// Make the AJAX request to the API - GETs the JSON data at the queryURL.

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function (result) {
    //console.log(result);
    getEvent(result);
}).fail(function (err) {
    throw err;
})
//$(".add-event-button").on("click", function (event) {
  //     // This line allows us to take advantage of the HTML "submit" property
  //     // This way we can hit enter on the keyboard and it registers the search
  //     // (in addition to clicks). Prevents the page from reloading on form submit.
  //    event.preventDefault();
  //    //console.log("clicked");
  //    //console.log(this.data('eventData'));
  //    //POST
  //  /*  $.ajax({
  //     url: "/api/events/",
  //     method: "POST",
  //     data: event.obj
  //     // Empty the region associated with the videos
  //     //clear();
     
  //    */
    
  //     //TODO: SEND TO PICTURE PAGE
  //     //.then()
}
});

function encodeGeohash(latitude, longitude, precision) {
    var BITS = [16, 8, 4, 2, 1];
    var BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
    var is_even = 1;
    var i = 0;
    var lat = [];
    var lon = [];
    var bit = 0;
    var ch = 0;
    geohash = "";

    lat[0] = -90.0;
    lat[1] = 90.0;
    lon[0] = -180.0;
    lon[1] = 180.0;

    while (geohash.length < precision) {
        if (is_even) {
            mid = (lon[0] + lon[1]) / 2;
            if (longitude > mid) {
                ch |= BITS[bit];
                lon[0] = mid;
            } else
                lon[1] = mid;
        } else {
            mid = (lat[0] + lat[1]) / 2;
            if (latitude > mid) {
                ch |= BITS[bit];
                lat[0] = mid;
            } else
                lat[1] = mid;
        }

        is_even = !is_even;
        if (bit < 4)
            bit++;
        else {
            geohash += BASE32[ch];
            bit = 0;
            ch = 0;
        }
    }
    return geohash;
}

function eventDisplay(eventId, artist, venue, index) {

    //declare variables and asssign empty html elements to them
    var listDiv, nameDiv, addDiv, span, h3, iTag;
    listDiv = $("<div>");
    nameDiv = $("<div>");
    addDiv = $("<div>");
    span = $("<span>");
    iTag = $("<i>");
    h3 = $("<h3>");
    h4 = $("<h4>");
  
    //populate the elements with data
    iTag.addClass("fa");
    iTag.addClass("fa-plus-square");
    iTag.addClass("add-event-button");
    iTag.data("event", {
        artistName: artist,
        venueName: venue,
        event: eventId
    });
    span.css({
        "font-size": "40px"
    });
    addDiv.addClass("add-event");
    addDiv.attr("id", eventId);
    nameDiv.addClass("event-name");
    listDiv.addClass("events-list");
    h3.text(artist);
    h4.text(" | " + venue)
    //construct the event thing to display
    span.append(iTag);
    addDiv.append(span);
    nameDiv.append(addDiv, h3, h4);
    listDiv.append(nameDiv);
    $("#events-nav").append(listDiv);
}
