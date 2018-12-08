/* <div class="events-list">
        <div class="event-name">
            <div class="add-event">
                <span style="font-size: 40px;">
                    <i class="fa fa-plus-square"></i>
                </span>
            </div>
            <h3>Kygo | SoDo Box Office</h3>
        </div>
    </div> */
function eventDisplay(eventId, artist, venue) {

    //declare variables and asssign empty html elemenmts to them
    var listDiv, nameDiv, addDiv, span, h3, iTag;
    listDiv = $("<div>");
    nameDiv = $("<div>");
    addDiv = $("<div>");
    span = $("<span>");
    iTag = $("<i>");
    h3 = $("<h3>");

    //populate the elements with data
    iTag.addClass("fa");
    iTag.addClass("fa-plus-square");
    span.css({
        "font-size": "40px"
    });
    addDiv.addClass("add-event");
    addDiv.addId(eventId);
    nameDiv.addClass("event-name");
    listDiv.addClass("events-list");
    h3.innerHTML(artist+ " | "+venue);
    //construct the event thing to display
    span.append(iTag);
    addDiv.append(span);
    nameDiv.append(span, h3);
    listDiv.append(nameDiv);
    $("#events-nav"), append(listDiv);
}