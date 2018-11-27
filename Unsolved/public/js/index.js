

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// //SIGN UP FORM
$(function() {

  $(".input input").focus(function() {

     $(this).parent(".input").each(function() {
        $("label", this).css({
           "line-height": "18px",
           "font-size": "18px",
           "font-weight": "100",
           "top": "0px"
        })
        $(".spin", this).css({
           "width": "100%"
        })
     });
  }).blur(function() {
     $(".spin").css({
        "width": "0px"
     })
     if ($(this).val() == "") {
        $(this).parent(".input").each(function() {
           $("label", this).css({
              "line-height": "60px",
              "font-size": "24px",
              "font-weight": "300",
              "top": "10px"
           })
        });

     }
  });

  $(".button").click(function(e) {
     var pX = e.pageX,
        pY = e.pageY,
        oX = parseInt($(this).offset().left),
        oY = parseInt($(this).offset().top);

     $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
     $('.x-' + oX + '.y-' + oY + '').animate({
        "width": "500px",
        "height": "500px",
        "top": "-250px",
        "left": "-250px",

     }, 600);
     $("button", this).addClass('active');
  })

  $(".alt-2").click(function() {
     if (!$(this).hasClass('material-button')) {
        $(".shape").css({
           "width": "100%",
           "height": "100%",
           "transform": "rotate(0deg)"
        })

        setTimeout(function() {
           $(".overbox").css({
              "overflow": "initial"
           })
        }, 600)

        $(this).animate({
           "width": "140px",
           "height": "140px"
        }, 500, function() {
           $(".box").removeClass("back");

           $(this).removeClass('active')
        });

        $(".overbox .title").fadeOut(300);
        $(".overbox .input").fadeOut(300);
        $(".overbox .button").fadeOut(300);

        $(".alt-2").addClass('material-buton');
     }

  })

  $(".material-button").click(function() {

     if ($(this).hasClass('material-button')) {
        setTimeout(function() {
           $(".overbox").css({
              "overflow": "hidden"
           })
           $(".box").addClass("back");
        }, 200)
        $(this).addClass('active').animate({
           "width": "700px",
           "height": "700px"
        });

        setTimeout(function() {
           $(".shape").css({
              "width": "50%",
              "height": "50%",
              "transform": "rotate(45deg)"
           })

           $(".overbox .title").fadeIn(300);
           $(".overbox .input").fadeIn(300);
           $(".overbox .button").fadeIn(300);
        }, 700)

        $(this).removeClass('material-button');

     }

     if ($(".alt-2").hasClass('material-buton')) {
        $(".alt-2").removeClass('material-buton');
        $(".alt-2").addClass('material-button');
     }

  });

});
