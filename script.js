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
            
            // Get values inside the click event
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            try {
                await addDoc(collection(db, "inquiries"), {
                    name,
                    email,
                    message,
                    timestamp: new Date()
                });
                alert("Connection Initiated! Data sent to Firestore.");
                contactForm.reset();
            } catch (error) {
                console.error("Firebase Error:", error);
                alert("Error sending message.");
            }
        });
    } else {
        console.error("Could not find element with ID 'contact-form'. Check your HTML!");
    }
});