// document.getElementById("secondImage").addEventListener("click", sayHello());
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}

// function sayHello() {
//     //do something
// }
//sayHello();    //invoke function