$(document).ready(function () {

  // Get references to page elements
  var $exampleText = $("#example-text");
  var $exampleDescription = $("#example-description");
  var $submitBtn = $("#submit");
  var $exampleList = $("#example-list");
  var newUser = {
    userName: "",
    password: ""
  };

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveUser: function (user) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/users",
        data: JSON.stringify(user)
      });
    },
    getUser: function (id) {
      return $.ajax({
        url: "api/users/" + id,
        type: "GET"
      });
    },
    getExamples: function () {
      return $.ajax({
        url: "api/users",
        type: "GET"
      });
    },
    deleteExample: function (id) {
      return $.ajax({
        url: "api/users/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshExamples = function () {
    API.getExamples().then(function (data) {
      var $examples = data.map(function (example) {
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
  var handleFormSubmit = function (event) {
    event.preventDefault();

    var example = {
      text: $exampleText.val().trim(),
      description: $exampleDescription.val().trim()
    };

    if (!(example.text && example.description)) {
      alert("You must enter an example text and description!");
      return;
    }

    API.saveExample(example).then(function () {
      refreshExamples();
    });

    $exampleText.val("");
    $exampleDescription.val("");
  };


  // Initialize with your OAuth.io app public key
  OAuth.initialize('vjlnKXXv_pB-M71yxzZp5Z5hB-k');

  //LOGIN//
  //get the provider string from the button's class
  //the buttons have two classes and the first one is the provider class we will use to initiate the corresponding social login
  $(".login").on('click', function () {
    var provider = this.className.split(/\s+/)[0];
    logIn(provider);
  });


//given a socialProvider string log 
//prompt the social login popup
//then sign the user in using OAuth.io
function logIn(socialProvider) {
  var newUser ={};
  OAuth.clearCache();
  OAuth.popup(socialProvider,{cache:true}).then(result => {
      console.log((socialProvider + ": "), result.toJson());
      User.signin(result).done((user) => {
        console.log(user.data);
        newUser= {
          userName : user.data.name,
          userId :   user.data.id,
          provider : socialProvider
        }
        console.log(newUser);
        API.saveUser(newUser);
      }).fail((err => {
        // email/password incorrect.
        console.log(err);
      }));
    });
    // //go to menu.
    //API.saveUser
    //loadMenu();
  }
});
//redirect to the menu.
  function loadMenu() {
    window.location.href = "/menu";

  }
