// Firebase configuration
onst firebaseConfig = {
  apiKey: "AIzaSyCzDnC05HVgIskWZmeGER2dr8bWeUt8tbI",
  authDomain: "iotcloud-8e494.firebaseapp.com",
  databaseURL: "https://iotcloud-8e494-default-rtdb.firebaseio.com",
  projectId: "iotcloud-8e494",
  storageBucket: "iotcloud-8e494.appspot.com",
  messagingSenderId: "404519692894",
  appId: "1:404519692894:web:100ea0231fd2518160a2cf"
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
