# SmartChoice

## Overview
SmartChoice is an educational web application designed to help users develop a strong intuition about the nutritional value of different foods. Through an interactive game format, users can learn to make healthier dietary choices by comparing the caloric content of various food items.

Developed for the **BCIT CST 1800-Projects** course, this application applies **User-Centered Design** practices and **agile project management** processes, integrating **Firebase** for authentication and backend services.

## Features
- **Interactive food comparison game** that tests users' knowledge of caloric content
- **User authentication system** with login/logout functionality
- **Responsive design** for desktop and mobile devices
- **Leaderboard** to track user progress and achievements
- **Educational resources** about nutrition and healthy eating

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **Hosting:** Firebase Hosting

## Usage
1. Open your browser and visit the application URL.
2. Create an account or log in to your existing account.
3. Navigate to the game page to start playing.
4. Choose between two food items to identify which has fewer calories per **200g portion**.
5. Track your progress on the leaderboard and learn more about nutrition through the educational resources.

## Deployment

### Option 1: Using Node.js
1. Clone the repository
   ```bash
   git clone <repository-url>
   cd smartchoice
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the application
   ```bash
   node server.js
   ```
4. Open your browser and navigate to `http://localhost:3000`

### Option 2: Using Docker
1. Make sure you have Docker installed on your system
2. Clone the repository
   ```bash
   git clone <repository-url>
   cd smartchoice
   ```
3. Build the Docker image
   ```bash
   docker build -t smartchoice .
   ```
4. Run the Docker container
   ```bash
   docker run -p 8000:8000 smartchoice
   ```
5. Open your browser and navigate to `http://localhost:8000`

## Project Structure
```
smartchoice/
├── public/
│   ├── css/
│   │   ├── style.css
│   │   ├── navbar.css
│   │   ├── store.css
│   │   ├── profile.css
│   │   ├── game.css
│   │   ├── learn.css
│   │   ├── leaderboard.css
│   │   ├── inventory.css
│   │   ├── workouts.css
│   ├── html/
│   │   ├── carbohydrates.html
│   │   ├── footer_loggedin.html
│   │   ├── footer_loggedout.html
│   │   ├── game.html
│   │   ├── index.html
│   │   ├── inventory.html
│   │   ├── leaderboard.html
│   │   ├── learn.html
│   │   ├── login.html
│   │   ├── main.html
│   │   ├── navbar_loggedin.html
│   │   ├── navbar_loggedout.html
│   │   ├── profile.html
│   │   ├── protein.html
│   │   ├── results.html
│   │   ├── supplementation.html
│   │   ├── vitamins.html
│   │   ├── workouts.html
│   │   └── store.html
│   ├── images/
├── scripts/
│   ├── authentication.js
│   ├── gameScript.js
│   ├── inventory.js
│   ├── leaderboard.js
│   ├── profile.js
│   ├── script.js
│   ├── skeleton.js
│   └── store.js
├── server.js
└── README.md
```

## Contributors
- **Alexander Fisher** - BCIT CST Student with a passion for video games and chilling.
- **Nicolas Agostini** - BCIT CST Student, with a passion for technology and AI.
- **Tirath Jaggee** - BCIT CST Student. Chose BCIT because the course is accelerated!

## Acknowledgments
- **Bootstrap** framework for responsive design components
- **Firebase** for authentication and database services
- **Icons** sourced from Google Material Icons
- **BCIT School of Computing and Academic Studies**

## Limitations and Future Work
### Limitations
- Currently limited to a small set of food comparisons
- Basic game mechanics without progression levels
- Limited educational content
- Limited inventory system

### Future Work
- Expand the food database with more diverse options
- Implement difficulty levels and game progression
- Add more detailed nutritional information beyond calories
- Develop a personalized learning path based on user performance
- Implement social features to allow users to challenge friends
- Create a mobile app version for improved accessibility

## License
This project is created for educational purposes as part of the **BCIT CST program**.
