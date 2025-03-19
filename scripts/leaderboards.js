let users = []; // Array to store user data

async function leads() {
    let snapshot = await db.collection('users').get(); // Fetch user data from Firebase
    let uniqueUsers = new Map(); // Use a Map to prevent duplicate users

    snapshot.docs.forEach(doc => {
        let user = doc.data();
        let userName = user.name || "Unknown"; // Handle missing names
        let numCorrect = user.num_correct || 0;
        let numWrong = user.num_wrong || 0;
        let totalQuestions = numCorrect + numWrong;
        let correctionPercentage = totalQuestions ? ((numCorrect / totalQuestions) * 100).toFixed(2) : "0";

        if (!uniqueUsers.has(userName)) {
            uniqueUsers.set(userName, { name: userName, correct: numCorrect, wrong: numWrong, correctionPercentage });
        }
    });

    let topUsers = [...uniqueUsers.values()].sort((a, b) => b.correct - a.correct).slice(0, 5);

    document.querySelector(".leaderboard").innerHTML = topUsers.map((user, i) => `
        <li class="leaderboard-item">
            <span class="rank">${i + 1}</span>
            <span class="material-icons user-icon">person</span>
            <span class="username">${user.name}</span>
            <div class="stats-container">
                <span>Questions Correct: ${user.correct}</span>
                <span>Questions Wrong: ${user.wrong}</span>
                <span>Correction%: ${user.correctionPercentage}%</span>
            </div>
        </li>
    `).join("");

    console.log("Top 5 Users:", topUsers);
}

leads();
