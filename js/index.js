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

$("#btn-signin").click(function() {

    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != ""){

      var result = firebase.auth().signInWithEmailAndPassword(email, password);

      result.catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        onsole.log(errorMessage) ;
        window.alert("Message: " + errorMessage);

      });

    }
    else{
        window.alert("Form is incomplete, please fill out all fields");
    }
});

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
            onsole.log(errorMessage) ;
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
      onsole.log(errorMessage) ;
      window.alert("Message: " + errorMessage);
    });
  }
  else{
    window.alert("Please enter your email");
  }



});


  $("#btn-logout").click(function() {

    firebase.auth().signOut();
});

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
        onsole.log(errorMessage);

        window.alert("Message: " + errorMessage);
      }
      else{
        window.location.href = "MainPage.html";  
      }
    });
  }
  else{
    windows.alert("Please fill out all fields");
  }

});

/*
$("#btn-save").click(function() {
    var applID = $("#applID").val();
    var applType = $("#applType").val();
    var kwh = $("#kwh").val();
    var houseNo = $("#houseNo").val();

    var databaseRef = firebase.database().ref().Child("Appliances");
    var  userID = firebase.auth().currentUser.uid;
    var usersRefer = databaseRef.child(userID);

    if(applID != "" && applType != "" && kwh != "" && houseNo != ""){

        var applData = {
        "applID": applID,
        "applType": applType,
        "kwh": kwh,
        "houseNo": houseNo,
        };

        usersRefer.set(applData, function(error){
        
        if(error){
            var errorCode = error.code;
            var errorMessage = error.message;
        
            console.log(errorCode);
            onsole.log(errorMessage);

            window.alert("Message: " + errorMessage);
        }
        else{
            window.alert("Your appliance has been added");  
            }
        });
    }
    else{
        windows.alert("Please fill out all fields");
    }
});
*/
