let userScore = 0;
let userAnswers = [];
let availableQuestions = [];
let usedQuestions = [];
let rounds = 0;
let i = 0;
let clicked = false;
let correctImage = "/images/correct.png";
let wrongImage = "/images/wrong.png";
let progressBar = document.getElementById("progressBar");
let numOfQuestions = document.getElementById("numOfQuestions");

// Display a question
async function display() {
    const snapshot = await db.collection('questions').get();
    // Update progress bar and question number
    if(rounds == 0) {
        progressBar.style.width = "0%";
        numOfQuestions.textContent = "Question 1 of 5";
    } else if(rounds == 1) {
        progressBar.style.width = "20%";
        numOfQuestions.textContent = "Question 2 of 5";
    } else if(rounds == 2) {
        progressBar.style.width = "40%";
        numOfQuestions.textContent = "Question 3 of 5";
    } else if(rounds == 3) {
        progressBar.style.width = "60%";
        numOfQuestions.textContent = "Question 4 of 5";
    } else if(rounds == 4) {
        progressBar.style.width = "80%";
        numOfQuestions.textContent = "Question 5 of 5";
    }

    // Select a random question
    i = Math.floor(Math.random() * snapshot.docs.length);
    while(usedQuestions.includes(snapshot.docs[i].id)) {
        i = Math.floor(Math.random() * snapshot.docs.length);
    }


    // Remove existing event listeners before adding new ones
    const firstButton = document.getElementById("firstImageButton");
    const secondButton = document.getElementById("secondImageButton");
    firstButton.removeEventListener("click", handleAnswer);
    secondButton.removeEventListener("click", handleAnswer);

    
    // Clone and replace buttons to remove all event listeners
    const firstButtonClone = firstButton.cloneNode(true);
    const secondButtonClone = secondButton.cloneNode(true);
    firstButton.parentNode.replaceChild(firstButtonClone, firstButton);
    secondButton.parentNode.replaceChild(secondButtonClone, secondButton);



    let question = snapshot.docs[i].data(); // Get the question data
    let questionId = snapshot.docs[i].id; // Get the question ID
    usedQuestions.push(questionId); // Add the question ID to the usedQuestions array
    let correctAnswer = question.answer; // Get the correct answer
    let description = question.description; // Get the question description
    let image1 = question.image1; // Get the first image
    let image2 = question.image2; // Get the second image
    let firstImageDescription = question.image1_description; // Get the first image description
    let secondImageDescription = question.image2_description; // Get the second image description
    
    document.getElementById('description').textContent = description; // Set the question description
    document.getElementById('firstImage').src = image1; // Set the first image
    document.getElementById('secondImage').src = image2; // Set the second image
    document.getElementById("firstImageDescription").textContent = firstImageDescription; // Set the first image description
    document.getElementById("secondImageDescription").textContent = secondImageDescription; // Set the second image description
    document.getElementById("firstImageButton").value = 1; // Set the first image button value
    document.getElementById("secondImageButton").value = 2; // Set the second image button value

    // Add event listeners for the first button
    document.getElementById("firstImageButton").addEventListener("click", () => {
        if (!clicked) {
            clicked = true;
            document.getElementById("firstImageButton").disabled = true;
            document.getElementById("secondImageButton").disabled = true;
    
            document.getElementById('firstImage').src = correctAnswer == 1 ? correctImage : wrongImage;
            document.getElementById("firstImageButton").classList.add("animateCorrect");
            setTimeout(() => document.getElementById("firstImageButton").classList.remove("animateCorrect"), 800);
    
            handleAnswer(1, correctAnswer);
        }
    });
    
    // Add event listeners for the second button
    document.getElementById("secondImageButton").addEventListener("click", () => {
        if (!clicked) {
            clicked = true;
            document.getElementById("firstImageButton").disabled = true;
            document.getElementById("secondImageButton").disabled = true;
    
            document.getElementById('secondImage').src = correctAnswer == 2 ? correctImage : wrongImage;
            document.getElementById("secondImageButton").classList.add("animateWrong");
            setTimeout(() => document.getElementById("secondImageButton").classList.remove("animateWrong"), 800);
    
            handleAnswer(2, correctAnswer);
        }
    });
    
}

// Handle the answer
function handleAnswer(selectedValue, correctAnswer) {
    // Check if the answer is correct
    if(selectedValue == correctAnswer) {
        userScore++;
        clicked = false;
        document.getElementById("firstImageButton").disabled = false;
        document.getElementById("secondImageButton").disabled = false;
    } else {
        clicked = false;
        document.getElementById("firstImageButton").disabled = false;
        document.getElementById("secondImageButton").disabled = false;
    }
    
    // Increment the rounds
    rounds++;
    
    // Check if there are more rounds
    if(rounds < 5) {
        // Display the next round
        display();
    } else {
        // Save the user score
        localStorage.setItem("userScoreLS", userScore);
        
        // Check if user is logged in
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const currentUser = db.collection("users").doc(user.uid);
                
                // Get the user data
                currentUser.get()
                    .then(userDoc => {
                        if (userDoc.exists) {
                            // Get the data fields of the user
                            let thisScore = userDoc.data().score;
                            let num_correct = userDoc.data().num_correct;
                            let num_wrong = userDoc.data().num_wrong;
                            let streak = userDoc.data().streak;
                            
                            // Update user stats
                            if(streak >= 5 && streak < 10) {
                                return currentUser.update({
                                    score: Number(thisScore) + (Number(localStorage.getItem("userScoreLS")) * 1.5),
                                    num_correct: Number(num_correct) + Number(localStorage.getItem("userScoreLS")),
                                    num_wrong: Number(num_wrong) + (5 - Number(localStorage.getItem("userScoreLS"))),
                                });
                            } else if(streak >= 10) {
                                return currentUser.update({
                                    score: Number(thisScore) + (Number(localStorage.getItem("userScoreLS")) * 2),
                                    num_correct: Number(num_correct) + Number(localStorage.getItem("userScoreLS")),
                                    num_wrong: Number(num_wrong) + (5 - Number(localStorage.getItem("userScoreLS"))),
                                });
                            } else {
                                return currentUser.update({
                                    score: Number(thisScore) + Number(localStorage.getItem("userScoreLS")),
                                    num_correct: Number(num_correct) + Number(localStorage.getItem("userScoreLS")),
                                    num_wrong: Number(num_wrong) + (5 - Number(localStorage.getItem("userScoreLS"))),
                                });
                            }
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

// Display results
function displayResults() {
    document.getElementById('description').textContent = `You got ${localStorage.getItem("userScoreLS")} out of 5 correct!`;
    localStorage.setItem("userScoreLS", 0);
}