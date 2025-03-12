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

questionsRef.add({
    answer: 2,
    category: "carbs",
    description: "Which has fewer calories?",
    image1: "./images/questions/pancakes.jpg",
    image2: "./images/questions/oatmeal.jpg"
});
questionsRef.add({
    answer: 2,
    category: "protien",
    description: "Which has fewer calories?",
    image1: "./images/questions/salmon.jpg",
    image2: "./images/questions/fried_chicken.jpg"
});
questionsRef.add({
    answer: 2,
    category: "protien",
    description: "Which has fewer calories?",
    image1: "./images/questions/steak.jpg",
    image2: "./images/questions/tofu.jpg"
});
questionsRef.add({
    answer: 2,
    category: "carbs",
    description: "Which has fewer calories?",
    image1: "./images/questions/pasta.jpg",
    image2: "./images/questions/quinoa.jpg"
});
questionsRef.add({
    answer: 1,
    category: "fats",
    description: "Which has fewer calories?",
    image1: "./images/questions/black_coffee.jpg",
    image2: "./images/questions/latte.jpg"
});
questionsRef.add({
    answer: 1,
    category: "carbs",
    description: "Which has fewer calories?",
    image1: "./images/questions/whole_wheat_bread.jpg",
    image2: "./images/questions/white_bread.jpg"
});
questionsRef.add({
    answer: 1,
    category: "vitamins",
    description: "Which has fewer calories?",
    image1: "./images/questions/strawberries.jpg",
    image2: "./images/questions/banana.jpg"
});
questionsRef.add({
    answer: 1,
    category: "protien",
    description: "Which has fewer calories?",
    image1: "./images/questions/beef.jpg",
    image2: "./images/questions/fries.jpg"
});
questionsRef.add({
    answer: 2,
    category: "carbs",
    description: "Which has fewer calories?",
    image1: "./images/questions/pretzels.jpg",
    image2: "./images/questions/nachos.jpg"
});



function checkAnswer(val) {
    console.log(val);
}

// A $( document ).ready() block.
$(document).ready(function() {
    loadScreen(); // Move the function call here to ensure DOM is ready
});