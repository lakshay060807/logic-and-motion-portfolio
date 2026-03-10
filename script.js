  document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Stops the page from refreshing when you click submit

    // Grab the button so we can animate it during the sending process
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'INITIATING...';

    // Package the user's input into a neat object
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // Shoot the data over to your local Node.js server
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // SUCCESS FEEDBACK
            submitBtn.innerText = 'CONNECTION ESTABLISHED';
            submitBtn.style.backgroundColor = 'var(--text-light)';
            submitBtn.style.color = 'var(--bg-dark)';
            
            // Clear the form fields
            document.getElementById('contact-form').reset(); 

            // Reset the button back to normal after 3 seconds
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = 'transparent';
                submitBtn.style.color = 'var(--text-light)';
            }, 3000);
        } else {
            submitBtn.innerText = 'CONNECTION FAILED';
        }
    } catch (error) {
        console.error('Error:', error);
        submitBtn.innerText = 'SERVER OFFLINE';
    }
});  