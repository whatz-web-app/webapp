 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyCMvSTOOhyp9TonpiZjUZzEM5r9caSh-rs",
  authDomain: "whatzwebapp.firebaseapp.com",
  databaseURL: "https://whatzwebapp.firebaseio.com",
  projectId: "whatzwebapp",
  storageBucket: "whatzwebapp.appspot.com",
  messagingSenderId: "1082125469653",
  appId: "1:1082125469653:web:8a79d653d22648e28edf5c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  

firebase.auth.Auth.Persistence.LOCAL; 

//--------------------------Signin button starts here--------------
$("#btn-signin").click(function() {

    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != ""){

      var result = firebase.auth().signInWithEmailAndPassword(email, password);

      result.catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage) ;
        window.alert("Message: " + errorMessage);

      });

    }
    else{
        window.alert("Form is incomplete, please fill out all fields");
    }
});
//--------------------------Signin button ends here-------------------


//--------------------------Signup button starts here-----------------
  $("#btn-signup").click(function() {

    var email = $("#email").val();
    var password = $("#password").val();
    var cPassword = $("#confirmPassword").val();

    if (email != "" && password != "" && cPassword != ""){

      if(password == cPassword){
        var result = firebase.auth().createUserWithEmailAndPassword(email, password);

        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
  
            console.log(errorCode);
            console.log(errorMessage) ;
            window.alert("Message: " + errorMessage);
  
        });
      }
      else{
        window.alert("Password do not match with Confirm Password");
      }
    }
    else{
        window.alert("Form is incomplete, please fill out all fields");
    }
});
//--------------------------Signup button ends here------------------


//--------------------------forgot password button starts here----------------
$("#btn-forgotPassword").click(function() {

  var auth = firebase.auth();
  var email = $("#email").val();

  if (email != ""){
    auth.sendPasswordResetEmail(email).then(function(){
    window.alert("We have sent a reset password link to your email, plesase check and verify.");
    })
    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
  
      console.log(errorCode);
      console.log(errorMessage) ;
      window.alert("Message: " + errorMessage);
    });
  }
  else{
    window.alert("Please enter your email");
  }
});
//--------------------------forgot password button ends here----------------

//------------Logout button ----------------------
  $("#btn-logout").click(function() {

    firebase.auth().signOut();
});
//------------Logout button ends here-------------

//------------------------------------------------------Account details button-----------------------------------------------------
$("#btn-details").click(function() {

  var fName = $("#firstName").val();
  var lName = $("#lastName").val();
  var idNumber = $("#idNumber").val();
  var gender = $("#gender").val();
  var phoneNumber = $("#phoneNumber").val();
  var address = $("#physicalAddress").val();
  var meterNumber = $("#meterNumber").val();


  var rootRef = firebase.database().ref().child("Users");
  var  userID = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID);

  if(fName != "" && lName != "" && idNumber != "" && gender != "" && phoneNumber != "" && address != "" && meterNumber != ""){

    var userData = {
      "firstName": fName,
      "lastName": lName,
      "idNumber": idNumber,
      "gender": gender,
      "phoneNumber": phoneNumber,
      "physicalAddress": address,
      "meterNumber": meterNumber,
    };

    usersRef.set(userData, function(error){
      
      if(error){
        var errorCode = error.code;
        var errorMessage = error.message;
    
        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message: " + errorMessage);
      }
      else{
        window.location.href = "MainPage.html";  
      }
    });
  }
  else{
    window.alert("The form is incomplete. Please fill out all fields");
  }
});
//--------------------------------------------------------Account details button-----------------------------------------------------------

//--------------------------Calculate button-----------------------------------
$("#btn-calculate-wattz").click(function(){

  var tokenNum = $("#token").val();
  var meterNumber = $("#meter-num").val();
/*
  if(tokenNum.length()!=13){
    document.getElementById("token").innerHTML = "Please enter a 13 digit token";
    return false;
  }

  if(meterNumber.length()!=11){
    document.getElementById("meter-num").innerHTML = "Please enter an 11 digit meter";
    return false;
  }*/


  var rootRef = firebase.database().ref().child("Token");
  var  userID = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID);

  if (tokenNum != "" && meterNumber != ""){
    var userData = {
      "token": tokenNum,
      "meter-num": meterNumber,
    };

    usersRef.set(userData, function(error){
      
      if(error){
        var errorCode = error.code;
        var errorMessage = error.message;
    
        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message: " + errorMessage);
      }
      else{
        window.alert("Your usage for this month is 250kwh");  
      }
    });

  }
  else{
    window.alert("The form is incomplete. Please fill out all fields");
  }
});
//--------------------------Calculate button ends here-----------------------------------

//---------------------------Schedule page---------------------------------
function switchView(view){
  $.get({
    url:view,
    cache:false,
  })
  .then(function(data){
    $("#container").html(data);
  });
  }
