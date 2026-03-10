import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Your Firebase Config (Keep what you have here)
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
}; // <--- Make sure this semicolon is here
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. The Safety Wrapper
document.addEventListener('DOMContentLoaded', () => {
    // Make sure 'contact-form' matches the ID in your HTML exactly!
    const contactForm = document.getElementById('contact-form'); 

   if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // ADD THIS LINE HERE:
            console.log("🚀 Submit button was definitely clicked!"); 

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            try {
                console.log("Attempting to send to Firestore...");
                await addDoc(collection(db, "inquiries"), {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date()
                });
                alert("Connection Initiated! Data sent to the cloud.");
                contactForm.reset();
            } catch (error) {
                // This will catch the 'Blocked' error specifically
                console.error("🔥 Firebase Error caught:", error);
                alert("The network is blocking the connection. Try a Mobile Hotspot!");
            }}); // Closes the addEventListener
    } // Closes the 'if (contactForm)' block
}); // Closes the 'DOMContentLoaded' block