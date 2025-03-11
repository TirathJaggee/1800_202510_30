//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                
		    // If the "user" variable is not null, then someone is logged in
            
            // User is signed in.
            // Do something for the user here.
            console.log($('#navbarPlaceholder').load('/html/navbar_loggedin.html'));
            console.log($('#footerPlaceholder').load('/html/footer_loggedin.html'));
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('/html/navbar_loggedout.html'));
            console.log($('#footerPlaceholder').load('/html/footer_loggedout.html'));
        }
    });
}
loadSkeleton(); //invoke the function