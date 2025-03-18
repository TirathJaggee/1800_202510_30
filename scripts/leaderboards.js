let i = 0;
let users = {};

async function leads() {
    let snapshot = await db.collection('users').get();
    let linked = snapshot.docs.length;

    while (i < linked) {
        let user = snapshot.docs[i].data();
        let userName = user.name;
        let userScore = user.score;
        users[userName] = userScore;
        i++;
    }


    console.log(users);

}

