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
                let userStreak = userDoc.data().streak;
                let userNumCorrect = userDoc.data().num_correct;
                let userNumWrong = userDoc.data().num_wrong;
                let userGems = userDoc.data().gems;

                //if the data fields are not empty, then write them in to the form.
                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userEmail != null) {
                    document.getElementById("emailInput").innerHTML = userEmail;
                }
                if (userScore != null) {
                    document.getElementById("userScore").innerHTML = userScore;
                }
                if (userStreak != null) {
                    document.getElementById("userStreak").innerHTML = userStreak;
                }
                if (userNumCorrect != null) {
                    document.getElementById("userNumCorrect").innerHTML = userNumCorrect;
                }
                if (userNumWrong != null) {
                    document.getElementById("userNumWrong").innerHTML = userNumWrong;
                }
                if (userGems != null) {
                    document.getElementById("userGems").innerHTML = userGems;
                }
                graphStats(userNumCorrect, userNumWrong);
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

function graphStats(numCorrect, numWrong) {
    const xValues = ["Correct", "Wrong"];
    const yValues = [numCorrect, numWrong];
    const barColors = ["green", "red"];
    
    new Chart("myChart", {
      type: "doughnut",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {}
    });   
}