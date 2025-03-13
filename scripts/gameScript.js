function loadScreen() {
    $('#game_placeholder').load('/html/game_stage1.html', function () {
        // This callback runs after the content is loaded
        // Now it's safe to attach event listeners to elements in the loaded content
        document.getElementById("firstImage").addEventListener("click", () => {
            checkAnswer(document.getElementById("firstImage").value);
        });
        document.getElementById("secondImage").addEventListener("click", () => {
            checkAnswer(document.getElementById("secondImage").value);
        });
    });
}
<<<<<<< HEAD
function loadQuestions() {
    db.collection( "questions" ).get()
        .then( doc => {
            answer = doc.data().answer;
            category = doc.data().category;
            description = doc.data().description;
            image1 = doc.data().image1;
            image2 = doc.data().image2;

            document.getElementById( "description" ).innerHTML = description;
            document.getElementById( "firstImage" ).src = image1;
            document.getElementById( "secondImage" ).src = image2;
        } );    
}


function checkAnswer(val) {
    console.log(val);
}

// A $( document ).ready() block.
$(document).ready(function () {
    loadScreen(); // Move the function call here to ensure DOM is ready
});