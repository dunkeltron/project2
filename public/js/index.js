$(document).ready(function () {


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


  // Initialize with your OAuth.io app public key

  //LOGIN//
  //get the provider string from the button's class
  //the buttons have two classes and the first one is the provider class we will use to initiate the corresponding social login
  $(".google").on('click', function () {
    var provider = this.className.split(/\s+/)[0];
    logIn(provider);
  });


//given a socialProvider string log 
//prompt the social login popup
//then sign the user in using OAuth.io
function logIn(socialProvider) {
  console.log(socialProvider)
  window.location.href="/auth/"+socialProvider;
  
  }
});
//redirect to the menu.
  function loadMenu() {
    window.location.href = "/menu";

  }
  