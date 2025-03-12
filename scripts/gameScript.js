function loadScreen() {
    $('#game_placeholder').load('/html/game_stage1.html', function() {
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

function checkAnswer(val) {
    console.log(val);
}

// A $( document ).ready() block.
$(document).ready(function() {
    loadScreen(); // Move the function call here to ensure DOM is ready
});