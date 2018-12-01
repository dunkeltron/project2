$(document).ready(function () {
  
  // Get references to page elements
  var $exampleText = $("#example-text");
  var $exampleDescription = $("#example-description");
  var $submitBtn = $("#submit");
  var $exampleList = $("#example-list");
  var newUser ={userName:"",password:""};

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
    getExamples: function () {
      return $.ajax({
        url: "api/user",
        type: "GET"
      });
    },
    deleteExample: function (id) {
      return $.ajax({
        url: "api/user/" + id,
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


  //LOGIN//

  //Log in with Facebook//
  $('#facebook-button').on('click', function () {
    OAuth.clearCache();
    console.log(User.getIdentity());
    // Initialize with your OAuth.io app public key
    OAuth.initialize('vjlnKXXv_pB-M71yxzZp5Z5hB-k');
    // Use popup for oauth
    OAuth.popup('facebook',{cache:true}).then(facebook => {
      console.log('facebook:', facebook);

      // Retrieves user data from OAuth provider by using #get() and
      // OAuth provider url
      // --need to fix permissions to get location data--//
      // facebook.get('/v2.5/me?fields=name,first_name,last_name,email,gender,location,locale,work,languages,birthday,relationship_status,hometown,picture').then(data => {
      //   console.log('self data:', data);
        
      // });
      // Prompts 'welcome' message with User's email on successful login
      // #me() is a convenient method to retrieve user data without requiring you
      // to know which OAuth provider url to call
      facebook.me().then(data => {
        console.log('me data:', data);
        alert('Facebook says your name is: ' + data.name + ".\nView browser 'Console Log' for more details");
        newUser = {
          userName: data.name,
          password: "test"
        };
        API.saveUser(newUser);
        loadMenu();
      })
      
    });
  });
  $('#google-button').on('click', function () {
    console.log("google clicked");
    OAuth.clearCache();
    // Initialize with your OAuth.io app public key
    OAuth.initialize('vjlnKXXv_pB-M71yxzZp5Z5hB-k')

    // // Use popup for oauth
    OAuth.popup('google_plus',{cache:true}).then(google => {
      console.log('google:', google);
      //   // Prompts 'welcome' message with User's email on successful login
      //   // #me() is a convenient method to retrieve user data without requiring you
      //   // to know which OAuth provider url to call
      google.me().then(data => {
        console.log('me data:', data);
        alert('Google says your email is:' + data.name + ".\nView browser 'Console Log' for more details");
        newUser = {
          userName: data.name,
          password: "test"
        };
        API.saveUser(newUser);
        loadMenu();
       });
    });
  });

  //Log in with Twitter
  $('#twitter-button').on('click', function () {
    console.log("twitter clicked");
    OAuth.clearCache();
    // Initialize with your OAuth.io app public key
    OAuth.initialize('vjlnKXXv_pB-M71yxzZp5Z5hB-k');

    // Use popup for oauth
    OAuth.popup('twitter',{cache:true}).then(twitter => {
      console.log('twitter:', twitter);
      // Prompts 'welcome' message with User's email on successful login
      // #me() is a convenient method to retrieve user data without requiring you
      // to know which OAuth provider url to call
      twitter.me().then(data => {
        console.log('me data:', data);
        alert('Twitter says your name is:' + data.name + ".\nView browser 'Console Log' for more details");
        newUser = {
          userName: data.name,
          password: "test"
        };
        //save the user to sql database in user table.
        API.saveUser(newUser);
        loadMenu();
      })
    });
  });

});

//sets the windows.location.href to /menu to navigate to the menu
function loadMenu() {
  window.location.href = "/menu";  

}


