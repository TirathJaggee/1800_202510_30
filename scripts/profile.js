var currentUser;      //put this right after you start script tag before writing any functions.

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

        //go to the correct user document by referencing to the user uid
        currentUser = db.collection("users").doc(user.uid)
        localStorage.setItem("currentUserLS", currentUser);
        //get the document for current user.
        currentUser.get()
            .then(userDoc => {
                //get the data fields of the user
                let userName = userDoc.data().name;
                let userEmail = userDoc.data().email;
                let userScore = userDoc.data().score;
                let userNumCorrect = userDoc.data().num_correct;
                let userNumWrong = userDoc.data().num_wrong;
                let userGems = userDoc.data().gems;

                //if the data fields are not empty, then write them in to the form.
                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userEmail != null) {
                    document.getElementById("emailInput").value = userEmail;
                }
                if (userScore != null) {
                    document.getElementById("userScore").value = userScore;
                }
                if (userNumCorrect != null) {
                    document.getElementById("userNumCorrect").value = userNumCorrect;
                }
                if (userNumWrong != null) {
                    document.getElementById("userNumWrong").value = userNumWrong;
                }
                if (userGems != null) {
                    document.getElementById("userGems").value = userGems;
                }
            })
            } else {
                // No user is signed in.
                console.log ("No user is signed in");
            }
    });
}

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {

    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    
    currentUser.update({
        name: userName,
    })
    .then(() => {
        console.log("Document successfully updated!");
    })

    document.getElementById('personalInfoFields').disabled = true;
}

populateUserInfo();