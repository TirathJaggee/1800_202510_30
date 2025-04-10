// Load skeleton
function loadSkeleton() {
    // Check login
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                
            // If the "user" variable is not null, then someone is logged in
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
            .then(userDoc => {
                // Get user data
                let lastLogin = userDoc.data().last_login;
                let streak = userDoc.data().streak || 0; // Default to 0 if undefined
                
                // Check streak
                let now = new Date();
                let today = now.getDate();

                // Update streak
                if (lastLogin !== today) {
                    if(lastLogin == (today - 1)) {
                        // User logged in yesterday, increment streak
                        currentUser.update({
                            streak: streak + 1,
                            last_login: today // Update last login time
                        })
                        .then(() => {
                            console.log("Document successfully updated! 1");
                        })
                        .catch(error => {
                            console.error("Error updating document:", error);
                        });
                    }
                    else {
                        // User didn't log in yesterday, reset streak
                        currentUser.update({
                            streak: 0, // Reset to 0 since they're logging in today
                            last_login: today // Update last login time
                        })
                        .then(() => {
                            console.log("Document successfully updated! 2");
                        })
                        .catch(error => {
                            console.error("Error updating document:", error);
                        });
                    }
                } else {
                    // User already logged in today, no need to update streak
                    console.log("Already logged in today. Current streak: " + streak);
                }
            })
            .catch(error => {
                console.error("Error getting user document:", error);
            });

            // User is signed in.
            currentUser.get()
            .then(userDoc => {
                let gems = "Gem$: " + userDoc.data().gems;
                $('#gemsDisplay').text(gems);
                let streak = "Streak: &#128293; " + userDoc.data().streak;
                $('#streakDisplay').html(streak);
            })
            .catch(error => {
                console.error("Error getting user document:", error);
            });

            // Load navbar and footer
            $('#navbarPlaceholder').load('/html/navbar_loggedin.html');
            $('#footerPlaceholder').load('/html/footer_loggedin.html');
        } else {
            // No user is signed in.
            $('#navbarPlaceholder').load('/html/navbar_loggedout.html');
            $('#footerPlaceholder').load('/html/footer_loggedout.html');
        }
    });
}

// Load skeleton
loadSkeleton();