let userScore = 0;
let userAnswers = [];
let availableQuestions = [];
let usedQuestions = [];
let rounds = 0;
let i = 0;

async function display() {
    const snapshot = await db.collection('questions').get();

    // console.log(snapshot.docs.map(doc => doc.data()));
    i = Math.floor(Math.random() * snapshot.docs.length);
    while(usedQuestions.includes(snapshot.docs[i].id)) {
        i = Math.floor(Math.random() * snapshot.docs.length);
    }


    // Remove existing event listeners before adding new ones
    const firstButton = document.getElementById("firstImageButton");
    const secondButton = document.getElementById("secondImageButton");
    
    // Clone and replace buttons to remove all event listeners
    const firstButtonClone = firstButton.cloneNode(true);
    const secondButtonClone = secondButton.cloneNode(true);
    firstButton.parentNode.replaceChild(firstButtonClone, firstButton);
    secondButton.parentNode.replaceChild(secondButtonClone, secondButton);



    let question = snapshot.docs[i].data();
    let questionId = snapshot.docs[i].id;
    usedQuestions.push(questionId);
    let correctAnswer = question.answer;
    let description = question.description;
    let image1 = question.image1;
    let image2 = question.image2;
    let firstImageDescription = question.image1_description;
    let secondImageDescription = question.image2_description;
    
    document.getElementById('description').textContent = description;
    document.getElementById('firstImage').src = image1;
    document.getElementById('secondImage').src = image2;
    document.getElementById("firstImageDescription").textContent = firstImageDescription;
    document.getElementById("secondImageDescription").textContent = secondImageDescription;
    document.getElementById("firstImageButton").value = 1;
    document.getElementById("secondImageButton").value = 2;

    document.getElementById("firstImageButton").addEventListener("click", () => {
        handleAnswer(1, correctAnswer);
    });
    document.getElementById("secondImageButton").addEventListener("click", () => {
        handleAnswer(2, correctAnswer);
    });
}

function handleAnswer(selectedValue, correctAnswer) {
    if(selectedValue == correctAnswer) {
        userScore++;
    }
    
    rounds++;
    
    if(rounds < 5) {
        display();
        console.log("User Score: ", userScore);
    } else {
        localStorage.setItem("userScoreLS", userScore);
        
        // Check if user is logged in
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const currentUser = db.collection("users").doc(user.uid);
                
                currentUser.get()
                    .then(userDoc => {
                        if (userDoc.exists) {
                            // Get the data fields of the user
                            let thisScore = userDoc.data().score;
                            let num_correct = userDoc.data().num_correct;
                            let num_wrong = userDoc.data().num_wrong;
                            
                            // Update user stats
                            return currentUser.update({
                                score: Number(thisScore) + Number(localStorage.getItem("userScoreLS")),
                                num_correct: Number(num_correct) + Number(localStorage.getItem("userScoreLS")),
                                num_wrong: Number(num_wrong) + (5 - Number(localStorage.getItem("userScoreLS"))),
                            });
                        } else {
                            console.log("No such user document!");
                        }
                    })
                    .then(() => {
                        console.log("User Score updated: ", userScore);
                        // Reset game state
                        userScore = 0;
                        rounds = 0;
                        window.location.href = '/results';
                    })
                    .catch(error => {
                        console.error("Error updating user document: ", error);
                    });
            } else {
                console.log("User is not logged in");
                // Reset game state even if user is not logged in
                userScore = 0;
                rounds = 0;
                window.location.href = '/results';
            }
        });
    }
}

function displayResults() {
    document.getElementById('description').textContent = `You got ${localStorage.getItem("userScoreLS")} out of 5 correct!`;
    localStorage.setItem("userScoreLS", 0);
}