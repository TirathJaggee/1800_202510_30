function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}

function checkLogin(){
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    // If the "user" variable is not null, then someone is logged in
        
        // User is signed in.
        console.log('User is currently logged in.');
    } else {
        // No user is signed in.
        window.location.replace("/login");
    }
  });
}