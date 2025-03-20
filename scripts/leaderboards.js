let users = []; 

async function leads() {
    let snapshot = await db.collection('users').get(); 
    let uniqueUsers = new Map(); // to prevent duplicate users

    snapshot.docs.forEach(doc => {
        let user = doc.data();
        let userName = user.name || "Unknown"; 
        let numCorrect = user.num_correct || 0;
        let numWrong = user.num_wrong || 0;
        let totalQuestions = numCorrect + numWrong;
        let correctionPercentage = totalQuestions ? ((numCorrect / totalQuestions) * 100).toFixed(2) : "0";

        if (!uniqueUsers.has(userName)) {
            uniqueUsers.set(userName, { name: userName, correct: numCorrect, wrong: numWrong, correctionPercentage });
        }
    });

    let topUsers = [...uniqueUsers.values()].sort((a, b) => b.correct - a.correct).slice(0, 5);
    
    // Select all existing leaderboard items
    let leaderboardItems = document.querySelectorAll(".leaderboard-item");

    leaderboardItems.forEach((item, i) => {
        if (topUsers[i]) {
            item.querySelector(".rank").textContent = i + 1;
            item.querySelector(".username").textContent = topUsers[i].name;
            let stats = item.querySelector(".stats-container").children;
            stats[0].textContent = `Questions Correct: ${topUsers[i].correct}`;
            stats[1].textContent = `Questions Wrong: ${topUsers[i].wrong}`;
            stats[2].textContent = `Correction%: ${topUsers[i].correctionPercentage}%`;
        } else {
            item.style.display = "none"; // Hide extra items if fewer than 5 users
        }
    });

    console.log("Top 5 Users:", topUsers);
}

leads();
