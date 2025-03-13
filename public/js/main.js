function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;  

            //method #2:  insert using jquery
            $("#name-goes-here").text(userName); //using jquery

        } else {
            // No user is signed in.
            console.log ("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function


// function addQuestions() {
//     questionsRef.add({
//         answer: 2,
//         category: "carbs",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/pancakes.jpg",
//         image2: "./images/questions/oatmeal.jpg"
//     });
//     questionsRef.add({
//         answer: 2,
//         category: "protien",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/salmon.jpg",
//         image2: "./images/questions/fried_chicken.jpg"
//     });
//     questionsRef.add({
//         answer: 2,
//         category: "protien",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/steak.jpg",
//         image2: "./images/questions/tofu.jpg"
//     });
//     questionsRef.add({
//         answer: 2,
//         category: "carbs",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/pasta.jpg",
//         image2: "./images/questions/quinoa.jpg"
//     });
//     questionsRef.add({
//         answer: 1,
//         category: "fats",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/black_coffee.jpg",
//         image2: "./images/questions/latte.jpg"
//     });
//     questionsRef.add({
//         answer: 1,
//         category: "carbs",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/whole_wheat_bread.jpg",
//         image2: "./images/questions/white_bread.jpg"
//     });
//     questionsRef.add({
//         answer: 1,
//         category: "vitamins",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/strawberries.jpg",
//         image2: "./images/questions/banana.jpg"
//     });
//     questionsRef.add({
//         answer: 1,
//         category: "protien",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/beef.jpeg",
//         image2: "./images/questions/fries.jpg"
//     });
//     questionsRef.add({
//         answer: 2,
//         category: "carbs",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/pretzels.jpg",
//         image2: "./images/questions/nachos.jpg"
//     });
//     questionsRef.add({
//         answer: 2,
//         category: "fats",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/whole_milk.jpg",
//         image2: "./images/questions/skim_milk.jpg"
//     });
//     questionsRef.add({
//         answer: 1,
//         category: "vitamins",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/watermelon.jpg",
//         image2: "./images/questions/mango.jpg"
//     });
//     questionsRef.add({
//         answer: 1,
//         category: "protien",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/grilled_chicken_sandwich.jpg",
//         image2: "./images/questions/cheeseburger.jpg"
//     });
//     questionsRef.add({
//         answer: 1,
//         category: "fats",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/popcorn.jpg",
//         image2: "./images/questions/potato_chips.jpg"
//     });
//     questionsRef.add({
//         answer: 1,
//         category: "protien",
//         description: "Which has fewer calories?",
//         image1: "./images/questions/shrimp.jpg",
//         image2: "./images/questions/fried_fish.jpg"
//     });

// }