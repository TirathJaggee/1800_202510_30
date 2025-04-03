let users = [];

// Display leaderboard
async function leads() {
    let snapshot = await db.collection('users').get();
    let uniqueUsers = new Map();

    // Get user data
    snapshot.docs.forEach(doc => {
        let user = doc.data();
        let userName = user.name || "Unknown";
        let numCorrect = user.num_correct || 0;
        let numWrong = user.num_wrong || 0;
        let totalQuestions = numCorrect + numWrong;
        let correctionPercentage = totalQuestions
            ? ((numCorrect / totalQuestions) * 100).toFixed(2)
            : "0";

        let score = user.score || 0; // Uses Firestore score field

        // Add user to uniqueUsers map if not already present
        if (!uniqueUsers.has(userName)) {
            uniqueUsers.set(userName, {
                name: userName,
                correct: numCorrect,
                wrong: numWrong,
                correctionPercentage,
                score
            });
        }
    });

    // Sort by score
    let topUsers = [...uniqueUsers.values()]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    // Update leaderboard items 
    let leaderboardItems = document.querySelectorAll(".leaderboard-item");

    // Update leaderboard items
    leaderboardItems.forEach((item, i) => {
        if (topUsers[i]) {
            item.style.display = "flex"; // Ensure it's visible

            item.querySelector(".rank").textContent = i + 1;
            item.querySelector(".username").textContent = topUsers[i].name;

            let stats = item.querySelector(".stats-container").children;
            stats[0].textContent = `Questions Correct: ${topUsers[i].correct}`;
            stats[1].textContent = `Questions Wrong: ${topUsers[i].wrong}`;
            stats[2].textContent = `Correction%: ${topUsers[i].correctionPercentage}%`;
            stats[3].textContent = `Score: ${topUsers[i].score}`; // Score added
        } else {
            item.style.display = "none"; 
        }
    });

    console.log("Top 5 Users by Score:", topUsers);
}

leads();
