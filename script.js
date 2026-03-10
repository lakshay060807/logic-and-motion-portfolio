// 1. Import the Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Paste your Firebase Config here
const firebaseConfig = {
  apiKey: "AIzaSyBJ1g5GiJzSSbtO60jYD7xh0ltXnN5sb7k",
  authDomain: "logic-and-motion-portfol-aa23f.firebaseapp.com",
  projectId: "logic-and-motion-portfol-aa23f",
  storageBucket: "logic-and-motion-portfol-aa23f.firebasestorage.app",
  messagingSenderId: "993993911153",
  appId: "1:993993911153:web:45524fdb9b85197a7e64d0",
  measurementId: "G-NJGW3RR16C"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Update your Form Submission Logic
const contactForm = document.getElementById('contact-form'); // Use your actual ID

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    // This replaces your fetch('/api/contact') call
    await addDoc(collection(db, "inquiries"), {
      name: name,
      email: email,
      message: message,
      timestamp: new Date()
    });
    alert("Message sent successfully to Firestore!");
    contactForm.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error sending message.");
  }
});