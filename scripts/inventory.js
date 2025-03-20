var currentUser;      //put this right after you start script tag before writing any functions.

function populateInventory() {
    let cardTemplate = document.getElementById("itemTemplate");
    //Check if user is signed in:
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
                let inventory = userDoc.data().inventory;
                let userGems = userDoc.data().gems;

                //if the data fields are not empty, then write them in to the form.
                if (inventory != null) {
                    inventory.forEach( (item) => {
                        oneItem = db.collection("items").doc(item);
                        oneItem.get().then(itemDoc => {
                            let card = cardTemplate.content.cloneNode(true);
                            card.querySelector(".card-name").textContent = itemDoc.data().name;
                            card.querySelector(".card-description").textContent = itemDoc.data().description;
                            card.querySelector(".card-price").textContent = "Gem$: " + itemDoc.data().price;
                            card.querySelector(".card-img-top").src = itemDoc.data().image;
                            card.querySelector(".card-img-top").alt = itemDoc.data().name;
                            document.getElementById("inventory").appendChild(card); 
                        });
                    })
                }
                if (userGems != null) {
                    document.getElementById("userGems").innerHTML = "Total Gem$: " + userGems;
                }
            })
            } else {
                // No user is signed in.
                console.log ("No user is signed in");
            }
    });
}
populateInventory();