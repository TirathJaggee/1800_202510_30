let users = []; 

async function leads() {
    let snapshot = await db.collection('users').get(); 

    snapshot.docs.forEach(doc => {
        let user = doc.data();
        let userName = user.name || "Unknown"; 
        let numCorrect = user.num_correct || 0; 
        let numWrong = user.num_wrong || 0; 
        let totalQuestions = numCorrect + numWrong;
        let correctionPercentage = totalQuestions > 0 ? ((numCorrect / totalQuestions) * 100).toFixed(2) : "0";

        users.push({
            name: userName,
            correct: numCorrect,
            wrong: numWrong,
            correctionPercentage: correctionPercentage
        });
    });

    // Sort users by Questions Correct in descending order
    users.sort((a, b) => b.correct - a.correct);

    // Get the top 5 users
    let topUsers = users.slice(0, 5);

    
    let leaderboardList = document.querySelector(".leaderboard");
    leaderboardList.innerHTML = ""; 

    // Loop through the top 5 users and add them to the leaderboard
    topUsers.forEach((user, index) => {
        let listItem = document.createElement("li");
        listItem.classList.add("leaderboard-item");

        listItem.innerHTML = `
            <span class="rank">${index + 1}</span>
            <span class="material-icons user-icon">person</span>
            <span class="username">${user.name}</span>
            <div class="stats-container">
                <span>Questions Correct: ${user.correct}</span>
                <span>Questions Wrong: ${user.wrong}</span>
                <span>Correction%: ${user.correctionPercentage}%</span>
            </div>
        `;

        leaderboardList.appendChild(listItem);
    });

    console.log("Top 5 Users:", topUsers); 
}

leads(); 
