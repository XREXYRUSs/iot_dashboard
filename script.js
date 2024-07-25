// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const ledStateElement = document.getElementById('ledState');
const toggleButton = document.getElementById('toggleLED');

// Function to update LED state
function updateLEDState() {
    database.ref('ledState').once('value').then(snapshot => {
        const state = snapshot.val() ? 'On' : 'Off';
        ledStateElement.textContent = state;
    });
}

// Function to toggle LED
function toggleLED() {
    database.ref('ledState').once('value').then(snapshot => {
        const currentState = snapshot.val();
        database.ref('ledState').set(!currentState);
    });
}

// Event listener for button
toggleButton.addEventListener('click', toggleLED);

// Update LED state on load
updateLEDState();

// Listen for changes in LED state
database.ref('ledState').on('value', updateLEDState);
