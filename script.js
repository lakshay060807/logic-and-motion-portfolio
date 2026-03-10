document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                // We are sending the data to our own internal API route
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert("Message sent to MongoDB!");
                    contactForm.reset();
                } else {
                    alert("Server error. Check Vercel logs.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Connection failed.");
            }
        });
    }
});