// function loadScreen() {
//     $('#game_placeholder').load('/html/game_stage1.html', function () {
//         // This callback runs after the content is loaded
//         // Now it's safe to attach event listeners to elements in the loaded content
//         document.getElementById("firstImage").addEventListener("click", () => {
//             checkAnswer(document.getElementById("firstImage").value);
//         });
//         document.getElementById("secondImage").addEventListener("click", () => {
//             checkAnswer(document.getElementById("secondImage").value);
//         });
//     });
// }
let correctAnswers = [];
let userAnswers = [];
let questionsIds = [];

async function display() {
    const snapshot = await db.collection('questions').get();
    // console.log(snapshot.docs.map(doc => doc.data()));
    i = Math.floor(Math.random() * 15);

    let question = snapshot.docs[i].data();
    // console.log(question);
    let questionId = snapshot.docs[i].id;
    questionsIds.push(questionId);
    let correctAnswer = question.answer;
    correctAnswers.push(correctAnswer);
    let description = question.description;
    let image1 = question.image1;
    let image2 = question.image2;
    let category = question.category;

    document.getElementById('description').textContent = description;
    document.getElementById('firstImage').src = image1;
    document.getElementById('secondImage').src = image2;
}

function checkAnswer() {
    document.getElementById("firstImageButton").addEventListener("click", () => {
        userAnswers.push(document.getElementById("firstImageButton").value);
    });
    document.getElementById("secondImageButton").addEventListener("click", () => {
        userAnswers.push(document.getElementById("secondImageButton").value);
    });
    display();
}
console.log("User Answers: ", userAnswers);
console.log("Correct Answers: ", correctAnswers);