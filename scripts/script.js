function checkAnswer(val) {
    console.log(val);
}
document.getElementById("firstImage").addEventListener("click", () => {
    checkAnswer(document.getElementById("firstImage").value);
});


// document.getElementById("secondImage").addEventListener("click", sayHello());