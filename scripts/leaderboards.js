let i = 0; // counter for the while loop
let users = {}; // object to store user data

async function leads() {
    let snapshot = await db.collection('users').get(); // get all the information from the database, documents in the users collection
    let linked = snapshot.docs.length; // get the number of documents in the users collection

    while (i < linked) {
        let user = snapshot.docs[i].data(); // get the user data
        let userName = user.name; // get the user name
        let userScore = user.score; // get the user score
        users[userName] = userScore; // store the user data in the object
        i++; // increment the counter
    }

    console.log(users);

}

